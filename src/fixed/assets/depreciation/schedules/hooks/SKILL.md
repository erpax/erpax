---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 9/unity · 9160dbf5"
contentUuid: "5fec64e2-d70d-52c7-a797-39f93a65408c"
diamondUuid: "bbf24fac-dc43-8c0e-b92b-08a7b83c1b9e"
uuid: "9160dbf5-c6be-8f4c-99d7-b8c98abf3f02"
horo: 9
typography:
  partition: fixed
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "5ed3348e-34d8-8bfe-a1de-71642c6aa806"
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
      stageUuid: "a6accbfa-f546-8ec2-9184-b8974d90ae4b"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "b50cfba9-e643-83cc-96ff-36d73456f785"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
