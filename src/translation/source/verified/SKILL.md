---
name: verified
description: "Use when you need the sense-verified translation seed and its computed renderings — only the concept→Qid judgment is stored (58 unambiguous concept atoms, each admitted because a candidate's description sense-matched the atom's meaning); the per-locale labels are a computed projection of each Qid, sealed content-addressed in the gitignored cache. Theorems replace hardcoded values: the seed is data, the renderings are a read. Nothing fabricated; unsure senses stay gaps."
atomPath: "translation/source/verified"
coordinate: "translation/source/verified · 1/base · 7d4d4c8c"
contentUuid: "b90efa5c-42bd-58d6-aa9c-dcb790108004"
diamondUuid: "8ff6a2d4-5390-827b-9c0a-5c4e62fd6124"
uuid: "7d4d4c8c-a3ca-8e0b-895c-93e887244198"
horo: 1
typography:
  partition: translation
  bondDegree: 18
standards:
  - "Wikidata (CC0) · Wikimedia MediaWiki API · BCP-47 locale tags · RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "f9847ae2-a12d-8a26-beb2-3cbea470f0f2"
  stages:
    - stage: path
      stageUuid: "3b872430-984f-8879-a285-fdc86e1662b7"
    - stage: trinity
      stageUuid: "4514336a-7e92-88d8-b000-c55da574b81e"
    - stage: boundary
      stageUuid: "547d4b61-53dc-8861-8829-6080750aea30"
    - stage: links
      stageUuid: "db6df6ef-f1ee-8a2a-be90-c366acc9afae"
    - stage: horo
      stageUuid: "29614813-c5e0-8fd6-a0da-87d9ba16554c"
    - stage: seal
      stageUuid: "d33e06a6-fa58-8448-bfb3-5c72f4c6f5c5"
    - stage: uuid
      stageUuid: "a5a8356f-4a9f-8983-a6f8-cd9953601fb3"
version: 2
---
# verified — the seed is stored, the renderings are computed

The training set of the translation intelligence, folded correctly: **store the judgment, compute the projection.**

- **`VERIFIED_PROVENANCE`** — the **seed**, the only thing stored: for each of 58 unambiguous single-word concept atoms (anatomy · nature · matter · plants · animals · food · metals), the CC0 Wikidata `qid` its sense-gate run admitted ([[source]] `harvestVerified`, senseScore ≥ 0.14), with the matched `description` and `score`. This is the irreducible human/agent judgment — which sense is *the* sense.
- **`verifiedRenderings()`** — the **computed face**: the per-locale labels are a projection of each Qid (`fetchEntityLabels`), harvested once and **sealed content-addressed by the seed's fold** (`provenanceKey` = `foldToRoot(qids)`, gitignored cache). Unchanged seed ⇒ a **read**, zero network; changed seed ⇒ re-harvest. `en` is never harvested — the atom word stays the source. An unreachable source with no seal **throws**: a rendering is never fabricated.

This replaced a hardcoded wall of ~1620 label literals — stored derivable content, the exact entropy the law forbids. Label drift inside a verified Qid is Wikidata improving, not poisoning: the *sense* lives in the Qid, and the Qid is what the seed holds.

**The gate did its job.** It admitted the right senses (`heart→Q1072` the organ, `water→Q283` the compound, `gold→Q897` the element — not the family names and album titles the top-1 search returns) and left honest **seed-gaps** where it could not be sure (`brain`, `chest`, `eye`, `sugar`; `dog` excluded for binomial-not-vernacular labels; `daughter` excluded as a wrong-sense niece). A gap is better than a wrong sense.

Consumed by [[translations]]/seed, which registers the computed table into the `translations` collection.

**Law — [[law]]: store the sense-judgment, compute the renderings. A rendering is real only if projected from a CC0 Qid whose sense matched the atom's meaning; the projection is sealed by the seed's fold and read, not re-derived; where the sense was unsure, the gap stands; nothing is fabricated.**

## Standards

- **Wikidata (CC0)** — the multilingual labels; every rendering projects from its `qid`.
- **BCP-47** — the locale tags of the supported locales.
- **RFC 9562 §5.8** — the content-uuid each rendering is addressed by.

Composes: [[source]] · [[translation]] · [[translations]] · [[merge]] · [[law]].
