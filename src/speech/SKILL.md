---
name: speech
description: "Use when speech must be computed from sealed coordinates — pitch · phonemes · duration derived from content-uuid · horo · path; never hand-authored audio text. User alias: speach."
atomPath: speech
coordinate: speech · 5/round · cd5cdd5e
contentUuid: "247ae546-7cf0-5ac7-a1b7-dc9b96446aeb"
diamondUuid: "bc987197-b124-8110-a05a-ad00e61a572d"
uuid: "cd5cdd5e-6243-8a39-82af-f5cd7fa6ff22"
horo: 5
bonds:
  in:
    - collapse
    - law
    - markup
    - merge
    - signal
    - speach
    - sti
    - text
    - writing
    - vitepress
  out:
    - collapse
    - law
    - markup
    - merge
    - signal
    - speach
    - sti
    - text
    - writing
    - vitepress
typography:
  partition: speech
  bondDegree: 23
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - collapse
    - law
    - markup
    - merge
    - sti
    - text
  matrix:
    - collapse
    - law
    - markup
    - merge
    - sti
    - text
    - vitepress
  backlinks:
    - collapse
    - law
    - markup
    - merge
    - sti
    - text
    - vitepress
signatures:
  computationUuid: "3ac32f91-1d06-81a8-9bd0-802d7023361b"
  stages:
    - stage: path
      stageUuid: "45be4a08-8f4d-8e1f-82ee-05803966a144"
    - stage: trinity
      stageUuid: "29a18a43-f971-8512-a328-990610a5a816"
    - stage: boundary
      stageUuid: "89e2de07-5d4c-8d97-9ce3-9eb98824b7a6"
    - stage: links
      stageUuid: "5f73b48d-b648-8d73-8c7d-d13d8f75e323"
    - stage: horo
      stageUuid: "bb99610a-b4ce-81d3-8c2e-2c071cf33778"
    - stage: seal
      stageUuid: "f322a9b9-772f-8549-94a0-d3979df1f4a9"
    - stage: uuid
      stageUuid: "9c1d36a6-3591-8cb1-a1b4-96d2585c0bdb"
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
