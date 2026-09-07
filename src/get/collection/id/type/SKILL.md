---
name: type
description: "Use when reasoning about type — A Payload id is a number in Postgres and a string in Mongo, and a collection may override the database-wide default with ."
atomPath: "get/collection/id/type"
coordinate: "get/collection/id/type · 4/weave · 041967d9"
contentUuid: "04d1dc82-0113-5332-afd2-7966bc0dc8ea"
diamondUuid: "d411980c-2ca1-8bdf-b043-015904334e97"
uuid: "041967d9-6a25-8d06-8330-52a2f247d534"
horo: 4
typography:
  partition: get
  bondDegree: 279
standards: []
bindings: []
signatures:
  computationUuid: "8fb5d2e2-a043-8417-a322-6def3d71b32f"
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
      stageUuid: "bd374e0b-370a-88c9-8399-c8a71372d5f7"
    - stage: seal
      stageUuid: "8fffe971-2757-8365-962c-3a0dd8a08095"
    - stage: uuid
      stageUuid: "e32e117b-19c7-8c12-98e0-2160baf23e96"
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
