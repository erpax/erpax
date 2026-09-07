---
name: headers
description: "Use when reasoning about headers — Composite HTTP security-headers — defense-in-depth response hardening."
atomPath: "security/header/headers"
coordinate: "security/header/headers · 5/round · 641a1dca"
contentUuid: "4dc2f21c-720c-5394-a999-6a56dca4f2b9"
diamondUuid: "58ddbc8d-8b9d-82e8-a5e5-6d37c9bc9148"
uuid: "641a1dca-61c0-8910-ad43-32d7c2ba3352"
horo: 5
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
  computationUuid: "72ca215f-d115-8b13-b034-e68e40928352"
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
      stageUuid: "8945c3da-4ab8-8826-b04f-562db6031d0c"
    - stage: seal
      stageUuid: "44ef40cd-a89d-8722-a4fd-c0ab4de5407b"
    - stage: uuid
      stageUuid: "5aeffcd6-9a02-8bb2-bac3-20d5ad0e9687"
version: 2
---
# security/header/headers

Composite HTTP security-headers — defense-in-depth response hardening.

Extracted from `security/header/headers.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[security/header]].
