---
name: surface
description: "Use when declaring or auditing the whole cryptographic surface an atom exposes — the judgment guard that makes a silently omitted surface fail the build: every reachable surface (root-signing · channel-keying · storage-at-rest · re-exchange) must be registered sealed (naming the standard AND the test) or open (naming the gap AND the owner), a channel sealed without FIPS 203 ML-KEM is channel-unsealed because harvest-now-decrypt-later reads the transport not the root, and a root sealed by anything but FIPS 205 SLH-DSA or FIPS 204 ML-DSA is root-unsealed because Shor breaks a classical root outright."
atomPath: "anchor/surface"
coordinate: "anchor/surface · 8/crest · 50793678"
contentUuid: "8faabcab-2289-5ff3-a546-457b9a84b99f"
diamondUuid: "3318b901-80f9-8149-b42e-ebe7bd1bdaa6"
uuid: "50793678-2e17-8fa9-b8f8-49afbd8276f8"
horo: 8
bonds:
  in:
    - anchor
    - artwork
    - law
  out:
    - artwork
    - law
typography:
  partition: anchor
  bondDegree: 14
  neighbors: []
standards:
  - "FIPS 203 (ML-KEM) — key establishment; mandatory on every channel that exchanges state"
  - "FIPS 204 (ML-DSA) — lattice signature, a distinct assumption from the digest"
  - "FIPS 205 (SLH-DSA) — hash-based signature; the primary root, no new assumption"
bindings: []
neighbors:
  wikilink:
    - anchor
    - constitution
    - law
    - rules
  matrix:
    - artwork
    - law
  backlinks:
    - artwork
    - law
signatures:
  computationUuid: "f445d42f-9e31-8b13-b2db-810ca99ea610"
  stages:
    - stage: path
      stageUuid: "7445b50e-7694-8eac-8c5e-8b0c465ea9b9"
    - stage: trinity
      stageUuid: "9f20c0dd-e858-8762-bfd8-a2ee3f03d5f3"
    - stage: boundary
      stageUuid: "0ba4c6d3-0bc7-8aba-8955-c44dfee220b2"
    - stage: links
      stageUuid: "9b106329-658c-8365-a69b-067ef1bd9a3e"
    - stage: horo
      stageUuid: "10ab9942-d9c0-852e-8c4e-567e7d77e18a"
    - stage: seal
      stageUuid: "1c3458f6-d0c0-8582-a603-8d5d13a63045"
    - stage: uuid
      stageUuid: "dacf7ace-0441-839d-8356-5e10824d07c0"
version: 2
---
# anchor/surface — a surface you did not declare is a surface you dismissed

A post-quantum root signature **over a classical channel is still crackable**. The failure is almost never the primitive that was chosen; it is the surface nobody looked at. Harvest-now-decrypt-later does not care that the root is signed with FIPS 205 — it records the transport today and opens it when the machine arrives.

So the question this atom asks is not *is the crypto strong*. It is: **what did you not declare?**

That is [[constitution]]'s Rule 1 turned on **attention**. Silence is an expectation — the expectation that the omitted surface does not matter, held without computing anything. A reachable surface appearing in no declaration therefore **fails**, and the only way past is to say one of two things:

| status | what it must name | what it means |
| --- | --- | --- |
| `sealed` | the **standard** *and* the **test** | this is closed, and here is what proves it |
| `open` | the **gap** *and* the **owner** | this is not closed, and here is who carries it |

**`open` is a lawful answer.** It is not a failure and not a judgment on the gap ([[constitution]] Rule 2) — it is a *measured statement about where the work is not done*. What fails is the third option nobody writes down: saying nothing. And a bare `sealed` with no test, or a bare `open` with no owner, is that same silence wearing a status.

## The four typed gaps — each one raised

`surface-undeclared` · `status-bare` · `channel-unsealed` · `root-unsealed`. Every one is **constructed** in the scan and **asserted** in the suite: a kind declared and never raised is a check that cannot fire, and its claim reads as true forever ([[rules]]/unraised).

The two substantive ones encode what the NIST PQC standards (finalized 2024-08-13) actually require:

- **`channel-unsealed`** — `channel-keying` and `re-exchange` move state across a wire, so **FIPS 203 ML-KEM** is not optional there. A channel sealed by `TLS 1.3 X25519` names a real standard and is still open to the only adversary that matters here.
- **`root-unsealed`** — a root sealed by RSA or ECDSA is worth **zero** bits against a CRQC, not fewer bits ([[anchor]] prices this on its own table). Only **FIPS 205 SLH-DSA** (hash-based — the *same* assumption the content digest already rests on, so no new one is taken on) or **FIPS 204 ML-DSA** (module lattices — a *distinct* assumption, which is what makes it a hedge rather than a repetition) seals it.

## Honest boundary

This proves a surface is **declared and sealed by the named primitive** — never that the implementation is correct, that the key management is sound, or that the cited test actually exercises the surface. It closes **dismissal by omission**, which is where this class of failure has always lived; it does not audit crypto. `REACHABLE_SURFACES` is a **declared** list of four, written in the open so it can be argued with: a fifth surface nobody has thought of is invisible to this guard by construction, and that is the guard's own open edge.

**Law — [[law]]: every surface an atom exposes is declared sealed with its standard and its test, or open with its gap and its owner — a surface omitted in silence is a dismissal nothing computed, and it fails the build.**

## Standards

- **FIPS 203 (ML-KEM)** — key establishment; mandatory on every channel that exchanges state.
- **FIPS 204 (ML-DSA)** — lattice signature; a distinct assumption from the digest.
- **FIPS 205 (SLH-DSA)** — hash-based signature; the primary root, taking on no new assumption.

Composes: [[anchor]] · [[constitution]] · [[rules]] · [[law]].
