---
name: type
description: Use when reasoning about type identity on the matrix — a type as the content-uuid of its structural shape, so type-equality is uuid-equality (structural typing by content-addressing) and identical types merge.
---

# quantum/type — type identity as a content-uuid

The quantum facet of [[type]]: a **type is a content-uuid** — identified by the content-uuid of its structural shape. So **type-equality is uuid-equality** (structural typing by content-addressing): same shape ⇒ same type ⇒ they [[merge]]; a shape change yields a new uuid (tamper-evident by architecture). Where [[type]] is the data-type vocabulary, this facet makes type-identity computable on the [[matrix]] substrate ([[quantum]]).

**HONEST.** This is content-addressing of a canonical shape string — structural identity, not a type-theory proof.

Matter-twin: `src/quantum/type/index.ts` (`typeUuid` · `sameType`). Composes [[type]] · [[uuid]] · [[merge]] · [[matrix]] · [[quantum]] · [[schema]].

**Law — [[law]]: a type's identity is the content-uuid of its canonical structural shape and nothing else — so `sameType` reduces exactly to uuid-equality of those shapes (structural, not nominal: two shapes that print identically ARE the same type and merge), and any change to the shape, however small, yields a different uuid (the type is tamper-evident by construction, never by inspection).**

@standard RFC 9562 §5.8 content-uuid
