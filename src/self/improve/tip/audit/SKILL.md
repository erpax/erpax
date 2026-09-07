---
name: audit
description: "Use when asking what is actually blocking — the feed scan that finds real gaps and ranks them by unblock / (cost × risk), reading only the NAMES of secrets, never their values."
atomPath: "self/improve/tip/audit"
coordinate: "self/improve/tip/audit · 1/base · f74b0182"
contentUuid: "60e4a311-77b8-5b30-bdc3-d24020b002c8"
diamondUuid: "68e6f956-3b4d-82b4-95d9-7a83670eec67"
uuid: "f74b0182-090b-86a7-8ec6-ce34b6b43f45"
horo: 1
typography:
  partition: self
  bondDegree: 137
standards: []
bindings: []
signatures:
  computationUuid: "03c89f85-58f8-8418-bf67-6dd110c7b66b"
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
      stageUuid: "9d000b74-d40d-870c-9526-accc3f7313b3"
    - stage: seal
      stageUuid: "74bbcdc0-d48d-82a4-8a50-6d90fb607ee5"
    - stage: uuid
      stageUuid: "51f78fed-05f8-8f98-833d-6e4c49bd960e"
version: 2
---
# self/improve/tip/audit — what is blocking, scored

`scoreGap` is the whole ranking rule: **unblock / (cost × risk)**, floored to an integer so the order is stable. The highest wins; there is no tie-break by taste.

`auditSelfDevGaps` finds the gaps by measuring — the leftover sites, the wave attractions, the residual admin TTFB — never by asking an agent what it thinks is important.

`secretNamesPresent` reads the **names** of secrets in `.env` and never a value. A tip that depends on a credential can then be gated on the credential *existing* without the credential ever being read: the gate learns "the fuse password is set" and nothing more.

**Honest boundary.** A gap is a CANDIDATE, scored — never a verdict that the work is worth doing. The score ranks what the scan can see; a blockage nothing measures is invisible here, and that is the loop's standing gap rather than proof it has none.

Composes: [[self]] · [[leftover]] · [[algebra]].
