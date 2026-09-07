---
name: face
description: "Use when a refactor moves matter between atoms — a split may relocate anything, but an atom that stops offering a name breaks every caller silently. Snapshot corpusFace before, compare after; a LOST name fails closed, a gained one is free. Replayed against the commit that split four concentration hubs, it catches the drop that commit made."
atomPath: "rules/face"
coordinate: "rules/face · 5/round · 67448e4e"
contentUuid: "51d8459e-ee1e-53b4-ae6c-9185b89fa737"
diamondUuid: "11b0dc83-cc68-8539-b5fd-0107ae8f23d6"
uuid: "67448e4e-b6fb-84ab-8aff-a9e55953121b"
horo: 5
typography:
  partition: rules
  bondDegree: 23
standards: []
bindings: []
signatures:
  computationUuid: "055c101e-a811-860b-985d-df0a84ddd765"
  stages:
    - stage: path
      stageUuid: "e4c83b30-fa59-8cfb-ad01-4e9410483904"
    - stage: trinity
      stageUuid: "474ae107-ddb5-8e64-9c0e-f8d39a3f6906"
    - stage: boundary
      stageUuid: "763c0b6f-3c8a-828d-84f5-878aad5f7f74"
    - stage: links
      stageUuid: "10dc000c-6382-8c2d-ba63-fd5440242f80"
    - stage: horo
      stageUuid: "738a7607-f260-8c06-8311-3b5d5badaba8"
    - stage: seal
      stageUuid: "30feaeea-246e-8afa-97f0-eb3219156c64"
    - stage: uuid
      stageUuid: "baa2aa49-fd34-8485-a7df-1918c1435feb"
version: 2
---
# rules/face — a refactor may move anything except a name

Four candidate gates for the facade-shadowing class were measured and **all four were
refuted**:

| candidate | result |
| --- | --- |
| same exported name in 2+ files | **156** — dominated by `POST` (Next's route convention) and per-atom `translations` |
| one barrel, one name, two diverged sources | **0** — TypeScript already rejects it |
| same name on two atom faces, diverged bodies | noise: `sameQuery` is `string` in one atom and `Select` in another, both correct |
| near-identical size, diverged body ("copy with a tweak") | refuted by reading the two candidates — both legitimate |

**Shadowing is not lexically decidable.** Two atoms may honestly export one word,
and no scan distinguishes that from a decoy — the same wall [[rules]]/collapse hit
deciding what two tables *mean*.

What **is** decidable is the consequence. A caller writes `import { X } from '@/a'`;
if `@/a` stops offering `X`, the caller breaks. So this gate measures the **face**, not
the name.

## The instrument

`corpusFace(cwd)` reads every atom's `index.ts` and returns what `@/atom` offers —
local declarations, `export default`, named re-exports, and transitively through
`export *`, resolved the way the bundler resolves (`./x` reaches `./x/index.ts`).
`faceLosses(before, after)` reports only **dropped** names; a gained one is free,
because an atom may always offer more. `assertFacePreserved` fails closed on any loss.

**A named re-export is verified, never trusted.** `exportedNames` resolves the target
and counts `export { X } from './y'` only when `y` actually binds `X` — counting it
unverified is precisely how a phantom reads as present. A specifier that cannot be
resolved (an external package) is trusted rather than invented against.

## Replayed against the regression it was built for

Snapshotting `967bc70a7` — *"split 4 concentration hubs into semantic children via
Facade pattern"* — against its own parent:

```
atoms with a face — before: 1206 · after: 1219
@/quantum/chat  lost 4: GATEWAY_BITS, crossStates, distributeToStates, referralsFor
```

**Honest boundary.** That commit is known to have produced **four** casualties, and this
gate catches **one** of them. An emptied child whose barrel still re-exports the same
names, and a symbol replaced by a same-named stub, both preserve the face exactly —
this proves a name is still **offered**, never that it still **means** what it did. It
closes the silent-drop door, which is the one that was standing open; the rest is a
per-case read. Zero is a theorem here, not a ratchet: there is no acceptable number of
names an atom may quietly stop offering.

**Law — [[law]]: a refactor may move matter anywhere, and may add to a face freely, but
it may never quietly take a name away. Snapshot the face before, compare after — a lost
name is a broken caller that nothing else will report.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: a change is safe when its interface is preserved.
- **ISO/IEC 25010:2023 §5.3** — compatibility: a consumer compiled against a face keeps working.

Composes: [[rules]] · [[syntax]] · [[scalpel]] · [[law]].
