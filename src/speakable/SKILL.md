---
name: speakable
description: "Use when reasoning about speakable — Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections o"
atomPath: speakable
coordinate: "speakable · 7/descent · c570303c"
contentUuid: "15f8ea0b-12b5-5654-95ff-ce1000cc7d71"
diamondUuid: "ff7312c5-766a-8fd6-b3d8-4e01d851288c"
uuid: "c570303c-4630-82c4-a526-9b7d1ac92b70"
horo: 7
typography:
  partition: speakable
  bondDegree: 7
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "38ceed97-c94c-864b-acfe-98e6fdeab630"
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
      stageUuid: "06266473-a9cc-8127-899b-0922a8d02b68"
    - stage: seal
      stageUuid: "308e1618-2826-8d39-8af6-675ee1f947c0"
    - stage: uuid
      stageUuid: "6c32412c-3525-844b-a799-697bc31977c3"
version: 2
---
# speakable

Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally useful for speech. The *speakable* property can be repeated an arbitrary number of times, with three kinds of possible 'content-locator' values: 1.) *id-value* URL references - uses *id-value* of an element in the page being annotated. The simplest use of *speakable* has (potentially relative) URL values, referencing identified sections of the document concerned. 2.) CSS Selectors - addresses content in the annotated page, e.g. via class attribute. Use the cssSelector property. 3.) XPaths - addresses content via XPaths (assuming an XML view of the content). Use the xpath property. For more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this we define a supporting type, SpeakableSpecification which is defined to be a possible value of the *speakable* property.

Entangled with — [[specification]]

Attested in schema.org — SpeakableSpecification · speakable

**Law — [[law]]: speakable is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
