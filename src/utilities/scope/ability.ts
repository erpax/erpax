/**
 * Scopes from the role engines — a `Where` (or everything / nothing) for any query.
 *
 * CanCanCan calls this `accessible_by`: the same rules that answer `can?` also say WHICH
 * documents. Access functions return these scopes; a hook or a service can apply the same scope to
 * its own `payload.find` so it never loads a document the user may not see.
 *
 * @security ISO-27001 A.8.3 information-access-restriction
 */
import type { Where } from 'payload'

import type { Ability, Action, Subject } from '@/utilities/ability'

/** The documents of `subject` the ability allows `action` on: `true` all, `false` none, else a constraint. */
export const whereAccessible = (ability: Ability, action: Action, subject: Subject): boolean | Where => ability.accessibleBy(action, subject)

/** The documents a user is a party to: exactly these ids, or nothing — never the whole collection. */
export const whereParty = (ids: readonly string[]): false | Where => (ids.length === 0 ? false : { id: { in: [...ids] } })
