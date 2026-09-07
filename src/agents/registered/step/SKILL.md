---
name: step
description: "Use when reasoning about step — Every registered domain agent answered a chain step the same way: read and out of the step's note, claim the step only if the agent owns that collection, and return one audit leaf…"
atomPath: "agents/registered/step"
coordinate: "agents/registered/step · 5/round · 5cb7dd88"
contentUuid: "76b1c456-0eea-51cb-b404-c923aa8c82df"
diamondUuid: "32c26e30-1551-8093-9efe-fcb4839c6f86"
uuid: "5cb7dd88-4855-884e-b03c-825c16473ee7"
horo: 5
typography:
  partition: agents
  bondDegree: 39
standards: []
bindings: []
signatures:
  computationUuid: "ec5a7147-2940-8fac-b551-20a9fc99bb77"
  stages:
    - stage: path
      stageUuid: "4d362222-6461-8c15-88c9-9d3578877ef8"
    - stage: trinity
      stageUuid: "f0a69f38-b891-8308-a1bd-fd51cd775efc"
    - stage: boundary
      stageUuid: "2d5ad66a-a945-8a63-9f46-8a25a7801e2b"
    - stage: links
      stageUuid: "c162b245-e650-882c-91d0-172a7cbf85c2"
    - stage: horo
      stageUuid: "55bb6b92-83fe-8b18-86a3-392d5b09b34f"
    - stage: seal
      stageUuid: "1387f692-affa-8a05-8b44-68ef9d47f26f"
    - stage: uuid
      stageUuid: "c85e6563-692a-8d07-939f-5d6a4d36f6ae"
version: 2
---
# agents/registered/step — one chain-step handler, where eleven agents each had their own

Every registered domain agent answered a chain step the same way: read `collection=…` and
`action=…` out of the step's note, claim the step only if the agent owns that collection, and
return one audit leaf naming what it handled.

**Eleven agents wrote that out.** 111 nodes each, byte-identical, addressed to one hash by
[[rules]]/copy. Eleven copies are one implementation and ten decoys: a change to the note format,
the ownership check or the leaf shape had to be made eleven times, and nothing would have said which
copy was missed. That is the shape [[rules]] names — *while one law is stated in eleven private
corners, nothing can show a twelfth place is missing it.*

`ownsCollections` is passed in rather than read from `this`, so the helper is a function of its
inputs: it can be tested without an agent, and an agent whose chain-step behaviour genuinely differs
simply does not call it. `sales.agent` already does not — it was the one file the collapse did not
match, and it was left alone rather than forced.

**Honest boundary.** This proves eleven bodies were the same TEXT. It does not prove they should
always be one function — if two agents' chain-step semantics diverge, the right answer is for one to
stop calling this, not to grow a flag here.

**Law — [[law]]: a body at eleven addresses is one implementation and ten decoys. Fold it once, pass
what differs, and let an agent that needs other behaviour opt out by not calling.**

Composes: [[agent]] · [[rules]]/copy · [[law]].
