/**
 * Creates a Supabase client configured for use in Next.js proxy (middleware).
 * Reads/writes cookies via the provided handlers so the session is
 * refreshed on every request without accessing the file system.
 *
 * Throws if NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY are
 * missing — callers must guard with a SUPABASE_OK check before calling this.
 */
import { createServerClient } from "@supabase/ssr";
import type { Database } from "./types";

export function createMiddlewareClient({
  getCookies,
  setCookies,
}: {
  getCookies: () => Array<{ name: string; value: string }>;
  setCookies: (
    cookies: Array<{ name: string; value: string; options?: Record<string, unknown> }>
  ) => void;
}) {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error(
      "createMiddlewareClient: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set"
    );
  }

  return createServerClient<Database>(url, anon, {
    cookies: {
      getAll: getCookies,
      setAll: setCookies,
    },
  });
}
