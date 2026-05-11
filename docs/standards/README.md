# ERPax Deep Standards References — Index

Slice RRRRRRRR (2026-05-11). Cross-domain index of every deep standards reference under `docs/standards/`. Each per-domain doc covers:

1. Every published standard the domain implements / cites.
2. The ERPax modules that carry the implementation.
3. The MCP tools that surface the capability.
4. The Conservation Laws governing it (with Trinity collapse — see slice JJJJJJJJ).

The deep docs are the **human-readable counterpart** of the runtime `MCP_STANDARDS_INDEX` (slice QQQQQQQQ in `src/services/agents/mcp/standardization.ts`). Every entry in the runtime index corresponds to a section in one of the per-domain docs; every standard cited in the doc has a runtime index entry.

---

## Domain references

| Doc | Domain | Slices | Conservation Laws |
|---|---|---|---|
| **[mcp.md](./mcp.md)** | MCP layer (8 self-properties) | DDDDD + VVVVVV..AAAAAAA + BBBBBBB | 1, 7, 37, 38, 39, 40, 41, 44, 45, 50, 52 |
| **[integrity.md](./integrity.md)** | UUID family (content / type / short / stream / replication) | RRRRR, SSSSS, TTTTT, UUUUU, ZZZZZ, GGGGGGG, FFFFFFF, IIIIIIIII | 8, 10, 11, 12, 18, 19, 35, 36, 46, 47, 48 |
| **[voting.md](./voting.md)** | Voting + rating uuid coupling (7 violations) | OOOOOO | 30, 31 |
| **[streams.md](./streams.md)** | Quantum streams + Lamport + uuid hash-chain | RRRRRR, SSSSSS | 33, 34 |
| **[pwa.md](./pwa.md)** | Progressive Web App via uuid (8 pain points) | NNNNNNNN | 52 |
| **[storage.md](./storage.md)** | Storage independence + replication consensus | TTTTTT, UUUUUU | 35, 36, 48 |
| **[topology.md](./topology.md)** | Torus closure + infinite-within-finite | CCCCCCC, IIIIIIIII | 43, 48 |
| **[trinity.md](./trinity.md)** | Three generators (Identity / Causality / Closure) | JJJJJJJJ | (3 generators over 52 derived) |

## Coming next (per-domain stubs)

These references are planned. Until they land, the inline `@standard` tags at the file-banner level inside each module are the authoritative source.

| Planned doc | Domain | Slices | Conservation Laws |
|---|---|---|---|
| `seo.md` | SEO vortex + microdata + Open Graph | NNNNNN | 29 |
| `website.md` | Interactive website + shadcn + Schema.org | MMMMMM, MMMMMM-shadcn | (covers Schema.org coupling) |
| `dimensions.md` | 10 dimensional plugins + tenant-role hierarchy | LLLLLLLL, MMMMMMMM, KKKKKKKK | 49, 51 |
| `proof.md` | Public DRY conformance proof | DDDDDDD, OOOOOOOO | 44 |
| `cloning.md` | Federation + cloning + self-reference | AAAAAA, BBBBBB, CCCCCC, DDDDDD, GGGGGG, HHHHHH | 19, 23, 24 |

## How a deep standards reference is structured

Each per-domain doc follows the same template (modeled after [mcp.md](./mcp.md)):

1. **Title + slice + summary** — what the domain is, which user insight drove it, where it lives in the source tree.
2. **N standards sections** — grouped by class (RFC / W3C / ISO / Schema.org / topology / etc.). Each row maps `standard → ERPax module → MCP tool`.
3. **Conservation laws governing the domain** — the law numbers + slice + standard anchor.
4. **Trinity classification** — which of the three generators (Identity / Causality / Closure) each derived law collapses to.
5. **Citation patterns** — examples for new code in the domain.
6. **Cross-reference index** — alphabetized list of every cited standard.

## Querying the docs at runtime

Three MCP tools (slice QQQQQQQQ) expose the runtime counterpart:

- `erpax.platform.standardsIndex` — full `MCP_STANDARDS_INDEX` array.
- `erpax.platform.standardsByFamily` — filter by `mcp / rfc-ietf / w3c / iso / schema-org / topology / open-graph / other`.
- `erpax.platform.standardsForLaw` — reverse lookup: which standards govern Conservation Law N?

Slice RRRRRRRR adds:

- `erpax.platform.standardsDocs` — return the topology of `docs/standards/*.md` (which docs exist, which slices/laws each covers) so the shadcn `mcp-playground` UI can render the standards browser surface (per spec §0i).

## Contributing a new deep doc

1. Pick a domain (one of the planned-next list above, or a new one).
2. Copy [mcp.md](./mcp.md) as a template.
3. Fill the standards sections from the inline `@standard` tags in the relevant modules.
4. Add the doc's row to the runtime `STANDARDS_DOCS_TOPOLOGY` constant in `src/services/agents/mcp/standardization.ts`.
5. Add the corresponding `MCP_STANDARDS_INDEX` entries (one per standard cited in the new doc).
6. Run the standards-citation index: `bash scripts/standards-citation-index.sh --write-index`.

## Standards anchoring of this index

@standard W3C JSON-LD 1.1 — typed standards manifests (the MCP_STANDARDS_INDEX is JSON-LD-serializable).
@standard ISO 19011:2018 §6.4.6 — audit-evidence + traceability (every claim ERPax makes traces back to a published standard via this index).
@standard ISO/IEC 25010:2023 §5.4 reusability — generator-set Trinity over 52 derived laws.
