---
name: chain
description: "Use when you need the canonical business-chain barrel — the 15+ registered (collection, action, emitted-event) workflows that map to published process standards (SOX P2P, IFRS-15 over-time, IFRS-16 lease cycle), each encoded ONCE with its Socratic check, plus the runner, context, and producer auto-wiring."
atomPath: "business/chain"
coordinate: "business/chain · 4/weave · a639c924"
contentUuid: "d89940d9-a54c-578f-beb7-7bfab35bea6a"
diamondUuid: "81a56dfe-9398-8d72-889c-a52e0e11ae98"
uuid: "a639c924-9729-83ee-babf-638b3847c23d"
horo: 4
typography:
  partition: business
  bondDegree: 18
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-3166-1"
  - "ISO/IEC-19510"
bindings: []
signatures:
  computationUuid: "256ac5d3-8545-8483-bbf4-8fe521b11ce2"
  stages:
    - stage: path
      stageUuid: "c75c6731-fc46-88c6-a72b-192d427d070e"
    - stage: trinity
      stageUuid: "e2cadeee-9c1d-8b6e-b7d9-2b86cf714b16"
    - stage: boundary
      stageUuid: "8398c385-a7df-8e9c-b890-478ad7183154"
    - stage: links
      stageUuid: "a0c4983a-fbf3-8e98-ba4c-9afcefdb1713"
    - stage: horo
      stageUuid: "3b73d239-7a7d-8a91-83ae-f7115b2abdd0"
    - stage: seal
      stageUuid: "968c052a-5594-8275-8783-d3a271721866"
    - stage: uuid
      stageUuid: "9b687920-17c0-8f3c-9ea2-fa2968e79c3c"
version: 2
---
# business/chain — canonical business-chain barrel

The single import surface for ERPax business chains: every canonical workflow is a sequence of `(collection, action, emits, requires)` steps encoded ONCE in the registry and traced to a published standard. The Socratic check (canDo · makesSense · wired · isStandard) rides on each entry; `wireChainProducersFor` auto-injects the matching emit hooks so 80+ orphan emits collapse to one source of truth. Pure re-export — the matter lives in the sibling files.

Matter-twin: `src/business/chain/index.ts` (barrel) re-exporting `BUSINESS_CHAINS` · `BUSINESS_CHAIN_IDS` · `chainsForCollection` · `chainsForFeature` · `runChain` · `createChainContext` · `teardownChainContext` · `wireChainProducersFor`; types `BusinessChain` · `ChainStep` · `SocraticCheck` · `ChainRunResult`. A [[business]] workflow over the [[audit]]-evidenced corpus.

**Law — [[law]]: each business chain is encoded ONCE — its steps, standards, and Socratic check live in one registry entry, so a step's `requires` precede it and its producer wiring is the single source of truth for which events fire.**
