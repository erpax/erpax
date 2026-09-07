---
name: outward
description: "Use when erpax depends on an answer it does not own — VIES, ECB rates, the Peppol directory, a standards clause, a harvested page. Fetch once, fold the answer to a content-uuid, and verify the ADDRESS on every later pass instead of re-reading the world. Only a moved address is news; an unreachable boundary keeps its last receipt and is never a failure."
atomPath: outward
coordinate: "outward · 1/base · c5175dc5"
contentUuid: "2ff90c44-4d28-56fb-873d-f36b79673acf"
diamondUuid: "8c9176e4-ac0a-8186-87b6-2805c22455e9"
uuid: "c5175dc5-061f-8fe6-9eeb-473958467c3b"
horo: 1
typography:
  partition: outward
  bondDegree: 42
standards:
  - "ISO 19011:2018 §6.4 — audit evidence: the receipt IS the evidence"
  - "RFC 9562 §5.8 — v8 content-uuid (the address)"
bindings: []
signatures:
  computationUuid: "418731e1-af73-8cde-b7bf-dff92a5a0456"
  stages:
    - stage: path
      stageUuid: "5031f81b-27c6-86b5-bd9d-31b297975eaa"
    - stage: trinity
      stageUuid: "5b576848-3ace-8ea5-9ae9-7606c7d99fcd"
    - stage: boundary
      stageUuid: "f0d681ae-1c50-8e7c-a6a3-8788c731f4dc"
    - stage: links
      stageUuid: "2f4ab611-2c95-8073-9dab-5d3ba2fa5de9"
    - stage: horo
      stageUuid: "b6f71fc4-094e-8a05-b597-36a26ba15877"
    - stage: seal
      stageUuid: "a869529a-1679-8247-8722-f9c0892869a1"
    - stage: uuid
      stageUuid: "18165f83-c7ec-80a7-a9e9-544a9b0643fc"
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

**Law — [[law]]: verify the address, do not re-read the world. An external answer is
folded to a content-uuid once; later passes compare. Only a moved address costs
attention, and a boundary that is down keeps its last receipt.**

Composes: [[identity]] · [[country]] · [[standards]] · [[match]] · [[audit]].
