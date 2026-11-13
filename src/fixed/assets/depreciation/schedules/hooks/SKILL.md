---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 3/3 · c39fd953"
contentUuid: "f0120c08-062e-5d1c-bb6f-40343308770c"
diamondUuid: "6bde0a74-efc7-8c77-baa3-feef67acf78a"
uuid: "c39fd953-15af-8e8c-a05d-3e5891cc5f8b"
horo: 3
typography:
  partition: fixed
  bondDegree: 297
standards: []
bindings: []
signatures:
  computationUuid: "5d320c68-2614-89a4-b7ef-1bfb7a3a3584"
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
      stageUuid: "e90b776a-9406-8f8f-b0fe-05211a4dba6c"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "55b4c88c-a45d-8abe-99d2-692da0e63838"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
