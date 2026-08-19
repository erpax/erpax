---
name: coverage
description: "Use when asking which external rails erpax can PROVE it speaks. 178 catalogued rails (97 country/bank + 81 trading); a rail declaring clientImplemented is a promise erpax parses its answers, and a promise with no contract check is a claim nothing can contradict. Ratchets the claimed-but-unproven count down; never counts catalogue-only rails as covered."
atomPath: outward/coverage
---

# outward/coverage — a claimed client with no contract is an unrefutable promise

erpax catalogues **178** external rails. Extending the contract pattern across all of
them by hand would mean 178 fixtures — and most would be **fiction**: only 5 of the 81
trading entries declare `clientImplemented`, so for the other 76 there is no parser,
hence **no contract to test**. A fixture there would assert that a body we never read
has a shape we never parse. That is coverage theatre, and it is worse than a gap
because it reads as safety.

What is measurable — and what actually bites — is the **gap**:

| state | meaning |
| --- | --- |
| `claimed` | the rail says erpax has a client for it |
| `covered` | an offline contract check exists (runs in the gate) |
| **`uncovered`** | **claimed but unproven — the debt** |
| `catalogue` | no client claimed; honestly out of scope, never counted as covered |

Measured 2026-08-19, after extending the pattern across every public rail:
**178 rails · 64 claim a client · 44 covered · 20 unproven · 114 catalogue-only.**

**Zero PUBLIC rails are unproven.** All 20 remaining need credentials (oauth2 11 ·
api_key 5 · mtls 2 · basic 2), so the floor is now provisioning, not effort — a
distinction the ledger makes explicitly, because "20 left" otherwise reads as
undone work.

## The ledger was under-reporting itself

`CONTRACTED_RAILS` was keyed by **display name**, and it held
`'ECB Euro Reference Rates'` — a name matching **zero** rails; the registry calls it
`'ECB Reference Exchange Rates'`. So a contract that had existed all along marked
nothing as covered, and 9 rows sat in the debt column. The ledger's own instrument was
the defect it exists to name: a membership test against a key nobody has **fails open**
and reports the wrong number forever, with nothing to contradict it
([[rules]]/unraised).

Coverage is now keyed by **endpoint** — a rail's actual address, which cannot drift
from a label — and `assertContractedRailsResolve` fails closed if any contracted
endpoint matches no catalogued rail.

## Four rails claimed a client that did not exist

`clientImplemented` is defined as *"`src/country/api/client/` ships a working module"*.
KRS, CNPJ Receita Federal, the XRechnung Validator and the БНБ payment-institutions
register all declared `true` with **no fetch site anywhere** — the flag was counting
promises erpax had never made. They are now `false`: catalogue-only is the honest
state, and writing fixtures for them instead would have been exactly the theatre this
atom refuses.

A rail declaring `clientImplemented: true` is a promise that erpax parses its answers.
With no contract beside it, that promise is exactly the corpus's own defect — a claim
nothing can contradict ([[rules]]/refutable), guarding a case that never runs
([[rules]]/unraised).

## The ratchet is the gate

Pure registry derivation — **no network** — so it runs in CI and cannot flake. It does
not demand 178 contracts; it forbids the gap from **growing**. Every new rail that
claims a client must arrive with a contract, and every contract written lowers the
ceiling. Zero is the horizon.

**Honest boundary.** This counts contracts, never their quality: a rail can be
`covered` by a check that asserts something trivial. It also cannot see an
authenticated rail's shape at all — 38 of the claimed rails need credentials, and this
atom holds none, so their contracts must be built from recorded samples, not probes.

**Law — [[law]]: a rail that claims a client owes a contract. Coverage counts what can
be refuted offline; a catalogue entry is never counted as covered.**

Composes: [[outward]] · [[country]] · [[trading]] · [[rules]].
