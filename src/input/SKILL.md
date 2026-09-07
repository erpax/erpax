---
name: input
description: "Use when the user types anything the system can parse, analyse, or derive — one name-class hook normalises (IBAN, BIC, email, phone, URL), refuses checksum failures with the law named (ISO 13616, ЕГН, ЕИК), and derives the twins (country from IBAN, birthdate from ЕГН) so nothing parseable is ever re-asked."
atomPath: input
coordinate: "input · 2/share · 9fd44d99"
contentUuid: "68f20eb9-d584-5c65-9ad7-549e5e1af286"
diamondUuid: "fe140131-c561-8226-9cb5-60c6209b97fa"
uuid: "9fd44d99-98b6-8d4c-aa9b-a83e38381cbc"
horo: 2
typography:
  partition: input
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "db9d9ee4-91fc-8dbd-8ddc-63b7a03459e1"
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
      stageUuid: "c48ecf06-69e5-8453-9a8b-7078cc5654c9"
    - stage: seal
      stageUuid: "67e55c1a-a68d-887d-834c-5b23127b8cc0"
    - stage: uuid
      stageUuid: "1456a090-8f56-8159-9822-9177e04dd34b"
version: 2
---
# input — the user is helped, never interrogated

The [[rules]]/ask law's second half: after the derivable is predefined, what the user DOES type is parsed and analysed for them. The census (762 text fields, 57 in nine help classes) met a corpus that had already written every validator and wired none — `helpInput` joins them by declared name-class: IBAN normalises and derives its country or refuses its ISO 13616 mod-97 failure by name; ЕГН gates on its checksum and derives the birthdate twin; ЕИК/БУЛСТАТ, BIC, email, phone, URL each get their shape. `inputHelpHook` is the ONE beforeValidate serving any collection — normalise in place, derive the twins, throw the first refusal with its law.

**Honest boundary.** Help is never interference: an unrecognised field passes untouched, a phone that will not shape stays as typed (normalisation is not policing), and a derived twin never overwrites a value the user set. The name-class map is DECLARED, arguable, and blind to fields whose names hide their nature — those are the retype wave's problem ([[architecture]]/invariant text-fields check).

**Law — [[law]]: what the system can parse it parses, what it can derive it derives, what fails its own checksum is refused at the write with the law named — the user types once and is never asked what the input already said.**

Composes: the iban and bg/identifier atoms · [[iso]]/13616 · [[rules]]/ask · [[law]].
