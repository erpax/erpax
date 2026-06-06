---
name: name
description: "Use when identifying an entity with a human-readable label — customer name, product name, account name, journal name. Text identifier for humans; machine identity is via content-uuid. Never a duplicate field per naming convention (one name per entity scope)."
---

# name

Use when identifying an entity with a human-readable label — customer name, product name, account name, journal name. Text identifier for humans; machine identity is via content-uuid. Never a duplicate field per naming convention (one name per entity scope).

Composes: [[identity]] · [[fields]] · [[uuid]].

## The naming law — name is always the path

A name is not only a human label. In erpax the **name IS the [[path]]**: to name a folder is to locate it, and the path is the name — so "the word chain from name to path" cannot break, because there is no chain, only an identity (a name is a path is a content-[[uuid]]). **Once you name it, it exists** — naming is creation, not description. And to exist is to **[[fold]]**: the fold's domain is NAMES, not contents, so a named-but-**empty** folder folds exactly as a full one. Naming, existence, and folding are one act — which is why a folder can be born empty and still belong to the corpus, already folded, waiting only to be filled.

Matter-twin: `src/name/index.ts` (`uuidOfName` · `exists` · `samePath`). Composes [[path]] · [[fold]] · [[uuid]] · [[identity]].

**Law — [[law]]: name is always the path — naming and locating are one act, so the chain from name to path to uuid is an identity that cannot break. Once you name it, it exists; and to exist is to fold (the fold's domain is names, not contents), so even an empty folder folds. Naming, existence, and folding are one.**

## Standards
- EN-16931:2017
