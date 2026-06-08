---
name: shared
description: "Use when reasoning about shared — One accountable object, two coexisting facets. Every standards rule the codebase declares about money / dates / addresses / common columns lives in one of these shared atoms; highe"
atomPath: shared
coordinate: shared · 2/share · 2962f266
contentUuid: "76929d10-0120-5d2a-ac73-c529ed259340"
diamondUuid: "11d1da4e-85b3-8c08-8339-4f76714c1334"
uuid: "2962f266-1d27-8651-a324-4770a8a9943c"
horo: 2
bonds:
  in:
    - content
  out:
    - content
typography:
  partition: shared
  bondDegree: 3
  neighbors: []
standards:
  - "BCP-47 language-tag"
  - "BCP-47` language-tag locale-formatting"
  - "ECMA-402"
  - "ECMA-402 internationalization-api"
  - "ECMA-402` internationalization-api intl-numberformat / intl-datetimeformat"
  - "EU Regulation (EC) No 1893/2006` NACE Rev.2 (naceCodeField)"
  - "EU-2006/43"
  - "IEEE-754"
  - "IEEE-754-2019` binary-floating-point integer-cents-only (Money)"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-1` presentation-of-financial-statements"
  - "IFRS IAS-1` presentation-of-financial-statements; IFRS-10 §B86 reporting legal entity (legalEntityField)"
  - "ISO 3166-1:2020` country-codes (countryCodeField)"
  - "ISO-19011:2018 audit-trail consistent-rendering"
  - "ISO-19011:2018` audit-trail (auditFields)"
  - "ISO-19011:2018` audit-trail consistent-rendering / consistent-formatting / consistent-timestamps"
  - "ISO-19160-4"
  - "ISO-19160-4:2017 addressing"
  - "ISO-19160-4:2017` addressing components-and-conceptual-model (AddressBlock)"
  - "ISO-27001:2022` A.5.23 cloud-service-tenant-isolation"
  - "ISO-27002"
  - "ISO-27002:2022` §5.15 access-control; §5.4 segregation-of-duties approver-visibility"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO-3166-1:2020` country-codes alpha-2 (AddressBlock)"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015` currency-codes (currencyField, amountField)"
  - "ISO-4217:2015` §5 alphabetic-codes (Money)"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019` date-time (dateField)"
  - "ISO-8601-1:2019` date-time utc-canonical (AuditedTimestamp)"
  - "ISO/IEC-27002:2022"
  - NACE
  - "UPU-S42"
  - "UPU-S42` international-postal-addressing (AddressBlock)"
  - "W3C HTML5 living-standard"
  - "W3C HTML5` address-element / time-element living-standard"
  - "W3C-PROV-O"
  - "WCAG-2.1 level-AA shared-atom-accessibility"
  - "WCAG-2.1` §1.3.1 info-and-relationships; level-AA shared-atom-accessibility"
bindings: []
neighbors:
  wikilink: []
  matrix:
    - content
  backlinks:
    - content
signatures:
  computationUuid: "b9f5bf48-5d10-804d-87dd-31af8d9e717c"
  stages:
    - stage: path
      stageUuid: "960ddeff-b79e-8b8f-9a23-a4a598e26676"
    - stage: trinity
      stageUuid: "78c2f93e-309c-8a53-9f52-999ceae44db0"
    - stage: boundary
      stageUuid: "5f7388b4-1e9d-8d18-ba34-69b9111443a3"
    - stage: links
      stageUuid: "8b40e982-b013-84d3-9835-728a6f77c4b1"
    - stage: horo
      stageUuid: "431aa123-36e8-8d32-98fa-0fe39ba285e2"
    - stage: seal
      stageUuid: "b0fa9681-b498-82cd-ae43-83a7b8b13a98"
    - stage: uuid
      stageUuid: "6efa93f7-cbc2-8350-bdb7-a25bc8203d1e"
version: 2
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
