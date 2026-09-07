---
name: card
description: Use when reasoning about card — Making a card clickable is easy and usually wrong. Wrapping the card in an swallows every nested link.
atomPath: "use/clickable/card"
coordinate: "use/clickable/card · 2/share · 4674345d"
contentUuid: "398da7b5-60ad-5cc8-8f39-691a734626f6"
diamondUuid: "8bd33c5c-181b-8ff3-a90c-fc3fa933ccef"
uuid: "4674345d-1e8a-883c-aaef-202531ddc0b2"
horo: 2
typography:
  partition: use
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "94a3f144-b1e9-89f4-9239-e01612590375"
  stages:
    - stage: path
      stageUuid: "605b0008-d230-8fc8-abe7-9df5181fb3c6"
    - stage: trinity
      stageUuid: "e77ee6ef-edb7-8b79-bedd-49a3db613c36"
    - stage: boundary
      stageUuid: "0347b1bc-9c5c-86c6-82df-4a9d438c3f18"
    - stage: links
      stageUuid: "8450bc3c-052f-80fc-acc7-8e7cd8877034"
    - stage: horo
      stageUuid: "83d3e966-9252-8660-ab69-f6e689674e6a"
    - stage: seal
      stageUuid: "3c6a28cd-13d6-87ca-9688-2f1bbc85cfe6"
    - stage: uuid
      stageUuid: "baf2381b-de5e-86a4-919e-c26acc6bb7ab"
version: 2
---
# use/clickable/card — the whole card is clickable, and every other way of clicking still works

Making a card clickable is easy and usually wrong. Wrapping the card in an `<a>` swallows every
nested link. Attaching `onClick` to the container gives keyboard users nothing and steals text
selection. Both produce a card that *works* for a mouse and is broken for everyone else.

This hook takes the other route: a real `<a>` stays inside the card carrying the accessible name and
the keyboard behaviour ([[card]]), and the container merely forwards a **deliberate** click to it.
Four conditions decide what "deliberate" means, and each exists because of a real interaction it
must not break:

| guard | what it protects |
| --- | --- |
| press-to-release under **250 ms** | selecting text across the card is a slow drag, not a click |
| the press did not start inside another `<a>` | a nested link keeps its own destination |
| **button 0** only | middle-click paste and the right-click menu survive |
| no **Ctrl** | ctrl-click still opens a new tab |

`external` sends the navigation through `window.open`, otherwise the router keeps it a client
transition.

**Honest boundary.** These guards are the ones this hook implements. They do not cover every input
mode — a touch long-press, or Cmd-click on macOS, are not distinguished here — and that gap is real:
the four checked cases are the ones that were broken often enough to be worth guarding. It is also
not the accessibility mechanism; the inner link is, and this only forwards to it.

**Law — [[law]]: a whole-element click target forwards to a real link, and forwards only a
deliberate press. Every shortcut a user already knows — select, middle-click, ctrl-click, a nested
link — must survive, or the convenience costs more than it gives.**

## Standards

- **WCAG 2.2 §2.5.5** — target size, which is what the whole-card target is for.
- **WCAG 2.2 §2.1.1** — keyboard: the inner anchor, not the container, carries it.
- **UI Events** — `button`, and modifier keys on a pointer event.

Composes: [[card]] · [[law]].
