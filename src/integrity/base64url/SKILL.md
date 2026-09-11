---
name: base64url
description: "Use when reasoning about base64url — (HKDF-derived per-row DEKs) and (JWS-shaped detached signatures) each carried their own / ."
atomPath: "integrity/base64url"
coordinate: "integrity/base64url · 2/share · fef6c939"
contentUuid: "f51ead02-c9ee-5a0e-865f-6f515682f0d2"
diamondUuid: "fe14d7ae-1055-8ccc-94bf-d7c053b54c67"
uuid: "fef6c939-0a0d-8d62-ac88-0d57ec70dba0"
horo: 2
typography:
  partition: integrity
  bondDegree: 9
standards:
  - RFC 4648 §5 base64url — URL and filename safe alphabet
bindings: []
signatures:
  computationUuid: "b5eba2c2-05b1-8f65-ac86-0a4abcda98f4"
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
      stageUuid: "bd77fdae-0a0e-89c1-9f28-16e71459f78d"
    - stage: seal
      stageUuid: "370c0a39-f149-8c71-ab2f-d487058cb7f0"
    - stage: uuid
      stageUuid: "d26f5164-a0c7-82e1-91ed-51c063023021"
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
