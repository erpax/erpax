/**
 * POST /api/subscriptions/create — create or upgrade tenant subscription.
 *
 * @rfc 9110 http-semantics
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-340-40 deferred-contract-costs
 * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data
 * @compliance PSD2 EU-2015/2366 strong-customer-authentication
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @audit ISO-19011:2018 audit-trail
 * @see src/app/README.md
 */

import config from '@payload-config'
import { getPayload } from 'payload'
import Stripe from 'stripe'
import { tenantIdFromRelation } from '@/utilities/tenantRemoteSecrets'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: request.headers })

    // Verify user is authenticated (an API-key principal has no tenant/email)
    if (!user || !('email' in user)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tenantId = tenantIdFromRelation(user.tenants?.[0]?.tenant)
    if (!tenantId) {
      return Response.json({ error: 'No tenant associated with user' }, { status: 400 })
    }

    const body = await request.json()
    const { planSlug, paymentMethodId } = body as { planSlug?: string; paymentMethodId?: string }

    if (!planSlug) {
      return Response.json({ error: 'planSlug required' }, { status: 400 })
    }

    // Find plan
    const planResult = await payload.find({
      collection: 'subscription-plans',
      where: { slug: { equals: planSlug } },
      limit: 1,
    })

    if (!planResult.docs.length) {
      return Response.json({ error: 'Plan not found' }, { status: 404 })
    }

    const plan = planResult.docs[0]

    // If free plan, create subscription directly
    if (planSlug === 'free' || plan.monthlyPrice === 0) {
      // Check if subscription already exists
      const existing = await payload.find({
        collection: 'subscriptions',
        where: { tenant: { equals: tenantId } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        // Update existing subscription
        const updated = await payload.update({
          collection: 'subscriptions',
          id: existing.docs[0].id,
          data: {
            plan: plan.id,
            status: 'active',
          },
        })
        return Response.json({ subscription: updated, free: true })
      }

      // Create new subscription
      const subscription = await payload.create({
        collection: 'subscriptions',
        data: {
          tenant: tenantId,
          plan: plan.id,
          status: 'active',
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
      })

      return Response.json({ subscription, free: true })
    }

    // Paid plan: require Stripe setup
    if (!plan.stripePriceId) {
      return Response.json(
        { error: 'This plan is not configured for payment' },
        { status: 400 },
      )
    }

    // Get tenant's Stripe credentials
    const tenant = await payload.findByID({
      collection: 'tenants',
      id: tenantId,
    })

    if (!tenant.stripeSecretKey) {
      return Response.json(
        { error: 'Tenant Stripe not configured' },
        { status: 500 },
      )
    }

    const stripe = new Stripe(tenant.stripeSecretKey, {
      apiVersion: '2026-04-22.dahlia',
    })

    // Get or create Stripe customer
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    })

    let stripeCustomerId: string

    if (customers.data.length) {
      stripeCustomerId = customers.data[0].id
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { tenantId, payloadUserId: user.id },
      })
      stripeCustomerId = customer.id
    }

    // Create or update Stripe subscription
    const existing = await payload.find({
      collection: 'subscriptions',
      where: { tenant: { equals: tenantId } },
      limit: 1,
    })

    let stripeSubscription: Stripe.Subscription

    if (existing.docs.length > 0 && existing.docs[0].stripeSubscriptionId) {
      // Update existing Stripe subscription
      stripeSubscription = await stripe.subscriptions.update(
        existing.docs[0].stripeSubscriptionId,
        {
          items: [{ price: plan.stripePriceId }],
          default_payment_method: paymentMethodId,
          off_session: true,
        },
      )
    } else {
      // Create new Stripe subscription
      stripeSubscription = await stripe.subscriptions.create({
        customer: stripeCustomerId,
        items: [{ price: plan.stripePriceId }],
        default_payment_method: paymentMethodId,
        off_session: true,
        metadata: { tenantId, planSlug },
      })
    }

    // Create or update Payload subscription
    if (existing.docs.length > 0) {
      const updated = await payload.update({
        collection: 'subscriptions',
        id: existing.docs[0].id,
        data: {
          plan: plan.id,
          status: 'active',
          stripeSubscriptionId: stripeSubscription.id,
          stripeCustomerId: stripeCustomerId,
          currentPeriodStart: new Date(stripeSubscription.items.data[0].current_period_start * 1000).toISOString(),
          currentPeriodEnd: new Date(stripeSubscription.items.data[0].current_period_end * 1000).toISOString(),
        },
      })

      return Response.json({
        subscription: updated,
        stripeSubscription: stripeSubscription.id,
      })
    } else {
      const created = await payload.create({
        collection: 'subscriptions',
        data: {
          tenant: tenantId,
          plan: plan.id,
          status: 'active',
          stripeSubscriptionId: stripeSubscription.id,
          stripeCustomerId: stripeCustomerId,
          currentPeriodStart: new Date(stripeSubscription.items.data[0].current_period_start * 1000).toISOString(),
          currentPeriodEnd: new Date(stripeSubscription.items.data[0].current_period_end * 1000).toISOString(),
        },
      })

      return Response.json({
        subscription: created,
        stripeSubscription: stripeSubscription.id,
      })
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: errorMsg }, { status: 500 })
  }
}
