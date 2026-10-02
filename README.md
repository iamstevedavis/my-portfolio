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

- Node.js (v18+ recommended)
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

### Current site: Netlify

The live website at **https://visda.ca** is served by **Netlify**. This repository (`iamstevedavis/my-portfolio`) contains the current Astro source code, so make website changes here—not in the older Gatsby or GitHub Pages repositories.

```text
my-portfolio (Astro) → Netlify → visda.ca
```

- **Deployment dashboard:** [Netlify site `visda`](https://app.netlify.com/sites/visda/deploys)
- **Repository default branch:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

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
