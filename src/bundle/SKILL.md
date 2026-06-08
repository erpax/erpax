---
name: bundle
description: "Use when packaging multiple items for joint sale — bundle composition, bundle pricing (vs. component sum), discount rules for bundles."
atomPath: bundle
coordinate: bundle · 5/round · d68a7420
contentUuid: "30d5799e-99fc-54cd-b381-f42bc5414245"
diamondUuid: "023e02e2-8d87-88e4-b138-d5dcd83445e5"
uuid: "d68a7420-039e-8899-ab79-0a6db248b76b"
horo: 5
bonds:
  in:
    - choice
    - discount
    - items
    - law
    - materials
    - orders
    - variant
  out:
    - choice
    - discount
    - items
    - law
    - materials
    - orders
    - variant
typography:
  partition: bundle
  bondDegree: 21
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - discount
    - items
    - law
    - materials
    - orders
    - variant
  matrix:
    - choice
    - discount
    - items
    - law
    - materials
    - orders
    - variant
  backlinks:
    - choice
    - discount
    - items
    - law
    - materials
    - orders
    - variant
signatures:
  computationUuid: "b4fadeb5-7c9a-8522-9c57-82483e2ec628"
  stages:
    - stage: path
      stageUuid: "88332beb-6aa2-8ba4-b9ed-7dd138ec1e7f"
    - stage: trinity
      stageUuid: "01a30a84-dc9e-8a1b-b692-168b887d36ea"
    - stage: boundary
      stageUuid: "e434990c-6af3-8d5a-8fb3-96ab66ed444f"
    - stage: links
      stageUuid: "c628a9a3-e7c6-846c-91a6-a24d05014178"
    - stage: horo
      stageUuid: "a3ce34bc-102b-8898-b7e6-236cf9a563d3"
    - stage: seal
      stageUuid: "d6f99f28-fadd-8c78-af73-1cd01c78dde8"
    - stage: uuid
      stageUuid: "9ff929f7-1148-852c-93ac-c9710e696005"
version: 2
---
# bundle

Use when packaging multiple items for joint sale — bundle composition, bundle pricing (vs. component sum), discount rules for bundles.

Composes: [[Items]] · [[items/bills/of/materials]] · [[customers/sales/orders]] · [[discount]] · [[variant]].

## Standards
- CRM-generic

**Law — [[law]]: a bundle packages multiple [[Items]] for joint sale, priced as a bundle (with its own [[discount]] rules) rather than as the sum of its components.**
