---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 9/unity · cfcec89a"
contentUuid: "a4a64c22-87e8-5c00-8601-8978fc682f28"
diamondUuid: "596fac04-7b42-8eb5-bd73-1e5d18f9e911"
uuid: "cfcec89a-414c-8e9f-9664-bfed7eb982a7"
horo: 9
typography:
  partition: fixed
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "0314a35a-c9e9-850c-b871-24fa6f46b08b"
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
      stageUuid: "33e92d01-c9aa-8644-ab60-caf30ced3090"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "01e729a1-1164-8403-b4fe-57debb039b31"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
