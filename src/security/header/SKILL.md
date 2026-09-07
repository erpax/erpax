---
name: header
description: "Use when implementing or referencing `_security-headers/` — Composite HTTP security-headers module."
atomPath: "security/header"
coordinate: "security/header · 1/base · a2f77eb3"
contentUuid: "2c610a90-6b8d-551b-885c-df20a8083a23"
diamondUuid: "0095d439-be42-8b12-bd9b-2de4601162a0"
uuid: "a2f77eb3-f397-854c-b226-b852d1419051"
horo: 1
typography:
  partition: security
  bondDegree: 21
standards:
  - "6797 hsts"
  - "OWASP-ASVS"
  - "W3C CSP-3"
  - "W3C CSP-3`"
  - "W3C Permissions-Policy"
  - "W3C Permissions-Policy`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e75412df-b3ec-875b-9462-002cb3252023"
  stages:
    - stage: path
      stageUuid: "58b85437-450d-8dac-a4d8-2398c112c444"
    - stage: trinity
      stageUuid: "d70d400a-b5c1-8eff-94c6-c371ada318c0"
    - stage: boundary
      stageUuid: "16c34609-cfd5-86a6-9b1c-76751a83b50e"
    - stage: links
      stageUuid: "1a1cccf0-6988-8e89-857f-4a484420fc9e"
    - stage: horo
      stageUuid: "1a69039b-bdcd-8f21-9619-40e4b90e1c46"
    - stage: seal
      stageUuid: "c3d992d3-6cae-88d7-864d-bbaa8f6ae57a"
    - stage: uuid
      stageUuid: "dc1b22ce-f7c6-8571-963e-3716da10f561"
version: 2
---
# `_security-headers/` — Composite HTTP security-headers module

A composite, not a single standard. Combines:

- **RFC 6797** — HTTP Strict-Transport-Security (HSTS).
- **W3C CSP Level 3** — Content-Security-Policy directives, frame-ancestors,
  default/script/style/img/font/connect/base/form-action sources.
- **W3C Referrer-Policy** — `strict-origin-when-cross-origin` default.
- **W3C Permissions-Policy** — geolocation, microphone, camera, payment,
  usb, magnetometer, gyroscope, accelerometer.
- **W3C HTML5** — `X-Content-Type-Options: nosniff`, `X-Frame-Options`.
- **Legacy** — `X-XSS-Protection: 1; mode=block` for older UAs.

Composite folders use a leading underscore (`_security-headers`,
`_money`) to distinguish them from single-standard folders.

## What's here

- `headers.ts` — `defaultSecurityHeaders`, `buildSecurityHeaders(config)`,
  `applySecurityHeaders(response, config?)`. Pure functions over a
  config object; no I/O, no Next.js-specific imports.

## Companion citations

- **OWASP ASVS V14** — configuration / hardening checklist.
- **OWASP Secure-Headers-Project** — recommended defaults.
- **ISO 27001 A.8.20** — networks security.
- **ISO 27002 §8.20** — networks security.
- **SOC 2 CC6.6** — boundary protection.

## Used by

Apply via Next.js `middleware.ts` or per-route headers on Workers / edge
deployments. Currently called from project middleware where applicable.

## Out of scope

- CORS — see RFC 6454 / Fetch standard. Payload's CORS config lives in
  `src/payload.config.ts` `cors:` and is intentionally separate.
- CSRF tokens — handled by Payload's auth stack and same-origin cookies.

**Law — [[law]]: the security headers are a composite of independent standards (HSTS · CSP · Referrer-Policy · Permissions-Policy · nosniff · frame-options) emitted by pure functions over a config object — defense-in-depth is layered and I/O-free, computed from configuration, never hardcoded per route.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C CSP-3`
- `@standard W3C Permissions-Policy`
