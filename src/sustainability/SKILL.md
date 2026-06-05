---
name: sustainability
description: "Use when asking whether a system can ENDURE — it is sustainable iff it draws down no stock faster than that stock regenerates (throughput ≤ carrying capacity) and its material loop closes, so each cycle adds zero NET entropy. Nature does it as a sun-driven dissipative structure — matter cycles, energy flows one-way and degrades. In erpax, zero-net-entropy-per-cycle IS sustainability; the borrowed anchor is the sun."
---

# sustainability — endures because each cycle nets zero (the closed loop)

**Sustainability** is the property of a system that can **run indefinitely** — it consumes no stock faster than that stock is replenished, and it returns its wastes as inputs so the material loop **closes**. The test is per-cycle: a sustainable cycle adds **zero net [[entropy]]** to its own ground. Draw down faster than regeneration and the stock collapses (overgrazing, a fishery crash, soil mining); leave a waste no process consumes and it accumulates as poison.

**Nature is not closed — it is sun-subsidised.** This is the honest physics. A living system is a **dissipative structure** (Prigogine): it holds its local order *only* by importing low-entropy energy and exporting high-entropy heat. So sustainability is never perpetual motion — **matter** cycles (decomposers return every leaf to [[soil]]; [[compost]] credits spent residue back to [[capacity]]), but **energy** flows one way and degrades. The loop closes for atoms; for energy there is a constant renewable throughput (the sun) and a constant export of waste heat. Sustainable means the driving flow is replenished as fast as it is spent, and the entropy is exported where it does not foul the stock.

In erpax this is the [[law]] exactly. Zero **net** [[entropy]] *per cycle* IS sustainability: every config is a balanced [[entry]] ([[conservation]]) that adds no free parameter, so the books do not silently inflate. The external low-entropy a zero-entropy app borrows — the [[anchor]] — is the sun: the one renewable input that lets the closed loop stay tamper-proof without ever minting value from nothing. A config that leaks an un-recycled free parameter is the unsustainable cycle — the [[tamper]] the [[proof]] catches.

## Standards
- **Brundtland Report**, *Our Common Future* (1987) — "meets the needs of the present without compromising the ability of future generations to meet theirs"; the canonical definition.
- **Prigogine, dissipative structures** (Nobel Chemistry, 1977) — order maintained far from equilibrium by dissipating energy; why "closed and self-sustaining" is a category error.
- **Verhulst logistic growth** (1838) — the carrying [[capacity]] K; throughput sustained above regeneration overshoots and collapses.
- **Second Law of Thermodynamics** — local order requires entropy export; sustainability is the budget for that export.

Composes [[conservation]] · [[entropy]] · [[capacity]] · [[compost]] · [[soil]] · [[balance]] · [[anchor]] · [[diversity]] · [[ecosystem]] · [[decentralization]] · [[whole]] · [[law]].

## Matter-twin

The computed twin lives in `src/sustainability/index.ts`. `logisticGrowth` encodes the Verhulst carrying-capacity curve; `carryingYield` returns the Maximum Sustainable Yield at the curve's peak; `sustainableHarvest` guards the stock-flow boundary; `netEntropy` measures the per-cycle thermodynamic budget (produced − exported); `isSustainable` combines both conditions into the single truth-value this atom names.
