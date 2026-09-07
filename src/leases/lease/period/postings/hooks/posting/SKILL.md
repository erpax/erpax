---
name: posting
description: "Use when reasoning about posting — Lease Period Posting Hook — fires on `LeasePeriodPostings.status → 'posted'` and books the canonical IAS 16 / ASC 842 period entry."
atomPath: "leases/lease/period/postings/hooks/posting"
coordinate: "leases/lease/period/postings/hooks/posting · 4/weave · 9eb4d7f9"
contentUuid: "24caf6b4-dabe-5c7e-b277-1d9827e51869"
diamondUuid: "2b3c1370-a164-8da8-a233-33f65ff711e0"
uuid: "9eb4d7f9-2ce3-85a9-b95f-f083352b9880"
horo: 4
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
  computationUuid: "dbf3bdbd-c7ac-8d4a-9e33-10b1a28a3e79"
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
      stageUuid: "664f0e24-9738-8664-891a-a18aa67914d9"
    - stage: seal
      stageUuid: "149cfdd5-3848-8a79-94e4-b7f76802e6a6"
    - stage: uuid
      stageUuid: "0f2cf679-4fea-8aa5-945c-d5bb7710ca90"
version: 2
---
# leases/lease/period/postings/hooks/posting

Lease Period Posting Hook — fires on `LeasePeriodPostings.status → 'posted'` and books the canonical IAS 16 / ASC 842 period entry.

Extracted from `leases/lease/period/postings/hooks/posting.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[leases/lease/period/postings]].
