---
name: door
description: "Use when an MCP area must open from the chat — chatDoor(session, { area: quantum | gate, door, args }) calls the area's own handlers in-process and folds one line of figures into the session; a refused call folds nothing."
atomPath: "quantum/chat/door"
coordinate: "quantum/chat/door · 8/crest · 56cea5b4"
contentUuid: "5f9e87bc-5e59-5627-8076-ff88cc184223"
diamondUuid: "b0d6881f-5e2c-8584-81f6-fcb826864681"
uuid: "56cea5b4-7355-8547-9430-a29c7333e1b5"
horo: 8
typography:
  partition: quantum
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "bf867da7-22ef-85de-9b42-8c6aa925c25a"
  stages:
    - stage: path
      stageUuid: "ecbd639d-edec-836c-ad46-6eb5144a1b18"
    - stage: trinity
      stageUuid: "b11ae6c4-6503-895f-b3f2-8201efefee57"
    - stage: boundary
      stageUuid: "dd512fc1-bcb1-8f4b-81d4-c4d635b0815e"
    - stage: links
      stageUuid: "699497dd-76ed-8146-8662-27d5214a4285"
    - stage: horo
      stageUuid: "02d77145-b939-8081-b8e7-9f2c3008b930"
    - stage: seal
      stageUuid: "360ee8bc-0d7b-88fa-9427-c74b23e45e0b"
    - stage: uuid
      stageUuid: "e7dc9efd-18af-8780-99b5-6ac32af8b72b"
quantum:
  superposition:
    - chat
    - collapse
    - law
    - merge
    - sti
    - time
    - superposition
  collapse:
    - "Use when an MCP area must open from the chat — chatDoor(session, { area: quantum | gate, door, args }) calls the area's own handlers in-process and folds one line of figures into the session; a refused call folds nothing."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "bf867da7-22ef-85de-9b42-8c6aa925c25a"
    contentUuid: "5f9e87bc-5e59-5627-8076-ff88cc184223"
version: 2
---
# quantum/chat/door — an MCP area's tools, opened from the chat

The chat is the working surface. An MCP area already answers over `tools/call`; this atom opens the
same handlers from a chat session — in-process, never a second implementation — and folds the reply
into the session as one line of figures a reader checks.

| area | default door | the line the session keeps |
| --- | --- | --- |
| `quantum` | `bell` | `amplitudes=[1,0,0,1]\|halvings=1\|normalised=true\|support=0,3` |
| `gate` | `verdicts` | `sealed=…\|red=n/total`, or the cross `a×b\|shared\|lift\|theorem` |

`door` is the tool's last segment (`erpax.<area>.<door>`); `args` are the area's own. A refused call
— an unmeasured law, a gate on a qubit the register does not have, a door that does not exist —
folds **nothing** into the session: the session records what was answered, never what was asked.

## Why its own atom

This lived in [[quantum]]/chat/routing for an hour and pushed that hub past the 500-line ceiling of
[[rules]]/concentration — `logic-concentration` went 23 → 24, and the first instrument to say so was
the README's own `## next development` ledger, one row, in red. The lawful form of a hub's matter is
the child atom it already was, so the registry of areas and the one function over it moved here.

**Honest boundary.** This proves a tool was called and its figures folded, never that the area's
answer is right — that is each area's own proof. The area registry is DECLARED (two areas today);
a third area is one entry, not a new door.

**Law — [[law]]: the chat opens an MCP area through the area's own handlers, folds one line of figures
per turn, and folds nothing on refusal — and matter that grows a hub past its ceiling becomes the
child atom it already was.**

Composes: [[quantum]]/chat/routing · [[quantum]]/register · [[rules]]/concentration · [[mcp]] · [[law]].

<sub>content-uuid `5f9e87bc-5e59-5627-8076-ff88cc184223` · account `quantum/chat/door` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
