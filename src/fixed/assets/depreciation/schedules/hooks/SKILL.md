---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 9/unity · f6bae6f4"
contentUuid: "f92d4ec9-62ef-52f7-a014-c0cda41203d4"
diamondUuid: "ce47b707-b6bc-8e3c-8ae6-7b17376bdce3"
uuid: "f6bae6f4-2bf0-89a4-b0e1-42648e01af24"
horo: 9
typography:
  partition: fixed
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "352473e8-cc33-8b6a-952d-c9887cd95785"
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
      stageUuid: "08766785-ff86-89d0-8316-91ef18ef8f6f"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "97209a86-2e60-83c0-adb3-091d5c2161d3"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
