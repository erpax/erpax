---
name: shares
description: "Use when computing or disclosing IAS 33 basic and diluted EPS — weighting shares, applying dilutive options/convertibles/IFRS 2 grants, splitting continuing vs discontinued operations, or restating a prior period's EPS. The per-period EPS computation node."
atomPath: "fiscal/periods/earnings/per/shares"
coordinate: "fiscal/periods/earnings/per/shares · 8/crest · 4972d2a3"
contentUuid: "1ccfe1b1-b1e1-5010-aa47-cbeaab210a29"
diamondUuid: "15ce67b4-e69e-8145-a3fb-166a2995c63e"
uuid: "4972d2a3-c0ce-8433-ba5c-cb63c26c26fc"
horo: 8
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
  computationUuid: "8ef3a62e-bfea-87f8-8be6-549ac9eed1a9"
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
      stageUuid: "86991470-44b5-8f48-8757-5f145e85f563"
    - stage: seal
      stageUuid: "b705a24d-bfd0-8fd0-988b-22ef5cda118c"
    - stage: uuid
      stageUuid: "096c9979-96f7-8dc6-910f-96135f4d1f9f"
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
