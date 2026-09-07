---
name: message
description: "Use when reasoning about message — Every other atom under blocks/form is a control: it has a name, a label, a value, and a place in the tab order."
atomPath: "blocks/form/message"
coordinate: "blocks/form/message · 4/weave · d023f9e1"
contentUuid: "ed17ac44-8b41-5ce1-9924-f9ca07cd4509"
diamondUuid: "dec36d89-fb99-8782-8bba-e64a0a9a2267"
uuid: "d023f9e1-837d-8573-8b69-ca0e0d30ed5d"
horo: 4
typography:
  partition: blocks
  bondDegree: 85
standards: []
bindings: []
signatures:
  computationUuid: "dbc5eb02-0bce-8e6a-8b0b-e8e539749fa3"
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
      stageUuid: "1d7b2eeb-3faa-8589-89c2-d8b4abbc2aaf"
    - stage: seal
      stageUuid: "72afc6cc-4415-882e-ac27-26ab5410c3e4"
    - stage: uuid
      stageUuid: "37a8b9ae-d4c8-89ae-9e43-c434e93a636f"
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
