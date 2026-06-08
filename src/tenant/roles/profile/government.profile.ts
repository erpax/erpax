/**
 * `government` reference profile (public-sector entity).
 *
 * Slice OOOOO (2026-05-11). Inherits from `business`. Closes the 9
 * gov-coverage gaps measured 2026-05-11 (IPSAS 1-42, GFSM 2014, EU
 * 2014/24, EU 2014/25, DCAT-AP, INSPIRE, AMLD6, DAC6/DAC7, OECD
 * Pillar 2) by declaring them as `requiredStandards`.
 *
 * @standard IPSAS 1-42 + GFSM 2014 + EU procurement directives +
 *           Peppol BIS Billing 3.0 + Factur-X / EN 16931 + DCAT-AP +
 *           INSPIRE + eIDAS QTSP + OECD BEPS Pillar 2 + DAC6/DAC7 +
 *           AMLD6 + UN SDG + IFRS S1/S2
 */
import { defineTenantRole } from '@/tenant/role'

defineTenantRole({
  id: 'government',
  displayName: { en: 'Government / public-sector entity', bg: '[en] Government' },
  inheritsFrom: ['business'],
  requiredStandards: [
    { body: 'IPSASB', id: 'IPSAS 1-42',          description: 'International Public Sector Accounting Standards' },
    { body: 'IMF',    id: 'GFSM 2014',           description: 'Government Finance Statistics Manual' },
    { body: 'EU',     id: '2014/24',             description: 'Public procurement directive' },
    { body: 'EU',     id: '2014/25',             description: 'Utilities procurement directive' },
    { body: 'OPENPEPPOL', id: 'BIS Billing 3.0', description: 'Peppol cross-border e-invoicing standard' },
    { body: 'CEN',    id: 'EN 16931',            description: 'Semantic data model for the core elements of an electronic invoice' },
    { body: 'W3C',    id: 'DCAT-AP',             description: 'Data Catalog Vocabulary — Application Profile for European data portals' },
    { body: 'EU',     id: 'INSPIRE',             description: 'Infrastructure for Spatial Information in Europe directive' },
    { body: 'EU',     id: 'eIDAS QTSP',          description: 'Qualified Trust Service Providers' },
    { body: 'OECD',   id: 'BEPS Pillar 2',       description: 'Global minimum corporate tax (15%)' },
    { body: 'EU',     id: 'DAC6',                description: 'Mandatory disclosure rules for cross-border arrangements' },
    { body: 'EU',     id: 'DAC7',                description: 'Digital platform reporting' },
    { body: 'EU',     id: 'AMLD6',               description: 'Sixth Anti-Money-Laundering Directive' },
    { body: 'UN',     id: 'SDG indicators',      description: 'Sustainable Development Goals indicator framework' },
    { body: 'IFRS',   id: 'IFRS S1/S2',          description: 'Sustainability disclosure standards' },
  ],
  requiredCollections: [
    'evidence-attestations', 'csrd-disclosures', 'carbon-emissions',
    // Slice OOOOO future: public-procurements, tender-evaluations,
    // gfs-classifications, open-data-catalogues, qualified-trust-services
  ],
  requiredChains: [
    'ESG_REPORTING_CYCLE', 'KYC_SANCTIONS_REVIEW',
    // Slice OOOOO future: PUBLIC_PROCUREMENT_CYCLE, IPSAS_REPORTING_CYCLE
  ],
  requiredAgents: ['finance', 'legal', 'data', 'engineering'],
  mcpTools: [
    'erpax.audit.getEvidence', 'erpax.standards.cite',
    // Slice OOOOO future: erpax.gov.tenderEvaluation, erpax.gov.dcatExport
  ],
  invariant: 'checkGovernmentCoverage100Percent',
  auditPolicy: { merkleRetentionDays: 365 * 10, signingRequired: true, regulatorReportingCadence: 'quarterly' },
})
