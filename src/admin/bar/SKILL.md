---
name: bar
description: "Use when reasoning about bar — renders the strip a logged-in editor sees over public pages: the collection and document being viewed, and the link back into the admin panel that edits it."
atomPath: "admin/bar"
coordinate: "admin/bar · 4/weave · 751e7280"
contentUuid: "aee10210-7e88-54cc-a7dc-813120f4cf58"
diamondUuid: "eaff9a17-a41c-82b5-b4e0-bb2640145fad"
uuid: "751e7280-4a82-8dd2-ac12-d81ad0518930"
horo: 4
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
  computationUuid: "f5320151-fb61-85ab-9bc2-03e4c98371dd"
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
      stageUuid: "5d6055a5-cc77-881e-a61a-1845d8eb627a"
    - stage: seal
      stageUuid: "054d5b33-ab0b-8dc8-9cae-63a1281e00bb"
    - stage: uuid
      stageUuid: "97708a82-ac7c-8785-952f-d1d464190797"
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
