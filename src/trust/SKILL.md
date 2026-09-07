---
name: trust
description: "Use when reasoning about trust — A **trust** (IOLTA) account holds client money the firm may not touch except to bill against fees already earned. Strip the prefix and it is a segregated sub-account on the one acc"
atomPath: trust
coordinate: "trust · 1/base · 589228b7"
contentUuid: "195de5b0-b2c2-551c-930f-db5c1c6117fd"
diamondUuid: "b488af55-2e6f-8fd6-b3f3-23f180dd71fb"
uuid: "589228b7-2c5b-8d39-a55c-4f46d926b479"
horo: 1
typography:
  partition: trust
  bondDegree: 39
standards: []
bindings: []
signatures:
  computationUuid: "6562081d-bf18-8ee8-a686-1dddb3f4463d"
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
      stageUuid: "e0868e9f-b532-87de-827d-98d5239689d4"
    - stage: seal
      stageUuid: "2c79d32d-3e8f-8798-836a-9ea1807907cf"
    - stage: uuid
      stageUuid: "60fb34d5-1aa2-808c-98d7-5687145fc5f4"
version: 2
---
# trust — the segregated client account (a balance invariant on the ledger)

A **trust** (IOLTA) account holds client money the firm may not touch except to bill against fees already earned. Strip the prefix and it is a segregated sub-account on the one [[accounting]] ledger, governed by a [[balance]] invariant: client funds are a liability the firm owes, every draw posts a double [[entry]] (trust → operating *only* against an issued invoice), and a per-client trust ledger may never go negative or be commingled — the conservation law ([[balance]]: Σ = 0, nothing escapes) applied to fiduciary money. A draw is a [[transaction]] gated by the [[matter]]'s billed work ([[allocation]]). A violation surfaces immediately as an unbalanced ledger (the gate — [[proof]]). Composes [[accounting]] · [[balance]] · [[entry]] · [[transaction]] · [[matter]] · [[allocation]].

**Law — [[law]]: a trust account is a segregated sub-account on the one double-entry ledger — client funds are a liability, every draw is a double [[entry]] against billed work, and the per-client trust ledger may never go negative or commingle ([[balance]]).**
