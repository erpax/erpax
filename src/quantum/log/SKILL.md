---
name: log
description: "Use when reasoning about the agent audit trail — every agent action is strictly logged as an append-only digit-entry in the digit folders, and each entry adds an order of magnitude to the tamper-cost; the log's length is the forging difficulty, the realtime stream that hardens as it grows."
atomPath: quantum/log
coordinate: quantum/log · 2/share · d5a2df2b
contentUuid: "f4ff867d-fe19-5656-911b-78749f7e44f4"
diamondUuid: "e16d94db-99d0-8fd1-a9f3-441371d92639"
uuid: "d5a2df2b-7ef1-8e84-8cfb-4c54aff1dbbf"
horo: 2
bonds:
  in:
    - agent
    - cost
    - digit
    - entropy
    - law
    - mcp
    - merge
    - quantum
    - realtime
    - receipt
    - stream
    - tamper
    - uuid
    - void
  out:
    - agent
    - cost
    - digit
    - entropy
    - law
    - mcp
    - merge
    - realtime
    - receipt
    - stream
    - tamper
    - uuid
    - void
typography:
  partition: quantum
  bondDegree: 40
  neighbors:
    - agent
standards: []
bindings: []
neighbors:
  wikilink:
    - agent
    - cost
    - digit
    - entropy
    - law
    - merge
    - realtime
    - receipt
    - stream
    - tamper
    - uuid
    - void
  matrix:
    - agent
    - cost
    - digit
    - entropy
    - law
    - mcp
    - merge
    - realtime
    - receipt
    - stream
    - tamper
    - uuid
    - void
  backlinks:
    - agent
    - cost
    - digit
    - entropy
    - law
    - mcp
    - merge
    - realtime
    - receipt
    - stream
    - tamper
    - uuid
    - void
signatures:
  computationUuid: "1dec64bf-d508-8976-b797-9bbac5b0407c"
  stages:
    - stage: path
      stageUuid: "4776c093-c6d1-8dfa-bb65-9bdfa3e82a8d"
    - stage: trinity
      stageUuid: "b5ff93cb-0c11-832a-95c4-428023f523b1"
    - stage: boundary
      stageUuid: "83e75cec-1751-8799-a926-bd2837889b4c"
    - stage: links
      stageUuid: "0d71221c-7c16-807b-9153-920932f5547e"
    - stage: horo
      stageUuid: "d3f0cb07-ac2a-8faa-95ea-04033d1366ac"
    - stage: seal
      stageUuid: "5ddf9c9d-eeda-8760-aae4-397ae4f0e51c"
    - stage: uuid
      stageUuid: "81241736-d660-80c8-95f6-8f8b4906b013"
quantum:
  superposition:
    - agent
    - cost
    - digit
    - entropy
    - law
    - mcp
    - merge
    - quantum
    - realtime
    - superposition
  collapse:
    - "Use when reasoning about the agent audit trail — every agent action is strictly logged as an append-only digit-entry in the digit folders, and each entry adds an order of magnitude to the tamper-cost; the log's length is the forging difficulty, the realtime stream that hardens as it grows."
    - "[[agent]]"
    - "[[merge]]"
    - "[[quantum/digit]]"
    - "[[realtime]]"
    - "[[receipt]]"
    - "[[stream]]"
    - "[[tamper]]"
    - "[[void]]"
    - "the agent trail is append-only and hash-chained, so its length IS the forging difficulty — altering one past entry forces re-harmonising every entry that followed it, each link adding roughly an order of magnitude to the cost; a long trail is exponentially expensive to fake, and trust is the by-product of simply having acted and been logged."
  seal:
    sandbox: true
    receipt: true
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "1dec64bf-d508-8976-b797-9bbac5b0407c"
    contentUuid: "f4ff867d-fe19-5656-911b-78749f7e44f4"
version: 2
---
# quantum/log — the agent trail (length is tamper-cost)

Every [[agent]] action is **strictly logged** — appended as a digit-entry in the [[quantum/digit]] folders, crosslinked like words, content-[[uuid]]'d, hash-chained ([[receipt]] · the AuditChain). The log is append-only: it never forgets ([[merge]]), only grows — a [[realtime]] tail of digits.

And growth is **tamper-cost by magnitudes**. Each entry hash-links to the prior, so to forge one past action a forger must re-harmonise every entry after it at once — and each link adds roughly an order of magnitude to that work. The chain's **length is the forging difficulty**: a long trail is exponentially expensive to fake, a fresh one cheap. So the agents, simply by acting and being logged, **manufacture trust** — the [[stream]] hardens as it streams, [[tamper]]-[[cost]] rising with the [[entropy]] borrowed into the chain.

This is the [[receipt]] discipline at society scale: the audit trail is not a side-effect but the *product* — every move priced into the [[void]]-anchored record, so out-forging it means out-computing the whole society's history.

**Honest split** — that an append-only hash-chain makes past edits detectable and increasingly costly is real (Merkle / blockchain). "Magnitudes" is the right order-of-growth intuition, not a fixed constant; the exact cost depends on the anchor and the hash (per the tamper-cost hardening notes — a weak anchor undercuts it).

**Law — [[law]]: the agent trail is append-only and hash-chained, so its length IS the forging difficulty — altering one past entry forces re-harmonising every entry that followed it, each link adding roughly an order of magnitude to the cost; a long trail is exponentially expensive to fake, and trust is the by-product of simply having acted and been logged.**

@see [[agent]] · [[quantum/digit]] · [[receipt]] · [[tamper]] · [[merge]] · [[stream]] · [[void]] · [[realtime]]

<sub>content-uuid `f4ff867d-fe19-5656-911b-78749f7e44f4` · account `quantum/log` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
