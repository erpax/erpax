---
name: bar
description: "Use when reasoning about bar — renders the strip a logged-in editor sees over public pages: the collection and document being viewed, and the link back into the admin panel that edits it."
atomPath: "admin/bar"
coordinate: "admin/bar · 4/weave · 888a2079"
contentUuid: "2966e805-be3b-5249-a764-d30232f2d246"
diamondUuid: "da3dd992-2e05-8297-9059-5470346270f7"
uuid: "888a2079-2af7-8864-963a-ebc289537c9d"
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
  computationUuid: "32270c74-7b13-8a9f-8972-1454ea6ca340"
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
      stageUuid: "d303234b-0752-83f4-a144-6bf05d2d687c"
    - stage: seal
      stageUuid: "054d5b33-ab0b-8dc8-9cae-63a1281e00bb"
    - stage: uuid
      stageUuid: "3e69f08b-ff0d-8d92-bd44-a2ec9506168d"
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
