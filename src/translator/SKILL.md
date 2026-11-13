---
name: translator
description: "Use when reasoning about translator — Organization or person who adapts a creative work to different languages, regional differences and technical requirements of a target market, or that translates during some event."
atomPath: translator
coordinate: "translator · 7/descent · c06f3634"
contentUuid: "a7af8ada-d95c-5f23-a98b-6670b652d866"
diamondUuid: "9f30393e-35cf-84b4-8c9c-fbb9091b5cee"
uuid: "c06f3634-98a5-8043-b28c-cc245924fcda"
horo: 7
typography:
  partition: translator
  bondDegree: 46
standards:
  - "Johnson et al., \"Google's Multilingual NMT System: Enabling Zero-Shot Translation,\" TACL (2017), arXiv:1611.04558"
  - "Johnson et al., \"Google's Multilingual NMT System: Enabling Zero-Shot Translation,\" TACL (2017), arXiv:1611.04558 · schema.org translator"
bindings: []
signatures:
  computationUuid: "5b28265e-9ad5-8a87-81a3-284c94e81ca0"
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
      stageUuid: "54439afa-62e1-871a-a6d2-7b4261c29651"
    - stage: seal
      stageUuid: "10068b8f-b1ac-818f-8c60-f639debdee34"
    - stage: uuid
      stageUuid: "81f36e52-3506-857f-8999-b84e67148a5e"
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
