---
name: horo
description: "Use when placing a wave on the horo ring — maps a 1-based ordinal onto the seven-position ring, content-addresses a wave from its features so identical plans fold to the same digest, and composes waves into a single resting step. UNITY is 9, the point a closing wave lands on."
atomPath: "wave/horo"
coordinate: "wave/horo · 7/descent · 80bc579d"
contentUuid: "b27d1104-22e0-535d-90d3-e30fec362c76"
diamondUuid: "8bab3032-a929-8c45-983d-4fa0c4b64e52"
uuid: "80bc579d-580e-8f1c-a79e-bfd5d22c6096"
horo: 7
typography:
  partition: wave
  bondDegree: 448
standards:
  - "RFC 9562 §5.8 content-uuid + the horo digital-root ring"
bindings: []
signatures:
  computationUuid: "f789f676-29ab-8cf1-aeff-a5fe65e5ab27"
  stages:
    - stage: path
      stageUuid: "e6c291ce-87ce-8c00-82e5-7e76bda70af0"
    - stage: trinity
      stageUuid: "08103c14-c69d-8a77-b3db-acc9b2626216"
    - stage: boundary
      stageUuid: "ba27ef06-e7a6-84aa-94b7-dc10e0433bc7"
    - stage: links
      stageUuid: "9e969ced-3eda-8177-a33f-25494b7de7c1"
    - stage: horo
      stageUuid: "16df8045-046c-8295-8efe-40745355bf86"
    - stage: seal
      stageUuid: "6dfb83ea-987d-8f03-b7c6-822f1b78e5c2"
    - stage: uuid
      stageUuid: "3c106d9e-71cb-8d7f-9912-51ec9831e4f1"
version: 2
---
# wave/horo — where a wave sits on the ring

A wave is not a bag of work with a number stapled to it. It sits on the **horo ring**,
and two things follow from that:

- **The ordinal wraps.** `waveStep(n)` maps a 1-based ordinal onto `HORO_DIGITS`, so
  the eighth wave returns to the first position. A plan longer than the ring does not
  run off the end; it comes back round. A non-positive or `NaN` ordinal resolves to
  the ring start rather than producing a step that is not on the ring at all.
- **A wave is content-addressed.** `wave(features, ordinal)` folds each feature to a
  uuid and merges them into one digest, so two plans built from the same features
  address identically and an empty wave has **no** digest — there is nothing to
  address. That is the corpus's own law pointed at scheduling: same content, same
  address ([[identity]]).

`composeWaves` reduces a run of waves to a single resting step, and `isClosingWave`
asks the only question that matters at the end: did it land on **UNITY**?

**Honest boundary.** This proves where a wave sits and how it addresses, never that
the work inside it is right or that the plan is well-balanced — balance is
[[wave]]/load's property, and the receipt trail is [[wave]]/session's.

Composes: [[wave]] · [[horo]] · [[identity]].
