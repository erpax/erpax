# subscription/plans/hooks — the folder exists so the convention holds before the hooks do

No plan-specific hook is wired yet. The barrel is here because every collection's hooks live at
the same address, and a convention with a hole in it is one every future reader must check.

When price-change validation and billing-cycle invariants are written, they land here and every
importer already names the right path.

Composes: [[law]].
