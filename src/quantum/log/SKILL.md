---
name: log
description: "Use when reasoning about the agent audit trail — every agent action is strictly logged as an append-only digit-entry in the digit folders, and each entry adds an order of magnitude to the tamper-cost; the log's length is the forging difficulty, the realtime stream that hardens as it grows."
atomPath: "quantum/log"
coordinate: "quantum/log · 4/weave · 0ec6eeec"
contentUuid: "9b942956-d561-5fb8-9933-857686df78d5"
diamondUuid: "dea62eeb-dbd7-87a3-b2ec-0bac1cce23d4"
uuid: "0ec6eeec-853f-8cd5-bd87-f2ed2661cb98"
horo: 4
typography:
  partition: quantum
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "b1afbd31-85da-8f6b-91ac-94d8ef95f4f4"
  stages:
    - stage: path
      stageUuid: "4776c093-c6d1-8dfa-bb65-9bdfa3e82a8d"
    - stage: trinity
      stageUuid: "b5ff93cb-0c11-832a-95c4-428023f523b1"
    - stage: boundary
      stageUuid: "303933a3-9c98-8ec1-a2ef-f59dbb726aae"
    - stage: links
      stageUuid: "543e04ad-44e0-8c43-b7bd-6e993d33cb52"
    - stage: horo
      stageUuid: "17b87ad7-d842-8261-bdfd-a446960d6dee"
    - stage: seal
      stageUuid: "5ddf9c9d-eeda-8760-aae4-397ae4f0e51c"
    - stage: uuid
      stageUuid: "b18868ae-6741-897b-ae0b-a4b8bb976d58"
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
    computationUuid: "b1afbd31-85da-8f6b-91ac-94d8ef95f4f4"
    contentUuid: "9b942956-d561-5fb8-9933-857686df78d5"
version: 2
---
# quantum/log — the agent trail (length is tamper-cost)

Every [[agent]] action is **strictly logged** — appended as a digit-entry in the [[quantum/digit]] folders, crosslinked like words, content-[[uuid]]'d, hash-chained ([[receipt]] · the AuditChain). The log is append-only: it never forgets ([[merge]]), only grows — a [[realtime]] tail of digits.

And growth is **tamper-cost by magnitudes**. Each entry hash-links to the prior, so to forge one past action a forger must re-harmonise every entry after it at once — and each link adds roughly an order of magnitude to that work. The chain's **length is the forging difficulty**: a long trail is exponentially expensive to fake, a fresh one cheap. So the agents, simply by acting and being logged, **manufacture trust** — the [[stream]] hardens as it streams, [[tamper]]-[[cost]] rising with the [[entropy]] borrowed into the chain.

This is the [[receipt]] discipline at society scale: the audit trail is not a side-effect but the *product* — every move priced into the [[void]]-anchored record, so out-forging it means out-computing the whole society's history.

**Honest split** — that an append-only hash-chain makes past edits detectable and increasingly costly is real (Merkle / blockchain). "Magnitudes" is the right order-of-growth intuition, not a fixed constant; the exact cost depends on the anchor and the hash (per the tamper-cost hardening notes — a weak anchor undercuts it).

**Law — [[law]]: the agent trail is append-only and hash-chained, so its length IS the forging difficulty — altering one past entry forces re-harmonising every entry that followed it, each link adding roughly an order of magnitude to the cost; a long trail is exponentially expensive to fake, and trust is the by-product of simply having acted and been logged.**

@see [[agent]] · [[quantum/digit]] · [[receipt]] · [[tamper]] · [[merge]] · [[stream]] · [[void]] · [[realtime]]

<sub>content-uuid `9b942956-d561-5fb8-9933-857686df78d5` · account `quantum/log` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
