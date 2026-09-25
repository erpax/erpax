---
name: anchoring
description: "Use when periodically pinning a Merkle root of audit leaves to entropy no single party controls (Bitcoin OP_RETURN, an L2, Cardano metadata, AT-proto, or a real TSA) so a regulator can verify ERPax integrity without trusting ERPax — and when you must refuse a non-external stub as tamper-evidence."
atomPath: anchoring
coordinate: "anchoring · 8/crest · 4df0496d"
contentUuid: "713852c9-5e7e-5703-a605-30088fe9f3bd"
diamondUuid: "43078c0c-8158-8800-b0bd-3b60780e55d2"
uuid: "4df0496d-894e-8d3b-819e-d01c86f15e0b"
horo: 8
typography:
  partition: anchoring
  bondDegree: 21
standards:
  - "EU-537/2014"
  - "EU-910/2014"
  - "ISO 19011:2018 §6.4.6 (third-party-verifiable audit trail)"
  - "ISO 19011:2018 §6.4.6 (third-party-verifiable audit trail)`"
  - "ISO-19011"
  - "RFC 3161 (TSA) · eIDAS (EU 910/2014) — the real external anchors"
  - "RFC 3161 (TSA) · eIDAS (EU 910/2014) — the real external anchors`"
  - W3C Verifiable Credentials Data Model 2.0
  - "W3C Verifiable Credentials Data Model 2.0`"
  - "W3C-VC-2.0"
  - eIDAS
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "88abbbad-f2e4-826f-b582-6a76816cff7b"
  stages:
    - stage: path
      stageUuid: "63f36273-5705-8ddc-b213-153a26f34905"
    - stage: trinity
      stageUuid: "798977f5-070d-8938-ab4f-da464c308245"
    - stage: boundary
      stageUuid: "8b656b15-723f-8b85-a869-b20424bab41f"
    - stage: links
      stageUuid: "dea05a82-5e8a-8f64-8375-d5b0c353ecc7"
    - stage: horo
      stageUuid: "e40dae54-cf64-8531-9a50-a038e5d88ecc"
    - stage: seal
      stageUuid: "49ef4046-6840-83bc-8a17-047c570945d8"
    - stage: uuid
      stageUuid: "e17db1a9-3869-8beb-9b4e-08b191704394"
version: 2
---
# anchoring — blockchain/TSA anchoring (the one borrowed external entropy)

The anchor is the ONE external entropy a zero-entropy [[integrity]] store borrows: un-anchored, a writer can rewrite the deterministic whole for free, so a backend that does not pin to entropy no party controls is NOT tamper-evidence. `verifyAnchor().ok` is true only when the backend is external AND its receipt verifies; the bundled `NOTARY_STUB_BACKEND` (external: false) does an honest self-consistency check yet can never pass. Anchor leaves commit the FULL 256-bit content digest, never the truncated uuid, so the chosen-content collision floor is 2^128.

Matter-twin: `src/anchoring/index.ts` — `anchorLeaf` · `anchorRoot` · `verifyAnchor` · `listAnchors` · `isExternalAnchor` · `NOTARY_STUB_BACKEND`; types `ChainKind` · `AnchorReceipt` · `ChainBackend` · `AnchorVerification`. Pins the [[audit]] Merkle root via [[integrity]] `computeContentDigest`; the mandatory external entropy of [[tamper]]-[[cost]].

## The prose priced the anchor on a refuted constant

This atom's docstring said an anchor leaf must commit the full digest "NOT the truncated **106-bit**
uuid — else the chosen-content collision floor is **2^53**". Both numbers were wrong, and both came
from the same place: `ERPAX_DIGEST_BITS` was once a typed `106`, which [[cost]]/bits refuted by
measuring which bits are actually constant in a live content-uuid. The width is **122** — 128 less
the version nibble and the variant pair.

So every figure derived from 106 was wrong wherever it had been copied:

| stated | from | honest |
| --- | --- | --- |
| `2^53` chosen-content collision | 106 ÷ 2 | **2^61** |
| `2^35` quantum (BHT) floor | 106 ÷ 3 | **2^40** |

The error was **conservative** — it under-claimed erpax's own integrity — which is exactly why
nothing contradicted it: a pessimistic figure still prescribes the right fix, so it led somewhere
sensible while being false. That is the same shape [[cost]]/bits records twice about itself, and it
had spread here and into [[analytics]]'s runtime advice string.

**The heal is the formula, not a corrected number.** The docstrings and the advice now name
`birthdayLog2(ERPAX_DIGEST_BITS)` and `bhtCollisionLog2(ERPAX_DIGEST_BITS)` and interpolate what
they return, so there is no output left to go stale — and a test asserts the refuted figures cannot
return to either source. Correcting `53` to `61` by hand would have produced another number waiting
to rot.

The same edit repointed two references into the dissolved `services/` tree ([[rules]]/reference).

**Law — [[law]]: a backend that does not pin to entropy no party controls is not tamper-evidence — `verifyAnchor` passes only an external [[anchor]], never a stub, and the leaf commits the full content digest (2^128), never the uuid (2^53).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C Verifiable Credentials Data Model 2.0`
- `@standard ISO 19011:2018 §6.4.6 (third-party-verifiable audit trail)`
- `@standard RFC 3161 (TSA) · eIDAS (EU 910/2014) — the real external anchors`

Composes: [[seal]].
