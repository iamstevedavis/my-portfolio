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
