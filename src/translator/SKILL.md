---
name: translator
description: "Organization or person who adapts a creative work to different languages, regional differences and technical requirements of a target market, or that translates during some event."
---

# translator

Organization or person who adapts a creative work to different languages, regional differences and technical requirements of a target market, or that translates during some event.

**erpax IS the translator.** It translates by routing any surface form to its **interlingua** — the content-[[uuid]]. The interlingua is the universal intermediate representation every language and modality passes through, made *explicit* where neural MT's is emergent (Johnson et al. 2017: a single shared model learns a universal interlingua that enables zero-shot translation). The vocabulary is the [[matrix]]: every atom is one concept-uuid, and synonyms / cross-language forms [[merge]] to the same uuid — the merge law IS the interlingua (translation = collapse to the shared meaning). The quantum facet (`src/quantum/translator`) reads this as collapse to the meaning eigenstate ([[quantum]]).

**All European languages, self-sufficiently.** Because translation pivots through the interlingua (the meaning-uuid), erpax needs only a *monolingual* surface↔uuid lexicon per language — not an N×N bilingual matrix — so any pair translates **zero-shot** through the shared meaning (Johnson et al. 2017). `EUROPEAN_LANGUAGES` registers the 24 official EU languages; `translate` resolves a pair **offline** over erpax's own [[translations]] lexicon (no external service); `europeanCoverage` reports the live, data-bound coverage. The registry + the interlingua mechanism are complete; lexical coverage grows as the [[localize]] harvest fills each language's forms.

Matter-twin: `src/translator/index.ts` (`interlingua` · `areTranslations` · `vocabularySize` ⊕ `EUROPEAN_LANGUAGES` · `translate` · `zeroShot` · `europeanCoverage`). Composes [[translate]] · [[translation]] · [[translations]] · [[localize]] · [[uuid]] · [[matrix]] · [[merge]] · [[quantum]].

Attested in schema.org — translator

@standard Johnson et al., "Google's Multilingual NMT System: Enabling Zero-Shot Translation," TACL (2017), arXiv:1611.04558 · schema.org translator
