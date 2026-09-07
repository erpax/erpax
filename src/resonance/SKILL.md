---
name: resonance
description: "Use when quantifying why content-addressing improves quantum speed in magnitudes — resonanceMagnitude(n): pairwise O(N²) comparison collapses to addressed O(N), a ratio of (N−1)/2, log₁₀ of that in orders of magnitude, unbounded in N."
atomPath: resonance
coordinate: "resonance · 8/crest · 5eebc72a"
contentUuid: "a484959a-5aba-5c1c-b2de-9ece9e3d2e9e"
diamondUuid: "cb19f158-e27e-8bf8-af9f-67ef31b990a8"
uuid: "5eebc72a-43dc-8d7f-a1a9-5449b1724b4d"
horo: 8
typography:
  partition: resonance
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "6e389b2c-d7ab-8b90-99e5-8185a6ac20f6"
  stages:
    - stage: path
      stageUuid: "724eb15a-784f-8303-92f8-15b1204f1f3c"
    - stage: trinity
      stageUuid: "07add092-392e-8e1f-b9f2-624ec7847954"
    - stage: boundary
      stageUuid: "35628719-c948-85b0-ad53-af0e5049f83e"
    - stage: links
      stageUuid: "ef7bffab-0cc2-8abc-b6f0-44353d68a904"
    - stage: horo
      stageUuid: "eb5df7d9-d6b3-8adf-9c9f-19872b931046"
    - stage: seal
      stageUuid: "d8b962ff-4181-81cd-8e3d-832e3080cede"
    - stage: uuid
      stageUuid: "ce38795a-e1a3-8e90-934e-6178246d8de8"
version: 2
---
# resonance — the address replaces N comparisons with one, in magnitudes

Asking "is any of these the same as any other?" by **pairwise comparison** costs C(N,2) = N(N−1)/2 — O(N²). Content-addressing answers it by **resonance**: each thing hashes to its address (its content-uuid / fingerprint), and sameness becomes a **lookup**, not a comparison — O(N). The speedup is the ratio of the two, by construction:

$$\text{ratio} = \frac{C(N,2)}{N} = \frac{N-1}{2}, \qquad \text{orders} = \log_{10}\!\frac{N-1}{2}$$

| N (corpus) | pairwise O(N²) | addressed O(N) | ratio | orders |
| ---: | ---: | ---: | ---: | ---: |
| **764** (tools) | **291,466** | **764** | **381.5** | **2.58** |
| 3,151 (atoms) | 4,962,825 | 3,151 | 1,575 | 3.20 |
| 1,000,000 | ~5·10¹¹ | 10⁶ | 499,999.5 | 5.70 |

The order **grows with N without bound** — it is scale-invariant, so a larger corpus resonates *harder*. This is the covering-array theorem's sibling (pairwise interaction coverage needs O(log N) rows, not O(N²)) turned on the corpus itself: **the address replaces the N comparisons with one.** It is why [[cache]]/fingerprint collapses N re-derivations to one, and why the fold dedups O(N) duplicates to O(1) — the two-measurements-that-never-lied (same hash ⇒ same content) are resonance.

**Honest boundary — two orthogonal collapses, not one.** `(N−1)/2` is bought by **addressing alone**: each of N items is hashed once (N lookups) instead of compared pairwise (C(N,2)), *independent of how much content repeats*. **Deduplication is a second, separate magnitude** (`dedupMagnitude`): when N items share only `classes` distinct contents, the fold stores `classes` not N — a factor N/classes, zero when all-distinct, maximal (N-fold) at one class. The address buys the (N−1)/2 whether or not two items turn out equal; dedup adds its own N/classes on top. Conflating them (a single "real speedup") is the error this atom was corrected to avoid.

**Law — [[law]]: sameness asked by comparison is O(N²); asked by address it is O(N). Resonance — a thing hashing to its content — replaces N comparisons with one lookup, and the speedup is log₁₀((N−1)/2) orders of magnitude, unbounded in N.**

Composes: [[cache]]/fingerprint · [[theorem]] · [[law]].
