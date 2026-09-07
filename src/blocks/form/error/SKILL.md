---
name: error
description: "Use when reasoning about error — A field that rejects input and explains nothing is a dead end: the user knows the form will not submit and has no way to learn what to change."
atomPath: "blocks/form/error"
coordinate: "blocks/form/error · 2/share · 31fb5a17"
contentUuid: "f6ca5b72-2087-514f-a868-f1371e59176a"
diamondUuid: "5fef96be-cb18-8f9c-9ca2-1446dc42884b"
uuid: "31fb5a17-9055-83dd-8093-9e97034dfb18"
horo: 2
typography:
  partition: blocks
  bondDegree: 17
standards: []
bindings: []
signatures:
  computationUuid: "c70de588-f591-8fa0-b9f1-8d8362741b0b"
  stages:
    - stage: path
      stageUuid: "b0e59c5f-8be9-8270-970b-f7f510c61889"
    - stage: trinity
      stageUuid: "e9257746-7dff-8695-bd1d-6f207ba6552f"
    - stage: boundary
      stageUuid: "4105da7d-5fda-8cc0-bfbd-17a44df1299d"
    - stage: links
      stageUuid: "eb8e9812-53c0-8551-a2c1-0d7656bb602e"
    - stage: horo
      stageUuid: "83fceecf-efdf-8b36-bc59-137022452cdd"
    - stage: seal
      stageUuid: "1755b9b5-0126-8971-90c8-138368685c91"
    - stage: uuid
      stageUuid: "8743de13-cd3a-84ac-b034-0e92bd910919"
version: 2
---
# blocks/form/error — an invalid field always says why

A field that rejects input and explains nothing is a dead end: the user knows the form will not
submit and has no way to learn what to change. WCAG 2.2 §3.3.1 (error identification) asks for the
error to be *described in text*, and the failure this component forbids is the empty one — a
validator that fires with no `message`, leaving a red box containing nothing.

So the fallback is not decoration. `errors[name]?.message` is whatever the validator chose to say;
when it chose nothing, the translated `field-required` is said instead. **There is no input for
which this renders empty**, and that is the property worth proving.

**Honest boundary.** This proves the message is non-empty and comes from the field's own error. It
does not prove the message is *helpful* — "field-required" on a malformed email is technically true
and practically useless, and only a better validator message fixes that. It also does not wire the
error to the input via `aria-describedby`, so a screen reader reaching the field does not announce
it automatically; that is a real §3.3.1 gap and it is named here rather than implied away.

**Law — [[law]]: a rejected input is explained in text, always. A validator that fires without a
message leaves the user staring at a red box, so the component supplies the sentence the validator
omitted — and never renders nothing.**

## Standards

- **WCAG 2.2 §3.3.1** — error identification: the error is described in text.

Composes: [[blocks]] · [[law]].
