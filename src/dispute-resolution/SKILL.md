---
name: "dispute-resolution"
description: "Use when a contract specifies dispute handling — mechanism (litigation, arbitration, mediation), forum/arbitrator, procedural rules (discovery, evidence, cost allocation), escalation (negotiation→mediation→arbitration)."
atomPath: "dispute-resolution"
coordinate: "dispute-resolution · 5/round · 2d779941"
contentUuid: "a2d94012-47cf-5899-9f19-59b54994c6d6"
diamondUuid: "fe9e5724-7e58-8fe5-b865-c55370ca3918"
uuid: "2d779941-3a49-8ae5-b2b8-e16ae0cdf54a"
horo: 5
bonds:
  in:
    - cases
    - contracts
    - governinglaw
    - jurisdiction
    - law
    - liability
    - matter
    - remediation
  out:
    - cases
    - contracts
    - governinglaw
    - jurisdiction
    - law
    - liability
    - matter
    - remediation
typography:
  partition: "dispute-resolution"
  bondDegree: 24
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - contracts
    - jurisdiction
    - law
    - liability
    - matter
    - remediation
  matrix:
    - cases
    - contracts
    - governinglaw
    - jurisdiction
    - law
    - liability
    - matter
    - remediation
  backlinks:
    - cases
    - contracts
    - governinglaw
    - jurisdiction
    - law
    - liability
    - matter
    - remediation
signatures:
  computationUuid: "468dd329-af67-8f50-b212-b8e05bd53e5a"
  stages:
    - stage: path
      stageUuid: "0e7c798f-e128-86a6-b6f4-85cfa3b4f3f4"
    - stage: trinity
      stageUuid: "696309d0-0a48-8723-aa39-a2ad329a42d0"
    - stage: boundary
      stageUuid: "1d739297-5ecf-80f0-bcd4-c2c38503c1f0"
    - stage: links
      stageUuid: "656dca65-d9af-895f-8bd9-f2005df3a3bd"
    - stage: horo
      stageUuid: "5bcdf8b7-3a56-8279-aab3-cd3c369dbe53"
    - stage: seal
      stageUuid: "2bc95012-c204-84d7-abab-8e24e516be2c"
    - stage: uuid
      stageUuid: "b2b82b97-1c08-8c13-b775-8a457df678b8"
version: 2
---
# dispute-resolution

Use when a contract specifies dispute handling — mechanism (litigation, arbitration, mediation), forum/arbitrator, procedural rules (discovery, evidence, cost allocation), escalation (negotiation→mediation→arbitration).

Composes: [[Contracts]] · [[matter]] · [[jurisdiction]] · [[remediation]] · [[liability]].

**Law — [[law]]: a [[Contracts|contract]]'s dispute-handling clause — its mechanism (litigation/arbitration/mediation), forum, procedural rules, and the negotiation→mediation→arbitration escalation ladder.**

## Standards
- UNCITRAL-Model-Arbitration-Law
- NY-Convention-1958
