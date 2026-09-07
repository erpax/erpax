---
name: media
description: "Use when turning Playwright test artifacts into Media records — screenshots and videos are uploaded to the Media collection and each video gets a WebVTT subtitle track built from its test step titles, so marketing pages can embed live, captioned evidence of documented capabilities."
atomPath: "capture/media"
coordinate: "capture/media · 1/base · 98dc1655"
contentUuid: "0685b37e-75f2-51a4-8614-eda18cc7c49e"
diamondUuid: "6b1202d2-3457-8c6f-b8c0-5ed5ee5d0265"
uuid: "98dc1655-be0d-8c1a-b339-194828f48e1f"
horo: 1
typography:
  partition: capture
  bondDegree: 94
standards:
  - "ISO 19011:2018 audit-trail test-evidence"
  - "ISO 19011:2018 audit-trail test-evidence`"
  - "ISO/IEC 14496-30 timed-text-formats"
  - "ISO/IEC 14496-30 timed-text-formats`"
  - W3C WebVTT
  - "W3C WebVTT video-text-track-format"
  - "W3C WebVTT video-text-track-format`"
  - "W3C WebVTT`"
  - "WCAG-2.1 §1.2.2 captions-prerecorded"
  - "WCAG-2.1 §1.2.5 audio-description-prerecorded"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "9ba4c4f4-8af8-8bc3-9e69-362199c3fd7e"
  stages:
    - stage: path
      stageUuid: "265f8640-7dbd-8b19-836b-fdeee6b00254"
    - stage: trinity
      stageUuid: "8faaf704-5ff2-884f-9a87-787a717d8576"
    - stage: boundary
      stageUuid: "05fee23d-ade4-83dd-a542-eddc24b4e6f0"
    - stage: links
      stageUuid: "f09f9534-5e38-81b6-823c-769935bf9c7e"
    - stage: horo
      stageUuid: "8ef4f3b9-44b4-8b4a-84c4-cc33a19ed7f7"
    - stage: seal
      stageUuid: "092177d6-3cf9-83a8-ac08-d5489e56d441"
    - stage: uuid
      stageUuid: "78420564-9af9-8196-ad4f-817a1778d817"
version: 2
---
# capture/media — test artifacts into [[media]]

The test-artifact uploader. It walks a Playwright `test-results` directory, reads its `manifest.json`, and for each test uploads the recorded video, its screenshots, and a generated WebVTT subtitle track into the [[media]] collection — returning the resulting Media ids grouped by test. `buildWebVtt` turns a sequence of `{title, ts}` steps into a valid `WEBVTT` body with monotonic `HH:MM:SS.mmm` cues, each cue running to the next step's offset and the final cue closing at `durationMs` (or a `start + 3s` floor). The uploaded artifacts become provenance-bearing [[audit]] evidence (ISO 19011:2018) that the captioned marketing pages can embed.

Matter-twin: `src/capture/media/index.ts` (`uploadTestArtifacts` · `buildWebVtt`).

**Law — [[law]]: every recorded test artifact becomes a [[media]] record, and every video carries a WebVTT track built from its step titles — captured evidence is always captioned and provenance-bearing.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C WebVTT video-text-track-format`
- `@standard ISO/IEC 14496-30 timed-text-formats`
- `@standard ISO 19011:2018 audit-trail test-evidence`
- `@standard W3C WebVTT`
