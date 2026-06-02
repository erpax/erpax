/**
 * oauth — the external OAuth 2.0 credential lifecycle as pure policy: decide when to acquire, when a
 * token is (about to be) expired, when to refresh, and whether the granted scopes cover a request.
 * One atom for every external provider; the token-endpoint HTTP is a runtime boundary, not here.
 *
 * @standard IETF RFC 6749 OAuth 2.0 (grant types, token lifecycle)
 * @standard IETF RFC 6750 Bearer token usage
 * @see ../sandbox (brokerCredential — secrets per-tenant, never in the registry) · ./SKILL.md
 */

/** OAuth 2.0 grant types erpax drives. */
export type GrantType = 'authorization_code' | 'client_credentials' | 'refresh_token'

/** A held token — the result of a grant, with its expiry and granted scopes. */
export interface OAuthToken {
  readonly accessToken: string
  readonly refreshToken?: string
  /** absolute expiry, ISO 8601. */
  readonly expiresAtIso: string
  readonly scopes: readonly string[]
}

/** Is the token expired, or within `skewSeconds` of expiry (so it should be refreshed proactively)? */
export function isExpired(token: OAuthToken, nowIso: string, skewSeconds = 60): boolean {
  const expiresAt = Date.parse(token.expiresAtIso)
  const now = Date.parse(nowIso)
  if (Number.isNaN(expiresAt) || Number.isNaN(now)) return true // unparseable ⇒ treat as expired (safe)
  return now >= expiresAt - skewSeconds * 1000
}

/**
 * The next grant to run: no token ⇒ an initial grant (`client_credentials` for machine-to-machine,
 * else `authorization_code`); a still-valid token ⇒ null (nothing to do); an expired token with a
 * refresh token ⇒ `refresh_token`; expired without one ⇒ a fresh initial grant.
 */
export function nextGrant(
  token: OAuthToken | null,
  nowIso: string,
  opts: { machineToMachine?: boolean; skewSeconds?: number } = {},
): GrantType | null {
  const initial: GrantType = opts.machineToMachine ? 'client_credentials' : 'authorization_code'
  if (!token) return initial
  if (!isExpired(token, nowIso, opts.skewSeconds)) return null
  return token.refreshToken ? 'refresh_token' : initial
}

/** Least-privilege: do the granted scopes cover every requested scope? */
export function scopesCovered(granted: readonly string[], requested: readonly string[]): boolean {
  const have = new Set(granted)
  return requested.every((s) => have.has(s))
}
