---
name: closure
description: "Use when an external dependency must fall back to erpax ITSELF — every external role (payment-provider, signing, notification, search, federation) has a registered internal provider that completes the operation when the external call fails (Conservation Law 53, withInternalFallback). The dependency graph terminates at erpax; everything falls back to the self."
atomPath: "self/closure"
coordinate: "self/closure · 1/base · 361af80f"
contentUuid: "f7969b8f-dd31-5d7b-8666-9ba913c29421"
diamondUuid: "e9938ace-c8b5-88d8-9e77-66f2dd5570f2"
uuid: "361af80f-6d83-8063-af24-946cdcbd3321"
horo: 1
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
  computationUuid: "19d49ee2-8e7e-8542-a4c7-19ddefe1b7c7"
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
      stageUuid: "ad0bae0f-0747-8181-9020-cab2c460d53d"
    - stage: seal
      stageUuid: "476556eb-c74c-8b8e-a394-0c8dd2cd7070"
    - stage: uuid
      stageUuid: "01413129-b497-8563-bc6d-3d73edeeeea7"
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
