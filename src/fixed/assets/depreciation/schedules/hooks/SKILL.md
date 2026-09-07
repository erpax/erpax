---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 9/unity · 0da110eb"
contentUuid: "e3bc13c1-9980-500a-a877-a6dca213cd9c"
diamondUuid: "243486ff-4f2d-8883-b879-82cf262c1630"
uuid: "0da110eb-2fe6-8702-8419-b84a39fa08b9"
horo: 9
typography:
  partition: fixed
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "c1124c10-908a-8fc7-858f-f2bfc99b737b"
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
      stageUuid: "2aca1a8c-0fd1-8bb5-adfd-75275f71618c"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "064003bd-db88-8831-860f-61ad88268b32"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
