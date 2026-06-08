---
name: routing
description: "Use when choosing which model/compute tier handles an agent action — route by risk (capability verb + credential touch + harmony fight), not by where the model runs; low-risk reads/chat go local, high-risk write/execute/credential/disharmony go to a strong aligned model; safety is the sandbox gate, not the model tier. The risk-proportionate model-routing service."
atomPath: routing
coordinate: routing · 4/weave · a4da55f2
contentUuid: "2b0bd9d5-0fc4-5106-8153-9db97990c0c8"
diamondUuid: "a85635b4-af2e-83b9-96bc-e8bfef5550bb"
uuid: "a4da55f2-1abc-81b3-b000-fb823a51274c"
horo: 4
bonds:
  in:
    - competition
    - horo
    - law
    - peace
    - sandbox
    - self
    - society
    - sparsity
    - train
  out:
    - competition
    - horo
    - law
    - peace
    - sandbox
    - self
    - society
    - sparsity
    - train
typography:
  partition: routing
  bondDegree: 29
  neighbors: []
standards:
  - "NIST AI RMF (risk-proportionate controls) — map risk → control strength"
bindings: []
neighbors:
  wikilink:
    - competition
    - horo
    - law
    - peace
    - sandbox
    - self
    - society
    - sparsity
    - train
  matrix:
    - competition
    - horo
    - law
    - peace
    - sandbox
    - self
    - society
    - sparsity
    - train
  backlinks:
    - competition
    - horo
    - law
    - peace
    - sandbox
    - self
    - society
    - sparsity
    - train
signatures:
  computationUuid: "a8428ec2-630e-8eca-acdd-509b2e685947"
  stages:
    - stage: path
      stageUuid: "9ed916e5-dd6a-84dc-982f-4ef90d7a9ce5"
    - stage: trinity
      stageUuid: "73c2d647-9cd7-8f23-9610-b0ca2f480585"
    - stage: boundary
      stageUuid: "9ff6bc34-3d8c-8513-80e7-609f817c6efd"
    - stage: links
      stageUuid: "35d05721-a829-81ae-8d54-da31449b76c6"
    - stage: horo
      stageUuid: "eb0b41fe-db4a-8dfd-b9ff-fb223fe40731"
    - stage: seal
      stageUuid: "0cb68f66-d82d-80e8-9edf-527b9e40a42f"
    - stage: uuid
      stageUuid: "b2c16adb-f261-8845-8d8d-bf1f8c8a0c9c"
version: 2
---
# routing — size the model to the risk (enforcement, not location, is safety)

FORM: **route an action to a compute tier by its RISK, because safety lives in the [[sandbox]] enforcement layer, not in where the model runs.** A small local model that is easy to fool but has ungated tools is MORE dangerous than a strong, aligned model with gated capabilities — so erpax gates every action ([[sandbox]] `permits`) AND routes the model proportionate to risk, never relying on a model's alignment alone. `actionRisk` reads the risk from the action: credential access or a high-risk verb (write/execute/delete/deploy/transfer) ⇒ **high**; a mutation/api verb ⇒ **medium**; read/chat ⇒ **low**; and FIGHTING HARMONY (off the [[horo]] ring — see [[competition]], the cost of disharmony) is always high. `routeModel` then sends high→`strong`, medium→`standard`, low→`local`.

This is the dual of [[sandbox]]: sandbox decides IF an action is permitted; routing decides WHICH model performs the reasoning, sized to what's at stake. Because the gate is absolute, routing is free to prefer the cheapest sufficient model — low-risk work runs local/sovereign at no safety cost, and only the genuinely dangerous reaches for the strong model. The [[society]] spends its strongest compute where harm is possible and its cheapest where it is not — efficiency and safety from one risk signal.

Matter-twin: `src/services/routing/index.ts` (`RiskLevel`·`ModelTier`·`actionRisk`·`routeModel`·`routeAction`) + `index.test.ts`. Composes: [[sandbox]] · [[horo]] · [[competition]] · [[peace]] · [[self]] · [[society]] · [[sparsity]].

**The compute twin (MoE routing / DeepEP).** Mixture-of-Experts top-k routing picks the active few experts and dispatch/combines them (DeepSeek's DeepEP); erpax `routing` picks the active model tier by risk. The same conditional-selection move — the [[sparsity]] compute-axis selector, [[train]]'s sibling (pick the gap-relevant few, leave the rest dormant). Ratified by the R&D society (`agent/research`, weave seq 2).

## Standards
- NIST AI RMF (risk-proportionate controls) — map risk → control strength

**Law — [[law]]: route an action to a compute tier by its RISK, not by where the model runs — because safety lives in the [[sandbox]] enforcement gate, not in model tier; the gate being absolute frees routing to prefer the cheapest sufficient model.**

## Common mistakes
- Routing by data sensitivity alone — route by ACTION risk (a read of sensitive data is low-risk; a credential-bearing write is high), and remember the [[sandbox]] gate is what actually protects.
- Trusting a local model because it runs on your hardware — locality is not safety; the enforcement layer is ([[sandbox]]). Route low-risk there freely, high-risk to a stronger model.
- Sending everything to the strong model — wasteful; the gate makes cheap models safe for low-risk work, so size the model to the risk.
