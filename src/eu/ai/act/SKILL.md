---
name: act
description: Use when implementing or referencing EU AI Act 2024.
atomPath: "eu/ai/act"
coordinate: "eu/ai/act · 1/base · 44f1d030"
contentUuid: "3a8b234d-7f1a-51ba-9c49-133d192c8ba2"
diamondUuid: "0b956067-e329-8d22-bdc6-e05d0ffdfc8a"
uuid: "44f1d030-6381-83e1-b32d-49385a8caa84"
horo: 1
typography:
  partition: eu
  bondDegree: 1
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
  computationUuid: "094a5800-b87b-8da2-a4b4-53248a01d762"
  stages:
    - stage: path
      stageUuid: "2527075a-ba61-851f-9aab-85c9f5c8a6c6"
    - stage: trinity
      stageUuid: "11dc3df7-0754-82c5-ae33-3e0028ca0146"
    - stage: boundary
      stageUuid: "0101ff25-5b2c-8128-9886-92c815aab863"
    - stage: links
      stageUuid: "eabcfa6e-ab8c-8b34-8da5-2ba696bcf15e"
    - stage: horo
      stageUuid: "e7a86164-efcc-85f0-931f-dd4d6768df83"
    - stage: seal
      stageUuid: "1bef13ee-de70-8a4e-96e1-480b2a009186"
    - stage: uuid
      stageUuid: "13600def-177f-80a8-974b-ca662f766daf"
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
