---
name: theme
description: "Use when reasoning about theme — A theme applied by React is applied *after* hydration, and hydration happens after first paint."
atomPath: "providers/theme/init/theme"
coordinate: "providers/theme/init/theme · 4/weave · bf8f027f"
contentUuid: "b1cc5a8d-9a6c-5160-aa85-d3f73d4ad349"
diamondUuid: "5d7c0460-22cb-807b-b928-d7f53b0b8c86"
uuid: "bf8f027f-9630-8920-8148-f2df57d49277"
horo: 4
typography:
  partition: providers
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "b2616fa9-001d-896b-b359-fbccb6a853a8"
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
      stageUuid: "0a5ecea4-fdbb-83c8-aa84-eb6575791f61"
    - stage: seal
      stageUuid: "d8f1ec46-728e-8125-a058-ac5cec1532d7"
    - stage: uuid
      stageUuid: "98beada5-c0ca-8599-9a86-6d43db8492d7"
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
