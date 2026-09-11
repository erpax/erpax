---
name: verification
description: "Use when proving control of a domain by content-uuid — publish the token in a DNS CNAME/TXT record (the ACME DNS-01 pattern); because the value IS the object's identity, any change to the object forces re-verification by architecture."
atomPath: "domain/verification"
coordinate: "domain/verification · 7/descent · c2f6e473"
contentUuid: "28ee9ad6-a202-509d-9168-f442dcf39453"
diamondUuid: "5dfcdb14-32b1-899f-9328-1f532aa4ec25"
uuid: "c2f6e473-d68f-89ea-8fb2-9be1369a3b33"
horo: 7
typography:
  partition: domain
  bondDegree: 56
standards:
  - "RFC 8555 §8.4 (ACME DNS-01 challenge) + CA/Browser-Forum domain-control-validation"
bindings: []
signatures:
  computationUuid: "c368eef6-cd88-8c05-a418-c19ada10b509"
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
      stageUuid: "62d5917c-8e87-8ade-af21-28b866f923f6"
    - stage: seal
      stageUuid: "f8648717-91ef-8b1a-95c4-53376bf150e6"
    - stage: uuid
      stageUuid: "64a70b7c-43a0-879f-9638-f889145d6122"
version: 2
---
# domain/verification — content-addressed domain control

Prove control of a [[domain]] by publishing the content-uuid token in a DNS record — the **ACME DNS-01** pattern (RFC 8555 §8.4: the record value is a digest of the key authorization). Publish a **CNAME or TXT** record at the challenge label (`_erpax-challenge.<domain>`); the verifier resolves it and matches the content-uuid ([[verification]]).

**The architecture law (the key).** Because the published value **is** the proven object's content-[[uuid]], if the object changes the uuid changes and the record no longer matches — **re-verification is required by architecture**, not by an expiry timer. There is nothing to revoke and no TTL to tune: the proof self-invalidates the instant the object it attests to changes. Tamper-evidence is structural ([[tamper]] · [[proof]] · [[anchor]]).

Proven control **is** the computational admin grant: prove you control the domain and the tenant is yours ([[domain]]). This is the domain application of the general content-addressed [[verification]] (`src/verification` provides `token` / `verify`; this adds the DNS record shape).

Matter-twin: `src/domain/verification/index.ts` (`challenge` · `verifyDomain` · `needsReverification`). Composes [[domain]] · [[verification]] · [[uuid]] · [[proof]] · [[anchor]] · [[tamper]] · [[identity]].

@standard RFC 8555 §8.4 (ACME DNS-01 challenge) + CA/Browser-Forum domain-control-validation
@audit the record value is the content-uuid (@/verification); computed, never hand-asserted
