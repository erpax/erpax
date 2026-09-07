---
name: posting
description: "Use when reasoning about posting — Lease Period Posting Hook — fires on `LeasePeriodPostings.status → 'posted'` and books the canonical IAS 16 / ASC 842 period entry."
atomPath: "leases/lease/period/postings/hooks/posting"
coordinate: "leases/lease/period/postings/hooks/posting · 1/base · c44a4c6a"
contentUuid: "002176a3-f7f2-596e-a2d2-535683f0fbd9"
diamondUuid: "ea58997d-ad13-82cc-ab3f-29ec1bcd47f3"
uuid: "c44a4c6a-1c29-83a3-8644-dbeedc06a309"
horo: 1
typography:
  partition: leases
  bondDegree: 44
standards:
  - "IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement"
  - "IFRS IFRS-16 §36-§38 lease-liability-amortised-cost"
  - "ISO-8601-1:2019 date-time period-end posted-at"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-842-20-35 lessee-subsequent-measurement"
bindings: []
signatures:
  computationUuid: "9aee8205-1239-89f7-93ee-4f9010dacf19"
  stages:
    - stage: path
      stageUuid: "d80242ea-d08b-83fe-857f-871c3e68d8ed"
    - stage: trinity
      stageUuid: "19813435-b236-8545-bdb3-6d3812f552ea"
    - stage: boundary
      stageUuid: "92654740-5c29-894e-aee0-7e32018df341"
    - stage: links
      stageUuid: "d4ae867e-afff-82ab-bc39-b8c2049cb363"
    - stage: horo
      stageUuid: "8f241454-31e6-80a4-8960-167a4c7ff817"
    - stage: seal
      stageUuid: "149cfdd5-3848-8a79-94e4-b7f76802e6a6"
    - stage: uuid
      stageUuid: "03023a51-d50f-88c9-ba49-b0421a859eb2"
version: 2
---
# leases/lease/period/postings/hooks/posting

Lease Period Posting Hook — fires on `LeasePeriodPostings.status → 'posted'` and books the canonical IAS 16 / ASC 842 period entry.

Extracted from `leases/lease/period/postings/hooks/posting.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[leases/lease/period/postings]].
