---
name: cache
description: "Use when reasoning about cache — Generic Payload CMS caching utilities — wraps `next/cache` `unstable_cache` with tag-keyed invalidation for collection / global fetches."
atomPath: "rfc/9110/cache"
coordinate: "rfc/9110/cache · 7/descent · 2b0857c6"
contentUuid: "4dd3872c-b5c3-5565-a778-fb139661fb39"
diamondUuid: "81532fab-031f-880f-84d3-96a8c9294f7c"
uuid: "2b0857c6-5369-8f60-8abd-6c445d4a919a"
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
  computationUuid: "5bfbb369-437a-80d4-8a5b-5ae0d466a453"
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
      stageUuid: "6c34693a-8d2f-80e7-9792-03fbb865209f"
    - stage: seal
      stageUuid: "3db7c7bc-71c3-8f7d-a969-c60416f0d855"
    - stage: uuid
      stageUuid: "07d6b6c6-1d47-8dd3-ab9f-d7b1b4e12df4"
version: 2
---
# rfc/9110/cache

Generic Payload CMS caching utilities — wraps `next/cache` `unstable_cache` with tag-keyed invalidation for collection / global fetches.

Extracted from `rfc/9110/cache.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rfc/9110]].
