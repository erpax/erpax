---
name: trading
description: "Use when wiring an OUTBOUND call to a commercial counterparty — a payment gateway, marketplace, shipping carrier, Peppol/EDI access point, banking aggregator, or FX feed. Every such call runs at maximum tamper-cost — gated by the sandbox (capability + credential-broker + endpoint allowlist) and emitting a uuid-chained receipt — so the integration surface is zero-entropy and tamper-evident; credentials live per-tenant by handle, never in code."
atomPath: trading
coordinate: "trading · 1/base · c5a77718"
contentUuid: "224fc107-0ed4-50b7-9dac-85bd6bc14d92"
diamondUuid: "acd75d5e-5e00-88e6-8f7e-bf730a2a96fb"
uuid: "c5a77718-e258-89cd-9876-cc43200c50a4"
horo: 1
typography:
  partition: trading
  bondDegree: 57
standards:
  - "EN-16931 Peppol-BIS-3 e-invoicing access-points (AS4 send/receive)"
  - "ISO-3166-1:2020 region-scope (the alpha-2 dispatch key, shared with the [[country]] twin)"
  - "ISO-4217:2015 currency-codes (FX / market-data feeds)"
  - "PSD2 EU-2015/2366 open-banking-aggregators (Berlin Group NextGenPSD2 consent)"
  - "RFC-9110 http-semantics (the REST/fetch client surface)"
bindings: []
signatures:
  computationUuid: "43a7d047-4217-8f25-80e1-e6ce5def1848"
  stages:
    - stage: path
      stageUuid: "864e1a0a-eecc-8ce3-9db4-0a40af74a45b"
    - stage: trinity
      stageUuid: "5aea00ec-4a45-89aa-b45d-e4fd4bb5a36c"
    - stage: boundary
      stageUuid: "0c173ebe-e951-82d7-9a1f-b3e75ffe2584"
    - stage: links
      stageUuid: "585dc7a3-a275-8c45-b95e-b70ffc3b9883"
    - stage: horo
      stageUuid: "57b245e9-ac80-8a72-b648-a5de4abb29a9"
    - stage: seal
      stageUuid: "1a8f83f8-bad3-8f9c-a2d5-df4a362407a5"
    - stage: uuid
      stageUuid: "c4a6a781-a9b0-80a2-9470-7682768fecf4"
version: 2
---
# trading — the commercial counterparty layer (every outbound call at max tamper-cost)

FORM: **the runtime CLIENTS for the commercial trading-API catalogue — and every outbound call is wired at maximum tamper-cost.** Where [[country]] holds the clients for the OFFICIAL authorities (tax, registry, central-bank), trading holds the clients for the COUNTERPARTIES and intermediaries a tenant transacts through — the catalogue in `src/trading/api/index.ts` (payment gateways, marketplaces, shipping carriers, Peppol/EDI access points, banking aggregators, FX feeds). It is the commercial twin of [[country]] on the [[connections]] commercial edge (customer/supplier/carrier), the execution surface beneath [[commerce]]'s document chain and [[payment]], and the live caller of the [[carriers]] master.

Its defining property is the trust wiring, not the provider count. Every call is wrapped so that it is **gated** by the [[sandbox]] — `permits` decides allow/block against a content-addressed grant `{capabilities, allowedHosts, credentialHandles}`, the credential-broker injects the secret at the host boundary ONLY by handle (the tool never holds the value — [[access]]), and the endpoint allowlist (seeded from the registry) bounds which hosts it may reach — and **receipted** by the [[receipt]] in the same step: `evaluate` emits a uuid-chained leaf, so no call exists without a uuid that proves it was permitted, and a second leaf records the outcome. Gate ⊕ receipt makes the integration surface zero-entropy and tamper-evident: forging or rewriting a call costs beyond the observable universe ([[cost]] · [[proof]]), a floor an external [[anchor]] only raises, and the same trust law defends against the integrity attacks measured in [[tamper]]. Independent peers may converge on the same shape ([[merge]]); trading imports nothing external for the trust — it rides the same primitives as the rest of the corpus.

The catalogue holds only PUBLIC metadata (provider, region, endpoint, auth *model*, wire format) — secrets live per-tenant by handle (`resolveTradingApiCredential`, `src/tenant/remote/secret/`), never in code. The client layer realizes this PATTERN, not the whole catalogue: a first wave ships (Frankfurter / ExchangeRate FX, Open Food Facts, Econt / Speedy tracking); most catalogued providers stay client-less by design, added one auth-pattern at a time as tenants need them.

Matter-twin: `src/trading/api/client/index.ts` (`ApiResult<T>` ⊕ `guardedTradingFetch` — the [[sandbox]]+[[receipt]] trust wrapper around `fetch`) over `src/trading/api/index.ts` + `src/tenant/remote/secret/` (credentials). **Quantum realtime facet:** `src/trading/quantum/index.ts` — quote superposition → collapse → team/comms wave emit → conserved settlement ([[quantum]] · [[realtime]]). Composes: [[sandbox]] · [[receipt]] · [[access]] · [[cost]] · [[anchor]] · [[proof]] · [[tamper]] · [[merge]] · [[country]] · [[connections]] · [[commerce]] · [[payment]] · [[carriers]] · [[quantum]] · [[realtime]].

**Law — [[law]]: every trading call is gated by the [[sandbox]] AND [[receipt]]ed in one chain — permitted against a content-addressed grant, secret brokered by handle at the host boundary, audit emitted as uuid-chained leaves — so the outbound surface is zero-entropy and forging it costs beyond the universe ([[cost]] · [[proof]]); the registry holds public metadata, never credentials.**

@standard ISO-3166-1:2020 region-scope (the alpha-2 dispatch key, shared with the [[country]] twin)
@standard ISO-4217:2015 currency-codes (FX / market-data feeds)
@standard RFC-9110 http-semantics (the REST/fetch client surface)
@compliance PSD2 EU-2015/2366 open-banking-aggregators (Berlin Group NextGenPSD2 consent)
@compliance EN-16931 Peppol-BIS-3 e-invoicing access-points (AS4 send/receive)
