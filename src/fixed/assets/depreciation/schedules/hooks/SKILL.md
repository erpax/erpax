---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 3/3 · c39fd953"
contentUuid: "5fdcaf44-0b46-5789-8e05-c5d8253ed970"
diamondUuid: "2c113acb-6d32-8dc7-b990-bd4c83b7360c"
uuid: "c39fd953-15af-8e8c-a05d-3e5891cc5f8b"
horo: 3
typography:
  partition: fixed
  bondDegree: 333
standards: []
bindings: []
signatures:
  computationUuid: "3d077db7-2f03-8bfb-a50b-f74e7d2ee1be"
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
      stageUuid: "ac0cd05f-bfc6-8fef-9bf6-95c235cf293a"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "6654d4bc-71cb-8f42-b507-9c2347f0acaf"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
