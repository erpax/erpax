/**
 * Either access grants it — the union of several Payload access functions.
 *
 * `true` from any wins; constraints are OR-ed; `false` from all is `false`. Used to ADD a rule
 * (role abilities, party roles) to a collection's own access without taking anything away.
 *
 * @security ISO-27001 A.5.15 access-control
 */
import type { Access } from 'payload'

import { or, type Clause } from '@/utilities/ability'

export const either = (...accesses: Access[]): Access => async (args) => {
  let scope: Clause = false
  for (const access of accesses) {
    scope = or(scope, (await access(args)) as Clause)
    if (scope === true) return true
  }
  return scope
}
