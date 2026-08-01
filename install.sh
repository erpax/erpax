#!/usr/bin/env bash
# erpax — one-line orientation.
#
#   curl -fsSL https://raw.githubusercontent.com/erpax/erpax/main/install.sh | bash
#
# What it does, in order, and nothing else:
#   1. checks git + a package manager exist        (never installs a toolchain behind your back)
#   2. clones erpax, or UPDATES the clone you already have   ([[local]] — prefer the local copy)
#   3. installs dependencies
#   4. prints the orientation entry and the health command
#
# What it deliberately does NOT do: no sudo, no PATH edits, no shell-rc writes, no daemon, no
# telemetry, no network call other than the clone/fetch and the package install. Every side effect
# is inside $ERPAX_DIR. Read it before you pipe it — that is the whole point of a short installer.
#
# Env:
#   ERPAX_DIR    where to put it            (default: ~/github/erpax/erpax)
#   ERPAX_REPO   which remote to clone      (default: https://github.com/erpax/erpax.git)
#   ERPAX_REF    branch or tag to check out (default: the remote's default branch)
set -euo pipefail

ERPAX_DIR="${ERPAX_DIR:-$HOME/github/erpax/erpax}"
ERPAX_REPO="${ERPAX_REPO:-https://github.com/erpax/erpax.git}"
ERPAX_REF="${ERPAX_REF:-}"

say() { printf '\033[1m·\033[0m %s\n' "$*"; }
die() { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; exit 1; }

command -v git >/dev/null 2>&1 || die "git is required — install it, then re-run."

# 1. the clone, or the update. A local copy that already exists is never re-cloned over.
if [ -d "$ERPAX_DIR/.git" ]; then
  say "erpax is already at $ERPAX_DIR — updating instead of re-cloning"
  git -C "$ERPAX_DIR" fetch --quiet --all --prune
  if [ -n "$(git -C "$ERPAX_DIR" status --porcelain)" ]; then
    say "working tree has local changes — fetched, but NOT touching your files"
  else
    git -C "$ERPAX_DIR" pull --quiet --ff-only || say "could not fast-forward (diverged) — left as is"
  fi
else
  say "cloning $ERPAX_REPO → $ERPAX_DIR"
  mkdir -p "$(dirname "$ERPAX_DIR")"
  git clone --quiet "$ERPAX_REPO" "$ERPAX_DIR"
fi
[ -n "$ERPAX_REF" ] && git -C "$ERPAX_DIR" checkout --quiet "$ERPAX_REF"

# 2. dependencies, with whatever package manager is actually here.
cd "$ERPAX_DIR"
if command -v pnpm >/dev/null 2>&1; then
  say "installing dependencies (pnpm)"
  pnpm install --silent
elif command -v corepack >/dev/null 2>&1; then
  say "enabling pnpm via corepack, then installing"
  corepack enable >/dev/null 2>&1 || true
  corepack pnpm install --silent
else
  say "pnpm not found — skipping install. erpax uses pnpm; install it and run: pnpm install"
fi

# 3. orientation. The URL and the repo are the same entry point: both load this file first.
cat <<'ORIENT'

  erpax — oriented.

    entry     .claude/skills/SKILL.md      the root orientation skill
    law       zero entropy ⇒ infinite tamper-cost
    atoms     every folder under src/ is one word, told three ways (form · code · schema)

  next:
    pnpm erpax doctor        health — stray-ts vs baseline, last efficiency pass, corpus entry
    pnpm check               the gate: typecheck · lint · rules · tests
    pnpm erpax rules check   the live-tree law registry

  an agent needs no separate setup: the repo IS the orientation.

ORIENT
say "installed at $ERPAX_DIR"
