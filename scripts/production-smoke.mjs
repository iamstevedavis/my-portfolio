import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";

const productionUrl = "https://visda.ca/";

export async function checkProduction({
  token,
  siteId,
  commit,
  fetchImpl = fetch,
  pause = delay,
  log = console.log,
  attempts = 60,
  interval = 15_000,
}) {
  if (!token) throw new Error("Add the NETLIFY_AUTH_TOKEN GitHub Actions secret before running this workflow.");
  if (!/^[a-f0-9-]{36}$/i.test(siteId ?? "")) throw new Error("Invalid NETLIFY_SITE_ID.");
  if (!/^[a-f0-9]{40}$/i.test(commit ?? "")) throw new Error("EXPECTED_COMMIT must be a full Git commit SHA.");

  const api = `https://api.netlify.com/api/v1/sites/${siteId}`;
  async function readApi(url) {
    let response;
    try {
      response = await fetchImpl(url, {
        headers: { Authorization: `Bearer ${token}` },
        redirect: "error",
        signal: AbortSignal.timeout(20_000),
      });
    } catch {
      // Do not log raw errors or API bodies, which can contain account data.
      throw new Error("Netlify API request failed or timed out.");
    }
    if (!response.ok) throw new Error(`Netlify API returned HTTP ${response.status}; check token access and API availability.`);
    return response.json();
  }

  const matches = (deploy) => deploy?.site_id === siteId &&
    deploy.commit_ref === commit && deploy.context === "production" && deploy.branch === "main";

  for (let attempt = 0; attempt < attempts; attempt++) {
    const site = await readApi(api);
    const published = site.published_deploy;
    if (matches(published) && published.state === "ready" && published.published_at) {
      // Never send the Netlify token to the public site or follow redirects.
      const response = await fetchImpl(productionUrl, {
        redirect: "error",
        cache: "no-store",
        signal: AbortSignal.timeout(20_000),
      });
      if (response.status !== 200) throw new Error(`Production returned HTTP ${response.status}.`);
      if (!response.headers.get("content-type")?.includes("text/html")) throw new Error("Production did not return HTML.");
      const html = await response.text();
      for (const content of ["Stephen Davis", "Experience", "Projects"]) {
        if (!html.includes(content)) throw new Error(`Production HTML missing: ${content}`);
      }
      // Detect a new deploy or rollback while the public response was checked.
      const after = await readApi(api);
      if (after.published_deploy?.id !== published.id || !matches(after.published_deploy)) {
        throw new Error("Published deployment changed during the smoke check; rerun for current main.");
      }
      log(`Production smoke passed for commit ${commit}, deploy ${published.id}.`);
      return published.id;
    }

    const deploys = await readApi(`${api}/deploys?per_page=100`);
    if (!Array.isArray(deploys)) throw new Error("Unexpected Netlify deploy list response.");
    // API lists newest first: allow a newer retry to supersede an older failure.
    const latest = deploys.find(matches);
    if (latest && (["error", "failed", "canceled"].includes(latest.state) || latest.skipped)) {
      throw new Error("The matching production deploy failed, was canceled, or was skipped; inspect Netlify.");
    }
    log(`Waiting for commit ${commit} to be published (${attempt + 1}/${attempts}).`);
    if (attempt + 1 < attempts) await pause(interval);
  }
  throw new Error("Timed out waiting for the matching published production deploy. Check Netlify builds, publish locks, and commit SHA.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  checkProduction({
    token: process.env.NETLIFY_AUTH_TOKEN,
    siteId: process.env.NETLIFY_SITE_ID,
    commit: process.env.EXPECTED_COMMIT,
  }).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
