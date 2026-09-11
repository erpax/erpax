---
name: verification
description: "Use when proving control of a domain by content-uuid — publish the token in a DNS CNAME/TXT record (the ACME DNS-01 pattern); because the value IS the object's identity, any change to the object forces re-verification by architecture."
atomPath: "domain/verification"
coordinate: "domain/verification · 5/round · 8fd8a434"
contentUuid: "a568d614-48c3-5f68-b2d7-4cc4ab0ebd39"
diamondUuid: "489de2f9-5f6c-8469-80fc-02596e00a3db"
uuid: "8fd8a434-66b5-8dfe-bc57-cbc0437f5a3c"
horo: 5
typography:
  partition: domain
  bondDegree: 56
standards:
  - "RFC 8555 §8.4 (ACME DNS-01 challenge) + CA/Browser-Forum domain-control-validation"
bindings: []
signatures:
  computationUuid: "e2a6b186-9fa7-8258-a8f5-0795ba1b079d"
  stages:
    - stage: path
      stageUuid: "90aade4f-818d-8d4b-ad0e-dacb402a8696"
    - stage: trinity
      stageUuid: "7fe012cd-8ce2-851f-85ab-d5f8fa47daab"
    - stage: boundary
      stageUuid: "01b76539-d55c-8f73-98ed-84281d1f7f78"
    - stage: links
      stageUuid: "b92635c1-c8e5-86f2-a6be-f245c3f1ec72"
    - stage: horo
      stageUuid: "32e74f2d-3d7c-81dd-b525-9837a90f5453"
    - stage: seal
      stageUuid: "f8648717-91ef-8b1a-95c4-53376bf150e6"
    - stage: uuid
      stageUuid: "4290d852-cce7-8080-995d-57b489698290"
version: 2
---
# domain/verification — content-addressed domain control

Prove control of a [[domain]] by publishing the content-uuid token in a DNS record — the **ACME DNS-01** pattern (RFC 8555 §8.4: the record value is a digest of the key authorization). Publish a **CNAME or TXT** record at the challenge label (`_erpax-challenge.<domain>`); the verifier resolves it and matches the content-uuid ([[verification]]).

**The architecture law (the key).** Because the published value **is** the proven object's content-[[uuid]], if the object changes the uuid changes and the record no longer matches — **re-verification is required by architecture**, not by an expiry timer. There is nothing to revoke and no TTL to tune: the proof self-invalidates the instant the object it attests to changes. Tamper-evidence is structural ([[tamper]] · [[proof]] · [[anchor]]).

Proven control **is** the computational admin grant: prove you control the domain and the tenant is yours ([[domain]]). This is the domain application of the general content-addressed [[verification]] (`src/verification` provides `token` / `verify`; this adds the DNS record shape).

Matter-twin: `src/domain/verification/index.ts` (`challenge` · `verifyDomain` · `needsReverification`). Composes [[domain]] · [[verification]] · [[uuid]] · [[proof]] · [[anchor]] · [[tamper]] · [[identity]].

@standard RFC 8555 §8.4 (ACME DNS-01 challenge) + CA/Browser-Forum domain-control-validation
@audit the record value is the content-uuid (@/verification); computed, never hand-asserted
