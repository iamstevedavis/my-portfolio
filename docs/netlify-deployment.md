# Netlify deployment settings

The root `netlify.toml` records the build settings documented for the existing site:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: `22.19.0`, matching the minimum in `package.json` and the Node 22 major in `.nvmrc`
- Dependency installation: npm, consistent with the repository's `package-lock.json` and documented Netlify command

The asset header applies only to Astro's fingerprinted `/_astro/*` URLs: `Cache-Control: public, max-age=31536000, immutable`. Do not broaden it to HTML or unversioned public files such as `/profile.jpg`. HTML continues to use Netlify's normal revalidation behavior.

## Dashboard-only configuration

Connected repository, production branch, environment variables, and deploy-context controls remain in Netlify's dashboard. They are intentionally not represented here. The dashboard configuration was not accessible during this change, so compare it with the documented settings at [the visda site dashboard](https://app.netlify.com/sites/visda/deploys) before relying on deploy behavior. The committed file sets build command, publish path, and Node version identically for deploy contexts and does not declare context-specific overrides.

## Local, preview, and production behavior

Local development/build uses Node 22 and the package scripts; the Netlify response headers are not applied by `astro dev` or `astro preview`. Netlify Deploy Previews and production builds use the versioned command, output directory, Node version, and `/_astro/*` header rule. The dashboard still determines which branch is production and any environment-specific variables.

After a Deploy Preview is available, validate response headers:

1. HTML must remain revalidated (not immutable).
2. A built, content-hashed `/_astro/*` asset must return `Cache-Control: public, max-age=31536000, immutable`.
3. `/profile.jpg` must not receive the immutable rule.

If build behavior conflicts with a dashboard setting, verify the site's current configured values and make an intentional change in either the dashboard or this file. To roll back the hostname redirects, remove the four `[[redirects]]` entries for `visda.netlify.app` and `main--visda.netlify.app` from `netlify.toml`, then deploy that change and verify both hostnames no longer redirect. To roll back the caching change, remove the `[[headers]]` block; the build settings can be rolled back separately if necessary.

## Deployment recovery and operational ownership

### Recover a broken production deploy

1. Open the [visda deploy history](https://app.netlify.com/sites/visda/deploys) and identify the last known-good **published production** deploy. Check its branch, commit, and deploy permalink before acting; a successful build is not necessarily the currently published deploy.
2. Use Netlify's deploy action to **Publish deploy** for that known-good deploy. This restores the served files without changing Git. Verify `https://visda.ca` and the important routes/assets afterward. Do not use this as the permanent fix: the next production build can publish the bad commit again.
3. Fix the cause in Git. Prefer a corrective commit; if the change itself should be undone, revert the offending commit on a new branch, then open and merge a PR to `main` using the normal review workflow. Confirm the resulting production deploy is ready and published, then verify the site again. If a PR build fails, inspect its build log and keep production on the last known-good deploy while correcting the branch.

Publishing a prior deploy is a production action. Confirm the selected deploy and coordinate with the site owner; do not trigger a manual production deploy as part of routine documentation or testing.

### Notifications, uptime, and account ownership

The connected repository and deploy dashboard are the source of truth for deploy status. In Netlify's site notification settings, confirm that production build failures notify the site owner (email or an existing notification integration); avoid notifying on every successful preview unless there is a concrete need. In GitHub, confirm the repository's Actions/PR notifications are enabled for the maintainers who need them. These dashboard settings were not verifiable from the repository, so this is a setup/verification checklist, not a claim that notifications are enabled.

For lightweight availability checks, use an existing free uptime checker if available, targeting `https://visda.ca` and alerting on sustained failure rather than a single transient response. Verify the alert reaches a monitored inbox and periodically check expiry/renewal for the `visda.ca` domain at its registrar and the certificate status in Netlify. The registrar, DNS provider, renewal settings, and alert recipient have not been verified here; record their provider/account ownership in the team's password manager or other approved private inventory, never in this repository. Netlify site configuration is managed through the [site dashboard](https://app.netlify.com/sites/visda), and repository/build configuration is managed in this GitHub repository. Store credentials only in the approved password manager; use Netlify's environment-variable UI for any build secrets and do not copy secret values into docs, issues, or logs.

### Performance and architecture

Record a mobile Lighthouse run against the production URL after rendering-related fixes, including the date, URL, device/throttling mode, and score/report link. Lighthouse is a **lab** measurement for one simulated run; it is not field data and does not establish real-user Core Web Vitals. Do not claim a RUM baseline without privacy-reviewed field measurement. Add analytics/RUM only if a specific question justifies the collection and its privacy impact is acceptable; otherwise leave it out. No Lighthouse run or measured Core Web Vitals baseline is included in this change.

Keep the site statically generated. Do not add functions, a database, forms, analytics, or paid extensions just to provide monitoring or satisfy this checklist; use external lightweight checks where needed and revisit architecture only for a concrete feature.

## Operational audit — 2026-10-03

This is a point-in-time check, not a guarantee that provider settings will remain
unchanged. The connected Netlify and Cloudflare read access and public DNS/TLS/RDAP
lookups provided the following evidence:

- **Production:** Netlify reports the production deploy as ready and published on
  `main` at commit `4f9a0e1da771cc40645f0c74448e21b3a467a1ba`. The published URL
  returned HTTP 200. `www.visda.ca` redirects to `https://visda.ca/` with HTTP 301.
- **DNS and registrar:** CIRA RDAP lists CanSpace Solutions Inc. as registrar and
  an expiration date of 2027-10-13. The active authoritative nameservers are
  Cloudflare's `jade.ns.cloudflare.com` and `will.ns.cloudflare.com`; the
  Cloudflare zone is active. Its apex and `www` records are DNS-only CNAMEs to
  Netlify. RDAP redacts registrant details, so it does not identify the renewal
  contact or confirm billing/auto-renewal. Confirm those in the registrar account.
- **TLS:** The live `visda.ca` certificate covers `visda.ca` and `www.visda.ca`,
  is issued by Let's Encrypt, and expires 2026-11-03. Since these DNS records are
  not proxied through Cloudflare, Netlify is serving the certificate. A currently
  valid certificate does not establish that renewal notifications or auto-renewal
  are configured; confirm certificate/renewal status in Netlify before expiry.
  Cloudflare Universal SSL is enabled for the zone but is not the certificate
  served for these DNS-only hostnames.
- **Monitoring:** The Cloudflare zone has no configured health checks. Netlify's
  project metadata and the available GitHub/Netlify read APIs do not expose build
  notification recipients or a configured external uptime alert. These settings
  and delivery therefore remain unverified; configure a low-noise failure alert
  and an uptime check only after confirming the monitored recipient and provider.
- **Credentials:** The connected tools cannot inspect a private password manager.
  Confirm its inventory contains the Netlify, Cloudflare, and registrar account
  ownership/recovery details and that credentials are accessible to the intended
  owner. Keep secret values and private recovery data out of this repository.
- **Mobile Lighthouse:** No score is recorded. The PageSpeed Insights API returned
  HTTP 429 during the audit, and the local Lighthouse run could not start because
  the available Chromium binary lacks the system library `libnspr4.so`. Rerun a
  mobile Lighthouse lab test when an available browser/runtime or PSI quota allows;
  record the run date, URL, emulation mode, score, and report link. This is lab data,
  not real-user Core Web Vitals.

No monitoring service, analytics, or paid extension was added during this audit.
