---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 3/3 · c39fd953"
contentUuid: "7417c7c3-004a-5978-be51-f61a043e72f6"
diamondUuid: "ac26380a-b5db-8bf7-89e5-eae745dbd1c2"
uuid: "c39fd953-15af-8e8c-a05d-3e5891cc5f8b"
horo: 3
typography:
  partition: fixed
  bondDegree: 345
standards: []
bindings: []
signatures:
  computationUuid: "4e117ca4-1ed2-8c20-8124-0ea8bc5f46f9"
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
      stageUuid: "823c617e-deb8-8a3d-a6e4-90416dba282a"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "8b605ada-df93-8e3f-82a3-68b94534f35f"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
