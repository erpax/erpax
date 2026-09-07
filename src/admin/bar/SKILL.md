---
name: bar
description: "Use when reasoning about bar — renders the strip a logged-in editor sees over public pages: the collection and document being viewed, and the link back into the admin panel that edits it."
atomPath: "admin/bar"
coordinate: "admin/bar · 2/share · 5fca7e74"
contentUuid: "3a2b11b9-2f85-5099-a912-7b6a0a617985"
diamondUuid: "791430eb-935b-85ef-b2e9-eb09f8a8495a"
uuid: "5fca7e74-de23-84b1-8bb7-58c891e447d4"
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
  computationUuid: "3ecc7b12-9cc7-8c3a-a546-b68a0d6a2c04"
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
      stageUuid: "ade327c5-380b-8c65-aa76-6671121a683c"
    - stage: seal
      stageUuid: "054d5b33-ab0b-8dc8-9cae-63a1281e00bb"
    - stage: uuid
      stageUuid: "72b15278-01e0-89e3-9731-aef23e5e38a3"
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
