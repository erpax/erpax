---
name: shred
description: Use when reconciling GDPR erasure with content-addressing — a content-uuid is f(content) and the chain needs the row, so you cannot delete. Crypto-shred = encrypt erasable fields per subject, and erasure = destroy the key (not the row). The row+uuid persist (chain/tamper-evidence intact), the plaintext is unrecoverable. Matter-twin shred/index.ts.
---

# shred — erase the content, never the record

The privacy frontier, and the one edge content-addressing must answer. A [[uuid]] is `f(content)` and the [[history]]/chain needs the row to stay — so a content-addressed store **cannot delete**: a row-delete breaks the chain and the tamper-evidence ([[tamper-cost]]). Yet GDPR Art.17 demands erasure. The reconciliation is **crypto-shred** (NIST SP 800-88 cryptographic erase):

- Wrap erasable fields in a **CipherEnvelope** (the uuid-format `ENCRYPTED` capability) keyed per subject.
- **Erasure = destroy the key**, not the row. The ciphertext + uuid persist; the plaintext is gone forever. You erase the **content**, never the **record**.

**The load-bearing invariant:** the content-uuid must be taken over the **envelope** (ciphertext + keyId), *never* the plaintext — else destroying the key would change the recomputed uuid and **break the chain**. `erase()` refuses unless this holds. So shred is the rare move that *removes* information while *preserving* integrity: the row stays merge-able ([[merge]]: same envelope ⇒ same uuid), the chain stays verifiable, and the subject's data is irrecoverable. The lifecycle is one-way — plaintext → encrypted → shredded — a [[close]] that never re-[[open]]s ([[end]]).

This is the [[duality]] of transparency↔confidentiality resolved: the system is integrity-transparent (the uuid is public) *and* content-confidential (the plaintext is shred-able). Where the [[tamper-cost]] makes the record un-forgeable, shred makes the content un-recoverable — both by the same content-addressing.

Matter-twin: `shred/index.ts` (`erase`/`canTransition`/`shredPreservesChain`) + `index.test.ts` (the proof). The cited law must be true ([[standard]] GDPR Art.17, NIST SP 800-88). Composes: [[uuid]] · [[identity]] · [[tamper-cost]] · [[history]] · [[merge]] · [[close]] · [[end]] · [[duality]] · [[standard]].
