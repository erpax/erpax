---
name: headers
description: "Use when reasoning about headers — Composite HTTP security-headers — defense-in-depth response hardening."
atomPath: "security/header/headers"
coordinate: "security/header/headers · 5/round · f4b79b91"
contentUuid: "80704a0b-f5dc-5399-84dd-a305cdadec5a"
diamondUuid: "29b734a6-810b-825a-8700-5813eb071794"
uuid: "f4b79b91-7170-8b79-914f-4c262f6abff1"
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
  computationUuid: "52509eae-7197-8bfc-a2a1-c8332ff9f8e9"
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
      stageUuid: "0f059015-2580-8dad-9be8-23c4f43855a0"
    - stage: seal
      stageUuid: "44ef40cd-a89d-8722-a4fd-c0ab4de5407b"
    - stage: uuid
      stageUuid: "c74f3790-338e-8c80-87f1-ac0616ce87c6"
version: 2
---
# security/header/headers

Composite HTTP security-headers — defense-in-depth response hardening.

Extracted from `security/header/headers.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[security/header]].
