---
name: split
description: "Use when a secret must survive losing shares — m-of-n reconstruction over GF(256), built locally with no dependency. Any m of n pieces rebuild the secret and the subset chosen is irrelevant; fewer than m reveal nothing, and that is DECIDED rather than argued: reachableSecrets enumerates all 256 candidate bytes and shows the held shares are consistent with every one. Refuses x = 0 (the secret's own coordinate), duplicate coordinates (singular interpolation), a threshold outside 2 ≤ m ≤ n ≤ 255, and a short coefficient vector, which is a lower threshold in disguise."
atomPath: "entropy/threshold/split"
coordinate: "entropy/threshold/split · 8/crest · 78ca50fc"
contentUuid: "a19e0a82-a6f6-533b-bda9-f339287f6619"
diamondUuid: "8bce1a2d-be7e-827f-92d4-3b1ce7eff17c"
uuid: "78ca50fc-dc6c-832d-bf5e-bfd4f3473d7a"
horo: 8
typography:
  partition: entropy
  bondDegree: 9
standards:
  - "FIPS 197 — the AES field GF(2⁸), reduction polynomial x⁸+x⁴+x³+x+1"
  - "NIST SP 800-57 Part 1 r5 §5.6.1 — comparable key strengths"
  - "NIST-SP-800-57"
bindings: []
signatures:
  computationUuid: "24f5130a-4570-8b5c-b7ae-7e747d368c3b"
  stages:
    - stage: path
      stageUuid: "248cb119-2736-8bfb-87d2-09dbfbaa7db2"
    - stage: trinity
      stageUuid: "c41e8e75-db5d-8df9-9821-8a97549f5dcb"
    - stage: boundary
      stageUuid: "b3b81abd-caff-85e1-93c9-bb83c4a0c09e"
    - stage: links
      stageUuid: "aacf3860-0f3d-8b46-a201-eca789cb368d"
    - stage: horo
      stageUuid: "ae2f5cdb-ee57-8700-89c1-64be9b40f58e"
    - stage: seal
      stageUuid: "7761ed4c-8e8c-866a-abee-e998bff8aaf1"
    - stage: uuid
      stageUuid: "8b2f6c7e-cb91-8237-a52a-53eff52ae331"
version: 2
---
# entropy/threshold/split — m-of-n, decided rather than argued

[[entropy]]/threshold shipped n-of-n XOR and left m-of-n a **compass**, reasoning that prime-field secret sharing is where implementations go wrong. That names the risk correctly and draws the wrong conclusion: the risk is not the field — it is an implementation whose security property is **asserted**. Over GF(256) that property is **decidable**, so this atom decides it, and the compass closes.

## The field

GF(2⁸) with the AES reduction polynomial `x⁸+x⁴+x³+x+1`. Every byte is an element; arithmetic is table-driven and exact. No modular bias, no big-integer path, no division by a secret. A secret of any length splits **byte by byte**, and the whole construction is Lagrange interpolation at `x = 0`.

## The security property is a finite check

Shamir's guarantee is information-theoretic: fewer than `m` shares reveal *nothing*. For a byte that is not an aspiration — it is 256 cases.

```
reachableSecrets(twoOfThree)  →  all 256 byte values
```

Given `m−1` shares, for **every** candidate secret there is exactly one polynomial of degree `m−1` fitting those shares and yielding it. So the shares are equally consistent with every secret, and `test.ts` enumerates all 256 instead of trusting the argument. That is the difference between shipping secret sharing and shipping a claim about it.

At the threshold the freedom collapses: `m` shares pin the polynomial, and a further share cannot change the answer.

## What it refuses

| refusal | why |
| --- | --- |
| `x = 0` | the secret's own coordinate — issuing it hands over the secret while looking like a share |
| duplicate `x` | singular interpolation; a division by zero in the Lagrange basis |
| `m < 2`, `m > n`, `n > 255` | unreconstructable, or outside the field |
| short coefficient vector | a lower threshold in disguise |

Each is refused at the boundary rather than producing a plausible wrong answer.

**Honest boundary.** This proves the **construction**: any `m` reconstruct, fewer than `m` are uninformative. It says nothing about how shares are stored or transported, and nothing about where the coefficients came from — a sound split over a predictable coefficient stream is a broken system with a correct algorithm inside it. That is [[entropy]]/source's obligation, and the caller's.

**Law — [[law]]: m-of-n ships when its security property is decided, not argued. Over GF(256) that property is a finite check, and the check is the implementation's licence to exist.**

## Standards

- **NIST SP 800-57 Part 1 r5 §5.6.1** — comparable key strengths.
- **FIPS 197** — the field GF(2⁸) and its reduction polynomial.

Composes: [[entropy]]/threshold · [[entropy]]/source · [[convention]]/discern · [[law]].
