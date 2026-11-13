---
name: door
description: "Use when an MCP area must open from the chat — chatDoor(session, { area: quantum | gate, door, args }) calls the area's own handlers in-process and folds one line of figures into the session; a refused call folds nothing."
atomPath: "quantum/chat/door"
coordinate: "quantum/chat/door · 8/crest · 529068c4"
contentUuid: "4cb3e748-cebc-5d24-b51e-585b279a622b"
diamondUuid: "d2230e65-f31d-85cf-a53c-f65ae055db79"
uuid: "529068c4-f53f-8898-8ecb-a92553f949cd"
horo: 8
typography:
  partition: quantum
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "c07e17ba-ae8e-8efe-95c6-c4d31f785cb8"
  stages:
    - stage: path
      stageUuid: "ecbd639d-edec-836c-ad46-6eb5144a1b18"
    - stage: trinity
      stageUuid: "b11ae6c4-6503-895f-b3f2-8201efefee57"
    - stage: boundary
      stageUuid: "dd512fc1-bcb1-8f4b-81d4-c4d635b0815e"
    - stage: links
      stageUuid: "80f3961c-ceb8-8dc0-a338-ed81c155a913"
    - stage: horo
      stageUuid: "6123c9aa-3549-8528-b252-5dadf604548d"
    - stage: seal
      stageUuid: "360ee8bc-0d7b-88fa-9427-c74b23e45e0b"
    - stage: uuid
      stageUuid: "3398284e-4a13-8b07-a4ff-6e8ef7b419de"
quantum:
  superposition:
    - chat
    - law
    - quantum
    - rules
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
    computationUuid: "c07e17ba-ae8e-8efe-95c6-c4d31f785cb8"
    contentUuid: "4cb3e748-cebc-5d24-b51e-585b279a622b"
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

Composes: [[quantum]]/chat/routing · [[quantum]]/register · [[rules]]/concentration · mcp · [[law]].

<sub>content-uuid `4cb3e748-cebc-5d24-b51e-585b279a622b` · account `quantum/chat/door` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
