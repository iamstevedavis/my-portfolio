import { writeFile } from "node:fs/promises";

const noindexContexts = new Set(["deploy-preview", "branch-deploy"]);
const headers = ["/*", "  X-Content-Type-Options: nosniff"];

if (noindexContexts.has(process.env.CONTEXT)) {
  headers.push("  X-Robots-Tag: noindex, nofollow");
}

await writeFile(new URL("../dist/_headers", import.meta.url), `${headers.join("\n")}\n`);
