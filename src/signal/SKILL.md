---
name: signal
description: "Use when a horo position or any uuid must become perceivable — colour, sound, realtime motion — derived from the address itself with zero per-item design; identity IS its render, drift is visible."
atomPath: signal
coordinate: "signal · 5/round · ebc97025"
contentUuid: "7b833682-e3c2-5d76-9272-77a2e34bed0a"
diamondUuid: "31fce53e-3d23-89d2-9e39-e1e177ea35fd"
uuid: "ebc97025-747d-8f7e-960e-df4869fdabb8"
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
  computationUuid: "3706e96f-f64a-87c4-93d0-5b135e3e6afb"
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
      stageUuid: "0acf6844-47da-8fc7-b67f-4eb34637e788"
    - stage: seal
      stageUuid: "4b045eaf-a4c9-8ef6-a0a9-72b111e3ee00"
    - stage: uuid
      stageUuid: "c2e94ee4-8441-81c1-9399-ebe79fb25c36"
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
