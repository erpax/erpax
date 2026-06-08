---
name: explainability
description: "Use when a business outcome must ship its own natural-language explanation citing standards, sources and chain steps — autoExplain composes the narrative deterministically with no LLM in the path (preserving replay), isExplanationComplete verifies it is non-trivial."
atomPath: beyond/explainability
coordinate: beyond/explainability · 5/round · fcd9a684
contentUuid: "bba3ebf2-600a-50f5-97b3-6db713a233ec"
diamondUuid: "cb3c344d-61dd-84df-bffb-fc226d15debc"
uuid: "fcd9a684-240b-8ca0-a08e-01eb66d29a83"
horo: 5
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
  - XBRL
  - "XBRL inline-XBRL (machine-explainability of values)"
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
  computationUuid: "62722eb8-f06c-877f-be98-bff50c4e7b57"
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
      stageUuid: "fa9320b5-cdb9-8e47-93bf-1c0c537b8e1c"
    - stage: seal
      stageUuid: "9b1ed1e2-5c5c-8dc7-8d93-5fc8b30bc14f"
    - stage: uuid
      stageUuid: "4f6edddb-e8b0-8e25-a3ca-0e0dc99ef4aa"
version: 2
---
# beyond/explainability — self-explainability (auto-generated narrative)

Law 19 of the [[beyond]] horizon: every business outcome (invoice posted, tax computed, credit declined) ships a generated explanation citing the standards, chain steps and data sources. `autoExplain` composes the text deterministically by simple template substitution — no LLM in this path, so deterministic replay holds — and emits per-locale `text` (EN narrative; non-EN locales get `[en]` stub markers the i18n strict mode catches). `isExplanationComplete` verifies the result is non-trivial: it has locale text and at least one cited standard.

Matter-twin: src/beyond/explainability/index.ts (`autoExplain` · `isExplanationComplete`) — `Explanation` typed in src/beyond/types.

**Law — [[law]]: every outcome carries its own explanation, composed deterministically (no LLM, [[standard]] EU AI Act Art. 13 transparency) so it replays byte-identical — the [[trinity]] proof holds the completeness invariant.**
