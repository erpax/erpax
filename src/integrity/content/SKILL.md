---
name: content
description: "Use when computing or verifying a content-uuid — computeContentUuid, verifyContentUuid, jcsCanonicalize, nameUuid and stripNonContentFields. Promoted from a stray content-uuid.ts at the integrity root to a one-word sub-atom whose only imports are node:crypto and @/uuid/format, which is what makes @/integrity/content a lawful cut point: storage/independence took computeContentUuid from the @/integrity barrel and inherited the corpus's largest import component with it."
atomPath: "integrity/content"
coordinate: "integrity/content · 7/descent · 5034d925"
contentUuid: "d344aed5-0654-5d54-bc79-4e97ea200e40"
diamondUuid: "ace6a71d-0e24-802c-a479-addc748c6c3f"
uuid: "5034d925-2b63-8430-b822-e71637d73001"
horo: 7
typography:
  partition: integrity
  bondDegree: 116
standards:
  - "ISO/IEC 10118 hash functions"
  - "NIST FIPS 180-4 SHA-256"
  - "NIST-FIPS-180-4"
  - RFC 8785 JSON Canonicalization Scheme (JCS)
  - "RFC 9562 §5.8 name-based UUID (version 8, custom layout)"
  - "RFC-8785"
  - "SOX §404 internal-controls (Byzantine tamper detection)"
bindings: []
signatures:
  computationUuid: "53144677-d33f-8185-8ebc-a2d248486866"
  stages:
    - stage: path
      stageUuid: "06d25631-2385-8a8a-8f36-7ea89993bf0d"
    - stage: trinity
      stageUuid: "5333bc47-7c3a-856d-8f3e-809d633fd051"
    - stage: boundary
      stageUuid: "f12c2cf3-ee26-8920-80fe-dccfb31b5ffc"
    - stage: links
      stageUuid: "9c5b48d1-b801-8a5e-901f-4f1554212b90"
    - stage: horo
      stageUuid: "de5a8a43-0bc3-8484-acc1-51e3fa2a286e"
    - stage: seal
      stageUuid: "4465e2c0-b654-8fbd-bcfc-3624f833d3d0"
    - stage: uuid
      stageUuid: "b2ec1f24-2b08-8b03-913a-f66b1b31e597"
version: 2
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
