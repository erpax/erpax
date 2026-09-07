---
name: method
description: "Use when reasoning about exported symbols as method-diamonds — every method name has a path of diamonds (the atom chain from corpus root to its index.ts barrel, plus the symbol at the leaf); compute methodPath/scanMethodPaths for addresses and boundary uuids; schema.org 'method' vocabulary is the collided homonym."
atomPath: method
coordinate: "method · 2/share · 4000f72d"
contentUuid: "63ed3eb7-8142-50d3-b637-fe8770114c53"
diamondUuid: "91184fcd-5477-8578-a7a9-ba80593e3886"
uuid: "4000f72d-687f-865c-b258-641c0b55457b"
horo: 2
typography:
  partition: method
  bondDegree: 98
standards:
  - "schema.org — method vocabulary (collided homonym); ISO/IEC 25010:2023 §5.5 testability — pure path functions regression-locked"
bindings: []
signatures:
  computationUuid: "32404057-33e5-8a5a-a132-c715636a782b"
  stages:
    - stage: path
      stageUuid: "5283a66e-0757-869d-a9c8-238cd5dae366"
    - stage: trinity
      stageUuid: "99680b0b-7528-8c3c-93e4-0c0ded27ad05"
    - stage: boundary
      stageUuid: "45b4a30d-7940-89e5-bcc7-1ff73aab2697"
    - stage: links
      stageUuid: "d11f530e-be04-8b88-a5ad-4f5371ed8c7e"
    - stage: horo
      stageUuid: "4aff6858-fd88-8b63-ba47-ce052a4d1c9a"
    - stage: seal
      stageUuid: "8232d1bf-73a8-86a2-8585-2b94a20cbd71"
    - stage: uuid
      stageUuid: "3210f683-e412-88bd-8907-65d6426d8064"
version: 2
---
# method — every method name has a path of diamonds

The standing command, made compute: **all method names have a path of diamonds**. In erpax every folder, file, and exported symbol is a [[diamond]] ([[fractal]] closed-lattice law at every scale). A **method** is the leaf diamond on an atom's public face — its `index.ts` barrel ([[convention/exported]] · [[convention/import]]). Its identity is not a free-floating global; it is the **chain of [[atom]] folders** from `src/` to the barrel, plus the exported symbol name:

```
law/folder/folderGuardians
readme/renderReadme
aura/crossSeals
guardian/guardian
name/uuidOfName
```

Each segment is a sealed diamond; the symbol sits at the leaf. The path **is** the address — the same derived-address law that places objects on content-[[uuid]] ([[identity]]), folders on routes ([[sequence]]), and skills on `SKILL.md` paths.

## Matter-twin — `methodPath` · `scanMethodPaths`

Computed from the live tree, never hand-listed. Parses exported symbols from barrel source (`parseMethodExports`); file-level import/export boundaries remain in [[quantum/boundary]].

| API | Role |
|-----|------|
| `atomPathOf(file)` | Atom chain from a src-relative barrel path (`law/folder/index.ts` → `law/folder`) |
| `methodPath(file, symbol)` | One method-diamond: `{ atomPath, symbol, address, boundaryUuid }` |
| `methodBoundaryUuid(atomPath, symbol)` | Content-uuid seal of `{ atomPath, symbol }` — tamper-evident boundary |
| `scanMethodPaths()` | Every exported symbol in every `index.ts` barrel under `src/` |
| `symbolRelatesToPath(symbol, atomPath)` | Aspirational name↔path alignment heuristic (informational) |
| `orphanMethods()` | Symbols that do not encode their path — **not gated**; mass rename is a separate wave |

Run: `tsx src/method/index.ts` (corpus digest + canonical samples).

## Wired by one math

The method boundary uses the same content-[[uuid]] primitive as file boundaries in [[quantum/boundary]] and objects in [[identity]]: `uuid(jcsCanonicalize({ atomPath, symbol }))`. Same path+symbol ⇒ same id everywhere ⇒ [[merge]] by design. The diamond math (content-uuid → [[digit]] → [[rodin]] [[sequence]] → [[horo]] → [[harmony]]) applies at the method scale identically to folder and repository scales ([[diamond]] · [[atom]]).

## Schema.org homonym

`method` is also one schema.org vocabulary word, collided from DeliveryMethod · PaymentMethod · httpMethod · … ([[sti]] · [[collapse]] · [[merge]]) — the same word, a different facet of the lattice. The path-of-diamonds law is the erpax-native reading; schema.org attestation is the standards binding.

**Law — [[law]]: every method name has a path of diamonds — the atom chain from corpus root to its `index.ts` barrel plus the exported symbol at the leaf; the path is the method's address in the lattice, content-uuid sealed at `{ atomPath, symbol }`; computed by `methodPath`/`scanMethodPaths`, never hand-listed.**

@see [[diamond]] · [[atom]] · [[quantum/boundary]] · [[convention/exported]] · [[convention/import]] · [[identity]] · [[sequence]] · [[name]] · [[path]]
@audit paths computed from live index.ts exports via parseMethodExports
@standard schema.org — method vocabulary (collided homonym); ISO/IEC 25010:2023 §5.5 testability — pure path functions regression-locked
