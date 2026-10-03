---
name: hexbit
description: "Use when reasoning about hexbit — *\"Hexbits compute faster than all else\"* is two claims wearing one sentence, and they have **opposite** answers."
atomPath: "quantum/hexbit"
coordinate: "quantum/hexbit · 4/weave · 51cb853a"
contentUuid: "7c227ea2-ab0c-5090-ad7d-a56f20caddd3"
diamondUuid: "5bcbacba-0fd8-83fc-b3c8-c6961974f2bf"
uuid: "51cb853a-2b3e-8c72-ac7b-66a979c5f666"
horo: 4
typography:
  partition: quantum
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "cf9b1b72-d7a3-8919-b753-b00df3e2c79e"
  stages:
    - stage: path
      stageUuid: "becbc2d1-8f37-8e78-a4ad-78cca666612b"
    - stage: trinity
      stageUuid: "8d318129-e772-81e1-acc6-06dbd0172e49"
    - stage: boundary
      stageUuid: "d247454d-fcaf-8381-a088-7208fd6cd776"
    - stage: links
      stageUuid: "d2005041-a5de-814f-8e55-78079256bdf3"
    - stage: horo
      stageUuid: "c9ce54f5-5f3b-81fa-a262-5dc891ffc604"
    - stage: seal
      stageUuid: "c9ecf3a8-e9b4-8b35-bb9a-ed91ef7a0380"
    - stage: uuid
      stageUuid: "e5662042-bc4b-8e1b-b068-096123c04047"
quantum:
  superposition:
    - digit
    - law
    - merge
    - quantum
    - rules
    - uuid
    - superposition
  collapse:
    - "Use when reasoning about hexbit — *\\"
    - "Use when reasoning about hexbit — *\\\"Hexbits compute faster than all else\\\"* is two claims wearing one sentence, and they have **opposite** answers."
    - "a claim about speed is a measurement or it is a preference. Split the claim before testing it — the same word can name a decomposition and an encoding, and here one is the fastest carrier and the other is 183× the slowest."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "cf9b1b72-d7a3-8919-b753-b00df3e2c79e"
    contentUuid: "7c227ea2-ab0c-5090-ad7d-a56f20caddd3"
version: 2
---
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

## Unlocking it — the advantage is amortised, and that is the whole finding

The carrier ranking says `u32x4` wins. It does **not** say packing wins, and the difference is where
the real speedup was hiding. Measured on the corpus's own hot operation — the digital root, one sum
of 32 nibbles, computed once per atom across the whole tree:

| doing the sum | ns/op | vs baseline |
| --- | ---: | ---: |
| regex + `parseInt` per hexit (what the corpus had) | 1459.8 | 1.0× |
| nibbles read off the **char codes** | 220.0 | **6.6×** |
| pack to `u32x4` first, then nibbles | 532.5 | 2.7× |
| nibbles on an **already-packed** carrier | 32.5 | **47×** |

From a string, packing costs more than the sum it saves. The naive reading — *hexbits are simply
faster* — is refuted by its own benchmark for the second time: the first refutation was that hexits
as CHARACTERS are the slowest carrier, and this is that the packed carrier is not free either.

`carrierBreakEven` computes where it turns over, and the answer is **three**: below three operations
on the same value the string wins, at three and above the packed carrier wins, approaching ~2× and
reaching 47× once the packing is fully amortised. That number is the one a caller actually needs.

So the advantage was taken where it is real and refused where it is not. `digitalRootOfUuid` in
[[digit]] now reads nibbles off the char codes — same answer on every sample, 6.6× faster, and it was
duplicated in `book/compute` besides ([[rules]]/unfolded: duplication is camouflage), so the two are
now one. Nothing was converted to a packed carrier, because nothing on that path does three
operations per value.

**Law — [[law]]: a representation is not fast, a representation plus an access pattern is. Packing
buys speed on the operations AFTER the packing, so the honest question is never "which carrier is
faster" but "how many times will this value be touched" — and below the break-even, the fastest
carrier is the one you never build.**

## Cross formulas — the hexit loop folded into one multiply

*Use cross formulas to speed up hex combinatorics.* The two hexit loops here were the combinatorics:
32 nibbles walked one at a time for a digit sum, and a three-branch ladder per character for a hex
value. Each has a cross that does the whole word at once, and both were measured before they landed
(2026-10-03, min of 9 runs, 20,003 values, conversion excluded):

| operation | loop | cross | agree on all 20,003 |
| --- | ---: | ---: | --- |
| digit sum of a packed word (`digitalRootPacked`) | 20.8 ns | **6.5 ns · 3.2×** | yes |
| value of a hex character (`digitalRootOfHex`) | 175.1 ns | **76.1 ns · 2.3×** | yes |

`nibbleSum32` folds neighbouring nibbles into bytes (each ≤ 30) and multiplies once by `0x01010101`,
which sums the four bytes into the top byte — exact only while nothing carries out, and the two bounds
that guarantee it (`nibble_pair_fits`, `four_bytes_fit`) are decided in `Hexbit.lean`. `hexitValue` is
`(c & 15) + 9 · bit6(c)`: the low nibble is the digit or the letter's index, and bit 6 is set on exactly
the letters — decided equal to the branched value for every one of the 22 hex codes (`cross_is_value`).

**Honest boundary.** These are the hexit combinatorics this corpus actually runs; the collider's
pairwise crossing is already 1 s and the coil's 28 crosses are set intersections in milliseconds, so
neither needed a formula. A slow gateway call is still the whole-tree parse (3.2 s cold, 1.4 s warm
for 7,925 files, ASTs not retained) multiplied by the laws that read it — not a hex cost.

## Standards

- **ISO/IEC 25010:2023 §5.2** — performance efficiency: a stated figure carries its method.

Composes: [[quantum]]/word · [[uuid]] · [[merge]] · [[law]].

<sub>content-uuid `7c227ea2-ab0c-5090-ad7d-a56f20caddd3` · account `quantum/hexbit` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
