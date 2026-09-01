/**
 * cloudflare/surface — the config and the code must agree, and nothing warns when they do not.
 *
 * A binding read under a name `wrangler.jsonc` does not declare is `undefined` at runtime. Every
 * reader in this corpus guards with an early return, so the failure is **silent**: no error, no log,
 * no failed deploy — the function simply does nothing, forever, in production.
 *
 * It is the same shape as the cron triggers that fired into nothing ([[run]]/cron): the platform
 * does not warn about a declaration with no counterpart, in either direction. That is precisely why
 * the class needs a gate rather than a fix — the point fix closes one instance and the next lands
 * unnoticed.
 *
 * ## The direction that is sound, and the one that is not
 *
 * **READ ⇒ DECLARED is decidable and enforced here.** A name read from `env` that no binding
 * declares can never be anything but `undefined`.
 *
 * **DECLARED ⇒ READ is NOT enforced**, and stating why is the honest part: a declared binding may be
 * read by OpenNext internals (`WORKER_SELF_REFERENCE`), by the Payload adapter (`D1`, `R2`), by a
 * plugin, or by a module this scan does not cover. Flagging those would be a gate that cries wolf,
 * and [[rules]]/bypass already records what that costs. `unreadBindings` reports them as
 * information; nothing fails on it.
 *
 * ## Parsed, not matched
 *
 * A binding named in a COMMENT is prose about the surface, not a use of it — the false positive that
 * cost [[rules]]/confine a wrong measurement. Comments are stripped via [[syntax]] before the scan.
 *
 * @law a binding read by code must be declared by config. The platform does not warn when it is not,
 *      so the read silently returns undefined and the guarded caller silently does nothing.
 * @invariant a binding named only in a comment is not counted as read
 * @invariant the ratchet falls, never rises — a new undeclared read fails the gate
 * @standard ISO/IEC 25010:2023 §5.3 — compatibility: co-existence with the platform's contract
 * @see ./SKILL.md -- ../index.ts -- ../../run/cron/index.ts
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { commentsOf } from '@/syntax'

/** Files whose `env.X` reads are part of the binding surface. */
export const SURFACE_FILES: readonly string[] = ['src/cloudflare/index.ts']

/** Every binding name `wrangler.jsonc` declares, from any block carrying a name or binding key. */
export function declaredBindings(cwd: string = process.cwd()): ReadonlySet<string> {
  const text = readFileSync(join(cwd, 'wrangler.jsonc'), 'utf8')
  return new Set([...text.matchAll(/"(?:name|binding)"\s*:\s*"([A-Z][A-Z0-9_]*)"/g)].map((m) => m[1]!))
}

/** Every binding name the surface files READ — comments stripped, because a mention is not a use. */
export function readBindings(cwd: string = process.cwd()): ReadonlySet<string> {
  const out = new Set<string>()
  for (const rel of SURFACE_FILES) {
    const file = join(cwd, rel)
    const src = readFileSync(file, 'utf8')
    const comments = commentsOf(rel, src).join('\n')
    const code = src
      .split('\n')
      .filter((l) => l.trim().length > 0 && !comments.includes(l.trim()))
      .join('\n')
    for (const m of code.matchAll(/\benv\.([A-Z][A-Z0-9_]{2,})/g)) out.add(m[1]!)
  }
  return out
}

/** The violation: read by code, declared by nothing — permanently undefined in production. */
export function undeclaredReads(cwd: string = process.cwd()): readonly string[] {
  const declared = declaredBindings(cwd)
  return [...readBindings(cwd)].filter((r) => !declared.has(r)).sort()
}

/** Declared but not read HERE — information only. OpenNext, Payload and plugins read some of these. */
export function unreadBindings(cwd: string = process.cwd()): readonly string[] {
  const read = readBindings(cwd)
  return [...declaredBindings(cwd)].filter((d) => !read.has(d)).sort()
}

/**
 * The ratchet ceiling. Three reads are undeclared today — `ANALYTICS`, `QUEUE` and `WORKFLOWS` —
 * and each makes its caller a no-op in production: `sinkAnalytics` and `emitToQueue` return without
 * doing anything, every time, and have since the names diverged.
 *
 * They are left in place rather than rerouted here because choosing a destination is a design
 * decision (which analytics dataset? which named queue?), not a repair. The ceiling makes them
 * visible and stops a fourth from joining them unnoticed.
 */
export const UNDECLARED_READ_CEILING = 3

export function assertBindingSurface(cwd: string = process.cwd(), ceiling: number = UNDECLARED_READ_CEILING): void {
  const bad = undeclaredReads(cwd)
  if (bad.length > ceiling) {
    throw new Error(
      `cloudflare/surface: ${bad.length} binding(s) read but not declared > ceiling ${ceiling} — ` +
        `${bad.join(', ')}. An undeclared read is undefined at runtime, and every caller guards with ` +
        'an early return, so the function silently does nothing in production.',
    )
  }
}

/** @index-cross.foldback child=cloudflare/surface parent=cloudflare — this cross folds back into its parent. */
