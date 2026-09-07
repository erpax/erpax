---
name: anchoring
description: "Use when periodically pinning a Merkle root of audit leaves to entropy no single party controls (Bitcoin OP_RETURN, an L2, Cardano metadata, AT-proto, or a real TSA) so a regulator can verify ERPax integrity without trusting ERPax — and when you must refuse a non-external stub as tamper-evidence."
atomPath: anchoring
coordinate: "anchoring · 7/descent · 9aa53569"
contentUuid: "c9c78a3f-37d6-5f3e-89d5-a71c2aa09351"
diamondUuid: "bd3cffb2-bdaf-810d-ab86-5a0274e2398e"
uuid: "9aa53569-d41e-814f-a0a4-a4480b7ed9ad"
horo: 7
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
  computationUuid: "9f7a4171-860d-8add-929e-c702761b95a6"
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
      stageUuid: "b4ea595f-cfa2-864b-ae6c-80cb4aafc314"
    - stage: seal
      stageUuid: "49ef4046-6840-83bc-8a17-047c570945d8"
    - stage: uuid
      stageUuid: "33e08b8a-e264-8a1b-bbac-6f8f7fef6110"
version: 2
---
# anchoring — blockchain/TSA anchoring (the one borrowed external entropy)

The anchor is the ONE external entropy a zero-entropy [[integrity]] store borrows: un-anchored, a writer can rewrite the deterministic whole for free, so a backend that does not pin to entropy no party controls is NOT tamper-evidence. `verifyAnchor().ok` is true only when the backend is external AND its receipt verifies; the bundled `NOTARY_STUB_BACKEND` (external: false) does an honest self-consistency check yet can never pass. Anchor leaves commit the FULL 256-bit content digest, never the truncated uuid, so the chosen-content collision floor is 2^128.

Matter-twin: `src/anchoring/index.ts` — `anchorLeaf` · `anchorRoot` · `verifyAnchor` · `listAnchors` · `isExternalAnchor` · `NOTARY_STUB_BACKEND`; types `ChainKind` · `AnchorReceipt` · `ChainBackend` · `AnchorVerification`. Pins the [[audit]] Merkle root via [[integrity]] `computeContentDigest`; the mandatory external entropy of [[tamper]]-[[cost]].

**Law — [[law]]: a backend that does not pin to entropy no party controls is not tamper-evidence — `verifyAnchor` passes only an external [[anchor]], never a stub, and the leaf commits the full content digest (2^128), never the uuid (2^53).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C Verifiable Credentials Data Model 2.0`
- `@standard ISO 19011:2018 §6.4.6 (third-party-verifiable audit trail)`
- `@standard RFC 3161 (TSA) · eIDAS (EU 910/2014) — the real external anchors`

Composes: [[seal]].
