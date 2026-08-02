/**
 * rules/bypass — access control is ON by default, and a bypass must earn its way past.
 *
 * Payload's Local API defaults to `overrideAccess: true`. That is the framework's choice and it is
 * defensible — the Local API is how hooks, seeds, migrations and system jobs act with no user in
 * scope, and they genuinely cannot pass an access check. But it means **the ambient condition on a
 * server is bypass**, and a route handler inherits it by writing nothing at all.
 *
 * So the corpus inverts the default where it matters. On a REQUEST-REACHABLE path — anything under
 * `src/app`, which Next.js routes — a call that disables access control must sit in a handler that
 * has authenticated the caller. The corpus already does this correctly in the one place it applies:
 *
 *   `app/(api)/api/subscriptions/create/route.ts` calls `payload.auth({ headers })` first, rejects
 *   a principal with no email (an API key has no tenant), derives the tenant FROM THE AUTHENTICATED
 *   USER rather than from the request body, and only then bypasses — its own comment says "it IS
 *   the authorization boundary".
 *
 * That is a legitimate pattern. What it lacked was a gate: nothing stopped the next route from
 * doing the first half and forgetting the second, and the failure would be silent — a 200 with
 * another tenant's rows in it. [[rules]]/unraised names this exact shape: the check that never runs.
 *
 * **The baseline is 0 and it is real**, not aspirational: one file bypasses, and it authenticates.
 * A gate that starts at zero cannot be argued down later.
 *
 * @law on a request-reachable path, access control is on by default — a call that disables it must
 *      sit in a handler that authenticated the caller first.
 * @invariant only `src/app` is judged; a hook or a seed is not request-reachable and is not counted
 * @invariant a file with no bypass is never a violation — this counts bypasses, not files
 * @standard ISO/IEC 27001 A.5.23 — cloud-service tenant isolation
 * @standard ISO/IEC 25010:2023 §5.4 — security: confidentiality by default
 * @see ./SKILL.md -- ../../rules -- ../unraised
 */
import { readdirSync, readFileSync, type Dirent } from 'node:fs'
import { join } from 'node:path'

import { commentsOf } from '@/syntax'

export interface BypassSite {
  /** repo-relative path of the request-reachable file */
  readonly file: string
  /** how many access-control bypasses it performs */
  readonly bypasses: number
  /** whether the same file authenticates the caller */
  readonly authenticates: boolean
}

/** The directory Next.js routes. Nothing outside it is reachable by a request. */
const REQUEST_ROOT = 'src/app'

const BYPASS = /overrideAccess:\s*true/g
const AUTH = /payload\.auth\s*\(/

/**
 * Bypasses on request-reachable paths.
 *
 * A `overrideAccess: true` appearing only inside a COMMENT is prose about the pattern, not a use of
 * it — [[syntax]] strips comments so a docstring explaining this very law cannot be counted as
 * breaking it. That false-positive class already cost [[rules]]/confine a wrong measurement.
 */
export function bypassSites(cwd: string = process.cwd()): readonly BypassSite[] {
  const out: BypassSite[] = []
  const root = join(cwd, REQUEST_ROOT)

  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const p = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') walk(p)
        continue
      }
      if (!/\.(ts|tsx)$/.test(entry.name) || /\.test\.|(^|\/)test\./.test(entry.name)) continue
      let text: string
      try {
        text = readFileSync(p, 'utf8')
      } catch {
        continue
      }
      const rel = p.slice(cwd.length + 1)
      // comments are DATA — a docstring naming the pattern is not a use of it
      const comments = commentsOf(rel, text).join('\n')
      const code = text.split('\n').filter((l) => !comments.includes(l.trim()) || l.trim().length === 0).join('\n')
      const bypasses = (code.match(BYPASS) ?? []).length
      if (bypasses === 0) continue
      out.push({ file: rel, bypasses, authenticates: AUTH.test(code) })
    }
  }

  walk(root)
  return out.sort((a, b) => a.file.localeCompare(b.file))
}

/**
 * EVERY bypass in the corpus, not just the routed ones — the ratcheted axis.
 *
 * `bypassSites` judges `src/app` at a theorem baseline of 0, because a silent cross-tenant read on
 * a route is a catastrophe. But that leaves the other ~130 UNMONITORED, and an unmonitored default
 * is how the count reached 138 in the first place: nothing was counting.
 *
 * So the whole surface is counted and ratcheted DOWN. It cannot be a theorem at 0 today — hooks and
 * seeds genuinely have no user until [[principal]] replaces them one subsystem at a time — but it
 * can be forbidden from growing, which is the difference between a debt and a leak.
 *
 * @invariant a bypass in a comment is not counted — prose about the pattern is not a use of it
 */
export function allBypasses(cwd: string = process.cwd()): readonly BypassSite[] {
  const out: BypassSite[] = []
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const p = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') walk(p)
        continue
      }
      if (!/\.(ts|tsx)$/.test(entry.name) || /\.test\.|(^|\/)test\./.test(entry.name)) continue
      let text: string
      try {
        text = readFileSync(p, 'utf8')
      } catch {
        continue
      }
      const rel = p.slice(cwd.length + 1)
      const comments = commentsOf(rel, text).join('\n')
      const code = text.split('\n').filter((l) => !comments.includes(l.trim()) || l.trim().length === 0).join('\n')
      const bypasses = (code.match(BYPASS) ?? []).length
      if (bypasses === 0) continue
      out.push({ file: rel, bypasses, authenticates: AUTH.test(code) })
    }
  }
  walk(join(cwd, 'src'))
  return out.sort((a, b) => b.bypasses - a.bypasses || a.file.localeCompare(b.file))
}

/** Total bypasses corpus-wide — the number the ratchet drives to zero. */
export function bypassCount(cwd: string = process.cwd()): number {
  return allBypasses(cwd).reduce((n, s) => n + s.bypasses, 0)
}

/** Ratchet: the corpus-wide bypass count may fall, never rise. */
export function assertBypassRatchet(cwd: string = process.cwd(), ceiling: number): void {
  const n = bypassCount(cwd)
  if (n > ceiling) {
    throw new Error(
      `rules/bypass: ${n} access-control bypasses corpus-wide > ceiling ${ceiling} — ` +
        'a bypass may be migrated to a scoped principal, never added. See src/principal.',
    )
  }
}

/** The violation: a request-reachable bypass in a handler that never authenticated anyone. */
export function unauthenticatedBypasses(cwd: string = process.cwd()): readonly BypassSite[] {
  return bypassSites(cwd).filter((s) => !s.authenticates)
}

/**
 * Fail closed. The ceiling is 0 and it is a THEOREM baseline, not a ratchet: there is no acceptable
 * number of request-reachable handlers that disable access control without authenticating, so there
 * is no threshold to raise as the corpus grows.
 */
export function assertNoUnauthenticatedBypass(cwd: string = process.cwd(), ceiling = 0): void {
  const bad = unauthenticatedBypasses(cwd)
  if (bad.length > ceiling) {
    throw new Error(
      `rules/bypass: ${bad.length} request-reachable handler(s) disable access control without calling payload.auth\n` +
        bad.map((b) => `  ${b.file} — ${b.bypasses} bypass(es), no payload.auth`).join('\n'),
    )
  }
}

/* c8 ignore start -- CLI face: `pnpm erpax bypass` */
if (import.meta.url === `file://${process.argv[1]}`) {
  const sites = bypassSites()
  const bad = unauthenticatedBypasses()
  console.log(`request-reachable bypasses: ${sites.length} file(s) · unauthenticated: ${bad.length}`)
  for (const s of sites) {
    console.log(`  ${s.authenticates ? 'AUTHED  ' : 'NO AUTH '}${s.file}  ×${s.bypasses}`)
  }
  process.exitCode = bad.length === 0 ? 0 : 1
}
/* c8 ignore stop */
