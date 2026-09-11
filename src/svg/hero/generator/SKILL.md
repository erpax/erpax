---
name: generator
description: "Use when reasoning about generator — A hero image per product, synthesised rather than commissioned: a 1600×900 SVG built from primitive paths and , with no font file, no raster asset and no image library."
atomPath: "svg/hero/generator"
coordinate: "svg/hero/generator · 4/weave · a62954f1"
contentUuid: "3641dfc4-5adf-588a-b5af-1a6f38576ed8"
diamondUuid: "75c15c57-5a34-82ca-bae3-3452979e80c7"
uuid: "a62954f1-de28-86d1-9301-460b8ae0fe00"
horo: 4
typography:
  partition: svg
  bondDegree: 40
standards:
  - "ISO/IEC-29500 office-open-xml media-embedding-target"
  - "W3C SVG-1.1 scalable-vector-graphics"
  - "WCAG-2.1 §1.4.3 contrast-minimum minimum-4.5-1"
bindings: []
signatures:
  computationUuid: "87c455f6-4e7b-8f1e-a0d0-4fd5f9afd242"
  stages:
    - stage: path
      stageUuid: "195822af-a1b8-8984-be07-6aaf41d309df"
    - stage: trinity
      stageUuid: "d74d9ce7-1a7e-8649-acd3-2c81340dda8b"
    - stage: boundary
      stageUuid: "1136405d-6915-8cf1-b0ce-10487f83adc5"
    - stage: links
      stageUuid: "7f13cb98-9c0a-8702-ac06-9016a4cc9ddb"
    - stage: horo
      stageUuid: "9b872237-2916-8db6-bc75-65bf8c19f1a0"
    - stage: seal
      stageUuid: "ad261e00-e769-866e-84b2-f8dd1c5c4cca"
    - stage: uuid
      stageUuid: "9aa1f0c5-c7a1-89ca-8219-38d986b6ddea"
version: 2
---
# svg/hero/generator — the same slug always draws the same picture

A hero image per product, synthesised rather than commissioned: a 1600×900 SVG built from primitive
paths and `<text>`, with no font file, no raster asset and no image library. It exists so seeding a
catalogue does not wait on a designer.

**Determinism is the property that matters.** The gradient, the glyphs and the placement are all
derived from a hash of the slug, so the same product draws the identical image on every machine and
every run. That is what makes the output content-addressable and cacheable, and it is why the
arithmetic goes through [[algebra]]'s exact operations rather than host floats — a float that rounds
differently on another CPU would produce a different picture for the same input and quietly break the
address.

Vector output has a second consequence worth stating: it scales to any viewport without a raster set,
so there is nothing to regenerate at other resolutions.

**Honest boundary.** This proves the drawing is a pure, deterministic function of its input. It makes
no claim that the result is *attractive*, and none about the contrast of the generated text over the
generated gradient — that pairing is chosen by hash, so a §1.4.3 claim would need a per-slug check
this atom does not perform.

**Law — [[law]]: generated art is a pure function of its key. A picture that varies between runs
cannot be addressed by its content, and an asset nobody can address must be stored instead of
derived.**

## Standards

- **W3C SVG 1.1** — scalable vector graphics.

Composes: `svg` · [[algebra]] · [[law]].
