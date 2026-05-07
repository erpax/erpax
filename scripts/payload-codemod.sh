#!/usr/bin/env bash
# Run official Payload codemods without npm package (@payloadcms/codemod is not published yet — npx 404).
# First run clones github.com/payloadcms/payload (sparse: packages/codemod only), installs deps, builds.
#
# Usage:
#   pnpm codemod --list
#   pnpm codemod --dry .
#   pnpm codemod .
#
# Override cache dir: ERPAX_PAYLOAD_CODEMOD_SRC=/path/to/payload/repo

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CACHE="${ERPAX_PAYLOAD_CODEMOD_SRC:-${HOME}/.cache/erpax/payload-codemod-src}"
CODEMOD_PKG="${CACHE}/packages/codemod"
CLI="${CODEMOD_PKG}/bin/cli.js"

ensure_built() {
  if [[ -f "${CODEMOD_PKG}/dist/cli.js" ]]; then
    return 0
  fi

  echo ">>> Payload codemod is not on npm yet. Preparing a sparse clone + local build (one-time)."
  echo ">>> Cache: ${CACHE}"

  mkdir -p "$(dirname "${CACHE}")"
  if [[ ! -d "${CACHE}/.git" ]]; then
    rm -rf "${CACHE}"
    git clone --depth 1 --filter=blob:none --sparse \
      https://github.com/payloadcms/payload.git "${CACHE}"
    (cd "${CACHE}" && git sparse-checkout set packages/codemod)
  fi

  if [[ ! -f "${CODEMOD_PKG}/package.json" ]]; then
    echo "Sparse checkout missing packages/codemod. Fix or delete cache: ${CACHE}" >&2
    exit 1
  fi

  # Monorepo expects hoisted @swc/cli; standalone needs it for `swc` in build:swc.
  (cd "${CODEMOD_PKG}" && pnpm install --ignore-workspace)
  if [[ ! -x "${CODEMOD_PKG}/node_modules/.bin/swc" ]]; then
    (cd "${CODEMOD_PKG}" && pnpm add -D @swc/cli --ignore-workspace)
  fi
  (cd "${CODEMOD_PKG}" && pnpm run build)

  if [[ ! -f "${CODEMOD_PKG}/dist/cli.js" ]]; then
    echo "Build failed: ${CODEMOD_PKG}/dist/cli.js not found." >&2
    exit 1
  fi
}

ensure_built
exec node "${CLI}" "$@"
