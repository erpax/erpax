/**
 * Public surface of the ISO 27002 standards module.
 *
 * @standard ISO-27002:2022 information-security-controls
 * @standard ISO-27001:2022 isms-annex-a-controls
 * @see ./README.md
 */

export type { Iso27002Theme, Iso27002ControlId } from '@/iso/27002/types'
export { iso27002Title, iso27002Theme, ISO_27002_CATALOG } from '@/iso/27002/types'
export { isIso27002ControlId, parseIso27002ControlId } from '@/iso/27002/validate'
export type { ControlCoverageRow } from '@/iso/27002/coverage'
export {
  resolveCoverage,
  coverageByTheme,
  aggregateCoverage,
} from '@/iso/27002/coverage'
