---
name: selector
description: "Use when reasoning about selector — The control that lets a person choose light, dark, or **auto**. Auto is not a synonym for the current system value: choosing it *clears* the stored preference, so the page follows…"
atomPath: "providers/theme/theme/selector"
coordinate: "providers/theme/theme/selector · 4/weave · efb352ba"
contentUuid: "b48a02a2-874f-58ee-95f2-fad26da349b8"
diamondUuid: "f61c10ac-6f3a-8828-b250-b2ad58bbd7b5"
uuid: "efb352ba-5159-848c-a87d-79668c31734c"
horo: 4
typography:
  partition: providers
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "1b21aa8b-c0fe-82f2-ab1c-86f38c6cd9a7"
  stages:
    - stage: path
      stageUuid: "06d95ead-6c3a-8002-a364-7d9bdb010a52"
    - stage: trinity
      stageUuid: "f2007d04-4859-8a3b-8bf7-d1c7f805fcba"
    - stage: boundary
      stageUuid: "606287ee-6992-80ab-ae04-f72997c27936"
    - stage: links
      stageUuid: "e3964405-7827-8e9b-843b-1e7de474d183"
    - stage: horo
      stageUuid: "d509dcf6-491f-8981-8c6f-25b0568134c8"
    - stage: seal
      stageUuid: "4f86d46a-b7d3-8f17-812b-00caeb67cce6"
    - stage: uuid
      stageUuid: "217a16c8-1bc4-8d8c-8766-aad86cc8a790"
version: 2
---
# providers/theme/theme/selector — three options, because "auto" is one of them

The control that lets a person choose light, dark, or **auto**. Auto is not a synonym for the current
system value: choosing it *clears* the stored preference, so the page follows the operating system
from then on, including when the OS switches at sunset.

That is why the handler special-cases it. `setTheme(null)` is the documented way to say "no
preference" (`providers/theme`), and mapping auto to `setTheme('light')` would look identical the
moment it was clicked and then silently stop tracking the system.

Its own `value` state exists because the three options are not the same set as the two themes: `auto`
must remain selected in the UI after the underlying theme resolves to light or dark, or the control
would appear to jump to a different answer than the one the user picked.

**Honest boundary.** This proves the mapping from each option to the provider call, and that auto is
distinct. It does not verify what the OS then reports — that is `prefers-color-scheme`, and
`providers/theme` owns the reading of it.

**Law — [[law]]: a control offering "automatic" must clear the preference, not copy the current
value. A copy looks correct at the instant it is chosen and stops following the system forever
after.**

## Standards

- **WCAG 2.2 §1.4.3 · §4.1.2** — contrast; name, role, value of the control.
- **CSS Media Queries Level 5** — `prefers-color-scheme`.

Composes: `providers/theme` · [[ui]] · [[law]].
