---
name: explainability
description: "Use when a business outcome must ship its own natural-language explanation citing standards, sources and chain steps — autoExplain composes the narrative deterministically with no LLM in the path (preserving replay), isExplanationComplete verifies it is non-trivial."
atomPath: "beyond/explainability"
coordinate: "beyond/explainability · 2/share · 47717927"
contentUuid: "aec0d0c2-faf2-5c77-a61d-7d5dae8dc2c6"
diamondUuid: "8cf227bb-cf57-86f3-9bfb-a9724d5190bd"
uuid: "47717927-81d5-834e-b592-0b50da9651d5"
horo: 2
bonds:
  in:
    - beyond
    - law
    - standard
    - trinity
  out:
    - beyond
    - law
    - standard
    - trinity
typography:
  partition: beyond
  bondDegree: 12
  neighbors: []
standards:
  - "EU AI Act 2024/1689 Art. 13 (transparency for high-risk)"
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-AI-Act"
  - "EU-CSDDD-2024/1760"
  - "ISO/IEC 23053 AI-systems-with-machine-learning (explainability)"
  - "ISO/IEC 23053 AI-systems-with-machine-learning (explainability)`"
  - XBRL
  - "XBRL inline-XBRL (machine-explainability of values)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - beyond
    - law
    - standard
    - trinity
  matrix:
    - beyond
    - law
    - standard
    - trinity
  backlinks:
    - beyond
    - law
    - standard
    - trinity
signatures:
  computationUuid: "5ad9735f-b798-859d-9ac8-564046a9a4ce"
  stages:
    - stage: path
      stageUuid: "2825efc3-1b16-8c3d-8cb9-4086ac4853d9"
    - stage: trinity
      stageUuid: "c2ee9790-3359-8abb-82cc-61a4edf8be8c"
    - stage: boundary
      stageUuid: "d38bf9ea-a606-87c2-be27-173e3b1647ff"
    - stage: links
      stageUuid: "e1b0f3e2-bb66-8e43-9648-1fe58e0de4d6"
    - stage: horo
      stageUuid: "d493d832-e188-88f7-adf2-784ab1c78d0b"
    - stage: seal
      stageUuid: "9b1ed1e2-5c5c-8dc7-8d93-5fc8b30bc14f"
    - stage: uuid
      stageUuid: "46401c1c-eccd-8bd0-8152-1880913620bb"
version: 2
---
# beyond/explainability — self-explainability (auto-generated narrative)

Law 19 of the [[beyond]] horizon: every business outcome (invoice posted, tax computed, credit declined) ships a generated explanation citing the standards, chain steps and data sources. `autoExplain` composes the text deterministically by simple template substitution — no LLM in this path, so deterministic replay holds — and emits per-locale `text` (EN narrative; non-EN locales get `[en]` stub markers the i18n strict mode catches). `isExplanationComplete` verifies the result is non-trivial: it has locale text and at least one cited standard.

Matter-twin: src/beyond/explainability/index.ts (`autoExplain` · `isExplanationComplete`) — `Explanation` typed in src/beyond/types.

**Law — [[law]]: every outcome carries its own explanation, composed deterministically (no LLM, [[standard]] EU AI Act Art. 13 transparency) so it replays byte-identical — the [[trinity]] proof holds the completeness invariant.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 23053 AI-systems-with-machine-learning (explainability)`
