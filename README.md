# My Portfolio

A sleek, responsive portfolio website built with **Astro**, **React**, and **Tailwind CSS**, featuring modern animations and stunning glassmorphism effects.

![Portfolio Screenshot](https://github.com/user-attachments/assets/287dbb83-9b33-4df7-9cee-f58cdec2dfbe)

[![Netlify Status](https://api.netlify.com/api/v1/badges/df7ced09-9590-4bfc-858c-c9aa314181a6/deploy-status)](https://app.netlify.com/sites/visda/deploys)

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
- npm / yarn / bun

### Installation

```bash
git clone https://github.com/iamstevedavis/my-portfolio.git
cd my-portfolio

# Install dependencies
npm install
# or
yarn install
# or
bun install

# Start development server
npm run dev
# or
yarn dev
# or
bun dev
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
# or
yarn build
# or
bun run build
```

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

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
5. After a successful GitHub deployment status for the production environment,
   a read-only smoke check fetches the published page and verifies its HTTP
   status and key content. It does not deploy anything.

GitHub branch rules and Netlify Deploy Preview settings cannot be configured by
workflow files. Confirm them in their respective dashboards. The production
smoke workflow requires the Netlify/GitHub integration to emit a successful
`deployment_status` event with environment `Production` and URL on `visda.ca`;
if no event is emitted, verify production manually in Netlify and at
https://visda.ca. Netlify remains the only deployment system for the live site.

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

The build command and output directory above describe this project's Astro build. Confirm the connected repository, production branch, build settings, and automatic deploy configuration in Netlify before relying on a push to deploy; those account-level settings are not recorded in this repository.

To publish changes, commit and push to the branch configured for production in Netlify, then check the deployment dashboard for a successful build and verify https://visda.ca.

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
