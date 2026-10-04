# My Portfolio

A sleek, responsive portfolio website built with **Astro**, **React**, and **Tailwind CSS**, featuring modern animations and stunning glassmorphism effects.

![Portfolio Screenshot](https://github.com/user-attachments/assets/287dbb83-9b33-4df7-9cee-f58cdec2dfbe)

[![Netlify Status](https://api.netlify.com/api/v1/badges/df7ced09-9590-4bfc-858c-c9aa314181a6/deploy-status)](https://app.netlify.com/sites/visda/deploys)
[![Better Stack Badge](https://incidents.betterstack.com/status-badges/v2/monitor/2ziya.svg)](https://incidents.betterstack.com/?utm_source=status_badge)

## ✨ Features

- **Modern Design** – Clean, professional layout with elegant glassmorphism
- **Animations** – Smooth transitions and interactive UI via Framer Motion
- **Dark/Light Mode** – Automatic theme switching with system preference detection
- **Fully Responsive** – Optimized for mobile, tablet, and desktop
- **Blazing Fast** – Powered by Astro for superior performance
- **Modular Structure** – Built for easy customization and scalability
- **SEO Friendly** – Structured content and meta tags for better visibility

## Getting Started

### Prerequisites

- Node.js 22 (v22.19.0 or newer). With nvm, run `nvm install` and `nvm use` in this repository to use `.nvmrc`.
- npm 10 (use the npm version bundled with the supported Node.js release)

### Installation

```bash
git clone https://github.com/iamstevedavis/my-portfolio.git
cd my-portfolio

# Install the exact dependency versions from package-lock.json
npm ci

# Start development server
npm run dev
```

Visit `http://localhost:4321` in your browser to see it in action.

### Run with Docker

Requires Docker with Docker Compose; you do not need Node.js installed locally.

For development with hot reload:

```bash
docker compose up --build dev
```

Open **http://localhost:4321**. The source directory is mounted into the container, while dependencies and generated Astro files stay in container volumes. After changing dependencies, recreate those anonymous volumes with `docker compose up --build --renew-anon-volumes dev`.

To build and serve the production site with Nginx:

```bash
docker compose --profile production up --build web
```

Open **http://localhost:8080**. This uses a multi-stage build: Node.js builds the static site, and the final Nginx image contains only the generated site and server configuration. Source changes require rebuilding this image.

Press **Ctrl+C** to stop, and run `docker compose --profile production down` to remove the containers. Both ports bind only to localhost. Docker is an optional local/self-hosted setup; the live Netlify deployment remains unchanged.

## 🧩 Customizing the Portfolio

All your content lives inside `src/lib/data.ts`. Update the following to make it yours:

### 1. Personal Info

```ts
export const personalInfo = {
  name: "Your Name",
  location: "Your Location",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://www.linkedin.com/in/yourusername/",
};
```

### 2. Work Experience

```ts
export const workExperience = [
  {
    company: "Company Name",
    location: "Location",
    position: "Your Position",
    period: "Start Date - End Date",
    achievements: [
      "Achievement 1",
      "Achievement 2",
    ],
  },
];
```

### 3. Education

```ts
export const education = [
  {
    institution: "University Name",
    location: "Location",
    degree: "Your Degree",
    period: "Start Date - End Date",
    achievements: [
      "Achievement 1",
      "Achievement 2",
    ],
  },
];
```

### 4. Skills

```ts
export const skills = {
  programmingLanguages: ["TypeScript", "Python"],
  frontendDevelopment: ["React", "Next.js"],
  // and more...
};
```

### 5. Projects

```ts
export const projects = [
  {
    title: "Project Name",
    github: "https://github.com/yourusername/project",
    description: [
      "What it does",
      "Technologies used",
    ],
  },
];
```

### 6. Awards

```ts
export const awards = [
  {
    name: "Award Name",
    issuer: "Issuer",
    date: "Date",
    type: "Type",
    position: "Position",
  },
];
```

## 📦 Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### Dependency maintenance

npm is the only supported package manager. `package-lock.json` is the source of
truth for dependency resolution; do not use Yarn or Bun or commit another lockfile.
After changing dependencies, regenerate the npm lockfile with `npm install` using
Node.js 22.19.0 or newer in the supported 22.x range, then verify the change from
a clean install:

```bash
npm ci
npm run check
npm run build
npm run check:prerender
npm run test:smoke
npm audit
```

Dependabot checks npm dependencies and GitHub Actions weekly. Minor and patch
updates are grouped by runtime and development dependencies; major updates remain
separate reviewable pull requests. Review the changelog and `npm audit` output,
run the checks above, and review the Netlify Deploy Preview before merging any
dependency update. Do not auto-merge framework, major, or security updates without
review. `npm audit fix` can change the lockfile; inspect its proposed diff and
rerun validation before committing it. Avoid `npm audit fix --force` unless the
required major upgrade is deliberately assessed and validated.

## 📤 Deployment

### Pull request and production checks

Use feature branches and pull requests into `main`; do not work directly on `main`:

1. Create a feature branch and open a PR targeting `main`.
2. GitHub Actions installs the committed npm lockfile on Node 22.19.0, runs
   `astro check`, builds the site, verifies that key content exists in the
   prerendered HTML (without JavaScript), and runs Chromium/axe browser smoke
   checks for content, navigation, theme, mobile menu, console errors, and
   serious/critical accessibility violations.
3. Review the Netlify Deploy Preview before merging, including mobile and desktop
   layouts, both themes, and keyboard navigation. Netlify preview creation is an
   account-level setting: confirm it is enabled for PRs in the Netlify site and
   that preview builds use the same build command and Node version.
4. Merge only after the quality check passes and the preview is reviewed.
   For this solo-maintained repository, require the quality check but do not
   require an approving review; enable branch protection/rulesets on `main` and
   select the check named **Type check, build, and browser smoke**.
5. A push to `main` starts the production smoke workflow. It polls Netlify until
   the published production deploy matches that exact Git commit, then checks
   https://visda.ca for HTTP 200 and key HTML content. It does not deploy anything.

GitHub branch rules and Netlify Deploy Preview settings cannot be configured by
workflow files. Confirm them in their respective dashboards. Netlify sends GitHub
commit statuses, which are different from `deployment_status` events; the smoke
workflow does not rely on those events. Netlify remains the only deployment system.

#### Production smoke setup

1. Create a dedicated Netlify access token with permission to read the `visda`
   site and its deploys. Choose the narrowest account/site access available and an
   appropriate expiry. A personal token may grant more than read-only access even
   though this script only makes GET requests; treat it as a sensitive credential.
2. In GitHub, go to **Settings → Secrets and variables → Actions → New repository
   secret** and add `NETLIFY_AUTH_TOKEN`. Never put the value in a PR, source file,
   public variable, or Netlify preview environment. MCP sign-in does not configure
   this Actions secret.
3. Merge the workflow change, then check **Actions → Production smoke check**.
   Use **Run workflow** on `main` to check its current commit without redeploying.
   Add the secret before merging to allow the first automatic run to succeed.

The site ID is configured in `.github/workflows/production-smoke.yml`. The job
only runs on `main`, uses read-only GitHub permissions, and never passes the token
to the public site. It polls up to 60 times at 15-second intervals (requests also
have timeouts), fails on API errors or a failed/skipped matching deploy, and fails
if the matching deploy is never published (including publish locks or disabled
builds). A newer `main` run cancels the older run to avoid checking superseded work.
The script checks the published deploy again after fetching the public page to
detect a deployment change during validation. It is a basic availability/content
check, not a browser audit or proof that every CDN edge serves identical content.

Test the polling logic without credentials or network access with:
```bash
node --test scripts/production-smoke.test.mjs
```

Do not make this post-deploy job a pre-merge required check. To roll back the
automation, revert the workflow/script changes and remove the unused secret;
neither action publishes or restores a site deployment.

### Current site: Netlify

The live website at **https://visda.ca** is served by **Netlify**. This repository (`iamstevedavis/my-portfolio`) contains the current Astro source code, so make website changes here—not in the older Gatsby or GitHub Pages repositories.

```text
my-portfolio (Astro) → Netlify → visda.ca
```

- **Deployment dashboard:** [Netlify site `visda`](https://app.netlify.com/sites/visda/deploys)
- **Repository default branch:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node.js:** 22 (v22.19.0 or newer); `.nvmrc` pins the major version, and `package.json` records the supported range.
- **Asset caching:** `netlify.toml` sets a one-year immutable browser cache only for Astro's content-hashed `/_astro/*` assets. HTML keeps Netlify's normal revalidation behavior; unversioned public files such as `/profile.jpg` are not made immutable.

The build command and output directory above match the existing project build setup. Confirm the connected repository, production branch, Node.js version, build settings, and automatic deploy configuration in Netlify before relying on a push to deploy; account-level settings are not exposed by this repository. Keep those dashboard values aligned with `netlify.toml` and `package.json` (`npm run build`, `dist`, Node 22.19+ within major version 22). The repository has both npm and Bun lockfiles, but the recorded Netlify build command and Docker image use npm; use `npm ci` when validating that deployment path.

Local `astro dev` is a development server, not a production build. `npm run build` generates the production static site in `dist`; Netlify deploy previews and production deployments should use the same build command and publish directory, with the deploy context/branch determining the destination. After a preview deploy, verify that an HTML response revalidates and a generated `/_astro/<fingerprinted-file>` response includes `Cache-Control: public, max-age=31536000, immutable`. Also confirm `/profile.jpg` does not receive the immutable rule. Dashboard-only settings (including any context-specific overrides) must be checked in Netlify and are not represented in this file.

To publish changes, commit and push to the branch configured for production in Netlify, then check the deployment dashboard for a successful build and verify https://visda.ca.

### Uptime monitoring

[Better Stack](https://betterstack.com/) provides external uptime monitoring for
the live site at https://visda.ca. The status badge above links to Better Stack's
incident/status page. Monitor cadence, alert thresholds, notification routing,
and TLS-expiry settings are managed in the Better Stack account; do not store
private contact details or credentials in this repository. The site owner is
responsible for maintaining the monitor and its alert destinations.

If an alert fires, first check the public site and the [Netlify deploy dashboard](https://app.netlify.com/sites/visda/deploys)
for an active incident or failed/recent deployment. Confirm whether the issue
is site-wide or limited to a monitor check, investigate the corresponding deploy
or hosting status, and restore service through the normal Netlify deployment
workflow. After recovery, verify https://visda.ca and confirm the monitor has
returned to healthy before dismissing the incident. For TLS alerts, check the
domain certificate and DNS/CDN configuration; do not change DNS as part of
routine incident response without owner approval.

### Previous site: Gatsby + GitHub Pages

The older deployment used two separate repositories:

```text
visda/master (Gatsby source)
  → GitHub Actions builds public/
  → pushes public/ to iamstevedavis.github.io/master
  → GitHub Pages
```

The workflow is in [`visda/.github/workflows/ci.yml`](https://github.com/iamstevedavis/visda/blob/master/.github/workflows/ci.yml). It runs on pushes and pull requests targeting `master`, installs dependencies, builds Gatsby, and uses the `API_TOKEN_GITHUB` secret to push the generated site to `iamstevedavis.github.io`. The Gatsby build also copies its `CNAME` file (`visda.ca`) into `public/`.

GitHub Pages still has `visda.ca` configured as its custom domain and publishes from the root of `iamstevedavis.github.io`'s `master` branch, but **the domain currently points to Netlify**. Updating those old repositories is not the current way to update the live site.

The separate [`iamstevedavis/iamstevedavis`](https://github.com/iamstevedavis/iamstevedavis) repository is only the GitHub profile README, not the website source.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## ©️ Copyright

© 2025 **Rishikesh S.** All rights reserved.

You’re welcome to use this template for your own portfolio — just update `data.ts` and tweak the design as needed. Please keep attribution to the original author.

---

## 🌟 Like it?

If you found this helpful or inspiring, **please consider leaving a star** ⭐ on the repo — it helps others discover it too!

---

## 🙏 Acknowledgments

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
