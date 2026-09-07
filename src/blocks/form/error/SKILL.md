---
name: error
description: "Use when reasoning about error — A field that rejects input and explains nothing is a dead end: the user knows the form will not submit and has no way to learn what to change."
atomPath: "blocks/form/error"
coordinate: "blocks/form/error · 5/round · 38bd8ad4"
contentUuid: "fb832849-79d4-507e-92a1-9e0aaa1e5e70"
diamondUuid: "6af97109-6599-81a6-8820-c41aca1a9ada"
uuid: "38bd8ad4-c522-8f67-98f7-c272f87990a1"
horo: 5
typography:
  partition: blocks
  bondDegree: 17
standards: []
bindings: []
signatures:
  computationUuid: "59576c6f-45aa-8903-9c80-67f95f8d5c28"
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
      stageUuid: "36a7ba78-974e-8fc0-89b3-a8b4df1680a7"
    - stage: seal
      stageUuid: "1755b9b5-0126-8971-90c8-138368685c91"
    - stage: uuid
      stageUuid: "6ebefd7b-f457-8711-9f02-5b71d954150b"
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
