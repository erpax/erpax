/**
 * auditFields: the approval fields; the creator is Payload's own authorship.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @security ISO-27002 §5.3 segregation-of-duties
 */
import { describe, expect, it } from 'vitest'

import { auditFields } from '@/fields/relationship/auditFields'

describe('auditFields', () => {
  it("holds the approval only: Payload's authorship adds createdBy, closed to client writes", () => {
    expect(auditFields().map((f) => ('name' in f ? f.name : ''))).toEqual(['approvedBy', 'approvedAt'])
  })

  it('shows the approval read-only when asked, and hides approvedAt otherwise', () => {
    const [by, at] = auditFields({ readOnly: true })
    expect(by?.admin).toEqual({ readOnly: true })
    expect(at?.admin).toEqual({ readOnly: true })
    expect(auditFields()[1]?.admin).toEqual({ disabled: true })
  })
})
