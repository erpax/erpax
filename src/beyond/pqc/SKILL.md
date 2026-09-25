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
