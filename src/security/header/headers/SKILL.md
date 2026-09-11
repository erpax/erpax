---
name: headers
description: "Use when reasoning about headers — Composite HTTP security-headers — defense-in-depth response hardening."
atomPath: "security/header/headers"
coordinate: "security/header/headers · 2/share · 92d7a938"
contentUuid: "d3c4cb5d-2b87-599f-8191-006bd577eb8e"
diamondUuid: "b4528a58-1e1a-8ec8-8558-58f48048d996"
uuid: "92d7a938-ec66-8762-9227-578fbb2265a5"
horo: 2
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
  computationUuid: "dfdcb81f-7a67-82be-a36b-0be566063248"
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
      stageUuid: "33fac2a0-c045-8b65-8374-a379a59a1c50"
    - stage: seal
      stageUuid: "44ef40cd-a89d-8722-a4fd-c0ab4de5407b"
    - stage: uuid
      stageUuid: "3268060d-7750-8067-9329-2bd0d9ab60a1"
version: 2
---
# security/header/headers

Composite HTTP security-headers — defense-in-depth response hardening.

Extracted from `security/header/headers.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[security/header]].
