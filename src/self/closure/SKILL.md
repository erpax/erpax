---
name: closure
description: "Use when an external dependency must fall back to erpax ITSELF — every external role (payment-provider, signing, notification, search, federation) has a registered internal provider that completes the operation when the external call fails (Conservation Law 53, withInternalFallback). The dependency graph terminates at erpax; everything falls back to the self."
atomPath: "self/closure"
coordinate: "self/closure · 2/share · 394c7e30"
contentUuid: "ad7c0219-d1fe-5fc6-b198-09e6ae69869e"
diamondUuid: "f9bfe66c-fcb8-8858-8a6c-658a528da4ad"
uuid: "394c7e30-2815-85db-9c40-1896ed2db247"
horo: 2
typography:
  partition: self
  bondDegree: 19
standards:
  - "EU-2002/58"
  - "ISO 22301 business-continuity (BC-V tier — self-hosted continuity)"
  - "ISO 22301 business-continuity (BC-V tier — self-hosted continuity)`"
  - "ISO-22301:2019"
  - "ISO/IEC 25010:2023 §5.6.2 fault tolerance"
  - "ISO/IEC 25010:2023 §5.6.2 fault tolerance`"
  - "W3C-PROV-O"
  - eIDAS
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "9fbb979e-afab-8fe9-8623-84ebc0d22a7a"
  stages:
    - stage: path
      stageUuid: "bedeb085-e9ba-853f-bc7e-e57cb062a27a"
    - stage: trinity
      stageUuid: "6c49357f-7c9c-8a8e-bc67-500d7f256e57"
    - stage: boundary
      stageUuid: "2c797ff4-1ba1-87f8-955a-36d1b6dee4c6"
    - stage: links
      stageUuid: "c6ede3ff-aadf-85db-a3ef-6b48ddc74d5f"
    - stage: horo
      stageUuid: "1606cf0b-6b6a-8b9d-8755-4b2dc16162de"
    - stage: seal
      stageUuid: "476556eb-c74c-8b8e-a394-0c8dd2cd7070"
    - stage: uuid
      stageUuid: "b50fba43-e349-83da-a33e-54639a6229cc"
version: 2
---
# closure — everything falls back to erpax itself (under [[self]])

FORM: **erpax's dependency graph terminates at erpax.** `withInternalFallback` tries the external call first; on failure it routes to a registered internal [[provider]] and audits the event — so erpax stays functional with no external dependency (Conservation Law 53, self-referential closure). The `REGISTRY` is write-once (re-registration throws unless [[safety]]-mode test/dev), populated at module-load by `closure/provider/{federation,notification,search,signing}`. This is [[self]]-closure: every outward reach loops back to the root.

Double-entry ([[law]]): the external attempt (the debit) ⊕ the internal fallback (the credit) balance to a `FallbackOutcome`; the fallback is [[audit]]ed (the receipt), so a fallback is never silent.

Matter-twin: `src/self/closure/index.ts` (+ `types.ts`, `provider/`) — `withInternalFallback` · `registerInternalProvider` · `getInternalProvider` · `listRegisteredRoles`.
Composes: [[self]] · [[merge]] · [[provider]] · [[society]] · [[safety]] · [[audit]] · [[gate]] · [[law]] · [[proof]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 22301 business-continuity (BC-V tier — self-hosted continuity)`
- `@standard ISO/IEC 25010:2023 §5.6.2 fault tolerance`

- ISO 22301 business-continuity (self-hosted continuity); ISO/IEC 25010:2023 §5.6.2 fault tolerance
- Conservation Law 53 — self-referential-closure

## Common mistakes
- A role with no registered internal provider — the external error re-throws and the Law 53 boot invariant catches the missing coverage; every external role needs a fallback.
- Overriding a registered provider in production — re-registration throws unless `requireSafetyMode(['test','dev'])`; the registry is write-once for production safety.

**Law — [[gate]]** Every external role must have an internal fallback: the dependency graph terminates at erpax itself, or the closure invariant is red.
