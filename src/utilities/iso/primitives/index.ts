/**
 * iso/primitives — each ISO standard, collided with the Payload primitive that carries it.
 *
 * A standard says nothing about Payload; erpax carries it through ONE of Payload's primitives
 * (a collection, a field, an access function, a hook, a plugin, an endpoint, a job, the auth
 * config). This table is that map, and every row names the code that does it, so a row without
 * code is refused by the test beside this file. The catalogue is the cross product of standards
 * and primitives restricted to the rows the code proves: what erpax can claim, nothing more.
 *
 * Editions are NOT here: they are data (`compliance-frameworks`, refreshed from ISO Open Data).
 * A row names a standard and, for ISO/IEC 27002, the control; it never names an edition.
 *
 * @standard ISO-27002 information-security-controls
 * @see src/utilities/iso/27002/types/index.ts (the control catalogue) · reports/ISO RBAC per tenant.md
 */
import type { Iso27002ControlId } from '@/utilities/iso/27002'

/** The Payload primitives a requirement can land on. */
export type Primitive = 'collection' | 'field' | 'access' | 'hook' | 'plugin' | 'endpoint' | 'job' | 'auth'

export interface Collision {
  /** The standard, without its edition: `ISO/IEC 27002`, `ISO/IEC 27017`, `ANSI/INCITS 359`. */
  readonly standard: string
  /** What the standard asks for, in a few words (a summary, never its text). */
  readonly requirement: string
  readonly primitive: Primitive
  /** The 27002 control it exercises, when the standard is 27002 or maps to one. */
  readonly control?: Iso27002ControlId
  /** Repo-relative file or folder that carries it. */
  readonly evidence: string
}

export const COLLISIONS: readonly Collision[] = [
  { standard: 'ISO/IEC 27002', requirement: 'access control rules per resource', primitive: 'access', control: '5.15', evidence: 'src/access/collections/shared/abilityAccess.ts' },
  { standard: 'ISO/IEC 27002', requirement: 'identity of each user is managed', primitive: 'collection', control: '5.16', evidence: 'src/collections/users/index.ts' },
  { standard: 'ISO/IEC 27002', requirement: 'access rights follow role assignment', primitive: 'collection', control: '5.18', evidence: 'src/collections/roles/index.ts' },
  { standard: 'ISO/IEC 27002', requirement: 'privileged access limited to super-admin', primitive: 'access', control: '8.2', evidence: 'src/access/collections/shared/superAdminOnly.ts' },
  { standard: 'ISO/IEC 27002', requirement: 'information access restricted to the user\'s tenants and apps', primitive: 'access', control: '8.3', evidence: 'src/access/collections/shared/appAccess.ts' },
  { standard: 'ISO/IEC 27002', requirement: 'role definitions are validated on write', primitive: 'hook', control: '5.3', evidence: 'src/utilities/roles/hooks' },
  { standard: 'ISO/IEC 27002', requirement: 'events are logged to an audit trail', primitive: 'hook', control: '8.15', evidence: 'src/utilities/audit/trail' },
  { standard: 'ISO/IEC 27017', requirement: 'cloud customers are separated from one another', primitive: 'plugin', control: '5.23', evidence: 'src/access/collections/shared/appAccess.ts' },
  { standard: 'ISO/IEC 27017', requirement: 'each app is reached through the MCP gateway, filtered by the caller\'s access', primitive: 'endpoint', control: '5.23', evidence: 'src/middleware.ts' },
  { standard: 'ISO/IEC 27018', requirement: 'processing of personal data is recorded', primitive: 'collection', control: '5.34', evidence: 'src/collections/data-processing-activities/index.ts' },
  { standard: 'ISO/IEC 27701', requirement: 'consent of the data subject is recorded', primitive: 'collection', control: '5.34', evidence: 'src/collections/consent-records/index.ts' },
  { standard: 'ISO/IEC 29146', requirement: 'access management enforces policy decisions', primitive: 'access', evidence: 'src/utilities/ability/roles/index.ts' },
  { standard: 'ISO/IEC 10181-3', requirement: 'per-resource access decisions', primitive: 'access', evidence: 'src/utilities/cross/index.ts' },
  { standard: 'ISO/IEC 24760', requirement: 'an entity has one identity per domain', primitive: 'field', evidence: 'src/collections/users/index.ts' },
  { standard: 'ISO/IEC 15489', requirement: 'records are versioned with who changed them', primitive: 'plugin', evidence: 'src/plugins/versions' },
  { standard: 'ISO/IEC 15489', requirement: 'every document is addressable by a stable handle', primitive: 'endpoint', evidence: 'src/plugins/handles' },
  { standard: 'ANSI/INCITS 359', requirement: 'core RBAC: users, roles, permissions', primitive: 'access', control: '5.18', evidence: 'src/utilities/ability/roles/index.ts' },
  { standard: 'ANSI/INCITS 359', requirement: 'an API key acts as its user, so the user\'s roles decide', primitive: 'auth', control: '5.17', evidence: 'src/collections/users/index.ts' },
]

/** The standards the table covers. */
export const standardsCovered = (): string[] => [...new Set(COLLISIONS.map((row) => row.standard))].sort()

/** The primitives the table uses. */
export const primitivesUsed = (): Primitive[] => [...new Set(COLLISIONS.map((row) => row.primitive))].sort()

/** The cross of standards and primitives, as a matrix of how many rows land in each cell. */
export const catalogue = (): Array<{ standard: string; primitive: Primitive; rows: number }> =>
  standardsCovered().flatMap((standard) =>
    primitivesUsed().map((primitive) => ({ standard, primitive, rows: COLLISIONS.filter((row) => row.standard === standard && row.primitive === primitive).length })),
  )

/** The cells nothing fills: what erpax does NOT yet carry, computed rather than listed. */
export const gaps = (): Array<{ standard: string; primitive: Primitive }> => catalogue().filter((cell) => cell.rows === 0).map(({ standard, primitive }) => ({ standard, primitive }))
