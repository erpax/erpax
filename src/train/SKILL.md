---
name: train
description: "Use when auto-training an actor (user, employee, or agent) toward best efficiency in the app — closing the competency gap (required − held) by routing each deficit to the skillRoute that fills it, the gap priced as a decompression debt that off-gasses toward the role's M-value. Efficiency IS the pay-fraction (etrima efficiency_percent); training literally raises pay."
atomPath: train
coordinate: "train · 2/share · f1914636"
contentUuid: "1846dc41-ecc2-5657-89db-79312dbc118a"
diamondUuid: "d02840e4-ae86-820e-ac6b-fb5c35f858a0"
uuid: "f1914636-5c71-8752-9c22-cefa6a9c9312"
horo: 2
typography:
  partition: train
  bondDegree: 90
standards:
  - "ISO 30405:2016 essential-vs-optional (mandatory gates the surface)"
  - "ISO 30405:2016 essential-vs-optional (mandatory gates the surface)`"
  - SFIA
  - "SFIA 8 responsibility-levels-1-7 (the held/required/efficiency scale)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3240007a-0201-8afb-926d-f040901fb402"
  stages:
    - stage: path
      stageUuid: "a67248fb-3e0d-87f5-a3e2-ec84b3e1290e"
    - stage: trinity
      stageUuid: "734ba4b1-cabf-8f2a-8aba-8f1c660dec3f"
    - stage: boundary
      stageUuid: "3667f008-d9c8-8e04-941a-4805a5bfbb26"
    - stage: links
      stageUuid: "6c13a299-911d-83d5-a94d-21f5c4befccb"
    - stage: horo
      stageUuid: "cad96b52-ff21-8900-9997-774de1a42a00"
    - stage: seal
      stageUuid: "d3ee79bb-827b-8f01-a69d-14db001a86ad"
    - stage: uuid
      stageUuid: "3003fd62-c1dc-88fc-8fe6-7dd5b8bbaa0b"
version: 2
---
# train — close the competency gap, off-gas the debt, climb the pay curve

FORM: **measure the actor's gap to the role, route each deficit to the skill that closes it, and let pay climb the one curve as efficiency rises.** A role's required competencies minus an actor's held competencies is the [[competency/gap]] — and that gap IS a [[decompression]] debt: capability the role demands that the actor has not yet verified. Training off-gasses it. `index.test.ts` proves the laws.

**Efficiency is the pay-fraction.** `efficiency(held, required)` is the match-score — the fraction of required competencies met, on the shared SFIA scale. It is exactly etrima's `efficiency_percent` (`minutes_produced / presence_minutes`) made general and app-wide, and it is the SAME fraction that prices the pay: `efficiencyRate` runs the [[decompression]] curve `anchor × (1 + efficiency·(M−1))`, climbing from the fundamental ([[allocation]] base, the Schumann anchor) toward the role's M-value ceiling (`levelCeiling(level)`, the [[horo]] ring digit). Efficiency 0 ⇒ base; efficiency 1 ⇒ the ceiling — the surface, where the debt is fully off-gassed. The incentive and the competence are one number: **training is the raise.**

**The plan drives the tail.** `trainingPlan` lists every open gap, routed to the competency's `skillRoute` (the SKILL.md node that closes it), ordered MANDATORY-first then by largest gap — the binding deficit first, exactly the `tsc`/[[aura]] convergence aimed at the actor instead of the corpus. `nextStep` is the single most-binding move (the one breath); `isProficient` is the close gate (every mandatory met ⇒ safe to staff the role). `competencyDebt` is the conserved deficit that drives to 0.

**The merge realised.** The route that closes a gap is the competency's `skillRoute` — so the SAME corpus the agents load to DO the work is the curriculum that trains the humans ([[merge]]: a skill, a competency, a job requirement, and a training step are one content-addressed node). The society that [[generate]]s its skills auto-trains its people from the same nodes; the loop eats its own tail.

**The compute twin (ESFT).** DeepSeek's Expert Specialized Fine-Tuning trains only the experts a task actually engages and freezes the rest — a sparse, targeted update, cheaper than full fine-tuning and ability-preserving. `trainingPlan` is the identical move aimed at an actor: route only the OPEN gaps (required − held > 0) to their gap-closing `skillRoute`, mandatory-first, and leave every held competency untouched. Select the gap-relevant few, update only those, freeze the rest — the [[sparsity]] compute axis (activate few of many) turned on the workforce. Ratified by the R&D society (`agent/research`, weave seq 3).

Matter-twin: `src/train/index.ts` (pure — held/required/routes passed in; a [[hooks]] hook reads the actor's held lines + the position's required lines and emits the plan). Composes: [[competency/gap]] · [[decompression]] · [[allocation]] · [[positions]] · [[horo]] · [[merge]] · [[generate]] · [[aura]] · [[sparsity]] · [[self]] · [[society]] · [[sequence]] · [[hooks]].

**Law — [[law]]: efficiency (the fraction of required competencies met) IS the pay-fraction — training routes each [[competency/gap]] deficit to its gap-closing `skillRoute`, off-gassing the [[decompression]] debt, and the same one number prices the pay.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 30405:2016 essential-vs-optional (mandatory gates the surface)`

- SFIA 8 responsibility-levels-1-7 (the held/required/efficiency scale)
- ISO 30405:2016 essential-vs-optional (mandatory gates the surface)
- Audit: ISO 19011 — efficiency, debt and pay are deterministic functions of the gap

## Common mistakes
- Pricing pay off credentials instead of verified efficiency — pay tracks the match-score (the off-gassed fraction), never the certificate ([[allocation]]).
- Dropping a gap with no known `skillRoute` — list it with route '' (still a deficit to fill, the next atom to [[generate]]); never silently omit it.
- Letting unverified competence bank as full pay — the gradient-factor band caps the early surface; the M-value is never crossed ([[decompression]]).
