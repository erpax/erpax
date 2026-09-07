---
name: bar
description: "Use when reasoning about bar — renders the strip a logged-in editor sees over public pages: the collection and document being viewed, and the link back into the admin panel that edits it."
atomPath: "admin/bar"
coordinate: "admin/bar · 2/share · 517a92ae"
contentUuid: "68229358-7dcf-5417-b6e4-8d0fe1ad68e9"
diamondUuid: "a133f242-2d8b-898c-9bb7-8315f5155dcb"
uuid: "517a92ae-26e1-899b-b4f9-6f9d96770a4d"
horo: 2
typography:
  partition: admin
  bondDegree: 19
standards:
  - "W3C HTML5 nav-element"
  - "W3C-HTML5"
  - "W3C-WAI-ARIA-1.2"
  - "WAI-ARIA 1.2 toolbar-role"
  - "WCAG-2.1 §2.4.1 bypass-blocks"
bindings: []
signatures:
  computationUuid: "42377e6e-5c15-80cc-a493-e07620b9035e"
  stages:
    - stage: path
      stageUuid: "ffb989f2-a9e2-87e6-8899-386a7fe087f7"
    - stage: trinity
      stageUuid: "444131c2-9993-81da-b0ac-2f0a45dfadb9"
    - stage: boundary
      stageUuid: "c67e6dd0-7958-8126-99d5-5768b9fad30a"
    - stage: links
      stageUuid: "5ab6be97-c12d-888f-9d11-91e3adf10b1c"
    - stage: horo
      stageUuid: "8ad8febd-fdac-82c8-95bd-ec952b0ec8a8"
    - stage: seal
      stageUuid: "054d5b33-ab0b-8dc8-9cae-63a1281e00bb"
    - stage: uuid
      stageUuid: "5ccc8ba8-94b4-8391-8590-634ea6d09e01"
version: 2
---
# admin/bar — the edit affordance the CMS owes an authenticated reader

`AdminBar` renders the strip a logged-in editor sees over public pages: the collection and
document being viewed, and the link back into the admin panel that edits it. It reads the
Payload auth state, so an anonymous reader is served the same page with nothing rendered.

It is a React barrel — `index.tsx`, never `index.ts`, because JSX cannot parse from one — and
its own stylesheet sits beside it rather than in a global sheet, so the strip cannot leak
styling onto the page it overlays.

Composes: [[law]].
