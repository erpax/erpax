---
name: hook
description: "Use when reasoning about hook — Every accountable collection needs the same three things: its tenant filled in before validation, its author recorded on change, and its audit entry written after."
atomPath: "standard/collection/hook"
coordinate: "standard/collection/hook · 8/crest · dea0688d"
contentUuid: "936d20c7-05e4-58f4-88ea-66d56cb6a0f7"
diamondUuid: "13732896-2649-867b-8e80-3b63450500ba"
uuid: "dea0688d-3745-8c6f-9b71-bfefa290534a"
horo: 8
typography:
  partition: standard
  bondDegree: 12
standards:
  - "SOX §404 internal-controls provenance"
bindings: []
signatures:
  computationUuid: "75608645-0093-899e-a844-10e67eb06a1d"
  stages:
    - stage: path
      stageUuid: "90bb1be7-b970-817a-9459-b8bcb8da9698"
    - stage: trinity
      stageUuid: "c91694be-cb4a-82c1-a655-0d1212cf881f"
    - stage: boundary
      stageUuid: "4c775c03-92b0-8bee-a7c4-0a75d3e3db46"
    - stage: links
      stageUuid: "21006af8-a5e9-82fd-81f4-a4ab20189276"
    - stage: horo
      stageUuid: "3d8f4091-a0d3-8bf3-a324-aa1a955b8200"
    - stage: seal
      stageUuid: "530ed1ff-2c8e-8bce-957e-2bea08e586bc"
    - stage: uuid
      stageUuid: "9f22369a-b3f8-8f94-9fdb-ac9209007c65"
version: 2
---
# standard/collection/hook — one spine, so no collection can forget a leg of it

Every accountable collection needs the same three things: its tenant filled in before validation, its
author recorded on change, and its audit entry written after. Declared per collection, that is 231
opportunities to omit one — and the omission is silent, because a document without an audit entry
looks exactly like a document with one until somebody goes looking.

So the triple is a **factory**, not a convention. A collection composes extra hooks around the spine
through `opts`, and the audit hook is appended **last** by construction — not by asking authors to
remember, but because it must observe the final state, after every other hook has had its say. A
hook order that a human maintains is a hook order that drifts.

**Honest boundary.** This guarantees the spine is *present and ordered* wherever the factory is used.
It cannot make a collection use the factory — that is [[rules]]' territory, and a hand-rolled
collection bypasses this entirely. It also does not verify the audit chain's own integrity, which
[[audit]] owns.

**Law — [[law]]: a lifecycle every collection shares is defined once and composed, never restated.
Ordering that matters is enforced by construction, because a rule about ordering that lives in prose
is obeyed until the first hurry.**

## Standards

- **ISO 19011:2018** — audit trail.
- **ISO/IEC 27001 A.5.23** — tenant isolation via the tenant field.
- **SOX §404** — internal controls: provenance.

Composes: [[standard]] · [[audit]] · [[law]].
