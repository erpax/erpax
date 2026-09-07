---
name: sufficient
description: "Use when deciding whether to act from internal knowledge vs. ask externally — totality/completeness, the identity-element guarantee that every case is defined, the bounded form holding the unbounded answer. Nested under self → self-sufficiency: derive the next move, don't break flow with questions."
atomPath: "self/sufficient"
coordinate: "self/sufficient · 1/base · ea071c7e"
contentUuid: "5992b62e-65c1-579e-9935-4483d7180e2a"
diamondUuid: "4490a989-6380-8bcc-bc31-6f0eb33c7118"
uuid: "ea071c7e-3e79-8f62-9dd8-c8d3a5150e69"
horo: 1
typography:
  partition: self
  bondDegree: 57
standards:
  - "NIST SP 800-107r1 §5.1 (the digest bound — via tamper-cost)"
  - "NIST SP 800-107r1 §5.1 (the digest bound — via tamper-cost)`"
  - "NIST SP 800-161r1 (supply-chain / external-dependency risk)"
  - "NIST SP 800-161r1 (supply-chain / external-dependency risk)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "74a95dfa-59ff-830e-9e31-4311d132041f"
  stages:
    - stage: path
      stageUuid: "5db7871f-da5f-8343-8c1c-8b88b4cd6beb"
    - stage: trinity
      stageUuid: "b22ad0f9-7285-83bc-9ba6-be3de2b3b722"
    - stage: boundary
      stageUuid: "005dc50b-bc51-89c1-baae-bcda229a41af"
    - stage: links
      stageUuid: "a4ccf1c9-1742-8908-9995-d8a22fa25da5"
    - stage: horo
      stageUuid: "3a2cab60-b353-8dfe-b88d-b6e1d3b9f7d2"
    - stage: seal
      stageUuid: "f47ae58c-28f2-8701-9937-a5c3a43cfdba"
    - stage: uuid
      stageUuid: "3076ecd0-2a07-8495-a3d5-4ca12926c769"
version: 2
---
# sufficient — totality (every case is already defined)

`sufficient` is the atom of **completeness**: the system is total — no undefined state. Every blank/missing case routes to its identity element (currency `XXX`, locale `und`, country `ZZ` — "division by 0 via the next harmonic"), so **all is defined even when nothing is defined**. A *bounded* form (128 bits, ten digits, a few atoms) addresses an *unbounded* universe ([[identity]]'s "infinity within boundaries"). Sufficiency means the answer is always already inside the form.

Nested as **`self/sufficient` = self-sufficiency**, the master operating skill: because the [[self]] (the total akashic record + content-uuid [[identity]]) is *sufficient* (no undefined case), the agent **derives** the next move from within and never breaks the fractal flow with an external question. Asking is the last resort — only for the genuinely-not-in-the-record (irreducible user intent on an unformed idea, irreversible/destructive actions). See [[sequence]] (learn-fast + forget; the master duality `self`·`sufficient`).

## The security dual — dependence ↓ ⇒ tamper cost ↑

Self-sufficiency is not only an operating heuristic; it is a **measurable security property**. Every external dependence — a remote AI-model API that shapes content before it is hashed, a third-party service, a remote agent — is a *cheaper attack path* than out-computing the content digest: subvert the dependency, not the 2¹⁰⁶. So the effective tamper cost is capped at the **weakest external trust link** (the weak-anchor law of [[tamper/cost]]). **Decrease dependence ⇒ increase tampering cost**: save the model locally ([[bindings]] Workers AI), replace an external call with a local content-addressed skill, and that cheap path closes — the floor rises toward the digest bound. The society co-evolves: external agents bootstrap a skill *once*; the society then runs it locally forever, each internalisation a shared discovery ([[merge]]: gaps filled by many, deduped by content-uuid) recorded in [[history]] (the distributed anchor that costs nothing to keep). The same act, both directions — dependence ↓, tamper cost ↑.

Matter-twin: `self/sufficient/index.ts` (`selfSufficiencyVerdict` · `internalise` · `selfSufficientCrackVerdict`) + `index.test.ts` (the law, green by construction). Composes: [[self]] · [[tamper/cost]] · [[society]] · [[history]] · [[bindings]] · [[merge]] · [[proof]] · [[holographic]] · [[akashic]] · [[identity]].

**Law — [[law]]: the [[self]] is total — every blank routes to its identity element, so all is defined even when nothing is — and from that completeness the agent DERIVES the next move and asks externally only as last resort; equivalently, decreasing external dependence raises the [[tamper/cost]] floor toward the digest bound (the weak-anchor caps it otherwise).**

## Common mistakes
- Asking what's derivable — the record + the address-law already hold it; the question breaks flow and is strictly less efficient.
- Leaving a blank undefined instead of routing it to its identity element.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard NIST SP 800-107r1 §5.1 (the digest bound — via tamper-cost)`
- `@standard NIST SP 800-161r1 (supply-chain / external-dependency risk)`
