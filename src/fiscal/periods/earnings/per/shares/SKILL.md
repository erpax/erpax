---
name: shares
description: "Use when computing or disclosing IAS 33 basic and diluted EPS — weighting shares, applying dilutive options/convertibles/IFRS 2 grants, splitting continuing vs discontinued operations, or restating a prior period's EPS. The per-period EPS computation node."
atomPath: "fiscal/periods/earnings/per/shares"
coordinate: "fiscal/periods/earnings/per/shares · 7/descent · 74001800"
contentUuid: "2e021675-8433-559b-a1ff-69be2119ce23"
diamondUuid: "84ac9467-f54e-8d95-929f-132cadcfbf7e"
uuid: "74001800-10fa-86fa-af8d-01b913a48dda"
horo: 7
typography:
  partition: fiscal
  bondDegree: 9
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
  computationUuid: "e0230a55-5c28-8fc9-9561-645cf5731403"
  stages:
    - stage: path
      stageUuid: "ecae1eb7-5dc8-8b6e-bde7-125d1842b92b"
    - stage: trinity
      stageUuid: "f871347e-ab3d-8878-a2ae-1ba56377f2de"
    - stage: boundary
      stageUuid: "f78c45a2-0338-8ce7-9aee-406ae1c39aab"
    - stage: links
      stageUuid: "0bb5d892-1f84-8986-b0e5-ef413ddc4eee"
    - stage: horo
      stageUuid: "4688be61-ed41-85c2-8aa1-fc6abe670cac"
    - stage: seal
      stageUuid: "b705a24d-bfd0-8fd0-988b-22ef5cda118c"
    - stage: uuid
      stageUuid: "23a4af9a-4eaa-873d-acd5-67256c347702"
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
