import assert from "node:assert/strict";
import { test } from "node:test";
import { checkProduction } from "./production-smoke.mjs";

const siteId = "df7ced09-9590-4bfc-858c-c9aa314181a6";
const commit = "a".repeat(40);
const deploy = {
  id: "deploy-id", site_id: siteId, commit_ref: commit, branch: "main",
  context: "production", state: "ready", published_at: "2026-10-03T00:00:00Z",
};
const page = () => new Response("Stephen Davis Experience Projects", { headers: { "content-type": "text/html" } });
const json = (value) => new Response(JSON.stringify(value), { headers: { "content-type": "application/json" } });

function fixture(responses) {
  const calls = [];
  return {
    calls,
    options: {
      token: "test-token", siteId, commit, attempts: 2,
      pause: async () => {}, log: () => {},
      fetchImpl: async (url, options) => {
        calls.push({ url, options });
        assert.ok(responses.length, "Unexpected request");
        return responses.shift();
      },
    },
  };
}

test("checks only after the exact commit is published, without public credentials", async () => {
  const f = fixture([
    json({ published_deploy: { ...deploy, commit_ref: "b".repeat(40) } }),
    json([{ ...deploy, state: "building" }]),
    json({ published_deploy: deploy }), page(), json({ published_deploy: deploy }),
  ]);
  assert.equal(await checkProduction(f.options), deploy.id);
  const publicCall = f.calls.find(({ url }) => url === "https://visda.ca/");
  assert.equal(publicCall.options.headers, undefined);
  assert.equal(publicCall.options.redirect, "error");
  for (const call of f.calls.filter(({ url }) => url.startsWith("https://api.netlify.com/"))) {
    assert.equal(call.options.headers.Authorization, "Bearer test-token");
  }
});

test("missing token fails before any request", async () => {
  const f = fixture([]);
  await assert.rejects(checkProduction({ ...f.options, token: "" }), /NETLIFY_AUTH_TOKEN/);
  assert.equal(f.calls.length, 0);
});

test("preview and unpublished ready deploys cannot produce false success", async () => {
  const f = fixture([
    json({ published_deploy: { ...deploy, context: "deploy-preview" } }), json([deploy]),
    json({ published_deploy: { ...deploy, published_at: null } }), json([deploy]),
  ]);
  await assert.rejects(checkProduction(f.options), /Timed out/);
  assert.ok(f.calls.every(({ url }) => url.startsWith("https://api.netlify.com/")));
});

test("matching failed deploy fails immediately", async () => {
  const f = fixture([json({}), json([{ ...deploy, state: "error" }])]);
  await assert.rejects(checkProduction(f.options), /failed, was canceled/);
});

test("a newer retry supersedes an older failed deploy", async () => {
  const f = fixture([
    json({}), json([{ ...deploy, state: "building" }, { ...deploy, state: "error" }]),
    json({ published_deploy: deploy }), page(), json({ published_deploy: deploy }),
  ]);
  await checkProduction(f.options);
});

test("authorization failures do not leak response bodies", async () => {
  const f = fixture([new Response("secret-account-information", { status: 401 })]);
  await assert.rejects(checkProduction(f.options), (error) => /HTTP 401/.test(error.message) && !error.message.includes("secret-account"));
});

test("missing public content fails the smoke check", async () => {
  const f = fixture([json({ published_deploy: deploy }), new Response("wrong page", { headers: { "content-type": "text/html" } })]);
  await assert.rejects(checkProduction(f.options), /HTML missing/);
});

test("deployment changes during the public check are detected", async () => {
  const f = fixture([
    json({ published_deploy: deploy }), page(),
    json({ published_deploy: { ...deploy, id: "another-deploy" } }),
  ]);
  await assert.rejects(checkProduction(f.options), /deployment changed/);
});
