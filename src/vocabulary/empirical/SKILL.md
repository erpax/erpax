---
name: empirical
description: "Use when a claim is grounded in observed data rather than assumed — the rate an @invariant holds at across real rows, a modal value or lifecycle DERIVED not invented, the measured distribution a model is fitted to. The agnostic restatement of provenance — name the origin generically as source, dissolve the row-level specifics into the akashic DB, and keep only the universal form in code. anonymise is the core of agnostic architecture and DRY naming."
atomPath: "vocabulary/empirical"
coordinate: "vocabulary/empirical · 5/round · 819fd37a"
contentUuid: "caa72bc0-d03b-500f-864d-ff406e9b4488"
diamondUuid: "d37df813-fc1f-8f32-8f09-2f87cd00a9f1"
uuid: "819fd37a-b095-8f24-b9be-4e0f4bfd8836"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "b531769c-9ed3-8a07-a7f1-a9998124f97d"
  stages:
    - stage: path
      stageUuid: "96533b46-fe27-860d-b20d-bf6c1d68ac50"
    - stage: trinity
      stageUuid: "dd14d057-d8c2-81bc-8108-e127ef5064fb"
    - stage: boundary
      stageUuid: "4602fbb6-0467-8b9b-8f47-43b6f94c67cc"
    - stage: links
      stageUuid: "eef3c1cb-1aa8-87b0-8765-ee851173463d"
    - stage: horo
      stageUuid: "9e230e5f-e1e1-8e02-bf97-ea2c604e1047"
    - stage: seal
      stageUuid: "33a52fb9-fd43-8709-a6a0-ac984b518029"
    - stage: uuid
      stageUuid: "8b58e4ad-11c7-8289-af53-71a82eacb9b3"
version: 2
---
# empirical — derived from the data, not invented

erpax's models are **empirical**: every constant, modal value, unit, and lifecycle is DERIVED from an observed [[source]] dataset, never hand-invented. *Change the [[source]] (another tenant, another period) and the model recomputes itself* — the [[derive]] (computed-not-hardcoded) law. The empirical stance is what lets a single universal form serve every tenant: the code holds the **shape**, the data holds the **values**.

**The warrant.** An `@invariant` earns its banner by the rate it holds at across observed rows — "holds in 100% of rows", "median 72%, p99 ≈ 166", "the dominant terminal". That rate is the *empirical warrant* for the law; it is **evidence**, recorded once, not a fact to re-type. The rows it was measured on are [[akashic]] matter — they live in the database, regenerable on demand, never catalogued in code.

**The agnostic law (why anonymise is core).** The warrant is stated **without naming the organisation it was measured at**. `"100% in <CompanyName>"` is a proper-noun leak — it couples a universal law to one source's identity, which is neither agnostic nor DRY. The agnostic form names the origin generically:

```
✗  efficiency ≈ 72%, p99 ≈ 166 in acme_production   (proper-noun leak)
✓  efficiency ≈ 72%, p99 ≈ 166 in the observed [[source]] data   (agnostic)
```

The company, the host, the calendar year, the exact row counts are **details** — they dissolve into the DB ([[akashic]] · [[lineage]]), and the code keeps only the universal form. To anonymise is therefore not cosmetic: it is the act that *makes* the architecture source-agnostic. Same shape, any [[source]] — the [[merge]] law applied to provenance.

**Neighbours.** Distinguish empirical (the epistemic *stance* — grounded in observed data) from [[baseline]] (the concrete *artifact* — the reference distribution a calibration computes from) and from [[zeropoint]] (the *selection rule* — of all forms, the lowest-entropy one is canonical). The trail that carries an empirical claim is [[lineage]] (origin → transform) and [[audit]] (the immutable evidence record); observed data enters erpax through [[port]] · [[ingest]] · [[seed]] and is summarised with [[sampling]] · [[outlier]] · [[measure]].

## Law

- **Derive, never invent.** A magic constant in code is a missing [[baseline]]; replace it with a value computed from observed [[source]] data.
- **Warrant, then dissolve.** State the empirical rate that justifies an `@invariant`; push the rows that prove it to [[akashic]]. Code carries the law, the DB carries the evidence.
- **Name the role, not the source.** Identifiers and prose name what a thing *is*, generically; the originating organisation is referenced only as [[source]], never by proper noun.

Composes [[source]] · [[baseline]] · [[akashic]] · [[lineage]] · [[audit]] · [[seed]] · [[ingest]] · [[port]] · [[sampling]] · [[outlier]] · [[measure]] · [[zeropoint]] · [[merge]] · [[manufacturing]].
