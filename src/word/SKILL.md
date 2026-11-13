---
name: word
description: "Use when addressing a lexical prose token — one vocabulary diamond content-addressed as uuid(jcs({ kind:'word', value })); saved in the text token index, not as a per-word src/ folder."
atomPath: word
coordinate: "word · 5/round · d6a8d205"
contentUuid: "357f5553-8426-51c4-91a1-89901087700c"
diamondUuid: "cd49a900-aa9b-8c87-aba7-f276c6e58cda"
uuid: "d6a8d205-53e9-8735-9696-a45c062a311b"
horo: 5
typography:
  partition: word
  bondDegree: 102
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "cdda7b2a-850d-8b64-bba9-1bd3abd73fd7"
  stages:
    - stage: path
      stageUuid: "d192d2ae-93f9-8e99-8ab1-5fbc545bc75f"
    - stage: trinity
      stageUuid: "0914ad4e-0531-8c1e-860c-5cb2ef397355"
    - stage: boundary
      stageUuid: "0885ae7e-40a2-814c-bc26-20c7024c6099"
    - stage: links
      stageUuid: "ce4ddb3a-4a9c-8d44-9610-b48a786d093a"
    - stage: horo
      stageUuid: "6e674a77-a5dc-875d-8969-fde89439bb72"
    - stage: seal
      stageUuid: "d3b24d45-e636-8a3a-8b93-b234175ebaf6"
    - stage: uuid
      stageUuid: "2e0a661e-b3cc-8a17-9c04-525872107094"
version: 2
---
# word — lexical token diamond

A **vocabulary [[diamond]]** at the prose layer: one lexical token (`hello`, `world`, …). Content-addressed as `uuid(jcs({ kind: 'word', value }))` — the [[word]] half of text's word ⊕ digit decomposition. Persisted through text/saveTextDiamonds into the computed in-memory index; distinct from schema.org vocabulary [[atom]] folders (those are corpus addresses, not prose tokens).

Entangled with — text · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[collapse]] · [[count]] · [[sti]] · [[merge]]

Attested in schema.org — wordCount (corpus facet; prose tokens use the computed index)

**Law — [[law]]: a word token is one lexical [[diamond]] — content-addressed as uuid(jcs({ kind:'word', value })), saved in the text index, never materialized as one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see text · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
