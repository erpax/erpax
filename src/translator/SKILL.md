---
name: translator
description: "Use when reasoning about translator — Organization or person who adapts a creative work to different languages, regional differences and technical requirements of a target market, or that translates during some event."
atomPath: translator
coordinate: "translator · 2/share · 6b7efd9a"
contentUuid: "66b23393-5fcd-58f6-831b-c2c79795906a"
diamondUuid: "a1b289c7-cfcf-87ea-9c48-83649b1de8e6"
uuid: "6b7efd9a-539a-8c84-bed7-7f36ba73179c"
horo: 2
typography:
  partition: translator
  bondDegree: 134
standards:
  - "Johnson et al., \"Google's Multilingual NMT System: Enabling Zero-Shot Translation,\" TACL (2017), arXiv:1611.04558"
  - "Johnson et al., \"Google's Multilingual NMT System: Enabling Zero-Shot Translation,\" TACL (2017), arXiv:1611.04558 · schema.org translator"
bindings: []
signatures:
  computationUuid: "b555e065-b2fc-835d-9549-df99591689de"
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
      stageUuid: "282663e1-80c5-83d5-ad61-86843fd2cb51"
    - stage: seal
      stageUuid: "10068b8f-b1ac-818f-8c60-f639debdee34"
    - stage: uuid
      stageUuid: "8465fc99-05c4-8033-a6b4-fb81e0809b32"
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
