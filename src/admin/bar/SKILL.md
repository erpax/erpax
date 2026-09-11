---
name: bar
description: "Use when reasoning about bar — renders the strip a logged-in editor sees over public pages: the collection and document being viewed, and the link back into the admin panel that edits it."
atomPath: "admin/bar"
coordinate: "admin/bar · 2/share · aaa1edb0"
contentUuid: "e233da8c-2ba8-564e-92fe-caa1ba6eea95"
diamondUuid: "8ee56813-30b8-8145-909a-075a70352361"
uuid: "aaa1edb0-b975-82da-a94d-73298f67e813"
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
  computationUuid: "03951c59-4fec-8481-9e30-b3e790057388"
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
      stageUuid: "08d38d8a-54e1-8782-9621-cb7ebbbe61d1"
    - stage: seal
      stageUuid: "054d5b33-ab0b-8dc8-9cae-63a1281e00bb"
    - stage: uuid
      stageUuid: "7397e97c-fc10-8a87-86ed-3d1fa2aff1c5"
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
