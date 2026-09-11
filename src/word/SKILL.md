---
name: word
description: "Use when addressing a lexical prose token — one vocabulary diamond content-addressed as uuid(jcs({ kind:'word', value })); saved in the text token index, not as a per-word src/ folder."
atomPath: word
coordinate: "word · 2/share · 96ed423a"
contentUuid: "0e6df040-e946-51af-b8f7-6a0498351144"
diamondUuid: "01edab3e-013b-878a-91cb-d81670616423"
uuid: "96ed423a-934f-8823-89ad-96fa259f31fa"
horo: 2
typography:
  partition: word
  bondDegree: 124
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "3545070b-40f8-8b55-83e1-4f322a6a26e8"
  stages:
    - stage: path
      stageUuid: "d192d2ae-93f9-8e99-8ab1-5fbc545bc75f"
    - stage: trinity
      stageUuid: "0914ad4e-0531-8c1e-860c-5cb2ef397355"
    - stage: boundary
      stageUuid: "0885ae7e-40a2-814c-bc26-20c7024c6099"
    - stage: links
      stageUuid: "8b65b08a-c3ad-88f4-929c-7e648c6fd08c"
    - stage: horo
      stageUuid: "c41e0ff5-149a-87fa-b637-f065df2283a8"
    - stage: seal
      stageUuid: "d3b24d45-e636-8a3a-8b93-b234175ebaf6"
    - stage: uuid
      stageUuid: "4dd89dae-0a9e-865d-8e3b-62282170fb00"
version: 2
---
# word — lexical token diamond

A **vocabulary [[diamond]]** at the prose layer: one lexical token (`hello`, `world`, …). Content-addressed as `uuid(jcs({ kind: 'word', value }))` — the [[word]] half of [[text]]'s word ⊕ digit decomposition. Persisted through [[text]]/saveTextDiamonds into the computed in-memory index; distinct from schema.org vocabulary [[atom]] folders (those are corpus addresses, not prose tokens).

Entangled with — [[text]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[collapse]] · [[count]] · [[sti]] · [[merge]]

Attested in schema.org — wordCount (corpus facet; prose tokens use the computed index)

**Law — [[law]]: a word token is one lexical [[diamond]] — content-addressed as uuid(jcs({ kind:'word', value })), saved in the [[text]] index, never materialized as one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see [[text]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
