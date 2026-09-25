import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { standardKey, standardRegister } from '@/proof/register'

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
      // A bold lead ending in ':' LABELS a value — `**Version:** 1.2` — and never cites a standard.
      // Three such labels were sitting in the undischarged queue as if they were conformance debt.
      const standards = [...sec[1]!.matchAll(/^\s*[-*]\s+\*\*(.+?)\*\*/gm)]
        .map((m) => m[1]!.trim())
        .filter((raw) => !raw.endsWith(':'))
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
  // Physics. No amount of reading src decides whether kT ln2 is the Landauer bound, what the
  // Boltzmann constant is, or how information scales with a boundary area — these are measured by
  // the world and cited, never discharged.
  'Landauer (1961)',
  'Bekenstein (1981) · \'t Hooft (1993) · Susskind (1995)',
  'CODATA 2022',
  // Statutes and intergovernmental texts, the same class as Наредба Н-18 and ЗДДС above: the text
  // lives elsewhere, a gate can check what this corpus DOES with a threshold but never that the
  // threshold is the one the directive wrote.
  'EU 575/2013 (CRR) Art. 392',
  'EU 575/2013 (CRR) Art. 395',
  'EU 575/2013 (CRR) Art. 4(1)(39)',
  'EU 2015/849 (AMLD4)',
  'EU 2015/849 Art. 33',
  'EU 2015/847',
  'FATF Recommendations 10 · 12 · 22',
  'FATF Recommendation 20',
] as const

/** The one key — defined in [[proof]]/register, re-exported so this atom's face keeps offering it. */
export { standardKey } from '@/proof/register'

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

/** DECLARED — bodies that ISSUE standards; a key naming one is an obligation. See SKILL.md. */
export const ISSUING_BODIES: ReadonlySet<string> = new Set([
  'ISO', 'IEC', 'ISO/IEC', 'EN', 'CEN', 'ETSI', 'RFC', 'BCP', 'W3C', 'WHATWG', 'WAI', 'IETF',
  'OASIS', 'NIST', 'FIPS', 'ECMA', 'ITU', 'UN', 'UN/CEFACT', 'EU', 'BG', 'US', 'FATF', 'IFRS',
  'IAS', 'ISA', 'SOX', 'GDPR', 'PCI', 'WCAG', 'SWIFT', 'GS1', 'ILO', 'OECD', 'schema.org',
  'IUPAC', 'WHO', 'WMO', 'IANA', 'Schema.org',
])

/** Standards whose common citation carries NO number — the body is the name. DECLARED. */
export const NAMED_STANDARDS: ReadonlySet<string> = new Set([
  'ActivityPub', 'ActivityStreams', 'eIDAS', 'Linked Data Notifications (LDN)', 'UI Events',
  'GHG Protocol Corporate Standard', 'WHOQOL', 'Venice Commission Rule of Law',
  'Venice Commission Code of Good Practice in Electoral Matters',
  // Bulgarian statutes, written by name rather than number — obligations, mis-filed until named.
  'БУЛСТАТ register law (Закон за регистър БУЛСТАТ)',
  'Bulgarian Labour Code (Кодекс на труда)',
  'Cadastre & Property Register Act (ЗКИР)',
  'Bulgarian Commercial Register (Търговски регистър)',
])

/** Words that make a parenthesised-year citation an INSTRUMENT, not an attribution. DECLARED. */
export const INSTRUMENT_WORDS: ReadonlySet<string> = new Set([
  'convention', 'treaty', 'directive', 'regulation', 'act', 'standard', 'protocol',
  'agreement', 'charter', 'covenant', 'recommendation', 'code', 'ordinance', 'statute',
])

/** `Author (YYYY)` — a citation whose only digits are a trailing parenthesised year. */
const ATTRIBUTION_SHAPE = /^[^0-9]+\((1[6-9]|20)\d{2}\)$/

/** A cited paper is not a conformance obligation — the year alone decides nothing. See SKILL.md. */
export function namesAttribution(standard: string): boolean {
  const s = standard.trim()
  if (!ATTRIBUTION_SHAPE.test(s)) return false
  const words = s.toLowerCase().replace(/[(),.]/g, ' ').split(/\s+/)
  return !words.some((w) => INSTRUMENT_WORDS.has(w))
}

/** An obligation, or a source an idea came from? No gate discharges a branch of mathematics. */
export function namesAnObligation(standard: string): boolean {
  if (namesAttribution(standard)) return false
  if (/\d/.test(standard)) return true
  if (NAMED_STANDARDS.has(standard)) return true
  const head = standard.split(/[\s/]+/)[0] ?? ''
  return ISSUING_BODIES.has(head) || ISSUING_BODIES.has(standard)
}

export interface QueueSplit {
  readonly obligations: readonly AssumedStandard[]
  /** Literature, mathematics, idiom — cited honestly, dischargeable by nothing. */
  readonly references: readonly AssumedStandard[]
}


/** The queue, split by what a gate could ever answer. */
export function splitQueue(cwd: string = process.cwd()): QueueSplit {
  const open = assumedStandards(cwd).filter((s) => !s.empirical)
  return {
    obligations: open.filter((s) => namesAnObligation(s.standard)),
    references: open.filter((s) => !namesAnObligation(s.standard)),
  }
}

/**
 * Assumed AND decidable — the theorems not yet written. REFERENCES are excluded for the reason
 * EMPIRICAL is: a gate is the wrong instrument, and the seam is declared. See SKILL.md.
 */
export const replaceableStandards = (cwd: string = process.cwd()): AssumedStandard[] =>
  [...splitQueue(cwd).obligations]

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
