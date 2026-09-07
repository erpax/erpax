---
name: input
description: "Use when the user types anything the system can parse, analyse, or derive — one name-class hook normalises (IBAN, BIC, email, phone, URL), refuses checksum failures with the law named (ISO 13616, ЕГН, ЕИК), and derives the twins (country from IBAN, birthdate from ЕГН) so nothing parseable is ever re-asked."
atomPath: input
coordinate: "input · 7/descent · 1f711610"
contentUuid: "ce99a26a-0636-5fc7-b56a-8280a845e204"
diamondUuid: "0a8f1fd0-477b-8692-bc22-033cbb443bb6"
uuid: "1f711610-6113-84bc-a28f-6a19ae782c46"
horo: 7
typography:
  partition: input
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "5f90053d-0949-83c4-a6ea-fddc15f5c94d"
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
      stageUuid: "7cd3c749-9a9f-831e-9dab-e67ac3b6f182"
    - stage: seal
      stageUuid: "67e55c1a-a68d-887d-834c-5b23127b8cc0"
    - stage: uuid
      stageUuid: "0a611fa1-e9e7-8e47-8d1c-558d47e19cf0"
version: 2
---
# input — the user is helped, never interrogated

The [[rules]]/ask law's second half: after the derivable is predefined, what the user DOES type is parsed and analysed for them. The census (762 text fields, 57 in nine help classes) met a corpus that had already written every validator and wired none — `helpInput` joins them by declared name-class: IBAN normalises and derives its country or refuses its ISO 13616 mod-97 failure by name; ЕГН gates on its checksum and derives the birthdate twin; ЕИК/БУЛСТАТ, BIC, email, phone, URL each get their shape. `inputHelpHook` is the ONE beforeValidate serving any collection — normalise in place, derive the twins, throw the first refusal with its law.

**Honest boundary.** Help is never interference: an unrecognised field passes untouched, a phone that will not shape stays as typed (normalisation is not policing), and a derived twin never overwrites a value the user set. The name-class map is DECLARED, arguable, and blind to fields whose names hide their nature — those are the retype wave's problem ([[architecture]]/invariant text-fields check).

**Law — [[law]]: what the system can parse it parses, what it can derive it derives, what fails its own checksum is refused at the write with the law named — the user types once and is never asked what the input already said.**

Composes: the iban and bg/identifier atoms · [[iso]]/13616 · [[rules]]/ask · [[law]].
