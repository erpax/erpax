---
name: closure
description: "Use when an external dependency must fall back to erpax ITSELF — every external role (payment-provider, signing, notification, search, federation) has a registered internal provider that completes the operation when the external call fails (Conservation Law 53, withInternalFallback). The dependency graph terminates at erpax; everything falls back to the self."
atomPath: self/closure
coordinate: self/closure · 8/crest · a3d84278
contentUuid: "a878abe5-4dc9-5f17-a0c1-3ad19d119d53"
diamondUuid: "ba4a394f-200f-8f3d-a4f5-384e55a51b4e"
uuid: "a3d84278-2b29-8acd-8027-b056ca853443"
horo: 8
bonds:
  in:
    - audit
    - gate
    - law
    - merge
    - proof
    - provider
    - safety
    - self
    - society
  out:
    - audit
    - gate
    - law
    - merge
    - proof
    - provider
    - safety
    - self
    - society
typography:
  partition: self
  bondDegree: 0
  neighbors: []
standards:
  - "Conservation Law 53 self-referential-closure"
  - "EU-2016/679"
  - "ISO 22301 business-continuity (BC-V tier — self-hosted continuity)"
  - "ISO-22301:2019"
  - "ISO/IEC 25010:2023 §5.6.2 fault tolerance"
  - "W3C-PROV-O"
  - eIDAS
bindings: []
neighbors:
  wikilink:
    - audit
    - gate
    - law
    - merge
    - proof
    - provider
    - safety
    - self
    - society
  matrix:
    - audit
    - gate
    - law
    - merge
    - proof
    - provider
    - safety
    - self
    - society
  backlinks:
    - audit
    - gate
    - law
    - merge
    - proof
    - provider
    - safety
    - self
    - society
signatures:
  computationUuid: "6fe0fb47-000b-8d12-a175-ecdbb255297f"
  stages:
    - stage: path
      stageUuid: "bedeb085-e9ba-853f-bc7e-e57cb062a27a"
    - stage: trinity
      stageUuid: "6c49357f-7c9c-8a8e-bc67-500d7f256e57"
    - stage: boundary
      stageUuid: "69b71af2-980e-8c31-87f4-1d79d1a45c1e"
    - stage: links
      stageUuid: "c6ede3ff-aadf-85db-a3ef-6b48ddc74d5f"
    - stage: horo
      stageUuid: "b0af7db5-dda9-8349-a9bf-b1f452ff7659"
    - stage: seal
      stageUuid: "3fa7438a-5a1b-8cd4-8ae3-63ef9cc959cb"
    - stage: uuid
      stageUuid: "35a76c59-82a0-817c-b7e1-b3f25508b0a9"
version: 2
---
# closure — everything falls back to erpax itself (under [[self]])

FORM: **erpax's dependency graph terminates at erpax.** `withInternalFallback` tries the external call first; on failure it routes to a registered internal [[provider]] and audits the event — so erpax stays functional with no external dependency (Conservation Law 53, self-referential closure). The `REGISTRY` is write-once (re-registration throws unless [[safety]]-mode test/dev), populated at module-load by `closure/provider/{federation,notification,search,signing}`. This is [[self]]-closure: every outward reach loops back to the root.

Double-entry ([[law]]): the external attempt (the debit) ⊕ the internal fallback (the credit) balance to a `FallbackOutcome`; the fallback is [[audit]]ed (the receipt), so a fallback is never silent.

Matter-twin: `src/self/closure/index.ts` (+ `types.ts`, `provider/`) — `withInternalFallback` · `registerInternalProvider` · `getInternalProvider` · `listRegisteredRoles`.
Composes: [[self]] · [[merge]] · [[provider]] · [[society]] · [[safety]] · [[audit]] · [[gate]] · [[law]] · [[proof]].

## Standards
- ISO 22301 business-continuity (self-hosted continuity); ISO/IEC 25010:2023 §5.6.2 fault tolerance
- Conservation Law 53 — self-referential-closure

## Common mistakes
- A role with no registered internal provider — the external error re-throws and the Law 53 boot invariant catches the missing coverage; every external role needs a fallback.
- Overriding a registered provider in production — re-registration throws unless `requireSafetyMode(['test','dev'])`; the registry is write-once for production safety.

**Law — [[gate]]** Every external role must have an internal fallback: the dependency graph terminates at erpax itself, or the closure invariant is red.
