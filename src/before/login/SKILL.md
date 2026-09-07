---
name: login
description: "Use when reasoning about login — A panel above the admin sign-in form, carrying the copy that orients a first-time visitor: what this system is, and what signing in will do."
atomPath: "before/login"
coordinate: "before/login · 8/crest · 2e84a664"
contentUuid: "4fb26cce-88c2-589e-902e-a430197a5037"
diamondUuid: "e2445ca7-cc81-8db5-b41a-f517b2803f81"
uuid: "2e84a664-7f3d-8e60-a159-952653b88908"
horo: 8
typography:
  partition: before
  bondDegree: 17
standards:
  - "BCP-47"
  - "BCP-47 language-tag"
  - "W3C HTML5 form-validation"
  - "W3C-HTML5"
  - "WCAG-2.1 §3.3.1 error-identification"
bindings: []
signatures:
  computationUuid: "03b3aeac-2dc9-8c4c-adc6-889781ce6327"
  stages:
    - stage: path
      stageUuid: "674ae6de-17da-8f5d-87f4-d4c212c5dad8"
    - stage: trinity
      stageUuid: "20cdff81-db5d-815b-8407-5b0efef3bf76"
    - stage: boundary
      stageUuid: "0969b5e1-6b52-87e9-923c-51b47d6db28a"
    - stage: links
      stageUuid: "70d98cd7-1102-80d0-84b5-0db8f295bf59"
    - stage: horo
      stageUuid: "2eb95bca-0d20-8b97-acd5-cd302f24d477"
    - stage: seal
      stageUuid: "9cba435e-ef74-8691-9754-a5b103e058b2"
    - stage: uuid
      stageUuid: "f2ebb490-d7fe-8930-a184-78c8c95549ce"
version: 2
---
# before/login — what the login page says before anyone types

A panel above the admin sign-in form, carrying the copy that orients a first-time visitor: what this
system is, and what signing in will do.

Its whole substance is **translated text**. A hardcoded English string here is not a cosmetic defect
— it is the first thing a Bulgarian administrator reads, on the one page they cannot skip, and it
signals that the rest of the system will be English too. So every string resolves through the
translator, and none is inlined.

**Honest boundary.** This is copy and layout. Authentication, error identification on failed sign-in,
and rate limiting all belong to the login form itself, not to the panel above it — the cited §3.3.1
banner describes the surface this sits on, not a claim this atom enforces.

**Law — [[law]]: user-facing copy is translated at the point it is written, never inlined for later.
The first screen is where a missing translation is most visible and least excusable.**

## Standards

- **BCP 47** — language tags.
- **WCAG 2.2 §3.3.1** — error identification (the surrounding form).

Composes: [[before]] · [[law]].
