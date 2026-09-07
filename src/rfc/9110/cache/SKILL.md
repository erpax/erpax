---
name: cache
description: "Use when reasoning about cache — Generic Payload CMS caching utilities — wraps `next/cache` `unstable_cache` with tag-keyed invalidation for collection / global fetches."
atomPath: "rfc/9110/cache"
coordinate: "rfc/9110/cache · 8/crest · 568867b0"
contentUuid: "d499da0b-31b5-508e-94c5-45c67206088e"
diamondUuid: "91199226-2b49-8938-96f6-9eeedbd00f16"
uuid: "568867b0-c91a-8d70-a837-aed7b747002e"
horo: 8
typography:
  partition: rfc
  bondDegree: 49
standards:
  - "7234 http-1.1-caching obsolete-but-cited"
  - "9110 §13 caching"
  - "9111 http-caching"
  - "BCP-47 language-tag locale-keyed-cache"
  - "W3C HTTP-Cache stale-while-revalidate"
bindings: []
signatures:
  computationUuid: "73506cc6-ebaf-8706-9844-1ce284ff9d64"
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
      stageUuid: "d072fd36-2cbb-89ba-84fa-199364d7ae3e"
    - stage: seal
      stageUuid: "3db7c7bc-71c3-8f7d-a969-c60416f0d855"
    - stage: uuid
      stageUuid: "5e32a6ce-237c-8f49-a02a-d750a515eb98"
version: 2
---
# rfc/9110/cache

Generic Payload CMS caching utilities — wraps `next/cache` `unstable_cache` with tag-keyed invalidation for collection / global fetches.

Extracted from `rfc/9110/cache.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rfc/9110]].
