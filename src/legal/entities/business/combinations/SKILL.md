---
name: combinations
description: "Use when recording an acquisition — asset deal, share deal, reverse acquisition, or NCI step-up — including IFRS 3 §32 goodwill computation, purchase price allocation (PPA) by asset/liability category, and measurement-period tracking. The IFRS 3 acquirer-side M&A register."
atomPath: "legal/entities/business/combinations"
coordinate: "legal/entities/business/combinations · 8/crest · ccbabe7e"
contentUuid: "416d5a17-452f-5b42-ae47-5b3d1b669799"
diamondUuid: "16dffc92-3ba5-8510-b415-c0dc59621412"
uuid: "ccbabe7e-359d-8975-829a-555976736b87"
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
  - "IFRS IFRS-10 §B86 consolidation`"
  - "IFRS IFRS-3 §10-§13 identifying-the-acquirer"
  - "IFRS IFRS-3 §10-§13 identifying-the-acquirer`"
  - "IFRS IFRS-3 §18-§31 recognition-and-measurement-of-net-assets-acquired"
  - "IFRS IFRS-3 §18-§31 recognition-and-measurement-of-net-assets-acquired`"
  - "IFRS IFRS-3 §32 goodwill-or-bargain-purchase-gain"
  - "IFRS IFRS-3 §32 goodwill-or-bargain-purchase-gain`"
  - "IFRS IFRS-3 §B41-B49 reverse-acquisitions"
  - "IFRS IFRS-3 §B41-B49 reverse-acquisitions`"
  - "IFRS-3"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time acquisition-date"
  - "ISO-8601-1:2019 date-time acquisition-date`"
  - "SOX §404 internal-controls TOM-MA-01 PPA-process"
  - "US-GAAP"
  - "US-GAAP ASC-805 business-combinations"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "1b96dfa3-11f5-8992-ac33-522eef46cb3e"
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
      stageUuid: "7757751f-acba-8726-834d-d361a97eb4fa"
    - stage: seal
      stageUuid: "76548578-454b-8d86-92d9-ebdc54121322"
    - stage: uuid
      stageUuid: "6af14b9b-5ba8-8586-9735-6973d0177816"
version: 2
---
# business-combinations

IFRS 3 acquirer-side M&A register. Single-folder collection node: `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks). One folder per collection ⇒ no scatter ⇒ no drift.

Captures [[accounting]] goodwill computation (§32: consideration transferred + NCI + previously-held interest − fair value of identifiable net assets acquired) paired with [[journal/entries]] and [[legal/entities]]; composes [[evidence/attestations]] for signed PPA walk-through anchors. Fair value hierarchy per [[fair/value/measurements]]; tangible PPE per [[fixed/assets]]; audit trail via [[identity]]/[[proof]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-3 §10-§13 identifying-the-acquirer`
- `@standard IFRS IFRS-3 §18-§31 recognition-and-measurement-of-net-assets-acquired`
- `@standard IFRS IFRS-3 §32 goodwill-or-bargain-purchase-gain`
- `@standard IFRS IFRS-3 §B41-B49 reverse-acquisitions`
- `@standard IFRS IFRS-10 §B86 consolidation`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time acquisition-date`

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
