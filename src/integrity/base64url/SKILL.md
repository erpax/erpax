---
name: base64url
description: "Use when reasoning about base64url — (HKDF-derived per-row DEKs) and (JWS-shaped detached signatures) each carried their own / ."
atomPath: "integrity/base64url"
coordinate: "integrity/base64url · 1/base · 3160d99b"
contentUuid: "8d19ad91-ca41-5c89-8adc-c97f51ca20d4"
diamondUuid: "1fc269c5-591f-8630-a0ff-18ee9554cf06"
uuid: "3160d99b-0500-8172-8ddb-58c059bda3ce"
horo: 1
typography:
  partition: integrity
  bondDegree: 9
standards:
  - RFC 4648 §5 base64url — URL and filename safe alphabet
bindings: []
signatures:
  computationUuid: "05eb7cfe-75be-8b13-a7d7-f81596c9df5b"
  stages:
    - stage: path
      stageUuid: "5cf66d10-2f95-8525-99b9-a4259730a212"
    - stage: trinity
      stageUuid: "77487cfd-984c-8a3a-84ad-46913c8d3812"
    - stage: boundary
      stageUuid: "bfbd4d19-1306-8d3f-b7ed-b02acabb84b9"
    - stage: links
      stageUuid: "e4eda20c-0143-8f10-b08f-65d16c972024"
    - stage: horo
      stageUuid: "eb450430-b71e-8629-8167-560db5f991e2"
    - stage: seal
      stageUuid: "370c0a39-f149-8c71-ab2f-d487058cb7f0"
    - stage: uuid
      stageUuid: "e2baa1e4-0e7d-8bcb-93be-066ef82d29f5"
version: 2
---
# integrity/base64url — the encoding both signature paths implemented privately

`envelope` (HKDF-derived per-row DEKs) and `signatures` (JWS-shaped detached signatures) each
carried their own `b64urlEncode` / `b64urlDecode`. [[rules]]/copy hashed the decoders to one
address; the encoders are four lines and matched too.

This is the encoding on the wire for a **signature**. Two implementations of it is two chances
for the padding rule or the alphabet substitution to drift — and a signature that verifies under
one and fails under the other is indistinguishable, from the caller, from a signature that is
simply invalid. eIDAS-aligned containers and JWS both mandate the unpadded URL-safe alphabet
(**RFC 4648 §5**); it is a property of the format, not of either caller.

**Honest boundary.** This is the encoding only. It makes no cryptographic claim: the key
derivation, the algorithm choice and the verification logic stay in `envelope` and `signatures`,
and folding the codec proves nothing about either.

**Law — [[law]]: a wire format has one implementation. Two is two chances to disagree about a
signature, and the disagreement reads as an invalid signature rather than as a bug.**

## Standards

- **RFC 4648 §5** — base64url: URL and filename safe alphabet.

Composes: [[integrity]] · [[rules]]/copy · [[law]].
