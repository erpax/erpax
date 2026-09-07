---
name: message
description: "Use when reasoning about message — Every other atom under blocks/form is a control: it has a name, a label, a value, and a place in the tab order."
atomPath: "blocks/form/message"
coordinate: "blocks/form/message · 7/descent · 2e757277"
contentUuid: "af445c84-63a3-5083-98ed-c3ae431e23a9"
diamondUuid: "8062da1b-f3bc-8564-94df-04f5d002708b"
uuid: "2e757277-5c4a-8675-9d76-70946edd1e2f"
horo: 7
typography:
  partition: blocks
  bondDegree: 85
standards: []
bindings: []
signatures:
  computationUuid: "a9ce9ed3-e3fc-8ea0-acd3-d842bf16053a"
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
      stageUuid: "8bd002b5-39b5-8583-bf62-9962cf65b2b2"
    - stage: seal
      stageUuid: "72afc6cc-4415-882e-ac27-26ab5410c3e4"
    - stage: uuid
      stageUuid: "f0ec1ee9-30c1-8688-a97f-4c05bb321857"
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
