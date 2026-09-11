---
name: provider
description: "Use when wiring the app-wide React context tree — the one place theme, computed-CSS and header-theme providers wrap the frontend. A client provider is imported from its own module, never through a barrel that also exports Node fs matter: the @/css barrel exports computeCssDiamond, and pulling it into the browser chunk 500s the Worker homepage."
atomPath: provider
coordinate: "provider · 7/descent · e8e368ba"
contentUuid: "8d36f9ed-7b3b-51a9-8889-5347e7e92bdc"
diamondUuid: "79f1eef8-b2a3-80f9-9fa6-2a3479e0e201"
uuid: "e8e368ba-9ab2-86b8-907c-36961ad90caa"
horo: 7
typography:
  partition: provider
  bondDegree: 25
standards:
  - "W3C CSS-Color-4 color-contrast"
  - "WCAG-2.1 §1.4.11 non-text-contrast"
  - "WCAG-2.1 §1.4.3 contrast-minimum"
bindings: []
signatures:
  computationUuid: "1693b7ac-5006-86f9-94f6-810e0c50ba4a"
  stages:
    - stage: path
      stageUuid: "9c29ea83-d049-8973-bce9-f3345f8488ef"
    - stage: trinity
      stageUuid: "800b939e-ae2f-8391-854b-13a5899d3c25"
    - stage: boundary
      stageUuid: "2bd38a96-9075-8383-8e36-e620bd3abfe9"
    - stage: links
      stageUuid: "4f9fed48-6b8a-890e-8736-7a4b696f6f39"
    - stage: horo
      stageUuid: "43ef3ca2-6e2f-87ca-9a11-aa300315b65b"
    - stage: seal
      stageUuid: "ee3d69b5-45e4-8f26-ac51-ff389e679984"
    - stage: uuid
      stageUuid: "c7063e4e-51a5-89e4-8057-3874fa0fd1ef"
version: 2
---
# provider — a client provider is imported from its module, never through a barrel

The app-wide React context tree: `ThemeProvider` → `ComputedCssProvider` → `HeaderThemeProvider`,
with the toaster mounted inside. One place wraps the frontend, so a provider added anywhere else
is a second tree.

## The import that is deliberately not a barrel import

```ts
import { ComputedCssProvider } from '@/css/ComputedCssProvider'   // NOT from '@/css'
```

`@/css` also exports `computeCssDiamond` — the Node diamond/fs pipeline. A barrel is evaluated
whole, so importing the provider through it pulls `createRequire` and the seal into the **browser
chunk**, and the Worker homepage answers **500**. The deep import is the fix, and it is the one
place in this corpus where [[convention]]/import's barrel-only rule is knowingly traded against a
runtime that cannot load `node:fs`.

This SKILL previously described *"the service provider, service operator … the goods producer"* —
[[vocabulary]]/provider's schema.org term, byte-identical prose stamped on a React barrel. It was
found by content-addressing every stated law in the corpus and colliding them: 2,899 laws, 2,894
distinct, and this pair was one of the two collisions. **Nothing else could see it** — the file
compiled, the atom sealed, and the prose read as true from every seat.

**Honest boundary.** The proof beside this asserts the barrel is not imported *here*; it does not
prove the browser chunk is free of `node:fs` overall — that is a bundle property, and only a build
measures it. It closes the door that was open: this file silently reverting to the barrel import.

**Law — [[law]]: a module that runs in the browser imports the symbol it needs from the module
that defines it. A barrel is evaluated whole, so a barrel that also exports Node matter is a
server dependency wearing a client import — and the page 500s at runtime, not at build.**

## Standards

- **WCAG 2.1 §1.4.3 · §1.4.11** — the theme providers carry the contrast contract.
- **W3C CSS Color 4** — `color-contrast`.

Composes: [[css]] · [[convention]]/import · [[ui]] · [[law]].
