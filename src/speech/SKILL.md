---
name: speech
description: "Use when speech must be computed from sealed coordinates — pitch · phonemes · duration derived from content-uuid · horo · path; never hand-authored audio text. User alias: speach."
atomPath: speech
coordinate: "speech · 1/base · 9d8e3dbe"
contentUuid: "f6d9e875-b08e-5f7f-89c6-c23a276ac543"
diamondUuid: "4a2ba1cc-3aa8-87e8-9fcd-7c56b2e8ef6f"
uuid: "9d8e3dbe-6f24-84ac-946f-000042857a81"
horo: 1
typography:
  partition: speech
  bondDegree: 33
standards:
  - "ISO-16:1975 a432-tuning-reference (pitch); value from position"
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "74442a6a-a3be-8101-8edd-f3acfa3ab1f1"
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
      stageUuid: "eefef0a8-b92e-82b5-8424-d744542178c7"
    - stage: seal
      stageUuid: "68bc7b80-f73d-8555-a53d-f02d07f5108d"
    - stage: uuid
      stageUuid: "0f858f4e-2bd2-8e29-89ee-c9e6dd09c3b7"
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
