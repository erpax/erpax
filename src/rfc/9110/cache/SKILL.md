---
name: cache
description: "Use when reasoning about cache — Generic Payload CMS caching utilities — wraps `next/cache` `unstable_cache` with tag-keyed invalidation for collection / global fetches."
atomPath: "rfc/9110/cache"
coordinate: "rfc/9110/cache · 7/descent · 5ba86e7b"
contentUuid: "c873865e-813b-5570-a263-865c151e07a8"
diamondUuid: "2c1c682e-142a-8e5f-86e5-3f725c4262d2"
uuid: "5ba86e7b-0e42-82aa-a3f0-3f0098e3c53a"
horo: 7
typography:
  partition: rfc
  bondDegree: 51
standards:
  - "7234 http-1.1-caching obsolete-but-cited"
  - "9110 §13 caching"
  - "9111 http-caching"
  - "BCP-47 language-tag locale-keyed-cache"
  - "W3C HTTP-Cache stale-while-revalidate"
bindings: []
signatures:
  computationUuid: "7b3493a6-f866-8674-a2f2-4b0ca0e66c13"
  stages:
    - stage: path
      stageUuid: "6a13e2fd-49b2-89c8-aede-a008402ac5a2"
    - stage: trinity
      stageUuid: "79177ae1-d7ae-8d16-872a-a85070ec111b"
    - stage: boundary
      stageUuid: "cef12a8b-c6bb-86ba-8152-274de895f730"
    - stage: links
      stageUuid: "886a7217-b971-86ef-b153-42b55d3c1b62"
    - stage: horo
      stageUuid: "38032cf2-3156-8786-a294-136b9ef24a1e"
    - stage: seal
      stageUuid: "3db7c7bc-71c3-8f7d-a969-c60416f0d855"
    - stage: uuid
      stageUuid: "304dcc54-4b6e-8f05-a4fc-766ca4e103aa"
version: 2
---
# rfc/9110/cache

Generic Payload CMS caching utilities — wraps `next/cache` `unstable_cache` with tag-keyed invalidation for collection / global fetches.

Extracted from `rfc/9110/cache.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rfc/9110]].
