---
name: cross
description: "Use when authorising \"who can do what\" — the agnostic Payload Access factory that attaches capability to roles (not users), merges role reach by lattice max, and decides an operation iff the merged capability reaches the op's required role."
atomPath: cross
coordinate: "cross · 4/weave · b7ed4d4c"
contentUuid: "1e342aad-3c29-5cf5-85f9-8dd822689055"
diamondUuid: "d94fc52b-6a3b-8c4d-84b1-8d322c987707"
uuid: "b7ed4d4c-26fa-8e7e-abcb-50933edb3370"
horo: 4
typography:
  partition: cross
  bondDegree: 62
standards:
  - "ISO 27002 §5.15 access-control + §5.3 segregation-of-duties"
  - "ISO-27002"
  - "ISO/IEC-27002:2022"
  - "NIST INCITS-359 role-based-access-control"
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "ec0b08dc-4388-86f1-81e5-388cb74f4de6"
  stages:
    - stage: path
      stageUuid: "83564b20-9d2e-8449-a9be-5e389526d96f"
    - stage: trinity
      stageUuid: "694e389e-8425-8a5e-856b-34d74e300e86"
    - stage: boundary
      stageUuid: "d51990a6-75e2-8396-8535-0d3a743c34e1"
    - stage: links
      stageUuid: "abbf30ac-176d-8eb0-bb7d-e2d4dd24d301"
    - stage: horo
      stageUuid: "69aee28d-cc69-8ceb-9d44-46bb2b725787"
    - stage: seal
      stageUuid: "7d29c4f8-f242-8a42-b0d8-fadfcb5abd6d"
    - stage: uuid
      stageUuid: "bf5710a4-b092-885b-b0e4-bef417f101bc"
version: 2
---
# cross — the agnostic access factory (the 3·6·9 governing axis)

Capability attaches to ROLES, not users — Christianity's celestial hierarchy made math: 9 choirs in 3 spheres (a trinity of trinities, 3² = 9) on the rodin 3·6·9 axis. Sphere ⇒ capability: sphere 1 governs all (admin), sphere 2 seals (sign), sphere 3 are the messengers into the flow (write; base Angels read). An actor inherits capability through role membership; merging roles merges their reach (the [[uuid]]-share `AccessRole` lattice MAX, `read < write < sign < admin`, audit ⊥). An operation is authorised iff the union of the actor's role capabilities reaches the op's required role — the SAME factory binds every collection/global, collapsing the hand-written `role × collection` matrix to one rule.

Matter-twin: `src/cross/index.ts` (`crossAccess` ⊕ `crossAccessSet` · `decideCross` · `mergeCapabilities` · `ANGELIC_HIERARCHY` · `DEFAULT_ROLE_CAPABILITY` · `resolveRoleCapability`, riding `rolesCompatible`/`AccessRole` from [[uuid]] and `digitalRoot` from [[horo]]). Composes [[access]] (the per-resource content-uuid cross layered on top) · [[roles]] · [[uuid]] · [[horo]] · [[auth]] · [[merge]].

**Law — [[law]]: capability rides ROLES on the `read < write < sign < admin` lattice (audit ⊥); merging roles takes the lattice MAX, and an operation is authorised iff that merged capability reaches the op's required role — one factory for every collection.**

@standard NIST INCITS-359 role-based-access-control
@standard ISO 27002 §5.15 access-control + §5.3 segregation-of-duties
