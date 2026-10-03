# Security response headers

The Netlify static output uses [0mpublic/_headers[0m; the Docker/Nginx image uses [0mdocker/nginx.conf[0m. Both set [0mX-Content-Type-Options: nosniff[0m, [0mReferrer-Policy: strict-origin-when-cross-origin[0m, and the same Content Security Policy in **report-only** mode.

The policy disallows framing because the site does not require embedding. It restricts sources to this site plus Google Fonts, and accounts for inline theme/Astro code and local, data, and HTTPS images. Report-only mode intentionally does not block resources while violations are reviewed. Its [0munsafe-inline[0m script allowance is for observation only, not a recommended enforcement policy.

Before enforcing CSP, inspect report-only violations on a deploy preview and production, exercise hydration, theme switching, fonts, and previews, then replace the inline-script allowance with Astro-generated hashes or another build-supported mechanism. Netlify supplies TLS/HSTS at the edge. The Nginx container does not terminate HTTPS, so TLS/HSTS must remain configured at its external proxy.

After deployment, verify actual response headers (for example, [0mcurl -I https://visda.ca[0m). Local builds cannot verify Netlify edge headers. A report-only CSP does not block content and must not be represented as a fully enforced CSP.
