---
name: source
description: "Use when a key must be born from randomness you can prove — seed quality is established at the source and across the fleet, never by inspecting the seed. A CSPRNG on a weak seed is indistinguishable from one on a strong seed, so no per-seed statistical test appears here by design. attest is an HMAC under a key only genuine hardware holds; admit refuses a forged tag, a short seed, and the same seed arriving from a second device (the deterministic-RNG fingerprint no single device can see). No key derives from an un-admitted seed."
atomPath: "entropy/source"
coordinate: "entropy/source · 1/base · 541302c5"
contentUuid: "4ffe9d34-fd12-5679-996c-dfd059ff47b7"
diamondUuid: "1ea4853b-093a-8bd8-8ca8-f733e8d34531"
uuid: "541302c5-4693-8182-80db-2a11b7b9db65"
horo: 1
typography:
  partition: entropy
  bondDegree: 67
standards:
  - "CoE-108+"
  - "NIST SP 800-108 — key derivation in counter mode"
  - "NIST SP 800-90B — entropy sources: validated at the source, not by output inspection"
  - "NIST-SP-800-108"
  - RFC 2104 — HMAC
bindings: []
signatures:
  computationUuid: "e0364c7f-3d5e-85e9-bd7e-4f1e8bdebe77"
  stages:
    - stage: path
      stageUuid: "7f15c89d-c1da-8755-b37a-33f172d9585c"
    - stage: trinity
      stageUuid: "e861d70d-af10-86c9-afb2-d7d5c27474e7"
    - stage: boundary
      stageUuid: "0cba20f2-e069-8cd8-a06a-0f8edf84250f"
    - stage: links
      stageUuid: "1f8aae9c-56e5-8761-91d8-5eada6c219d4"
    - stage: horo
      stageUuid: "50cb965a-eb53-8c1e-a431-8afa425332c1"
    - stage: seal
      stageUuid: "77026cd8-0675-8357-bcde-aa4fa49f9a71"
    - stage: uuid
      stageUuid: "4a09955b-1a74-8280-8210-e492551745a0"
version: 2
---
# entropy/source — proven at the source and across the fleet, never by inspection

Folded inside [[entropy]] rather than competing for the word: the parent measures the corpus's thermodynamic entropy, this measures the randomness a key is born from. Same word, different scale, one home.

## Why there is no statistical test here

**You cannot verify seed quality by inspecting the seed.** A CSPRNG run on a weak seed is indistinguishable in distribution from one run on a strong seed — that is what a CSPRNG *is*. Min-entropy over 32 bytes and monobit tests have no power to separate them: they reject good randomness at whatever the significance level is, and accept a deterministic stream that happens to look uniform.

A per-seed test is a measurement with no power, and shipping one is **worse than shipping nothing**, because it reads as a check. A test asserts this by scanning the code — with comments stripped, since the docstring argues *against* those tests and a raw match flagged its own argument on the first run.

## Where the evidence actually is

| | |
| --- | --- |
| **source** | `attest(seed, hwKey)` — an HMAC under a key provisioned only to the genuine hardware RNG. A software fallback fails **not because its bytes look different**, but because it does not hold the key. |
| **fleet** | every admitted seed is content-addressed. The same seed from a second device is the fingerprint of a deterministic RNG — a measurement that **only exists across the fleet**. |

Refusal order is deliberate: length, then attestation, then fleet. A forged tag is refused **before** the registry learns the address, or an attacker enumerates the fleet by submitting guesses.

The registry stores **addresses, never seeds**. A registry holding the secrets it guards is a worse liability than the one it prevents.

## Fail closed

```
deriveFromAdmitted(seed, purpose, registry)   → throws `seed-not-admitted`
```

A caller cannot reach key material by holding a seed, only by holding one the fleet admitted.

## The claims, typed by [[convention]]/discern

```
entropy.source              VERDICT   measuredBy src/entropy/source/test.ts
entropy.fleet               VERDICT   measuredBy src/entropy/source/test.ts
entropy.hwKeyProvisioning   COMPASS   closedBy: attested boot + secure-element key injection
```

`hwKeyProvisioning` **must stay a compass**. In this process the hardware key is an ordinary buffer; sealing it would be exactly the over-claim discern exists to catch.

## Honest boundary

This proves the attester **held** the hardware key — never that the key lives in real hardware. And the fleet check catches a **repeated** seed, never a merely **predictable** one: a weak RNG that never repeats passes every check here.

**Law — [[law]]: seed quality is proven at the source and across the fleet — never by inspecting the seed, because a CSPRNG on a weak seed is indistinguishable from one on a strong seed.**

## Standards

- **NIST SP 800-90B** — entropy sources: validated at the source, not by output inspection.
- **NIST SP 800-108** — key derivation in counter mode.
- **RFC 2104** — HMAC.

Composes: [[entropy]] · [[convention]] · [[nist/sp/800/108]] · [[law]].
