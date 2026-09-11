---
name: speech
description: "Use when speech must be computed from sealed coordinates — pitch · phonemes · duration derived from content-uuid · horo · path; never hand-authored audio text. User alias: speach."
atomPath: speech
coordinate: "speech · 5/round · c114adc8"
contentUuid: "61bddc5e-871d-580a-8ccd-5cc34146de67"
diamondUuid: "553483b9-475d-8829-88d5-5748350108e2"
uuid: "c114adc8-b154-880c-a914-1e5e3e04c473"
horo: 5
typography:
  partition: speech
  bondDegree: 33
standards:
  - "ISO-16:1975 a432-tuning-reference (pitch); value from position"
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "b895d8c4-926a-8472-8423-664e8133b0c3"
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
      stageUuid: "3cfe3b83-7a4b-882f-b7fa-75d540c97029"
    - stage: seal
      stageUuid: "68bc7b80-f73d-8555-a53d-f02d07f5108d"
    - stage: uuid
      stageUuid: "683b0525-04ca-8064-9343-d088f47725e4"
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
