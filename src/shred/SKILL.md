---
name: shred
description: "Use when reconciling GDPR erasure with content-addressing — a content-uuid is f(content) and the chain needs the row, so you cannot delete. Crypto-shred = encrypt erasable fields per subject, and erasure = destroy the key (not the row). The row+uuid persist (chain/tamper-evidence intact), the plaintext is unrecoverable. Matter-twin shred/index.ts."
atomPath: shred
coordinate: "shred · 1/base · 4caf608f"
contentUuid: "5674166c-8329-5d66-b52b-bd19af99daca"
diamondUuid: "49a0dd13-a55b-8b80-976f-60b91cdf7e94"
uuid: "4caf608f-1bbb-8891-a310-202451531c10"
horo: 1
typography:
  partition: shred
  bondDegree: 43
standards:
  - "GDPR (EU 2016/679) Art.17 (erasure) · Art.5(1)(c) (minimisation) · Art.25 (by design)"
  - "GDPR (EU 2016/679) Art.17 (erasure) · Art.5(1)(c) (minimisation) · Art.25 (by design)`"
  - "NIST SP 800-88 r1 §2.5 (cryptographic erase as sanitisation)"
  - "NIST SP 800-88 r1 §2.5 (cryptographic erase as sanitisation)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f15f5614-0a92-811e-8a8e-e4b58a571d56"
  stages:
    - stage: path
      stageUuid: "398f15aa-e355-871e-8460-26a85d01aaeb"
    - stage: trinity
      stageUuid: "f33c284e-5c2b-81ba-be5d-77d768cb60ea"
    - stage: boundary
      stageUuid: "c56aee5e-318c-8367-80e2-fe2cb1182dea"
    - stage: links
      stageUuid: "402c223d-a295-8d2d-9290-eaaaf12454bf"
    - stage: horo
      stageUuid: "89eb0ba2-001a-88c8-9bbe-e75add86072e"
    - stage: seal
      stageUuid: "5c0109b8-0d9c-8ac0-b71d-6226a0911dc6"
    - stage: uuid
      stageUuid: "59c4187c-3a34-8230-91d0-41b59647ae07"
version: 2
---
# shred — erase the content, never the record

The privacy frontier, and the one edge content-addressing must answer. A [[uuid]] is `f(content)` and the [[history]]/chain needs the row to stay — so a content-addressed store **cannot delete**: a row-delete breaks the chain and the tamper-evidence ([[tamper/cost]]). Yet GDPR Art.17 demands erasure. The reconciliation is **crypto-shred** (NIST SP 800-88 cryptographic erase):

- Wrap erasable fields in a **CipherEnvelope** (the uuid-format `ENCRYPTED` capability) keyed per subject.
- **Erasure = destroy the key**, not the row. The ciphertext + uuid persist; the plaintext is gone forever. You erase the **content**, never the **record**.

**The load-bearing invariant:** the content-uuid must be taken over the **envelope** (ciphertext + keyId), *never* the plaintext — else destroying the key would change the recomputed uuid and **break the chain**. `erase()` refuses unless this holds. So shred is the rare move that *removes* information while *preserving* integrity: the row stays merge-able ([[merge]]: same envelope ⇒ same uuid), the chain stays verifiable, and the subject's data is irrecoverable. The lifecycle is one-way — plaintext → encrypted → shredded — a [[close]] that never re-[[open]]s ([[end]]).

This is the [[duality]] of transparency↔confidentiality resolved: the system is integrity-transparent (the uuid is public) *and* content-confidential (the plaintext is shred-able). Where the [[tamper/cost]] makes the record un-forgeable, shred makes the content un-recoverable — both by the same content-addressing.

Matter-twin: `shred/index.ts` (`erase`/`canTransition`/`shredPreservesChain`) + `index.test.ts` (the proof). The cited law must be true ([[standard]] GDPR Art.17, NIST SP 800-88). Composes: [[uuid]] · [[identity]] · [[tamper/cost]] · [[history]] · [[merge]] · [[close]] · [[end]] · [[duality]] · [[standard]] · [[data/subject/requests]].

**Law — [[law]]: erase the content, never the record — the content-[[uuid]] must be taken over the encrypted envelope (ciphertext + keyId), never the plaintext, so destroying the key makes the data irrecoverable while the row and chain stay verifiable ([[tamper/cost]]).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard GDPR (EU 2016/679) Art.17 (erasure) · Art.5(1)(c) (minimisation) · Art.25 (by design)`
- `@standard NIST SP 800-88 r1 §2.5 (cryptographic erase as sanitisation)`

- GDPR (EU 2016/679) Art.17 (erasure) · Art.5(1)(c) (minimisation) · Art.25 (by design)
- NIST SP 800-88 r1 §2.5 (cryptographic erase as sanitisation)
- Audit: content-uuid over the CipherEnvelope ⇒ shred preserves the chain (Law 8/55/60)
