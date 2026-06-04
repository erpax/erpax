/**
 * `bank` reference profile (credit institution / E-money / investment firm).
 *
 * Slice NNNNN (2026-05-11). Inherits from `payment-provider`. Closes the
 * 13 bank-coverage gaps measured 2026-05-11 (Basel III/IV + BCBS 239,
 * CRR full, AnaCredit, FINREP, COREP, SREP, MiFID II, EMIR, BRRD, DGSD,
 * FATCA, CRS) by declaring them as `requiredStandards`.
 *
 * @standard Basel III/IV + BCBS 239 + CRR + CRD + IFRS 9 ECL + AnaCredit
 *           + FINREP + COREP + SREP + MiFID II + EMIR + BRRD + DGSD + FATCA + CRS
 */
import { defineTenantRole } from '@/tenant/role/registry'

defineTenantRole({
  id: 'bank',
  displayName: { en: 'Bank (credit institution / investment firm)', bg: '[en] Bank' },
  inheritsFrom: ['payment-provider'],
  requiredStandards: [
    { body: 'BCBS', id: 'Basel III',  description: 'International regulatory framework for banks' },
    { body: 'BCBS', id: 'Basel IV',   description: 'Finalised Basel III reforms (effective 2025-2028)' },
    { body: 'BCBS', id: 'BCBS 239',   description: 'Risk data aggregation + risk reporting' },
    { body: 'EU',   id: 'CRR III',    description: 'Capital Requirements Regulation III' },
    { body: 'EU',   id: 'CRD VI',     description: 'Capital Requirements Directive VI' },
    { body: 'IFRS', id: 'IFRS-9',     description: 'Expected Credit Loss model' },
    { body: 'ECB',  id: 'AnaCredit',  description: 'Analytical credit datasets reporting' },
    { body: 'EBA',  id: 'FINREP',     description: 'Financial reporting framework' },
    { body: 'EBA',  id: 'COREP',      description: 'Common reporting framework' },
    { body: 'EBA',  id: 'SREP',       description: 'Supervisory Review and Evaluation Process' },
    { body: 'EU',   id: 'MiFID II',   description: 'Markets in Financial Instruments Directive II' },
    { body: 'EU',   id: 'EMIR',       description: 'European Market Infrastructure Regulation' },
    { body: 'EU',   id: 'BRRD',       description: 'Bank Recovery and Resolution Directive' },
    { body: 'EU',   id: 'DGSD',       description: 'Deposit Guarantee Schemes Directive' },
    { body: 'US',   id: 'FATCA',      description: 'Foreign Account Tax Compliance Act' },
    { body: 'OECD', id: 'CRS',        description: 'Common Reporting Standard' },
  ],
  requiredCollections: [
    // Slice NNNNN future: regulatory-reports, risk-data-aggregations,
    // recovery-resolution-plans, large-exposures, liquidity-coverage-ratios
  ],
  requiredChains: [
    'R2R_PERIOD_CLOSE',
    // Slice NNNNN future: BANK_REGULATORY_REPORTING_CYCLE
  ],
  requiredAgents: ['finance', 'legal', 'data', 'engineering'],
  mcpTools: [
    'erpax.audit.getEvidence',
    // Slice NNNNN future: erpax.bank.fitnessCheck, erpax.bank.regulatoryReportingCalendar
  ],
  invariant: 'checkBankCoverage100Percent',
  auditPolicy: { merkleRetentionDays: 365 * 10, signingRequired: true, regulatorReportingCadence: 'monthly' },
})
