# Project Rules

## No em dashes or en dashes

Never use em dashes (-) or en dashes (-) anywhere in the codebase.
Always use regular hyphens (-) instead.

This applies to all .tsx, .ts, .md, and .json files under app/, components/, and lib/.
Do NOT change files in node_modules or .next.

---

## Pre-deploy checks - run before every push

Run `npm run check` before every `git push`. Fix all errors, review warnings.
This catches all 3 bugs that have broken past deployments (see below).

---

## Next.js 16 - use proxy.ts, never middleware.ts

Next.js 16 renamed the middleware convention:
- File must be `proxy.ts` (not `middleware.ts`)
- Export must be `export async function proxy(...)` (not `middleware`)
- Having both files simultaneously causes a hard build error

When creating or touching auth/edge logic: always use proxy.ts.

---

## proxy.ts - guard Supabase with env check + try/catch

The proxy runs at the edge before env vars are guaranteed. Always write:

```ts
const SUPABASE_OK =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function proxy(req: Request) {
  if (!SUPABASE_OK) return NextResponse.next();  // skip auth entirely

  try {
    const { data: { user } } = await supabase.auth.getUser();
    // redirect logic
  } catch {
    return NextResponse.next();  // Supabase unreachable - let request through
  }
}
```

Without this, any missing Supabase env var (common on initial Vercel setup)
will 500 every page including fully public ones.

---

## force-dynamic on every Supabase-touching page

Next.js tries to statically prerender all pages at build time. Pages that call
`createServerClient()`, `createBrowserClient()`, or any Supabase helper will
crash at build because env vars are only available at runtime.

Rule: Any page (or its nearest parent `layout.tsx`) that touches Supabase must have:

```ts
export const dynamic = "force-dynamic";
```

Always-affected directories - covered by their layout.tsx:
- app/admin/ (via app/admin/layout.tsx)

Individual pages that always need it directly:
- app/account/page.tsx
- app/account/redeem/page.tsx
- app/quiz/page.tsx
- app/hive/members/page.tsx
- app/strategy/book/page.tsx
- app/challenge/content/page.tsx

Note: "use client" components cannot export `dynamic`. Put it on the server
component page or its layout.

---

## lib/client.ts - never leave bare [] in as const objects

TypeScript infers `[]` as `never[]` inside `as const` objects. Any page that
calls `.map()` on such an array fails with "Property X does not exist on type 'never'".

Rule: Every empty array in lib/client.ts must have an explicit type cast:

```ts
// wrong
steps: [],
faqs: [],

// correct
steps: [] as Array<{ num: string; title: string; desc: string }>,
faqs:  [] as Array<{ q: string; a: string }>,
```

---

## TypeScript must be clean before every push

`npm run check` runs tsc automatically. No TypeScript errors allowed on pushes to main.

Always use the local binary (not global npx which may not find it):
```
node_modules/.bin/tsc --noEmit
```
