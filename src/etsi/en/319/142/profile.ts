/**
 * ETSI EN 319 142 PAdES — PDF Advanced Electronic Signatures.
 *
 * Four baseline profiles in the family:
 *
 *   - **PAdES B-B**   (Baseline)            — minimal CMS signature
 *   - **PAdES B-T**   (with Timestamp)      — adds RFC 3161 signed timestamp
 *   - **PAdES B-LT**  (Long Term)           — adds validation material (CRLs / OCSP responses)
 *   - **PAdES B-LTA** (Long Term Archive)   — adds archive timestamps for renewability
 *
 * Required by EU 910/2014 (eIDAS) for qualified electronic signatures on
 * PDFs. Bulgaria mandates qualified signatures on:
 *
 *   - НАП SAF-T submissions
 *   - Декларация Образец 1 / Образец 6 (payroll)
 *   - BG e-procurement bid responses
 *
 * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
 * @standard ETSI-TS-119-142-1 pades-cms-signature-format
 * @standard ETSI-EN-319-122-1 cades-baseline-profile (CMS basis for PAdES)
 * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
 * @standard rfc-3161 timestamp-protocol
 * @standard rfc-5652 cryptographic-message-syntax
 * @compliance EU 910/2014 eidas qualified-electronic-signature
 * @audit ISO-19011:2018 audit-trail signature-evidence
 */

/** ETSI PAdES baseline level (B-B / B-T / B-LT / B-LTA). */
export type PadesLevel = 'B-B' | 'B-T' | 'B-LT' | 'B-LTA'

/**
 * PAdES `/SubFilter` value per ETSI EN 319 142-1 §5. Only `ETSI.CAdES.detached`
 * is used by the baseline profile — legacy `adbe.pkcs7.detached` (Adobe)
 * stays supported for non-eIDAS signatures.
 */
export type PadesSubFilter = 'ETSI.CAdES.detached' | 'adbe.pkcs7.detached'

/** Default level for new BG signatures — qualified seal goes B-LT for archival. */
export const PADES_DEFAULT_LEVEL: PadesLevel = 'B-LT'

/** Default subfilter — ETSI baseline. */
export const PADES_DEFAULT_SUBFILTER: PadesSubFilter = 'ETSI.CAdES.detached'

/**
 * Map a PAdES level to the OID of the signed-attribute that carries it.
 * Used by signers / validators to assert the level the signature claims.
 *
 * @standard ETSI-EN-319-142-1 §5.1 baseline-profile-attribute-oids
 */
export function padesLevelOid(level: PadesLevel): string {
  switch (level) {
    case 'B-B':
      return '0.4.0.19142.1.1' // sigPolicyIdentifier B-B
    case 'B-T':
      return '0.4.0.19142.1.2'
    case 'B-LT':
      return '0.4.0.19142.1.3'
    case 'B-LTA':
      return '0.4.0.19142.1.4'
  }
}
