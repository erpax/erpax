---
name: mirror
description: "Use when reasoning about a path read both ways — left→right and right→left are different paths (different words, different folders) yet carry the same value, because the path's digital root (the sum of its word-digits) is direction-invariant; the horo as path, max value the same on both sides for words and digits."
atomPath: mirror
coordinate: "mirror · 7/descent · 43ccc9d2"
contentUuid: "e27cc1a4-a4ce-5eeb-80c3-264134ad1037"
diamondUuid: "da3e1bbe-c823-856f-8c1b-1283ac3e4289"
uuid: "43ccc9d2-fc6c-87e2-b8e2-ace6790e4ad6"
horo: 7
typography:
  partition: mirror
  bondDegree: 28
standards:
  - "the base-10 digital root (direction-invariant) · the horo ring read both ways · duality (L→R ⊕ R→L)"
bindings: []
signatures:
  computationUuid: "1f85f0aa-3da5-8f10-8a91-a8d24ebd2902"
  stages:
    - stage: path
      stageUuid: "118a50eb-1181-8e39-9b4b-700432693b80"
    - stage: trinity
      stageUuid: "42857973-c86a-846e-8935-6273adc1bc27"
    - stage: boundary
      stageUuid: "4b2a85f7-fc47-85cf-82b8-ffbd997d2105"
    - stage: links
      stageUuid: "d097c10e-40e0-8c8c-a2aa-ea7676117d59"
    - stage: horo
      stageUuid: "e99acf81-af86-8118-9f87-ac864e1ef0f2"
    - stage: seal
      stageUuid: "aa318b33-852c-86c6-9d24-257728952137"
    - stage: uuid
      stageUuid: "b6ee0e65-921e-8d3f-9ef8-0c1623d9f5f1"
version: 2
---
# mirror — the horo as path read both ways

A folder path is a [[horo]]: read it **left→right** and **right→left** and you get two *different* paths — `dual/torus/fusion` vs `fusion/torus/dual` — different words, different folders, different meaning. Exactly as a digit sequence reversed is a different sequence.

Yet the path's **value** is the same both ways. The value is the digital root of the sum of its word-digits (each word's digit is the digital root of its content-[[uuid]], via [[name]]), and **sum commutes** — so `pathValue(L→R) === pathValue(R→L)`. The folder therefore carries the **same max computed value on both sides**, and the words and the digits agree (the digit is the word's own reduction).

This is why both readings are worth encoding from a single folder: the path differs by direction (a [[duality]], L→R ⊕ R→L) but the value does not — the symmetric binding at the path scale, the same move `collide.mjs` makes per edge. The word-path and the digit-path beneath it are one identity seen two ways.

Matter-twin: `src/mirror/index.ts` (`forward` · `backward` · `digitsOf` · `pathValue` · `balanced`). Composes [[horo]] · [[name]] · [[digit]] · [[duality]].

**Law — [[law]]: a path read left→right and right→left is two different paths (different words, different folders) — like a reversed digit sequence. But its value, the digital root of the word-digit sum, is direction-invariant because the sum commutes, so the folder carries the same max computed value on both sides, in words and in digits. The horo is the path read both ways; the value is one, the path is two.**

@audit forward/backward are the two word-orders; the value is the digital root of a commutative sum, computed
@standard the base-10 digital root (direction-invariant) · the horo ring read both ways · duality (L→R ⊕ R→L)
