---
name: verification
description: "Use when proving a claim by content-uuid — the verifier re-derives the uuid and matches; because the token IS the content's identity, any change requires re-verification by architecture (the ACME DNS-01 pattern)."
atomPath: verification
coordinate: "verification · 8/crest · d24fa2cc"
contentUuid: "204c9cc9-b215-535d-b303-4977cc8ec6a0"
diamondUuid: "b15bee3a-1959-8721-830f-bcf79e585765"
uuid: "d24fa2cc-d231-88a2-89d4-e973a63b63e6"
horo: 8
typography:
  partition: verification
  bondDegree: 56
standards:
  - "RFC 8555 §8.4 (ACME DNS-01: the record value is a digest of the key authorization)"
  - "RFC 8555 §8.4 (ACME DNS-01: the record value is a digest of the key authorization)`"
  - "schema.org — the type vocabulary, collided to single words"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "da150732-4664-8887-b4e1-44934b38a965"
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
      stageUuid: "290dd9bd-53bb-806b-8594-e027a5822361"
    - stage: seal
      stageUuid: "c2304e57-11c6-817c-aace-a88bd9e83323"
    - stage: uuid
      stageUuid: "86abb168-ece1-89e7-bb4e-e47269c9a4b7"
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

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard RFC 8555 §8.4 (ACME DNS-01: the record value is a digest of the key authorization)`
