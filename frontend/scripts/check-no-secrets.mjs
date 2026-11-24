#!/usr/bin/env node
/**
 * Fails (exit 1) if anything that looks like a Meta access token, or the
 * private CAPI config, ends up in the files that get uploaded or committed.
 *
 *   npm run check:secrets      (run after `npm run build`, before uploading)
 *
 * Scans frontend/dist/public, frontend/src and backend/ (except .env, which is
 * never uploaded with the site and is checked by .gitignore instead).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const roots = [
  path.join(frontend, "dist", "public"),
  path.join(frontend, "src"),
  path.resolve(frontend, "..", "backend"),
];

const patterns = [
  { name: "Meta access token", re: /EAA[A-Za-z0-9]{40,}/ },
  { name: "access_token value", re: /access_token['"]?\s*[:=>]+\s*['"][A-Za-z0-9_\-|]{20,}['"]/ },
];
const forbiddenFiles = [/^meta-capi\.config\.php$/];
const textExt = /\.(html|js|mjs|css|json|map|txt|xml|php|ts|tsx|svg|md)$/i;

const problems = [];

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const file = path.join(dir, entry);
    const stat = statSync(file);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === "uploads") continue;
      walk(file);
      continue;
    }
    if (entry === ".env") continue;
    if (forbiddenFiles.some((re) => re.test(entry))) {
      problems.push(`${path.relative(frontend, file)}: private CAPI config must stay outside the project`);
      continue;
    }
    if (!textExt.test(entry) || stat.size > 5_000_000) continue;
    const text = readFileSync(file, "utf8");
    for (const { name, re } of patterns) {
      if (re.test(text)) problems.push(`${path.relative(frontend, file)}: looks like a ${name}`);
    }
  }
}

roots.forEach(walk);

if (problems.length > 0) {
  console.error("[check:secrets] FAILED — do not upload:\n" + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
console.log(`[check:secrets] OK — no Meta tokens or private config found in ${roots.length} folders.`);
