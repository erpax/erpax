/**
 * stampAuth — the two dates the directory keeps about a user's sign-in.
 *
 *   passwordChangedAt  set whenever a write carries a new password
 *   lastLogin          set after a successful sign-in
 *
 * Every directory provider reports both; Payload's auth records neither on its own.
 *
 * @security ISO-27001 A.5.17 authentication-information · A.8.15 logging
 */
import type { CollectionAfterLoginHook, CollectionBeforeChangeHook } from 'payload'

/** A write that sets a password also sets when it was set. */
export const withPasswordStamp = <T extends Record<string, unknown>>(data: T, now: Date = new Date()): T =>
  typeof data.password === 'string' && data.password !== '' ? { ...data, passwordChangedAt: now.toISOString() } : data

export const stampPasswordChange: CollectionBeforeChangeHook = ({ data }) => withPasswordStamp(data ?? {})

export const stampLastLogin: CollectionAfterLoginHook = async ({ req, user }) => {
  try {
    // straight to the database: a sign-in is not an edit, so it writes no version and runs no hooks
    await req.payload.db.updateOne({ collection: 'users', id: user.id, data: { lastLogin: new Date().toISOString() }, req, returning: false })
  } catch (error) {
    // a sign-in must not fail because its timestamp could not be written
    req.payload.logger.warn({ err: error }, 'lastLogin was not recorded')
  }
  return user
}
