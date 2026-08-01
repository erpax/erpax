---
name: empirical
description: "Use when a claim is grounded in observed data rather than assumed — the rate an @invariant holds at across real rows, a modal value or lifecycle DERIVED not invented, the measured distribution a model is fitted to. The agnostic restatement of provenance — name the origin generically as [[source]], dissolve the row-level specifics into the [[akashic]] DB, and keep only the universal form in code. anonymise is the core of agnostic architecture and DRY naming."
atomPath: "vocabulary/empirical"
coordinate: "vocabulary/empirical · 4/weave · 5f7ddb0b"
contentUuid: "49f71346-49f2-5714-8d9c-93433d292cd7"
diamondUuid: "b844a2a4-6a99-8138-ac08-950234386f5f"
uuid: "5f7ddb0b-5dd7-8f6d-b2d9-e8a7dbf7c444"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "a539ef38-19ae-8ba9-a51f-2ba1fe778f38"
  stages:
    - stage: path
      stageUuid: "96533b46-fe27-860d-b20d-bf6c1d68ac50"
    - stage: trinity
      stageUuid: "dd14d057-d8c2-81bc-8108-e127ef5064fb"
    - stage: boundary
      stageUuid: "4602fbb6-0467-8b9b-8f47-43b6f94c67cc"
    - stage: links
      stageUuid: "3cb48605-2cee-82fb-a28b-1f82c32c4a28"
    - stage: horo
      stageUuid: "677de384-2317-8326-801e-e7c06fce41f3"
    - stage: seal
      stageUuid: "784c99fa-cda2-819b-8c78-44c394db7c9e"
    - stage: uuid
      stageUuid: "a0ca3a1c-5750-88ae-b134-9fbc82789ad6"
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
