---
name: closure
description: "Use when an external dependency must fall back to erpax ITSELF — every external role (payment-provider, signing, notification, search, federation) has a registered internal provider that completes the operation when the external call fails (Conservation Law 53, withInternalFallback). The dependency graph terminates at erpax; everything falls back to the self."
atomPath: "self/closure"
coordinate: "self/closure · 1/base · 2be0ec14"
contentUuid: "25f5ae5e-09f1-5bd7-b5f4-057e2e1da716"
diamondUuid: "31c77916-7859-8dc9-a1c6-7d4927801e02"
uuid: "2be0ec14-cf31-8a1d-add2-213b7190524c"
horo: 1
typography:
  partition: self
  bondDegree: 0
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
  computationUuid: "09350ba9-87a4-8ea3-a074-31bd5fe50b94"
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
      stageUuid: "6115443c-67a0-8a70-9de6-b8d2cac6afc5"
    - stage: seal
      stageUuid: "3fa7438a-5a1b-8cd4-8ae3-63ef9cc959cb"
    - stage: uuid
      stageUuid: "e501a320-0e43-8352-966a-87b04c33e4b4"
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
