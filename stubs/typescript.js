// PROD-BUILD STUB for the `typescript` package.
// The corpus grammar / rules / audit leaves import the real compiler for AST work.
// Those paths are never on the ERP request path; shipping typescript.js (~8.6 MiB)
// alone blows the Cloudflare Workers gzip budget (10 MiB paid). Server build only —
// vitest / CLI / generate:types keep the real package.
// Also: @payloadcms/plugin-mcp schemaConversion imports transpileModule / ModuleKind
// at build time — export no-op shapes so webpack can resolve without the real package.
const ScriptTarget = { ESNext: 99, Latest: 99, ES2018: 5, ES5: 1, ES2015: 2 }
const ModuleKind = { None: 0, CommonJS: 1, AMD: 2, UMD: 3, System: 4, ES2015: 5, ESNext: 99 }
const SyntaxKind = {}
function createSourceFile(fileName = '', sourceText = '') {
  return {
    fileName,
    text: sourceText,
    statements: [],
    getFullText: () => sourceText,
    getLineAndCharacterOfPosition: () => ({ line: 0, character: 0 }),
  }
}
function forEachChild() {}
/** No-op transpile — MCP zod schema conversion must not run real TS in the Worker. */
function transpileModule(inputText = '', _options) {
  return { outputText: typeof inputText === 'string' ? inputText : '', diagnostics: [] }
}
const ts = {
  ScriptTarget,
  ModuleKind,
  SyntaxKind,
  createSourceFile,
  forEachChild,
  transpileModule,
  sys: {},
}
export default ts
export {
  ScriptTarget,
  ModuleKind,
  SyntaxKind,
  createSourceFile,
  forEachChild,
  transpileModule,
}
