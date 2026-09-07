#!/usr/bin/env node
/** Thin shell — matter lives in src/skill/frontmatter/index.ts. The spawn itself lives in ./tsx-shell.mjs. */
import { runTsx } from './tsx-shell.mjs'

runTsx('src/skill/frontmatter/index.ts')
