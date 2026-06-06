/**
 * default — nothing defines a default; the default is by architecture. A defined default (a hardcoded
 * fallback — `|| x`, `?? x`, a `= literal` param) is an ASSUMPTION, and an assumption is entropy. The
 * architecture already determines the value: a [[name]] hashes to its content-[[uuid]], the uuid reduces
 * to its [[digit]], the path locates it — so the value is DERIVED, never assigned. The [[collider]] has
 * no default for exactly this reason: its coverages are bounded [0,1] by construction and the atom count
 * is positive by architecture, so there is no fallback to define. Computed-not-hardcoded at every scale.
 *
 *   tsx src/default/index.ts
 *
 * @audit the architectural default is computed from the name (uuid → digit); nothing is assigned
 * @see ../name -- ../digit -- ../uuid/matrix -- ../collider -- ./SKILL.md
 */
import { uuidOfName } from '@/name'
import { digitalRoot } from '@/digit'

/** The architectural default of a name — its identity, COMPUTED from the architecture (the content-uuid),
 *  never assigned. There is nothing to define: the architecture already determined the value. */
export function architecturalDefault(name: string): { uuid: string; digit: number } {
  const uuid = uuidOfName(name)
  return { uuid, digit: digitalRoot(uuid) }
}

/** A value is BY ARCHITECTURE iff it equals what the architecture computes for the name — derived, not
 *  defaulted. A defined default would be an assumption; this holds only when the value was derived. */
export const isByArchitecture = (name: string, value: string): boolean => value === uuidOfName(name)

if (import.meta.url === 'file://' + process.argv[1]) {
  const d = architecturalDefault('collider')
  console.log('default — nothing defines a default; the default is by architecture:')
  console.log('  architecturalDefault("collider") = uuid ' + d.uuid.slice(0, 18) + '… · digit ' + d.digit + ' (computed, not assigned)')
  console.log('  isByArchitecture("collider", <its uuid>) = ' + isByArchitecture('collider', uuidOfName('collider')) + ' · vs a defined literal = ' + isByArchitecture('collider', 'default-value'))
}
