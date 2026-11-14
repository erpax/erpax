import type { Field } from 'payload'

export const competencyLineField = (
  opts: { name?: string; mode?: 'held' | 'required'; label?: string; description?: string } = {},
): Field => {
  const held = (opts.mode ?? 'held') === 'held'
  return {
    name: opts.name ?? (held ? 'competencies' : 'requiredCompetencies'),
    type: 'array',
    label: opts.label ?? (held ? 'Held competencies' : 'Required competencies'),
    ...(opts.description ? { admin: { description: opts.description } } : {}),
    fields: [
      {
        name: 'competency',
        type: 'text',
        required: true,
        index: true,
        admin: {
          description:
            'Content-addressed competency = the SKILL.md route (e.g. /finance/reconciliation/SKILL), resolved from the corpus (services/skill-router/competencies). Same content ⇒ same competency.',
        },
      },
      held
        ? { name: 'proficiency', type: 'number', min: 0, admin: { description: 'Held proficiency level (SFIA scale).' } }
        : { name: 'minProficiency', type: 'number', min: 0, admin: { description: 'Minimum SFIA proficiency required.' } },
      held
        ? { name: 'assessedAt', type: 'date', admin: { description: 'When the proficiency was assessed / certified.' } }
        : { name: 'mandatory', type: 'checkbox', defaultValue: true, admin: { description: 'Essential vs desirable (ISO 30405).' } },
      ...(held ? [{ name: 'evidence', type: 'text', admin: { description: 'Agent: skill-router route; human: certification ref.' } } as Field] : []),
    ],
  }
}
