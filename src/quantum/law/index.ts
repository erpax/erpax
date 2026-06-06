/**
 * quantum/law — the law at the quantum scale: LAW IS THE SUFFIX. Every atom closes with the
 * invariant it must satisfy — the `**Law —**` line that ends its SKILL.md. To state what a thing IS
 * (the body) without stating what must HOLD of it (the suffix) is to leave it ungrounded:
 * incomplete, the way an orphan ([[recycle]]) lacks links. The law is found at the end, or not at all.
 *
 * This facet makes "law is the suffix" computable over the quantum corpus: it scans the quantum
 * atoms and finds the LAWLESS ones — those that state themselves but declare no invariant. Like
 * orphans, the lawless are then recycled: given their law. Merges into [[law]].
 *
 * HONEST: a structural read of each SKILL.md ending; the "quantum" is the content-uuid substrate ([[quantum]]).
 *
 *   tsx src/quantum/law/index.ts
 *
 * @audit the law-suffix is read from each SKILL.md ending, never asserted
 * @see ../../law -- ../../recycle -- ../schema -- ./SKILL.md
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'

const QDIR = 'src/quantum'

/** The quantum atoms — direct children of src/quantum that carry a SKILL.md. */
export function quantumAtoms(): string[] {
  try {
    return readdirSync(QDIR).filter((n) => existsSync(QDIR + '/' + n + '/SKILL.md'))
  } catch {
    return []
  }
}

/** Does an atom close with its law — the `**Law` invariant suffix? */
export function carriesLaw(atom: string): boolean {
  try {
    return /\*\*Law/.test(readFileSync(QDIR + '/' + atom + '/SKILL.md', 'utf8'))
  } catch {
    return false
  }
}

/** The lawless quantum atoms — state but no invariant (incomplete; awaiting their suffix). */
export const lawless = (): string[] => quantumAtoms().filter((a) => !carriesLaw(a))
/** The lawful quantum atoms — those that close with their `**Law` suffix. */
export const lawful = (): string[] => quantumAtoms().filter((a) => carriesLaw(a))

if (import.meta.url === 'file://' + process.argv[1]) {
  const all = quantumAtoms()
  const out = lawless()
  console.log('quantum/law — law is the suffix (every atom closes with its invariant):')
  console.log('  quantum atoms ' + all.length + ' · lawful ' + lawful().length + ' · lawless ' + out.length)
  console.log('  lawless: ' + out.slice(0, 24).join(', ') + (out.length > 24 ? ' …' : ''))
}
