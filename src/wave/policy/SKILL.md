---
name: policy
description: "Use when deriving the max-work/max-tamper policy that bounds a wave schedule — units per wave, wave depth, and the tamper-cost floor a plan must clear. The policy is the single place those ceilings are decided, so a schedule never hardcodes its own limits."
atomPath: "wave/policy"
coordinate: "wave/policy · 1/base · f178047b"
contentUuid: "c6c9ac6d-435a-55f7-a6bb-beac3646ca28"
diamondUuid: "aebaa92f-1aa8-8a22-aeaf-089b26a7204a"
uuid: "f178047b-3931-8cc8-a038-80bd51c02799"
horo: 1
typography:
  partition: wave
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "d930fd63-8276-8490-abb2-fd2cceb238af"
  stages:
    - stage: path
      stageUuid: "c0ac5bbf-73c3-8085-9be1-35a275e5cb6e"
    - stage: trinity
      stageUuid: "16230079-3c86-8bac-8213-6b2919636673"
    - stage: boundary
      stageUuid: "7a9cf93f-eaef-8a4b-adec-5494f5d04cec"
    - stage: links
      stageUuid: "e4598762-fcdd-87df-9418-dc24fd3b1603"
    - stage: horo
      stageUuid: "5229a115-d8bc-8511-a12e-7c7a625731c2"
    - stage: seal
      stageUuid: "b1b38bb1-1ada-8958-80d2-6935b1ce0730"
    - stage: uuid
      stageUuid: "91cd7c4f-f423-8156-8847-8bf7fa110ba0"
version: 2
---
# wave/policy — the ceilings, decided once

A wave schedule needs limits: how many units may sit in one wave, how deep the plan
may go, and what tamper-cost a wave must clear to be worth chaining. `maxWorkTamperPolicy()`
is the **one** place those are decided.

That matters because the alternative is each scheduler inventing its own numbers, and
then no one can say what the system's actual bound is — the corpus's recurring defect
in miniature: a constant duplicated is a constant nobody controls ([[rules]]). The
scheduler derives its options **from** the policy ([[wave]]/scheduler), so changing
the ceiling changes every schedule rather than one of them.

**Honest boundary.** The policy states ceilings; it does not prove they are the right
ceilings. They are declared in the open so they can be argued with — a tuned number
wearing a theorem's clothes is the thing this corpus refuses.

Composes: [[wave]] · [[wave]]/scheduler · [[tamper]].
