/**
 * Unix-style **rwx** vocabulary aligned with how Payload enforces access:
 * every check still runs through collection `access` and the auth stack —
 * this file only names operations and optional bit patterns so requirements
 * ("tenant group rw-, world r--") map cleanly to product language.
 *
 * **Rough analogy**
 *
 * | Unix idea       | In this app                                                         |
 * |-----------------|---------------------------------------------------------------------|
 * | **owner**       | Narrowest subject (creator, super-admin, document-level role)       |
 * | **group**       | Tenant membership — shared workspace / storefront isolation          |
 * | **other**       | Everyone else — anonymous reads, global roles, cross-tenant rules    |
 * | **chmod octet** | Declared intent for "who can r/w/x"; realized by Payload `access`   |
 *
 * Letters map to Payload-style verbs (not kernel syscalls):
 * - **r** → `read` (list + get)
 * - **w** → `create` + `update` (mutate content)
 * - **x** → `delete` (destructive; same slot Unix uses for "execute")
 *
 * @standard POSIX-1.2017 §1.6.1.1 file-mode-bits naming-source
 * @standard NIST INCITS-359-2012 role-based-access-control vocabulary-layer
 * @security ISO-27002 §5.15 access-control
 */

/** Bit for read/list/view (`access.read`). */
export const BIT_READ = 0b100

/** Bit for create + update (`access.create`, `access.update`). */
export const BIT_WRITE = 0b010

/** Bit for delete (`access.delete`). */
export const BIT_DELETE = 0b001

/** One octal digit 0–7: combine with `|` for owner/group/other triplets. */
export type PermissionDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type PermissionTriplet = {
  owner: PermissionDigit
  group: PermissionDigit
  other: PermissionDigit
}

function digitToChars(digit: PermissionDigit): string {
  const r = digit & BIT_READ ? 'r' : '-'
  const w = digit & BIT_WRITE ? 'w' : '-'
  const x = digit & BIT_DELETE ? 'x' : '-'
  return `${r}${w}${x}`
}

/** Render `755`-style triplet as `rwxr-xr-x` (for logs, admin copy, tests). */
export function permissionTripletToString({ owner, group, other }: PermissionTriplet): string {
  return `${digitToChars(owner)}${digitToChars(group)}${digitToChars(other)}`
}

/** Parse `rwxr-x---` into three digits (invalid chars treated as off). */
export function permissionStringToTriplet(s: string): PermissionTriplet | null {
  const normalized = s.replace(/\s/g, '')
  if (normalized.length !== 9) return null
  const parseTriple = (start: number): PermissionDigit => {
    let n = 0
    if (normalized[start] === 'r') n |= BIT_READ
    if (normalized[start + 1] === 'w') n |= BIT_WRITE
    if (normalized[start + 2] === 'x') n |= BIT_DELETE
    return n as PermissionDigit
  }
  return {
    owner: parseTriple(0),
    group: parseTriple(3),
    other: parseTriple(6),
  }
}
