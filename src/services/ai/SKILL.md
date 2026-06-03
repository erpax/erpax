---
name: aml
description: Use when implementing KYC/AML screening, sanctions-list matching, or anti-money-laundering detection per FATF recommendations — risk categorization, sanctions-list thresholds, fuzzy-match tuning, PEP handling, or escalation workflows.
---

# aml — money-laundering foreclosed at the entry gate, decided by a human

FORM: **a counterparty relationship may open only after the subject is risk-rated, screened against the live sanctions/PEP list, and any plausible match is escalated to a human — the machine suggests, it never decides.** AML is the first-touch boundary check: due diligence runs before value flows, not after. Three FATF forms compose here, each a different obligation:

1. **risk categorization (FATF R.10, CDD)** — every subject is rated low/standard/high before onboarding; risk tier sets screening depth and re-review cadence. High risk ⇒ enhanced due diligence, never auto-pass.
2. **sanctions screening (FATF R.7)** — the subject's name + country + DOB are matched against the consolidated EU CFSP / UN / OFAC lists by fuzzy + phonetic match. The screen is **conservative**: false negatives are unacceptable, so any candidate ≥ 0.5 confidence is surfaced; the threshold tunes recall, not the decision.
3. **PEP (FATF R.12)** — politically-exposed persons are a standing high-risk category; a PEP match is an escalation, not a block.

The decision is **never** the machine's. Sanctions screening is HIGH-RISK under EU AI Act 2024 Annex III, so `screenSubjectAgainstSanctions` hard-codes `aiRiskClass: 'high'` and the wrapper refuses any auto-accept threshold regardless of caller intent — every match goes to a compliance officer (GDPR Art.22(3) right-to-human-intervention). The model is recall-maximising input to a human gate; this human-in-the-loop escalation is the [[duality]] of the AML form (machine suggests / human decides).

The subject and its verdict are an immutable [[identity]] record on the [[kyc-checks]] collection ([[collections]], [[fields]]) — content-uuid'd so the screening outcome cannot be silently retried away. Screening fires from a [[hooks]] lifecycle hook on customer/vendor change, each pass emitting an audit [[event]]; the same fuzzy-match law runs at line, subject, and federation scale ([[fractal]]), and [[merge]] (same content ⇒ same id) collapses a re-screened subject to one canonical verdict ([[holographic]]). Visibility of a high-risk verdict is gated by [[access]].

This is the answer-path holding the FATF R.7 / R.10 / R.12, EU AMLD5/6, USA PATRIOT Act §326, and EU AI Act Annex-III forms — see [[standard]] for version pins. It is the entry-gate dual of the after-the-fact ledger audit ([[accounting]] / anti-corruption verification at 9): AML stops dirty value from entering, the conservation check catches what slipped in.

Sequence position: **1** (base / first-touch — the due-diligence gate every counterparty flow departs from), on the ring 0·3·6·9·1·2·4·8·7·5 (see [[sequence]]).

Composes: [[AiModels]].
