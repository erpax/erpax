---
name: anchoring
description: "Use when periodically pinning a Merkle root of audit leaves to entropy no single party controls (Bitcoin OP_RETURN, an L2, Cardano metadata, AT-proto, or a real TSA) so a regulator can verify ERPax integrity without trusting ERPax — and when you must refuse a non-external stub as tamper-evidence."
atomPath: anchoring
coordinate: anchoring · 8/crest · 297e937e
contentUuid: "a9b2dce8-c90c-5050-97c2-ba2463692cab"
diamondUuid: "295512d8-ddd9-8fbc-949e-01093fd743a6"
uuid: "297e937e-6c67-883b-8501-816d66c34d19"
horo: 8
bonds:
  in:
    - anchor
    - audit
    - cost
    - integrity
    - law
    - tamper
  out:
    - anchor
    - audit
    - cost
    - integrity
    - law
    - tamper
typography:
  partition: anchoring
  bondDegree: 18
  neighbors: []
standards:
  - Conservation Law 55/62 (tamper cost; the anchor is mandatory external entropy)
  - "EU-2014/55"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "EU-537/2014"
  - "EU-910/2014"
  - "ISO 19011:2018 §6.4.6 (third-party-verifiable audit trail)"
  - "ISO-19011"
  - RFC 3161 (TSA) · eIDAS (EU 910/2014) — the real external anchors
  - W3C Verifiable Credentials Data Model 2.0
  - "W3C-VC-2.0"
  - eIDAS
bindings: []
neighbors:
  wikilink:
    - anchor
    - audit
    - cost
    - integrity
    - law
    - tamper
  matrix:
    - anchor
    - audit
    - cost
    - integrity
    - law
    - tamper
  backlinks:
    - anchor
    - audit
    - cost
    - integrity
    - law
    - tamper
signatures:
  computationUuid: "48ec7037-04d6-8e92-89d6-7aa73c97da16"
  stages:
    - stage: path
      stageUuid: "63f36273-5705-8ddc-b213-153a26f34905"
    - stage: trinity
      stageUuid: "798977f5-070d-8938-ab4f-da464c308245"
    - stage: boundary
      stageUuid: "8b656b15-723f-8b85-a869-b20424bab41f"
    - stage: links
      stageUuid: "b6682a0d-d0cb-8ffc-876e-288513b51ea8"
    - stage: horo
      stageUuid: "7ae8ce10-15b7-8b21-a36a-658b6532550c"
    - stage: seal
      stageUuid: "2918d93f-570a-883d-9e6b-fc9632f50a3b"
    - stage: uuid
      stageUuid: "4d886cba-73d5-8a75-a6c4-54a84d88eab6"
version: 2
---
# anchoring — blockchain/TSA anchoring (the one borrowed external entropy)

The anchor is the ONE external entropy a zero-entropy [[integrity]] store borrows: un-anchored, a writer can rewrite the deterministic whole for free, so a backend that does not pin to entropy no party controls is NOT tamper-evidence. `verifyAnchor().ok` is true only when the backend is external AND its receipt verifies; the bundled `NOTARY_STUB_BACKEND` (external: false) does an honest self-consistency check yet can never pass. Anchor leaves commit the FULL 256-bit content digest, never the truncated uuid, so the chosen-content collision floor is 2^128.

Matter-twin: `src/anchoring/index.ts` — `anchorLeaf` · `anchorRoot` · `verifyAnchor` · `listAnchors` · `isExternalAnchor` · `NOTARY_STUB_BACKEND`; types `ChainKind` · `AnchorReceipt` · `ChainBackend` · `AnchorVerification`. Pins the [[audit]] Merkle root via [[integrity]] `computeContentDigest`; the mandatory external entropy of [[tamper]]-[[cost]].

**Law — [[law]]: a backend that does not pin to entropy no party controls is not tamper-evidence — `verifyAnchor` passes only an external [[anchor]], never a stub, and the leaf commits the full content digest (2^128), never the uuid (2^53).**
