---
name: document
description: "Use when refactoring the corpus — a refactoring is written as a document (why, and the cuts in one JSON block), stored as a nested page under refactors, and applied by erpax itself through the scalpel: exactly-once-or-refuse, all-or-nothing, a red ring restores the batch. Run: pnpm erpax refactor plan <file.md | slug>"
atomPath: "scalpel/document"
coordinate: "scalpel/document · 7/descent · 41addc19"
contentUuid: "238af044-c415-50c1-9628-842d90f5a46a"
diamondUuid: "ad9d3efe-ccd9-8355-bcca-539e7a082186"
uuid: "41addc19-3ca4-8926-be56-3d22f5bd204f"
horo: 7
typography:
  partition: scalpel
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "c08de01c-4f36-8d8e-96d5-b6e688bc6cca"
  stages:
    - stage: path
      stageUuid: "91c33a39-18f7-8851-88d0-1951b49819b9"
    - stage: trinity
      stageUuid: "e24a1c01-3d21-8b55-937a-5afe86f9e2ec"
    - stage: boundary
      stageUuid: "07dc9bc4-98fc-8d1a-b73f-f723449f225d"
    - stage: links
      stageUuid: "3e5852ac-3381-8895-9b0e-1b643d723247"
    - stage: horo
      stageUuid: "cf016a2d-f702-8706-99e9-d221bf55af87"
    - stage: seal
      stageUuid: "fc914bed-caf7-806b-9c0c-8480ce0d5a0f"
    - stage: uuid
      stageUuid: "db200748-21f6-89e5-9f1e-38224c024896"
version: 2
---
# scalpel/document — a refactoring is a document, and erpax applies it

The [[scalpel]] makes a mass edit safe and had no door, so refactorings were done with throwaway
scripts beside it — including the ones that built this atom's neighbours. The door is a document.

````markdown
# Rename the export

Why it is done, in a sentence a reviewer can check.

```json
[{ "file": "src/a.ts", "find": "exact text", "replace": "new text", "reason": "why this cut" }]
```
````

- `refactoringMarkdown` writes that document; `manifestOf` reads the cuts back out of it, and
  refuses a document with no block, a block that does not parse, or a cut missing a part.
- `refactor(markdown, { apply, verify })` plans it, or applies it. Applying is refused while ANY
  cut is refused, so a refactoring is never half-applied; a ring that goes red restores every
  touched file to the byte.
- `refactoringRows` turns refactorings into nested pages under `refactors`, so they load like any
  other seed and are reviewed and kept through the site.
- `fetchRefactoring` reads one back from Payload by slug, through the search collection.

## Running it

```
pnpm erpax refactor plan  <file.md | slug> [--url <origin>]
pnpm erpax refactor apply <file.md | slug> [--url <origin>] [--verify "<command>"]
```

The ring defaults to the type-check. A slug is fetched from `--url` (or `ERPAX_URL`); a path that
exists is read from disk.

## First use

The command registered itself: the two cuts that added `refactor` to the CLI registry and to the
help table were written as a refactoring document and applied by this atom, and a second document
split the command into `plan` and `apply` after the first form took a file path for an action name.

**Honest boundary.** A cut is text, so a refactoring document can express an edit and not a move or
a deletion of a file; those still go through git. A document is not idempotent by itself: if its
`find` text is still present after it ran, planning it again reports cuts — write the `find` so the
cut consumes it. The ring proves what its command proves; the default proves the tree type-checks,
never that behaviour is unchanged. And nothing forces a refactoring through this door yet:
[[rules]]/manifest measures sweeps, and this is the door that measurement asks for.

**Law — [[law]]: a refactoring is a document that says why and names every cut, and the tool that
applies it refuses the whole when any part does not fit.**

Composes: [[scalpel]] · [[seed]]/content · [[rules]]/manifest · [[law]].
