/**
 * refuseInactive — an inactive user cannot sign in.
 *
 * `users.active` is the directory's switch (SCIM `active`; a provider's "suspended" is its
 * negation). Unset counts as active, so users created before the field existed are unaffected.
 *
 * @standard RFC-7643 §4.1.1 SCIM `active`
 * @security ISO-27001 A.5.18 access-rights — removal or adjustment
 */
import { APIError, type CollectionBeforeLoginHook } from 'payload'

/** Is this user allowed to sign in? Only an explicit `false` refuses. */
export const mayLogIn = (user: { active?: boolean | null } | null | undefined): boolean => user?.active !== false

export const refuseInactive: CollectionBeforeLoginHook = ({ user }) => {
  if (!mayLogIn(user as { active?: boolean | null })) throw new APIError('This account is inactive.', 403)
  return user
}
