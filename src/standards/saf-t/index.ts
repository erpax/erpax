/**
 * Public surface of the OECD SAF-T standards module.
 *
 * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
 * @see ./README.md
 */

export type {
  // Cross-cutting
  SafTAddressStructure,
  SafTPartyId,
  SafTAmountStructure,
  SafTTaxInformation,
  // Header
  SafTHeader,
  // MasterFiles
  SafTGeneralLedgerAccount,
  SafTCustomer,
  SafTSupplier,
  SafTProduct,
  SafTTaxTableEntry,
  SafTMasterFiles,
  // GeneralLedgerEntries
  SafTLine,
  SafTTransaction,
  SafTJournal,
  SafTGeneralLedgerEntries,
  // SourceDocuments
  SafTSourceDocumentType,
  SafTSalesInvoiceLine,
  SafTSalesInvoice,
  SafTPaymentMechanism,
  SafTPaymentMethod,
  SafTPayment,
  SafTMovementOfGoods,
  SafTSourceDocuments,
  // Top-level
  SafTAuditFile,
} from './types'

export {
  isSafTSourceDocumentType,
  isSafTPaymentMechanism,
  isBalancedGeneralLedger,
} from './validate'
