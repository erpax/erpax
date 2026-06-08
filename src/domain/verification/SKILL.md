---
name: verification
description: "Use when proving control of a domain by content-uuid — publish the token in a DNS CNAME/TXT record (the ACME DNS-01 pattern); because the value IS the object's identity, any change to the object forces re-verification by architecture."
atomPath: domain/verification
coordinate: domain/verification · 8/crest · 5dd9a3ca
contentUuid: "41f96307-598e-557b-8e3e-1a173c8e6ac5"
diamondUuid: "eb74f4c7-c952-8b57-a9a0-36655ed3e4fa"
uuid: "5dd9a3ca-09d1-89b6-94bd-2ded614cbe65"
horo: 8
bonds:
  in:
    - anchor
    - checking
    - collapse
    - domain
    - fact
    - law
    - merge
    - policy
    - proof
    - reality
    - schema
    - sti
    - tamper
    - uuid
    - verification
  out:
    - anchor
    - checking
    - collapse
    - domain
    - fact
    - law
    - merge
    - policy
    - proof
    - reality
    - schema
    - sti
    - tamper
    - uuid
    - verification
typography:
  partition: domain
  bondDegree: 56
  neighbors: []
standards:
  - "RFC 8555 §8.4 (ACME DNS-01 challenge) + CA/Browser-Forum domain-control-validation"
  - "the record value is the content-uuid (@/verification); computed, never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - anchor
    - domain
    - identity
    - proof
    - tamper
    - uuid
    - verification
  matrix:
    - anchor
    - checking
    - collapse
    - domain
    - fact
    - law
    - merge
    - policy
    - proof
    - reality
    - schema
    - sti
    - tamper
    - uuid
    - verification
  backlinks:
    - anchor
    - checking
    - collapse
    - domain
    - fact
    - law
    - merge
    - policy
    - proof
    - reality
    - schema
    - sti
    - tamper
    - uuid
    - verification
signatures:
  computationUuid: "b7ed0aad-8ffa-83c8-9dde-3f5e3f26ed65"
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
      stageUuid: "9340656e-4357-8777-80f4-3f14c1697608"
    - stage: seal
      stageUuid: "11fae450-5715-8ec4-82c0-c3f041e50319"
    - stage: uuid
      stageUuid: "9f09bbc0-9344-8593-9f26-97755a69d722"
version: 2
---
# domain/verification — content-addressed domain control

Prove control of a [[domain]] by publishing the content-uuid token in a DNS record — the **ACME DNS-01** pattern (RFC 8555 §8.4: the record value is a digest of the key authorization). Publish a **CNAME or TXT** record at the challenge label (`_erpax-challenge.<domain>`); the verifier resolves it and matches the content-uuid ([[verification]]).

**The architecture law (the key).** Because the published value **is** the proven object's content-[[uuid]], if the object changes the uuid changes and the record no longer matches — **re-verification is required by architecture**, not by an expiry timer. There is nothing to revoke and no TTL to tune: the proof self-invalidates the instant the object it attests to changes. Tamper-evidence is structural ([[tamper]] · [[proof]] · [[anchor]]).

Proven control **is** the computational admin grant: prove you control the domain and the tenant is yours ([[domain]]). This is the domain application of the general content-addressed [[verification]] (`src/verification` provides `token` / `verify`; this adds the DNS record shape).

Matter-twin: `src/domain/verification/index.ts` (`challenge` · `verifyDomain` · `needsReverification`). Composes [[domain]] · [[verification]] · [[uuid]] · [[proof]] · [[anchor]] · [[tamper]] · [[identity]].

@standard RFC 8555 §8.4 (ACME DNS-01 challenge) + CA/Browser-Forum domain-control-validation
@audit the record value is the content-uuid (@/verification); computed, never hand-asserted
