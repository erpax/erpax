---
name: door
description: "Use when an MCP area must open from the chat — chatDoor(session, { area: quantum | gate, door, args }) calls the area's own handlers in-process and folds one line of figures into the session; a refused call folds nothing."
atomPath: "quantum/chat/door"
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
