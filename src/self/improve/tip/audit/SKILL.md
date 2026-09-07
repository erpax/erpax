---
name: audit
description: "Use when asking what is actually blocking — the feed scan that finds real gaps and ranks them by unblock / (cost × risk), reading only the NAMES of secrets, never their values."
atomPath: "self/improve/tip/audit"
coordinate: "self/improve/tip/audit · 5/round · 2b4e7423"
contentUuid: "814ba1e7-95ae-5b68-ba72-d3151a438507"
diamondUuid: "5887b3cd-d046-8e83-a6f8-c7ed040d70d8"
uuid: "2b4e7423-56b4-8f3a-a000-3aa2d80bc675"
horo: 5
typography:
  partition: self
  bondDegree: 137
standards: []
bindings: []
signatures:
  computationUuid: "27922553-b778-8f49-abc0-5fbaa8d3931f"
  stages:
    - stage: path
      stageUuid: "2a2ac373-f7a6-80b6-b674-bab02884e603"
    - stage: trinity
      stageUuid: "7469b8f0-bd19-8ed5-833a-63f9998d8212"
    - stage: boundary
      stageUuid: "0d4856cd-1a75-832a-836a-726fcdd04cbd"
    - stage: links
      stageUuid: "609cf109-8608-8c95-b209-2fc0472186dc"
    - stage: horo
      stageUuid: "3a3aed26-5c98-8605-9c6e-a8b30189c0f9"
    - stage: seal
      stageUuid: "74bbcdc0-d48d-82a4-8a50-6d90fb607ee5"
    - stage: uuid
      stageUuid: "489765ad-22b0-8911-b0f9-c3e56e913e4d"
version: 2
---
# self/improve/tip/audit — what is blocking, scored

`scoreGap` is the whole ranking rule: **unblock / (cost × risk)**, floored to an integer so the order is stable. The highest wins; there is no tie-break by taste.

`auditSelfDevGaps` finds the gaps by measuring — the leftover sites, the wave attractions, the residual admin TTFB — never by asking an agent what it thinks is important.

`secretNamesPresent` reads the **names** of secrets in `.env` and never a value. A tip that depends on a credential can then be gated on the credential *existing* without the credential ever being read: the gate learns "the fuse password is set" and nothing more.

**Honest boundary.** A gap is a CANDIDATE, scored — never a verdict that the work is worth doing. The score ranks what the scan can see; a blockage nothing measures is invisible here, and that is the loop's standing gap rather than proof it has none.

Composes: [[self]] · [[leftover]] · [[algebra]].
