---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 3/3 · 89ed087b"
contentUuid: "282320ef-7673-5138-9bbf-27ab951963f0"
diamondUuid: "6844f7b4-517f-8783-8fc4-bcc0179c5e54"
uuid: "89ed087b-38de-8b6d-8971-4288986c525f"
horo: 3
typography:
  partition: fixed
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "0d204a3c-d1d2-84b5-87cb-32a2ba6f4608"
  stages:
    - stage: path
      stageUuid: "89d745fd-83fa-8c38-9719-68c1ebee82c5"
    - stage: trinity
      stageUuid: "a0efd99e-35b2-884a-acd3-a5082386b1b9"
    - stage: boundary
      stageUuid: "38dbe165-8cfb-8920-b66a-1e997c7a9644"
    - stage: links
      stageUuid: "d0bc6372-cb28-89e1-8db5-14d6ead3c73e"
    - stage: horo
      stageUuid: "5fe6f139-05fe-8592-b8de-24b4dd4fa483"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "2b98069e-d5c0-8cd2-83e7-4d81c55a885b"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
