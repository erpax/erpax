/**
 * Standards registry — the curated canonical spine.
 *
 * Standards are *facts* (like the SNA/COFOG taxonomies in `sectors/seed.ts`):
 * a banner can tell you a standard is cited and where, but not its canonical
 * title, family or publisher. Those are encoded here, verbatim, once. The live
 * USAGE (how often / which modules cite each) is NOT here — it is computed from
 * the `@standard` banners dissolved across src/ by
 * `scripts/standards-catalogue.mjs`, which joins this spine to the banner scan
 * and emits the shared `catalogue.ts` that both the payload seed and the
 * vitepress page read. Curated facts ⊕ fs-derived usage = the shared index.
 *
 * `id` is the canonical standard id (the catalogue/seed key). `match` overrides
 * the default citation matcher (the salient numeric/acronym token of the id)
 * when the banners use a different spelling.
 *
 * @standard ISO-19011:2018 audit-evidence (a curated register of cited norms)
 * @standard ISO/IEC-25010:2023 §5.1 functional-completeness
 */

import { PORTED_STANDARDS } from './ported'

export interface RegisteredStandard {
  /** Canonical id — the seed `standardId` + catalogue key, e.g. "ISO-4217". */
  readonly id: string
  /** Payload `standards.family` enum value. */
  readonly family: string
  /** Canonical short title. */
  readonly title: string
  /** Optional citation matcher override (else derived from the id's salient token). */
  readonly match?: string
  /** Jurisdiction — EU, BG, international, US, ISO… (ported governance). */
  readonly jurisdiction?: string
  /** Real source URL confirming the standard (WebSearch-verified). */
  readonly sourceUrl?: string
}

const CURATED_STANDARDS: ReadonlyArray<RegisteredStandard> = [
  // — IFRS / IAS financial reporting —
  { id: 'IFRS-15', family: 'ifrs', title: 'Revenue from Contracts with Customers' },
  { id: 'IFRS-9', family: 'ifrs', title: 'Financial Instruments' },
  { id: 'IFRS-13', family: 'ifrs', title: 'Fair Value Measurement' },
  { id: 'IFRS-16', family: 'ifrs', title: 'Leases' },
  { id: 'IFRS-17', family: 'ifrs', title: 'Insurance Contracts' },
  { id: 'IAS-1', family: 'ifrs', title: 'Presentation of Financial Statements' },
  { id: 'IAS-2', family: 'ifrs', title: 'Inventories' },
  { id: 'IAS-12', family: 'ifrs', title: 'Income Taxes' },
  { id: 'IAS-34', family: 'ifrs', title: 'Interim Financial Reporting' },
  { id: 'IAS-40', family: 'ifrs', title: 'Investment Property' },

  // — US-GAAP, SOX & assurance —
  { id: 'US-GAAP', family: 'us_gaap', title: 'FASB Accounting Standards Codification' },
  { id: 'ASC-606', family: 'us_gaap', title: 'Revenue from Contracts with Customers (US)' },
  { id: 'SOX', family: 'sox', title: 'Sarbanes-Oxley Act §302/404/906' },
  { id: 'COSO-2013', family: 'sox', title: 'Internal Control — Integrated Framework' },
  { id: 'PCAOB-AS-2201', family: 'sox', title: 'Integrated Audit of ICFR', match: 'AS[- ]?2201' },
  { id: 'ISA-500', family: 'sox', title: 'Audit Evidence' },
  { id: 'ISA-530', family: 'sox', title: 'Audit Sampling' },
  { id: 'XBRL', family: 'other', title: 'eXtensible Business Reporting Language' },

  // — Money, banking identifiers & payments —
  { id: 'ISO-4217', family: 'iso', title: 'Currency codes', match: '4217' },
  { id: 'ISO-13616-1', family: 'iso', title: 'IBAN — International Bank Account Number', match: '13616' },
  { id: 'ISO-9362', family: 'iso', title: 'BIC — Business Identifier Code (SWIFT)', match: '9362' },
  { id: 'ISO-17442-1', family: 'iso', title: 'LEI — Legal Entity Identifier', match: '17442' },
  { id: 'ISO-20022', family: 'iso', title: 'Universal financial industry message scheme', match: '20022' },
  { id: 'ISO-7064', family: 'iso', title: 'Check character systems', match: '7064' },
  { id: 'SEPA', family: 'eu', title: 'Single Euro Payments Area schemes' },

  // — Trade documents & e-invoicing —
  { id: 'EN-16931', family: 'en', title: 'Semantic model of the electronic invoice', match: '16931' },
  { id: 'Peppol-BIS-3.0', family: 'eu', title: 'Peppol Billing BIS', match: 'Peppol' },
  { id: 'UBL-2.1', family: 'un', title: 'Universal Business Language', match: 'UBL' },
  { id: 'ISO-9735', family: 'un', title: 'UN/EDIFACT syntax rules', match: 'EDIFACT|9735' },
  { id: 'UN-CEFACT', family: 'un', title: 'UN/CEFACT code lists', match: 'CEFACT' },
  { id: 'UNSPSC', family: 'un', title: 'UN Standard Products & Services Code' },
  { id: 'GS1-GTIN', family: 'un', title: 'Global Trade Item Number', match: 'GTIN' },
  { id: 'ISO-6523-1', family: 'iso', title: 'Participant identifier scheme', match: '6523' },
  { id: 'WCO-HS', family: 'un', title: 'Harmonized System customs nomenclature', match: 'WCO|Harmonized' },

  // — Tax (international + Bulgaria) —
  { id: 'SAF-T', family: 'oecd', title: 'OECD Standard Audit File for Tax', match: 'SAF-T' },
  { id: 'OECD-Transfer-Pricing', family: 'oecd', title: 'Transfer Pricing Guidelines', match: 'Transfer.?Pricing' },
  { id: 'OECD-Pillar-Two', family: 'oecd', title: 'GloBE global minimum tax', match: 'Pillar.?Two|GloBE' },
  { id: 'BEPS', family: 'oecd', title: 'Base Erosion and Profit Shifting' },
  { id: 'Naredba-N-18', family: 'national', title: 'BG fiscal-device & SUPTO ordinance', match: 'Наредба|Naredba|N-18|СУПТО|SUPTO' },
  { id: 'ZDDS', family: 'national', title: 'BG Value Added Tax Act', match: 'ZDDS|ЗДДС' },
  { id: 'ZKPO', family: 'national', title: 'BG Corporate Income Tax Act', match: 'ZKPO|ЗКПО' },

  // — Locale, i18n & time —
  { id: 'ISO-8601-1', family: 'iso', title: 'Date and time representation', match: '8601' },
  { id: 'ISO-3166-1', family: 'iso', title: 'Country codes', match: '3166-1|3166-?1' },
  { id: 'ISO-3166-2', family: 'iso', title: 'Country subdivision codes', match: '3166-2' },
  { id: 'BCP-47', family: 'rfc', title: 'Language tags', match: 'BCP-?47' },
  { id: 'ECMA-402', family: 'w3c', title: 'ECMAScript Internationalization API', match: 'ECMA-?402' },
  { id: 'Unicode-CLDR', family: 'w3c', title: 'Common Locale Data Repository', match: 'CLDR' },
  { id: 'ISO-639', family: 'iso', title: 'Language codes', match: '639' },
  { id: 'EU-1958', family: 'eu', title: 'Official languages of the EU', match: '1958' },

  // — Web, linked-data & semantic —
  { id: 'W3C-JSON-LD-1.1', family: 'w3c', title: 'JSON for Linking Data', match: 'JSON-LD' },
  { id: 'schema.org', family: 'w3c', title: 'Linked-data type vocabulary', match: 'schema\\.org' },
  { id: 'W3C-VC-2.0', family: 'w3c', title: 'Verifiable Credentials Data Model', match: 'Verifiable.?Credential' },
  { id: 'W3C-DID-1.0', family: 'w3c', title: 'Decentralized Identifiers', match: '\\bDID\\b|Decentralized.?Identifier' },
  { id: 'W3C-ActivityPub', family: 'w3c', title: 'Federated server-to-server protocol', match: 'ActivityPub' },
  { id: 'W3C-PROV-O', family: 'w3c', title: 'Provenance Ontology', match: 'PROV-?O|PROV' },
  { id: 'ECMA-262', family: 'w3c', title: 'ECMAScript language specification', match: 'ECMA-?262|ECMAScript' },
  { id: 'RFC-7231', family: 'rfc', title: 'HTTP/1.1 semantics', match: '7231' },

  // — Accessibility & document formats —
  { id: 'WCAG-2.1', family: 'wcag', title: 'Web Content Accessibility Guidelines', match: 'WCAG' },
  { id: 'W3C-WAI-ARIA-1.2', family: 'wcag', title: 'Accessible Rich Internet Applications', match: 'WAI-ARIA|ARIA' },
  { id: 'ISO-32000', family: 'iso', title: 'PDF — Portable Document Format', match: '32000' },
  { id: 'ISO-19005', family: 'iso', title: 'PDF/A archival format', match: '19005' },
  { id: 'ISO-14289-1', family: 'iso', title: 'PDF/UA universally accessible PDF', match: '14289' },
  { id: 'ETSI-EN-319-142', family: 'etsi', title: 'PAdES PDF advanced electronic signatures', match: '319-142' },
  { id: 'ISO/IEC-10918', family: 'iec', title: 'JPEG image coding', match: '10918' },
  { id: 'RFC-5545', family: 'rfc', title: 'iCalendar', match: '5545' },

  // — Cryptography, UUID & trust services —
  { id: 'RFC-4122', family: 'rfc', title: 'UUID (original)', match: '4122' },
  { id: 'RFC-9562', family: 'rfc', title: 'UUID (revised — content/event uuid)', match: '9562' },
  { id: 'RFC-8785', family: 'rfc', title: 'JSON Canonicalization Scheme', match: '8785' },
  { id: 'RFC-5652', family: 'rfc', title: 'Cryptographic Message Syntax (CMS)', match: '5652' },
  { id: 'NIST-FIPS-180-4', family: 'nist', title: 'Secure Hash Standard (SHA-2)', match: '180-4|FIPS-?180' },
  { id: 'NIST-SP-800-38D', family: 'nist', title: 'AES-GCM authenticated encryption', match: '800-38D' },
  { id: 'NIST-SP-800-108', family: 'nist', title: 'Key derivation functions', match: '800-108' },
  { id: 'NIST-SP-800-57', family: 'nist', title: 'Key management lifecycles', match: '800-57' },
  { id: 'eIDAS', family: 'etsi', title: 'EU electronic identification & trust services', match: 'eIDAS' },

  // — Information security & access control —
  { id: 'NIST-INCITS-359-2012', family: 'nist', title: 'Role-Based Access Control', match: 'INCITS-?359' },
  { id: 'NIST-SP-800-162', family: 'nist', title: 'Attribute-Based Access Control', match: '800-162' },
  { id: 'NIST-SP-800-92', family: 'nist', title: 'Log management', match: '800-92' },
  { id: 'ISO-27001', family: 'iso', title: 'Information security management system', match: '27001' },
  { id: 'ISO-27002', family: 'iso', title: 'Information security controls', match: '27002' },
  { id: 'ISO-27037', family: 'iso', title: 'Digital evidence identification & preservation', match: '27037' },
  { id: 'OWASP-ASVS', family: 'nist', title: 'Application Security Verification Standard', match: 'ASVS|OWASP' },
  { id: 'ISO-19011', family: 'iso', title: 'Auditing management systems', match: '19011' },

  // — Software quality, testing, AI governance & protocols —
  { id: 'ISO/IEC-25010', family: 'iec', title: 'Systems & software quality models', match: '25010' },
  { id: 'ISO/IEC-29119', family: 'iec', title: 'Software testing', match: '29119' },
  { id: 'ISO/IEC-12207', family: 'iec', title: 'Software life-cycle processes', match: '12207' },
  { id: 'ISO/IEC-42001', family: 'iec', title: 'AI management system', match: '42001' },
  { id: 'ISO/IEC-23894', family: 'iec', title: 'AI risk management', match: '23894' },
  { id: 'NIST-AI-RMF', family: 'nist', title: 'AI Risk Management Framework', match: 'AI-RMF' },
  { id: 'EU-AI-Act', family: 'eu', title: 'Regulation (EU) 2024/1689 on AI', match: 'AI[- ]Act|2024/1689' },
  { id: 'MCP', family: 'other', title: 'Model Context Protocol', match: '\\bMCP\\b' },
  { id: 'JSON-Schema', family: 'w3c', title: 'JSON Schema', match: 'JSON-Schema' },
  { id: 'IEEE-754', family: 'other', title: 'Floating-point arithmetic', match: '754' },

  // — Sustainability, governance, competencies & addressing —
  { id: 'EU-ESRS', family: 'eu', title: 'European Sustainability Reporting Standards', match: 'ESRS' },
  { id: 'GHG-Protocol', family: 'other', title: 'Greenhouse Gas Protocol', match: 'GHG' },
  { id: 'ISO-37301', family: 'iso', title: 'Compliance management systems', match: '37301' },
  { id: 'ISO-55000', family: 'iso', title: 'Asset management', match: '55000' },
  { id: 'ISO-41001', family: 'iso', title: 'Facility management', match: '41001' },
  { id: 'ESCO', family: 'eu', title: 'European Skills/Competences/Occupations', match: '\\bESCO\\b' },
  { id: 'SFIA', family: 'other', title: 'Skills Framework for the Information Age', match: 'SFIA' },
  { id: 'ISA-95', family: 'other', title: 'Enterprise-control system integration', match: 'ISA-?95' },
  { id: 'ISO-22400-2', family: 'iso', title: 'Manufacturing operations KPIs', match: '22400' },
  { id: 'UPU-S42', family: 'upu', title: 'International postal addressing', match: 'UPU|S42' },
  { id: 'ISO-19160-4', family: 'iso', title: 'Addressing — components & conceptual model', match: '19160' },

  // — Permaculture / regenerative agriculture (upstream inhale; the standards
  //   basis of the agriculture domain — registered, cited as the domain grows) —
  { id: 'Permaculture-Principles', family: 'other', title: "Permaculture design principles (Holmgren's 12)", match: 'permaculture.?principle|holmgren' },
  { id: 'Permaculture-Ethics', family: 'other', title: 'Permaculture ethics — earth care · people care · fair share', match: 'permaculture.?ethic|fair.?share|earth.?care' },
  { id: 'IFOAM-Norms', family: 'other', title: 'IFOAM Norms for Organic Production & Processing', match: 'IFOAM' },
  { id: 'EU-2018-848', family: 'eu', title: 'EU Organic Production Regulation', match: '2018/848|2018-848' },
  { id: 'USDA-NOP', family: 'other', title: 'USDA National Organic Program (7 CFR 205)', match: '\\bNOP\\b|national.organic.program' },
  { id: 'Demeter-Biodynamic', family: 'other', title: 'Demeter International Biodynamic standard', match: 'demeter|biodynamic' },
  { id: 'Regenerative-Organic', family: 'other', title: 'Regenerative Organic Certified (ROC)', match: 'regenerative.?organic|\\bROC\\b' },
  { id: 'GLOBALG.A.P', family: 'other', title: 'GLOBALG.A.P. Integrated Farm Assurance', match: 'globalg' },
  { id: 'Savory-EOV', family: 'other', title: 'Savory Ecological Outcome Verification (Land to Market)', match: 'savory|ecological.?outcome|\\bEOV\\b' },
  { id: 'FAO-Agroecology', family: 'un', title: 'FAO 10 Elements of Agroecology', match: 'agroecology' },
  // food safety, grading & climate references the agriculture domain cites
  { id: 'USDA-GAP', family: 'other', title: 'USDA Harmonized GAP / GHP food-safety audit', match: 'harmonized.?gap|GAP.?/.?GHP|\\bGHP\\b' },
  { id: 'FSMA-PSR', family: 'other', title: 'FDA FSMA Produce Safety Rule (21 CFR 112)', match: 'FSMA|21.?CFR.?112|produce.?safety.?rule' },
  { id: 'Codex-Alimentarius', family: 'un', title: 'Codex Alimentarius (FAO/WHO food standards)', match: 'codex' },
  { id: 'USDA-AMS-Grade', family: 'other', title: 'USDA AMS fresh-produce grade standards (US No. 1 / Fancy)', match: 'USDA.?AMS|US.?grade.?standard' },
  { id: 'USDA-Hardiness-Zones', family: 'other', title: 'USDA Plant Hardiness Zone Map', match: 'hardiness.?zone|plant.?hardiness' },

  // — long-tail: standards already @standard-cited in code but unregistered —
  { id: 'IAS-41', family: 'ifrs', title: 'Agriculture (biological assets)', match: 'IAS[- ]?41' },
  { id: 'IFRS-3', family: 'ifrs', title: 'Business Combinations', match: 'IFRS[- ]?3\\b' },
  { id: 'IFRS-2', family: 'ifrs', title: 'Share-based Payment', match: 'IFRS[- ]?2\\b' },
  { id: 'IFRS-5', family: 'ifrs', title: 'Non-current Assets Held for Sale & Discontinued Operations', match: 'IFRS[- ]?5\\b' },
  { id: 'IFRS-6', family: 'ifrs', title: 'Exploration for & Evaluation of Mineral Resources', match: 'IFRS[- ]?6\\b' },
  { id: 'PSD2', family: 'eu', title: 'EU Payment Services Directive 2 (2015/2366)', match: 'PSD2|PSD-2|payment.?services.?directive' },
  { id: 'PCI-DSS', family: 'other', title: 'Payment Card Industry Data Security Standard', match: 'PCI-?DSS' },
  { id: 'ITU-T-X667', family: 'other', title: 'ITU-T X.667 / ISO-IEC 9834-8 — UUID generation', match: 'X\\.667|9834-8' },
  { id: 'Berlin-Group-PSD2', family: 'eu', title: 'Berlin Group NextGenPSD2 open-banking API', match: 'Berlin.?Group|NextGenPSD2' },
  { id: 'EU-CSRD', family: 'eu', title: 'EU Corporate Sustainability Reporting Directive 2022/2464', match: 'CSRD|2022/2464' },
  { id: 'EU-VAT-Directive', family: 'eu', title: 'EU VAT Directive 2006/112/EC', match: '2006/112|VAT.?Directive' },
  { id: 'EU-UCC', family: 'eu', title: 'EU Union Customs Code (Regulation 952/2013)', match: 'union.?customs|952/2013' },
  { id: 'NACE', family: 'eu', title: 'EU NACE Rev.2 economic-activity classification', match: '\\bNACE\\b' },
  { id: 'SWIFT-MT', family: 'other', title: 'SWIFT MT financial messages', match: 'SWIFT.?MT|\\bSWIFT\\b' },

  // — livestock · aquaculture · forestry · apiculture (the loop's new domains) —
  { id: 'ISO-11784', family: 'iso', title: 'RFID animal identification (code structure & protocol)', match: '11784|11785' },
  { id: 'EU-1760-2000', family: 'eu', title: 'EU cattle identification & beef labelling (Reg 1760/2000)', match: '1760/2000|cattle.?identification|beef.?label' },
  { id: 'WOAH-Codes', family: 'other', title: 'WOAH (OIE) Terrestrial & Aquatic Animal Health Codes', match: 'WOAH|\\bOIE\\b|animal.?health.?code' },
  { id: 'ASC', family: 'other', title: 'Aquaculture Stewardship Council standard', match: 'aquaculture.?stewardship' },
  { id: 'BAP', family: 'other', title: 'Best Aquaculture Practices (GSA)', match: 'best.?aquaculture' },
  { id: 'FAO-CCRF', family: 'un', title: 'FAO Code of Conduct for Responsible Fisheries', match: 'responsible.?fisheries|\\bCCRF\\b' },
  { id: 'FSC', family: 'other', title: 'Forest Stewardship Council certification', match: 'forest.?stewardship|\\bFSC\\b' },
  { id: 'PEFC', family: 'other', title: 'Programme for the Endorsement of Forest Certification', match: 'PEFC' },
  { id: 'EU-EUDR', family: 'eu', title: 'EU Deforestation Regulation (2023/1115)', match: 'EUDR|2023/1115|deforestation' },
  { id: 'Codex-Honey', family: 'un', title: 'Codex honey standard / EU Honey Directive 2001/110', match: 'honey|2001/110' },
] as const

/** The registry: the curated spine ⊕ the WebSearch-verified ported governing standards & international laws. */
export const STANDARDS_REGISTRY: ReadonlyArray<RegisteredStandard> = [...CURATED_STANDARDS, ...PORTED_STANDARDS]
