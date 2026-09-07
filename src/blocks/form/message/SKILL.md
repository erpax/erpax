---
name: message
description: "Use when reasoning about message — Every other atom under blocks/form is a control: it has a name, a label, a value, and a place in the tab order."
atomPath: "blocks/form/message"
coordinate: "blocks/form/message · 7/descent · 9a79ceb0"
contentUuid: "1349a698-e6f2-5ac8-9ceb-fd25afb8432c"
diamondUuid: "11415ee7-f30b-8d12-8c55-575ff3810807"
uuid: "9a79ceb0-75cb-8bef-9fc4-22a961d05d3f"
horo: 7
typography:
  partition: blocks
  bondDegree: 85
standards: []
bindings: []
signatures:
  computationUuid: "e82191f3-f364-8995-b2af-1a37087340b6"
  stages:
    - stage: path
      stageUuid: "ac3984b4-0b1f-8815-a39e-dfe640ad14bd"
    - stage: trinity
      stageUuid: "73101871-e6fe-8fea-a8ca-6f2a358f1ba4"
    - stage: boundary
      stageUuid: "69885682-8cf7-85b5-a972-e0ec44a5fddd"
    - stage: links
      stageUuid: "3d1e662d-d9fd-8c75-a68b-8c100515253f"
    - stage: horo
      stageUuid: "246ca259-9426-8b96-9593-175f7efa0321"
    - stage: seal
      stageUuid: "72afc6cc-4415-882e-ac27-26ab5410c3e4"
    - stage: uuid
      stageUuid: "c4edeba3-fd91-8a3a-a373-23e4fb5bcbe5"
version: 2
---
# blocks/form/message — content in a form, and it is not a field

Every other atom under [[blocks]]/form is a control: it has a name, a label, a value, and a place in
the tab order. This one is prose — a rich-text block placed between fields to explain what comes
next.

That difference is the whole design, and getting it wrong is a real accessibility defect: a message
given a label and an id would be announced as an unnamed, unfillable field, and a screen-reader user
would sit on it waiting to type. So it renders **no label, no control and no name** — it takes the
full width, because an explanation narrower than the fields it explains reads as a caption for one of
them.

**Honest boundary.** The proof asserts what this renders and, more usefully, what it does NOT render:
no form control appears. It does not validate the rich-text payload — `rich/text` owns that — and
an empty message renders nothing at all, which is correct and is pinned.

**Law — [[law]]: content inside a form must not look like a field. A control is anything with a name
and a value, so an explanation must have neither — otherwise the form announces a question it will
never accept an answer to.**

## Standards

- **WCAG 2.2 §1.3.1** — info and relationships: content is not a control.

Composes: [[blocks]] · `rich/text` · [[law]].
