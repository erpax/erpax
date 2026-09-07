---
name: shares
description: "Use when computing or disclosing IAS 33 basic and diluted EPS — weighting shares, applying dilutive options/convertibles/IFRS 2 grants, splitting continuing vs discontinued operations, or restating a prior period's EPS. The per-period EPS computation node."
atomPath: "fiscal/periods/earnings/per/shares"
coordinate: "fiscal/periods/earnings/per/shares · 2/share · 1e723dc1"
contentUuid: "ae2accf4-c073-5626-a7fe-d1e7ece9ca43"
diamondUuid: "3a5ee960-3c83-8ad1-82d8-de3aee2a30fa"
uuid: "1e723dc1-3f15-808c-bc83-1f948897ce60"
horo: 2
typography:
  partition: fiscal
  bondDegree: 16
standards:
  - "IAS-33 §11-§19 weighted-average-number-of-ordinary-shares"
  - "IFRS IAS-33 §10 basic-eps"
  - "IFRS IAS-33 §10 basic-eps`"
  - "IFRS IAS-33 §30-§63 diluted-eps"
  - "IFRS IAS-33 §30-§63 diluted-eps`"
  - "IFRS IAS-33 §66-§70 disclosure"
  - "IFRS IAS-33 §66-§70 disclosure`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time period-end"
  - "ISO-8601-1:2019 date-time period-end`"
  - "SOX §404 internal-controls"
  - "US-GAAP"
  - "US-GAAP ASC-260 earnings-per-share"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "967afd45-c113-8635-af66-ce9eda238d01"
  stages:
    - stage: path
      stageUuid: "ecae1eb7-5dc8-8b6e-bde7-125d1842b92b"
    - stage: trinity
      stageUuid: "f871347e-ab3d-8878-a2ae-1ba56377f2de"
    - stage: boundary
      stageUuid: "f78c45a2-0338-8ce7-9aee-406ae1c39aab"
    - stage: links
      stageUuid: "6630307d-8824-818d-8117-53e50ad2d28b"
    - stage: horo
      stageUuid: "5e70c4de-de7c-824b-9bfd-36f8b1b1b5ae"
    - stage: seal
      stageUuid: "b705a24d-bfd0-8fd0-988b-22ef5cda118c"
    - stage: uuid
      stageUuid: "7ef390fa-e668-8df9-91aa-0a7f7b375d3e"
version: 2
---
# earnings-per-share

Earnings per Share — IAS 33 basic + diluted EPS calculations.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IAS-33 §10 basic-eps`
- `@standard IFRS IAS-33 §30-§63 diluted-eps`
- `@standard IFRS IAS-33 §66-§70 disclosure`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time period-end`

- IFRS IAS-33 §10 basic-eps
- IAS-33 §11-§19 weighted-average-number-of-ordinary-shares
- IFRS IAS-33 §30-§63 diluted-eps
- IFRS IAS-33 §66-§70 disclosure
- US-GAAP ASC-260 earnings-per-share
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time period-end
- ISO 19011:2018 §6.4.6 audit-evidence-eps-computation
- SOX §404 internal-controls
- ISO 27001 A.5.23 cloud-service-tenant-isolation

Composes: [[fiscal/periods]] · [[accounting]] · [[identity]] · [[proof]] · [[standard]].

**Law — [[law]]: EPS is earnings over the weighted-average ordinary shares for the period — diluted EPS must reflect every dilutive option/convertible/grant and can never exceed basic, and continuing operations are reported separately from discontinued (IAS-33).**

Composes: [[sale/fiscal]].
