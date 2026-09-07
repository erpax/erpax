---
name: generator
description: "Use when reasoning about generator — A hero image per product, synthesised rather than commissioned: a 1600×900 SVG built from primitive paths and , with no font file, no raster asset and no image library."
atomPath: "svg/hero/generator"
coordinate: "svg/hero/generator · 5/round · 90d77f7a"
contentUuid: "dd497744-c7ec-5a41-9add-095be820b456"
diamondUuid: "787a05d0-a302-815d-8c60-4be0bcd60ec6"
uuid: "90d77f7a-8895-8378-8f37-45e6edd131d1"
horo: 5
typography:
  partition: svg
  bondDegree: 40
standards:
  - "ISO/IEC-29500 office-open-xml media-embedding-target"
  - "W3C SVG-1.1 scalable-vector-graphics"
  - "WCAG-2.1 §1.4.3 contrast-minimum minimum-4.5-1"
bindings: []
signatures:
  computationUuid: "1e73e51a-8c74-87db-b829-2044843f0557"
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
      stageUuid: "3ab4e3f6-a892-8208-9d68-28a55bd0477f"
    - stage: seal
      stageUuid: "ad261e00-e769-866e-84b2-f8dd1c5c4cca"
    - stage: uuid
      stageUuid: "afb48635-224a-8bab-86e2-904f6f58f66b"
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
