---
name: pqc
description: "Use when reasoning about pqc — returned a whose read , carrying a real algorithm name and a real ISO-8601 timestamp — **and it did not throw**. A caller checking that a signature came back proceeded."
atomPath: "beyond/pqc"
coordinate: "beyond/pqc · 2/share · 969e564a"
contentUuid: "a4c30afd-10ed-5d69-b07f-0279729442c6"
diamondUuid: "a5615bca-ae11-8aac-b546-a28bde3e6ef4"
uuid: "969e564a-9fdb-8fbe-aad3-543043e7ab12"
horo: 2
typography:
  partition: beyond
  bondDegree: 8
standards:
  - "NIST FIPS 203 ML-KEM — Tables 2 and 3, values received verbatim"
  - "NIST FIPS 203 §8 Table 2 (parameters) · Table 3 (sizes) · §7 (categories 1, 3, 5)"
  - "NIST FIPS 204 ML-DSA (Module-Lattice Digital Signature)"
  - "NIST SP 800-208 stateful-hash-based-signatures"
  - "NIST-SP-800-63"
bindings: []
signatures:
  computationUuid: "caee6bee-2a77-8680-a6c1-bdf73b99418d"
  stages:
    - stage: path
      stageUuid: "f85f7d6a-4941-80ff-a861-f7d878cf2dcf"
    - stage: trinity
      stageUuid: "60eccb3c-981f-8c17-9e68-68b0055fc27d"
    - stage: boundary
      stageUuid: "b43597e7-9b82-8ed5-b9db-ce67d8e04c59"
    - stage: links
      stageUuid: "ca5016f1-9691-8a25-ab2f-067d30cdc33b"
    - stage: horo
      stageUuid: "3c51fabf-7998-8d01-8d9c-6414ee3950d2"
    - stage: seal
      stageUuid: "71ae10f2-0dca-8d23-b6e5-b6abc8dfca03"
    - stage: uuid
      stageUuid: "229df3dc-903a-8870-b2d0-1934d6a14b15"
version: 2
---
# beyond/pqc — it returned a signature it had not made

`signPqc` returned a `PqcSignature` whose `signatureB64` read
`PLACEHOLDER-pending-libpqc-integration`, carrying a real algorithm name and a real ISO-8601
timestamp — **and it did not throw**. A caller checking that a signature came back proceeded.

One did. `src/bank/chat` computed a "quantum-secure banking envelope":

```ts
const holds = isApprovedPqc(algorithm) && pqc.algorithm === algorithm && classicalDigest.length === 36
```

`holds` compared the **echoed algorithm name** and never looked at the signature, so it read **true**
over the placeholder — and three tests asserted that `true`, which is [[rules]]/mirror: the proof
certified the forgery. The sealed corpus prose stated the same wrong law, one line of it noting
*"stub verify ≠ forge-proof"*, which knew and did not act.

## The refusal is the implementation

`signPqc` now returns `{ signed: false, algorithm, refusal }` and nothing a caller could mistake for
a signature — the field list is asserted, so a placeholder cannot be re-added beside it. `verifyPqc`
reaches no verdict and says so. `holds` is `posture && signed`, and the envelope carries the refusal
text, so the claim degrades to what is actually true: **the algorithm is approved and the digest is
well-formed, and nothing has signed it.**

That is [[rules]]/forge's own cure restated — eligibility is decidable locally and is what these
return; a signature needs a key this process does not hold, so it refuses and names what is missing.

## What IS decidable: the parameters FIPS 203 fixes

Received verbatim from **Table 2** (parameters) and **Table 3** (sizes), with the two constants §7
names — `n = 256`, `q = 3329`:

| | k | RBG strength | category | ek | dk | ct |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| ML-KEM-512 | 2 | 128 | 1 | 800 | 1632 | 768 |
| ML-KEM-768 | 3 | 192 | 3 | 1184 | 2400 | 1088 |
| ML-KEM-1024 | 4 | 256 | 5 | 1568 | 3168 | 1568 |

The name **is** the coefficient count: `k · n` gives 512, 768, 1024, and the test derives each name
from its own arithmetic rather than restating it. `q` is prime and `256 | q − 1` (3328 = 13 · 256),
which is the condition that makes the NTT exist — decided here rather than asserted.

`kemForCategory` returns the **smallest** set meeting a required category and **nothing** above
category 5, rather than silently handing back the strongest: there is no category-2 set, so a
category-2 requirement gets ML-KEM-768 and a category-6 requirement gets a refusal.

**Honest boundary.** This computes **parameters and sizes**, and imports nothing — erpax crypto only.
It is not an implementation of ML-KEM or ML-DSA, it makes no security claim about either, and a
green test here says a table was transcribed correctly and its arithmetic closes. The signing and
verifying remain refusals until a key and a verifier exist.

**Law — [[law]]: a function that cannot sign returns a refusal, never an object shaped like a
signature. The placeholder is the forgery — a caller cannot see the string, only that something came
back, and a test that asserts the shape certifies it.**

## Standards

- **NIST FIPS 203** — ML-KEM; Tables 2 and 3 received verbatim, §7 for the categories.
- **NIST FIPS 204** — ML-DSA.
- **NIST SP 800-208** — stateful hash-based signatures.

Composes: [[rules]]/forge · [[rules]]/mirror · [[bank]]/chat · [[cost]]/bits · [[law]].
