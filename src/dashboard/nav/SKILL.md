# dashboard/nav — the navigation is a torus, so no cell is an edge

`navGrid` lays the dashboard out on a fixed grid and `toroidalWalk` moves across it, wrapping
at every boundary via `wrapIndex`: moving left from the first column arrives at the last, and
up from the first row arrives at the bottom.

A grid with edges has cells that are harder to reach than others, and the corner is worst. A
torus has no corner — every cell has the same four neighbours — so keyboard traversal costs
the same wherever the user is.

Composes: [[law]].
