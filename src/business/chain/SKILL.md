---
name: chain
description: "Use when you need the canonical business-chain barrel — the 15+ registered (collection, action, emitted-event) workflows that map to published process standards (SOX P2P, IFRS-15 over-time, IFRS-16 lease cycle), each encoded ONCE with its Socratic check, plus the runner, context, and producer auto-wiring."
atomPath: "business/chain"
coordinate: "business/chain · 4/weave · 46b8400c"
contentUuid: "19e09913-7bae-55f5-8af4-ad6200d88750"
diamondUuid: "fa8a8a72-c52b-8925-a5cc-20ccb861490b"
uuid: "46b8400c-043f-8aab-8322-ccf1af3217c4"
horo: 4
bonds:
  in:
    - audit
    - business
    - emitter
    - law
  out:
    - audit
    - business
    - emitter
    - law
typography:
  partition: business
  bondDegree: 12
  neighbors: []
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-3166-1"
bindings: []
neighbors:
  wikilink:
    - audit
    - business
    - law
  matrix:
    - audit
    - business
    - emitter
    - law
  backlinks:
    - audit
    - business
    - emitter
    - law
signatures:
  computationUuid: "3e59be35-7fea-8472-bb50-6a34fc154492"
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
      stageUuid: "bea190d0-cf21-828e-bcf8-3ff07497e3a8"
    - stage: seal
      stageUuid: "968c052a-5594-8275-8783-d3a271721866"
    - stage: uuid
      stageUuid: "97780b15-4d5b-82c8-ba51-023a049dca64"
version: 2
---
# business/chain — canonical business-chain barrel

The single import surface for ERPax business chains: every canonical workflow is a sequence of `(collection, action, emits, requires)` steps encoded ONCE in the registry and traced to a published standard. The Socratic check (canDo · makesSense · wired · isStandard) rides on each entry; `wireChainProducersFor` auto-injects the matching emit hooks so 80+ orphan emits collapse to one source of truth. Pure re-export — the matter lives in the sibling files.

Matter-twin: `src/business/chain/index.ts` (barrel) re-exporting `BUSINESS_CHAINS` · `BUSINESS_CHAIN_IDS` · `chainsForCollection` · `chainsForFeature` · `runChain` · `createChainContext` · `teardownChainContext` · `wireChainProducersFor`; types `BusinessChain` · `ChainStep` · `SocraticCheck` · `ChainRunResult`. A [[business]] workflow over the [[audit]]-evidenced corpus.

**Law — [[law]]: each business chain is encoded ONCE — its steps, standards, and Socratic check live in one registry entry, so a step's `requires` precede it and its producer wiring is the single source of truth for which events fire.**
