---
name: content
description: "Use when computing or verifying a content-uuid — computeContentUuid, verifyContentUuid, jcsCanonicalize, nameUuid and stripNonContentFields. Promoted from a stray content-uuid.ts at the integrity root to a one-word sub-atom whose only imports are node:crypto and @/uuid/format, which is what makes @/integrity/content a lawful cut point: storage/independence took computeContentUuid from the @/integrity barrel and inherited the corpus's largest import component with it."
atomPath: "integrity/content"
---

# integrity/content — the content-uuid, addressable on its own

An object's id is the SHA of its content, so any in-place edit recomputes to a different uuid. That is Conservation Law 8, and it is the primitive the whole corpus reads.

Which is exactly why its **address** mattered. It lived as `content-uuid.ts` at the [[integrity]] root, so the only way to reach it was the `@/integrity` barrel — and that barrel is inside the corpus's largest import component. `storage/independence` needed one function, `computeContentUuid`, and inherited the tangle.

Its own imports are `node:crypto` and `@/uuid/format`, neither in the component. Promoting it to a sub-atom made the same binding reachable without the barrel:

```
@/integrity          → inside the 249-file SCC
@/integrity/content  → a leaf; the same computeContentUuid, no edge
```

Three gates agree on the move: the cycle law (the edge goes), [[convention]]/import (a sub-atom directory is lawful where a bare `.ts` file would be a deep import), and `stray-ts` (two fewer files at the atom root). `@/integrity` re-exports everything, so no existing reader changed.

**Honest boundary.** This is an addressing change, not a change to the hash: same JCS canonicalization, same SHA-256, same uuidv8 layout, and the moved proofs pass unchanged. Making a primitive reachable is not the same as making it correct — [[integrity]] still owns that claim.

**Law — [[law]]: a primitive the whole corpus depends on must be addressable without depending on the whole corpus.**

Composes: [[integrity]] · [[uuid]] · [[storage]] · [[rules]]/cycle · [[law]].
