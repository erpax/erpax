---
name: hooks
description: "Use when reasoning about hooks — books the period's charge when the schedule row is posted. The schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the two from…"
atomPath: "fixed/assets/depreciation/schedules/hooks"
coordinate: "fixed/assets/depreciation/schedules/hooks · 9/unity · 6059d31d"
contentUuid: "433b41db-1413-52c2-a59e-afeb88be208e"
diamondUuid: "e74a7cf1-afe7-8170-a0c7-a194737f5ac9"
uuid: "6059d31d-b3c9-8fcb-b42c-b7a979f635c0"
horo: 9
typography:
  partition: fixed
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "d2c41c1d-b7cf-87b4-a616-524b4dd84cbb"
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
      stageUuid: "871fea79-8e36-8f35-944c-11714f04df37"
    - stage: seal
      stageUuid: "cb1b9664-dea1-8c01-9c2c-85935f4f657c"
    - stage: uuid
      stageUuid: "b3c16033-25fb-8954-b12b-24baaf4c5a87"
version: 2
---
# fixed/assets/depreciation/schedules/hooks — depreciation is posted by the schedule, not by a monthly reminder

`depreciationSchedulePostingHook` books the period's charge when the schedule row is posted. The
schedule is the record of what SHOULD be charged and when; letting the hook post it is what keeps the
two from disagreeing.

Composes: [[law]].
