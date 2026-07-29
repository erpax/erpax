// PROD-BUILD STUB for the `typescript` package.
// The corpus grammar / rules / audit leaves import the real compiler for AST work.
// Those paths are never on the ERP request path; shipping typescript.js (~8.6 MiB)
// alone blows the Cloudflare Workers gzip budget (10 MiB paid). Server build only —
// vitest / CLI / generate:types keep the real package.
const ScriptTarget = { ESNext: 99, Latest: 99 }
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
const ts = {
  ScriptTarget,
  SyntaxKind,
  createSourceFile,
  forEachChild,
  sys: {},
}
export default ts
export { ScriptTarget, SyntaxKind, createSourceFile, forEachChild }
