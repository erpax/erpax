---
name: trust
description: "Use when reasoning about trust — A **trust** (IOLTA) account holds client money the firm may not touch except to bill against fees already earned. Strip the prefix and it is a segregated sub-account on the one acc"
atomPath: trust
coordinate: "trust · 8/crest · 90480670"
contentUuid: "d745435e-88a2-5210-a4f1-d1ac96a8a7a4"
diamondUuid: "81aff92d-7524-895c-9e66-33e14a61d215"
uuid: "90480670-4a0d-84ad-93e5-9360ff618b15"
horo: 8
typography:
  partition: trust
  bondDegree: 39
standards: []
bindings: []
signatures:
  computationUuid: "4370afe2-73aa-8a5f-8970-56b06c953819"
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
      stageUuid: "b82faf15-6607-8c67-89b3-addf5a7703bf"
    - stage: seal
      stageUuid: "2c79d32d-3e8f-8798-836a-9ea1807907cf"
    - stage: uuid
      stageUuid: "019021ca-f332-87bd-bc09-3fa727d0bfc8"
version: 2
---
# trust — the segregated client account (a balance invariant on the ledger)

A **trust** (IOLTA) account holds client money the firm may not touch except to bill against fees already earned. Strip the prefix and it is a segregated sub-account on the one [[accounting]] ledger, governed by a [[balance]] invariant: client funds are a liability the firm owes, every draw posts a double [[entry]] (trust → operating *only* against an issued invoice), and a per-client trust ledger may never go negative or be commingled — the conservation law ([[balance]]: Σ = 0, nothing escapes) applied to fiduciary money. A draw is a [[transaction]] gated by the [[matter]]'s billed work ([[allocation]]). A violation surfaces immediately as an unbalanced ledger (the gate — [[proof]]). Composes [[accounting]] · [[balance]] · [[entry]] · [[transaction]] · [[matter]] · [[allocation]].

**Law — [[law]]: a trust account is a segregated sub-account on the one double-entry ledger — client funds are a liability, every draw is a double [[entry]] against billed work, and the per-client trust ledger may never go negative or commingle ([[balance]]).**
