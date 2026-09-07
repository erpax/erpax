---
name: theme
description: "Use when reasoning about theme — A theme applied by React is applied *after* hydration, and hydration happens after first paint."
atomPath: "providers/theme/init/theme"
coordinate: "providers/theme/init/theme · 1/base · 2e2d95d7"
contentUuid: "0eb0e026-8ff0-5b04-82e8-fa4837783579"
diamondUuid: "1c7439ae-dd7a-8948-8b30-799e652a79a1"
uuid: "2e2d95d7-c805-8310-9d95-5a4725a6b003"
horo: 1
typography:
  partition: providers
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "31433b8a-a933-8510-be5e-108364412d1f"
  stages:
    - stage: path
      stageUuid: "46b4097c-bf4f-8a47-86df-c67f0c3b7585"
    - stage: trinity
      stageUuid: "7640957c-ab6b-85ca-b1bb-20fad6e2f195"
    - stage: boundary
      stageUuid: "c8670a06-1cbd-8034-ab71-a3d3f86acee9"
    - stage: links
      stageUuid: "1f9bce38-462e-8b15-a917-86a28b0f8f90"
    - stage: horo
      stageUuid: "f2f50c02-286c-8b8c-9d3c-f52c444aa4f8"
    - stage: seal
      stageUuid: "d8f1ec46-728e-8125-a058-ac5cec1532d7"
    - stage: uuid
      stageUuid: "465186cd-5173-8ff6-8fc5-41c9a73ae16c"
version: 2
---
# providers/theme/init/theme — the script that runs before the page is painted

A theme applied by React is applied *after* hydration, and hydration happens after first paint. On a
dark-themed page that produces the flash of white every user recognises and nobody can unsee.

The fix is a blocking `<script>` in the document head: it reads the stored preference (or the system
one) and sets `data-theme` on `<html>` **before the browser paints anything**. Synchronous is the
point — an async or deferred script would run after the paint it exists to precede.

Two consequences follow, and both are in the code:

- The script's body is a **string**, not a component. It must run before React exists, so it cannot
  be React.
- It renders **only on the server**. React 19 warns when a `<script>` appears in a hydrating client
  tree, so the component returns `null` whenever `window` is defined — the guard is a correctness
  requirement, not a micro-optimisation.

**Honest boundary.** The proof asserts the server/client split and that the emitted script names the
storage key and the attribute the rest of the system reads. It cannot prove there is no flash: that
is a paint-timing property of a real browser, and no jsdom assertion reaches it.

**Law — [[law]]: state that must be true before the first paint is set before the first paint.
Anything React does happens after hydration, and after hydration is after the user has already seen
the wrong thing.**

## Standards

- **WHATWG HTML** — synchronous script execution and document ordering.
- **WCAG 2.2 §2.3.1** — three flashes: a full-page luminance flip is not benign.

Composes: `providers/theme` · [[law]].
