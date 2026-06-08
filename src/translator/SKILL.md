---
name: translator
description: "Use when reasoning about translator — Organization or person who adapts a creative work to different languages, regional differences and technical requirements of a target market, or that translates during some event."
atomPath: translator
coordinate: translator · 1/base · 643d3f7c
contentUuid: "e5d6166d-50f3-53ef-8a1b-1f6d78c2cf91"
diamondUuid: "9510f578-ae17-85ac-9db3-2a005ccbd642"
uuid: "643d3f7c-89b1-8cfe-b907-e74b92b96629"
horo: 1
bonds:
  in:
    - animism
    - bahai
    - bogomilism
    - buddhism
    - catholicism
    - christianity
    - confucianism
    - gnosticism
    - hermeticism
    - hinduism
    - islam
    - jainism
    - judaism
    - kabbalah
    - localize
    - manichaeism
    - matrix
    - merge
    - orphism
    - orthodoxy
    - paganism
    - protestantism
    - quantum
    - realtime
    - religion
    - shamanism
    - shia
    - shinto
    - sikhism
    - sufism
    - sunni
    - taoism
    - translate
    - translation
    - translations
    - translator
    - uuid
    - vedanta
    - zoroastrianism
  out:
    - animism
    - bahai
    - bogomilism
    - buddhism
    - catholicism
    - christianity
    - confucianism
    - gnosticism
    - hermeticism
    - hinduism
    - islam
    - jainism
    - judaism
    - kabbalah
    - localize
    - manichaeism
    - matrix
    - merge
    - orphism
    - orthodoxy
    - paganism
    - protestantism
    - quantum
    - realtime
    - religion
    - shamanism
    - shia
    - shinto
    - sikhism
    - sufism
    - sunni
    - taoism
    - translate
    - translation
    - translations
    - translator
    - uuid
    - vedanta
    - zoroastrianism
typography:
  partition: translator
  bondDegree: 134
  neighbors: []
standards:
  - "Johnson et al., \"Google's Multilingual NMT System: Enabling Zero-Shot Translation,\" TACL (2017), arXiv:1611.04558"
  - "Johnson et al., \"Google's Multilingual NMT System: Enabling Zero-Shot Translation,\" TACL (2017), arXiv:1611.04558 · schema.org translator"
  - "the interlingua is the content-uuid; computed from the live matrix, never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - localize
    - matrix
    - merge
    - quantum
    - translate
    - translation
    - translations
    - uuid
  matrix:
    - animism
    - bahai
    - bogomilism
    - buddhism
    - catholicism
    - christianity
    - confucianism
    - gnosticism
    - hermeticism
    - hinduism
    - islam
    - jainism
    - judaism
    - kabbalah
    - localize
    - manichaeism
    - matrix
    - merge
    - orphism
    - orthodoxy
    - paganism
    - protestantism
    - quantum
    - realtime
    - religion
    - shamanism
    - shia
    - shinto
    - sikhism
    - sufism
    - sunni
    - taoism
    - translate
    - translation
    - translations
    - translator
    - uuid
    - vedanta
    - zoroastrianism
  backlinks:
    - animism
    - bahai
    - bogomilism
    - buddhism
    - catholicism
    - christianity
    - confucianism
    - gnosticism
    - hermeticism
    - hinduism
    - islam
    - jainism
    - judaism
    - kabbalah
    - localize
    - manichaeism
    - matrix
    - merge
    - orphism
    - orthodoxy
    - paganism
    - protestantism
    - quantum
    - realtime
    - religion
    - shamanism
    - shia
    - shinto
    - sikhism
    - sufism
    - sunni
    - taoism
    - translate
    - translation
    - translations
    - translator
    - uuid
    - vedanta
    - zoroastrianism
signatures:
  computationUuid: "e2a57b58-2623-8a8a-a8e0-aca1a02201f3"
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
      stageUuid: "a0c895bd-3200-8717-9f94-f825a49056f9"
    - stage: seal
      stageUuid: "6be311a8-4896-833b-9d84-00020b89b703"
    - stage: uuid
      stageUuid: "cdb34717-1210-8baa-9ffa-fd346502e5ac"
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
