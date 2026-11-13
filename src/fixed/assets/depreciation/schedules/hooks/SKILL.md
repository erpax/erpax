---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 3/3 · c39fd953"
contentUuid: "4e18ceb4-efc4-51b3-879b-ac2d32160804"
diamondUuid: "e91ba359-b878-851d-9b1a-847f81121df5"
uuid: "c39fd953-15af-8e8c-a05d-3e5891cc5f8b"
horo: 3
typography:
  partition: fixed
  bondDegree: 288
standards: []
bindings: []
signatures:
  computationUuid: "c929a8d4-1d22-865e-b04e-bce600799250"
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
      stageUuid: "fc28115f-b7fd-800f-818f-07f59ebc3481"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "6c8af366-bdc9-8dd5-87ff-93b7a4a1e0bf"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
