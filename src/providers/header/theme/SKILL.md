---
name: theme
description: "Use when reasoning about theme — The site theme is one value ( ). The header's is a second, because the header floats over whatever the page puts beneath it: a full-bleed hero paints a dark field and white text…"
atomPath: "providers/header/theme"
coordinate: "providers/header/theme · 1/base · 71c10d27"
contentUuid: "a83cec3e-6df3-51c5-a3e4-c8d472bbf0b2"
diamondUuid: "877f22af-c4cc-8bbe-8919-fcaa20098c9b"
uuid: "71c10d27-95d2-89e1-ae65-83639b528817"
horo: 1
typography:
  partition: providers
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "9b330e37-7cef-8228-bc14-29f98b5608de"
  stages:
    - stage: path
      stageUuid: "73601db9-0717-86ba-acc4-b210bb6ea516"
    - stage: trinity
      stageUuid: "4a6e582e-69b4-8321-94da-5fcc55ded792"
    - stage: boundary
      stageUuid: "12e33a7f-e327-8999-8ffe-d3be0e85187b"
    - stage: links
      stageUuid: "3c032bbd-389d-8c05-a18f-881b822a60d3"
    - stage: horo
      stageUuid: "25207171-6a34-890d-8c0a-3f89a0bfd98f"
    - stage: seal
      stageUuid: "811fcbc8-78ab-8d66-952c-59281637957d"
    - stage: uuid
      stageUuid: "b0be432a-232c-8e7b-8a8a-1bdc0bfd4b59"
version: 2
---
# providers/header/theme — the header's theme is the page's, until a hero overrides it

The site theme is one value (`providers/theme`). The header's is a second, because the header
floats over whatever the page puts beneath it: a full-bleed hero paints a dark field and white text,
the header sits on top, and a header still in the light theme puts white links on white.

So `heros/high/impact` darkens the header on mount. This context is the channel it uses.

The initial value is **read from the DOM**, not defaulted — `document.documentElement` already
carries `data-theme` by the time React hydrates, because the blocking script in
`providers/theme/init/theme` set it before first paint. Defaulting to light here would flash the
wrong header on every load of a dark page. And it is guarded by `canUseDOM`, because this same module
is evaluated during server rendering where `document` does not exist — an unguarded read is not a
wrong value, it is a crash.

**Honest boundary.** This atom is the channel and its default. Whether any given hero sets the right
theme belongs to that hero, and the contrast of the result is a per-design question no provider can
answer.

**Law — [[law]]: state that already exists in the DOM is read from it, never re-defaulted. The
server-rendered attribute is the truth at hydration, and a component that re-guesses it flashes the
wrong answer on every load.**

## Standards

- **WCAG 2.2 §1.4.3** — contrast minimum, which is what a wrong header theme breaks.

Composes: `providers/theme` · `heros/high/impact` · `can/use/dom` · [[law]].
