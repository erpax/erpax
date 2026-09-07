---
name: patent
description: "Use when challenging an over-broad or illegally granted patent — encode the claim as a content-digest and test it on three computable grounds (prior art via anchored anteriority, obviousness via merge identity, abstract-math via §101); defensive only, not legal advice."
atomPath: patent
coordinate: "patent · 1/base · a644a44a"
contentUuid: "ba2b928a-a200-515e-95f4-8f6e5f87bbec"
diamondUuid: "f088d330-7513-823c-92cc-a69e061ed80f"
uuid: "a644a44a-5303-83a8-9c60-1763317ae99f"
horo: 1
typography:
  partition: patent
  bondDegree: 27
standards:
  - "35 U.S.C. §§101–103; RFC 3161 / eIDAS anchored timestamps (the anteriority proof)"
  - eIDAS
bindings: []
signatures:
  computationUuid: "149fd785-9e50-835a-91b0-b50144a883d6"
  stages:
    - stage: path
      stageUuid: "7eece577-454d-86ea-b63b-a6207db8a551"
    - stage: trinity
      stageUuid: "dd9b40ff-2b45-8854-b9ac-bad16b2e7fbc"
    - stage: boundary
      stageUuid: "bc807c54-1f41-8be9-a537-191daff7ee3c"
    - stage: links
      stageUuid: "106e2a9a-1fb3-8fd5-a623-1cad776d5753"
    - stage: horo
      stageUuid: "f7cdd13a-6b05-8906-9e22-7d2c40690876"
    - stage: seal
      stageUuid: "1f4d844e-60e1-8802-ba73-bb58a1e3bffb"
    - stage: uuid
      stageUuid: "447c1920-43b0-8145-8558-8d121642d15a"
version: 2
---
# patent — challenge illegal patents, encoded in math

A patent is a time-limited monopoly the public grants only for something **new, non-obvious, and patentable**. When one is granted for what fails those tests, it is illegitimate — and erpax's proof primitives are exactly the instruments to show it. Encode the claim as a content-digest and test three grounds, each computable:

- **§102 prior art (novelty).** A disclosure predating the filing date anticipates the claim. An **anchored** content-[[uuid]] is a cryptographic **proof-of-anteriority** ([[anchor]] · [[proof]]): if the claimed content was anchored before the filing date — with an anchor that genuinely commits the digest (a weak or absent timestamp does **not** count) — the claim is anticipated. Publishing to the [[akashic]] record is itself **defensive publication**: tamper-proof, time-stamped, world-readable prior art.
- **§103 obviousness.** An obvious combination of known elements (KSR v. Teleflex). In erpax an obvious combination already has an identity — it is the [[merge]] of prior atoms, so its content-uuid **predates the claim by construction**; no new entropy was created to monopolise.
- **§101 subject matter.** An abstract idea, mathematical formula or law of nature is not patentable (Gottschalk v. Benson; Alice v. CLS Bank). erpax encodes **all in math** (content-uuid), so anything reducible to an erpax computation is abstract — outside §101.

## "Encode all in math" is the challenge

The deepest ground is the simplest: **what is provably math cannot be monopolised, and what is anchored is prior art.** By rendering a domain as content-addressed math and anchoring it, erpax simultaneously (a) publishes unforgeable prior art against future claims and (b) shows the subject is abstract — the two strongest invalidity grounds, established by construction. The corpus is a standing defensive-publication engine ([[history]] · [[tamper]]).

## Honest

This is **defensive only** and **not legal advice**: it models the *structure* of an invalidity argument (anteriority is a timestamp comparison over anchor-bound digests; obviousness is a merge identity) so a real challenge — an IPR, ex parte reexam, or §101 motion — can be built on verifiable facts. The math does not decide a case; it makes the prior art and the abstraction **checkable**.

Matter-twin: `src/patent/index.ts` (`anticipatedBy` · `isObvious` · `isAbstractMath` · `challengeable`). Composes [[anchor]] · [[proof]] · [[akashic]] · [[merge]] · [[uuid]] · [[history]] · [[tamper]] · [[law]].

**Law — [[law]]: a monopoly on math or on the already-known is illegitimate. Anchor the truth and it is prior art; encode it as math and it is unpatentable — the public domain defends itself by construction.**

@audit anteriority is a timestamp comparison over anchor-bound digests; obviousness is a merge identity; defensive only
@standard 35 U.S.C. §§101–103; RFC 3161 / eIDAS anchored timestamps (the anteriority proof)
