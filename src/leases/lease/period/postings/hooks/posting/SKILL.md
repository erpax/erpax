---
name: posting
description: "Use when reasoning about posting — Lease Period Posting Hook — fires on `LeasePeriodPostings.status → 'posted'` and books the canonical IAS 16 / ASC 842 period entry."
atomPath: "leases/lease/period/postings/hooks/posting"
coordinate: "leases/lease/period/postings/hooks/posting · 4/weave · 52d990df"
contentUuid: "b18318df-bde9-542d-be81-ddb88147ca48"
diamondUuid: "320b691a-77ae-8afd-8b94-70e14345d93b"
uuid: "52d990df-69f4-844c-9e90-6c0e92e13d53"
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
  computationUuid: "9b6b86c3-953b-86a2-b8b4-97e90884a7a1"
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
      stageUuid: "ff92b502-fbc0-8d59-a104-98087692a037"
    - stage: seal
      stageUuid: "149cfdd5-3848-8a79-94e4-b7f76802e6a6"
    - stage: uuid
      stageUuid: "da40401b-d656-884b-8abe-c3b4851cadd4"
version: 2
---
# leases/lease/period/postings/hooks/posting

Lease Period Posting Hook — fires on `LeasePeriodPostings.status → 'posted'` and books the canonical IAS 16 / ASC 842 period entry.

Extracted from `leases/lease/period/postings/hooks/posting.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[leases/lease/period/postings]].
