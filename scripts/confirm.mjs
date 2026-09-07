#!/usr/bin/env node
/** Thin shell — matter lives in src/confirm/matter/index.ts. The spawn itself lives in ./tsx-shell.mjs. */
import { runTsx } from './tsx-shell.mjs'

runTsx('src/confirm/matter/index.ts')
