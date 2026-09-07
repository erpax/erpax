---
name: posting
description: "Use when reasoning about posting — Lease Period Posting Hook — fires on `LeasePeriodPostings.status → 'posted'` and books the canonical IAS 16 / ASC 842 period entry."
atomPath: "leases/lease/period/postings/hooks/posting"
coordinate: "leases/lease/period/postings/hooks/posting · 5/round · 7bc8023b"
contentUuid: "5856f9e2-8cf8-5ac2-90ed-fbbddb355928"
diamondUuid: "89ff9e28-b1a8-8e4f-904d-72308569fa86"
uuid: "7bc8023b-c468-82f5-863f-6387e65016d9"
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
  computationUuid: "0271e61c-f778-80b9-add9-1b0a45d0ce10"
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
      stageUuid: "b2219ee4-9926-8a3b-9034-24bda58cdb50"
    - stage: seal
      stageUuid: "149cfdd5-3848-8a79-94e4-b7f76802e6a6"
    - stage: uuid
      stageUuid: "0889134a-6a40-85a4-8404-5128325b422f"
version: 2
---
# leases/lease/period/postings/hooks/posting

Lease Period Posting Hook — fires on `LeasePeriodPostings.status → 'posted'` and books the canonical IAS 16 / ASC 842 period entry.

Extracted from `leases/lease/period/postings/hooks/posting.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[leases/lease/period/postings]].
