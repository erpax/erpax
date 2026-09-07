---
name: field
description: "Use when a collection needs a derived value or a relation rather than a question — a calculated number hidden from the admin, GL accounts as relations to gl-accounts, and a line-item array that refuses to be empty."
atomPath: "factory/collection/field"
coordinate: "factory/collection/field · 1/base · ca132620"
contentUuid: "1773b7b0-d041-55b2-9e8c-64d0d1f0b810"
diamondUuid: "7bc888ed-f90b-8dc3-8ce4-ef6c1dcab58f"
uuid: "ca132620-7d0d-8e80-9aa0-83634e50a3ce"
horo: 1
typography:
  partition: factory
  bondDegree: 358
standards: []
bindings: []
signatures:
  computationUuid: "4b023675-873a-8c3e-bf06-38857fb37b46"
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
      stageUuid: "59b2b90a-82e3-8839-8285-d5609114e12c"
    - stage: seal
      stageUuid: "5aecf2a6-ca43-8ccf-9f39-8fb005555088"
    - stage: uuid
      stageUuid: "97e444db-d0e5-8282-88fa-fe13ad463566"
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
