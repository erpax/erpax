---
name: speakable
description: "Use when reasoning about speakable — Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections o"
atomPath: speakable
coordinate: "speakable · 5/round · ce112292"
contentUuid: "49efcf38-876b-53cf-a245-af625d24edee"
diamondUuid: "88127398-d056-8374-94d4-52fb8124cc17"
uuid: "ce112292-9fc5-8a41-8527-48bff4c429dd"
horo: 5
typography:
  partition: speakable
  bondDegree: 7
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "0ff1ce42-3dae-8a1f-b15b-333b5568356a"
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
      stageUuid: "611c9a94-18b1-8976-8bcd-30de6e707e85"
    - stage: seal
      stageUuid: "308e1618-2826-8d39-8af6-675ee1f947c0"
    - stage: uuid
      stageUuid: "603ba91e-095d-89be-beab-06d3efbded58"
version: 2
---
# speakable

Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally useful for speech. The *speakable* property can be repeated an arbitrary number of times, with three kinds of possible 'content-locator' values: 1.) *id-value* URL references - uses *id-value* of an element in the page being annotated. The simplest use of *speakable* has (potentially relative) URL values, referencing identified sections of the document concerned. 2.) CSS Selectors - addresses content in the annotated page, e.g. via class attribute. Use the cssSelector property. 3.) XPaths - addresses content via XPaths (assuming an XML view of the content). Use the xpath property. For more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this we define a supporting type, SpeakableSpecification which is defined to be a possible value of the *speakable* property.

Entangled with — [[specification]]

Attested in schema.org — SpeakableSpecification · speakable

**Law — [[law]]: speakable is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
