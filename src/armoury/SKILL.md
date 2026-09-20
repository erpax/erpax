---
name: armoury
description: "Use when reasoning about armoury — A weapon or a round is counted in **items**, so the unit set is and the total is a headcount."
atomPath: armoury
coordinate: "armoury · 8/crest · 256d017e"
contentUuid: "c3b3b629-9a02-57f7-993b-3f40087036a3"
diamondUuid: "d7a7bf7a-10b2-8fff-b137-6f2fdde2c67e"
uuid: "256d017e-4e17-84e9-b341-2216cb7d39d9"
horo: 8
typography:
  partition: armoury
  bondDegree: 13
standards:
  - ISA 501 — physical count as audit evidence
  - "ISO/IEC 27001 A.5.9 — inventory of assets; A.7.9 — assets off-premises"
bindings: []
signatures:
  computationUuid: "6d3bdfb0-4294-850c-887d-0b64e9b161d7"
  stages:
    - stage: path
      stageUuid: "ec91cc33-b724-825a-a25e-69fbc14fe5ee"
    - stage: trinity
      stageUuid: "92f64803-deab-81fa-bd72-5ccc6e166a4b"
    - stage: boundary
      stageUuid: "c40ac300-8f7e-8a98-be76-ae8605dfd332"
    - stage: links
      stageUuid: "79c7ce91-b6df-80cd-8618-094094ff63d1"
    - stage: horo
      stageUuid: "5dd850fc-789c-8c7f-ba50-6b6493bdc378"
    - stage: seal
      stageUuid: "57b3e34b-7299-8042-95c4-4993df264a28"
    - stage: uuid
      stageUuid: "488563bb-5b09-825d-a3da-63a851a296f1"
version: 2
---
# armoury — the same control as a cash drawer, with the dial removed

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
