---
name: generator
description: "Use when reasoning about generator — A hero image per product, synthesised rather than commissioned: a 1600×900 SVG built from primitive paths and , with no font file, no raster asset and no image library."
atomPath: "svg/hero/generator"
coordinate: "svg/hero/generator · 7/descent · ab88a056"
contentUuid: "f1a07774-6656-55dc-8f66-9aa05dba06a8"
diamondUuid: "7b03cb31-bb16-83f3-9992-48fe3c16019e"
uuid: "ab88a056-fd40-814a-b9aa-d5249c01886e"
horo: 7
typography:
  partition: svg
  bondDegree: 40
standards:
  - "ISO/IEC-29500 office-open-xml media-embedding-target"
  - "W3C SVG-1.1 scalable-vector-graphics"
  - "WCAG-2.1 §1.4.3 contrast-minimum minimum-4.5-1"
bindings: []
signatures:
  computationUuid: "b7290d18-0844-8320-9bfd-e52d6880b541"
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
      stageUuid: "df653853-6796-82ca-8412-e42de6c04d06"
    - stage: seal
      stageUuid: "ad261e00-e769-866e-84b2-f8dd1c5c4cca"
    - stage: uuid
      stageUuid: "48cbc695-d9f5-818f-bcfc-7afeda76de7c"
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
