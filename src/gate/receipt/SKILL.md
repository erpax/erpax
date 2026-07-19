---
name: receipt
description: "Use when the push gate must not be an hour-long monolith — green suite verdicts sealed content-addressed by their parsed import closure + schema surface; only changed suites re-run, a failure costs one named batch."
atomPath: gate/receipt
---

# gate/receipt — the push failure fixed at its core

Every push failure this corpus paid had the same shape: a ~1-hour all-or-nothing vitest monolith where one red — or one killed worker — voided the hour. That is a command past every rung, and the ladder says split. The split is the fold's own theorem: **same content ⇒ same verdict.** `suiteClosureHash` addresses a suite's inputs (the suite file + its transitive import closure, edges PARSED via [[rules]]/cycle, + the schema surface); a green run seals a receipt at that address; `planSuites` splits the roster into changed (re-run) and covered (cited, never re-derived).

**Honest boundary.** The closure covers code and schema, never DATA — integration suites share the live D1, so a verdict depending on rows another suite wrote can drift green under a standing hash. The receipts are the LOCAL incremental gate; a clean-environment full run (CI) stays the final arbiter, and forcing the full roster is one flag away whenever doubt outweighs the hour.

**Law — [[law]]: a gate verdict is content-addressed — while a suite's closure stands its green receipt stands, only what changed re-runs, and a failure names one batch instead of voiding the hour.**

Composes: [[rules]]/cycle · [[merge]] · [[timeout]] · [[law]].
