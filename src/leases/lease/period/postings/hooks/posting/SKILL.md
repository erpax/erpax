---
name: posting
description: "Use when reasoning about posting — Lease Period Posting Hook — fires on `LeasePeriodPostings.status → 'posted'` and books the canonical IAS 16 / ASC 842 period entry."
atomPath: "leases/lease/period/postings/hooks/posting"
coordinate: "leases/lease/period/postings/hooks/posting · 5/round · a8d8cc5b"
contentUuid: "7b640610-d48d-5a91-83a7-f6fb5c734ad5"
diamondUuid: "7084e989-6fc8-8d5d-8ee5-bb6fdf9456ed"
uuid: "a8d8cc5b-bdc6-8714-8e14-9fc1776c7001"
horo: 5
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
  computationUuid: "623f7b16-8e8e-801a-a4be-afd6bc63ba4c"
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
      stageUuid: "1fa028f0-9e98-8a5e-b356-1dc3f37796b8"
    - stage: seal
      stageUuid: "149cfdd5-3848-8a79-94e4-b7f76802e6a6"
    - stage: uuid
      stageUuid: "a1ef2d7e-5feb-8294-8963-2110a9d77748"
version: 2
---
# leases/lease/period/postings/hooks/posting

Lease Period Posting Hook — fires on `LeasePeriodPostings.status → 'posted'` and books the canonical IAS 16 / ASC 842 period entry.

Extracted from `leases/lease/period/postings/hooks/posting.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[leases/lease/period/postings]].
