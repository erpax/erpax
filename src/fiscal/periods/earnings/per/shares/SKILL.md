---
name: shares
description: "Use when computing or disclosing IAS 33 basic and diluted EPS — weighting shares, applying dilutive options/convertibles/IFRS 2 grants, splitting continuing vs discontinued operations, or restating a prior period's EPS. The per-period EPS computation node."
atomPath: fiscal/periods/earnings/per/shares
coordinate: fiscal/periods/earnings/per/shares · 5/round · 20d192b6
contentUuid: "ef9fbe23-f110-5098-b6d4-20013fba1769"
diamondUuid: "eb81384c-3c2e-8fff-8923-88658ea86f6c"
uuid: "20d192b6-6b5f-8bf7-85a1-7df3fb5eb14c"
horo: 5
bonds:
  in:
    - law
    - per
  out:
    - law
typography:
  partition: fiscal
  bondDegree: 9
  neighbors: []
standards:
  - "IAS-33 §11-§19 weighted-average-number-of-ordinary-shares"
  - "IFRS IAS-33 §10 basic-eps"
  - "IFRS IAS-33 §30-§63 diluted-eps"
  - "IFRS IAS-33 §66-§70 disclosure"
  - "ISO 19011:2018 §6.4.6 audit-evidence-eps-computation"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time period-end"
  - "SOX §404 internal-controls"
  - "US-GAAP"
  - "US-GAAP ASC-260 earnings-per-share"
bindings: []
neighbors:
  wikilink:
    - accounting
    - identity
    - law
    - periods
    - proof
    - standard
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "d2c896b9-b0c7-8593-afae-ce3dfd33ecbd"
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
      stageUuid: "708d3d2d-58c2-891c-8292-c57a03717f04"
    - stage: seal
      stageUuid: "b705a24d-bfd0-8fd0-988b-22ef5cda118c"
    - stage: uuid
      stageUuid: "ca6be76a-86de-8f87-8395-d04955f47f2b"
version: 2
---
# earnings-per-share

Earnings per Share — IAS 33 basic + diluted EPS calculations.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
