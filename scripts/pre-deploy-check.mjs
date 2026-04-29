#!/usr/bin/env node
/**
 * pre-deploy-check.mjs
 *
 * Run before every Vercel deployment (or `npm run check`).
 * Catches the 3 recurring bugs that break new client launches:
 *
 *  1. middleware.ts still exists (Next.js 16 needs proxy.ts)
 *  2. proxy.ts missing env guards / try-catch (kills all public pages)
 *  3. Supabase-touching pages missing export const dynamic = 'force-dynamic'
 *
 * Also runs TypeScript and warns about bare `[]` in client.ts.
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

let errors   = 0;
let warnings = 0;

const err  = (msg) => { console.error(`  ✗  ${msg}`); errors++; };
const warn = (msg) => { console.warn( `  ⚠  ${msg}`); warnings++; };
const ok   = (msg) => { console.log(  `  ✓  ${msg}`); };
const sep  = (t)   => console.log(`\n── ${t} ─────────────────────────────`);


// ─────────────────────────────────────────────────────────────────────────────
// 1. proxy.ts convention (Next.js 16)
// ─────────────────────────────────────────────────────────────────────────────
sep("Next.js 16 — proxy.ts convention");

if (existsSync(join(ROOT, "middleware.ts"))) {
  err("middleware.ts found — rename it to proxy.ts and rename the export to `proxy`");
} else {
  ok("No middleware.ts");
}

const proxyPath = join(ROOT, "proxy.ts");
if (existsSync(proxyPath)) {
  const src = readFileSync(proxyPath, "utf-8");

  if (!src.match(/export\s+(async\s+)?function\s+proxy/)) {
    err("proxy.ts exists but does not export a function named 'proxy'");
  } else {
    ok("proxy.ts exports 'proxy'");
  }

  const hasUrlGuard  = src.includes("NEXT_PUBLIC_SUPABASE_URL");
  const hasAnonGuard = src.includes("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!hasUrlGuard || !hasAnonGuard) {
    err(
      "proxy.ts is missing Supabase env guards — add:\n" +
      "    const SUPABASE_OK = !!process.env.NEXT_PUBLIC_SUPABASE_URL && " +
      "!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  } else {
    ok("proxy.ts has Supabase env guards");
  }

  if (src.includes("getUser") && !src.includes("try {")) {
    err("proxy.ts calls getUser() without try/catch — missing Supabase will 500 every page");
  } else if (src.includes("getUser")) {
    ok("proxy.ts wraps getUser() in try/catch");
  }
} else {
  warn("proxy.ts not found — if auth is used, this file is required");
}


// ─────────────────────────────────────────────────────────────────────────────
// 2. force-dynamic on every Supabase-touching page
// ─────────────────────────────────────────────────────────────────────────────
sep("force-dynamic on Supabase pages");

const SUPABASE_SIGNALS = [
  "createServerClient",
  "createBrowserClient",
  'from "@/lib/supabase',
  "from '@/lib/supabase",
  ".from(",           // supabase query
  "supabase.auth",
  "getUserCredit",
  "getSession",
  "getUser()",
];

function layoutHasDynamic(startDir) {
  let dir = startDir;
  while (dir.startsWith(join(ROOT, "app"))) {
    const lp = join(dir, "layout.tsx");
    if (existsSync(lp) && readFileSync(lp, "utf-8").includes("force-dynamic")) return true;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return false;
}

let dynamicIssues = 0;

function walkPages(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { walkPages(full); continue; }
    if (entry.name !== "page.tsx" && entry.name !== "page.ts") continue;

    const src     = readFileSync(full, "utf-8");
    const rel     = full.replace(ROOT + "/", "");

    // "use client" components run in the browser — they never prerender server-side
    if (src.match(/^["']use client["']/m)) continue;

    const needsIt = SUPABASE_SIGNALS.some((s) => src.includes(s));
    if (!needsIt) continue;

    const selfOk   = src.includes("force-dynamic");
    const layoutOk = layoutHasDynamic(dirname(full));

    if (!selfOk && !layoutOk) {
      err(`${rel} — uses Supabase but missing export const dynamic = "force-dynamic"`);
      dynamicIssues++;
    }
  }
}
walkPages(join(ROOT, "app"));
if (dynamicIssues === 0) ok("All Supabase-touching pages have force-dynamic");


// ─────────────────────────────────────────────────────────────────────────────
// 3. Bare empty arrays in lib/client.ts  →  never[] with as const
// ─────────────────────────────────────────────────────────────────────────────
sep("client.ts — typed empty arrays");

const clientPath = join(ROOT, "lib/client.ts");
if (existsSync(clientPath)) {
  let bareCount = 0;
  readFileSync(clientPath, "utf-8").split("\n").forEach((line, i) => {
    // Match `key: [],` or `key: []` without ` as ` on the same line
    if (/:\s*\[\s*\],?\s*(?:\/\/.*)?$/.test(line) && !line.includes(" as ")) {
      warn(`lib/client.ts:${i + 1} — bare [] infers as never[] under as const. Add \`as string[]\` or \`as Array<{...}>\``);
      bareCount++;
    }
  });
  if (bareCount === 0) ok("No bare empty arrays in lib/client.ts");
}


// ─────────────────────────────────────────────────────────────────────────────
// 4. TypeScript
// ─────────────────────────────────────────────────────────────────────────────
sep("TypeScript");

const tscBin = join(ROOT, "node_modules/.bin/tsc");
if (!existsSync(tscBin)) {
  warn("TypeScript not installed in node_modules — run npm install first");
} else {
  try {
    execSync(`"${tscBin}" --noEmit`, { cwd: ROOT, stdio: "pipe" });
    ok("No TypeScript errors");
  } catch (e) {
    const out = (e.stdout?.toString() ?? "") + (e.stderr?.toString() ?? "");
    const tsErrors = out.split("\n").filter((l) => l.includes("error TS"));
    err(`TypeScript: ${tsErrors.length} error(s)`);
    tsErrors.slice(0, 10).forEach((l) => console.error("     " + l));
    if (tsErrors.length > 10) console.error(`     … and ${tsErrors.length - 10} more`);
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n" + "─".repeat(52));
if (errors === 0 && warnings === 0) {
  console.log("✓ All checks passed. Safe to deploy.\n");
  process.exit(0);
} else {
  if (errors   > 0) console.error(`✗  ${errors} error(s) — must fix before deploying`);
  if (warnings > 0) console.warn( `⚠  ${warnings} warning(s) — review before deploying`);
  console.log("");
  process.exit(errors > 0 ? 1 : 0);
}
