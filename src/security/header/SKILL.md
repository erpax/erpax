---
name: header
description: "Use when implementing or referencing `_security-headers/` — Composite HTTP security-headers module."
atomPath: security/header
coordinate: security/header · 4/weave · 5da1412e
contentUuid: "fcf62da7-b67e-5fa3-a22a-cd1bc4219328"
diamondUuid: "a3349621-307e-818b-9c02-a1d7055da17c"
uuid: "5da1412e-1e7d-84c3-95d6-cf8bee148a42"
horo: 4
bonds:
  in:
    - collapse
    - law
    - merge
    - security
    - sti
    - wp
  out:
    - collapse
    - law
    - merge
    - sti
    - wp
typography:
  partition: security
  bondDegree: 17
  neighbors: []
standards:
  - "6797 hsts"
  - "OWASP-ASVS"
  - "W3C CSP-3"
  - "W3C Permissions-Policy"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - collapse
    - law
    - merge
    - sti
    - wp
  backlinks:
    - collapse
    - law
    - merge
    - sti
    - wp
signatures:
  computationUuid: "f14d8f3d-5036-81b6-99e0-4b0c372bb38c"
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
      stageUuid: "272108c0-d6ab-8e86-8eff-1379b89cfb65"
    - stage: seal
      stageUuid: "889afee7-f608-84f7-8d71-ace1d215bd25"
    - stage: uuid
      stageUuid: "2dab7afb-5a67-81ec-bdc0-fb5b3a400abf"
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
