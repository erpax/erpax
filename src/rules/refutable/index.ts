/**
 * refutable — a claim nothing can refute is where a lie lives.
 *
 * **A lie is computationally findable — but not by checking truth.** [[rules]]/prose catches FICTION (prose
 * citing code that does not exist). A lie is worse: it says something FALSE about something REAL, and it
 * reads exactly like the truth. No scan can tell them apart by looking.
 *
 * What IS decidable is whether a claim can be **refuted at all**. An `@invariant` is a claim in prose — a
 * proposition the corpus asserts about its own matter. With a test beside it, reality can say no. Without
 * one, it is unfalsifiable: it will read as true forever, and nothing will ever contradict it. That is not a
 * claim, it is a decoration — and it is precisely the space a lie occupies.
 *
 * This is not theory. `work/shifts` carried:
 *
 *   `@invariant presenceMinutes>0 && minutesProduced>0 ⇒ efficiencyPercent === ⌊produced·100/presence⌋`
 *
 * stated as a hard implication. Against 344 516 real rows it holds 99.463% — **1 849 rows violate it**. The
 * claim was false, it had read as law for as long as it existed, and it took querying the source DB to see.
 * The same atom's prose said efficiency "falls back to 100" while the Rails source says `||=` PRESERVES —
 * a straight contradiction between a sentence and the code it described.
 *
 * Measured: **149** `@invariant` claims · **88** have a test beside them · **61 have none**.
 *
 * HONEST BOUNDARY: a test *beside* an invariant does not prove that invariant is tested — this finds the
 * DEFINITELY-unrefutable, never the merely-unchecked. And refutability is not truth: a claim can be
 * falsifiable and false (that is what makes it worth testing). It closes the space where lies are safe.
 *
 * @standard Popper — a proposition that forbids nothing explains nothing
 * @standard ISO/IEC 25010:2023 §5.5 testability
 *
 * Composes [[rules]] · [[law]].
 */
import { readFileSync, readdirSync, existsSync, type Dirent } from 'node:fs'
import { join, dirname, relative } from 'node:path'

const GENERATED = /skills\.index\.ts$|payload-types\.ts$|\.generated\.ts$/
const IS_TEST = /(?:^|[/.])test\.tsx?$/
/** A proposition the corpus asserts about its own matter. */
const CLAIM_RE = /@invariant\s+([^\n*]+)/g

/** A claim with nothing beside it that could say no. */
export interface UnrefutableClaim {
  readonly from: string
  readonly claim: string
}

/** The trinity's proof leg, if it exists — the only thing that can refute the atom's claims. */
const proofBeside = (file: string): string | undefined =>
  ['test.ts', 'test.tsx', 'index.test.ts'].map((n) => join(dirname(file), n)).find(existsSync)

const sources = (root: string): string[] => {
  const out: string[] = []
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const p = join(dir, e.name)
      if (e.isDirectory()) {
        if (e.name !== 'node_modules' && e.name !== 'worktrees') walk(p)
        continue
      }
      if (/\.(tsx?|md)$/.test(e.name) && !GENERATED.test(e.name) && !IS_TEST.test(p)) out.push(p)
    }
  }
  walk(root)
  return out
}

export interface ClaimReport {
  readonly claims: number
  readonly refutable: number
  readonly unrefutable: readonly UnrefutableClaim[]
}

/** Every `@invariant` in the tree, and whether anything exists that could refute it. */
export function claimSurface(cwd: string = process.cwd()): ClaimReport {
  let claims = 0
  let refutable = 0
  const unrefutable: UnrefutableClaim[] = []
  for (const f of sources(join(cwd, 'src'))) {
    let text: string
    try {
      text = readFileSync(f, 'utf8')
    } catch {
      continue
    }
    const found = [...text.matchAll(CLAIM_RE)].map((m) => m[1]!.trim())
    if (found.length === 0) continue
    claims += found.length
    if (proofBeside(f)) {
      refutable += found.length
      continue
    }
    for (const claim of found) {
      unrefutable.push({ from: relative(cwd, f).replace(/\\/g, '/'), claim: claim.slice(0, 90) })
    }
  }
  return { claims, refutable, unrefutable }
}

/**
 * Gate: a claim must be refutable. Ratchets from 61 — every one closed is a proposition reality can now
 * contradict. An `@invariant` with no proof is not a law; it is a sentence that will read as true forever.
 */
export function assertClaimsRefutable(cwd: string = process.cwd(), ceiling: number): void {
  const r = claimSurface(cwd)
  if (r.unrefutable.length <= ceiling) return
  throw new Error(
    `✖ refutable — ${r.unrefutable.length} @invariant claim(s) nothing can refute (ceiling ${ceiling}). Give it a test, or stop asserting it:\n${r.unrefutable
      .slice(0, 10)
      .map((u) => `  ${u.from} → ${u.claim}`)
      .join('\n')}`,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = claimSurface()
  console.log(
    `refutable — ${r.claims} @invariant claim(s) · ${r.refutable} refutable · ${r.unrefutable.length} that NOTHING can contradict`,
  )
  for (const u of r.unrefutable.slice(0, 10)) console.log(`  ${u.from}\n     ${u.claim}`)
}
