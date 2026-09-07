---
name: anchoring
description: "Use when periodically pinning a Merkle root of audit leaves to entropy no single party controls (Bitcoin OP_RETURN, an L2, Cardano metadata, AT-proto, or a real TSA) so a regulator can verify ERPax integrity without trusting ERPax — and when you must refuse a non-external stub as tamper-evidence."
atomPath: anchoring
coordinate: "anchoring · 8/crest · 8fef25c8"
contentUuid: "a38ad2ba-c952-5278-af92-28714eac8135"
diamondUuid: "4a2febcc-49d6-8cd1-8b9d-baf902323ddd"
uuid: "8fef25c8-3b56-820d-854c-ff1ffc68e7c6"
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
  computationUuid: "df50e61a-0d9f-87d8-9178-b6769a09b0fd"
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
      stageUuid: "4c856ee4-6df0-8ff6-9617-904537cee906"
    - stage: seal
      stageUuid: "49ef4046-6840-83bc-8a17-047c570945d8"
    - stage: uuid
      stageUuid: "10418726-5f74-8b76-8b07-7ca60784833e"
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
