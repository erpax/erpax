---
name: act
description: Use when implementing or referencing EU AI Act 2024.
atomPath: eu/ai/act
coordinate: eu/ai/act · 4/weave · d2920fce
contentUuid: "387e373f-cfd9-5542-8424-4f082caf20b6"
diamondUuid: "96a9f50f-cca7-8ac1-831d-3a15135de28a"
uuid: "d2920fce-f7be-8062-ba7d-6b69969813d8"
horo: 4
bonds:
  in:
    - ai
    - law
  out:
    - law
typography:
  partition: eu
  bondDegree: 3
  neighbors: []
standards:
  - EU AI Act 2024 Regulation (EU) 2024/1689
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-AI-Act"
  - "EU-CSDDD-2024/1760"
  - "GDPR Art.22 automated-individual-decision-making"
  - "ISO/IEC 23894:2023 ai-risk-management"
  - "ISO/IEC 42001:2023 ai-management-system"
  - "ISO/IEC-23894"
  - "ISO/IEC-42001"
  - "NIST AI-RMF-1.0 ai-risk-management-framework"
  - "NIST-AI-RMF"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "a9fd8ca3-de59-8aa0-b61b-ec2c70a92362"
  stages:
    - stage: path
      stageUuid: "2527075a-ba61-851f-9aab-85c9f5c8a6c6"
    - stage: trinity
      stageUuid: "11dc3df7-0754-82c5-ae33-3e0028ca0146"
    - stage: boundary
      stageUuid: "0101ff25-5b2c-8128-9886-92c815aab863"
    - stage: links
      stageUuid: "98191726-790a-8899-a504-a76e9c0d7340"
    - stage: horo
      stageUuid: "e169121e-6c71-86d4-af41-f44494b4c158"
    - stage: seal
      stageUuid: "1bef13ee-de70-8a4e-96e1-480b2a009186"
    - stage: uuid
      stageUuid: "2f5f68ef-adaa-8851-bf4d-427e847334ec"
version: 2
---
# EU AI Act 2024

Regulation (EU) 2024/1689 — risk-class taxonomy, Art.5 prohibited practices, Art.6 + Annex III high-risk classification, Art.50 transparency obligations, Art.53 general-purpose AI.

## Scope

This module exports the 4-class risk taxonomy (`minimal`, `limited`, `high`, `prohibited`), human-readable labels, Payload select options, and the `canAutoAccept(riskClass)` predicate that the AI chokepoint uses to enforce human-in-the-loop for high-risk classifications per Art.14.

## Out of scope

- Per-handler risk classification — each AI use case in `src/services/ai/<handler>.ts` declares its own `aiRiskClass` constant; this module is the registry, not the per-handler decision.
- Conformity assessment under Art.43 — that's a per-deployment compliance procedure, not a code-level concern.
- Member-state-level AI governance overlays (e.g. Spain's AESIA, France's CNIL AI guidance).

**Law — [[law]]: the registry of the four-class AI risk taxonomy (minimal/limited/high/prohibited) and the `canAutoAccept(riskClass)` predicate that forces human-in-the-loop for high-risk — the registry, not the per-handler classification.**

## Citations

- EU AI Act 2024 — Regulation (EU) 2024/1689 (Official Journal L 1689, 12 July 2024)
- ISO/IEC 23894:2023 — AI risk management
- ISO/IEC 42001:2023 — AI management system
- NIST AI RMF 1.0
- GDPR Art.22 (automated individual decision-making — companion regulation)
