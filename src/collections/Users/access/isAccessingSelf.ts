export const isAccessingSelf = ({ id, user }: { user?: unknown; id?: string | number }): boolean => {
  if (!user || typeof user !== 'object' || !('id' in user)) return false
  return Boolean((user as { id?: string | number }).id === id)
}
