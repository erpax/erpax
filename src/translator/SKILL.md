---
name: translator
description: "Use when reasoning about translator — Organization or person who adapts a creative work to different languages, regional differences and technical requirements of a target market, or that translates during some event."
atomPath: translator
coordinate: "translator · 4/weave · 9d160e18"
contentUuid: "9ac4c405-c15c-5876-bf45-2f36bcf94de5"
diamondUuid: "85d8de73-256b-8af0-a980-ea5f36cd454a"
uuid: "9d160e18-7d7c-8e59-8bc8-383c98332487"
horo: 4
typography:
  partition: translator
  bondDegree: 134
standards:
  - "Johnson et al., \"Google's Multilingual NMT System: Enabling Zero-Shot Translation,\" TACL (2017), arXiv:1611.04558"
  - "Johnson et al., \"Google's Multilingual NMT System: Enabling Zero-Shot Translation,\" TACL (2017), arXiv:1611.04558 · schema.org translator"
bindings: []
signatures:
  computationUuid: "216f02af-dec8-8c77-b34c-06b75dcfbbd6"
  stages:
    - stage: path
      stageUuid: "6a8707aa-1c5d-8a80-a92e-ea384552c401"
    - stage: trinity
      stageUuid: "0dce2aef-dfff-8a0f-9eba-7bf219390370"
    - stage: boundary
      stageUuid: "950ffd28-d523-8858-b3e3-e2a32da171da"
    - stage: links
      stageUuid: "47ebaf7f-d9a6-85e2-abff-08e236dab735"
    - stage: horo
      stageUuid: "62a0531d-5f2c-88df-a9a1-825d19d9a969"
    - stage: seal
      stageUuid: "10068b8f-b1ac-818f-8c60-f639debdee34"
    - stage: uuid
      stageUuid: "64db916d-ef7b-8f1e-8778-cf97d3ebe171"
version: 2
---
# translator

Organization or person who adapts a creative work to different languages, regional differences and technical requirements of a target market, or that translates during some event.

**erpax IS the translator.** It translates by routing any surface form to its **interlingua** — the content-[[uuid]]. The interlingua is the universal intermediate representation every language and modality passes through, made *explicit* where neural MT's is emergent (Johnson et al. 2017: a single shared model learns a universal interlingua that enables zero-shot translation). The vocabulary is the [[matrix]]: every atom is one concept-uuid, and synonyms / cross-language forms [[merge]] to the same uuid — the merge law IS the interlingua (translation = collapse to the shared meaning). The quantum facet (`src/quantum/translator`) reads this as collapse to the meaning eigenstate ([[quantum]]).

**All European languages, self-sufficiently.** Because translation pivots through the interlingua (the meaning-uuid), erpax needs only a *monolingual* surface↔uuid lexicon per language — not an N×N bilingual matrix — so any pair translates **zero-shot** through the shared meaning (Johnson et al. 2017). `EUROPEAN_LANGUAGES` registers the 24 official EU languages; `translate` resolves a pair **offline** over erpax's own [[translations]] lexicon (no external service); `europeanCoverage` reports the live, data-bound coverage. The registry + the interlingua mechanism are complete; lexical coverage grows as the [[localize]] harvest fills each language's forms.

**And all computing languages.** The same interlingua fuses *programming* languages: code in any language carries the same meaning, so a normalized program (its AST / semantics) routes to the same meaning-uuid — equivalent programs across languages [[merge]] to one identity (and cache by it — [[quantum]]/cache, [[quantum]]/query). erpax fuses natural and computing languages by the one law: same meaning ⇒ same content-uuid.

Matter-twin: `src/translator/index.ts` (`interlingua` · `areTranslations` · `vocabularySize` ⊕ `EUROPEAN_LANGUAGES` · `translate` · `zeroShot` · `europeanCoverage`). Composes [[translate]] · [[translation]] · [[translations]] · [[localize]] · [[uuid]] · [[matrix]] · [[merge]] · [[quantum]].

Attested in schema.org — translator

@standard Johnson et al., "Google's Multilingual NMT System: Enabling Zero-Shot Translation," TACL (2017), arXiv:1611.04558 · schema.org translator
