---
name: shared
description: Canonical standards-merged atoms — render components (Money, AuditedTimestamp, AddressBlock) and reusable Payload Field factories shared across every domain
---

# shared

One accountable object, two coexisting facets. Every standards rule the codebase
declares about money / dates / addresses / common columns lives in one of these
shared atoms; higher-level units MUST compose from here rather than
re-implementing currency formatting, date display, address layout, or the common
field shapes.

## Facets

| Facet | File | Exports |
| --- | --- | --- |
| Component (render atoms) | `Money.tsx` | `Money` (default) |
| Component (render atoms) | `AuditedTimestamp.tsx` | `AuditedTimestamp` (default) |
| Component (render atoms) | `AddressBlock.tsx` | `AddressBlock` (default) |
| Field (Payload `Field` factories) | `field.ts` | `currencyField`, `amountField`, `dateField`, `codeField`, `descriptionField`, `glAccountField`, `statusField`, `timestampFields`, `auditFields`, `notesField`, `accountTypeField`, `debitCreditField`, `invoiceStatusField`, `paymentStatusField`, `statementStatusField`, `taxonomySelect`, `referenceField`, `legalEntityField`, `countryCodeField`, `naceCodeField`, plus re-exported `SUPPORTED_CURRENCIES` / `currencyOptions` / `DEFAULT_CURRENCY` |

`index.ts` re-exports both facets so `@/shared` resolves every name.

The cascade for locale / currency / country / accountingStandard is always
`resolveRequestConfig(req)` — see `@/utilities/tenant-context`. Canonical
regional defaults & `SUPPORTED_CURRENCIES` live in `@/config/regional-defaults`
(re-exported from the field facet so collection-side imports keep working while
the canonical module remains the single source of truth).

## Component facet banners

- `@standard ISO-4217:2015` §5 alphabetic-codes (Money)
- `@standard ISO-8601-1:2019` date-time utc-canonical (AuditedTimestamp)
- `@standard ISO-3166-1:2020` country-codes alpha-2 (AddressBlock)
- `@standard ISO-19160-4:2017` addressing components-and-conceptual-model (AddressBlock)
- `@standard UPU-S42` international-postal-addressing (AddressBlock)
- `@standard ECMA-402` internationalization-api intl-numberformat / intl-datetimeformat
- `@standard IEEE-754-2019` binary-floating-point integer-cents-only (Money)
- `@standard BCP-47` language-tag locale-formatting
- `@standard W3C HTML5` address-element / time-element living-standard
- `@accounting IFRS IAS-1` presentation-of-financial-statements
- `@audit ISO-19011:2018` audit-trail consistent-rendering / consistent-formatting / consistent-timestamps
- `@compliance WCAG-2.1` §1.3.1 info-and-relationships; level-AA shared-atom-accessibility

## Field facet banners

- `@standard ISO-4217:2015` currency-codes (currencyField, amountField)
- `@standard ISO-8601-1:2019` date-time (dateField)
- `@standard ISO-27001:2022` A.5.23 cloud-service-tenant-isolation
- `@standard ISO-27002:2022` §5.15 access-control; §5.4 segregation-of-duties approver-visibility
- `@standard ISO 3166-1:2020` country-codes (countryCodeField)
- `@standard EU Regulation (EC) No 1893/2006` NACE Rev.2 (naceCodeField)
- `@accounting IFRS IAS-1` presentation-of-financial-statements; IFRS-10 §B86 reporting legal entity (legalEntityField)
- `@audit ISO-19011:2018` audit-trail (auditFields)

## See also

- `docs/STANDARDS.md` §3 §4.2 §4.4
- `@/config/regional-defaults`
- `@/config/address-formats`
- `@/address/validation`
- `@/utilities/tenant-context`
