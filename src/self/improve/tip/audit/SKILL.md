---
name: audit
description: "Use when asking what is actually blocking — the feed scan that finds real gaps and ranks them by unblock / (cost × risk), reading only the NAMES of secrets, never their values."
atomPath: "self/improve/tip/audit"
coordinate: "self/improve/tip/audit · 8/crest · a79d759f"
contentUuid: "8efab7ff-8502-50ef-9110-42ebbb1d8784"
diamondUuid: "23d43a4c-d198-8bb5-ac5e-94c17cf2e535"
uuid: "a79d759f-2bf3-8c7a-981d-906d554352b9"
horo: 8
typography:
  partition: self
  bondDegree: 137
standards: []
bindings: []
signatures:
  computationUuid: "fd1d25e1-3ea7-8991-9d11-72a5e7005ecf"
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
      stageUuid: "7aa80672-65d7-893c-98b9-c85478d2a837"
    - stage: seal
      stageUuid: "74bbcdc0-d48d-82a4-8a50-6d90fb607ee5"
    - stage: uuid
      stageUuid: "f91f0e43-1fb7-8291-bfc6-3c5cf7b054a7"
version: 2
---
# self/improve/tip/audit — what is blocking, scored

`scoreGap` is the whole ranking rule: **unblock / (cost × risk)**, floored to an integer so the order is stable. The highest wins; there is no tie-break by taste.

`auditSelfDevGaps` finds the gaps by measuring — the leftover sites, the wave attractions, the residual admin TTFB — never by asking an agent what it thinks is important.

`secretNamesPresent` reads the **names** of secrets in `.env` and never a value. A tip that depends on a credential can then be gated on the credential *existing* without the credential ever being read: the gate learns "the fuse password is set" and nothing more.

**Honest boundary.** A gap is a CANDIDATE, scored — never a verdict that the work is worth doing. The score ranks what the scan can see; a blockage nothing measures is invisible here, and that is the loop's standing gap rather than proof it has none.

Composes: [[self]] · [[leftover]] · [[algebra]].
