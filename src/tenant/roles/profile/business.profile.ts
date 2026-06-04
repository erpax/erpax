/**
 * `business` reference profile (default ERPax tenant — generic company).
 *
 * Slice LLLLL (2026-05-11). The root profile every other reference
 * inherits from. Declares the baseline standards every business needs
 * regardless of regulated-role specialisation.
 */
import { defineTenantRole } from '@/tenant/role/registry'

defineTenantRole({
  id: 'business',
  displayName: { en: 'Business (default ERPax tenant)', bg: '[en] Business' },
  requiredStandards: [
    { body: 'IFRS', id: 'IFRS-15',  description: 'Revenue from contracts with customers' },
    { body: 'IFRS', id: 'IAS-1',    description: 'Presentation of Financial Statements' },
    { body: 'IFRS', id: 'IAS-7',    description: 'Statement of Cash Flows' },
    { body: 'GDPR', id: 'GDPR',     description: 'General Data Protection Regulation' },
    { body: 'ISO',  id: '27001',    description: 'Information security management' },
    { body: 'ISO',  id: '19011',    description: 'Auditing management systems' },
    { body: 'SOX',  id: '§404',     description: 'Internal-controls process walk-through' },
  ],
  requiredCollections: ['invoices', 'payments', 'journal-entries', 'tenants', 'users', 'audit-events'],
  requiredChains: ['O2C_GOODS', 'P2P_THREE_WAY_MATCH', 'R2R_PERIOD_CLOSE'],
  requiredAgents: ['finance', 'sales', 'hr', 'legal', 'ops', 'engineering'],
  mcpTools: [
    'erpax.spec.getCollection', 'erpax.spec.getChainRegistry',
    'erpax.chain.runStep', 'erpax.audit.getEvidence',
    'erpax.standards.cite', 'erpax.agents.list',
  ],
  invariant: 'checkBusinessCoverage100Percent',
  auditPolicy: { merkleRetentionDays: 365 * 7, signingRequired: false },
})
