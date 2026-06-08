---
name: verification
description: "Use when proving a claim by content-uuid — the verifier re-derives the uuid and matches; because the token IS the content's identity, any change requires re-verification by architecture (the ACME DNS-01 pattern)."
atomPath: verification
coordinate: verification · 2/share · 611e9a6f
contentUuid: "1e90bc42-5216-5e04-8896-c308746a7442"
diamondUuid: "3e05ecc4-b444-876c-9639-56771cfd91e1"
uuid: "611e9a6f-8857-85a8-b3f4-5f1803de870d"
horo: 2
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
  partition: verification
  bondDegree: 56
  neighbors: []
standards:
  - "RFC 8555 §8.4 (ACME DNS-01: the record value is a digest of the key authorization)"
  - "schema.org — the type vocabulary, collided to single words"
  - "the token is the content-uuid; computed, never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - anchor
    - checking
    - collapse
    - domain
    - fact
    - law
    - merge
    - policy
    - proof
    - sti
    - tamper
    - uuid
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
  computationUuid: "9260c01f-e1b6-8ff9-903c-ce6cb7562ca0"
  stages:
    - stage: path
      stageUuid: "54cbf71b-70ec-8cbf-8521-dd7bcfeafc55"
    - stage: trinity
      stageUuid: "aa217d04-6ffc-803a-afe9-56fafa4aa51c"
    - stage: boundary
      stageUuid: "7f99b7d9-789e-8f91-8a3e-4322619daf06"
    - stage: links
      stageUuid: "26c198cb-3c9c-80dd-a27c-4d0fbeb2c5be"
    - stage: horo
      stageUuid: "7c01d104-edef-8207-94e6-6136e4795686"
    - stage: seal
      stageUuid: "b83f9f37-7ea6-8491-9ec5-7bcdad13e5e5"
    - stage: uuid
      stageUuid: "624314e6-36a3-89b9-b364-fe35374d1f68"
version: 2
---
# verification

A schema.org component word, collided out of schema.org compounds — fused from verificationFactCheckingPolicy ([[sti]] · [[collapse]] · [[merge]]).

**Content-addressed verification.** A claim is proven by a token that IS the content's [[uuid]]: the verifier re-derives the uuid from the actual content and matches. Because the token is the content's identity, ANY change yields a new uuid, so the old token fails — **re-verification is required by architecture**, with no expiry to set or revocation to push (the content-addressed dual of ACME DNS-01, RFC 8555 §8.4). The domain application — publish the token in a DNS CNAME/TXT record — is `src/domain/verification` ([[domain]]).

Matter-twin: `src/verification/index.ts` (`token` · `verify` · `needsReverification`). Composes [[domain]] · [[uuid]] · [[proof]] · [[anchor]] · [[tamper]] · [[merge]].

Entangled with — [[fact]] · [[checking]] · [[policy]]

Attested in schema.org — verificationFactCheckingPolicy

**Law — [[law]]: verification is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
