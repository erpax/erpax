---
name: "act"
description: "Use when implementing or referencing EU AI Act 2024."
---

# EU AI Act 2024

Regulation (EU) 2024/1689 — risk-class taxonomy, Art.5 prohibited practices, Art.6 + Annex III high-risk classification, Art.50 transparency obligations, Art.53 general-purpose AI.

## Scope

This module exports the 4-class risk taxonomy (`minimal`, `limited`, `high`, `prohibited`), human-readable labels, Payload select options, and the `canAutoAccept(riskClass)` predicate that the AI chokepoint uses to enforce human-in-the-loop for high-risk classifications per Art.14.

## Out of scope

- Per-handler risk classification — each AI use case in `src/services/ai/<handler>.ts` declares its own `aiRiskClass` constant; this module is the registry, not the per-handler decision.
- Conformity assessment under Art.43 — that's a per-deployment compliance procedure, not a code-level concern.
- Member-state-level AI governance overlays (e.g. Spain's AESIA, France's CNIL AI guidance).

**Law — [[law]]: the registry of the four-class AI risk taxonomy (minimal/limited/high/prohibited) and the `canAutoAccept(riskClass)` predicate that forces human-in-the-loop for high-risk — the registry, not the per-handler classification.**

## Citations

- EU AI Act 2024 — Regulation (EU) 2024/1689 (Official Journal L 1689, 12 July 2024)
- ISO/IEC 23894:2023 — AI risk management
- ISO/IEC 42001:2023 — AI management system
- NIST AI RMF 1.0
- GDPR Art.22 (automated individual decision-making — companion regulation)
