# Dependency maintenance

## Package manager and runtime

npm is the repository's package manager. `package-lock.json` is the only
authoritative lockfile; do not add or update `bun.lock` or another package
manager's lockfile. Use Node.js 22 (`.nvmrc`), meeting the `>=22.19.0 <23`
engine in `package.json`.

The committed setup is aligned across environments:

- Local and CI installs use `npm ci`.
- Netlify uses `npm run build`, `dist`, and Node.js 22.19.0 (`netlify.toml`).
- Docker copies `package-lock.json` and installs with `npm ci`.
- GitHub Actions uses Node.js 22.19.0 and `npm ci`.

To intentionally update dependencies, change `package.json` and refresh the
lockfile with npm (for example, `npm install <package>@<version>`), then commit
both files together. Validate from a clean install with:

```sh
npm ci
npm run check
npm run build
npm run check:prerender
node --test scripts/production-smoke.test.mjs
npm run test:smoke
npm audit
```

Install the Playwright browser first when needed:

```sh
npx playwright install --with-deps chromium
```

## Automated updates and review

Dependabot checks npm dependencies and GitHub Actions weekly. It groups
production and development minor/patch npm updates separately and limits open
update PRs to five per ecosystem. Major npm updates remain separate PRs rather
than being grouped with routine updates. Do not enable automatic merging:
review the changelog and compatibility, run the checks above, and inspect a
Netlify Deploy Preview for framework, build-tool, or other potentially risky
updates before merging. Review GitHub Actions updates in their own PRs too.

## Security and dependency inventory

Run `npm audit` and review repository security alerts when reviewing updates;
record the packages, severity, and fix path rather than assuming that an alert
is present or absent. Do not remove a dependency based only on an automated
unused-package report: verify imports, configuration, scripts, tests, and
framework/plugin conventions first.

During the October 2026 review, source and configuration imports were checked
against the declared dependencies; no unused direct dependencies were
identified. `npm audit` reported four vulnerable dependency entries (one low,
two high, one critical), in the locked Astro dependency tree including Astro,
esbuild, http-cache-semantics, and sharp. npm reported that its available
automatic fix requires Astro 7.3.5, a major upgrade. This is not an instruction
to force-upgrade: handle it as a dedicated, manually reviewed framework update,
validate the full CI suite and Deploy Preview, and re-run `npm audit` before
merging. Recheck the audit because advisory and fix data can change.
