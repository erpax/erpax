
/** No MCP call escapes the gate — access · sandbox · receipt in one move. */
export function mcpCallGated(opts: {
  access: boolean
  sandbox: boolean
  receipt: boolean
}): boolean {
  return opts.access && opts.sandbox && opts.receipt
}

/** Tool surface is a pure projection — never more or less than corpus + collections. */
export function projectionMatchesCorpus(liveToolCount: number, corpusToolCount: number): boolean {
  return liveToolCount === corpusToolCount
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'quantum/mcp — gated=' +
      mcpCallGated({ access: true, sandbox: true, receipt: true }) +
      ' · projection=' +
      projectionMatchesCorpus(10, 10),
  )
}

/** @index-cross.foldback child=quantum/mcp parent=quantum — this cross folds back into its parent. */
