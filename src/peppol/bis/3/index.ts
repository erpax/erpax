/**
 * Public surface of the Peppol BIS Billing 3.0 standards module.
 *
 * @standard Peppol-BIS-3.0 billing
 * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
 * @standard UBL-2.1 universal-business-language
 * @standard ISO-6523-1:1998 participant-identifier-scheme
 * @see ./README.md
 */

export type {
  PeppolProfileId,
  PeppolDocumentTypeId,
  PeppolParticipantIdentifierScheme,
  PeppolParticipantIdentifier,
  PeppolEndpointId,
  PeppolEnvelope,
  PeppolBillingMessage,
} from '@/peppol/bis/3/types'
export { PEPPOL_BIS_3_CUSTOMIZATION_ID } from '@/peppol/bis/3/types'

export {
  isPeppolParticipantIdentifierScheme,
  isPeppolDocumentTypeId,
  isPeppolProfileId,
  formatPeppolParticipantId,
  parsePeppolParticipantId,
} from '@/peppol/bis/3/validate'
