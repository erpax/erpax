---
name: field
description: "Use when a collection needs a derived value or a relation rather than a question — a calculated number hidden from the admin, GL accounts as relations to gl-accounts, and a line-item array that refuses to be empty."
atomPath: "factory/collection/field"
coordinate: "factory/collection/field · 2/share · f3080d57"
contentUuid: "5c9e894e-987b-5e17-a770-0651179dc614"
diamondUuid: "9cb82186-5369-855b-a1c1-3366597e9404"
uuid: "f3080d57-3b02-803e-9263-60b877df39cb"
horo: 2
typography:
  partition: factory
  bondDegree: 358
standards: []
bindings: []
signatures:
  computationUuid: "2fb6b62b-c42d-80eb-8fd6-3dba3a6b2123"
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
      stageUuid: "b8b0326c-529c-8278-b9d5-9c10d755cdc7"
    - stage: seal
      stageUuid: "5aecf2a6-ca43-8ccf-9f39-8fb005555088"
    - stage: uuid
      stageUuid: "c2ea0a4d-5d68-8baf-99f2-2d771c5f97da"
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
