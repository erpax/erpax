---
name: source
description: "Use when a key must be born from randomness you can prove — seed quality is established at the source and across the fleet, never by inspecting the seed. A CSPRNG on a weak seed is indistinguishable from one on a strong seed, so no per-seed statistical test appears here by design. attest is an HMAC under a key only genuine hardware holds; admit refuses a forged tag, a short seed, and the same seed arriving from a second device (the deterministic-RNG fingerprint no single device can see). No key derives from an un-admitted seed."
atomPath: "entropy/source"
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
