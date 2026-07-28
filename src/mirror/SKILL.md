---
name: mirror
description: "Use when reasoning about a path read both ways — left→right and right→left are different paths (different words, different folders) yet carry the same value, because the path's digital root (the sum of its word-digits) is direction-invariant; the horo as path, max value the same on both sides for words and digits."
atomPath: mirror
coordinate: "mirror · 1/base · 46bbc970"
contentUuid: "54dc518a-91a5-56cb-b263-ebed4d813d6a"
diamondUuid: "319e5705-e27d-8c9d-8a39-73ebb25763dd"
uuid: "46bbc970-171e-88cd-b734-2c9a5235ade3"
horo: 1
bonds:
  in:
    - digit
    - duality
    - hermeticism
    - horo
    - law
    - name
    - uuid
  out:
    - digit
    - duality
    - hermeticism
    - horo
    - law
    - name
    - uuid
typography:
  partition: mirror
  bondDegree: 21
  neighbors: []
standards:
  - "the base-10 digital root (direction-invariant) · the horo ring read both ways · duality (L→R ⊕ R→L)"
bindings: []
neighbors:
  wikilink:
    - digit
    - duality
    - horo
    - law
    - name
    - uuid
  matrix:
    - digit
    - duality
    - hermeticism
    - horo
    - law
    - name
    - uuid
  backlinks:
    - digit
    - duality
    - hermeticism
    - horo
    - law
    - name
    - uuid
signatures:
  computationUuid: "1b795178-e453-81b0-a389-f1e9cafc9d0a"
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
      stageUuid: "ba2c7641-1280-8da5-8784-8fb3515e7c45"
    - stage: seal
      stageUuid: "aa318b33-852c-86c6-9d24-257728952137"
    - stage: uuid
      stageUuid: "887c7267-fb09-89cb-92bd-c25f71b078c5"
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
