---
name: error
description: "Use when reasoning about error — A field that rejects input and explains nothing is a dead end: the user knows the form will not submit and has no way to learn what to change."
atomPath: "blocks/form/error"
coordinate: "blocks/form/error · 4/weave · 172dc114"
contentUuid: "fcecd914-ee16-521b-9a3f-db51548a8b14"
diamondUuid: "afd19e2a-3e6f-896e-9695-0ea5a418aa57"
uuid: "172dc114-0c59-8d7c-8435-9869dee368fa"
horo: 4
typography:
  partition: blocks
  bondDegree: 17
standards: []
bindings: []
signatures:
  computationUuid: "91d98960-a08e-8a59-b522-9fe955e60247"
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
      stageUuid: "bc65cf65-dc21-8ff1-adf3-3cb86ecc1215"
    - stage: seal
      stageUuid: "1755b9b5-0126-8971-90c8-138368685c91"
    - stage: uuid
      stageUuid: "49428817-57d6-8a1d-945a-c91af0358801"
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
