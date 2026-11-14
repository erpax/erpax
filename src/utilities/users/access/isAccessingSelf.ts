/**
 * `id`-equals-`user.id` self-check used by readAccess / updateAndDeleteAccess.
 *
 * @security ISO-27002 §5.15 access-control self-service
 * @see docs/STANDARDS.md §4.4
 */
export const isAccessingSelf = ({ id, user }: { user?: unknown; id?: string | number }): boolean => {
  if (!user || typeof user !== 'object' || !('id' in user)) return false
  return Boolean((user as { id?: string | number }).id === id)
}
