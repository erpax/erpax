# ERPax Dimensions Standards — Deep Reference (10 plugins + sub-tenant hierarchy)

Slice LLLLLLLL + slice KKKKKKKK + slice MMMMMMMM + slice VVVVVVVV (2026-05-11). The dimensions layer at `src/services/plugins/dimensions.ts` + `src/plugins/dimensions/index.ts` splits the architecture along the 10 §0b vortices. Country profile (slice KKKKKKKK) extends the open tenant-role registry up to sovereign scale. Conservation Laws 49 (taxonomy well-formed) + 51 (factory symmetry) govern the layer. Trinity collapse (slice JJJJJJJJ) places both at **Law III (Closure)**.

> **Cross-reference**: top-level index at [README.md](./README.md); topology at [topology.md](./topology.md); MCP layer at [mcp.md](./mcp.md).

---

## 1. The 10 dimensions (per spec §0ad)

| # | Dimension | Trinity Law | Description |
|---|---|---|---|
| 1 | `A-domain` | Identity | Domain entities — every business object that exists |
| 2 | `B-substrate` | Identity | Storage substrate + content uuid + type registry + streams |
| 3 | `C-process` | Causality | Events + chains + streams + agent dispatch |
| 4 | `D-conservation` | Closure | Conservation laws + invariants + Trinity verdicts |
| 5 | `E-tenant-role` | Closure | Open tenant role registry + role profiles + sub-tenant hierarchy |
| 6 | `F-integrity` | Identity | Content uuid verification + tamper-detection + DID + signatures |
| 7 | `G-beyond` | Closure | Beyond-current-standards primitives |
| 8 | `H-clients` | Closure | External surfaces (browser / Cloudflare / federation peers) |
| 9 | `I-federation` | Closure | Inter-tenant federation envelopes + trust graph + treaties |
| 10 | `J-meta-evolution` | Causality | Self-reference + cloning + meta-skill proposals + auto-generation |

Each dimension declares its `canonicalCollections` (already-Payload-registered) + `newCollections` (declared in `dimensions.ts`, awaiting Slice BBBBB cut to become real Payload collections).

## 2. The 5 reference tenant role profiles (per spec §0ac)

```
business              (LLLLL — base)
  ├─ payment-provider (MMMMM — PSD2/PSD3/EBA RTS/EMD2)
  ├─ bank             (NNNNN — Basel + CRR/CRD + IFRS 9 + AnaCredit + FINREP/COREP)
  └─ government       (OOOOO — IPSAS + GFS + Peppol + EU procurement)
       └─ country     (KKKKKKKK — sovereign + treaties + sub-tenant hierarchy)
```

A country tenant aggregates its operational sub-tenants:

- `central-bank` (Basel + AnaCredit + FINREP/COREP — inherited from `bank`)
- `treasury` (IPSAS 22 + GFSM)
- `ministry-of-finance` (IPSAS 1-42)
- `statistical-office` (UN SDG + ESA 2010 + ESS)
- `tax-administration` (OECD CRS + DAC6/7/8 + Pillar 2)
- `customs` (WCO HS + UCC + GVCs)
- `procurement-authority` (EU 2014/24 + 2014/25 + Peppol BIS)
- `social-security` (ISSA standards + IPSAS 25)
- `ministry-of-*` (sectoral)

Each sub-tenant is itself a tenant (per LLLLL); each carries its own uuid (Law 8); the country aggregates via federation envelopes (AAAAAA).

## 3. Country tenant standards stack (slice KKKKKKKK)

23 sovereign-specific standards:

| Family | Examples |
|---|---|
| **ISO** | 3166-1 (country codes), 13616 IBAN, 20022 (financial messaging) |
| **UN** | M49 (statistical codes), SDG indicators, A/RES/68/261 (Fundamental Principles of Official Statistics) |
| **IMF** | GFSM 2014 (Government Finance Statistics Manual) |
| **World Bank** | IDS (International Debt Statistics) |
| **OECD** | GovDB, BEPS Pillar 2, CRS, TIWB |
| **EU** | DAC8 (crypto-asset reporting), eIDAS QTSP |
| **WCO** | HS (Harmonised System) |
| **WTO** | GATS, TRIPS |
| **UN/CEFACT** | BRS + UN/EDIFACT |
| **INTERPOL** | UMF (Unified Message Format) |
| **SWIFT** | BIC |
| **W3C** | DID Core 1.0 (sovereign DID), VC Data Model 2.0 |
| **IFRS** | IPSAS 22 (general government sector disclosure) |

## 4. Federation = treaties

**Bilateral treaties** are federation envelopes (slice AAAAAA) carrying content uuid + sovereign DID signature. **Multilateral treaties** are N-of-K consensus envelopes (slice UUUUUU `consensusRead` with `minAgreement = N`). Treaty content uuid'd; amendments are bitemporal evolutions (Law 11) with old-uuid → new-uuid transitions.

## 5. Conservation laws

| Law # | Title | Verifies | Trinity |
|---|---|---|---|
| **49** | dimensional coverage | 10 dimensions exist; none empty; no duplicate assignments; no orphan collections | **III** (Closure) |
| **51** | dimensional plugin scaffolded | Every dimension declared in `DIMENSIONAL_PLUGINS` has a matching factory in `DIMENSION_PLUGIN_FACTORIES` | **III** (Closure) |

## 6. Scaffolding for Slice BBBBB

Slice MMMMMMMM scaffolds 10 plugin factory entry points under `src/plugins/dimensions/index.ts`:

```ts
domainDimensionPlugin         (A — Domain)
substrateDimensionPlugin      (B — Substrate)
processDimensionPlugin        (C — Process)
conservationDimensionPlugin   (D — Conservation)
tenantRoleDimensionPlugin     (E — Tenant Role)
integrityDimensionPlugin      (F — Integrity)
beyondDimensionPlugin         (G — Beyond)
clientsDimensionPlugin        (H — Clients)
federationDimensionPlugin     (I — Federation)
metaEvolutionDimensionPlugin  (J — Meta-evolution)
```

Each is a no-op factory today; Slice BBBBB will fill the bodies with collection moves on the local machine. `payload.config.ts` spreads `allDimensionalPlugins()` into its `plugins:` array — the slots are reserved.

## 7. ISO / W3C / OECD stack

| Standard | What it specifies | ERPax module |
|---|---|---|
| **ISO/IEC 25010:2023 §5.7 modularity** | Plugin boundaries; 10-dimension split | `plugins/dimensions.ts`, `agents/mcp/standardization.ts` |
| **ISO 3166-1 alpha-2 / alpha-3 / numeric** | Country code identity | `tenant-roles/profiles/country.profile.ts` |
| **ISO 13616 IBAN + ISO 20022** | Cross-border payment messaging | `country.profile.ts`, `payment-provider.profile.ts` |
| **UN M49 + UN SDG** | Sub-national reporting + sustainability indicators | `country.profile.ts` |
| **IMF GFSM 2014** | Sovereign accounts | `country.profile.ts`, `government.profile.ts` |
| **OECD BEPS Pillar 2 + CRS + DAC6/7/8** | Tax + financial reporting | `country.profile.ts`, `government.profile.ts` |
| **W3C DID Core 1.0 + W3C VC Data Model 2.0** | Sovereign DID + verifiable treaties | `did/index.ts`, `country.profile.ts` |

## 8. MCP tools

| Tool | Purpose |
|---|---|
| `erpax.platform.dimensions` | Return all 10 dimensional plugins with collections |
| `erpax.platform.dimensionForCollection` | Lookup which dimension a slug belongs to |
| `erpax.platform.dimensionalCounts` | canonical + new + total collection counts |
| `erpax.platform.checkDimensionalCoverage` | Conservation Law 49 verdict |
| `erpax.platform.dimensionalPluginFactories` | The 10 factory ids |
| `erpax.platform.allDimensionalPluginsCount` | Count (should be 10) |
| `erpax.platform.checkDimensionalPluginScaffolded` | Conservation Law 51 verdict |

## 9. Coupling with other slices

- **Slice CCCCC (JSDoc-as-spec)** — every dimensional collection has its spec extracted automatically.
- **Slice DDDDD (agents)** — agents own per-dimension collections; the `byCollection` lookup respects the dimensional taxonomy.
- **Slice LLLLL (open tenant roles)** — the tenant-role hierarchy lives in `E-tenant-role` dimension.
- **Slice AAAAAA (federation)** — federation envelopes carry per-dimension payloads; receiver can selectively consume by dimension.
- **Slice CCCCCCC (torus, Law 43)** — the 10 dimensions are the 10 §0b vortices; the torus surface IS the dimensional split visualised.
- **Slice JJJJJJJJ (Trinity)** — each dimension maps to one Trinity law.

## 10. Standards anchoring

@standard ISO/IEC 25010:2023 §5.7 modularity — plugin boundaries
@standard ISO 3166-1 — country codes
@standard ISO 13616 IBAN + ISO 20022 — financial messaging
@standard UN M49 + UN SDG + UN/CEFACT — international cooperation
@standard IMF GFSM 2014 + World Bank IDS — sovereign statistics
@standard OECD BEPS Pillar 2 + CRS + DAC6/7/8 — tax + financial reporting
@standard WCO HS + WTO GATS + WTO TRIPS — trade
@standard W3C DID Core 1.0 + W3C VC Data Model 2.0 — sovereign identity
@standard IFRS IPSAS 22 — government sector
@standard ISO 19011:2018 §6.4.6 — every dimension audit-trailed

## 11. Cross-reference — alphabetized

ISO 13616 IBAN, ISO 19011:2018 §6.4.6, ISO 20022, ISO 3166-1, ISO/IEC 25010:2023 §5.7, IFRS IPSAS 22, IMF GFSM 2014, INTERPOL UMF, OECD BEPS Pillar 2 + CRS + DAC8 + GovDB + TIWB, SWIFT BIC, UN M49, UN SDG, UN/CEFACT BRS + UN/EDIFACT, UN A/RES/68/261, W3C DID Core 1.0, W3C VC Data Model 2.0, WCO HS, World Bank IDS, WTO GATS, WTO TRIPS.
