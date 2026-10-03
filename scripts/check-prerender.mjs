import { readFile } from "node:fs/promises";

const file = process.argv[2] ?? "dist/index.html";
const html = await readFile(file, "utf8");
const required = [
  "Stephen Davis",
  "Experience",
  "Skills",
  "Projects",
  "Education",
];
const missing = required.filter((text) => !html.includes(text));

if (missing.length) {
  console.error(`Prerendered HTML is missing expected content: ${missing.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log(`Prerendered HTML contains portfolio content (${file}).`);
}
