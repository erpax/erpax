---
name: theme
description: "Use when reasoning about theme — The site theme is one value ( ). The header's is a second, because the header floats over whatever the page puts beneath it: a full-bleed hero paints a dark field and white text…"
atomPath: "providers/header/theme"
coordinate: "providers/header/theme · 5/round · 7c081e60"
contentUuid: "418fed6f-86f5-5566-8db5-d257249abf26"
diamondUuid: "7e94739a-6c04-806d-b2d2-5e3ff9a1eed7"
uuid: "7c081e60-ffd2-8081-b8db-5042478c31e2"
horo: 5
typography:
  partition: providers
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "940b902c-ed61-835c-b9a5-b480aff574e7"
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
      stageUuid: "7e101054-7b91-852b-8acc-bed2544fcc58"
    - stage: seal
      stageUuid: "811fcbc8-78ab-8d66-952c-59281637957d"
    - stage: uuid
      stageUuid: "1aeced1a-f608-8b65-904a-d1e0f2886b2c"
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
