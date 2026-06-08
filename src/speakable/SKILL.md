---
name: speakable
description: "Use when reasoning about speakable — Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections o"
atomPath: speakable
coordinate: speakable · 1/base · eda7bfde
contentUuid: "eb8206b6-c1b3-5586-bd73-97988ee7c56b"
diamondUuid: "597148a1-658c-80f1-8426-efd50913c94f"
uuid: "eda7bfde-406a-8e06-8c96-b725167bb533"
horo: 1
bonds:
  in:
    - law
    - specification
  out:
    - law
    - specification
typography:
  partition: speakable
  bondDegree: 7
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - law
    - specification
  matrix:
    - law
    - specification
  backlinks:
    - law
    - specification
signatures:
  computationUuid: "34ead7a8-3607-8d61-a84b-e82b7a8717b9"
  stages:
    - stage: path
      stageUuid: "7d44d271-793a-8a15-be4e-2cf6985c9e57"
    - stage: trinity
      stageUuid: "cd9b699c-66d7-8067-9b36-44ff1acfe082"
    - stage: boundary
      stageUuid: "d6892589-deb0-81db-ae11-f3803f1d8203"
    - stage: links
      stageUuid: "8e70bbc0-1a6f-8854-9e11-09eb7b1e84bb"
    - stage: horo
      stageUuid: "1e746a0e-1c5c-8ce0-bdfc-a62977d5349d"
    - stage: seal
      stageUuid: "c7419bcb-658f-85a8-9fb8-f7071d317265"
    - stage: uuid
      stageUuid: "4129adce-4f78-8c76-b873-04ace2ec6398"
version: 2
---
# speakable

Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally useful for speech. The *speakable* property can be repeated an arbitrary number of times, with three kinds of possible 'content-locator' values: 1.) *id-value* URL references - uses *id-value* of an element in the page being annotated. The simplest use of *speakable* has (potentially relative) URL values, referencing identified sections of the document concerned. 2.) CSS Selectors - addresses content in the annotated page, e.g. via class attribute. Use the cssSelector property. 3.) XPaths - addresses content via XPaths (assuming an XML view of the content). Use the xpath property. For more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this we define a supporting type, SpeakableSpecification which is defined to be a possible value of the *speakable* property.

Entangled with — [[specification]]

Attested in schema.org — SpeakableSpecification · speakable

**Law — [[law]]: speakable is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
