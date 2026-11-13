---
name: check
description: "Use when a document must meet a definition before it is saved — the lead definition as a schema, run by Payload in a before-validation hook on pages; the hook records in the request's hook context that the check ran, so later hooks rely on it and none repeats it."
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
