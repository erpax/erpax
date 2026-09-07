---
name: base64url
description: "Use when reasoning about base64url — (HKDF-derived per-row DEKs) and (JWS-shaped detached signatures) each carried their own / ."
atomPath: "integrity/base64url"
coordinate: "integrity/base64url · 4/weave · a4bfa3b4"
contentUuid: "bd0f4ae9-0b38-506e-ae73-93db5947d707"
diamondUuid: "00ac99a9-f060-838d-aaa3-340e4cf30b05"
uuid: "a4bfa3b4-8844-8fc4-9e6f-caa539ea8787"
horo: 4
typography:
  partition: integrity
  bondDegree: 9
standards:
  - RFC 4648 §5 base64url — URL and filename safe alphabet
bindings: []
signatures:
  computationUuid: "ce08c231-1e67-8df5-972a-3ad513c1d292"
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
      stageUuid: "adaaf3d3-1af0-8130-ab33-76fb7c2536b1"
    - stage: seal
      stageUuid: "370c0a39-f149-8c71-ab2f-d487058cb7f0"
    - stage: uuid
      stageUuid: "70e0097a-1b17-80e1-990b-796ab168d647"
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
