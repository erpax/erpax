---
name: claims
description: "Use when stating what erpax's post-quantum posture actually proves — the anchor surfaces typed by discern into verdicts (what the corpus computes: the manifest gate, the channel and root rules, the pinning, the threat calibration) and compasses (the primitives, because nothing here signs: no PQC implementation is installed). Standards are pinned to their revision because FIPS 203 and 204 carry errata, and a bare citation names a document that differs from the one in force. FIPS 206 and HQC are the honest open rows. Integrity reads 5 of 9 — lower and true."
atomPath: "anchor/claims"
coordinate: "anchor/claims · 5/round · 06cc6d0d"
contentUuid: "dca581d5-444e-5e26-9eb5-1f8c97dcbc24"
diamondUuid: "6a9958af-d496-84df-870a-c249173a404f"
uuid: "06cc6d0d-822c-890e-99c2-d97af6cfbc61"
horo: 5
typography:
  partition: anchor
  bondDegree: 12
standards:
  - "EU-CSDDD-2024/1760"
  - "FIPS 203 (ML-KEM, 2024-08-13, with errata) — key encapsulation"
  - "FIPS 204 (ML-DSA, 2024-08-13, with errata) — lattice signatures"
  - "FIPS 205 (SLH-DSA, 2024-08-13) — stateless hash-based signatures"
  - "NIST SP 800-227 — recommendations for key encapsulation mechanisms"
  - "NIST-SP-800-63"
bindings: []
signatures:
  computationUuid: "cf27616e-90a9-8bd0-b4f4-63e1feb9f426"
  stages:
    - stage: path
      stageUuid: "c9e0ccd4-deab-880f-8a95-76fa910dce49"
    - stage: trinity
      stageUuid: "28cc2e5b-d290-8940-afb3-fa4f51fb10d7"
    - stage: boundary
      stageUuid: "27ff7228-013f-84b5-bf4a-c572c061418a"
    - stage: links
      stageUuid: "1b7329ec-5f04-8609-a216-1722d3577bbb"
    - stage: horo
      stageUuid: "7f2eabec-d5cf-84d6-975f-9037a8769eb9"
    - stage: seal
      stageUuid: "fb837cbb-43f8-8174-b3dc-cd8829747945"
    - stage: uuid
      stageUuid: "aea818b3-08ba-8f1b-acda-f589e1d4e1d7"
version: 2
---
# anchor/claims — the post-quantum surfaces, typed

[[anchor]] carries the strengths-and-assumptions layer; [[anchor]]/surface gates the manifest. Neither carries the distinction that decides whether a security page is honest: **what is proven versus what is intended**. This atom applies [[convention]]/discern to them, and lets the integrity metric read the difference.

## The uncomfortable one

erpax cites FIPS 203/204/205 and defines their strengths. **It does not sign anything** — no PQC implementation is installed. So the obvious verdict is unavailable:

> *"sign a root, flip one byte, verification fails"* names a test that cannot exercise the property. `verdictHolds` rejects it as a tautology under a heading — which is exactly what [[convention]]/discern was built to catch.

The four primitives are therefore **compasses**, each naming what would close it and who owns closing it. Integrity reads **5 of 9**, and the only way it rises is pinning a library and running the KATs — never editing this page.

| verdict — the corpus computes it | compass — nothing here implements it |
| --- | --- |
| `manifestComplete` · `channelRequiresMlKem` · `rootRequiresPqSignature` | `slhDsaSigning` — a pinned FIPS 205 impl + NIST KATs |
| `standardsPinned` · `threatModelCalibrated` | `mlKemChannel` — a pinned FIPS 203 impl, per SP 800-227 |
| | `fnDsa` — FIPS 206 **final** + KATs |
| | `hqc` — HQC **final** standard |

## A bare citation does not identify a document

**FIPS 203 and 204 carry errata.** `"FIPS 203"` names a document that differs from the one in force, so `citationIsPinned` refuses it and demands the revision — the same law as [[rules]]/reference, applied to a standard instead of a path. `FIPS 206` (FN-DSA, draft) and `HQC` (selected 2025, standard pending) are marked `final: false`, and that flag is *why* they are compasses rather than a judgement call: the test asserts every non-final standard appears in a compass.

## The threat model, calibrated

It defends **harvest-now-decrypt-later** — traffic captured today, decrypted when a cryptanalytically relevant quantum computer exists. It does **not** defend against an imminent break, and `assertThreatClaim` throws `OverClaim` on any claim that it does.

The gap is not rhetorical: a Shor break of RSA-2048 needs on the order of **thousands of logical qubits**, against demonstrated logical-qubit counts roughly two orders of magnitude lower. Those figures are **declared with their date** (`asOf`), because they move, and a stale number quoted as current is its own defect — the test asserts the date is present.

**Honest boundary.** This proves the surfaces are **typed and pinned**, never that the cryptography is **implemented**. Five verdicts hold; four primitives are open and say so. A security page whose integrity is 5/9 is worth more than one whose integrity is 9/9 by assertion — that is the whole argument for measuring it.

**Law — [[law]]: a cryptographic surface is sealed by a FINAL standard and a passing test, or it is open with its gap and its owner named. A citation without its revision does not identify a document.**

## Standards

- **FIPS 205** (2024-08-13) — SLH-DSA, stateless hash-based signatures.
- **FIPS 204** (2024-08-13, with errata) — ML-DSA.
- **FIPS 203** (2024-08-13, with errata) — ML-KEM.
- **NIST SP 800-227** — recommendations for key encapsulation mechanisms.

Composes: [[anchor]] · [[anchor]]/surface · [[convention]]/discern · [[rules]]/reference · [[law]].
