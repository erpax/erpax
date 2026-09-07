---
name: trust
description: "Use when reasoning about trust — A **trust** (IOLTA) account holds client money the firm may not touch except to bill against fees already earned. Strip the prefix and it is a segregated sub-account on the one acc"
atomPath: trust
coordinate: "trust · 1/base · 9ca84e5f"
contentUuid: "cf4fd1d1-ab2a-5c44-9a62-cc2c5159a4b6"
diamondUuid: "3bbb484c-20e6-8da1-9c70-0dda87bc193a"
uuid: "9ca84e5f-9c0e-8b1b-8429-762b2eac7d98"
horo: 1
typography:
  partition: trust
  bondDegree: 39
standards: []
bindings: []
signatures:
  computationUuid: "4aa6f879-1553-8d46-b1ee-eac508c41c61"
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
      stageUuid: "6008ab0e-10e9-8ccd-b0fe-ea4d8438d00b"
    - stage: seal
      stageUuid: "2c79d32d-3e8f-8798-836a-9ea1807907cf"
    - stage: uuid
      stageUuid: "88ac83ba-3247-843b-80eb-5b7f69b23d6d"
version: 2
---
# trust — the segregated client account (a balance invariant on the ledger)

A **trust** (IOLTA) account holds client money the firm may not touch except to bill against fees already earned. Strip the prefix and it is a segregated sub-account on the one [[accounting]] ledger, governed by a [[balance]] invariant: client funds are a liability the firm owes, every draw posts a double [[entry]] (trust → operating *only* against an issued invoice), and a per-client trust ledger may never go negative or be commingled — the conservation law ([[balance]]: Σ = 0, nothing escapes) applied to fiduciary money. A draw is a [[transaction]] gated by the [[matter]]'s billed work ([[allocation]]). A violation surfaces immediately as an unbalanced ledger (the gate — [[proof]]). Composes [[accounting]] · [[balance]] · [[entry]] · [[transaction]] · [[matter]] · [[allocation]].

**Law — [[law]]: a trust account is a segregated sub-account on the one double-entry ledger — client funds are a liability, every draw is a double [[entry]] against billed work, and the per-client trust ledger may never go negative or commingle ([[balance]]).**
