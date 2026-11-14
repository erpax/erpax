/**
 * think/document/check — the definition of a lead, checked where the document is saved.
 *
 * A check that only the caller runs is a check a second caller forgets. The definition of a lead
 * is a schema, and Payload runs it: a before-validation hook on pages checks any page under
 * `leads` against it and refuses the save when it does not fit. The hook records in the request's
 * hook context that the check ran, so every later hook in the same request can rely on it and
 * none repeats it.
 *
 * Pure: no file access, so the collection that carries the hook loads in any runtime.
 *
 * @invariant a page under leads is saved only if it meets the lead definition
 * @invariant the check runs once per request: the context flag set here is what later hooks read
 * @see ./SKILL.md
 */
import { APIError, type CollectionBeforeValidateHook } from 'payload'
import { z } from 'zod'

const CONDITION = /\s+—\s+develop when\s+(.+)$/

/** What the lead is, without the condition it waits on. */
export const subjectOf = (intent: string): string => intent.replace(CONDITION, '').trim()

/** What the lead waits for, or nothing when it states no condition. */
export const conditionOf = (intent: string): string | undefined => CONDITION.exec(intent)?.[1]?.trim()

/**
 * What a prompt must be to become a lead. One line that says what is to be done: long enough to
 * be a sentence, short enough to be a title and a description, and free of the control characters
 * that hide text from a reader.
 */
export const leadSchema = z
  .string()
  .transform((text) => text.trim())
  .pipe(
    z
      .string()
      .min(12, 'a lead says what is to be done — at least a short sentence')
      .max(1200, 'a lead is a sentence or two, not a document')
      .refine((text) => !/[\r\n]/.test(text), 'a lead is one line')
      .refine((text) => subjectOf(text).split(/\s+/).length >= 3, 'a lead names at least three words of work')
      .refine((text) => !/[\u0000-\u0008​-‏‪-‮⁦-⁩﻿]/.test(text), 'a lead carries no hidden or control characters'),
  )

/** A prompt checked against the lead definition: the cleaned text, or why it is refused. */
export function checkLead(prompt: unknown): { readonly ok: true; readonly lead: string } | { readonly ok: false; readonly prompt: string; readonly reason: string } {
  const parsed = leadSchema.safeParse(prompt)
  return parsed.success
    ? { ok: true, lead: parsed.data }
    : { ok: false, prompt: typeof prompt === 'string' ? prompt.slice(0, 80) : String(prompt), reason: parsed.error.issues[0]?.message ?? 'not a lead' }
}

/** The key under which the request's hook context records that the lead check ran. */
export const leadCheckedKey = (): string => 'leadChecked'

/** True for a page that is a lead: it lives under the `leads` page. */
export const isLeadSlug = (slug: unknown): slug is string => typeof slug === 'string' && slug.startsWith('leads-')

/**
 * Before validation, on pages: a page under `leads` is checked against the lead definition — by
 * its description (the lead in full) when it has one, else by its title. A page that is not a
 * lead is not touched. The context flag makes the check run once per request.
 */
export const checkLeadPage: CollectionBeforeValidateHook = ({ data, originalDoc, context }) => {
  const before = (originalDoc ?? {}) as { slug?: unknown; title?: unknown; meta?: { description?: unknown } }
  if (!isLeadSlug(data?.slug ?? before.slug) || context[leadCheckedKey()]) return data
  const meta = (data?.meta ?? before.meta) as { description?: unknown } | undefined
  const text = typeof meta?.description === 'string' && meta.description.trim() ? meta.description : (data?.title ?? before.title)
  const checked = checkLead(text)
  if (!checked.ok) throw new APIError(`Not a lead: ${checked.reason}.`, 400)
  context[leadCheckedKey()] = true
  return data
}
