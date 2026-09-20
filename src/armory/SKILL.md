---
name: armory
description: "Use when reasoning about armory — A weapon or a round is counted in **items**, so the unit set is and the total is a headcount."
atomPath: armory
coordinate: "armory · 5/round · f707be57"
contentUuid: "e329fe33-b55a-5423-b3a7-620083aabf5a"
diamondUuid: "3e716500-f46a-82c5-a65c-ce173ddc4246"
uuid: "f707be57-8fd3-8efc-ba61-3f2935873dc4"
horo: 5
typography:
  partition: armory
  bondDegree: 13
standards:
  - ISA 501 — physical count as audit evidence
  - "ISO-27001"
  - "ISO/IEC 27001 A.5.9 — inventory of assets; A.7.9 — assets off-premises"
  - "ISO/IEC-27001:2022"
bindings: []
signatures:
  computationUuid: "825ba482-37a6-83a3-9f3d-cc86522159ab"
  stages:
    - stage: path
      stageUuid: "9062d111-f92f-8439-a7c5-b2cab5d42c3a"
    - stage: trinity
      stageUuid: "43516e80-94eb-82bb-bf4d-57d21818d1d7"
    - stage: boundary
      stageUuid: "c009481c-36c7-8f5a-965a-046428e62434"
    - stage: links
      stageUuid: "f513a84e-3a51-8e72-8f3f-1ad91a5c338e"
    - stage: horo
      stageUuid: "07aa4273-1483-855a-8368-e36b259161e6"
    - stage: seal
      stageUuid: "e9bdf6e7-9ce7-841a-ae90-e5f115354f28"
    - stage: uuid
      stageUuid: "2781f37b-8da9-8f57-bed0-ac7d6ed76003"
version: 2
---
# armory — the same control as a cash drawer, with the dial removed

A weapon or a round is counted in **items**, so the unit set is `{1}` and the total is a headcount.
The mount is nearly empty, and that emptiness is the finding: **an armoury ledger and a bank drawer
are the same control**, and the only reason they are usually written twice is that one says *euro*
and the other says *rounds*.

## Tolerance is zero, and it is not a policy dial

A branch may absorb a cent. An armoury absorbs nothing — **one item unaccounted for is the whole
event** — so `reportable` is called with the constant rather than a parameter. A tolerance argument
here would be a supported way to make an item disappear, which is the opposite of what the ledger
is for. [[rules]]/unraised names the shape: a check that can be configured not to fire.

An **unexplained extra** is reported as loudly as a missing one. An item that arrived without a
movement is not good news; it means the book and the world disagree in the direction nobody
investigates, and a pinned test asserts it reddens.

## The open custody chain is derived

`outstanding` sums what was issued and not returned, from the movements — never a second field
someone maintains. A separately-tracked count is a second source of truth, and the day it disagrees
with the movements nobody will know which one is wrong.

It sums **magnitudes** rather than negating a total: negating zero yields `-0`, a real value that
prints as *"-0 outstanding"* on a custody sheet. A test caught it. A reader who sees `-0` on a
report stops trusting the sheet, and they are right to.

**Honest boundary.** This proves a count agrees with a movement log. It does not prove the log is
complete — an item taken and never recorded leaves both sides consistent, which is why the count
must be taken by someone who did not keep the log. That independence is a procedure, not a
function, and nothing here can enforce it.

**Law — [[law]]: where the item matters more than its value, the tolerance is zero and is not a
parameter. A control with a dial is a control with a way out.**

## Standards

- **ISA 501** — physical count as audit evidence.
- **ISO/IEC 27001 A.5.9** — inventory of assets; **A.7.9** — assets off-premises.

Composes: [[float]] · [[rules]]/unraised · [[law]].
