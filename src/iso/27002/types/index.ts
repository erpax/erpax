/**
 * Canonical ISO 27002:2022 security control catalog — id ↔ title ↔ theme
 * lookup tables for the controls cited across the codebase.
 *
 * Numbering. Both ISO 27001 Annex A and ISO 27002 main body number controls
 * the same — `A.5.23` ≡ `§5.23`. The canonical key is the bare
 * `<clause>.<number>` form (e.g. `'5.23'`, `'8.3'`). Banners in source
 * code may cite either prefix.
 *
 * @standard ISO-27002:2022 information-security-controls
 * @standard ISO-27001:2022 isms-annex-a-controls
 * @compliance SOC-2 trust-services-criteria
 * @see ./README.md
 */

/**
 * The four themes ISO 27002:2022 organizes controls by.
 *
 * @standard ISO-27002:2022 §4 themes
 */
export type Iso27002Theme = 'organizational' | 'people' | 'physical' | 'technological'

/**
 * The cited subset of ISO 27002:2022 control identifiers, as the bare
 * `<clause>.<number>` key. Extend the union (and the lookup tables
 * below) as new controls are cited.
 *
 * @standard ISO-27002:2022 information-security-controls
 */
export type Iso27002ControlId =
  // Organizational controls (clause 5)
  | '5.4'   // Segregation of duties
  | '5.14'  // Information transfer
  | '5.15'  // Access control
  | '5.16'  // Identity management
  | '5.17'  // Authentication information
  | '5.18'  // Access rights
  | '5.23'  // Information security for use of cloud services
  | '5.34'  // Privacy and protection of PII
  // Technological controls (clause 8)
  | '8.2'   // Privileged access rights
  | '8.3'   // Information access restriction
  | '8.5'   // Secure authentication
  | '8.11'  // Data masking
  | '8.15'  // Logging
  | '8.16'  // Monitoring activities
  | '8.20'  // Networks security
  | '8.23'  // Web filtering
  | '8.24'  // Use of cryptography
  | '8.30'  // Outsourced development

const TITLES: Record<Iso27002ControlId, string> = {
  '5.4': 'Segregation of duties',
  '5.14': 'Information transfer',
  '5.15': 'Access control',
  '5.16': 'Identity management',
  '5.17': 'Authentication information',
  '5.18': 'Access rights',
  '5.23': 'Information security for use of cloud services',
  '5.34': 'Privacy and protection of PII',
  '8.2': 'Privileged access rights',
  '8.3': 'Information access restriction',
  '8.5': 'Secure authentication',
  '8.11': 'Data masking',
  '8.15': 'Logging',
  '8.16': 'Monitoring activities',
  '8.20': 'Networks security',
  '8.23': 'Web filtering',
  '8.24': 'Use of cryptography',
  '8.30': 'Outsourced development',
}

const THEMES: Record<Iso27002ControlId, Iso27002Theme> = {
  '5.4': 'organizational',
  '5.14': 'organizational',
  '5.15': 'organizational',
  '5.16': 'organizational',
  '5.17': 'organizational',
  '5.18': 'organizational',
  '5.23': 'organizational',
  '5.34': 'organizational',
  '8.2': 'technological',
  '8.3': 'technological',
  '8.5': 'technological',
  '8.11': 'technological',
  '8.15': 'technological',
  '8.16': 'technological',
  '8.20': 'technological',
  '8.23': 'technological',
  '8.24': 'technological',
  '8.30': 'technological',
}

/**
 * Look up the canonical title for a control id. Returns `undefined`
 * for ids not in the cited subset (extend the catalog when this
 * happens).
 */
export const iso27002Title = (id: Iso27002ControlId): string => TITLES[id]

/**
 * Look up the theme (organizational / people / physical / technological)
 * for a control id.
 */
export const iso27002Theme = (id: Iso27002ControlId): Iso27002Theme => THEMES[id]

/**
 * The full catalog as a typed list — useful for rendering control
 * coverage matrices and SOC-2 evidence packs.
 */
export const ISO_27002_CATALOG: ReadonlyArray<{
  id: Iso27002ControlId
  title: string
  theme: Iso27002Theme
}> = (Object.keys(TITLES) as Iso27002ControlId[]).map((id) => ({
  id,
  title: TITLES[id],
  theme: THEMES[id],
}))
