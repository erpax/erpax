---
name: trust
description: "Use when reasoning about trust — A **trust** (IOLTA) account holds client money the firm may not touch except to bill against fees already earned. Strip the prefix and it is a segregated sub-account on the one acc"
atomPath: trust
coordinate: trust · 5/round · af593474
contentUuid: "0be5652c-5e69-5de1-bdca-7bff9d406811"
diamondUuid: "f11c3c32-8384-8fe9-8867-72464a526254"
uuid: "af593474-cbcd-8788-be5e-759aa3428a5a"
horo: 5
bonds:
  in:
    - access
    - accounting
    - allocation
    - balance
    - entry
    - law
    - matter
    - mcp
    - proof
    - security
    - society
    - transaction
  out:
    - access
    - accounting
    - allocation
    - balance
    - entry
    - law
    - matter
    - mcp
    - proof
    - security
    - society
    - transaction
typography:
  partition: trust
  bondDegree: 37
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - allocation
    - balance
    - entry
    - law
    - matter
    - proof
    - transaction
  matrix:
    - access
    - accounting
    - allocation
    - balance
    - entry
    - law
    - matter
    - mcp
    - proof
    - security
    - society
    - transaction
  backlinks:
    - access
    - accounting
    - allocation
    - balance
    - entry
    - law
    - matter
    - mcp
    - proof
    - security
    - society
    - transaction
signatures:
  computationUuid: "f75a7352-bce0-8f34-905c-72b4824355b3"
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
      stageUuid: "0ef6d3af-20d4-84b5-b3ad-7bc47180f744"
    - stage: seal
      stageUuid: "d1b94524-d0f1-8cd8-87ea-3edf957908f6"
    - stage: uuid
      stageUuid: "6da3f78e-842e-8279-80ea-aba18f68b09a"
version: 2
---
# trust — the segregated client account (a balance invariant on the ledger)

A **trust** (IOLTA) account holds client money the firm may not touch except to bill against fees already earned. Strip the prefix and it is a segregated sub-account on the one [[accounting]] ledger, governed by a [[balance]] invariant: client funds are a liability the firm owes, every draw posts a double [[entry]] (trust → operating *only* against an issued invoice), and a per-client trust ledger may never go negative or be commingled — the conservation law ([[balance]]: Σ = 0, nothing escapes) applied to fiduciary money. A draw is a [[transaction]] gated by the [[matter]]'s billed work ([[allocation]]). A violation surfaces immediately as an unbalanced ledger (the gate — [[proof]]). Composes [[accounting]] · [[balance]] · [[entry]] · [[transaction]] · [[matter]] · [[allocation]].

**Law — [[law]]: a trust account is a segregated sub-account on the one double-entry ledger — client funds are a liability, every draw is a double [[entry]] against billed work, and the per-client trust ledger may never go negative or commingle ([[balance]]).**
