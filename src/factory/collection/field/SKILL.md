---
name: field
description: "Use when a collection needs a derived value or a relation rather than a question — a calculated number hidden from the admin, GL accounts as relations to gl-accounts, and a line-item array that refuses to be empty."
atomPath: "factory/collection/field"
coordinate: "factory/collection/field · 2/share · f3080d57"
contentUuid: "e4a27ebe-7545-5a02-a2bd-725bda9637a2"
diamondUuid: "153a7d4c-c546-8ed0-8e80-785b6bc4314f"
uuid: "f3080d57-3b02-803e-9263-60b877df39cb"
horo: 2
typography:
  partition: factory
  bondDegree: 334
standards: []
bindings: []
signatures:
  computationUuid: "13f09c7a-7c08-821e-a951-a940a492fb5e"
  stages:
    - stage: path
      stageUuid: "eef919dd-b89b-8ede-825c-d225594cba9b"
    - stage: trinity
      stageUuid: "9409edef-ab68-8fd1-a886-4fb55fba854c"
    - stage: boundary
      stageUuid: "1225a120-abb5-88b9-a8e8-7454916d951e"
    - stage: links
      stageUuid: "3031e3c8-d46c-89b0-b096-fde0892181c9"
    - stage: horo
      stageUuid: "58145440-08d2-8ed2-bc2a-20fb0e441d90"
    - stage: seal
      stageUuid: "5aecf2a6-ca43-8ccf-9f39-8fb005555088"
    - stage: uuid
      stageUuid: "a584e198-7965-8ce2-a626-39358dc02b94"
version: 2
---
# factory/collection/field — the asks a collection should never make

Three builders, one law between them: **if the system can derive it, the user confirms rather than types** ([[rules]]/ask). User input is the highest cost in an ERP — paid on every document, forever, in attention and in error.

| builder | what it removes |
| --- | --- |
| `createCalculatedField` | a number the user would type. It is `admin.disabled` and carries its own `_calculator`, so the hook that writes it reads the function off the field instead of re-deriving it elsewhere |
| `createGLAccountFields` | a typed account code. Each is a **relation to `gl-accounts`**, required — so the account must exist before it can be named |
| `createLineItemArray` | an empty document. `minRows: 1` — a line-item table with no lines is not a document anyone meant to write |

**Honest boundary.** These remove the ask; they do not decide the value. `_calculator` is *carried*, not invoked here — a collection still wires the hook that runs it, and a field built by this atom with no such hook computes nothing.

Composes: [[factory]] · [[rules]]/ask.
