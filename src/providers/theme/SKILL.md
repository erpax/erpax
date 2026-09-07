---
name: theme
description: "Use when reasoning about theme — Three states, not two. A theme can be **light**, **dark**, or **unset** — and unset does not mean a default was chosen, it means *follow the operating system*."
atomPath: "providers/theme"
coordinate: "providers/theme · 1/base · 7b6ba940"
contentUuid: "c8e43b25-dd18-5cb0-b066-df9a068f9195"
diamondUuid: "0cc310cf-b226-80ac-a827-1b2e9dbb55cc"
uuid: "7b6ba940-2354-8e3e-8cb4-8540669ccbd2"
horo: 1
typography:
  partition: providers
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "42166e64-6a12-8844-aaa9-c376129c0ca2"
  stages:
    - stage: path
      stageUuid: "1a1f5c26-a423-8173-9927-0eb15add61bd"
    - stage: trinity
      stageUuid: "f5df4b4b-c4f1-835f-8081-8285c982375b"
    - stage: boundary
      stageUuid: "7c05cd1e-7a40-8a1e-91f2-3bea21eef465"
    - stage: links
      stageUuid: "da4ff6b3-2588-88eb-9ba8-41839d1281e1"
    - stage: horo
      stageUuid: "ac517491-3cbd-8858-ae98-9d4e7c8b8516"
    - stage: seal
      stageUuid: "1068f131-71a0-81b7-bed7-d6159b8c3b08"
    - stage: uuid
      stageUuid: "2db0f077-7a1b-8c45-a2f0-34711639d91c"
version: 2
---
# providers/theme — null means "follow the system", and that is not the same as light

Three states, not two. A theme can be **light**, **dark**, or **unset** — and unset does not mean a
default was chosen, it means *follow the operating system*. Collapsing the third into "light" is the
ordinary bug: a user on a dark desktop who has never touched the toggle gets a white page, and no
setting exists that they could change to fix it.

So `setTheme(null)` is a real operation with its own path: it **removes** the stored preference,
reads the implicit one from the platform, and applies that. `setTheme('dark')` stores and applies.
The distinction between *no preference* and *a preference that happens to be light* is the whole
design.

Three surfaces must agree, and each is written deliberately:

- `localStorage` — persistence across visits, and its absence is what "unset" means.
- `data-theme` on `<html>` — what CSS actually reads.
- React state — what components read.

Writing state without the attribute leaves the page un-styled while the app believes it is themed;
writing the attribute without storage forgets the choice on reload.

**Honest boundary.** The proof asserts the three-way behaviour and that each surface is written. It
does not test the flash-of-wrong-theme on first paint — that is `providers/theme/init/theme`'s
job, running before hydration — and it does not verify any particular colour.

**Law — [[law]]: an unset preference is a state, not a default. Storing "light" for a user who never
chose it is a decision made on their behalf, and it is invisible to them and unfixable by them.**

## Standards

- **CSS Media Queries Level 5** — `prefers-color-scheme` as the implicit preference.
- **WCAG 2.2 §1.4.3** — the contrast contract each theme carries.

Composes: `providers` · `can/use/dom` · [[law]].
