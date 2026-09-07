---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 9/unity · 760d18cb"
contentUuid: "cbdf975e-4d57-55a7-9377-771a75d455bb"
diamondUuid: "4efe8f05-5b74-8193-a28e-647f593868e1"
uuid: "760d18cb-6f75-87a1-9d05-94775951f86d"
horo: 9
typography:
  partition: fixed
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "5b31e3e7-0871-8aa0-ad27-03deba6f6cce"
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
      stageUuid: "3608f85a-37bd-8481-a058-a90b32014f14"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "abe66dc8-a6a6-852e-99ab-beccb9cbdc79"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
