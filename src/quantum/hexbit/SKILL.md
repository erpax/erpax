# quantum/hexbit — the hexit decomposition is right; the string encoding of it is the trap

*"Hexbits compute faster than all else"* is two claims wearing one sentence, and they have **opposite** answers.

A hexit is **four bits**. Thirty-two of them are exactly 128 bits — which packs, with nothing left over, into four `uint32`s. So `u32x4` **is** the hexit decomposition, held as bits; `hex-string` is the same decomposition held as **characters**.

Measured — one 128-bit AND-fold, conversion excluded, minimum of 7 runs:

| carrier | ns/op | ops/sec | relative |
| --- | ---: | ---: | --- |
| **`u32x4`** — hexits packed 4 bits/field | **11.0** | 91,133,196 | **fastest** |
| `bytes` — `Uint8Array(16)` | 15.7 | 63,829,855 | 1.4× |
| `bigint` — what erpax folds in today | 29.7 | 33,660,570 | 2.7× |
| `hex-string` — hexits as characters | 2,007.6 | 498,097 | **183×** |

**Packed hexbits win. Hex characters lose by two orders of magnitude.** The same 128 bits, the same operation; only the carrier differs.

## The headroom this names

`interact64` and the torus folds run on `BigInt` — **2.7× the packed carrier**, measured. That is a real optimisation with a number attached rather than an intuition. It is not free: `BigInt` is arbitrary-width and total, while `u32x4` must carry its own masking, and the fold's cost is dominated by SHA-256 wherever a content-address is actually computed. This names where representation *can* matter, not a promise that the corpus gets 2.7× overall.

## How it is measured, and why that shape

The **minimum** of N runs, never the mean — a mean folds in whatever else the machine was doing, and this corpus published two wrong timings from single samples in one day. A **warmup pass** runs first and is discarded, because the first pass measures the JIT compiling rather than the code. The sample is **seeded, not random**, so the benchmark is rerunnable. Conversion sits **outside** the timed loop: the honest question for a corpus that holds addresses in one representation and folds them many times is what the *operation* costs, not the parse.

Every carrier is proved to hold the **same 128 bits** before being timed — otherwise the comparison is between two different problems, which is how a benchmark flatters whoever wrote it.

**Honest boundary.** This is a **microbenchmark on one machine and one JIT**. It proves an ordering between carriers for a bitwise fold; it does not prove a whole-program speedup, and the ordering could differ on another engine. The test asserts the ordering **structurally** and never pins a nanosecond figure. It first asserted `u32x4` is rank 1 and **flaked** — `u32x4` and `bytes` sit within 1.4×, so a strict winner is a timing threshold wearing a structural claim, the exact trap named in the paragraph above it. What is structural is the **separation**: characters do 32 `parseInt` calls per op against four ANDs, and `hex-string` is last on every run.

**Law — [[law]]: a claim about speed is a measurement or it is a preference. Split the claim before testing it — the same word can name a decomposition and an encoding, and here one is the fastest carrier and the other is 183× the slowest.**

## Standards

- **ISO/IEC 25010:2023 §5.2** — performance efficiency: a stated figure carries its method.

Composes: [[quantum]]/word · [[uuid]] · [[merge]] · [[law]].
