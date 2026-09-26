---
name: outward
description: "Use when erpax depends on an answer it does not own — VIES, ECB rates, the Peppol directory, a standards clause, a harvested page. Fetch once, fold the answer to a content-uuid, and verify the ADDRESS on every later pass instead of re-reading the world. Only a moved address is news; an unreachable boundary keeps its last receipt and is never a failure."
atomPath: outward
coordinate: "outward · 7/descent · c5534f48"
contentUuid: "df035b70-f070-5315-8dde-53540d94e3dc"
diamondUuid: "19d1d986-2cbc-82ba-8696-8afed9418aef"
uuid: "c5534f48-650c-873a-bd43-95246e04215f"
horo: 7
typography:
  partition: outward
  bondDegree: 51
standards:
  - "ISO 19011:2018 §6.4 — audit evidence: the receipt IS the evidence"
  - "RFC 9562 §5.8 — v8 content-uuid (the address)"
bindings: []
signatures:
  computationUuid: "0c0b39b5-144c-8eec-9766-d1cf65f90147"
  stages:
    - stage: path
      stageUuid: "5031f81b-27c6-86b5-bd9d-31b297975eaa"
    - stage: trinity
      stageUuid: "5b576848-3ace-8ea5-9ae9-7606c7d99fcd"
    - stage: boundary
      stageUuid: "85a1f4f3-38e9-81d5-88c3-371b9ebb0e03"
    - stage: links
      stageUuid: "0b072390-4caa-8f0e-80ab-00c9054a1f78"
    - stage: horo
      stageUuid: "d6154152-3da1-84bb-8938-743f9013c75e"
    - stage: seal
      stageUuid: "a869529a-1679-8247-8722-f9c0892869a1"
    - stage: uuid
      stageUuid: "e144ca00-3653-832c-8e34-7fc3cbecafd9"
version: 2
---
# outward — the boundary is content-addressed too

erpax stands on rails it does not own. VIES says whether a VAT number is live; the
ECB publishes the rate that prices a foreign invoice; the Peppol directory says who
can receive one; a standards body moves a clause and 1,477 banners quietly mean
something else. Today each is fetched on demand and **nothing remembers what it
said** — so *"did the outside change?"* has no answer, only two bad options: trust
it, or ask again. Asking again costs attention every single time.

A receipt collapses that: **fetch once, fold the answer to a content-uuid, keep the
address.** Every later pass verifies the address instead of re-reading the world. An
unchanged answer costs one comparison; only a **moved** address deserves a human.
It is the corpus's own law pointed outward — same content, same address
([[identity]]) — and it turns an external fact into **checkable evidence** rather
than a transient scrape.

| state | meaning | costs |
| --- | --- | --- |
| `fresh` | first sighting; the address is now on record | one fetch |
| `unchanged` | the world still agrees with the receipt | one comparison |
| `moved` | **the answer changed** — the only news | attention |
| `unreachable` | the boundary is down — the last receipt still stands | nothing |

**The fourth state is the design.** A gate that goes red because someone else's
server is rebooting trains people to ignore it, and an ignored gate is prose
([[rules]]). So `holds` counts only what MOVED: a down host is not an answer to
*"did the world change?"*, and it never erases what the host last said.

## Two decisions worth naming

**Key order cannot matter.** Two servers may serialise the same answer differently,
so the fold canonicalises (sorted keys, recursively) before addressing. Without that,
`unchanged` would mean "the same bytes" instead of "the same answer" — and the
receipt would cry wolf on a whitespace change.

**The fetch is injected, never hardcoded.** `run` is a thunk, so the whole atom is
provable with no network. A test that reached the real VIES would be exactly what
this atom exists to prevent: slow, flaky, and red for nobody's fault.

**Honest boundary.** A receipt proves an answer is **the same as last time** — never
that it is **true**, current, or that the host is who it claims. It records what was
said and when it changed; it does not adjudicate. And an address only means anything
if the probe asks the same question each run — a probe whose query drifts will read
as `moved` when only the asking moved.

## Why a receipt, and why four states

erpax leans on rails it does not own: VIES answers whether a VAT number is live, the ECB publishes
the rate, the Peppol directory says who can receive an invoice, a standards body moves a clause.
Re-fetched on demand with nothing remembering what they said, *"did the outside change?"* is
unanswerable — the only options are trust it or ask again, and asking again costs attention every
time.

A receipt fixes that: fetch once, fold the answer to a content-uuid, keep the address. Every later
pass **verifies the address instead of re-reading the world**. An unchanged answer costs one
comparison; only a `moved` address is news. That is this corpus's own law applied outward — same
content, same address ([[identity]]) — and it makes an external fact **checkable evidence** rather
than a transient scrape.

| state | meaning |
| --- | --- |
| `fresh` | first sighting — the address is now on record |
| `unchanged` | the world agrees with the receipt (the cheap, common case) |
| `moved` | the answer changed — the ONLY case that deserves attention |
| `unreachable` | the boundary is down. **Not a failure**: the last receipt still stands |

That last state is the point of the design. A gate that reddens because someone else's server is
rebooting trains people to ignore it ([[rules]]: a gate that cries wolf is one nobody reads).

Adapted from uuidna's outward pass. The prose above lived as a 32-line docblock in `index.ts` until
`word-matter`'s comment-bloat axis said what this corpus says everywhere: prose belongs in the SKILL.

**Law — [[law]]: verify the address, do not re-read the world. An external answer is
folded to a content-uuid once; later passes compare. Only a moved address costs
attention, and a boundary that is down keeps its last receipt.**

Composes: [[identity]] · [[country]] · [[standards]] · [[match]] · [[audit]].
