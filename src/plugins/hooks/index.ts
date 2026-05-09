/**
 * @deprecated DO NOT IMPORT FROM HERE. The "hooks plugin" anti-pattern was
 * retired in Slice YY — generic hooks live in `@/hooks/*` (one file each),
 * domain hooks under their owning collection or domain plugin
 * (`@/collections/<Name>/hooks/`, `@/plugins/<domain>/hooks/`).
 *
 * Migration map:
 *   `@/plugins/hooks` → `@/hooks/autoPopulateHost`
 *                      `@/hooks/autoPopulateCreatedBy`
 *                      `@/hooks/autoSetTimestamp`
 *                      `@/hooks/auditTrailAfterChange`
 *                      `@/hooks/enforceSegregationOfDuties`
 *   `@/plugins/hooks/address-validation.hook` → `@/hooks/validateAddress`
 *
 * Safe to `rm -rf src/plugins/hooks` once the user-side machine confirms
 * no remaining imports (zero in this branch as of Slice YY).
 *
 * @audit ISO-19011:2018 audit-trail relocation-record
 * @see docs/STANDARDS.md §3
 */

export {}
