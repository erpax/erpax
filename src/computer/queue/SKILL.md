---
name: queue
description: "Use when ordering work FIFO under the machine model — executable queue nested under computer; distinct from top-level @/queue vocabulary."
atomPath: "computer/queue"
coordinate: "computer/queue · 5/round · cbe05091"
contentUuid: "929af99e-2559-5ff7-8c10-32eaeda0be60"
diamondUuid: "aad1c8a1-af23-8de6-98ee-866fa2b9f25d"
uuid: "cbe05091-3b86-88fd-a838-bacc71a9954e"
horo: 5
typography:
  partition: computer
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "430d37d0-2ef0-8c06-9629-000d794e5f54"
  stages:
    - stage: path
      stageUuid: "1869d141-8b8e-8412-a657-9587d53be921"
    - stage: trinity
      stageUuid: "16fad759-490f-8850-9441-f4f80d2fd7ae"
    - stage: boundary
      stageUuid: "7929827b-50e6-89a7-bec4-17fb13d2886e"
    - stage: links
      stageUuid: "1c2d61c3-e92c-89d4-8e83-f7c8eb7939d1"
    - stage: horo
      stageUuid: "f8d2269c-fe79-88ea-be60-ece3fb90e544"
    - stage: seal
      stageUuid: "06f258c1-9ee7-84ca-b84d-7bcf1de97aff"
    - stage: uuid
      stageUuid: "cc6c39d3-a8f9-807a-a96f-63010d7ec0d4"
version: 2
---
# computer/queue — FIFO work queue

`FifoQueue` — enqueue at tail, dequeue from head. CS data structure under the [[computer]] decomposition.

**Law — [[law]]: computer/queue is executable FIFO matter — not a glossary entry.**
