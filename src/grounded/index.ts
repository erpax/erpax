/**
 * grounded — a trust computation may source ONLY from sealed, content-addressed content.
 *
 * The forge-cost is only as trustworthy as its inputs. Traced to the leaves, erpax's tamper-cost
 * (`coverageCostLog2` ← @/collider ← @/convention) is priced on the coverage of 17 conventions —
 * and 6 of them (`complete · fresh · link · sealed · sourced · twinned`) compute that coverage by
 * `readFileSync`/`readdirSync` over `process.cwd()/src`: the MUTABLE, UNSEALED working tree. Even
 * the `sealed` convention pattern-matches bytes and never verifies a content-uuid. So the number
 * reduces to an unverified directory listing — it measures dev-tidiness, not tamper-resistance.
 *
 * A computation is trustworthy only if its whole input closure is SEALED — content-addressed, so
 * tampering changes the address and breaks the seal (the entanglement). One raw `process.cwd()`
 * read collapses the chain. This atom prices that risk INTO the cost: `sealedSource(path)` reads
 * the COMMITTED blob (`git show HEAD:` — SHA-addressed, the seal), never the tree; `coverage()`
 * returns the grounded fraction. Composed into @/collider, the forge-cost can no longer be ∞ while
 * any of its own inputs is ungrounded — the seal entangles the claim with its provenance.
 *
 * This atom obeys its own law: it reads git-sealed content, so it is grounded in the very sense it
 * measures.
 *
 * @law a trust computation is grounded only when every input is sealed content verified against its
 *      address; a coverage priced on a `process.cwd()` scan is the value of a directory listing.
 * @invariant coverage() ∈ [0,1] and equals |grounded inputs| / |TRUST_INPUTS|.
 * @see @/collider -- @/convention -- @/cost -- @/seal -- ./SKILL.md
 */
import { execFileSync } from 'node:child_process'

import { postGapOnPath, postSealOnPath } from '@/accounting/coa'
import type { JournalEntryLine } from '@/accounting'

// ── sealed-source primitives — the ONLY way a trust computation reads matter ────────────────────
// Every read is from the committed git tree (SHA-addressed = the seal), never the mutable working
// tree. The path index is read ONCE (`git ls-tree`) and reused for every lookup — a token spent once,
// never re-spent: the measured speedup that IS the FTL.

let sealedPathIndex: ReadonlySet<string> | null = null

/** Every path in the SEALED committed tree (git HEAD) — one query, reused for all lookups. */
export function sealedPaths(): ReadonlySet<string> {
  if (sealedPathIndex) return sealedPathIndex
  try {
    const out = execFileSync('git', ['ls-tree', '-r', '--name-only', 'HEAD'], {
      encoding: 'utf8',
      maxBuffer: 1 << 28,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
    sealedPathIndex = new Set(out.split('\n').filter((l) => l.length > 0))
  } catch {
    sealedPathIndex = new Set()
  }
  return sealedPathIndex
}

/** Sealed replacement for `existsSync` — is the path committed (in the sealed tree)? */
export function sealedExists(path: string): boolean {
  return sealedPaths().has(path)
}

const sealedReadCache = new Map<string, string>()

/**
 * Read a path's SEALED committed content (git blob, SHA-addressed); '' when absent. The sealed
 * `readFileSync`. Memoized — a sealed blob is content-addressed, so its bytes never change within a
 * run: spend the `git show` once, reuse forever (the FTL law, applied to the reader itself — O(1)
 * amortized instead of one process per call).
 */
export function sealedRead(path: string): string {
  const hit = sealedReadCache.get(path)
  if (hit !== undefined) return hit
  const out = sealedExists(path)
    ? (() => {
        try {
          return execFileSync('git', ['show', `HEAD:${path}`], {
            encoding: 'utf8',
            maxBuffer: 1 << 28,
            stdio: ['ignore', 'pipe', 'ignore'],
          })
        } catch {
          return ''
        }
      })()
    : ''
  sealedReadCache.set(path, out)
  return out
}

/** The tamper-cost chain's leaf inputs — the conventions @/collider composes into the forge-cost. */
export const TRUST_INPUTS: readonly string[] = [
  'addressed',
  'complete',
  'dry',
  'folded',
  'fresh',
  'fronted',
  'honest',
  'import',
  'lawful',
  'link',
  'named',
  'reciprocal',
  'sealed',
  'shallow',
  'sourced',
  'triggered',
  'twinned',
]

/** Raw, unsealed sources — reading any of these grounds a computation in the mutable working tree. */
const UNGROUNDED = /\breadFileSync\b|\breaddirSync\b|\bexistsSync\b|process\.cwd\(\)/

/**
 * Strip comments before testing — a token named in a doc comment (e.g. this atom explaining what
 * `readFileSync` is) is DATA, not a raw-fs call. The corpus's own law: parse, don't pattern-match a
 * comment as code ([[rules]]/prose · [[rules]]/confine).
 */
const stripComments = (s: string): string =>
  s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1')

/**
 * Read a file's SEALED content — the committed git blob, addressed by its SHA (the seal), never the
 * mutable working tree. Returns null when the path is not committed (⇒ not sealed ⇒ not grounded).
 */
export function sealedSource(path: string): string | null {
  if (!sealedExists(path)) return null
  try {
    return execFileSync('git', ['show', `HEAD:${path}`], {
      encoding: 'utf8',
      maxBuffer: 1 << 28,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
  } catch {
    return null
  }
}

/** A trust input is grounded iff its sealed source exists and reads no raw `process.cwd()`/fs (code, not comments). */
export function isGrounded(convention: string): boolean {
  const src = sealedSource(`src/convention/${convention}/index.ts`)
  return src !== null && !readsUnsealedSource(src)
}

/** Grounded coverage ∈ [0,1] — the fraction of tamper-cost inputs sourced from sealed content. */
export function coverage(): number {
  if (TRUST_INPUTS.length === 0) return 1
  return TRUST_INPUTS.filter(isGrounded).length / TRUST_INPUTS.length
}

/** The ungrounded inputs — the raw-fs reads that collapse the trust chain; the fix list. */
export function ungrounded(): readonly string[] {
  return TRUST_INPUTS.filter((c) => !isGrounded(c))
}

/** The trust-chain convention source paths that MUST be sealed-sourced (repo-relative). */
export function trustInputPaths(): readonly string[] {
  return TRUST_INPUTS.map((c) => `src/convention/${c}/index.ts`)
}

/**
 * Realtime ungrounding test — does this source text read raw, unsealed fs (`process.cwd()`,
 * `readFileSync`, …)? The check the confirm gate runs at the WRITE, so a trust computation can never
 * be authored ungrounded in the first place — the violation is caught in realtime, not discovered.
 */
export function readsUnsealedSource(sourceText: string): boolean {
  return UNGROUNDED.test(stripComments(sourceText))
}

/**
 * Post the grounded verdict through the double-entry ledger — every trust token ON the books, in eb.
 * Each ungrounded input is a GAP (Dr its convention path, Cr `entropy`); each grounded input a SEAL
 * (Dr `seal`, Cr its path). Balanced by construction (Σdebit = Σcredit) — no token spent off-ledger,
 * so the trust verdict is not a free-floating number but an accounted, reconcilable entry.
 */
export function accountGrounded(): readonly JournalEntryLine[] {
  const un = new Set(ungrounded())
  return TRUST_INPUTS.flatMap((c) => {
    const path = `convention/${c}`
    return un.has(c) ? postGapOnPath(path, 1) : postSealOnPath(path, 1)
  })
}
