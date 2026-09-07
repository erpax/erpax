---
name: theme
description: "Use when reasoning about theme — The site theme is one value ( ). The header's is a second, because the header floats over whatever the page puts beneath it: a full-bleed hero paints a dark field and white text…"
atomPath: "providers/header/theme"
coordinate: "providers/header/theme · 5/round · ac9ebf3f"
contentUuid: "f4a88f45-1f7d-5de1-8ebe-9f2a1dde4388"
diamondUuid: "f95ac08b-a760-87f9-b652-a957ab56d9fe"
uuid: "ac9ebf3f-1aed-8d36-9167-e04335322578"
horo: 5
typography:
  partition: providers
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "ce9f0b06-aca6-8dad-b3e5-0f6aab33bc52"
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
      stageUuid: "975d4fd5-8944-8947-bb5e-cc239ff83b2b"
    - stage: seal
      stageUuid: "811fcbc8-78ab-8d66-952c-59281637957d"
    - stage: uuid
      stageUuid: "0d431a4b-80d5-8da2-9f7a-53a957c8227c"
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
