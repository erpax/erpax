/**
 * rules/bypass — access control is ON by default, and a bypass must earn its way past.
 *
 * Payload's Local API defaults to `overrideAccess: true`, so bypass is the AMBIENT condition a request
 * handler inherits by writing nothing. Argued in ./SKILL.md: the one live site, why the baseline is real
 * rather than aspirational, and the MCP gateway the scope used to miss.
 *
 * @law on a request-reachable path, access control is on by default — a call that disables it must sit
 *      in a handler that authenticated the caller first.
 *
 * @standard ISO/IEC 27001 A.5.23 — cloud-service tenant isolation
 * @standard ISO/IEC 25010:2023 §5.4 — security: confidentiality by default
 */
import { allFiles, textOf } from '@/syntax/cache'
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

/** The trees a REQUEST can reach — `src/app` routes, and `/api/mcp` mounts the gateway. See ./SKILL.md § the MCP gateway is a request path too. */
const REQUEST_ROOTS = ['src/app', 'src/agents/mcp'] as const

const BYPASS = /overrideAccess:\s*true/g
const AUTH = /payload\.auth\s*\(/

/** Bypasses on request-reachable paths. A bypass inside a COMMENT is prose, not a use — see ./SKILL.md. */
export function bypassSites(cwd: string = process.cwd()): readonly BypassSite[] {
  const out: BypassSite[] = []

  // The request-reachable trees, filtered from the ONE shared walk ([[syntax]]/cache).
  const walk = (dir: string): void => {
    const prefix = `${dir}/`
    for (const p of allFiles(cwd)) {
      if (!p.startsWith(prefix)) continue
      const name = p.slice(p.lastIndexOf('/') + 1)
      if (/(^|\/)\./.test(p.slice(dir.length))) continue
      if (!/\.(ts|tsx)$/.test(name) || /\.test\.|(^|\/)test\./.test(name)) continue
      // A generated face restates every symbol AND every SKILL description — including this law's own.
      if (/\.generated\.tsx?$|(^|\/)(generated|catalogue|skills\.index|payload-types)\.tsx?$/.test(name)) continue
      let text: string
      try {
        text = textOf(p)
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

  for (const r of REQUEST_ROOTS) walk(join(cwd, r))
  // A file reachable from two roots is one site, not two.
  const seen = new Set<string>()
  return out
    .filter((s) => (seen.has(s.file) ? false : (seen.add(s.file), true)))
    .sort((a, b) => a.file.localeCompare(b.file))
}

/**
 * EVERY bypass in the corpus, not just the routed ones — the ratcheted axis. See ./SKILL.md for why
 * this one ratchets DOWN while `bypassSites` is a theorem at 0.
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

/** @index-cross.foldback child=rules/bypass parent=rules — this cross folds back into its parent. */
