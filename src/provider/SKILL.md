---
name: provider
description: "Use when wiring the app-wide React context tree — the one place theme, computed-CSS and header-theme providers wrap the frontend. A client provider is imported from its own module, never through a barrel that also exports Node fs matter: the @/css barrel exports computeCssDiamond, and pulling it into the browser chunk 500s the Worker homepage."
atomPath: provider
coordinate: "provider · 4/weave · 05768f19"
contentUuid: "9416fcb4-0b9c-5d15-b538-15dc2a7790b7"
diamondUuid: "412a0084-2aa3-84ec-986f-0e3e4c500f82"
uuid: "05768f19-f813-8ef7-8f56-b4c816f3708b"
horo: 4
typography:
  partition: provider
  bondDegree: 25
standards:
  - "W3C CSS-Color-4 color-contrast"
  - "WCAG-2.1 §1.4.11 non-text-contrast"
  - "WCAG-2.1 §1.4.3 contrast-minimum"
bindings: []
signatures:
  computationUuid: "f711d33b-fa3e-8313-8bb5-0e88f186528f"
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
      stageUuid: "c0122da6-f126-8e8a-b4f3-07331c17bc7d"
    - stage: seal
      stageUuid: "ee3d69b5-45e4-8f26-ac51-ff389e679984"
    - stage: uuid
      stageUuid: "35d3202c-7c61-833e-93aa-6ef3583ec1bf"
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
