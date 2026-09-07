---
name: headers
description: "Use when reasoning about headers — Composite HTTP security-headers — defense-in-depth response hardening."
atomPath: "security/header/headers"
coordinate: "security/header/headers · 4/weave · 11ad6c17"
contentUuid: "1dabf896-78b3-53e2-8923-b33ebd30003d"
diamondUuid: "5142022f-80d7-8c41-912b-bd76d84a875b"
uuid: "11ad6c17-24e0-8189-ac10-e2508f048dfb"
horo: 4
typography:
  partition: security
  bondDegree: 6
standards:
  - "6797 hsts http-strict-transport-security"
  - "9110 http-semantics"
  - "OWASP Secure-Headers-Project"
  - "OWASP-ASVS"
  - "OWASP-ASVS V14 configuration"
  - "SOC-2 CC6.6 boundary-protection"
  - "W3C CSP-3 content-security-policy"
  - "W3C Permissions-Policy"
  - "W3C Referrer-Policy"
bindings: []
signatures:
  computationUuid: "16b1c891-5ac1-8bad-9b5f-a66155563fa3"
  stages:
    - stage: path
      stageUuid: "48257319-b8a8-8da2-be35-2ed4f5446ab0"
    - stage: trinity
      stageUuid: "c7e5a9a7-ac88-811c-b1c6-9b5a01e71b18"
    - stage: boundary
      stageUuid: "561be6ee-825b-825c-a192-5f5a3c2ac718"
    - stage: links
      stageUuid: "a43f78c0-44ee-8fa1-bcdf-f940999f2f25"
    - stage: horo
      stageUuid: "cf807853-f049-859b-a1ed-8919124074dd"
    - stage: seal
      stageUuid: "44ef40cd-a89d-8722-a4fd-c0ab4de5407b"
    - stage: uuid
      stageUuid: "50f4f618-a7c5-899a-846d-c4038d2dfa4a"
version: 2
---
# security/header/headers

Composite HTTP security-headers — defense-in-depth response hardening.

Extracted from `security/header/headers.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[security/header]].
