---
name: method
description: "Use when reasoning about exported symbols as method-diamonds — every method name has a path of diamonds (the atom chain from corpus root to its index.ts barrel, plus the symbol at the leaf); compute methodPath/scanMethodPaths for addresses and boundary uuids; schema.org 'method' vocabulary is the collided homonym."
atomPath: method
coordinate: method · 7/descent · ac66b9bd
contentUuid: "8ff86543-a1c9-5557-8ede-1733a66bdd67"
diamondUuid: "b39303cd-8e40-8465-a040-4c5cb0580c6b"
uuid: "ac66b9bd-4678-8e5c-8c50-3b54592d436c"
horo: 7
bonds:
  in:
    - accepted
    - applies
    - atom
    - available
    - boundary
    - collapse
    - cooking
    - delivery
    - diamond
    - digit
    - enum
    - enumeration
    - exported
    - fractal
    - harmony
    - has
    - horo
    - http
    - identity
    - import
    - law
    - measurement
    - merge
    - name
    - path
    - return
    - rodin
    - sequence
    - sti
    - transmission
    - uuid
  out:
    - accepted
    - applies
    - atom
    - available
    - boundary
    - collapse
    - cooking
    - delivery
    - diamond
    - digit
    - enum
    - enumeration
    - exported
    - fractal
    - harmony
    - has
    - horo
    - http
    - identity
    - import
    - law
    - measurement
    - merge
    - name
    - path
    - return
    - rodin
    - sequence
    - sti
    - transmission
    - uuid
typography:
  partition: method
  bondDegree: 98
  neighbors:
    - diamond
    - quantum/boundary
    - tamper/import
standards:
  - paths computed from live index.ts exports via parseMethodExports
  - "paths computed from live index.ts exports; never hand-listed"
  - "schema.org — method vocabulary (collided homonym); ISO/IEC 25010:2023 §5.5 testability — pure path functions regression-locked"
bindings: []
neighbors:
  wikilink:
    - atom
    - boundary
    - collapse
    - diamond
    - digit
    - exported
    - fractal
    - harmony
    - horo
    - identity
    - import
    - law
    - merge
    - name
    - path
    - rodin
    - sequence
    - sti
    - uuid
  matrix:
    - accepted
    - applies
    - atom
    - available
    - boundary
    - collapse
    - cooking
    - delivery
    - diamond
    - digit
    - enum
    - enumeration
    - exported
    - fractal
    - harmony
    - has
    - horo
    - http
    - identity
    - import
    - law
    - measurement
    - merge
    - name
    - path
    - return
    - rodin
    - sequence
    - sti
    - transmission
    - uuid
  backlinks:
    - accepted
    - applies
    - atom
    - available
    - boundary
    - collapse
    - cooking
    - delivery
    - diamond
    - digit
    - enum
    - enumeration
    - exported
    - fractal
    - harmony
    - has
    - horo
    - http
    - identity
    - import
    - law
    - measurement
    - merge
    - name
    - path
    - return
    - rodin
    - sequence
    - sti
    - transmission
    - uuid
signatures:
  computationUuid: "e019a999-9404-8c93-850a-79714d05b163"
  stages:
    - stage: path
      stageUuid: "5283a66e-0757-869d-a9c8-238cd5dae366"
    - stage: trinity
      stageUuid: "99680b0b-7528-8c3c-93e4-0c0ded27ad05"
    - stage: boundary
      stageUuid: "f1c2b0d6-697e-88ee-92a9-b76a1e0adc45"
    - stage: links
      stageUuid: "d11f530e-be04-8b88-a5ad-4f5371ed8c7e"
    - stage: horo
      stageUuid: "fd854475-fcba-8896-84ea-34dedc6663fd"
    - stage: seal
      stageUuid: "03b6ac52-5da4-87a2-bb42-f08d8e6d80bc"
    - stage: uuid
      stageUuid: "d4bb1b73-e45a-8682-a23a-8ffd687bf70e"
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
