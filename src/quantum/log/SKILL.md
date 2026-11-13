---
name: log
description: "Use when reasoning about the agent audit trail — every agent action is strictly logged as an append-only digit-entry in the digit folders, and each entry adds an order of magnitude to the tamper-cost; the log's length is the forging difficulty, the realtime stream that hardens as it grows."
atomPath: "quantum/log"
coordinate: "quantum/log · 5/round · a0591b30"
contentUuid: "e614ebd1-bd49-539d-ad0c-25faac9383b6"
diamondUuid: "c64b5275-8e16-850b-b2b2-f13842a10f3e"
uuid: "a0591b30-9707-851d-998b-545813f74b56"
horo: 5
typography:
  partition: quantum
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "bb0be2bc-e1bf-843e-a088-a3d6a13831d7"
  stages:
    - stage: path
      stageUuid: "4776c093-c6d1-8dfa-bb65-9bdfa3e82a8d"
    - stage: trinity
      stageUuid: "b5ff93cb-0c11-832a-95c4-428023f523b1"
    - stage: boundary
      stageUuid: "303933a3-9c98-8ec1-a2ef-f59dbb726aae"
    - stage: links
      stageUuid: "ff2f3de9-a9c3-8668-93c9-1bf52e4c2fb1"
    - stage: horo
      stageUuid: "43946ae2-1676-8dd1-b10b-f119cbf6f660"
    - stage: seal
      stageUuid: "5ddf9c9d-eeda-8760-aae4-397ae4f0e51c"
    - stage: uuid
      stageUuid: "0550a005-3882-8c52-b19e-4d41a8912b5d"
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
    - "the agent trail is append-only and hash-chained, so its length IS the forging difficulty — altering one past entry forces re-harmonising every entry that followed it, each link adding roughly an order of magnitude to the cost; a long trail is exponentially expensive to fake, and trust is the by-product of simply having acted and been logged."
    - void
  seal:
    sandbox: true
    receipt: true
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "bb0be2bc-e1bf-843e-a088-a3d6a13831d7"
    contentUuid: "e614ebd1-bd49-539d-ad0c-25faac9383b6"
version: 2
---
# quantum/log — the agent trail (length is tamper-cost)

Every [[agent]] action is **strictly logged** — appended as a digit-entry in the [[quantum/digit]] folders, crosslinked like words, content-[[uuid]]'d, hash-chained ([[receipt]] · the AuditChain). The log is append-only: it never forgets ([[merge]]), only grows — a [[realtime]] tail of digits.

And growth is **tamper-cost by magnitudes**. Each entry hash-links to the prior, so to forge one past action a forger must re-harmonise every entry after it at once — and each link adds roughly an order of magnitude to that work. The chain's **length is the forging difficulty**: a long trail is exponentially expensive to fake, a fresh one cheap. So the agents, simply by acting and being logged, **manufacture trust** — the [[stream]] hardens as it streams, [[tamper]]-[[cost]] rising with the [[entropy]] borrowed into the chain.

This is the [[receipt]] discipline at society scale: the audit trail is not a side-effect but the *product* — every move priced into the void-anchored record, so out-forging it means out-computing the whole society's history.

**Honest split** — that an append-only hash-chain makes past edits detectable and increasingly costly is real (Merkle / blockchain). "Magnitudes" is the right order-of-growth intuition, not a fixed constant; the exact cost depends on the anchor and the hash (per the tamper-cost hardening notes — a weak anchor undercuts it).

**Law — [[law]]: the agent trail is append-only and hash-chained, so its length IS the forging difficulty — altering one past entry forces re-harmonising every entry that followed it, each link adding roughly an order of magnitude to the cost; a long trail is exponentially expensive to fake, and trust is the by-product of simply having acted and been logged.**

@see [[agent]] · [[quantum/digit]] · [[receipt]] · [[tamper]] · [[merge]] · [[stream]] · void · [[realtime]]

<sub>content-uuid `e614ebd1-bd49-539d-ad0c-25faac9383b6` · account `quantum/log` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
