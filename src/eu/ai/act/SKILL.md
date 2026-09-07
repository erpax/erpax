---
name: act
description: Use when implementing or referencing EU AI Act 2024.
atomPath: "eu/ai/act"
coordinate: "eu/ai/act · 2/share · bd696216"
contentUuid: "93dea330-7a6d-5f1d-89b7-56db1b17f5e2"
diamondUuid: "42a405fa-e250-84de-80b0-b1204a099700"
uuid: "bd696216-8dad-8dec-9e45-addfdab4d74e"
horo: 2
typography:
  partition: eu
  bondDegree: 12
standards:
  - "EU AI Act 2024 Regulation (EU) 2024/1689"
  - "EU-AI-Act"
  - "EU-CSDDD-2024/1760"
  - "GDPR Art.22 automated-individual-decision-making"
  - "ISO/IEC 23894:2023 ai-risk-management"
  - "ISO/IEC 23894:2023 ai-risk-management`"
  - "ISO/IEC 42001:2023 ai-management-system"
  - "ISO/IEC 42001:2023 ai-management-system`"
  - "ISO/IEC-23894"
  - "ISO/IEC-42001"
  - "NIST AI-RMF-1.0 ai-risk-management-framework"
  - "NIST AI-RMF-1.0 ai-risk-management-framework`"
  - "NIST-AI-RMF"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "843f0a3c-2702-885a-acb0-3666179adea6"
  stages:
    - stage: path
      stageUuid: "2527075a-ba61-851f-9aab-85c9f5c8a6c6"
    - stage: trinity
      stageUuid: "11dc3df7-0754-82c5-ae33-3e0028ca0146"
    - stage: boundary
      stageUuid: "0101ff25-5b2c-8128-9886-92c815aab863"
    - stage: links
      stageUuid: "4c3434fe-9c0c-8eaf-a598-4b2fd3ad6f97"
    - stage: horo
      stageUuid: "c50e2f76-1068-8ba1-9463-d56b862371ab"
    - stage: seal
      stageUuid: "1bef13ee-de70-8a4e-96e1-480b2a009186"
    - stage: uuid
      stageUuid: "71e687e2-eb9e-881b-9a3c-c7262b6d68b2"
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

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 23894:2023 ai-risk-management`
- `@standard ISO/IEC 42001:2023 ai-management-system`
- `@standard NIST AI-RMF-1.0 ai-risk-management-framework`

Composes: [[eu]] · [[standards]] · [[ai]].
