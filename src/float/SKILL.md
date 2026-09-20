---
name: float
description: "Use when reasoning about float — Four institutions, four vocabularies, **one structure**: something opens with a float, signed movements pass through it, and at close somebody **counts it in discrete units**."
atomPath: float
coordinate: "float · 7/descent · a840f565"
contentUuid: "92eb966a-df91-57aa-b7d5-4eac001b077d"
diamondUuid: "a0b9dab0-7b3c-83d4-90de-9508a669d9b9"
uuid: "a840f565-5668-85a8-93ce-dfaa12810e6e"
horo: 7
typography:
  partition: float
  bondDegree: 30
standards:
  - ISA 501 — physical count as audit evidence
  - ISO 4217 — currency and minor units
bindings: []
signatures:
  computationUuid: "6178c104-779b-828f-aa5f-d9b96dc01f00"
  stages:
    - stage: path
      stageUuid: "3401c4d4-a486-88d7-8bcd-9fec1e26e0f1"
    - stage: trinity
      stageUuid: "1e8614e6-1e0f-887a-9106-e40453e9c093"
    - stage: boundary
      stageUuid: "93374673-a93b-8c41-a758-1d72b432f907"
    - stage: links
      stageUuid: "5772c4ef-61c5-8df5-a90f-7c44dc74f79a"
    - stage: horo
      stageUuid: "a1ee105b-480a-84a6-8938-e093f8e9ee1b"
    - stage: seal
      stageUuid: "f4233c7b-9f73-8321-8a4a-0a4e07cdb46a"
    - stage: uuid
      stageUuid: "a6177962-6e9f-8491-8ad6-480dc0d1a854"
version: 2
---
# float — a drawer, a chip tray, an armoury and a public till are one control

Four institutions, four vocabularies, **one structure**: something opens with a float, signed
movements pass through it, and at close somebody **counts it in discrete units**. The count either
agrees with the book or it does not, by how much, and in which direction.

| mount | unit set | what differs |
| --- | --- | --- |
| [[teller]] | euro legal tender | branch tolerance, four-eyes floor |
| [[casino]] | house chip scale (a parameter — a house has several) | the drop, reported separately |
| [[armory]] | `{1}` — items are counted one at a time | tolerance is zero and is **not a dial** |
| [[treasury]] | euro legal tender | the **disposition** of the variance |

Writing that reconciliation four times would be one implementation and three decoys
([[rules]]/copy). It lives here once.

## The control, and why the unit set is not optional

**Whoever can enter a closing TOTAL can always make the float balance.** Enter what the book
expects and the difference disappears — not usually fraudulently, but the number carries no
evidence either way. A count expressed as **units** cannot do that: the total is derived from items
claimed to be physically present, so making it agree means claiming notes, chips or rounds that
either are or are not there.

There is deliberately **no parameter for a total**. That absence is the atom.

## Three refusals, each pinned

- **The variance is SIGNED, never an absolute value.** An over is not a smaller short: a short may
  be an error or a loss, an over means value arrived that no movement recorded — the more
  interesting finding, and the one `Math.abs` erases.
- **An illegal count is void even when it agrees.** A 25-euro note does not exist; a count claiming
  one may total exactly right and is still not evidence. `investigable` returns true on the illegal
  units before it looks at the variance.
- **Amounts are MINOR UNITS.** `0.1 + 0.2` is not `0.3` in binary, and a till out by a hundredth
  every day is a control reporting noise. A "float" here is a stock of value and never a
  floating-point number.

**Honest boundary.** This proves a count **agrees with a book**, never that either is true. Both
the opening float and the movements are someone else's record, and a count is only as independent
as the person who took it — two people who both count can still both lie. It removes the
**unilateral, undetectable** difference; it does not remove collusion, and no arithmetic will.

**Law — [[law]]: a float is proved by a count of units, never by a total somebody typed. Derive the
sum from what is claimed present, keep the variance signed, and void the count that claims a unit
the float does not deal in — a control that lets the closing figure be asserted is a formality
wearing a control's name.**

## Standards

- **ISO 4217** — currency and minor units.
- **ISA 501** — physical count as audit evidence.

Composes: [[teller]] · [[casino]] · [[armory]] · [[treasury]] · [[rules]]/ask · [[rules]]/copy · [[law]].
