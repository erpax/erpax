/**
 * `payment-provider` reference profile (AISP/PISP/EMI/PI under EU PSD2/PSD3).
 *
 * Slice MMMMM (2026-05-11). Closes the 5 PSP-coverage gaps measured
 * 2026-05-11 (PSD3, EMD2, EBA RTS, DAC8, CRD V/CRR II-III) by declaring
 * them as `requiredStandards`. The conservation invariant
 * `checkPspCoverage100Percent` (lands as a follow-up cut) asserts every
 * declared standard is cited by ≥1 collection JSDoc banner.
 *
 * @standard PSD2 + PSD3 + EBA RTS + EMD2 + ISO 20022 + Berlin Group +
 *           SEPA + SWIFT + PCI-DSS + DAC8 + CRD V/CRR II-III + AML/AMLD + eIDAS
 */
import { defineTenantRole } from '@/services/tenant-roles/registry'

defineTenantRole({
  id: 'payment-provider',
  displayName: { en: 'Payment provider (AISP/PISP/EMI/PI)', bg: '[en] Payment provider' },
  inheritsFrom: ['business'],
  requiredStandards: [
    { body: 'EU',  id: 'PSD2',                        description: 'Payment Services Directive 2015/2366' },
    { body: 'EU',  id: 'PSD3',                        description: 'Payment Services Directive 3 (incoming)' },
    { body: 'EBA', id: 'RTS-SCA',                     description: 'Strong Customer Authentication RTS' },
    { body: 'EBA', id: 'RTS-TRA',                     description: 'Transaction Risk Analysis RTS' },
    { body: 'EU',  id: 'EMD2',                        description: 'E-Money Directive 2009/110/EC' },
    { body: 'ISO', id: '20022',                       description: 'Universal financial industry message scheme' },
    { body: 'BERLIN-GROUP', id: 'NextGenPSD2 v1.3.x', description: 'AISP/PISP API surface' },
    { body: 'EU',  id: 'SEPA',                        description: 'Single Euro Payments Area' },
    { body: 'PCI', id: 'PCI-DSS v4.0',                description: 'Payment Card Industry Data Security Standard' },
    { body: 'EU',  id: 'DAC8',                        description: 'Crypto-asset reporting directive' },
    { body: 'EU',  id: 'CRD V',                       description: 'Capital Requirements Directive V' },
    { body: 'EU',  id: 'CRR II',                      description: 'Capital Requirements Regulation II' },
    { body: 'EU',  id: 'AMLD6',                       description: 'Sixth Anti-Money-Laundering Directive' },
    { body: 'EU',  id: 'eIDAS',                       description: 'electronic IDentification and trust services' },
  ],
  requiredCollections: [
    'invoices', 'payments', 'bank-accounts', 'bank-transactions',
    'sepa-mandates', 'kyc-checks', 'beneficial-owners', 'fx-transactions',
    // Slice MMMMM future: sca-events, tra-decisions, regulatory-capital-reports, dac8-reports, e-money-issuance
  ],
  requiredChains: [
    'O2C_GOODS', 'KYC_SANCTIONS_REVIEW', 'MULTI_INVOICE_PAYMENT_ALLOCATION',
    // Slice MMMMM future: PSP_AUTHORISATION_CYCLE
  ],
  requiredAgents: ['finance', 'legal', 'data'],
  mcpTools: [
    'erpax.audit.getEvidence', 'erpax.standards.cite',
    // Slice MMMMM future: erpax.psp.tenantPosture, erpax.psp.fitnessCheck
  ],
  invariant: 'checkPspCoverage100Percent',
  auditPolicy: { merkleRetentionDays: 365 * 7, signingRequired: true, regulatorReportingCadence: 'quarterly' },
})
