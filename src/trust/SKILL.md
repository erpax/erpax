---
name: trust
description: "Use when reasoning about trust — A **trust** (IOLTA) account holds client money the firm may not touch except to bill against fees already earned. Strip the prefix and it is a segregated sub-account on the one acc"
atomPath: trust
coordinate: "trust · 4/weave · d21094de"
contentUuid: "48cb5198-01c8-52d8-8f55-4b8d0b83c971"
diamondUuid: "8cd89157-efb6-8ef3-9d3b-de4a376bcccf"
uuid: "d21094de-5b78-84ed-83a2-a9863e7ed0ae"
horo: 4
typography:
  partition: trust
  bondDegree: 39
standards: []
bindings: []
signatures:
  computationUuid: "c865c219-f23b-85b1-9ef6-3627314d8a38"
  stages:
    - stage: path
      stageUuid: "c3c16335-f7c4-8400-a2db-82e343687f17"
    - stage: trinity
      stageUuid: "0fdf67ab-ff29-890d-b305-a18b0db1dc16"
    - stage: boundary
      stageUuid: "d04d7e35-535d-8e39-a132-373fb795bb41"
    - stage: links
      stageUuid: "8329d8a0-ae09-8900-ab21-ccb28a439486"
    - stage: horo
      stageUuid: "1ad49e70-6a72-8926-b8db-d32f4ea92ecc"
    - stage: seal
      stageUuid: "2c79d32d-3e8f-8798-836a-9ea1807907cf"
    - stage: uuid
      stageUuid: "bb621b12-926c-84e0-9a4d-99cd20250a65"
version: 2
---
# trust — the segregated client account (a balance invariant on the ledger)

A **trust** (IOLTA) account holds client money the firm may not touch except to bill against fees already earned. Strip the prefix and it is a segregated sub-account on the one [[accounting]] ledger, governed by a [[balance]] invariant: client funds are a liability the firm owes, every draw posts a double [[entry]] (trust → operating *only* against an issued invoice), and a per-client trust ledger may never go negative or be commingled — the conservation law ([[balance]]: Σ = 0, nothing escapes) applied to fiduciary money. A draw is a [[transaction]] gated by the [[matter]]'s billed work ([[allocation]]). A violation surfaces immediately as an unbalanced ledger (the gate — [[proof]]). Composes [[accounting]] · [[balance]] · [[entry]] · [[transaction]] · [[matter]] · [[allocation]].

**Law — [[law]]: a trust account is a segregated sub-account on the one double-entry ledger — client funds are a liability, every draw is a double [[entry]] against billed work, and the per-client trust ledger may never go negative or commingle ([[balance]]).**
