---
name: explainability
description: "Use when a business outcome must ship its own natural-language explanation citing standards, sources and chain steps — autoExplain composes the narrative deterministically with no LLM in the path (preserving replay), isExplanationComplete verifies it is non-trivial."
atomPath: "beyond/explainability"
coordinate: "beyond/explainability · 5/round · 30e0fc0d"
contentUuid: "d47fadbc-815e-5dea-bffd-d50330e37549"
diamondUuid: "f1458ff6-a254-8a58-b963-a366a1d96ed9"
uuid: "30e0fc0d-0dfc-84be-b7a5-2b67d328d0dc"
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
  computationUuid: "9562c507-143a-88c1-bf7a-cc6f54e28a8a"
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
      stageUuid: "dd299dfe-0aca-82dd-953b-8e7087db5880"
    - stage: seal
      stageUuid: "d3d1625b-8c53-857d-bb72-ba2bd1932fee"
    - stage: uuid
      stageUuid: "435dd6b9-8979-8314-b9ac-5c89b76e4de4"
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
