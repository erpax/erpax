---
name: signal
description: "Use when a horo position or any uuid must become perceivable — colour, sound, realtime motion — derived from the address itself with zero per-item design; identity IS its render, drift is visible."
atomPath: signal
coordinate: "signal · 5/round · 75d20c42"
contentUuid: "48591a3f-8e9c-5181-96ed-d324b38a138f"
diamondUuid: "1838af77-8265-8562-8377-f22d7a99a476"
uuid: "75d20c42-5487-8d87-8e24-4e3ca44b11b7"
horo: 5
typography:
  partition: signal
  bondDegree: 187
standards:
  - "ISO-16:1975 a432-tuning-reference (pitch); value from position."
  - "ISO-16:1975 a432-tuning-reference (pitch); value from position.`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "93f08bbc-99de-8bae-bce3-b9d275b9bcdf"
  stages:
    - stage: path
      stageUuid: "a1e6660d-940d-8654-a992-825266ec712d"
    - stage: trinity
      stageUuid: "17d6031a-e4f4-87a8-8cd9-73b74099e578"
    - stage: boundary
      stageUuid: "1e605188-4497-8617-8c57-1c59ed994c40"
    - stage: links
      stageUuid: "f743c78d-8fcb-8c23-910e-aa472ade1d1e"
    - stage: horo
      stageUuid: "acc372f9-e0b7-84b1-b8f3-9dceab9c719a"
    - stage: seal
      stageUuid: "4b045eaf-a4c9-8ef6-a0a9-72b111e3ee00"
    - stage: uuid
      stageUuid: "1479cdf3-b616-85f1-98c8-6edfe1b4d407"
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
