---
name: declaration
description: Use when modelling one declaration — the singular model of the declarations collection (the plural store); a formal statement filed with an authority.
atomPath: declaration
coordinate: declaration · 4/weave · 578cbc25
contentUuid: "c53bfac9-7bed-5940-be95-3ed882227974"
diamondUuid: "7303ef99-80c6-8d80-9ecd-90278ab1b18e"
uuid: "578cbc25-c5a3-89a9-baec-11183a83c4ac"
horo: 4
bonds:
  in:
    - balance
    - declarations
    - legal
  out:
    - balance
    - declarations
    - legal
typography:
  partition: declaration
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - declarations
    - legal
  matrix:
    - balance
    - declarations
    - legal
  backlinks:
    - balance
    - declarations
    - legal
signatures:
  computationUuid: "fdad1e87-f0c9-86ad-b433-c5d006b56724"
  stages:
    - stage: path
      stageUuid: "22e6deed-b0ab-8388-8962-dc0f0b58f15e"
    - stage: trinity
      stageUuid: "abee49bb-6e49-823d-ae6e-defdb92a74b8"
    - stage: boundary
      stageUuid: "6c611266-8249-80a8-8de1-94980c2c3c08"
    - stage: links
      stageUuid: "bb3b45ee-fc53-8150-9688-5a52702964ea"
    - stage: horo
      stageUuid: "dc345e0c-0c1f-86ca-a097-65dad384f571"
    - stage: seal
      stageUuid: "46daa557-1aa7-8756-b514-8ac520f9b129"
    - stage: uuid
      stageUuid: "af22b0b5-1a6a-85e6-adc0-2a961b9ff874"
version: 2
---
# declaration — the model of one [[declarations]] row

A formal statement filed with an authority. The singular model whose plural store is the [[declarations]] collection ([[balance]]: every collection has its model).

Composes [[declarations]] · [[legal]] · [[balance]].
