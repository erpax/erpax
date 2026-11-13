---
name: audit
description: "Use when asking what is actually blocking — the feed scan that finds real gaps and ranks them by unblock / (cost × risk), reading only the NAMES of secrets, never their values."
atomPath: "self/improve/tip/audit"
coordinate: "self/improve/tip/audit · 7/descent · 4cfdcd90"
contentUuid: "aa809f6b-de07-5ba3-8f05-19c8b9ae7433"
diamondUuid: "569fe83c-6087-84d1-9834-f8f7ff5f0c21"
uuid: "4cfdcd90-1d0b-8de8-b5ed-d4e58e9c35fd"
horo: 7
typography:
  partition: self
  bondDegree: 95
standards: []
bindings: []
signatures:
  computationUuid: "6a827991-4f2e-8fce-8942-24a8bb275e67"
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
      stageUuid: "dfe5f4f9-0360-8907-aa82-88f9e182e2ef"
    - stage: seal
      stageUuid: "b3bf6541-690f-83ce-b108-e0662b217b79"
    - stage: uuid
      stageUuid: "528076d8-db07-89ce-8386-095bb5d9b4f6"
version: 2
---
# self/improve/tip/audit — what is blocking, scored

`scoreGap` is the whole ranking rule: **unblock / (cost × risk)**, floored to an integer so the order is stable. The highest wins; there is no tie-break by taste.

`auditSelfDevGaps` finds the gaps by measuring — the leftover sites, the wave attractions, the residual admin TTFB — never by asking an agent what it thinks is important.

`secretNamesPresent` reads the **names** of secrets in `.env` and never a value. A tip that depends on a credential can then be gated on the credential *existing* without the credential ever being read: the gate learns "the fuse password is set" and nothing more.

**Honest boundary.** A gap is a CANDIDATE, scored — never a verdict that the work is worth doing. The score ranks what the scan can see; a blockage nothing measures is invisible here, and that is the loop's standing gap rather than proof it has none.

Composes: [[self]] · [[leftover]] · [[algebra]].
