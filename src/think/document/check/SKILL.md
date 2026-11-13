---
name: check
description: "Use when a document must meet a definition before it is saved — the lead definition as a schema, run by Payload in a before-validation hook on pages; the hook records in the request's hook context that the check ran, so later hooks rely on it and none repeats it."
atomPath: "think/document/check"
coordinate: "think/document/check · 7/descent · 87d3b401"
contentUuid: "3e004f9c-d05f-538d-a4bb-6e81bd208e7f"
diamondUuid: "0739ce74-aa78-8760-90ee-7c55cda27db9"
uuid: "87d3b401-1b57-82d9-9103-49b1925f55ce"
horo: 7
typography:
  partition: think
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "4bb9f222-8a69-8429-b9d0-0e58724656f5"
  stages:
    - stage: path
      stageUuid: "03dbf0c0-4359-8a46-84d9-a79ce7f57961"
    - stage: trinity
      stageUuid: "827f1592-232c-831e-ae1f-cd7e9b4b8cdb"
    - stage: boundary
      stageUuid: "d2b41df9-e947-86fa-8433-810ce0b30228"
    - stage: links
      stageUuid: "57a1eade-f416-8358-a4a4-40d157c14560"
    - stage: horo
      stageUuid: "4562496e-cd75-82ba-862b-efbe75ef2e50"
    - stage: seal
      stageUuid: "1b4e6b60-4702-8973-82be-94eb7e97002d"
    - stage: uuid
      stageUuid: "3c395af3-16d6-8b57-8ea5-2ab10ec54c26"
version: 2
---
# think/document/check — the definition is checked where the document is saved

A check that only the caller runs is a check the next caller forgets. The lead definition is a
schema (`leadSchema`), and Payload runs it: `checkLeadPage` is a before-validation hook on pages.

- A page under `leads` is checked — by its description, which is the lead in full, else by its
  title. A page that is not a lead is not touched.
- A lead that does not fit is refused with the reason: too short to be a sentence, more than one
  line, longer than a description, fewer than three words of work, or carrying hidden characters.
- On success the hook sets `leadChecked` in the request's hook context. Hook context is how
  Payload passes facts between hooks of one request, so every later hook can rely on the check
  and the check itself runs once.

`checkLead` is the same definition for a caller that wants the answer before sending anything;
[[think]]/document's `recordLeads` uses it to report refused prompts instead of sending them.

**Honest boundary.** The definition says what a lead must look like, never whether the work it
names is worth doing. Only pages under `leads` are checked; the same pattern would serve any other
family of documents and has not been written for them. The context flag lasts one request.

**Law — [[law]]: a document's definition is enforced by the system that stores it, once, and the
request carries the proof that it was.**

Composes: [[think]]/document · [[seed]]/content · [[law]].
