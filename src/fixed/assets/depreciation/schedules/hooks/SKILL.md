---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 9/unity · f0484f32"
contentUuid: "41f4a1cf-4e18-540a-946d-4c5b04f48dda"
diamondUuid: "edf8c05e-efef-86cc-b9e0-1ae1c7b3faa3"
uuid: "f0484f32-049f-83c2-9553-6c061bcab0b3"
horo: 9
typography:
  partition: fixed
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "53d099eb-5f77-8ffa-b3c5-bd2e08251221"
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
      stageUuid: "5ad9a4c7-16da-8af4-8a97-6550b7284f69"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "8eb338e7-d3ce-8d0d-a6c5-3d5b14efce91"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
