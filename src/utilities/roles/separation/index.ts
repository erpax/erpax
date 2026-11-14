/**
 * Separation of duties — the conflicts a person may not hold together, enforced where roles change.
 *
 * Two layers carry roles: ACCOUNT roles (`users.roles`, declared exclusive in `ROLES_REGISTRY`) and
 * PARTY roles (a role held on one document, e.g. the requester and the approver of a requisition).
 * The registry listed the exclusions but nothing enforced them; this is the one pure check, used by
 * the user hook and by `assignParty`, so a conflict is refused instead of documented.
 *
 * @standard ISO-27002 §5.3 segregation-of-duties (conflicting duties and areas of responsibility are separated)
 * @standard ANSI/INCITS-359 static separation of duty (SSD) over user-role assignment
 * @security SOX §404 four-eyes (the maker is not the checker)
 * @see src/utilities/roles/registry/index.ts (the account exclusions) · src/utilities/party/roles/index.ts (the party roles)
 */
import { ROLES_REGISTRY } from '@/utilities/roles/registry'
import type { Iso27002ControlId } from '@/utilities/iso/27002'

/** Canonical ISO 27002:2022 controls this module exercises: 5.3 — segregation of duties; 5.18 — access rights. */
export const controlsApplied: ReadonlyArray<Iso27002ControlId> = ['5.3', '5.18'] as const

/** Party roles one person may not hold on the SAME document: the maker and the checker. */
export const EXCLUSIVE_PARTY_ROLES: ReadonlyArray<readonly [string, string]> = [['requester', 'approver']]

const unique = (pairs: Array<[string, string]>): Array<[string, string]> => {
  const seen = new Set<string>()
  return pairs.filter(([a, b]) => {
    const key = [a, b].sort().join('|')
    return seen.has(key) ? false : (seen.add(key), true)
  })
}

/** Pairs among these account roles that the registry declares mutually exclusive (either direction). */
export const accountConflicts = (roles: readonly string[]): Array<[string, string]> => {
  const held = new Set(roles)
  const registry = ROLES_REGISTRY as Readonly<Record<string, { mutuallyExclusiveWith: readonly string[] } | undefined>>
  return unique(roles.flatMap((role) => (registry[role]?.mutuallyExclusiveWith ?? []).filter((other) => held.has(other)).map((other): [string, string] => [role, other])))
}

/** Pairs among the party roles a person holds on one document that may not be held together. */
export const partyConflicts = (rolesOnDocument: readonly string[]): Array<[string, string]> => {
  const held = new Set(rolesOnDocument)
  return EXCLUSIVE_PARTY_ROLES.filter(([a, b]) => held.has(a) && held.has(b)).map(([a, b]): [string, string] => [a, b])
}

/** The refusal message for a set of conflicts. */
export const conflictMessage = (conflicts: ReadonlyArray<readonly [string, string]>): string =>
  `separation of duties: ${conflicts.map(([a, b]) => `"${a}" and "${b}"`).join(', ')} cannot be held by the same person`
