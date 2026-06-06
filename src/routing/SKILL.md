---
name: routing
description: "Use when choosing which model/compute tier handles an agent action — route by risk (capability verb + credential touch + harmony fight), not by where the model runs; low-risk reads/chat go local, high-risk write/execute/credential/disharmony go to a strong aligned model; safety is the sandbox gate, not the model tier. The risk-proportionate model-routing service."
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
