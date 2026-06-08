/**
 * law/folder/matter — matter-state helpers (no seal · word · readme imports).
 */

export type FolderMatterState = 'empty' | 'vocabulary' | 'code-complete' | 'incomplete'

export function folderMatterState(form: 0 | 1, code: 0 | 1, hasTestTs: boolean): FolderMatterState {
  if (!form && !code) return 'empty'
  if (!code) return form ? 'vocabulary' : 'empty'
  if (form && code && hasTestTs) return 'code-complete'
  return 'incomplete'
}

/** True when the folder holds the matter required before purity/seal axes apply. */
export function folderMatterComplete(state: FolderMatterState): boolean {
  return state === 'vocabulary' || state === 'code-complete'
}
