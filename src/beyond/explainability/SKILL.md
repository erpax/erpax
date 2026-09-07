---
name: explainability
description: "Use when a business outcome must ship its own natural-language explanation citing standards, sources and chain steps — autoExplain composes the narrative deterministically with no LLM in the path (preserving replay), isExplanationComplete verifies it is non-trivial."
atomPath: "beyond/explainability"
coordinate: "beyond/explainability · 1/base · 67ca8600"
contentUuid: "df665655-6e38-5364-ad12-fbddd8bee592"
diamondUuid: "db196327-6a09-8690-804c-5d560edc1127"
uuid: "67ca8600-c64b-82da-ad24-6020fa49fba5"
horo: 1
typography:
  partition: beyond
  bondDegree: 10
standards:
  - "EU AI Act 2024/1689 Art. 13 (transparency for high-risk)"
  - "EU-AI-Act"
  - "EU-CSDDD-2024/1760"
  - "ISO/IEC 23053 AI-systems-with-machine-learning (explainability)"
  - "ISO/IEC 23053 AI-systems-with-machine-learning (explainability)`"
  - XBRL
  - "XBRL inline-XBRL (machine-explainability of values)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "74d3a903-7999-81d0-94b7-656ce3089c65"
  stages:
    - stage: path
      stageUuid: "2825efc3-1b16-8c3d-8cb9-4086ac4853d9"
    - stage: trinity
      stageUuid: "c2ee9790-3359-8abb-82cc-61a4edf8be8c"
    - stage: boundary
      stageUuid: "d38bf9ea-a606-87c2-be27-173e3b1647ff"
    - stage: links
      stageUuid: "fe344572-ba95-88b8-b6cf-42e9d7583346"
    - stage: horo
      stageUuid: "6107e417-73a5-8e46-a00a-8852ed952f36"
    - stage: seal
      stageUuid: "d3d1625b-8c53-857d-bb72-ba2bd1932fee"
    - stage: uuid
      stageUuid: "4e3afd75-461a-8ce6-858f-d1c355336041"
version: 2
---
# beyond/explainability — self-explainability (auto-generated narrative)

Law 19 of the [[beyond]] horizon: every business outcome (invoice posted, tax computed, credit declined) ships a generated explanation citing the standards, chain steps and data sources. `autoExplain` composes the text deterministically by simple template substitution — no LLM in this path, so deterministic replay holds — and emits per-locale `text` (EN narrative; non-EN locales get `[en]` stub markers the i18n strict mode catches). `isExplanationComplete` verifies the result is non-trivial: it has locale text and at least one cited standard.

Matter-twin: src/beyond/explainability/index.ts (`autoExplain` · `isExplanationComplete`) — `Explanation` typed in src/beyond/types.

**Law — [[law]]: every outcome carries its own explanation, composed deterministically (no LLM, [[standard]] EU AI Act Art. 13 transparency) so it replays byte-identical — the [[trinity]] proof holds the completeness invariant.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 23053 AI-systems-with-machine-learning (explainability)`

Composes: [[standards]] · [[proof]].
