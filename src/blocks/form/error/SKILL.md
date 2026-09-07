---
name: error
description: "Use when reasoning about error — A field that rejects input and explains nothing is a dead end: the user knows the form will not submit and has no way to learn what to change."
atomPath: "blocks/form/error"
coordinate: "blocks/form/error · 8/crest · 312d601d"
contentUuid: "6629e471-2f51-5d4a-945d-f61b3030fbe0"
diamondUuid: "149756b8-550e-8841-b25b-5d576ca0b3dc"
uuid: "312d601d-0960-8f6a-99d7-01abf7ee6691"
horo: 8
typography:
  partition: blocks
  bondDegree: 17
standards: []
bindings: []
signatures:
  computationUuid: "b09b26ca-8c25-8318-b638-688babb04dd9"
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
      stageUuid: "58dee4b7-5521-88f3-84a1-2c228f820e8d"
    - stage: seal
      stageUuid: "1755b9b5-0126-8971-90c8-138368685c91"
    - stage: uuid
      stageUuid: "bd5a0be9-21eb-874d-96c3-022eca632c61"
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
