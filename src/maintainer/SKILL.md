---
name: maintainer
description: "Use when reasoning about maintainer — A maintainer of a Dataset, software package (SoftwareApplication), or other Project. A maintainer is a Person or Organization that manages contributions to, and/or publication of,"
atomPath: maintainer
coordinate: maintainer · 7/descent · f9e8f593
contentUuid: "b71322c8-6f81-53f2-b9f5-dd2111ad577d"
diamondUuid: "05a3b9fe-57ee-8046-9115-c016b0d4d28b"
uuid: "f9e8f593-eead-8b6b-98c0-353954f908af"
horo: 7
bonds:
  in:
    - law
    - thing
  out:
    - law
    - thing
typography:
  partition: maintainer
  bondDegree: 6
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - law
    - thing
  matrix:
    - law
    - thing
  backlinks:
    - law
    - thing
signatures:
  computationUuid: "020f0b6f-e3c5-88ac-a220-92f302185925"
  stages:
    - stage: path
      stageUuid: "68634028-9609-8ca4-948a-9158c8d359ca"
    - stage: trinity
      stageUuid: "cd186b7f-831f-831d-85e4-541fa2d1883c"
    - stage: boundary
      stageUuid: "64a30a4b-bdb0-83c2-bc6b-b120f4f9f6d4"
    - stage: links
      stageUuid: "8ffc1eb4-d47e-87bf-b9ad-f3aabf95ded8"
    - stage: horo
      stageUuid: "d3de623e-6869-8848-ada5-ae136039d580"
    - stage: seal
      stageUuid: "6e37800f-57aa-8bf3-9071-5f844f85cca2"
    - stage: uuid
      stageUuid: "6cf27b28-16db-82a9-a90c-33e45b4e1d63"
version: 2
---
# maintainer

A maintainer of a Dataset, software package (SoftwareApplication), or other Project. A maintainer is a Person or Organization that manages contributions to, and/or publication of, some (typically complex) artifact. It is common for distributions of software and data to be based on "upstream" sources. When maintainer is applied to a specific version of something e.g. a particular version or packaging of a Dataset, it is always possible that the upstream source has a different maintainer. The isBasedOn property can be used to indicate such relationships between datasets to make the different maintenance roles clear. Similarly in the case of software, a package may have dedicated maintainers working on integration into software distributions such as Ubuntu, as well as upstream maintainers of the underlying work.

Entangled with — [[thing]]

Attested in schema.org — maintainer

**Law — [[law]]: maintainer is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
