---
name: speech
description: "Use when speech must be computed from sealed coordinates — pitch · phonemes · duration derived from content-uuid · horo · path; never hand-authored audio text. User alias: speach."
atomPath: speech
coordinate: "speech · 4/weave · 9441c7b7"
contentUuid: "8b58353f-9615-585f-a3c3-34a77a57dfab"
diamondUuid: "8fc4d3ba-8bc9-8824-8df6-3430b8a58e42"
uuid: "9441c7b7-7c8f-8234-b139-2d3faee8b593"
horo: 4
typography:
  partition: speech
  bondDegree: 33
standards:
  - "ISO-16:1975 a432-tuning-reference (pitch); value from position"
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "930cda18-b126-8018-8ade-41ce2fefe2a3"
  stages:
    - stage: path
      stageUuid: "45be4a08-8f4d-8e1f-82ee-05803966a144"
    - stage: trinity
      stageUuid: "a1d8777f-acaf-8fbc-8c36-77c5975df245"
    - stage: boundary
      stageUuid: "545352db-58ed-8af2-ae19-c1381b41f9c0"
    - stage: links
      stageUuid: "988367dc-c022-887d-a8d6-39f9c1268d0d"
    - stage: horo
      stageUuid: "d80d215e-714c-8a12-bd63-703b6d30b85a"
    - stage: seal
      stageUuid: "68bc7b80-f73d-8555-a53d-f02d07f5108d"
    - stage: uuid
      stageUuid: "d52d301e-5e06-8173-b9b5-0cd70062deeb"
version: 2
---
# speech

Speech is **computed** from diamond state — like [[css]] `computedCssForUi`, `computedSpeechForUi(surface)` and `speechFromHoro(uuid, horo)` derive A432 pitch, phoneme chains, and duration from content-[[uuid]] · horo · seal · path. No stored wav; a stream of uuids is interactive sound carried by identity ([[signal]] · [[pixel]] · [[uuid/llm]]).

`writingToSpeech(writing)` collapses computed prose → phoneme chain. User spelling alias **speach** is accepted in bonds.

Entangled with — [[text]] · [[markup]] · [[writing]] · [[signal]]

Matter-twin: `src/speech/index.ts` — `speechFromHoro` · `computedSpeechForUi` · `writingToSpeech` · `chiCungSpeechCycle` · `speechAnalogStream`.

**Law — [[law]]: speech computes from sealed coordinates — pitch · phonemes · duration are derived from content-uuid · horo · path, never hand-authored transcript text; same surface inputs ⇒ same utterance (merge-safe, tamper-evident).**

**Law — [[law]]: speech is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard ISO-16:1975 a432-tuning-reference (pitch); value from position
@standard schema.org — the type vocabulary, collided to single words
