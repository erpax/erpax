/**
 * Payments `beforeValidate` chain — tenant auto-population.
 *
 * @standard ISO-20022 financial-messaging
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see docs/STANDARDS.md §4.1
 */

import { autoPopulateTenant } from '../../../../hooks/autoPopulateTenant'

export const paymentsBeforeValidate = [autoPopulateTenant]
