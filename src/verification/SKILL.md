---
name: verification
description: "Use when proving a claim by content-uuid — the verifier re-derives the uuid and matches; because the token IS the content's identity, any change requires re-verification by architecture (the ACME DNS-01 pattern)."
atomPath: verification
coordinate: "verification · 4/weave · 1dee1c69"
contentUuid: "d9b286ee-7e32-5cda-b257-6f87c5a762cf"
diamondUuid: "05611bec-6518-8a52-8435-4041aa08c5b7"
uuid: "1dee1c69-fef1-8e77-85c4-04cfe58a9d2c"
horo: 4
typography:
  partition: verification
  bondDegree: 40
standards:
  - "RFC 8555 §8.4 (ACME DNS-01: the record value is a digest of the key authorization)"
  - "RFC 8555 §8.4 (ACME DNS-01: the record value is a digest of the key authorization)`"
  - "schema.org — the type vocabulary, collided to single words"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "4178db5f-6878-8e2b-852a-1fa41600ad01"
  stages:
    - stage: path
      stageUuid: "54cbf71b-70ec-8cbf-8521-dd7bcfeafc55"
    - stage: trinity
      stageUuid: "aa217d04-6ffc-803a-afe9-56fafa4aa51c"
    - stage: boundary
      stageUuid: "7f99b7d9-789e-8f91-8a3e-4322619daf06"
    - stage: links
      stageUuid: "f5c624f6-a451-80ed-8b92-3417634716cd"
    - stage: horo
      stageUuid: "01d237fb-59d4-8e25-a8d5-718645d31e7f"
    - stage: seal
      stageUuid: "c2304e57-11c6-817c-aace-a88bd9e83323"
    - stage: uuid
      stageUuid: "2dc48457-2978-8dd9-a61f-de8b1f775abe"
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
