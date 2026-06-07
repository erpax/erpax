---
name: anchoring
description: Use when periodically pinning a Merkle root of audit leaves to entropy no single party controls (Bitcoin OP_RETURN, an L2, Cardano metadata, AT-proto, or a real TSA) so a regulator can verify ERPax integrity without trusting ERPax — and when you must refuse a non-external stub as tamper-evidence.
---

# anchoring — blockchain/TSA anchoring (the one borrowed external entropy)

The anchor is the ONE external entropy a zero-entropy [[integrity]] store borrows: un-anchored, a writer can rewrite the deterministic whole for free, so a backend that does not pin to entropy no party controls is NOT tamper-evidence. `verifyAnchor().ok` is true only when the backend is external AND its receipt verifies; the bundled `NOTARY_STUB_BACKEND` (external: false) does an honest self-consistency check yet can never pass. Anchor leaves commit the FULL 256-bit content digest, never the truncated uuid, so the chosen-content collision floor is 2^128.

Matter-twin: `src/anchoring/index.ts` — `anchorLeaf` · `anchorRoot` · `verifyAnchor` · `listAnchors` · `isExternalAnchor` · `NOTARY_STUB_BACKEND`; types `ChainKind` · `AnchorReceipt` · `ChainBackend` · `AnchorVerification`. Pins the [[audit]] Merkle root via [[integrity]] `computeContentDigest`; the mandatory external entropy of [[tamper]]-[[cost]].

**Law — [[law]]: a backend that does not pin to entropy no party controls is not tamper-evidence — `verifyAnchor` passes only an external [[anchor]], never a stub, and the leaf commits the full content digest (2^128), never the uuid (2^53).**
