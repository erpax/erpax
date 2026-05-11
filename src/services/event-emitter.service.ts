/**
 * Event Emitter Service — domain-event pub/sub for in-process subscribers.
 *
 * Decouples write paths (invoice/payment/inventory/bank) from the GL posting
 * service and any other side-effect subscriber. Maintains an event log
 * suitable for audit replay.
 *
 * @standard ISO-8601-1:2019 date-time event-timestamp
 * @rfc 9562 uuid event-id
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOC-2 CC7.2 system-monitoring
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2
 */

import { v4 as uuid } from 'uuid';
import { DomainEvent, EventHandler, EventMetadata } from '@/types/events';

export class EventEmitterService {
  private handlers: Map<string, EventHandler[]> = new Map();
  private eventLog: EventMetadata[] = [];
  private isProcessing = false;
  // Queue is typed against the base `DomainEvent` so non-union event
  // types (e.g. period:adjustments:posted, bank:reconciliation:complete)
  // can flow through without `as unknown as AllDomainEvents` launder
  // casts. Listeners narrow via discriminated `event.eventType` matching.
  private eventQueue: DomainEvent[] = [];

  /**
   * Subscribe to events of a specific type
   * @param eventType - Event type to listen for (e.g., 'invoice:activated')
   * @param handler - Async function to handle the event
   */
  subscribe(eventType: string, handler: EventHandler) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }

    const handlers = this.handlers.get(eventType)!;
    handlers.push(handler);

    // Return unsubscribe function
    return () => {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    };
  }

  /**
   * Subscribe to multiple event types with the same handler
   */
  subscribeToMultiple(eventTypes: string[], handler: EventHandler) {
    const unsubscribers = eventTypes.map((eventType) =>
      this.subscribe(eventType, handler)
    );

    // Return function to unsubscribe from all
    return () => unsubscribers.forEach((unsub) => unsub());
  }

  /**
   * Emit a domain event
   * Triggers all subscribed handlers asynchronously
   */
  async emit(event: DomainEvent): Promise<void> {
    // Enrich event with metadata
    const enrichedEvent: DomainEvent = {
      ...event,
      eventId: event.eventId || uuid(),
      timestamp: event.timestamp || new Date(),
    };

    // Queue event
    this.eventQueue.push(enrichedEvent);

    // Process queue
    if (!this.isProcessing) {
      await this.processQueue();
    }
  }

  /**
   * Process queued events sequentially
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.eventQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      while (this.eventQueue.length > 0) {
        const event = this.eventQueue.shift()!;
        await this.executeHandlers(event);

        // Log event for audit trail
        this.logEvent(event);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Execute all handlers for an event type
   */
  private async executeHandlers(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.eventType) || [];

    if (handlers.length === 0) {
      console.warn(`No handlers registered for event type: ${event.eventType}`);
      return;
    }

    // Execute handlers in sequence (important for GL posting)
    for (const handler of handlers) {
      try {
        await handler(event);
      } catch (error) {
        console.error(
          `Error handling ${event.eventType} event:`,
          error
        );

        // Emit error event for dead-letter queue
        await this.emitErrorEvent(event, error);

        // Continue with next handler
      }
    }
  }

  /**
   * Log event for audit trail and replay
   */
  private logEvent(event: DomainEvent): void {
    const metadata: EventMetadata = {
      eventId: event.eventId,
      eventType: event.eventType,
      occurredAt: event.timestamp,
      recordedAt: new Date(),
      tenantId: event.tenantId,
      userId: event.userId,
      version: 1,
      retryCount: 0,
    };

    this.eventLog.push(metadata);

    // TODO: Persist to database for event sourcing
  }

  /**
   * Emit error event for failed handlers
   */
  private async emitErrorEvent(
    originalEvent: DomainEvent,
    error: unknown
  ): Promise<void> {
    // Create error event
    const errorEvent: DomainEvent = {
      ...originalEvent,
      eventType: `${originalEvent.eventType}:error`,
      payload: {
        ...originalEvent.payload,
        error: error instanceof Error ? error.message : String(error),
        originalEventId: originalEvent.eventId,
      },
    };

    // Execute error handlers
    const errorHandlers = this.handlers.get(`${originalEvent.eventType}:error`) || [];
    for (const handler of errorHandlers) {
      try {
        await handler(errorEvent);
      } catch (err) {
        console.error('Error in error handler:', err);
      }
    }
  }

  /**
   * Get event log for auditing
   */
  getEventLog(tenantId?: string, eventType?: string): EventMetadata[] {
    return this.eventLog.filter((log) => {
      if (tenantId && log.tenantId !== tenantId) return false;
      if (eventType && log.eventType !== eventType) return false;
      return true;
    });
  }

  /**
   * Clear event log (for testing)
   */
  clearEventLog(): void {
    this.eventLog = [];
  }

  /**
   * Clear registered handlers — by event type if provided, or all of them.
   *
   * Tests that `subscribe()` without retaining the unsubscribe callback will
   * otherwise leak handlers into the next test (the emitter is a process-wide
   * singleton). Call this in `beforeEach` / `afterEach` to keep test state
   * isolated. Production code should prefer the per-call unsubscribe returned
   * by `subscribe`.
   *
   * @standard ISO/IEC-29119:2022 software-testing test-isolation
   */
  clearHandlers(eventType?: string): void {
    if (eventType) {
      this.handlers.delete(eventType);
    } else {
      this.handlers.clear();
    }
  }

  /**
   * Get all registered handlers for debugging
   */
  getHandlers(): Map<string, number> {
    const result = new Map<string, number>();
    for (const [eventType, handlers] of this.handlers) {
      result.set(eventType, handlers.length);
    }
    return result;
  }

  /**
   * Wait for specific event (for testing)
   */
  async waitForEvent(
    eventType: string,
    timeoutMs: number = 5000
  ): Promise<DomainEvent | null> {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        unsubscribe();
        resolve(null);
      }, timeoutMs);

      const unsubscribe = this.subscribe(eventType, async (event) => {
        clearTimeout(timer);
        unsubscribe();
        resolve(event);
      });
    });
  }
}

// Singleton instance
export const eventEmitter = new EventEmitterService();

/**
 * Helper to emit event from business operations
 * Usage:
 *   await emitEvent('invoice:activated', tenantId, userId, {
 *     invoiceId: '123',
 *     amount: 1000,
 *     ...
 *   });
 */
export async function emitEvent<_T extends DomainEvent>(
  eventType: string,
  tenantId: string,
  userId: string,
  payload: Record<string, unknown>,
  aggregateId?: string,
  aggregateType?: string
): Promise<void> {
  const event = {
    eventId: uuid(),
    eventType,
    tenantId,
    aggregateId: aggregateId || (payload.id as string | undefined) || uuid(),
    aggregateType: aggregateType || 'invoice',
    timestamp: new Date(),
    userId,
    payload,
  };

  await eventEmitter.emit(event);
}
