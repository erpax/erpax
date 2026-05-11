/**
 * InternalSigningProvider — ERPax as its own qualified-signature TSP.
 *
 * Slice JJJJJJJJJ-cut2 (2026-05-11). Per user 'erpax remains fully
 * functional ... fallbacking to itself. it is like this every where'.
 *
 * When the external eIDAS qualified TSP (Adobe Sign, qualified-cert
 * issuer, remote signing service) is unreachable or refuses the
 * request, this provider produces a SignedUuid using ERPax's per-
 * tenant Ed25519 key. The signature is identical in shape and
 * verification path to one produced by the external TSP — both are
 * `SignedUuid<T> = { uuid, alg, kid, sig, signedAt }`.
 *
 * Composition with Slice HHHHHHHHH:
 *
 *   - The signature primitive is `signContentUuid` from
 *     `@/services/integrity/signatures` (already shipped).
 *   - The per-tenant key registry binds `kid = '<tenantId>/signing/
 *     <rotation-date>'`. While Cut 2 of HHHHHHHHH (KV-backed key
 *     registry) is not yet shipped, this provider accepts an
 *     `injectedSigningKey` parameter so callers can supply key
 *     material directly. Once the registry lands, the provider will
 *     resolve `kid` against it transparently — the caller-facing API
 *     stays the same.
 *
 * eIDAS interoperability:
 *
 *   - The resulting SignedUuid exports cleanly to RFC 7515 compact
 *     JWS via `toJws()` — that envelope is accepted by every eIDAS-
 *     qualified verifier we've tested against.
 *   - For XAdES / PAdES embedding (signing PDFs / XML invoices),
 *     the SignedUuid + the canonical content together form the
 *     "data-to-be-signed" reference. The verifier recomputes the
 *     contentUuid and the cycle closes.
 *
 * What ERPax-internal mode CANNOT do that an external QTSP can:
 *
 *   - Cannot issue legally-binding QES under eIDAS Annex II without
 *     a qualified certificate from a Trust Service Provider on the
 *     EU Trusted List. ERPax-self signatures are AdES (advanced
 *     electronic signature) by §3.11 but not QES by §3.12.
 *   - Long-term archival (TS-101-733 §A.3 archive timestamping)
 *     requires an external TSA chain. ERPax self-mode includes the
 *     audit-events leafUuid (Slice TTTTTTTT) which provides
 *     tamper-evident timestamping but is not RFC 3161-compliant.
 *
 * For most use cases (internal approvals, document integrity at
 * rest, audit-trail signatures) AdES is sufficient. The system flags
 * which mode produced each signature so downstream legal/regulatory
 * checks can branch accordingly.
 *
 * @standard RFC 8032 EdDSA Ed25519
 * @standard RFC 7515 JSON Web Signature
 * @standard eIDAS Regulation (EU) 910/2014 §3.11 AdES (this provider)
 * @standard ETSI EN 319 102-1 §4.3 signature creation
 * @standard ETSI EN 319 132-1 XAdES (export compatibility)
 * @standard ETSI EN 319 142-1 PAdES (export compatibility)
 * @audit Conservation Law 53 self-referential-closure
 * @feature self_closure
 * @see /src/services/integrity/signatures.ts (Slice HHHHHHHHH Cut 1)
 */

import type { InternalProvider, FallbackContext } from '../types'
import { registerInternalProvider } from '../index'
import type { ContentUuid } from '../../integrity/content-uuid'
import type { SignedUuid, SignatureAlg } from '../../integrity/signatures'
import { signContentUuid } from '../../integrity/signatures'

export interface SigningParams<T> {
  readonly uuid: ContentUuid<T>
  readonly kid: string
  readonly alg?: SignatureAlg
  /**
   * Optional injected private key. When omitted, the provider attempts
   * to resolve via the per-tenant key registry (Cut-2 of HHHHHHHHH —
   * not yet shipped). Until then, callers must inject.
   */
  readonly injectedSigningKey?: CryptoKey
}

export type SigningResult<T> = SignedUuid<T> & {
  /**
   * Signature assurance level under eIDAS Regulation (EU) 910/2014.
   *   - 'QES'  → qualified (external QTSP only; this provider can NOT produce)
   *   - 'AdES' → advanced  (this provider's default — RFC 8032 EdDSA)
   *   - 'BES'  → basic     (legacy; this provider does not emit)
   */
  readonly assurance: 'AdES'
  readonly producedBy: 'erpax-self'
}

export const InternalSigningProvider: InternalProvider<SigningParams<unknown>, SigningResult<unknown>> = {
  role: 'signing-tsp',
  id: 'erpax-self-signing',
  description:
    'ERPax acts as its own AdES signature provider. Uses the per-tenant Ed25519 key (Slice HHHHHHHHH) to sign the contentUuid; result shape is identical to external-QTSP output. Produces AdES (eIDAS §3.11), not QES (§3.12) — clearly flagged so downstream legal checks can route accordingly.',
  standards: [
    'RFC-8032',
    'RFC-7515',
    'eIDAS-910/2014-§3.11',
    'ETSI-EN-319-102-1',
    'ETSI-EN-319-132-1',
    'ETSI-EN-319-142-1',
  ],

  async invoke(params, _ctx: FallbackContext): Promise<SigningResult<unknown>> {
    const { uuid, kid, alg, injectedSigningKey } = params
    if (!injectedSigningKey) {
      // Until Cut 2 of HHHHHHHHH (KV-backed key registry) lands, the
      // mediator caller must supply the key directly. Throwing here
      // (rather than ephemeral-generating) is deliberate: a missing
      // key is a configuration error, not a fallback opportunity.
      throw new Error(
        `[InternalSigningProvider] no key material for kid='${kid}'. Cut 2 of Slice HHHHHHHHH wires the per-tenant key registry; until then, pass injectedSigningKey explicitly.`,
      )
    }
    const signed = await signContentUuid({
      uuid: uuid as ContentUuid<unknown>,
      privateKey: injectedSigningKey,
      alg: alg ?? 'EdDSA',
      kid,
    })
    return {
      ...signed,
      assurance: 'AdES',
      producedBy: 'erpax-self',
    }
  },
}

registerInternalProvider(InternalSigningProvider)
