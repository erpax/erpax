/**
 * trading — the commercial counterparty client layer (barrel).
 *
 * Re-exports the edge-safe trading clients and the `guardedTradingFetch` trust
 * wrapper so callers import the atom (`@/trading`) rather than its internals.
 * The matter side of `./SKILL.md`; clients live in `./api/client`.
 *
 * @see ./api/client (the fetch-only clients + sandbox⊕receipt wrapper)
 * @see @/trading/api (the catalogue / allowlist source)
 */
export * from './api/client'
export * from './quantum'
