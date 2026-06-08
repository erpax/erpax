/**
 * Static field-entanglement registry — inferred from collection schemas per the
 * 01a03ea0 text-field audit (tenants, invoices, translations, chat, employees).
 *
 * @audit computed from live collection sources; collapse hooks are canonical ids
 */

/** Known collapse hooks that observe (collapse) entangled field superposition. */
export const COLLAPSE_HOOKS = {
  tamperProofBeforeChangeHook: {
    id: 'tamperProofBeforeChangeHook',
    stage: 'beforeChange',
    scope: 'global',
    source: 'uuidPlugin',
  },
  autoPopulateTenant: {
    id: 'autoPopulateTenant',
    stage: 'beforeValidate',
    scope: 'collection',
    source: 'standardCollectionHooks',
  },
  autoPopulateCreatedBy: {
    id: 'autoPopulateCreatedBy',
    stage: 'beforeChange',
    scope: 'collection',
    source: 'standardCollectionHooks',
  },
  auditTrailAfterChange: {
    id: 'auditTrailAfterChange',
    stage: 'afterChange',
    scope: 'collection',
    source: 'standardCollectionHooks',
  },
  teamCommsBeforeChange: {
    id: 'teamCommsBeforeChange',
    stage: 'beforeChange',
    scope: 'chat',
    source: 'team/comms',
  },
  validateNotLocked: {
    id: 'validateNotLocked',
    stage: 'beforeChange',
    scope: 'invoices',
    source: 'utility',
  },
  invoiceAccountingHook: {
    id: 'invoiceAccountingHook',
    stage: 'afterChange',
    scope: 'invoices',
    source: 'invoices/hooks',
  },
  normalizeTenantSlug: {
    id: 'normalizeTenantSlug',
    stage: 'beforeValidate',
    scope: 'tenants.slug',
    source: 'tenants/hooks/normalizeRouting',
  },
  normalizeTenantDomain: {
    id: 'normalizeTenantDomain',
    stage: 'beforeValidate',
    scope: 'tenants.domain',
    source: 'tenants/hooks/normalizeRouting',
  },
  tagsNameNormalize: {
    id: 'tagsNameNormalize',
    stage: 'beforeValidate',
    scope: 'tags.name',
    source: 'tags',
  },
  ensureUniqueSlugWithinTenant: {
    id: 'ensureUniqueSlugWithinTenant',
    stage: 'beforeValidate',
    scope: 'pages|posts|categories.slug',
    source: 'ensure/unique/slug/within/tenant',
  },
  deriveInvoiceNumber: {
    id: 'deriveInvoiceNumber',
    stage: 'beforeValidate',
    scope: 'invoices.number',
    source: 'invoices/hooks/deriveNumber',
  },
} as const

export type CollapseHookId = keyof typeof COLLAPSE_HOOKS

export interface FieldEntanglement {
  readonly collection: string
  readonly path: string
  readonly partners: readonly string[]
  readonly superposition: string
  readonly collapse: readonly string[]
  readonly bond: string
}

const bondOf = (collectionSlug: string): string => `${collectionSlug} · tenant · uuid`

/** Registry key: `${collectionSlug}::${fieldPath}` */
export const FIELD_ENTANGLEMENT_REGISTRY: Readonly<Record<string, FieldEntanglement>> = {
  // ── tenants (17) ──
  'tenants::slug': {
    collection: 'tenants',
    path: 'slug',
    partners: ['domain', 'name', 'publicSiteUrl'],
    superposition: 'URL path vs brand name vs DNS domain until routing observation',
    collapse: ['normalizeTenantSlug', 'tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::domain': {
    collection: 'tenants',
    path: 'domain',
    partners: ['slug', 'publicSiteUrl'],
    superposition: 'Host-header routing vs marketing URL',
    collapse: ['normalizeTenantDomain', 'tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::name': {
    collection: 'tenants',
    path: 'name',
    partners: ['slug', 'config.identity.legalName'],
    superposition: 'Customer-facing vs registered legal identity',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::config.identity.country': {
    collection: 'tenants',
    path: 'config.identity.country',
    partners: [
      'config.localization.defaultLocale',
      'config.currency.reportingCurrency',
      'config.accounting.standard',
    ],
    superposition: 'Cascade defaults vs explicit per-tenant overrides',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::config.identity.legalName': {
    collection: 'tenants',
    path: 'config.identity.legalName',
    partners: ['name', 'config.identity.taxRegistration'],
    superposition: 'Registered legal name vs customer-facing brand',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::config.identity.taxRegistration': {
    collection: 'tenants',
    path: 'config.identity.taxRegistration',
    partners: ['config.identity.legalName', 'config.identity.country'],
    superposition: 'VAT/GST/EIN string vs country-specific format',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::config.localization.defaultLocale': {
    collection: 'tenants',
    path: 'config.localization.defaultLocale',
    partners: ['config.identity.country', 'config.localization.fallbackLocale'],
    superposition: 'BCP-47 locale vs country-derived default',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::config.localization.fallbackLocale': {
    collection: 'tenants',
    path: 'config.localization.fallbackLocale',
    partners: ['config.localization.defaultLocale'],
    superposition: 'Fallback locale chain until Accept-Language observation',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::config.currency.reportingCurrency': {
    collection: 'tenants',
    path: 'config.currency.reportingCurrency',
    partners: ['config.identity.country', 'config.accounting.standard'],
    superposition: 'Functional currency vs country-derived default',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::publicSiteUrl': {
    collection: 'tenants',
    path: 'publicSiteUrl',
    partners: ['domain', 'slug'],
    superposition: 'Marketing URL vs tenant-domain routing',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::stripePublishableKey': {
    collection: 'tenants',
    path: 'stripePublishableKey',
    partners: ['stripeSecretKey', 'stripeWebhookSecret'],
    superposition: 'Stripe publishable vs secret credential pair',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::stripeSecretKey': {
    collection: 'tenants',
    path: 'stripeSecretKey',
    partners: ['stripePublishableKey', 'integrationSettings'],
    superposition: 'Typed secret vs JSON integration blob',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::stripeWebhookSecret': {
    collection: 'tenants',
    path: 'stripeWebhookSecret',
    partners: ['stripeSecretKey'],
    superposition: 'Webhook signing secret vs API secret',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::resendApiKey': {
    collection: 'tenants',
    path: 'resendApiKey',
    partners: ['emailDefaultFromAddress', 'emailDefaultFromName'],
    superposition: 'Email API key vs default From envelope',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::emailDefaultFromAddress': {
    collection: 'tenants',
    path: 'emailDefaultFromAddress',
    partners: ['emailDefaultFromName', 'resendApiKey'],
    superposition: 'From address vs display name on outbound mail',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::emailDefaultFromName': {
    collection: 'tenants',
    path: 'emailDefaultFromName',
    partners: ['emailDefaultFromAddress'],
    superposition: 'Display name vs RFC 5322 From address',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },
  'tenants::mcpApiKey': {
    collection: 'tenants',
    path: 'mcpApiKey',
    partners: ['integrationSettings'],
    superposition: 'MCP gateway key vs trading credential JSON',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('tenants'),
  },

  // ── invoices (18) ──
  'invoices::number': {
    collection: 'invoices',
    path: 'number',
    partners: ['protocolNumber', 'fiscal.receiptNumber', 'typeStatus.invoiceTypeCode'],
    superposition: 'Multiple document identifiers for the same economic event',
    collapse: ['deriveInvoiceNumber', 'validateNotLocked', 'invoiceAccountingHook', 'tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::protocolNumber': {
    collection: 'invoices',
    path: 'protocolNumber',
    partners: ['number'],
    superposition: 'Protocol vs document number',
    collapse: ['validateNotLocked', 'tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::purchaseOrder': {
    collection: 'invoices',
    path: 'purchaseOrder',
    partners: ['salesOrder', 'relationships.order'],
    superposition: 'PO vs SO vs internal order relationship',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::salesOrder': {
    collection: 'invoices',
    path: 'salesOrder',
    partners: ['purchaseOrder', 'relationships.order'],
    superposition: 'External SO ref vs relationship link',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::billingTax.currencyCode': {
    collection: 'invoices',
    path: 'billingTax.currencyCode',
    partners: ['amounts.totalAmount', 'tenant.config.currency.reportingCurrency'],
    superposition: 'Document currency vs functional reporting currency',
    collapse: ['validateNotLocked', 'tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::billingTax.taxNote': {
    collection: 'invoices',
    path: 'billingTax.taxNote',
    partners: ['billingTax.currencyCode', 'vatBreakdown'],
    superposition: 'Free-text tax note vs structured VAT breakdown',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::vatBreakdown.exemptionReasonCode': {
    collection: 'invoices',
    path: 'vatBreakdown.exemptionReasonCode',
    partners: ['vatBreakdown.exemptionReason'],
    superposition: 'BT-121 code required when category E/AE/K/G/O — text companion optional',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::vatBreakdown.exemptionReason': {
    collection: 'invoices',
    path: 'vatBreakdown.exemptionReason',
    partners: ['vatBreakdown.exemptionReasonCode'],
    superposition: 'BT-120 free text vs BT-121 code',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::recurring.stripeInvoiceId': {
    collection: 'invoices',
    path: 'recurring.stripeInvoiceId',
    partners: ['recurring.stripePaymentIntentId', 'recurring.lastAttemptError'],
    superposition: 'Stripe multiverse vs ERP invoice row',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::recurring.stripePaymentIntentId': {
    collection: 'invoices',
    path: 'recurring.stripePaymentIntentId',
    partners: ['recurring.stripeInvoiceId'],
    superposition: 'PaymentIntent vs Invoice id on same charge',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::recurring.lastAttemptError': {
    collection: 'invoices',
    path: 'recurring.lastAttemptError',
    partners: ['recurring.attemptCount', 'recurring.lastAttemptAt'],
    superposition: 'Dunning error prose vs attempt counter',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::notes.invoiceNote': {
    collection: 'invoices',
    path: 'notes.invoiceNote',
    partners: ['notes.deliveryTerms', 'notes.paymentTerms'],
    superposition: 'EN-16931 BT-22 free text vs structured terms',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::notes.deliveryTerms': {
    collection: 'invoices',
    path: 'notes.deliveryTerms',
    partners: ['notes.invoiceNote', 'notes.paymentTerms'],
    superposition: 'BT-20 delivery terms vs payment terms',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::notes.paymentTerms': {
    collection: 'invoices',
    path: 'notes.paymentTerms',
    partners: ['notes.deliveryTerms', 'dates.dueAt'],
    superposition: 'Payment terms text vs due date',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::notes.note': {
    collection: 'invoices',
    path: 'notes.note',
    partners: ['notes.invoiceNote'],
    superposition: 'General notes vs invoice-specific note',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::notes.deliveryNote': {
    collection: 'invoices',
    path: 'notes.deliveryNote',
    partners: ['notes.deliveryTerms'],
    superposition: 'Delivery note prose vs terms code',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::fiscal.receiptNumber': {
    collection: 'invoices',
    path: 'fiscal.receiptNumber',
    partners: ['number', 'fiscal.unp'],
    superposition: 'Касов бон number vs document number vs УНП',
    collapse: ['validateNotLocked', 'tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },
  'invoices::parties.seller': {
    collection: 'invoices',
    path: 'parties.seller',
    partners: ['parties.buyer', 'addresses.name'],
    superposition: 'Legal name on address vs invoice header party ref',
    collapse: ['tamperProofBeforeChangeHook'],
    bond: bondOf('invoices'),
  },

  // ── translations (10) ──
  'translations::key': {
    collection: 'translations',
    path: 'key',
    partners: ['scope', 'translationKey', 'contentUuid'],
    superposition: 'Scope-local key vs composite translationKey',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('translations'),
  },
  'translations::value': {
    collection: 'translations',
    path: 'value',
    partners: ['overrides.platformDefault', 'contentUuid'],
    superposition: 'Tenant override vs platform default per locale',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('translations'),
  },
  'translations::note': {
    collection: 'translations',
    path: 'note',
    partners: ['value'],
    superposition: 'Translator rationale vs localized value',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('translations'),
  },
  'translations::contentUuid': {
    collection: 'translations',
    path: 'contentUuid',
    partners: ['scope', 'key', 'value'],
    superposition: 'Hash may drift if value edited without recompute',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('translations'),
  },
  'translations::sharedAcrossRoleProfile': {
    collection: 'translations',
    path: 'sharedAcrossRoleProfile',
    partners: ['scope', 'key'],
    superposition: 'Shared IPSAS phrasing vs tenant-specific override',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('translations'),
  },
  'translations::overrides.collection': {
    collection: 'translations',
    path: 'overrides.collection',
    partners: ['overrides.docId', 'overrides.platformDefault'],
    superposition: 'Platform layer pointer vs override value',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('translations'),
  },
  'translations::overrides.docId': {
    collection: 'translations',
    path: 'overrides.docId',
    partners: ['overrides.collection'],
    superposition: 'Platform-default row id vs tenant override',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('translations'),
  },
  'translations::overrides.platformDefault': {
    collection: 'translations',
    path: 'overrides.platformDefault',
    partners: ['value'],
    superposition: 'Snapshot at override creation vs live platform default',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('translations'),
  },
  'translations::relatedTo.collection': {
    collection: 'translations',
    path: 'relatedTo.collection',
    partners: ['relatedTo.docId', 'relatedTo.edgeKind'],
    superposition: 'Graph edge target collection vs doc id',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('translations'),
  },
  'translations::relatedTo.docId': {
    collection: 'translations',
    path: 'relatedTo.docId',
    partners: ['relatedTo.collection'],
    superposition: 'Referential harmony edge vs source row',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('translations'),
  },

  // ── chat (5) — folder chats, slug chat ──
  'chat::event': {
    collection: 'chat',
    path: 'event',
    partners: ['eventUuid', 'aggregateId', 'payload'],
    superposition: 'Event name vs content-addressed envelope',
    collapse: ['teamCommsBeforeChange', 'tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('chat'),
  },
  'chat::eventUuid': {
    collection: 'chat',
    path: 'eventUuid',
    partners: ['event', 'emittedAt', 'payload'],
    superposition: 'Idempotency key vs row id until team/comms observation',
    collapse: ['teamCommsBeforeChange', 'tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('chat'),
  },
  'chat::aggregateId': {
    collection: 'chat',
    path: 'aggregateId',
    partners: ['eventUuid', 'event'],
    superposition: 'Aggregate content-uuid vs target row id',
    collapse: ['teamCommsBeforeChange', 'tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('chat'),
  },
  'chat::agent': {
    collection: 'chat',
    path: 'agent',
    partners: ['event', 'payload'],
    superposition: 'Publishing agent vs event payload author',
    collapse: ['teamCommsBeforeChange', 'tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('chat'),
  },
  'chat::emittedAt': {
    collection: 'chat',
    path: 'emittedAt',
    partners: ['eventUuid', 'event'],
    superposition: 'ISO-8601 emit time stamped into envelope uuid derivation',
    collapse: ['teamCommsBeforeChange', 'tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('chat'),
  },

  // ── employees (15) ──
  'employees::displayName': {
    collection: 'employees',
    path: 'displayName',
    partners: ['identity.givenName', 'identity.familyName', 'payrollBankAccount.accountHolder'],
    superposition: 'Display string vs legal name parts vs bank beneficiary',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::identity.givenName': {
    collection: 'employees',
    path: 'identity.givenName',
    partners: ['identity.familyName', 'displayName'],
    superposition: 'Legal given name vs preferred display',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::identity.familyName': {
    collection: 'employees',
    path: 'identity.familyName',
    partners: ['identity.givenName', 'displayName'],
    superposition: 'Legal family name vs preferred display',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::identity.nationalIdRef': {
    collection: 'employees',
    path: 'identity.nationalIdRef',
    partners: ['tax.taxIdRef', 'tax.socialSecurityIdRef'],
    superposition: 'Tokenised id reference vs raw national id (must never store)',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::identity.citizenshipCountry': {
    collection: 'employees',
    path: 'identity.citizenshipCountry',
    partners: ['workCountry', 'tax.taxResidenceCountry'],
    superposition: 'Citizenship vs work vs tax residence country',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::employeeNumber': {
    collection: 'employees',
    path: 'employeeNumber',
    partners: ['user', 'status'],
    superposition: 'Internal id vs actor-party user relationship',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::contact.phone': {
    collection: 'employees',
    path: 'contact.phone',
    partners: ['contact.workEmail', 'contact.personalEmail'],
    superposition: 'Phone vs email contact channels',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::jobTitle': {
    collection: 'employees',
    path: 'jobTitle',
    partners: ['employmentType', 'competencies'],
    superposition: 'Job title vs competency requirements',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::workCountry': {
    collection: 'employees',
    path: 'workCountry',
    partners: ['identity.citizenshipCountry', 'tax.taxResidenceCountry'],
    superposition: 'Work jurisdiction vs citizenship vs tax residence',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::payrollBankAccount.iban': {
    collection: 'employees',
    path: 'payrollBankAccount.iban',
    partners: ['payrollBankAccount.bic', 'payrollBankAccount.accountHolder'],
    superposition: 'IBAN vs BIC vs beneficiary name triplet',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::payrollBankAccount.bic': {
    collection: 'employees',
    path: 'payrollBankAccount.bic',
    partners: ['payrollBankAccount.iban'],
    superposition: 'BIC routing vs IBAN account',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::payrollBankAccount.accountHolder': {
    collection: 'employees',
    path: 'payrollBankAccount.accountHolder',
    partners: ['displayName', 'identity.givenName', 'identity.familyName'],
    superposition: 'Bank beneficiary vs HR display name',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::tax.taxIdRef': {
    collection: 'employees',
    path: 'tax.taxIdRef',
    partners: ['identity.nationalIdRef', 'tax.socialSecurityIdRef'],
    superposition: 'Tokenised tax id vs national id reference',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::tax.socialSecurityIdRef': {
    collection: 'employees',
    path: 'tax.socialSecurityIdRef',
    partners: ['tax.taxIdRef', 'identity.nationalIdRef'],
    superposition: 'Tokenised SSN/NI vs tax id reference',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
  'employees::tax.taxResidenceCountry': {
    collection: 'employees',
    path: 'tax.taxResidenceCountry',
    partners: ['workCountry', 'identity.citizenshipCountry'],
    superposition: 'Tax residence vs work country for cross-border payroll',
    collapse: ['tamperProofBeforeChangeHook', 'auditTrailAfterChange'],
    bond: bondOf('employees'),
  },
} as const

/** Collection slug aliases (folder name → Payload slug). */
const COLLECTION_ALIASES: Readonly<Record<string, string>> = {
  chats: 'chat',
}

export const fieldEntanglementCount = (): number =>
  Object.keys(FIELD_ENTANGLEMENT_REGISTRY).length

export const fieldEntanglementKey = (collectionSlug: string, fieldPath: string): string => {
  const slug = COLLECTION_ALIASES[collectionSlug] ?? collectionSlug
  return `${slug}::${fieldPath}`
}

/** Map registry entries to skill-router EntangledField rows for parseQuantumSkill merge. */
export function entangledFieldsFromRegistry(atomPath: string): Array<{
  readonly field: string
  readonly partners: readonly string[]
  readonly hookless: boolean
  readonly drift: readonly string[]
  readonly superposition?: string
  readonly collapse?: readonly string[]
}> {
  const scope =
    atomPath === 'quantum/entanglement'
      ? null
      : (COLLECTION_ALIASES[atomPath.split('/')[0] ?? ''] ?? atomPath.split('/')[0])

  return Object.values(FIELD_ENTANGLEMENT_REGISTRY)
    .filter((e) => !scope || e.collection === scope)
    .map((e) => ({
      field: `${e.collection}.${e.path}`,
      partners: e.partners,
      hookless: false,
      drift: e.collapse.map((c) => `collapse:${c}`),
      superposition: e.superposition,
      collapse: e.collapse,
    }))
}
