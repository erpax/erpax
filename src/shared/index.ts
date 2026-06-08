/**
 * @erpax/shared — canonical standards-merged atoms (component ⊕ field facets).
 *
 * One accountable object with two coexisting facets:
 *   - **Components** (`./Money`, `./AuditedTimestamp`, `./AddressBlock`): the
 *     render atoms. Higher-level components (analytics cards, modals, widgets,
 *     marketing blocks, PDF templates, customer portal) MUST compose from here
 *     rather than re-implementing currency formatting, date display, address
 *     layout, etc.
 *   - **Fields** (`./field`): the reusable Payload `Field` factories
 *     (currency / amount / status / audit / reference / taxonomy / …) shared
 *     across every domain collection.
 *
 * The cascade for locale / currency / country / accountingStandard is always
 * `resolveRequestConfig(req)` — see `@/utilities/tenant-context`.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-19160-4:2017 addressing
 * @standard ECMA-402 internationalization-api
 * @standard BCP-47 language-tag
 * @standard W3C HTML5 living-standard
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @audit ISO-19011:2018 audit-trail consistent-rendering
 * @compliance WCAG-2.1 level-AA shared-atom-accessibility
 * @see docs/STANDARDS.md §3 §4.2 §4.4
 */

// Component facet — render atoms.
export { default as Money } from './Money'
export { default as AuditedTimestamp } from './AuditedTimestamp'
export { default as AddressBlock } from './AddressBlock'

// Field facet — reusable Payload Field factories.
export * from './field'
