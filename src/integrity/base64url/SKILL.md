---
name: base64url
description: "Use when reasoning about base64url — (HKDF-derived per-row DEKs) and (JWS-shaped detached signatures) each carried their own / ."
atomPath: "integrity/base64url"
coordinate: "integrity/base64url · 4/weave · ac9d639e"
contentUuid: "dd92d4d1-73f1-584d-b934-ea79b7076283"
diamondUuid: "4bb6caa6-3635-8070-8e7c-0252879fa1a2"
uuid: "ac9d639e-8ffa-8c3c-bb34-d8036c3f302a"
horo: 4
typography:
  partition: integrity
  bondDegree: 9
standards:
  - RFC 4648 §5 base64url — URL and filename safe alphabet
bindings: []
signatures:
  computationUuid: "44c4404d-6839-8d2a-a763-5d9c7c72e82f"
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
      stageUuid: "2aa217a3-c5e7-8ab3-8d85-3d3128a28d9b"
    - stage: seal
      stageUuid: "370c0a39-f149-8c71-ab2f-d487058cb7f0"
    - stage: uuid
      stageUuid: "58b41dd8-c8cd-8587-82d1-00e0deb16c29"
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
