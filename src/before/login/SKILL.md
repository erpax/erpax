---
name: login
description: "Use when reasoning about login — A panel above the admin sign-in form, carrying the copy that orients a first-time visitor: what this system is, and what signing in will do."
atomPath: "before/login"
coordinate: "before/login · 5/round · 8b8f7461"
contentUuid: "d65b8036-78f3-5fea-94c4-3b7ae0d4dc93"
diamondUuid: "cea72959-d921-8e16-88f8-cbed73484aaf"
uuid: "8b8f7461-e993-81c1-90e9-16458771f4b6"
horo: 5
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
  computationUuid: "9a51705b-f738-8063-a603-55b6e4517d9f"
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
      stageUuid: "afb54839-81c7-8e67-b717-8c0abebcc6cb"
    - stage: seal
      stageUuid: "9cba435e-ef74-8691-9754-a5b103e058b2"
    - stage: uuid
      stageUuid: "d7ab1120-dd73-8e50-b006-f76fdae5ceb8"
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
