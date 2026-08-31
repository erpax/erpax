---
name: explainability
description: "Use when a business outcome must ship its own natural-language explanation citing standards, sources and chain steps — autoExplain composes the narrative deterministically with no LLM in the path (preserving replay), isExplanationComplete verifies it is non-trivial."
atomPath: "beyond/explainability"
coordinate: "beyond/explainability · 7/descent · 60dea6a3"
contentUuid: "228c64ed-d8e9-5a48-aa51-8247124524a5"
diamondUuid: "9dee54b0-acde-86d3-a3d8-27da55b8303c"
uuid: "60dea6a3-3c3e-84ff-9bd4-68e69c7ebdca"
horo: 7
typography:
  partition: beyond
  bondDegree: 4
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
  computationUuid: "66f9045e-4e17-842a-ae39-c756051bed7b"
  stages:
    - stage: path
      stageUuid: "2825efc3-1b16-8c3d-8cb9-4086ac4853d9"
    - stage: trinity
      stageUuid: "c2ee9790-3359-8abb-82cc-61a4edf8be8c"
    - stage: boundary
      stageUuid: "d38bf9ea-a606-87c2-be27-173e3b1647ff"
    - stage: links
      stageUuid: "997c19c3-6a2b-865c-b85a-8975f5b83e2e"
    - stage: horo
      stageUuid: "8d401e29-3600-82dc-9b36-ad4bd9a56827"
    - stage: seal
      stageUuid: "9b1ed1e2-5c5c-8dc7-8d93-5fc8b30bc14f"
    - stage: uuid
      stageUuid: "81597918-8bf1-83bc-9c1e-182492e64022"
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
