---
name: input
description: "Use when the user types anything the system can parse, analyse, or derive — one name-class hook normalises (IBAN, BIC, email, phone, URL), refuses checksum failures with the law named (ISO 13616, ЕГН, ЕИК), and derives the twins (country from IBAN, birthdate from ЕГН) so nothing parseable is ever re-asked."
atomPath: input
coordinate: "input · 7/descent · 53dabdf7"
contentUuid: "7bcbdf37-085e-5773-b2d0-cd2438472f06"
diamondUuid: "683c5663-760e-80bf-a513-057f25561c08"
uuid: "53dabdf7-008d-88dd-9bb8-c1fc11f5e61f"
horo: 7
typography:
  partition: input
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "9f7ffe93-3e21-8a0c-8a22-7873cd275328"
  stages:
    - stage: path
      stageUuid: "2eb3f114-f35c-8e11-9713-7cf4e2a27c73"
    - stage: trinity
      stageUuid: "83b9fc0a-33c8-8470-983d-6a631233ab68"
    - stage: boundary
      stageUuid: "973ea12d-3bf9-88d8-8b00-2a6b55e37a8c"
    - stage: links
      stageUuid: "4c696760-a6a8-8271-9986-734b5c882f38"
    - stage: horo
      stageUuid: "20fab409-dcdf-84a6-8e74-ebeeeadc5c84"
    - stage: seal
      stageUuid: "67e55c1a-a68d-887d-834c-5b23127b8cc0"
    - stage: uuid
      stageUuid: "dc21a0ba-c7fc-86bc-8810-972931f82031"
version: 2
---
# input — the user is helped, never interrogated

The [[rules]]/ask law's second half: after the derivable is predefined, what the user DOES type is parsed and analysed for them. The census (762 text fields, 57 in nine help classes) met a corpus that had already written every validator and wired none — `helpInput` joins them by declared name-class: IBAN normalises and derives its country or refuses its ISO 13616 mod-97 failure by name; ЕГН gates on its checksum and derives the birthdate twin; ЕИК/БУЛСТАТ, BIC, email, phone, URL each get their shape. `inputHelpHook` is the ONE beforeValidate serving any collection — normalise in place, derive the twins, throw the first refusal with its law.

**Honest boundary.** Help is never interference: an unrecognised field passes untouched, a phone that will not shape stays as typed (normalisation is not policing), and a derived twin never overwrites a value the user set. The name-class map is DECLARED, arguable, and blind to fields whose names hide their nature — those are the retype wave's problem ([[architecture]]/invariant text-fields check).

**Law — [[law]]: what the system can parse it parses, what it can derive it derives, what fails its own checksum is refused at the write with the law named — the user types once and is never asked what the input already said.**

Composes: the iban and bg/identifier atoms · [[iso]]/13616 · [[rules]]/ask · [[law]].
