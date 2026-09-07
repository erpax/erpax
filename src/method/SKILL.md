---
name: method
description: "Use when reasoning about exported symbols as method-diamonds — every method name has a path of diamonds (the atom chain from corpus root to its index.ts barrel, plus the symbol at the leaf); compute methodPath/scanMethodPaths for addresses and boundary uuids; schema.org 'method' vocabulary is the collided homonym."
atomPath: method
coordinate: "method · 1/base · 44310a22"
contentUuid: "dfaffffa-7699-5b7f-9bfb-a1316877a5f3"
diamondUuid: "f93cd608-cf79-8092-bce7-c75ef3f7b6b6"
uuid: "44310a22-14a7-8a4c-99d7-cefca9e99de7"
horo: 1
typography:
  partition: method
  bondDegree: 98
standards:
  - "schema.org — method vocabulary (collided homonym); ISO/IEC 25010:2023 §5.5 testability — pure path functions regression-locked"
bindings: []
signatures:
  computationUuid: "cb4a225e-973d-8b80-8435-b5779b3dbc96"
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
      stageUuid: "14d84ae0-573f-8035-a8c2-2a0e28a47cb5"
    - stage: seal
      stageUuid: "8232d1bf-73a8-86a2-8585-2b94a20cbd71"
    - stage: uuid
      stageUuid: "fe5f0703-db10-8996-87a8-ac8f5d51ada5"
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
