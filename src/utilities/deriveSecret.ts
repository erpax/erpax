import { createHmac } from 'node:crypto'

/** Prefix isolates purposes and allows rotating derivation without changing master secret semantics */
const DERIVED_V1 = 'erpax:derived:v1:'

/**
 * Derive a deterministic secret from `PAYLOAD_SECRET` for a named purpose.
 * Never exposes the master secret; use explicit env overrides where listed below.
 */
export function deriveSecretFromPayloadSecret(purpose: string): string {
  const master = process.env.PAYLOAD_SECRET
  if (!master) return ''
  return createHmac('sha256', master).update(DERIVED_V1 + purpose).digest('hex')
}
