---
name: headers
description: "Use when reasoning about headers — Composite HTTP security-headers — defense-in-depth response hardening."
atomPath: "security/header/headers"
coordinate: "security/header/headers · 4/weave · 1d9593aa"
contentUuid: "95b40f97-5f79-508e-87a2-3f92c23df7b9"
diamondUuid: "3bc1ba7a-188c-8c53-ba0c-5654f4a117b6"
uuid: "1d9593aa-e5d3-89a1-b70c-831c9e8d28e6"
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
  computationUuid: "39c2a5db-06d2-8a99-b340-ec19ccc7398f"
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
      stageUuid: "e346752a-beb5-8ea5-a248-b3dcdec478e8"
    - stage: seal
      stageUuid: "44ef40cd-a89d-8722-a4fd-c0ab4de5407b"
    - stage: uuid
      stageUuid: "8fbbc2ca-57c3-80d5-b9d7-a89dc0e677c7"
version: 2
---
# security/header/headers

Composite HTTP security-headers — defense-in-depth response hardening.

Extracted from `security/header/headers.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[security/header]].
