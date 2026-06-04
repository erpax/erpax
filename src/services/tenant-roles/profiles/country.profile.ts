/**
 * `country` reference profile (sovereign country as ERPax tenant).
 *
 * Slice KKKKKKKK (2026-05-11). Per user 'remember any can be erpax
 * tenant even its own country'. Extends the open tenant role
 * registry (LLLLL) up to the **sovereign-country level**: a country
 * itself can run an ERPax instance, with its central bank,
 * ministries, agencies, statistical office, and treasury as
 * sub-tenants.
 *
 * The profile inherits from `government` (slice OOOOO) and adds the
 * sovereign-specific standards stack:
 *
 *   - ISO 3166-1 alpha-2 / alpha-3 / numeric (country code identity)
 *   - UN M49 / SDG indicator framework (sub-national reporting)
 *   - IMF GFSM 2014 (government finance statistics)
 *   - World Bank IDS (international debt statistics)
 *   - OECD GovDB / Pillar 2 (global minimum tax)
 *   - WCO HS (customs harmonised system)
 *   - WTO GATS / TRIPS (trade in services / IP)
 *   - UN/CEFACT (international trade facilitation)
 *   - INTERPOL UMF + Notice exchange
 *   - SWIFT BIC + ISO 13616 IBAN (cross-border payments)
 *   - W3C DID (sovereign DID for treaty signing)
 *   - VC Data Model 2.0 (verifiable credentials at sovereign scale)
 *
 * Federation pattern: countries federate as peer ERPax instances;
 * **bilateral treaties are federation envelopes** (slice AAAAAA)
 * with content uuid + sovereign DID signature; multilateral treaties
 * are N-of-K consensus envelopes (slice UUUUUU consensusRead).
 *
 * Sub-tenant hierarchy:
 *
 *   country (KKKKKKKK)
 *     ├─ central-bank          (NNNNN — basel/anaCredit/finrep/corep)
 *     ├─ treasury              (OOOOO + IPSAS 22 + GFSM)
 *     ├─ ministry-of-finance   (OOOOO + IPSAS 1-42)
 *     ├─ statistical-office    (UN SDG + ESA 2010 + ESS)
 *     ├─ tax-administration    (OECD CRS + DAC6/7/8 + Pillar 2)
 *     ├─ customs               (WCO HS + UCC + GVCs)
 *     ├─ procurement-authority (EU 2014/24 + 2014/25 + Peppol BIS)
 *     ├─ social-security       (ISSA standards + IPSAS 25)
 *     └─ ministry-of-*         (sectoral — health/transport/energy/...)
 *
 * Each sub-tenant is itself a tenant (LLLLL); each carries its own
 * uuid (Law 8); the country tenant aggregates via federation
 * envelopes; treaties cross country boundaries via AAAAAA.
 *
 * @standard ISO 3166-1 alpha-2/3/numeric — country codes
 * @standard UN M49 + UN SDG indicator framework
 * @standard IMF GFSM 2014 + World Bank IDS + OECD GovDB
 * @standard OECD BEPS Pillar 2 + CRS + DAC6/7/8
 * @standard WCO HS + WTO GATS + WTO TRIPS + UN/CEFACT
 * @standard SWIFT BIC + ISO 13616 IBAN + ISO 20022
 * @standard W3C DID Core 1.0 (sovereign DID) + W3C VC Data Model 2.0
 * @audit ISO 19011:2018 §6.4.6 (treaty + multilateral envelope audit-trailed)
 */

import { defineTenantRole } from '@/services/tenant-roles/registry'

defineTenantRole({
  id: 'country',
  displayName: { en: 'Country (sovereign tenant)', bg: '[en] Country' },
  inheritsFrom: ['government'],
  requiredStandards: [
    { body: 'ISO',         id: '3166-1',           description: 'Country codes — alpha-2 / alpha-3 / numeric' },
    { body: 'UN',          id: 'M49',              description: 'Standard country / area codes for statistical use' },
    { body: 'UN',          id: 'SDG indicators',   description: 'Sustainable Development Goals indicator framework — sovereign reporting' },
    { body: 'IMF',         id: 'GFSM 2014',        description: 'Government Finance Statistics Manual — sovereign accounts' },
    { body: 'WORLD-BANK',  id: 'IDS',              description: 'International Debt Statistics' },
    { body: 'OECD',        id: 'GovDB',            description: 'Government at a Glance database — sovereign indicators' },
    { body: 'OECD',        id: 'BEPS Pillar 2',    description: 'Global minimum corporate tax (15%)' },
    { body: 'OECD',        id: 'CRS',              description: 'Common Reporting Standard — automatic exchange of tax info' },
    { body: 'EU',          id: 'DAC8',             description: 'Crypto-asset reporting (extends DAC6/DAC7)' },
    { body: 'WCO',         id: 'HS',               description: 'Harmonised System — customs nomenclature' },
    { body: 'WTO',         id: 'GATS',             description: 'General Agreement on Trade in Services' },
    { body: 'WTO',         id: 'TRIPS',            description: 'Trade-Related Aspects of Intellectual Property Rights' },
    { body: 'UN/CEFACT',   id: 'BRS + UN/EDIFACT', description: 'International trade facilitation + EDI standards' },
    { body: 'INTERPOL',    id: 'UMF',              description: 'Unified Message Format — law-enforcement notice exchange' },
    { body: 'SWIFT',       id: 'BIC',              description: 'Business Identifier Code — sovereign + central bank' },
    { body: 'ISO',         id: '13616 IBAN',       description: 'International Bank Account Number' },
    { body: 'ISO',         id: '20022',            description: 'Universal financial industry message scheme — central-bank to central-bank' },
    { body: 'W3C',         id: 'DID Core 1.0',     description: 'Decentralized Identifier — sovereign DID for treaty signing' },
    { body: 'W3C',         id: 'VC Data Model 2.0', description: 'Verifiable credentials at sovereign scale' },
    { body: 'EU',          id: 'eIDAS QTSP',       description: 'Qualified trust services providers — cross-border digital identity' },
    { body: 'IFRS',        id: 'IPSAS 22',         description: 'Disclosure of Financial Information about the General Government Sector' },
    { body: 'OECD',        id: 'TIWB',             description: 'Tax Inspectors Without Borders' },
    { body: 'UN',          id: 'A/RES/68/261',     description: 'Fundamental Principles of Official Statistics' },
  ],
  requiredCollections: [
    // Country-level collections (in addition to inherited):
    // 'sovereign-treaties', 'multilateral-envelopes', 'central-bank-policies',
    // 'tax-treaty-network', 'customs-tariffs', 'cross-border-payments',
    // 'sovereign-debt-issuances', 'sdg-progress-indicators',
    // 'treaty-signing-events', 'sovereign-did-registrations'.
    // Sub-tenants (central-bank / treasury / ministry-of-*) carry the
    // operational collections; the country tenant aggregates.
  ],
  // Country inherits government's chains/agents/tools via getEffectiveProfile;
  // its own declared set adds nothing beyond the sovereign aggregation posture.
  requiredChains: [],
  requiredAgents: [],
  mcpTools: [],
  auditPolicy: { merkleRetentionDays: 365 * 30, signingRequired: true, regulatorReportingCadence: 'quarterly' },
  invariant: 'Trinity Law III (Closure) + Law 8 (Identity) at sovereign scale: every treaty is a federation envelope (AAAAAA) signed by a sovereign DID; every domestic action stays within the country torus or federates with bilateral provenance; every sub-tenant carries its own uuid and aggregates into the country aggregate uuid via consensus reads (Law 36).',
})
