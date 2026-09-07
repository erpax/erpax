---
name: speakable
description: "Use when reasoning about speakable — Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections o"
atomPath: speakable
coordinate: "speakable · 4/weave · 5e1e17ec"
contentUuid: "506b9bc7-5c3b-5f56-ab2e-127100969222"
diamondUuid: "6d54832c-a753-8a76-9015-d1577357e12f"
uuid: "5e1e17ec-f4ac-8b0b-a08f-4cfefd8f6a06"
horo: 4
typography:
  partition: speakable
  bondDegree: 7
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "5ddfcc5e-d625-89f8-9f19-11ca08a0ea61"
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
      stageUuid: "ce060477-1ec8-811c-8b5b-a8621142b5ac"
    - stage: seal
      stageUuid: "308e1618-2826-8d39-8af6-675ee1f947c0"
    - stage: uuid
      stageUuid: "18ef428d-0d68-8163-a8d0-3c7ced0e3938"
version: 2
---
# speakable

Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally useful for speech. The *speakable* property can be repeated an arbitrary number of times, with three kinds of possible 'content-locator' values: 1.) *id-value* URL references - uses *id-value* of an element in the page being annotated. The simplest use of *speakable* has (potentially relative) URL values, referencing identified sections of the document concerned. 2.) CSS Selectors - addresses content in the annotated page, e.g. via class attribute. Use the cssSelector property. 3.) XPaths - addresses content via XPaths (assuming an XML view of the content). Use the xpath property. For more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this we define a supporting type, SpeakableSpecification which is defined to be a possible value of the *speakable* property.

Entangled with — [[specification]]

Attested in schema.org — SpeakableSpecification · speakable

**Law — [[law]]: speakable is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
