---
name: empirical
description: "Use when a claim is grounded in observed data rather than assumed — the rate an @invariant holds at across real rows, a modal value or lifecycle DERIVED not invented, the measured distribution a model is fitted to. The agnostic restatement of provenance — name the origin generically as [[source]], dissolve the row-level specifics into the [[akashic]] DB, and keep only the universal form in code. anonymise is the core of agnostic architecture and DRY naming."
atomPath: empirical
coordinate: empirical · 4/weave · 8eb88416
contentUuid: "c63b52a7-02d7-5db4-9bf3-9b1ed5ed0b3c"
diamondUuid: "6de8a8e6-2dfb-8572-b81b-7bb563fa2251"
uuid: "8eb88416-0a64-80ef-87fe-dc6c21e9e64c"
horo: 4
bonds:
  in:
    - akashic
    - audit
    - baseline
    - derive
    - ingest
    - lineage
    - manufacturing
    - measure
    - merge
    - outlier
    - port
    - sampling
    - seed
    - source
    - zeropoint
  out:
    - akashic
    - audit
    - baseline
    - derive
    - ingest
    - lineage
    - manufacturing
    - measure
    - merge
    - outlier
    - port
    - sampling
    - seed
    - source
    - zeropoint
typography:
  partition: empirical
  bondDegree: 46
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - akashic
    - audit
    - baseline
    - derive
    - ingest
    - lineage
    - manufacturing
    - measure
    - merge
    - outlier
    - port
    - sampling
    - seed
    - source
    - zeropoint
  matrix:
    - akashic
    - audit
    - baseline
    - derive
    - ingest
    - lineage
    - manufacturing
    - measure
    - merge
    - outlier
    - port
    - sampling
    - seed
    - source
    - zeropoint
  backlinks:
    - akashic
    - audit
    - baseline
    - derive
    - ingest
    - lineage
    - manufacturing
    - measure
    - merge
    - outlier
    - port
    - sampling
    - seed
    - source
    - zeropoint
signatures:
  computationUuid: "24047525-6f6a-8d93-adef-aeb38a7cf80e"
  stages:
    - stage: path
      stageUuid: "11671e80-2859-89e3-a045-33a49ca0b53c"
    - stage: trinity
      stageUuid: "3f658a82-682f-8d38-b14b-919c92b89da3"
    - stage: boundary
      stageUuid: "6f0f1ea7-8a05-8ae4-b5bb-62cf50c1c983"
    - stage: links
      stageUuid: "9da06a0f-1713-890c-9d48-412fa8eb9857"
    - stage: horo
      stageUuid: "1c92dd3e-52d4-85dd-ab3e-cc9824d8f522"
    - stage: seal
      stageUuid: "50599234-53e6-829f-b567-e908c99415b9"
    - stage: uuid
      stageUuid: "9ce6acf5-0dd7-8032-a46c-fc1b3be7664e"
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
