---
name: speech
description: "Use when speech must be computed from sealed coordinates — pitch · phonemes · duration derived from content-uuid · horo · path; never hand-authored audio text. User alias: speach."
atomPath: speech
coordinate: "speech · 2/share · 16e073c5"
contentUuid: "6f06368f-4c64-5a0e-bdd2-7d4a4afec2c6"
diamondUuid: "ce1af6a1-4597-87f3-9079-e876e202cb88"
uuid: "16e073c5-819a-8e1a-aa93-4bea4feba38b"
horo: 2
typography:
  partition: speech
  bondDegree: 33
standards:
  - "ISO-16:1975 a432-tuning-reference (pitch); value from position"
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "121c32e2-f2ab-8b24-975d-0c258ffa69b6"
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
      stageUuid: "4514f1d0-12e9-8d73-aa09-8cb62a9395ee"
    - stage: seal
      stageUuid: "68bc7b80-f73d-8555-a53d-f02d07f5108d"
    - stage: uuid
      stageUuid: "aa934fcc-6e4d-8f9d-b570-da8695e7d148"
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
