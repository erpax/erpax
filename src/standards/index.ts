/**
 * Master barrel — every standard erpax implements (validators, coercers,
 * value types, security primitives, transport adapters). Domain code SHOULD
 * import from `@/standards/<id>` directly for traceability; this barrel
 * exists so agents can grep `@/standards` and see the full surface in one
 * place.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-3166-2:2020 subdivision-codes
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard BCP-47 language-tag
 * @rfc 5646 tags-for-identifying-languages
 * @rfc 4647 matching-of-language-tags
 * @standard NIST SP-800-38D aes-gcm
 * @standard NIST SP-800-108 key-derivation
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @standard ISO-19011:2018 audit-trail
 * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
 * @standard UN-CEFACT 5305 duty-tax-fee-category-code
 * @standard UN-CEFACT 1001 document-name-code
 * @standard UN-CEFACT 4461 payment-means
 * @standard ISO-20022:2022 universal-financial-industry-message-scheme
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting IFRS IFRS-16 leases
 * @accounting US-GAAP ASC-842-20 lessee-accounting
 * @standard ISO-27002:2022 information-security-controls
 * @standard ISO-27001:2022 isms-annex-a-controls
 * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
 * @rfc 5869 hkdf
 * @rfc 5116 aead
 * @rfc 3986 uniform-resource-identifier
 * @rfc 6585 §4 too-many-requests
 * @rfc 9110 http-semantics
 * @rfc 9111 http-caching
 * @rfc 6797 hsts
 * @standard W3C CSP-3
 * @standard W3C Permissions-Policy
 * @see docs/STANDARDS.md
 */

// Domain identifier validators
export { isIso4217 } from './iso-4217'
export { isIso3166Alpha2, isIso3166Alpha3 } from './iso-3166-1'
export { isIso3166_2 } from './iso-3166-2'
export { isIso8601, toIso8601 } from './iso-8601'
export { isIban } from './iso-13616'
export { isSwiftBic } from './iso-9362'
export { isBcp47 } from './bcp-47'
export { isMoney } from './_money'

// Security primitives (NIST)
export {
  encryptField,
  decryptField,
  encryptFields,
  decryptFields,
  isEncrypted,
  generateEncryptionKey,
} from './nist-sp-800-38'
export {
  deriveSecretFromPayloadSecret,
  internalSecretPurpose,
  type InternalSecretPurpose,
} from './nist-sp-800-108'

// Access control (RBAC)
export {
  hasRole,
  hasStrictRole,
  hasAnyRole,
  hasAllRoles,
  hasCachedRole,
  addRole,
  grant,
  removeRole,
  revoke,
  scopeResourceCollections,
  BIT_READ,
  BIT_WRITE,
  BIT_DELETE,
  permissionTripletToString,
  permissionStringToTriplet,
  type AnyScope,
  type RoleDefinition,
  type RoleMatch,
  type ScopedResource,
  type ScopeResourceCollection,
  type AddRoleResource,
  type MutationArgs,
  type PermissionDigit,
  type PermissionTriplet,
} from './nist-incits-359'

// URI / URL primitives (RFC 3986)
export {
  normalizeUrl,
  buildOrigin,
  safeParseUrl,
  getUrlOrigin,
  ensureProtocol,
  joinUrl,
  resolvePublicSiteUrl,
  getOriginFromHeaders,
  getServerSideURL,
  getClientSideURL,
  resolvePublicSiteUrlFromHeaders,
  generatePreviewPath,
  type ServerOriginOptions,
} from './rfc-3986'

// Rate limiting (RFC 6585 §4 / RFC 9110 §15.5.29)
export {
  getRateLimitKey,
  checkRateLimit,
  clearRateLimit,
  getRateLimitResetSeconds,
} from './rfc-6585'

// HTTP cache adapters (RFC 9110 / RFC 9111)
export {
  createCachedPayloadFetcher,
  getCachedPayloadDocument,
  getCachedPayloadGlobal,
  getCachedPayloadCollection,
  getCachedPayloadCollectionAll,
  getCachedPayloadById,
  getCachedPayloadLocalizedDocument,
  getCachedDocument,
  getCachedGlobal,
  getCachedRedirects,
} from './rfc-9110'

// Leases (IFRS 16 / ASC 842 lessee model)
export type {
  LeaseClassification,
  LeaseStatus,
  DiscountRateBasis,
  PaymentFrequency,
  PaymentTiming,
  LeaseModificationKind,
  UnderlyingAssetCategory,
  LeasePayment,
  LeaseModification,
  RouAsset,
  LeaseLiability,
  Lease,
} from './ifrs-16'
export {
  isLeaseClassification,
  isLeaseStatus,
  isDiscountRateBasis,
  isPaymentFrequency,
  isPaymentTiming,
  isLeaseModificationKind,
  qualifiesForShortTermExemption,
} from './ifrs-16'

// Revenue from Contracts with Customers (IFRS 15 / ASC 606 five-step model)
export type {
  RecognitionTiming,
  OverTimeMeasurement,
  OutputMethodKind,
  InputMethodKind,
  VariableConsiderationMethod,
  Contract,
  PerformanceObligation,
  TransactionPrice,
  VariableConsideration,
  Allocation,
  RevenueRecognition,
  ContractAsset,
  ContractLiability,
  RefundLiability,
} from './ifrs-15'
export {
  isRecognitionTiming,
  isOverTimeMeasurement,
  isOutputMethodKind,
  isInputMethodKind,
  isVariableConsiderationMethod,
} from './ifrs-15'

// Bank-payment messages (ISO 20022:2022 — camt.053 / pain.001 / pain.008 / pacs.004)
export type {
  BankTransactionCode,
  BookingStatus,
  CreditDebitIndicator,
  ChargeBearerCode,
  PostalAddress,
  PartyIdentification,
  AccountIdentification,
  CreditorReference,
  RemittanceInformation,
  Camt053Statement,
  Camt053Transaction,
  Pain001Initiation,
  Pain001Payment,
  Pain001CreditTransfer,
  Pain008Initiation,
  Pain008Payment,
  Pain008DirectDebit,
  Pacs004Return,
  Pacs004ReturnTransaction,
} from './iso-20022'
export {
  isBookingStatus,
  isCreditDebitIndicator,
  isChargeBearerCode,
  isBankTransactionCodeShape,
} from './iso-20022'

// E-invoice semantic data model (EN 16931:2017+A1:2019)
export type {
  InvoiceTypeCode,
  VatCategoryCode,
  PaymentMeansCode,
  ItemPriceDetails,
  LineVatInformation,
  InvoiceLine,
  LineAllowance,
  LineCharge,
  DocumentLevelAllowance,
  DocumentLevelCharge,
  VatBreakdown,
  DocumentTotals,
  InvoiceHeader,
} from './en-16931'
export {
  isInvoiceTypeCode,
  isVatCategoryCode,
  isPaymentMeansCode,
} from './en-16931'

// Security control catalog (ISO 27002:2022 / ISO 27001:2022 Annex A)
export type { Iso27002Theme, Iso27002ControlId, ControlCoverageRow } from './iso-27002'
export {
  iso27002Title,
  iso27002Theme,
  ISO_27002_CATALOG,
  isIso27002ControlId,
  parseIso27002ControlId,
  resolveCoverage,
  coverageByTheme,
  aggregateCoverage,
} from './iso-27002'

// Tax-authority audit file (OECD SAF-T 2.0)
export type {
  SafTAddressStructure,
  SafTPartyId,
  SafTAmountStructure,
  SafTTaxInformation,
  SafTHeader,
  SafTGeneralLedgerAccount,
  SafTCustomer,
  SafTSupplier,
  SafTProduct,
  SafTTaxTableEntry,
  SafTMasterFiles,
  SafTLine,
  SafTTransaction,
  SafTJournal,
  SafTGeneralLedgerEntries,
  SafTSourceDocumentType,
  SafTSalesInvoiceLine,
  SafTSalesInvoice,
  SafTPaymentMechanism,
  SafTPaymentMethod,
  SafTPayment,
  SafTMovementOfGoods,
  SafTSourceDocuments,
  SafTAuditFile,
} from './saf-t'
export {
  isSafTSourceDocumentType,
  isSafTPaymentMechanism,
  isBalancedGeneralLedger,
} from './saf-t'

// Audit-trail types (ISO 19011 §6.4.6 audit-evidence)
export type {
  AuditOperation,
  AuditSeverity,
  AuditChangeRecord,
  AuditTrailContext,
  AuditEntry,
  AuditEntryInput,
} from './iso-19011'

// Composite security headers (CSP-3 / HSTS / Permissions-Policy / Referrer-Policy)
export {
  defaultSecurityHeaders,
  buildSecurityHeaders,
  applySecurityHeaders,
  type SecurityHeadersConfig,
} from './_security-headers'
