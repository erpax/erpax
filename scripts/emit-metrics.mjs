#!/usr/bin/env node
/** Thin shell — matter lives in src/metric/face/index.ts. The spawn itself lives in ./tsx-shell.mjs. */
import { runTsx } from './tsx-shell.mjs'

runTsx('src/metric/face/index.ts')
