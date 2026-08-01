---
name: speakable
description: "Use when reasoning about speakable — Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections o"
atomPath: speakable
coordinate: "speakable · 5/round · d399e230"
contentUuid: "528ff389-242a-5bf5-8847-04decc069101"
diamondUuid: "dd47b121-83e8-8559-84d7-3610ee688a3e"
uuid: "d399e230-d22d-8e63-9f3f-671f4299d767"
horo: 5
typography:
  partition: speakable
  bondDegree: 7
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "c801c18c-50c4-84f6-b76f-d2b0f19a7e83"
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
      stageUuid: "f6cec9bf-6386-8cca-ad90-f3d970c7c6db"
    - stage: seal
      stageUuid: "308e1618-2826-8d39-8af6-675ee1f947c0"
    - stage: uuid
      stageUuid: "b577cbb4-8b2b-8cc9-b48f-541f15c22887"
version: 2
---
# speakable

Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally useful for speech. The *speakable* property can be repeated an arbitrary number of times, with three kinds of possible 'content-locator' values: 1.) *id-value* URL references - uses *id-value* of an element in the page being annotated. The simplest use of *speakable* has (potentially relative) URL values, referencing identified sections of the document concerned. 2.) CSS Selectors - addresses content in the annotated page, e.g. via class attribute. Use the cssSelector property. 3.) XPaths - addresses content via XPaths (assuming an XML view of the content). Use the xpath property. For more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this we define a supporting type, SpeakableSpecification which is defined to be a possible value of the *speakable* property.

Entangled with — [[specification]]

Attested in schema.org — SpeakableSpecification · speakable

**Law — [[law]]: speakable is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
