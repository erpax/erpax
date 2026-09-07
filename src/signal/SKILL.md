---
name: signal
description: "Use when a horo position or any uuid must become perceivable — colour, sound, realtime motion — derived from the address itself with zero per-item design; identity IS its render, drift is visible."
atomPath: signal
coordinate: "signal · 5/round · d768105b"
contentUuid: "1fa06738-be48-5133-8049-51c62e1eae82"
diamondUuid: "7bc5e673-da13-8871-8dbf-4d94a8acbbc9"
uuid: "d768105b-fa99-87aa-a1fa-e62f5c2f8262"
horo: 5
typography:
  partition: signal
  bondDegree: 167
standards:
  - "ISO-16:1975 a432-tuning-reference (pitch); value from position."
  - "ISO-16:1975 a432-tuning-reference (pitch); value from position.`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "4c6b9487-b4a2-8d38-8d48-90d9e52cc0af"
  stages:
    - stage: path
      stageUuid: "a1e6660d-940d-8654-a992-825266ec712d"
    - stage: trinity
      stageUuid: "17d6031a-e4f4-87a8-8cd9-73b74099e578"
    - stage: boundary
      stageUuid: "1e605188-4497-8617-8c57-1c59ed994c40"
    - stage: links
      stageUuid: "8935df1b-6335-81b2-b8b5-3a69270bfd67"
    - stage: horo
      stageUuid: "e9b87196-041b-8117-8467-1ebb991e982d"
    - stage: seal
      stageUuid: "4b045eaf-a4c9-8ef6-a0a9-72b111e3ee00"
    - stage: uuid
      stageUuid: "5eaa2908-189d-8f28-8cb0-6903099ad7ae"
version: 2
---
# signal — identity rendered as colour · sound · motion

Use when a [[horo]] position or any [[uuid]] must become perceivable — a colour, a note, a realtime animation — from the address itself, with zero per-item design decisions.

> atom `signal` · A432 anchor (Hz for pitch, ms for the animation period)

## The law

**Law — [[law]]: appearance is derived, never decorated — the same A432 anchor decodes a position or a uuid to colour+sound+motion, so identity IS its render and drift is visible (a changed address is a changed hue).**

## Two decoders, one anchor

- `signalForStep(step)` — a [[horo]] ring position → its diatonic note (just-intonation over A432) and CMYK channel; the colour↔sound [[duality]] completed by [[vibration]] (the sensory [[trinity]], shared with [[rodin]]).
- `uuidSignal(uuid)` — **any** address → hue · realtime spin period · A432-tempered tone (12-TET, ±2 octaves about 432, never a raw literal), all from its own bytes. The [[uuid]] carries its whole appearance — the multi-modal-uuid law made concrete ([[identity]]).

## The CSS-variable bus — realtime without a runtime

`uuidSignalCssVars(uuid)` is the realtime engine inhaled from ceccec (2026-07-15): JS writes `--erpax-hue` · `--erpax-spin-ms` · `--erpax-freq` **once per event**, the CSS cascade does the motion — no re-render loop, no runtime tokens. Because erpax records carry tamper-proof content-uuids ([[tamper]]), every row · atom · collection renders its computed identity with no design system, and a tampered value literally changes colour. Composes with the collection event streams ([[factory]] auto-emits): event → one var write → CSS transition. Auditing becomes multi-sensory — balanced books harmonise, imbalance sounds dissonant.

Composes: [[horo]] · [[uuid]] · [[identity]] · [[rodin]] · [[cmyk]] · [[notes]] · [[vibration]] · [[duality]] · [[trinity]] · [[tamper]] · [[factory]] · [[breath]] · [[phase]]

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-16:1975 a432-tuning-reference (pitch); value from position.`
