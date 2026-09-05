# uuid/chain — a uuid bound to its predecessor IS a blockchain leaf

`forgeGenesisLink` starts a chain at `GENESIS_PREV_UUID` and `forgeChainLink` extends it:
`computeChainLinkUuid` addresses the pair (previous, content), so each link's identity depends on
everything before it. `verifyChain` walks the `LinkStore` and reports where the walk breaks.

There is no separate ledger structure here. The binding of one uuid to another is already the
leaf, which is why the tamper cost is the cost of re-forging every link after the one changed.

Composes: [[uuid]] · [[merge]] · [[law]].
