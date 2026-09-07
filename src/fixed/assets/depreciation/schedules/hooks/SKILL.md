---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 3/3 · 9f04cd68"
contentUuid: "ff8d7a3b-d0a1-5145-9145-1735f2b10f90"
diamondUuid: "ecbb6121-4359-8bda-a34d-0de280ec2eaa"
uuid: "9f04cd68-3443-894f-942d-bf72978a6bd2"
horo: 3
typography:
  partition: fixed
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "d303d77a-d8bf-8635-8fd1-4f2303f0ee23"
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
      stageUuid: "76b6769f-1085-8a56-b4a1-5d86c7304b9b"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "1acceb75-8914-83e5-aa11-b89bacecfae2"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
