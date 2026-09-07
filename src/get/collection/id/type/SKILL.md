---
name: type
description: "Use when reasoning about type — A Payload id is a number in Postgres and a string in Mongo, and a collection may override the database-wide default with ."
atomPath: "get/collection/id/type"
coordinate: "get/collection/id/type · 8/crest · 294ef65f"
contentUuid: "0f03cdcb-b5b3-5274-8f0d-6c43d0ebb4bf"
diamondUuid: "81017012-13f5-8976-a478-564850a0df20"
uuid: "294ef65f-ae7c-8dde-ad03-655f096be07e"
horo: 8
typography:
  partition: get
  bondDegree: 279
standards: []
bindings: []
signatures:
  computationUuid: "c5816671-7f86-81c4-ba99-c9579982e988"
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
      stageUuid: "99ec2086-148d-8f58-a7ce-901af23441b3"
    - stage: seal
      stageUuid: "8fffe971-2757-8365-962c-3a0dd8a08095"
    - stage: uuid
      stageUuid: "8064ecb2-9889-8e92-9bb6-c771f813ebea"
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
