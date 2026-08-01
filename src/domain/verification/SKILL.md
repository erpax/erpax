---
name: verification
description: "Use when proving control of a domain by content-uuid — publish the token in a DNS CNAME/TXT record (the ACME DNS-01 pattern); because the value IS the object's identity, any change to the object forces re-verification by architecture."
atomPath: "domain/verification"
coordinate: "domain/verification · 2/share · f93d1d19"
contentUuid: "47b1a466-be97-5bb8-b643-1c725c1c355c"
diamondUuid: "62c279d5-5440-8da3-b06e-6abb6f0ca5e2"
uuid: "f93d1d19-7f75-8e5f-93bc-6ef9de227c62"
horo: 2
typography:
  partition: domain
  bondDegree: 56
standards:
  - "RFC 8555 §8.4 (ACME DNS-01 challenge) + CA/Browser-Forum domain-control-validation"
bindings: []
signatures:
  computationUuid: "8e09c4b0-518f-823d-ad92-b2e4be0959b8"
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
      stageUuid: "b39a664c-24c0-87f6-b1e5-2d4021955e04"
    - stage: seal
      stageUuid: "f8648717-91ef-8b1a-95c4-53376bf150e6"
    - stage: uuid
      stageUuid: "8f94dd64-dc32-8843-b2b6-78ba741b8f9d"
version: 2
---
# domain/verification — content-addressed domain control

Prove control of a [[domain]] by publishing the content-uuid token in a DNS record — the **ACME DNS-01** pattern (RFC 8555 §8.4: the record value is a digest of the key authorization). Publish a **CNAME or TXT** record at the challenge label (`_erpax-challenge.<domain>`); the verifier resolves it and matches the content-uuid ([[verification]]).

**The architecture law (the key).** Because the published value **is** the proven object's content-[[uuid]], if the object changes the uuid changes and the record no longer matches — **re-verification is required by architecture**, not by an expiry timer. There is nothing to revoke and no TTL to tune: the proof self-invalidates the instant the object it attests to changes. Tamper-evidence is structural ([[tamper]] · [[proof]] · [[anchor]]).

Proven control **is** the computational admin grant: prove you control the domain and the tenant is yours ([[domain]]). This is the domain application of the general content-addressed [[verification]] (`src/verification` provides `token` / `verify`; this adds the DNS record shape).

Matter-twin: `src/domain/verification/index.ts` (`challenge` · `verifyDomain` · `needsReverification`). Composes [[domain]] · [[verification]] · [[uuid]] · [[proof]] · [[anchor]] · [[tamper]] · [[identity]].

@standard RFC 8555 §8.4 (ACME DNS-01 challenge) + CA/Browser-Forum domain-control-validation
@audit the record value is the content-uuid (@/verification); computed, never hand-asserted
