# Agent instructions

## Project
- This repository is the source for https://visda.ca: Astro, React, TypeScript,
  and Tailwind CSS, hosted as a static site on Netlify.
- Portfolio content lives in `src/lib/data.ts`; pages in `src/pages`, shared
  layout/metadata in `src/layouts`, and UI in `src/components`.
- Follow existing structure and styles. Prefer build-time rendering for static
  content and hydrate only components that need browser interaction.
- Preserve readable content without JavaScript, accessibility, keyboard access,
  light/dark themes, responsive layouts, and reduced-motion behavior.

## Required worktree workflow
- Inspect the current checkout and existing instructions before editing. Never
  discard unrelated changes or reuse another task's branch/worktree.
- Fetch the latest `main`, then create a dedicated feature branch and Git worktree
  for each task. Make changes, install dependencies, and run checks in that worktree,
  not the main checkout. For example:
  ```sh
  git fetch origin main
  git worktree add -b docs/example ../my-portfolio-example origin/main
  ```
- Use Node.js matching `package.json` and `.nvmrc`: Node 22, at least v22.19.0,
  and below v23. Confirm the version before installing/building.
- Use `npm ci` with the committed npm lockfile for the current documented Netlify
  workflow. Do not switch package managers or modify lockfiles incidentally;
  coordinate intentional package-manager changes across CI, Docker, and Netlify.
- Run `npm run build` locally in the worktree before pushing a branch or opening
  a PR, including documentation-only changes. Rebuild after any later changes.
- Run additional configured checks/tests and relevant manual checks. Do not
  invent scripts or claim checks passed without running them.
- If installation or the build fails, resolve it before pushing. If blocked,
  report the failure and ask for approval to proceed without a successful build.
- Inspect `git diff` and status before committing. Do not commit `node_modules`,
  `dist`, generated caches, secrets, or unrelated files.
- Push the task branch and open a PR against `main`; do not push directly to
  `main` or merge without explicit user approval.
- Remove a task worktree only when its work is safely preserved and it has no
  uncommitted changes. Never delete another task's worktree.

## Pull requests
- When there is an associated issue, the PR title must use this exact pattern:
  `Issue #<number> - <PR Title>`.
  Example: `Issue #10 - Add SEO metadata and social previews`.
- If multiple issues are related, use the primary issue in the title and link
  the others in the body. Without an associated issue, use a descriptive title;
  do not invent an issue number.
- Use `.github/pull_request_template.md`. Include what changed, commands actually
  run and their results, relevant preview/screenshots, and deployment risks.
- Use `Closes #<number>` only when the issue is fully resolved; otherwise use
  `Refs #<number>`. Do not close broad issues for partial improvements.
- For visual changes, check mobile/desktop, both themes, and keyboard access.
  Review the Netlify Deploy Preview when available; report unavailable checks.

## Safety and scope
- Keep changes focused on the request. Preserve attribution and existing content
  unless the task explicitly calls for changing them.
- Never commit credentials, environment secret values, or sensitive account data.
- Do not change DNS, cloud account settings, publish a manual production deploy,
  add paid services, or change deployment integrations without user approval.
- A branch push may trigger Netlify automatically; disclose relevant deployment
  implications and verify actual context settings rather than assuming them.
- For routing, caching, headers, or build configuration changes, document how to
  verify behavior and roll back. Keep HTML revalidated and immutable caching
  scoped to content-hashed assets, not all site files.
