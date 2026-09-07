---
name: audit
description: "Use when asking what is actually blocking — the feed scan that finds real gaps and ranks them by unblock / (cost × risk), reading only the NAMES of secrets, never their values."
atomPath: "self/improve/tip/audit"
coordinate: "self/improve/tip/audit · 7/descent · b7b38978"
contentUuid: "a32d01e9-b5ed-5d52-8498-7205d51f328d"
diamondUuid: "7f3cc783-24bf-8c39-a30e-92a3879753c9"
uuid: "b7b38978-d617-8833-b4c9-59a127ef8042"
horo: 7
typography:
  partition: self
  bondDegree: 125
standards: []
bindings: []
signatures:
  computationUuid: "8e2c9925-0adc-8b7f-b945-7f10ed827abc"
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
      stageUuid: "48cb7a48-dac9-8185-bf0d-57ddca9c5cdd"
    - stage: seal
      stageUuid: "74bbcdc0-d48d-82a4-8a50-6d90fb607ee5"
    - stage: uuid
      stageUuid: "c6fbbe7b-c29b-82ef-aa8b-d0f1898600b4"
version: 2
---
# self/improve/tip/audit — what is blocking, scored

`scoreGap` is the whole ranking rule: **unblock / (cost × risk)**, floored to an integer so the order is stable. The highest wins; there is no tie-break by taste.

`auditSelfDevGaps` finds the gaps by measuring — the leftover sites, the wave attractions, the residual admin TTFB — never by asking an agent what it thinks is important.

`secretNamesPresent` reads the **names** of secrets in `.env` and never a value. A tip that depends on a credential can then be gated on the credential *existing* without the credential ever being read: the gate learns "the fuse password is set" and nothing more.

**Honest boundary.** A gap is a CANDIDATE, scored — never a verdict that the work is worth doing. The score ranks what the scan can see; a blockage nothing measures is invisible here, and that is the loop's standing gap rather than proof it has none.

Composes: [[self]] · [[leftover]] · [[algebra]].
