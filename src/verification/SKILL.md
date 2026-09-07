---
name: verification
description: "Use when proving a claim by content-uuid — the verifier re-derives the uuid and matches; because the token IS the content's identity, any change requires re-verification by architecture (the ACME DNS-01 pattern)."
atomPath: verification
coordinate: "verification · 5/round · 18202930"
contentUuid: "a3afb82e-45ab-5c77-bfa7-9f96f4d0d423"
diamondUuid: "24c38dab-8c18-89cb-8b8f-ce1daf6d86c5"
uuid: "18202930-3ddf-8852-857d-4bfb648ff68b"
horo: 5
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
  computationUuid: "b8fc918a-410a-89cb-a545-854e410e39f6"
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
      stageUuid: "2126c1cd-553a-800d-ab47-d6a3b1507980"
    - stage: seal
      stageUuid: "c2304e57-11c6-817c-aace-a88bd9e83323"
    - stage: uuid
      stageUuid: "b76add31-fdee-816d-a991-2064c8d43e4b"
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
