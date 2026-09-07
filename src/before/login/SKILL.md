---
name: login
description: "Use when reasoning about login — A panel above the admin sign-in form, carrying the copy that orients a first-time visitor: what this system is, and what signing in will do."
atomPath: "before/login"
coordinate: "before/login · 4/weave · 21652b9d"
contentUuid: "ed8060b3-2655-5aac-9be3-19202a2feea9"
diamondUuid: "891f1db0-1ddc-8913-8a0e-786422a87e28"
uuid: "21652b9d-4676-8d0e-8e7f-df3dc8ec7474"
horo: 4
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
  computationUuid: "29d41e1b-e7e8-8c55-834b-b024edb4a58e"
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
      stageUuid: "7e408e72-9d0d-8058-9a9f-d1285159b681"
    - stage: seal
      stageUuid: "9cba435e-ef74-8691-9754-a5b103e058b2"
    - stage: uuid
      stageUuid: "20bc56b2-1fbd-8251-a77b-32b8e867204d"
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
