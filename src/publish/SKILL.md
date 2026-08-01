---
name: publish
description: "Use when automating commit and push — the local agent that performs the git action, but ONLY through the computed decision (decide), trained on quantum security (tamper · quantum) and the standards, fail-closed, with a tamper-evident uuid-chained receipt. It pushes because the gates said yes, never because it was told to."
atomPath: publish
coordinate: "publish · 7/descent · 0c513974"
contentUuid: "da59d73c-79f6-5a5a-bdb1-ea10c18909c9"
diamondUuid: "fc9a417c-8e56-8af8-876b-110b2992fd7a"
uuid: "0c513974-feee-8f61-b362-d6235da11dd5"
horo: 7
typography:
  partition: publish
  bondDegree: 36
standards: []
bindings: []
signatures:
  computationUuid: "3f1152d2-c2aa-8069-b114-5dc1e5b171ab"
  stages:
    - stage: path
      stageUuid: "4f8f1fd9-c16a-88a3-bb74-43cc4ec8e934"
    - stage: trinity
      stageUuid: "754fae26-b390-86c9-8ac2-c4719cdaac29"
    - stage: boundary
      stageUuid: "d5c2eed5-9133-8839-888f-c981ed3e314c"
    - stage: links
      stageUuid: "dc2745c8-c33d-8afd-97a1-bc369b9f68b1"
    - stage: horo
      stageUuid: "668b01a2-411d-8d33-8b7d-ff112ad12a26"
    - stage: seal
      stageUuid: "6ac55438-76ca-83e2-a915-e1386ce31b39"
    - stage: uuid
      stageUuid: "7125578b-d21b-8df1-9afd-89140cb62880"
version: 2
---
# publish — the local agent that automates commit and push, trained in quantum security and the standards

[[decide]] computes **whether** a commit/push is warranted and names **who** decides — then stops: *"pulling the trigger is not this atom's."* `publish` is the trigger, but a **trained** one. It does not push because an operator said so; it pushes because the gates it is trained on all said yes, and it **refuses the moment one says no**.

## The training is literal

The agent's push authority is the conjunction of the gates it is trained on — nothing is discretionary:

| lane | gate | decides |
| --- | --- | --- |
| write-time seal | [[confirm]] — trinity · dead-links/refs · import purity | the **commit** |
| quantum security | [[tamper]] · [[quantum]] · [[security]] — tamper-cost, no leak | a **push** lane |
| the standards | [[standards]] — compliance green | a **push** lane |
| it LOADS | [[gate]] lane zero | a **push** lane |

**Trained is a precondition, not a bonus.** An agent handed **no** security lane, or **no** standards lane, has nothing to be trained on — so it may not push, even a perfectly clean commit. `trained:security` and `trained:standards` are fail-closed verdicts that make *"trained in quantum security AND the standards"* a literal gate, named when it blocks.

## Fail-closed, and push ⊇ commit

Inherited from [[decide]] / [[guardian]]: a lane that did not run, or did not literally pass, is **not a yes**. And a push folds the commit verdicts in — **you cannot push what you could not commit**. The three stable outcomes:

- `refused` — the commit decision blocked; git is never touched.
- `committed` — committed, but a security/standards/load lane blocked the push (the commit stands, the push waits).
- `pushed` — every gate green; committed then pushed, in order.

## The receipt

Every act emits a tamper-evident **receipt** ([[merge]].chainLeaf) — uuid-chained to the prior act, deterministic (same act + same prior ⇒ same leaf, no clock). So the automation is auditable and its history cannot be silently re-ordered: what was pushed, on whose authority, in what sequence.

**Honest boundary.** The agent **executes** the decision; it never **weakens** the gate. The verdicts must be **real** — produced by actually running the security and standards gates (CI / the caller), never asserted green — and the agent never fabricates a pass. The git side effects are **injected** (`GitRunner`), so the decision is provable hermetically and the one place that touches the remote is explicit and swappable. **This automates the push; it does not automate trust** — trust is the gates being genuinely green, which is earned, not granted.

**Law — [[law]]: commit and push are automated by an agent that acts only on the computed decision — trained in quantum security and the standards as a fail-closed precondition, refusing the moment a lane says no, and receipting every act uuid-chained. It pushes because the gates said yes, never because it was told to.**

## Standards

- **ISO/IEC 27001** — the security posture the agent is trained on before it may push outward.
- **ISO-19011:2018 §6.4** — the receipt is audit evidence: every automated act leads to who authorised it.

Composes: [[decide]] · [[confirm]] · [[tamper]] · [[standards]] · [[merge]] · [[guardian]] · [[law]].
