---
name: type
description: "Use when reasoning about type — A Payload id is a number in Postgres and a string in Mongo, and a collection may override the database-wide default with ."
atomPath: "get/collection/id/type"
coordinate: "get/collection/id/type · 5/round · 47b37ce9"
contentUuid: "439b7ca7-968c-53c3-9074-fcc9dc580ad3"
diamondUuid: "8fbdd9ad-84b6-8672-9d55-b9d890b6c76d"
uuid: "47b37ce9-f2a2-8eaf-b6b3-e8438322a4ee"
horo: 5
typography:
  partition: get
  bondDegree: 231
standards: []
bindings: []
signatures:
  computationUuid: "a027ddca-7a87-8d89-9e93-c82edd97504c"
  stages:
    - stage: path
      stageUuid: "c221adbc-5775-8d2a-944e-ee4078da9d47"
    - stage: trinity
      stageUuid: "d10c9b6d-fccf-8538-a97e-c9c64ffd14bf"
    - stage: boundary
      stageUuid: "0d70fa39-96af-8b1b-b742-d73a5884d6d3"
    - stage: links
      stageUuid: "ccd8aac8-8b05-84f8-b80f-fc19aa89f605"
    - stage: horo
      stageUuid: "227e72b4-7d30-811a-be20-37d626cf4f69"
    - stage: seal
      stageUuid: "8fffe971-2757-8365-962c-3a0dd8a08095"
    - stage: uuid
      stageUuid: "9eeefa42-7814-8f80-9557-ab942fdbe9ca"
version: 2
---
# get/collection/id/type — ask the running config what shape an id is

A Payload id is a number in Postgres and a string in Mongo, and a collection may override the
database-wide default with `customIDType`. So the shape of `id` is not knowable from the schema
alone — it is a property of **this collection in this deployment**.

That makes it exactly the wrong thing to hardcode. Code that assumes `number` builds a query that
silently matches nothing against a text id: no error, no exception, an empty result set that reads
as "not found". The failure surfaces as missing data, which is the hardest kind to trace back to its
cause.

So this asks the live instance: the collection's own override if it declares one, otherwise the
adapter's default. The fallback order is the claim, and it is the part a reader must be able to
check.

**Honest boundary.** This reports what the config says. It does not coerce a value, and it does not
guarantee the caller uses the answer — a caller that reads the type and then casts anyway is beyond
what any lookup can prevent.

**Law — [[law]]: the shape of an identifier belongs to the running configuration, not to the code
that queries it. Assuming one produces a query that matches nothing and reports it as absence.**

Composes: `get` · [[law]].
