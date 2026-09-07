---
name: type
description: "Use when reasoning about type — A Payload id is a number in Postgres and a string in Mongo, and a collection may override the database-wide default with ."
atomPath: "get/collection/id/type"
coordinate: "get/collection/id/type · 7/descent · a154f266"
contentUuid: "8b7fa6b5-76ae-5e7e-a42b-ae5276ab8694"
diamondUuid: "d7592052-f72f-828d-b1d8-eb9dd0059684"
uuid: "a154f266-4353-854b-9230-edd81b80d85b"
horo: 7
typography:
  partition: get
  bondDegree: 279
standards: []
bindings: []
signatures:
  computationUuid: "a53e2007-264e-8f46-96d1-3a486a1106cb"
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
      stageUuid: "8d07db2e-6603-83a2-afbb-e8a0fdf79663"
    - stage: seal
      stageUuid: "8fffe971-2757-8365-962c-3a0dd8a08095"
    - stage: uuid
      stageUuid: "44950295-dc5b-809b-840d-0d9636d42020"
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
