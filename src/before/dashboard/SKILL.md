---
name: dashboard
description: "Use when reasoning about dashboard — An empty admin panel is ambiguous: a first run and a broken connection look identical."
atomPath: "before/dashboard"
coordinate: "before/dashboard · 8/crest · 0d405879"
contentUuid: "23c12ca7-d631-5602-b6ce-a06cbb701b03"
diamondUuid: "e6ff378c-66fd-815f-8fd1-aaf990d038d2"
uuid: "0d405879-5a1d-8147-829c-a8a4f44ca9f7"
horo: 8
typography:
  partition: before
  bondDegree: 46
standards:
  - "BCP-47"
  - "BCP-47 language-tag"
  - "W3C-WAI-ARIA-1.2"
  - "WAI-ARIA 1.2 status-role"
  - "WCAG-2.1 §1.4.3 contrast-minimum"
bindings: []
signatures:
  computationUuid: "b3321015-97f4-82bc-953f-f8918a01cd8e"
  stages:
    - stage: path
      stageUuid: "347cb454-ecf4-88a0-89ff-4f8760617c17"
    - stage: trinity
      stageUuid: "8a522a13-c578-866d-bfb0-2843a63a65fb"
    - stage: boundary
      stageUuid: "b433a866-570b-8524-aa03-7e8243242f8b"
    - stage: links
      stageUuid: "b92dd72b-318b-872b-8fdc-b217d748eb73"
    - stage: horo
      stageUuid: "b0dd9628-739d-89f7-b0af-518a9a394366"
    - stage: seal
      stageUuid: "6f898e76-f40a-8e09-8095-e3a304606ec6"
    - stage: uuid
      stageUuid: "9f12c025-f9e8-87a1-97f7-9825ca43408a"
version: 2
---
# before/dashboard — the first-run prompt that must not be mistaken for an error

An empty admin panel is ambiguous: a first run and a broken connection look identical. This banner
resolves it — it appears above the dashboard on a fresh install and offers the seed action.

It is a **status**, not an alert. WAI-ARIA gives `role="status"` an implicit `aria-live="polite"`,
which announces the message when the user next pauses rather than interrupting them, and that is the
right register for "your database is empty and here is how to fill it". An alert would say something
went wrong; nothing has.

**Honest boundary.** This atom is the prompt and the copy. The action belongs to
[[before]]/dashboard/seed/button, and whether seeding is safe against existing data is that atom's
claim, not this one's.

**Law — [[law]]: an empty state is explained, and explained in the right register. Silence reads as
breakage, and an alert for a normal condition trains the user to dismiss alerts.**

## Standards

- **WAI-ARIA 1.2** — the `status` role and its polite live region.
- **WCAG 2.2 §1.4.3** — contrast minimum.
- **BCP 47** — language tags on the translated copy.

Composes: [[before]] · [[law]].
