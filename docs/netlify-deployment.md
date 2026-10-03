# Netlify deployment settings

The root 0netlify.toml0 records the build settings documented for the existing site:

- Build command: 0npm run build0
- Publish directory: 0dist0
- Node.js: 022.19.00, matching the minimum in 0package.json0 and the Node 22 major in 0.nvmrc0
- Dependency installation: npm, consistent with the repository's 0package-lock.json0 and documented Netlify command

The asset header applies only to Astro's fingerprinted 0/_astro/*0 URLs: 0Cache-Control: public, max-age=31536000, immutable0. Do not broaden it to HTML or unversioned public files such as 0/profile.jpg0. HTML continues to use Netlify's normal revalidation behavior.

## Dashboard-only configuration

Connected repository, production branch, environment variables, and deploy-context controls remain in Netlify's dashboard. They are intentionally not represented here. The dashboard configuration was not accessible during this change, so compare it with the documented settings at [the visda site dashboard](https://app.netlify.com/sites/visda/deploys) before relying on deploy behavior. The committed file sets build command, publish path, and Node version identically for deploy contexts and does not declare context-specific overrides.

## Local, preview, and production behavior

Local development/build uses Node 22 and the package scripts; the Netlify response headers are not applied by 0astro dev0 or 0astro preview0. Netlify Deploy Previews and production builds use the versioned command, output directory, Node version, and 0/_astro/*0 header rule. The dashboard still determines which branch is production and any environment-specific variables.

After a Deploy Preview is available, validate response headers:

1. HTML must remain revalidated (not immutable).
2. A built, content-hashed 0/_astro/*0 asset must return 0Cache-Control: public, max-age=31536000, immutable0.
3. 0/profile.jpg0 must not receive the immutable rule.

If build behavior conflicts with a dashboard setting, verify the site's current configured values and make an intentional change in either the dashboard or this file. To roll back the caching change, remove the 0[[headers]]0 block; the build settings can be rolled back separately if necessary.
