---
name: policy
description: "Use when deriving the max-work/max-tamper policy that bounds a wave schedule — units per wave, wave depth, and the tamper-cost floor a plan must clear. The policy is the single place those ceilings are decided, so a schedule never hardcodes its own limits."
atomPath: "wave/policy"
coordinate: "wave/policy · 7/descent · dd513856"
contentUuid: "16affc3f-ee30-5771-ba91-fc1c2b0931e5"
diamondUuid: "9ad92049-746a-88a6-a5d8-70cc57e30b51"
uuid: "dd513856-a450-82fd-9433-139a1ea35727"
horo: 7
typography:
  partition: wave
  bondDegree: 114
standards: []
bindings: []
signatures:
  computationUuid: "0c1480a6-b930-88f3-abb5-63fea6384509"
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
      stageUuid: "d0462bcd-75e8-8e60-9a8d-4d5b55ac56b3"
    - stage: seal
      stageUuid: "b1b38bb1-1ada-8958-80d2-6935b1ce0730"
    - stage: uuid
      stageUuid: "770bedf7-af76-8bd4-96bc-50d15a995535"
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
