---
name: word
description: "Use when addressing a lexical prose token — one vocabulary diamond content-addressed as uuid(jcs({ kind:'word', value })); saved in the text token index, not as a per-word src/ folder."
atomPath: word
coordinate: "word · 4/weave · 50bf9047"
contentUuid: "d42a327c-d276-5d91-ac92-d37391ffaaec"
diamondUuid: "7487135e-8921-8664-82e6-2cdfa8ca432f"
uuid: "50bf9047-6e36-8754-82c5-9f8a23e0ed4d"
horo: 4
typography:
  partition: word
  bondDegree: 58
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "0da3682e-cc68-83fc-a73e-d0f5a21776fc"
  stages:
    - stage: path
      stageUuid: "d192d2ae-93f9-8e99-8ab1-5fbc545bc75f"
    - stage: trinity
      stageUuid: "0914ad4e-0531-8c1e-860c-5cb2ef397355"
    - stage: boundary
      stageUuid: "0885ae7e-40a2-814c-bc26-20c7024c6099"
    - stage: links
      stageUuid: "1abd2849-53d5-8a07-9588-b792c6ba9edd"
    - stage: horo
      stageUuid: "6c6df817-2676-8a2f-bc0d-1ebb23ed312b"
    - stage: seal
      stageUuid: "d3b24d45-e636-8a3a-8b93-b234175ebaf6"
    - stage: uuid
      stageUuid: "0a36ec74-0050-8ec6-8c99-42a390f9af41"
version: 2
---
# word — lexical token diamond

A **vocabulary [[diamond]]** at the prose layer: one lexical token (`hello`, `world`, …). Content-addressed as `uuid(jcs({ kind: 'word', value }))` — the [[word]] half of text's word ⊕ digit decomposition. Persisted through text/saveTextDiamonds into the computed in-memory index; distinct from schema.org vocabulary [[atom]] folders (those are corpus addresses, not prose tokens).

Entangled with — text · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[collapse]] · count · [[sti]] · [[merge]]

Attested in schema.org — wordCount (corpus facet; prose tokens use the computed index)

**Law — [[law]]: a word token is one lexical [[diamond]] — content-addressed as uuid(jcs({ kind:'word', value })), saved in the text index, never materialized as one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see text · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
