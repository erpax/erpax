---
name: verification
description: "Use when proving a claim by content-uuid — the verifier re-derives the uuid and matches; because the token IS the content's identity, any change requires re-verification by architecture (the ACME DNS-01 pattern)."
atomPath: verification
coordinate: "verification · 2/share · d68f02c5"
contentUuid: "cf7cd5e3-833a-5b0d-9feb-d28f5c5e81f3"
diamondUuid: "05288db6-e1f4-8a88-ba42-517f15ad04e9"
uuid: "d68f02c5-3ca8-8264-b6d4-41cbdc2980de"
horo: 2
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
  computationUuid: "bb81f131-1c0e-8d44-b6b2-2d480c24d1b5"
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
      stageUuid: "7dc8a0f0-b883-8612-9252-1c29e8b58f86"
    - stage: seal
      stageUuid: "c2304e57-11c6-817c-aace-a88bd9e83323"
    - stage: uuid
      stageUuid: "2de26f96-d6c5-8810-b116-8409362960fd"
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
