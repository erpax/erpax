# before/dashboard/seed/button — seeding is destructive, so it may happen exactly once

The button that fills an empty install. Its whole design is the guard around a single irreversible
action: seeding writes demo content into a live database, and running it twice is not idempotent —
it duplicates.

So the component holds three states and refuses in each, before the request is sent:

| state | what a second click does |
| --- | --- |
| `seeded` | refuses — the work is already done |
| `loading` | refuses — a request is in flight, and a double-click is one press to the user |
| `error` | refuses — the previous attempt's outcome is unknown, so a retry may double-write |

Each refusal explains itself in a toast rather than doing nothing. A button that silently ignores a
click is indistinguishable from a broken one, and the user's next move is to click harder.

The `error` refusal is the interesting one: a failed seed may have written *some* rows before it
failed, so "try again" is not obviously safe. Refusing and saying so leaves the decision with a human
who can look at the database.

**Honest boundary.** These guards live in the browser. They prevent a double-click and a hurried
retry; they cannot prevent two tabs, two administrators, or a direct call to the endpoint. Real
idempotency belongs to the seed endpoint, and this atom does not claim it.

**Law — [[law]]: an irreversible action guards itself in every state that could repeat it, and says
why it refused. Silence reads as a broken button, and a broken button gets clicked again.**

## Standards

- **WCAG 2.2 §3.3.4** — error prevention for actions with consequences.
- **WAI-ARIA 1.2** — the status role carrying the outcome.

Composes: `before/dashboard` · [[law]].
