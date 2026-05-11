#!/usr/bin/env bash
# @deprecated Slice KKK (2026-05-10). Created and immediately retired —
# the canonical access pattern is enforced by the helpers themselves
# (`@/plugins/auth/access` + `src/access/*`), not by an external watchdog.
# Adding more audit scripts is entropy. The shape that works:
# every collection's `access:` block is a one-liner per op pointing at
# a canonical helper from `@/plugins/auth/access` or `src/access/*`.
# When the codebase needs a new gate, lift it INTO the helpers, don't
# write another auditor.
#
# Safe to `git rm scripts/audit-strict-access.sh` on the next maintenance pass.
exit 0
