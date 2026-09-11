---
name: projection
description: "Use when proving the projection leg — that the FORWARD project (content → uuid) is free and deterministic while its INVERSE (recover the analog negative without the held key) costs the maximum, unbounded at the biggest blockchain — and you must tag the ∞ instead of letting a raw Infinity leak into the bundle."
atomPath: "proof/projection"
coordinate: "proof/projection · 1/base · 5abda064"
contentUuid: "56d9c46a-acff-53a2-8d5d-2df5064a4504"
diamondUuid: "b189b243-ff46-8ce4-9411-0aa54b198ed2"
uuid: "5abda064-bd0c-8b16-a97d-f269b7f274e9"
horo: 1
typography:
  partition: proof
  bondDegree: 57
standards:
  - "NIST SP 800-57 Part 1 r5 §5.6.1 (anchor key strengths)"
  - "NIST SP 800-57 Part 1 r5 §5.6.1 (anchor key strengths)`"
  - "NIST-SP-800-57"
  - "RFC 9562 §5.8 (content-uuid v8, the forward projection) · RFC 8785 (JCS)"
  - "RFC 9562 §5.8 (content-uuid v8, the forward projection) · RFC 8785 (JCS)`"
  - "RFC-8785"
  - "SEC 2 secp256k1 / FIPS 186-4 P-256 (ECDLP — the inverse key recovery)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "6e75bd92-89e5-8c41-bf99-e406b9ed0119"
  stages:
    - stage: path
      stageUuid: "d6eb7272-a5f9-853e-9fd6-6ad1e3123267"
    - stage: trinity
      stageUuid: "11343e2f-1878-8b2b-9f82-29555fc04ce7"
    - stage: boundary
      stageUuid: "9e284b92-22f6-898d-a5bd-4159ab8373ac"
    - stage: links
      stageUuid: "39217772-f251-879a-8a2e-f9a452dd05ab"
    - stage: horo
      stageUuid: "cc23eb8a-bbcf-8414-97e5-8242d92eaa80"
    - stage: seal
      stageUuid: "764fb305-a825-8f36-96a5-f6e76104c2a9"
    - stage: uuid
      stageUuid: "181e69f0-f66d-837f-82cd-9e19bbc9131f"
version: 2
---
# proof-projection — the bounded-infinity organ

FORM: **forward is free; the inverse costs EXACTLY the anchor (0 / 2^128 / ∞), and when it is ∞ that ∞ is tagged not serialized.**

The uuid matrix is a projection space (`index.ts:5-8`). The FORWARD projection is the public positive: `content → content-uuid`, `private-key → public anchor`. It is one hash — free, deterministic, O(1) — and it mints an atom ([[identity]]: same content ⇒ same id; same id ⇒ [[merge]]). In the proof, `forward.deterministic` is true and `forward.costLog2` is `0` (`index.ts:81-86`, `index.test.ts:21-24`).

The INVERSE — recover the analog NEGATIVE (the private key / pre-image) from the positive WITHOUT the held key — is reverse entropy: order from a maximal-entropy projection, the costliest direction by the 2nd law. Its price is EXACTLY the borrowed [[anchor]] ([[tamper/cost]], `ANCHOR_STRENGTH_BITS`): `none ⇒ 0` (no anchor pins nothing — a free rewrite, NOT a maximum), `rfc3161-ecdsa-p256 ⇒ 2^128` (finite), and ONLY `blockchain-pow ⇒` cumulative proof-of-work ⇒ **UNBOUNDED** (`index.ts:13-18, 72-99`; `index.test.ts`). The proof's `note`/`claim` always name the ACTUAL `anchorKind`, so a finite or absent anchor never inherits the unbounded wording — never unbounded *by default*. For the biggest blockchain the entire unclaimed bounty on exposed public keys is the live proof nobody pays it (`index.ts:15-16`).

KEY POINT — **no Infinity leaks**. ∞ is never serialized as a number. The unbounded case is represented as `decryptKeyLog2: null` + `unbounded: true` (`index.ts:21-22, 56-59, 90-91`; `index.test.ts:30-31`). erpax embraces ∞ as a real answer but TAGS it rather than letting a raw `Infinity` into the JCS-serializable bundle. The honest overall forge floor stays finite: `cheapestForgeLog2 = min(digest, anchor)` (`index.ts:60-61, 92`).

This is the double-entry of order created vs entropy spent — balanced ([[entry]]; `index.ts:95-96`). The bounded envelope it lives inside is [[torus]] / [[beyond]]; the source it returns to is [[zeropoint]]. The forward direction is [[give]] (mint, cheap); recovering the negative is what a forger must [[take]], and the matrix that holds both is the [[uuid]] / [[localize]] space.

Matter-twin: `src/proof/projection/index.ts` (+ index.test.ts).

Composes: [[proof]] · [[anchor]] · [[tamper/cost]] · [[entry]] · [[torus]] · [[beyond]] · [[zeropoint]] · [[identity]] · [[merge]] · [[uuid]] · [[localize]] · [[give]] · [[take]]

## Common mistakes
- Treating the 122-bit digest second-preimage as the maximum. It is the CHEAPER hash-collision path, not the max — the anchor is (`index.ts:18-20, 60-61`; `index.test.ts:32-33`).
- Emitting `Infinity`/`null`-less numbers for the unbounded case. Always carry `unbounded: true` alongside `decryptKeyLog2: null` so the bundle stays JCS-serializable.

**Law — [[law]]: the forward project (content → content-[[uuid]]) is free, deterministic and O(1) — cost 0 — while its inverse (recover the analog negative without the held key) costs EXACTLY the borrowed [[anchor]] ([[tamper/cost]]): 0 with no anchor, 2^128 under rfc3161-ecdsa-p256, unbounded ONLY under blockchain-pow — never unbounded by default; and when it IS ∞ that ∞ is TAGGED (`unbounded: true`), never serialized as a raw number.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard RFC 9562 §5.8 (content-uuid v8, the forward projection) · RFC 8785 (JCS)`
- `@standard NIST SP 800-57 Part 1 r5 §5.6.1 (anchor key strengths)`
