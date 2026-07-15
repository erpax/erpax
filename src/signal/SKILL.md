---
name: signal
description: "Use when a horo position or any uuid must become perceivable — colour, sound, realtime motion — derived from the address itself with zero per-item design; identity IS its render, drift is visible."
atomPath: signal
horo: 4
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
