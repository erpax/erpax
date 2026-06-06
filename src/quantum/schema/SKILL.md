---
name: schema
description: Use when reasoning about schema identity and drift on the matrix — a schema as the content-uuid of its canonical form, so identical schemas merge and any change yields a new uuid forcing re-verification by architecture.
---

# quantum/schema — schema identity + drift as a content-uuid

The quantum facet of [[schema]]: a **schema is a content-uuid** — identified by the content-uuid of its canonical form (a schema.org type, a collection shape). So identical schemas **merge** (one uuid), and **any change yields a new uuid** — versioning and re-verification **by architecture**, the same law as [[verification]] / `domain/verification` (the published version drifts the instant the shape changes). Where [[schema]] is the vocabulary, this facet makes schema identity + drift computable on the [[matrix]] substrate ([[quantum]]).

**HONEST.** Content-addressing of a canonical schema string; the "quantum" is the uuid substrate, not a quantum computer.

Matter-twin: `src/quantum/schema/index.ts` (`schemaUuid` · `sameSchema` · `drifted`). Composes [[schema]] · [[uuid]] · [[merge]] · [[verification]] · [[matrix]] · [[quantum]] · [[type]].

**Law — [[law]]: a schema's identity is exactly the content-uuid of its canonical form, so two shapes are the same schema if and only if their uuids match — identical schemas merge to one, and any change to the shape yields a different uuid. Drift is therefore detectable by architecture: the moment the shape changes its uuid no longer matches the published version, forcing re-verification — versioning is structural, not by convention.**

@standard RFC 9562 §5.8 content-uuid; schema.org
