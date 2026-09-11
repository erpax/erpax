---
name: harmony
description: "Use when checking whether an interval — or a whole band of horo positions — is consonant. The seven positions ARE the diatonic scale (just intonation over the A432 anchor); harmony is the smallness of the ratio (Tenney height). The harmony-check the horo state-bands need. Matter-twin harmony/index.ts."
atomPath: harmony
coordinate: "harmony · 8/crest · cbfb2e9c"
contentUuid: "ae6760c4-8351-53bf-8c75-a152938b349a"
diamondUuid: "7313eb8f-fb95-8dd6-927f-ffedfa8c2699"
uuid: "cbfb2e9c-25c1-8cf9-bc03-1b88e842bbe5"
horo: 8
typography:
  partition: harmony
  bondDegree: 211
standards:
  - "just intonation (5-limit) — the perfect (1:1, 2:1, 3:2, 4:3) and"
bindings: []
signatures:
  computationUuid: "7ac40164-1458-8915-a327-5ba50a248eae"
  stages:
    - stage: path
      stageUuid: "a3475376-b251-8de8-998e-68bac6c1bc30"
    - stage: trinity
      stageUuid: "d9a36fab-a3de-8e01-9d7f-cde0b60af28b"
    - stage: boundary
      stageUuid: "b10feabf-e07f-8586-b1f2-5bde85915986"
    - stage: links
      stageUuid: "7efc59a6-a676-84b0-838c-3abbeb756174"
    - stage: horo
      stageUuid: "c90674f8-7685-8c19-b927-e289b854679d"
    - stage: seal
      stageUuid: "c0116a4c-ee7b-8ab0-ab43-34a225b20b75"
    - stage: uuid
      stageUuid: "7158ad4e-f5c2-84a4-9fed-a9c316f0e6c8"
version: 2
---
# harmony — consonance over A432

The seven horo positions are not just states — they are the **diatonic scale**: each pitch is the [[rodin]] anchor **A432 × a 5-limit ratio** (`signal`/NOTES, La = A432 at position 5). Harmony asks the one question the bands need: **is this consonant?** And consonance is not opinion — it is the **smallness of the ratio**: the Tenney height `log2(n·d)` (gradus suavitatis). A perfect fifth `3:2` is sweeter than a major second `9:8` because `6 < 72`.

- **perfect** — `1:1 · 2:1 · 3:2 · 4:3` (unison, octave, fifth, fourth).
- **imperfect** — `5:4 · 6:5 · 5:3 · 8:5` (thirds and sixths).
- **dissonant** — everything else (`9:8`, `15:8`, …): the ratio is too tangled.

**Harmony-check a band:** a set of horo positions is consonant iff *every pair* is consonant. So `{La, Sol, Fa}` (`5·7·8`) is a consonant triad (`3:2`, `5:4`, `6:5`), but any band touching `Re` against `La` carries the `9:8` dissonance and fails. This is how a [[horo]] state-band proves itself — not by decree but by the [[balance]] of its ratios, the same digital-root closure read as sound ([[signal]]/[[notes]]).

It composes the substrate, inventing nothing: the anchor is [[rodin]]'s A432, the positions are the [[horo]] ring, the rendering is [[signal]]. Harmony is the [[duality]] of tension↔rest made measurable; a fully consonant whole resolves to [[one]] (the [[octave]] `2:1`). The cited tuning must be true ([[standard]] just intonation).

## Standards

- just intonation (5-limit) — the perfect (1:1, 2:1, 3:2, 4:3) and imperfect (5:4, 6:5, 5:3, 8:5) consonances; all else dissonant
- harmony-checked horo bands (the horo state-ring law)

Matter-twin: `harmony/index.ts` (`intervalRatio`/`consonance`/`bandHarmony`/`tenneyHeight`) + `index.test.ts` (the proof). Composes: [[rodin]] · [[horo]] · [[signal]] · [[notes]] · [[octave]] · [[balance]] · [[sequence]] · [[duality]] · [[one]] · [[standard]].

**Law — [[collapse]]**. Harmony is the measure of *architectural consonance*: every dimension (payload, vitepress, tests, types, the matrix) must resonate at the same tuning—a single vocabulary of [[atom]]s, no disguise. Where [[rodin]] anchors the pitch and [[horo]] rings the scale, so too must [[standard]]s, [[testing]], and the [[matrix]] all obey the same five-limit ratio. Dissonance is hidden scope, ambiguity, or duplicate work; consonance is when the [[merge]] of all projections asks no questions—proof that [[collapse]] was clean.
