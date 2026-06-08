---
name: scorecards
description: "Use when scoring or reviewing vendor performance — OTD%, quality acceptance rate, price accuracy, response time, cybersecurity/ESG scores — driving ISO 9001 §8.4 renewal, probation, or de-listing recommendations. The periodic vendor performance evaluation and re-approval node."
atomPath: vendors/vendor/scorecards
coordinate: vendors/vendor/scorecards · 1/base · 1b49ec1e
contentUuid: "e1342c3c-dfec-55ff-99e8-c01e6f6dd819"
diamondUuid: "b33a29f1-f7b8-83f5-9c43-a10b82de8696"
uuid: "1b49ec1e-1ae2-8c15-b820-3173b63ac926"
horo: 1
bonds:
  in:
    - access
    - accounting
    - hooks
    - identity
    - law
    - scorecard
    - standard
    - vendor
    - vendors
  out:
    - access
    - accounting
    - hooks
    - identity
    - law
    - scorecard
    - standard
    - vendors
typography:
  partition: vendors
  bondDegree: 24
  neighbors: []
standards:
  - "ISO 9001:2015 §8.4 control-of-externally-provided-processes"
  - "ISO 9001:2015 §8.4.1 evaluation-and-re-evaluation"
  - "ISO-19011:2018 audit-trail vendor-evaluation"
  - "ISO-8601-1:2019 date-time"
  - "ISO-9001"
  - "SOX §404 internal-controls vendor-management"
  - "W3C-PROV-O"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - hooks
    - identity
    - law
    - standard
  matrix:
    - access
    - accounting
    - hooks
    - identity
    - law
    - scorecard
    - standard
    - vendors
  backlinks:
    - access
    - accounting
    - hooks
    - identity
    - law
    - scorecard
    - standard
    - vendors
signatures:
  computationUuid: "6ca04cc5-0879-88b3-99cb-dc0a66934b3d"
  stages:
    - stage: path
      stageUuid: "63ceafff-7978-8d09-9a1e-dd026358cb01"
    - stage: trinity
      stageUuid: "59f481c5-626c-80c2-8477-5cd663e45457"
    - stage: boundary
      stageUuid: "7e27d6a5-64ca-87fa-b2e4-6a13ba90a7dc"
    - stage: links
      stageUuid: "775fed0b-13e7-8f9b-b7fc-e9ea058912b3"
    - stage: horo
      stageUuid: "799f6bf4-ac47-8dee-b0db-1932adbbd88c"
    - stage: seal
      stageUuid: "6f5607e1-780e-88fa-bd2a-61f8db04332e"
    - stage: uuid
      stageUuid: "17db5c2b-5f99-884b-93dd-aef3b5b9e370"
version: 2
---
# vendor-scorecards

Vendor Scorecards — periodic OTD / quality / response-time metrics.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO 9001:2015 §8.4 control-of-externally-provided-processes
- ISO 9001:2015 §8.4.1 evaluation-and-re-evaluation
- ISO-8601-1:2019 date-time
- ISO-19011:2018 audit-trail vendor-evaluation
- SOX §404 internal-controls vendor-management
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27001 A.5.19 information-security-supplier-relationships

Composes: [[identity]] · [[accounting]] · [[access]] · [[hooks]] · [[standard]].

**Law — [[law]]: a scorecard is the periodic, evidence-backed re-evaluation of one vendor (OTD / quality / response / ESG metrics) that drives the ISO 9001 §8.4 renewal, probation or de-listing decision — the supplier re-approval node.**
