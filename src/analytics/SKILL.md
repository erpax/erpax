---
name: analytics
description: "Use when you need one computed read-out of the whole erpax corpus across every aspect — structure, entropy, coverage, harmony, trust, and economic health. The all-aspects analyzer; it composes the measures already minted on the live uuid-matrix, never re-deriving them."
atomPath: analytics
coordinate: analytics · 2/share · 4ae3f38e
contentUuid: "76df4872-530b-59a9-a3a0-7f027b5fd678"
diamondUuid: "b2235c19-eb36-89f0-bef9-521490057df3"
uuid: "4ae3f38e-f6d1-865e-a20e-b187e0358d30"
horo: 2
bonds:
  in:
    - accounting
    - atom
    - aura
    - balance
    - bindings
    - collections
    - cost
    - dimension
    - dry
    - entropy
    - hallucination
    - harmony
    - hooks
    - horo
    - matrix
    - maxtampercost
    - pivot
    - purity
    - relocate
    - standards
    - tamper
    - trinity
    - typography
    - unavoidable
  out:
    - accounting
    - atom
    - aura
    - balance
    - bindings
    - collections
    - cost
    - dimension
    - dry
    - entropy
    - hallucination
    - harmony
    - hooks
    - horo
    - matrix
    - maxtampercost
    - pivot
    - purity
    - relocate
    - standards
    - tamper
    - trinity
    - typography
    - unavoidable
typography:
  partition: analytics
  bondDegree: 84
  neighbors:
    - "analytics/max-tamper-cost"
    - aura
    - bindings
    - cost
    - hallucination
    - hooks
    - maxtampercost
    - pivot
    - purity
    - relocate
    - typography
    - unavoidable
standards:
  - "ECMA-262"
  - "EU-2015/847"
  - "EU-2015/849"
  - "EU-2019/1150"
  - "EU-2019/1152"
  - "EU-2019/1937"
  - "EU-2019/2161"
  - "EU-2019/770"
  - "EU-2019/771"
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-CSDDD-2024/1760"
  - "EU-Intrastat-Reg-2019/2152"
  - "ISO-4217"
  - "ISO-8601-1"
  - "ISO/IEC-25010"
  - "ISO/IEC-25010:2023 quality model — a computed read-out across quality aspects"
  - "ISO/IEC-29119"
  - "NIST-SP-800-63"
  - "W3C-WAI-ARIA-1.2"
  - "computed on the live uuid-matrix + balance/entropy/standards, never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - accounting
    - atom
    - aura
    - balance
    - collections
    - dimension
    - dry
    - entropy
    - harmony
    - horo
    - matrix
    - standards
    - tamper
    - trinity
  matrix:
    - accounting
    - atom
    - aura
    - balance
    - bindings
    - collections
    - cost
    - dimension
    - dry
    - entropy
    - hallucination
    - harmony
    - hooks
    - horo
    - matrix
    - maxtampercost
    - pivot
    - purity
    - relocate
    - standards
    - tamper
    - trinity
    - typography
    - unavoidable
  backlinks:
    - accounting
    - atom
    - aura
    - balance
    - bindings
    - collections
    - cost
    - dimension
    - dry
    - entropy
    - hallucination
    - harmony
    - hooks
    - horo
    - matrix
    - maxtampercost
    - pivot
    - purity
    - relocate
    - standards
    - tamper
    - trinity
    - typography
    - unavoidable
signatures:
  computationUuid: "a446f45f-f00a-86d6-87b8-717dab789c90"
  stages:
    - stage: path
      stageUuid: "9e734818-9a0d-8503-86f7-f75d6ca272fd"
    - stage: trinity
      stageUuid: "8e3c54b7-367a-8a24-b1fc-ec4cce25ec21"
    - stage: boundary
      stageUuid: "8a39134a-3b76-8a80-b086-55e20668793c"
    - stage: links
      stageUuid: "293c0ee6-1c5d-8cf5-9f00-3da2ad5a87a7"
    - stage: horo
      stageUuid: "8980a269-731c-8cd4-bb78-0e7f35819198"
    - stage: seal
      stageUuid: "f30cefaf-cd01-85ae-92ea-229750098476"
    - stage: uuid
      stageUuid: "82a63495-e687-84ae-a169-9b436ff4f6ce"
version: 2
---
# analytics — the all-aspects analyzer

analytics measures nothing of its own. It is the **fold** that calls every measure already minted on the live uuid-[[matrix]] and returns one `AnalysisReport`. The law is *compose, never duplicate* ([[dry]]): each aspect is a thin shell over the [[atom]] that already owns that truth.

`analyze()` is **pure** — it reads only the generated [[matrix]] and the computed consts (no DB, no disk). Six aspects:

- **structure** — [[matrix]] morphology: atom/edge counts, per-[[dimension]] and per-band occupancy, edge-direction mix, mean degree.
- **entropy** — [[entropy]]: edge reciprocity, the borrowed-disorder slack `1 − reciprocity`, and the orphan atoms.
- **coverage** — [[balance]] (model⊕collection — every plural [[collections|collection]] with its singular model, the schema's double-entry) ⊕ [[standards]] adoption.
- **harmony** — [[harmony]] over the [[horo]] ring `{1,2,4,8,7,5,9}`: is the 7-position lifecycle a consonant chord; the worst Tenney height across its 21 intervals.
- **trust** — [[tamper]]-cost: the undetected-forge work (log2 ops) at the live coverage, the brute-force years at the Bitcoin hashrate, the 256-bit content floor and the 106-bit erpax floor. forge → ∞ while verify → O(N) — the asymmetry IS the security.
- **economic** — the corpus read as one balanced ledger: a single health index = the **geometric mean** of the aspect signals, so a single zero caps the whole (the bottleneck law).

The two truths still living outside the matrix stay outside `analyze()`: the [[aura]] / [[trinity]] tree-walk is fs-bound, and live GL/margin is DB-bound (composes [[accounting]] behind a caller). The matrix is the analytic ground; everything else is one fold away.

Matter-twin: `src/analytics/index.ts`. Composes [[matrix]] · [[balance]] · [[entropy]] · [[harmony]] · [[horo]] · [[tamper]] · [[standards]] · [[aura]] · [[trinity]] · [[accounting]] · [[dry]].

## Standards
- ISO/IEC-25010:2023 quality model — a computed read-out across software-quality aspects
