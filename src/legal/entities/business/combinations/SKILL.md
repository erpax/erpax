---
name: combinations
description: "Use when recording an acquisition — asset deal, share deal, reverse acquisition, or NCI step-up — including IFRS 3 §32 goodwill computation, purchase price allocation (PPA) by asset/liability category, and measurement-period tracking. The IFRS 3 acquirer-side M&A register."
atomPath: legal/entities/business/combinations
coordinate: legal/entities/business/combinations · 8/crest · 7ecb08ab
contentUuid: "c108dff6-3ec0-5ec6-95a5-4432b48c1cb2"
diamondUuid: "a1ff2e63-550e-8a10-ab00-0cf28ad257d2"
uuid: "7ecb08ab-e0a5-8355-972f-bb5360e4ffd5"
horo: 8
bonds:
  in:
    - accounting
    - assets
    - attestations
    - business
    - classifications
    - combination
    - entities
    - entries
    - goodwill
    - identity
    - intangible
    - law
    - measurements
    - proof
  out:
    - accounting
    - assets
    - attestations
    - classifications
    - combination
    - entities
    - entries
    - goodwill
    - identity
    - intangible
    - law
    - measurements
    - proof
typography:
  partition: legal
  bondDegree: 39
  neighbors: []
standards:
  - "IFRS IFRS-10 §B86 consolidation"
  - "IFRS IFRS-3 §10-§13 identifying-the-acquirer"
  - "IFRS IFRS-3 §18-§31 recognition-and-measurement-of-net-assets-acquired"
  - "IFRS IFRS-3 §32 goodwill-or-bargain-purchase-gain"
  - "IFRS IFRS-3 §B41-B49 reverse-acquisitions"
  - "IFRS-3"
  - "ISO 19011:2018 §6.4.6 audit-evidence-business-combination"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time acquisition-date"
  - "SOX §404 internal-controls TOM-MA-01 PPA-process"
  - "US-GAAP"
  - "US-GAAP ASC-805 business-combinations"
bindings: []
neighbors:
  wikilink:
    - accounting
    - assets
    - attestations
    - entities
    - entries
    - identity
    - law
    - measurements
    - proof
  matrix:
    - accounting
    - assets
    - attestations
    - classifications
    - combination
    - entities
    - entries
    - goodwill
    - identity
    - intangible
    - law
    - measurements
    - proof
  backlinks:
    - accounting
    - assets
    - attestations
    - classifications
    - combination
    - entities
    - entries
    - goodwill
    - identity
    - intangible
    - law
    - measurements
    - proof
signatures:
  computationUuid: "17f10164-286d-8d71-ba03-e49d6a88c419"
  stages:
    - stage: path
      stageUuid: "b89a2af1-f66a-86c3-b0f0-36f36b52b4b6"
    - stage: trinity
      stageUuid: "daebe2e2-0e9b-894d-924f-b6e8fcce5247"
    - stage: boundary
      stageUuid: "6b34a8c2-efe3-8088-8003-94e4fb6c202a"
    - stage: links
      stageUuid: "292e16dd-5b28-80da-9fe8-8384515616a7"
    - stage: horo
      stageUuid: "5fa8e052-0fc3-835c-bd04-b7afe3f4046d"
    - stage: seal
      stageUuid: "76548578-454b-8d86-92d9-ebdc54121322"
    - stage: uuid
      stageUuid: "6eb02747-2821-88d3-8610-2a8244d6639c"
version: 2
---
# business-combinations

IFRS 3 acquirer-side M&A register. Single-folder collection node: `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks). One folder per collection ⇒ no scatter ⇒ no drift.

Captures [[accounting]] goodwill computation (§32: consideration transferred + NCI + previously-held interest − fair value of identifiable net assets acquired) paired with [[journal/entries]] and [[legal/entities]]; composes [[evidence/attestations]] for signed PPA walk-through anchors. Fair value hierarchy per [[fair/value/measurements]]; tangible PPE per [[fixed/assets]]; audit trail via [[identity]]/[[proof]].

## Standards
- IFRS IFRS-3 §10-§13 identifying-the-acquirer
- IFRS IFRS-3 §18-§31 recognition-and-measurement-of-net-assets-acquired
- IFRS IFRS-3 §32 goodwill-or-bargain-purchase-gain
- IFRS IFRS-3 §B41-B49 reverse-acquisitions
- IFRS IFRS-10 §B86 consolidation
- US-GAAP ASC-805 business-combinations
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time acquisition-date
- ISO 19011:2018 §6.4.6 audit-evidence-business-combination
- SOX §404 internal-controls TOM-MA-01 PPA-process
- ISO 27001 A.5.23 cloud-service-tenant-isolation

Composes: [[evidence/attestations]].

**Law — [[law]]: goodwill is the residual, not an input — IFRS 3 §32 computes it as consideration + NCI + previously-held interest − fair value of identifiable net assets, so an acquisition's PPA must allocate to every asset/liability first and goodwill is whatever is left ([[accounting]] double-entry).**
