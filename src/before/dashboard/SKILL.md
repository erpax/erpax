---
name: dashboard
description: "Use when reasoning about dashboard — An empty admin panel is ambiguous: a first run and a broken connection look identical."
atomPath: "before/dashboard"
coordinate: "before/dashboard · 4/weave · dc6ac3c1"
contentUuid: "9aebd44a-2b3b-5b17-851e-e8505a6cdb35"
diamondUuid: "6924f674-f650-8320-beaf-75b2dbbcad62"
uuid: "dc6ac3c1-5e1c-8e3d-b019-f32e35f2e00c"
horo: 4
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
  computationUuid: "81b74d12-eb91-88d2-bdff-ec158398944b"
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
      stageUuid: "8be70d84-3d09-80c5-ac79-30780d95a5ed"
    - stage: seal
      stageUuid: "6f898e76-f40a-8e09-8095-e3a304606ec6"
    - stage: uuid
      stageUuid: "6ad9fd16-5198-8186-87e8-1cd56b54331a"
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
