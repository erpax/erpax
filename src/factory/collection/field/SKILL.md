---
name: field
description: "Use when a collection needs a derived value or a relation rather than a question — a calculated number hidden from the admin, GL accounts as relations to gl-accounts, and a line-item array that refuses to be empty."
atomPath: "factory/collection/field"
coordinate: "factory/collection/field · 1/base · c669a38e"
contentUuid: "ce831dd9-5086-5210-9b95-5d82102c9ef9"
diamondUuid: "2e7d7acf-d309-82e8-ab86-bf9249180915"
uuid: "c669a38e-e05e-8f6a-9c1e-1cc88e516048"
horo: 1
typography:
  partition: factory
  bondDegree: 358
standards: []
bindings: []
signatures:
  computationUuid: "62ad7897-1de1-8880-a4de-a520ba608fcd"
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
      stageUuid: "6784e32f-c61e-850b-b877-7329263590ad"
    - stage: seal
      stageUuid: "5aecf2a6-ca43-8ccf-9f39-8fb005555088"
    - stage: uuid
      stageUuid: "eed473c1-9256-8a7b-9ccc-feb181d98293"
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
