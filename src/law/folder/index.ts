/**
 * folder — THE folder-shape law, computed from the live tree (never hand-listed).
 *
 * The law (the user's standing command): **every atom is ONE generic lowercase word
 * holding only its trinity** — `SKILL.md` (the word / antimatter), `index.ts` (the
 * matter), `test.ts` (the proof) — plus the allowed per-folder `translations.ts` /
 * `seed.ts`. Two ways a folder breaks it, both computed here:
 *
 *   • NAME    — the folder is not one word: a hyphen (`trading-apis`), camelCase
 *               (`appCollections`), or a `.suffix` (`account.service`). The
 *               generic-naming law: name by the generic data-type in one
 *               concatenated word, regulation refs only in [[standards]] / banners.
 *   • TRINITY — a CODE folder (one holding `index.ts` or `test.ts`) is missing any
 *               of `SKILL.md` / `index.ts` / `test.ts`. A folder holding ONLY a
 *               `SKILL.md` is a legal vocabulary word (antimatter-only) — NOT a
 *               violation; the trinity is required only once matter appears.
 *
 * This is the gap that let `src/config/trading-apis/index.ts` exist: the sibling
 * file-purity law ([[quaternary]]) flags *disallowed* files but never the folder
 * NAME and never a *missing* trinity member — so a hyphenated, `index.ts`-only
 * folder passed every gate. This law closes both.
 *
 * **The gate is a RATCHET, not purity===0** (mirrors [[convention]]/import). The
 * live tree carries a known backlog of pre-law folders; driving it to 0 is a
 * tree-wide rename + trinity-authoring migration (separate scope). What this gate
 * guarantees is exact and is the whole point of the user's command — *the folder
 * law CANNOT GET WORSE*: every new malformed folder is a red gate (in the live
 * [[confirm]] hook, pre-push, and CI [[tests|test]]), so **no agent can introduce
 * one in any session**. The baseline only ratchets DOWN, in the same diff that
 * removes folders (reviewable in `git log`). Zero ⇒ tamper-[[cost]] → ∞.
 *
 * Generated / framework trees are NOT atoms and are skipped wholesale: `src/app/`
 * (Next.js route segments are URLs — kebab-case by web convention) and
 * `src/migrations/` (disposable greenfield output). Framework path segments
 * (`(group)`, `[slug]`, `@slot`) and numeric standard ids (`4217`, `16931`) are
 * exempt from the one-word rule — they are structural, not names.
 *
 *   tsx src/law/folder/index.ts            # print the live violation breakdown
 *   tsx src/law/folder/index.ts --check    # the gate: exit 1 if total > baseline
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness §5.5 testability
 * @audit the law is computed from the live tree; the ratchet decision is a pure fn (test.ts)
 * @see ../../migrate/quaternary (the file-purity sibling) · ../../convention/import (the ratchet pattern) · ../SKILL.md (the canonical laws)
 */
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SRC = join(process.cwd(), 'src')

/** The required core of every CODE atom — present ⇒ the folder is a unit, not a word. */
export const TRINITY = ['SKILL.md', 'index.ts', 'test.ts'] as const
/** A folder is a CODE atom (so the trinity is required) iff it holds matter or its proof. */
const CODE_MARKERS = ['index.ts', 'test.ts'] as const
/** One generic lowercase word — the only legal atom-folder name. */
export const ONE_WORD = /^[a-z][a-z0-9]*$/
/** Structural segments whose names are NOT atom names (exempt from the one-word rule). */
const isFrameworkSegment = (name: string): boolean =>
  /^\([^)]*\)$/.test(name) || // Next.js route group   (frontend)
  /^\[.*\]$/.test(name) || // dynamic route segment    [slug] [...rest]
  name.startsWith('@') || // parallel-route slot        @modal
  /^[0-9]+$/.test(name) // numeric standard id          iso/4217 · en/16931
/** Generated / framework trees: names are URLs or disposable output — not atoms. */
const SKIP_TREES = new Set(['app', 'migrations'])

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

export interface NameViolation {
  readonly folder: string
  readonly law: 'one-word'
}
export interface TrinityViolation {
  readonly folder: string
  readonly missing: readonly string[]
  readonly law: 'trinity'
}
export interface FolderViolations {
  readonly name: NameViolation[]
  readonly trinity: TrinityViolation[]
  readonly total: number
}

/** Compute every folder-shape violation in the live src tree — the single source of truth. */
export function folderViolations(root: string = SRC): FolderViolations {
  const name: NameViolation[] = []
  const trinity: TrinityViolation[] = []
  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir).sort()
    } catch {
      return
    }
    const files = new Set(entries.filter((e) => !isDir(join(dir, e))))
    // TRINITY: once a folder holds matter (or its proof) it must hold the whole trinity.
    if (CODE_MARKERS.some((m) => files.has(m))) {
      const missing = TRINITY.filter((f) => !files.has(f))
      if (missing.length) trinity.push({ folder: rel || '.', missing, law: 'trinity' })
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (!isDir(p)) continue
      if (!rel && SKIP_TREES.has(e)) continue // skip generated/framework trees at the root
      const childRel = rel ? rel + '/' + e : e
      // NAME: every atom folder is one generic word (structural segments exempt).
      if (!isFrameworkSegment(e) && !ONE_WORD.test(e)) name.push({ folder: childRel, law: 'one-word' })
      walk(p, childRel)
    }
  }
  walk(root, '')
  return { name, trinity, total: name.length + trinity.length }
}

/**
 * FOLDER_LAW_BASELINE — the committed ceiling on folder-shape violations.
 *
 * A checked-in literal so the ratchet is reviewable in git: a change that adds a
 * malformed folder pushes the live count over this number and FAILS the gate; a
 * change that fixes folders LOWERS this number in the same diff. It moves only
 * DOWN. Derived live from `tsx src/law/folder/index.ts` (331 = 49 name + 282
 * trinity, 2026-06-07) — ratcheted 397 → 386 (first architect wave: 11 cold atoms)
 * → 383 (quantum wave: chart/reality/wallet) → 360 (archangel wave 1: 23 crosses +
 * the auto/resolve atom) → 331 after archangel wave 2 closed 29 more cold crosses
 * (the proof leg for standards atoms — iso/ifrs/nist/etsi/eu/un/wco/oecd/ghg/nace/
 * incoterms/peppol/bcp/saf + self/lot domain atoms), each verified green → 323
 * after archangel wave 3 (first increment: website/work/workers/workflow +
 * federation/post-close/pwa/sectors), each verified green.
 * config/trading-apis (the named violation) is still among the 323: the gate keeps
 * it red until it is relocated to the one-word src/trading/api. RATCHET DOWN further.
 */
export const FOLDER_LAW_BASELINE = 323

export interface RatchetVerdict {
  readonly ok: boolean
  readonly violations: number
  readonly baseline: number
  readonly reason: string
}

/**
 * The pure ratchet decision — no fs, no process, so it is regression-locked by
 * test.ts. Fail-closed: a non-finite count or baseline (a broken scan / literal)
 * is NOT a pass. The only ok path is a successful scan whose total ≤ baseline.
 */
export function folderRatchet({ violations, baseline }: { violations: number; baseline: number }): RatchetVerdict {
  if (!Number.isFinite(violations) || violations < 0)
    return { ok: false, violations, baseline, reason: 'folder-violation count is not a finite, non-negative number — scan failed (DENY)' }
  if (!Number.isFinite(baseline) || baseline < 0)
    return { ok: false, violations, baseline, reason: 'baseline is not a finite, non-negative number (DENY)' }
  if (violations > baseline)
    return {
      ok: false,
      violations,
      baseline,
      reason:
        `folder-shape violations rose ${violations - baseline} above the baseline (${violations} > ${baseline}) — a non-one-word folder, or a code folder missing its SKILL.md / index.ts / test.ts trinity, was added. ` +
        `Name every atom folder as ONE generic lowercase word; give every code folder the full trinity (translations.ts / seed.ts allowed).`,
    }
  return {
    ok: true,
    violations,
    baseline,
    reason:
      violations < baseline
        ? `folder-shape improved (${violations} < ${baseline}) — lower FOLDER_LAW_BASELINE to ${violations} in this commit to ratchet the gain`
        : `folder-shape held at the baseline (${violations})`,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const v = folderViolations()
  const check = process.argv.includes('--check')
  console.log(`folder law: ${v.total} violation(s) — ${v.name.length} name (non-one-word) · ${v.trinity.length} trinity (code folder missing SKILL/index/test)`)
  for (const n of v.name.slice(0, 40)) console.log(`   name     ${n.folder}`)
  if (v.name.length > 40) console.log(`   … ${v.name.length - 40} more name`)
  for (const t of v.trinity.slice(0, 40)) console.log(`   trinity  ${t.folder} → missing ${t.missing.join('+')}`)
  if (v.trinity.length > 40) console.log(`   … ${v.trinity.length - 40} more trinity`)
  if (check) {
    const verdict = folderRatchet({ violations: v.total, baseline: FOLDER_LAW_BASELINE })
    console.log((verdict.ok ? '✓ ' : '✗ ') + verdict.reason)
    process.exit(verdict.ok ? 0 : 1)
  }
}
