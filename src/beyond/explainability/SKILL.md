---
name: explainability
description: "Use when a business outcome must ship its own natural-language explanation citing standards, sources and chain steps — autoExplain composes the narrative deterministically with no LLM in the path (preserving replay), isExplanationComplete verifies it is non-trivial."
atomPath: "beyond/explainability"
coordinate: "beyond/explainability · 5/round · 8e308a13"
contentUuid: "45399bb3-875b-53d2-8f53-adf3a5dc55c8"
diamondUuid: "0af8e4b5-6480-8e80-b7df-245f640bb5e0"
uuid: "8e308a13-eb5a-80d3-8690-4a145220e8e2"
horo: 5
typography:
  partition: beyond
  bondDegree: 18
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
  computationUuid: "da610cb4-8d83-8438-86d4-4cb0361c90e0"
  stages:
    - stage: path
      stageUuid: "2825efc3-1b16-8c3d-8cb9-4086ac4853d9"
    - stage: trinity
      stageUuid: "c2ee9790-3359-8abb-82cc-61a4edf8be8c"
    - stage: boundary
      stageUuid: "d38bf9ea-a606-87c2-be27-173e3b1647ff"
    - stage: links
      stageUuid: "1c83392f-482e-8c77-a8c2-318a3bf3c7cf"
    - stage: horo
      stageUuid: "13ee0ea3-1e7a-8071-a4db-77aec918a3a1"
    - stage: seal
      stageUuid: "d3d1625b-8c53-857d-bb72-ba2bd1932fee"
    - stage: uuid
      stageUuid: "efc6fe62-fc74-8084-926c-38ff66cafcef"
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
