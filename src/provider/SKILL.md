---
name: provider
description: "Use when wiring the app-wide React context tree — the one place theme, computed-CSS and header-theme providers wrap the frontend. A client provider is imported from its own module, never through a barrel that also exports Node fs matter: the @/css barrel exports computeCssDiamond, and pulling it into the browser chunk 500s the Worker homepage."
atomPath: provider
coordinate: "provider · 5/round · ff017cd1"
contentUuid: "f847e212-9d11-5dab-bd9f-7ae1df03d75d"
diamondUuid: "c54057cb-d65e-85fa-9d99-532834ba59d2"
uuid: "ff017cd1-5cd4-8a0b-83d7-8b47e1fe30ca"
horo: 5
typography:
  partition: provider
  bondDegree: 0
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "0d4fa343-b23a-8e4f-8ad2-f4fe2ac3224a"
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
      stageUuid: "49ce8e48-5d10-8a4d-8508-0001d90fcdcd"
    - stage: seal
      stageUuid: "6e502971-cd42-8487-8763-34ce65259739"
    - stage: uuid
      stageUuid: "500773bc-3725-89d7-a56d-6b10fb7742bb"
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
