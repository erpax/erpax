---
name: closure
description: "Use when an external dependency must fall back to erpax ITSELF — every external role (payment-provider, signing, notification, search, federation) has a registered internal provider that completes the operation when the external call fails (Conservation Law 53, withInternalFallback). The dependency graph terminates at erpax; everything falls back to the self."
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
