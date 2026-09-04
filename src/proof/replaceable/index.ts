import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { standardRegister } from '@/proof/register'

/**
 * proof/replaceable — a cited standard is an AXIOM until a gate discharges it.
 *
 * @see ./SKILL.md
 */

export interface CitingAtom {
  readonly atomPath: string
  readonly standards: readonly string[]
}

/**
 * Every atom's `## Standards` section, read from its SKILL.
 *
 * The bold lead of each bullet is the standard; the gloss after the dash is prose about it.
 */
export function citingAtoms(cwd: string = process.cwd()): CitingAtom[] {
  const out: CitingAtom[] = []
  const walk = (d: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (e.isDirectory()) {
        walk(p)
        continue
      }
      if (e.name !== 'SKILL.md') continue
      const sec = /\n## Standards\n([\s\S]*?)(?=\n## |\n---|\s*$)/.exec(readFileSync(p, 'utf8'))
      if (!sec) continue
      const standards = [...sec[1]!.matchAll(/^\s*[-*]\s+\*\*(.+?)\*\*/gm)].map((m) => m[1]!.trim())
      if (standards.length > 0) out.push({ atomPath: relative(join(cwd, 'src'), join(p, '..')), standards })
    }
  }
  walk(join(cwd, 'src'))
  return out
}

/**
 * Standards a gate can never discharge, DECLARED in the open so the exemption is arguable.
 *
 * Each is a fact about the WORLD, not about anything this corpus holds: an identifier only a
 * registration agency may assign, a physical constant, a statute whose text lives elsewhere, a
 * signature from a third party. No amount of reading `src` decides them, and pretending
 * otherwise would manufacture exactly the false conformance these gates exist to refuse.
 */
const EMPIRICAL = [
  'ISO 26324', // DOI — assigned by a registration agency ([[rules]]/forge)
  'RFC 3161', // trusted timestamp — a third party's signature
  'ISO 17442', // LEI — issued by a LOU
  'Наредба Н-18', // the statute's text is not in this repo; NAP registration is not a gate
  'ЗДДС',
  'ЗСч',
  'SOX', // §302 is a natural person's certification — no gate signs it
] as const

/** The declared list, as a function — an exported constant is seal-debt ([[matrix]]/constants-audit). */
export const empiricalStandards = (): readonly string[] => EMPIRICAL

/** Normalise a standard to its identity: `ISO-19011:2018` and `ISO 19011:2018` are one standard. */
export const standardKey = (raw: string): string =>
  raw
    .split('—')[0]!
    .split('§')[0]!
    .replace(/[-‑]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export interface AssumedStandard {
  readonly standard: string
  readonly cites: number
  readonly citedBy: readonly string[]
  /** True when it is a fact about the world; a gate is the wrong instrument. */
  readonly empirical: boolean
}

/**
 * The queue: every cited standard nothing discharges, most-cited first.
 *
 * `standardRegister` already computes cited-vs-discharged and was called by NOTHING but its own
 * test — the instrument existed and had never been pointed at the tree ([[rules]]/unfolded's
 * single-use defect, in its most expensive form: a measurement nobody took).
 */
export function assumedStandards(cwd: string = process.cwd()): AssumedStandard[] {
  const atoms = citingAtoms(cwd).map((a) => ({ atomPath: a.atomPath, standards: a.standards.map(standardKey) }))
  const empirical = new Set<string>(EMPIRICAL.map(standardKey))
  return standardRegister(atoms, cwd)
    .filter((r) => r.dischargedBy.length === 0)
    .map((r) => ({
      standard: r.standard,
      cites: r.citedBy.length,
      citedBy: r.citedBy,
      empirical: [...empirical].some((e) => r.standard.startsWith(e)),
    }))
    .sort((a, b) => b.cites - a.cites)
}

/** Assumed AND decidable from what the corpus holds — the theorems not yet written. */
export const replaceableStandards = (cwd: string = process.cwd()): AssumedStandard[] =>
  assumedStandards(cwd).filter((s) => !s.empirical)

/**
 * Fails closed on a NEW ungated standard. The ceiling ratchets down as each is discharged.
 *
 * It counts the REPLACEABLE ones only: adding a citation to a statute is not a regression, and
 * counting it would push toward citing fewer laws rather than gating more of them.
 */
export function assertStandardsGated(cwd: string = process.cwd(), ceiling: number): void {
  const open = replaceableStandards(cwd)
  if (open.length <= ceiling) return
  throw new Error(
    `✖ proof/replaceable — ${open.length} cited standard(s) nothing discharges (ceiling ${ceiling}):\n` +
      open.slice(0, 20).map((s) => `  ${String(s.cites).padStart(3)} cites  ${s.standard}`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const all = assumedStandards()
  const open = replaceableStandards()
  console.log(`proof/replaceable — ${all.length} assumed · ${open.length} replaceable by a theorem · ${all.length - open.length} empirical\n`)
  console.log('the queue, most-cited first — each is a theorem not yet written:')
  for (const s of open.slice(0, 15)) console.log(`  ${String(s.cites).padStart(3)} cites  ${s.standard}`)
  console.log('\nempirical (a gate is the wrong instrument):')
  for (const s of all.filter((x) => x.empirical)) console.log(`  ${String(s.cites).padStart(3)} cites  ${s.standard}`)
}
