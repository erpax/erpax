---
name: grounded
description: "Use when checking that a trust computation sources only from sealed content — erpax's tamper-cost (coverageCostLog2 ← collider ← convention) is priced on 6 conventions that scan process.cwd()/src, the mutable unsealed working tree, so the forge-cost reduces to an unverified directory listing; reads git-HEAD-sealed blobs (SHA-addressed) and returns the grounded fraction (11/17), pricing its own provenance into the cost."
atomPath: grounded
coordinate: "grounded · 7/descent · 3313497c"
contentUuid: "770b28f0-e427-53ed-af16-f59b5aacb863"
diamondUuid: "f3143701-4744-8dd3-829d-d79b7447c2fd"
uuid: "3313497c-7bec-8693-850b-a2ab35587b00"
horo: 7
typography:
  partition: grounded
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "7719e33f-2d31-863f-9c62-ebe90a25344a"
  stages:
    - stage: path
      stageUuid: "aae50bcb-cfa5-846a-84ac-c051e83c1dce"
    - stage: trinity
      stageUuid: "ea306afb-d7b1-80fa-8013-d5aaceda2e94"
    - stage: boundary
      stageUuid: "709f01d9-1ec5-837b-a603-a3669c84f5bc"
    - stage: links
      stageUuid: "7e2636be-7d04-809a-9163-f1c9e59a498d"
    - stage: horo
      stageUuid: "a909c7e9-7b5f-837c-a02d-7477332d05eb"
    - stage: seal
      stageUuid: "09d5738b-9b1a-8a5c-9660-bd46fc26a4b9"
    - stage: uuid
      stageUuid: "74555487-c03b-8537-89f6-8c23a3054ca1"
version: 2
---
# grounded — a trust computation may source only from sealed content

The forge-cost is only as trustworthy as its inputs. Traced to the leaves, erpax's tamper-cost (`coverageCostLog2` ← [[collider]] ← [[convention]]) is priced on the coverage of 17 conventions — and **6 of them** (`complete · fresh · link · sealed · sourced · twinned`) compute that coverage with `readFileSync`/`readdirSync` over `process.cwd()/src`: the **mutable, unsealed working tree**. Even the `sealed` convention pattern-matches bytes and **never verifies a content-uuid**. So the impressive number reduces to *an unverified directory listing* — it measures dev-tree tidiness, not tamper-resistance. Run it from another cwd, or against a substituted `src/`, and it prices whatever is there.

**A computation is trustworthy only if its whole input closure is sealed** — content-addressed, so tampering changes the address and breaks the seal (the entanglement). One raw `process.cwd()` read collapses the chain, and no amount of downstream math repairs it: `coverageCostLog2(scan(cwd))` is the value of a `ls`, dressed as a proof.

## What it computes

`sealedSource(path)` reads the **committed** blob — `git show HEAD:<path>` — addressed by its SHA, which **is** the seal; it never reads the working tree. `isGrounded(c)` is true only when a convention's sealed source exists **and** contains no raw `process.cwd()`/fs read. `coverage()` is the grounded fraction — currently **11/17 = 0.647** — and `ungrounded()` is the fix list.

Composed into the [[collider]], the forge-cost can no longer be ∞ while any of its own inputs is ungrounded: joint coverage ≤ 0.647 ⇒ a **finite** cost that honestly reflects its unsealed provenance. Reground each input — read sealed content and verify its content-uuid so a tampered byte drops coverage — and the number, and the trust, rise together. This atom **obeys its own law**: it reads git-sealed content, so it is grounded in the very sense it measures.

**Honest boundary.** This proves an input is *sourced from sealed content*, never that the seal is *cryptographically unforgeable* — git SHA-1 addressing is content-binding, not a PQ commitment. And a grounded convention can still be *wrong*; grounding closes the door where an unsealed scan silently substitutes reality, which is the door the forge-cost claim walked through.

**Law — [[law]]: a trust computation is grounded only when every input is sealed content verified against its address; a coverage priced on a `process.cwd()` scan is the value of a directory listing, not a proof — reground it or drop the claim.**

Composes: [[collider]] · [[convention]] · [[cost]] · [[seal]] · [[law]].
