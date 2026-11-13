---
name: preset
description: "Use when a merged collection still needs the separate lists its parts had — a query preset is a seed row (title, filter, columns) over one collection, built by preset() and loaded idempotently by loadPresets(), so a list is data rather than a table."
atomPath: preset
coordinate: "preset · 5/round · 4357dcdc"
contentUuid: "52da96cd-45eb-50eb-9444-ec8398a79552"
diamondUuid: "7becb4d8-dd39-8f50-81ea-41a280aad49d"
uuid: "4357dcdc-161d-8ce4-91c1-496dad59f4d8"
horo: 5
typography:
  partition: preset
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "52f604bf-db6f-801a-9bea-b9c1c86be89e"
  stages:
    - stage: path
      stageUuid: "f487053a-55b0-8a77-a43f-d118cd26a5fa"
    - stage: trinity
      stageUuid: "35fb0812-1484-8493-b78b-b95546ae4db4"
    - stage: boundary
      stageUuid: "c17ceb3f-dc96-8fc7-a77e-54d84992b2fc"
    - stage: links
      stageUuid: "6f283aa1-bb63-8d79-9c56-2304e38aef69"
    - stage: horo
      stageUuid: "e2256368-1d6c-8619-a857-159761d13f8b"
    - stage: seal
      stageUuid: "fd8a9154-2814-83f9-a5f0-866317c3005f"
    - stage: uuid
      stageUuid: "d30d0141-224f-8161-921d-2286a85cfa36"
version: 2
---
# preset — a list is a row, not a table

Merging two collections is right when they are one thing seen two ways, and it costs the operator
exactly one thing: the two lists. A query preset returns them. It is a row in Payload's own
presets collection — a title, a filter, the columns to show — bound to a single collection.

`preset()` builds that row; `loadPresets()` writes the ones that are not there yet. A preset is
identified by its title and its collection, so loading again creates nothing, and a preset an
operator has since adjusted is left as they have it.

This is the one address for both, because every merge needs the same two functions and a private
copy in each merged atom is the duplication [[rules]]/copy measures.

**Honest boundary.** A preset is the admin's list view: a filter, columns, a sort. It does not
total anything, and an API caller applies the same filter itself. It does not constrain what a
relationship may point at either — a preset named Vendors does not stop a field from referencing a
party that is only a customer.

**Law — [[law]]: a point of view is a saved filter. A table is for a different shape; a list of the
same shape, seen differently, is a row.**

Composes: [[parties]] · [[rules]]/copy · [[seed]] · [[law]].
