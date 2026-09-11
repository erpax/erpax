---
name: transcript
description: "Use when spoken content must be read rather than watched — captions parsed into locatable segments. Handles WebVTT and SubRip alike, decides the format from the bytes rather than a filename, strips inline markup as presentation, and SKIPS a malformed cue instead of guessing a timestamp. mentions() returns a term with the moment attached, which is a pointer to go listen, never a finding: a transcript is what was said, not what is true, and auto-generated captions carry transcription error."
atomPath: transcript
coordinate: "transcript · 5/round · 110fbdbd"
contentUuid: "3275aaa8-5b3e-538b-8f09-60f315760bf1"
diamondUuid: "42e24391-50b1-8d3c-8f06-a0609311d224"
uuid: "110fbdbd-a5b0-8640-b808-b634b1b57fd7"
horo: 5
typography:
  partition: transcript
  bondDegree: 18
standards:
  - W3C WebVTT — The Web Video Text Tracks Format
bindings: []
signatures:
  computationUuid: "19384abe-7290-8a67-b432-63099bda3879"
  stages:
    - stage: path
      stageUuid: "dfaa5b1e-5b64-893c-b98d-8e1cabe1fb5d"
    - stage: trinity
      stageUuid: "d6cecce6-d77a-8212-b89d-a1a59798dae1"
    - stage: boundary
      stageUuid: "1becf37a-915e-826d-be5c-7d86ef2ae1c3"
    - stage: links
      stageUuid: "eadc3fc9-2ad0-87e8-a678-ca5d714ea855"
    - stage: horo
      stageUuid: "0067f79d-dfd8-8c4f-9006-3e9b91f25030"
    - stage: seal
      stageUuid: "e463a45a-b6c3-8a96-b5c8-816924a87b10"
    - stage: uuid
      stageUuid: "3ffc04b1-335e-8ea1-a948-2457ba50bcfd"
version: 2
---
# transcript — what was said, located

This atom existed as **prose only** — `SKILL.md`, `README.md`, `LLM.md`, and no `index.ts`, no `test.ts`. A name with no matter, exactly what [[rules]]/word-without-logic counts. It was found by looking for an honest way to read video content and discovering the socket was already cut and empty.

## Why captions, and not the video

An agent cannot watch or hear. What it *can* do is read captions as **bytes** — locally, with no consent wall, no JS rendering, and no model standing between the source and the reader ([[local]]). A `.vtt` on disk is a primary source; a summary of a video is not.

```
pnpm erpax transcript captions.vtt ratchet void
captions.vtt — vtt · 2 segment(s) · 00:00:06 spoken
  00:00:01  void: the sequence folds through the void
  00:14:22  ratchet: and the ratchet ceiling is derived
```

## What it refuses

- **A malformed cue is skipped, never guessed at.** A fabricated timestamp sends a reader to the wrong moment *with confidence* — the failure this corpus keeps paying for ([[instrument]]).
- **The format is decided by the bytes**, not by the filename. Prose with no cues is `unknown`, not defaulted to VTT.
- **Inline markup is presentation, not speech** — `<v Speaker>` and `<i>` are stripped, because they were never said.

VTT and SRT are both parsed, because they differ only by a decimal separator and an index line, and a parser refusing one would send a reader to convert a file by hand — which is where transcription errors enter.

## Honest boundary

A transcript is **what was said** — never that the statement is true, and never the visual content. Auto-generated captions additionally carry transcription error, so a symbol name or a number can be silently wrong. `mentions()` therefore returns a **pointer**: *go listen at 00:14:22*. The corpus is checked against the tree, never against what someone said about it.

And `coveredMs` is spoken duration, not video length — captions do not report how long the video is.

## Getting the captions

The [[api]]/integration seed wires **YouTube Data API v3** for metadata, and marks its own limit: `captions.download` requires OAuth as the video **owner**, so an API key reads playlists and titles and can never read another channel's transcript. The route that works is to export the captions and put them on disk.

Four research lanes beside it need **no credential at all** — Crossref, OpenAlex, arXiv, Wikidata — so a clean checkout has them without any secret ceremony.

**Law — [[law]]: a transcript is what was said, located — never what is true, and never what was shown.**

## Standards

- **W3C WebVTT** — The Web Video Text Tracks Format.
- **ISO-19011:2018 §6.4** — audit evidence: the citation must lead to the evidence, and a timestamp is the citation.

Composes: [[local]] · [[instrument]] · [[api]] · [[handoff]] · [[law]].
