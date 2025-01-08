// File generated from our OpenAPI spec by Stainless.

import { APIResource } from 'orb-billing/resource';
import { createHmac } from 'node:crypto';
import { debug, getRequiredHeader, HeadersLike } from 'orb-billing/core';
import { Customer } from 'orb-billing/resources/customers';
import { Subscription } from 'orb-billing/resources/subscriptions';
import { Invoice } from 'orb-billing/resources/invoices';
import { Discount } from 'orb-billing/resources/shared';
import { CreditNote } from 'orb-billing/resources/credit-notes';

export class Webhooks extends APIResource {
  /**
   * Validates that the given payload was sent by Orb and parses the payload.
   *
   * An error will be raised if the webhook payload was not sent by Orb.
   */
  unwrap(
    payload: string,
    headers: HeadersLike,
    secret: string | undefined | null = this._client.webhookSecret,
  ): Object {
    this.verifySignature(payload, headers, secret);
    return JSON.parse(payload);
  }

  private parseSecret(secret: string | null | undefined): Uint8Array {
    if (!secret) {
      throw new Error(
        "The webhook secret must either be set using the env var, ORB_WEBHOOK_SECRET, on the client class, Orb({ webhookSecret: '123' }), or passed to this function",
      );
    }

    const buf = Buffer.from(secret, 'utf-8');
    if (buf.toString('utf-8') !== secret) {
      throw new Error(`Given secret is not valid`);
    }

    return new Uint8Array(buf);
  }

  private signPayload(payload: string, { timestamp, secret }: { timestamp: string; secret: Uint8Array }) {
    const encoder = new TextEncoder();
    const toSign = encoder.encode(`v1:${timestamp}:${payload}`);

    const hmac = createHmac('sha256', secret);
    hmac.update(toSign);

    return `v1=${hmac.digest('hex')}`;
  }

  /** Make an assertion, if not `true`, then throw. */
  private assert(expr: unknown, msg = ''): asserts expr {
    if (!expr) {
      throw new Error(msg);
    }
  }

  /** Compare to array buffers or data views in a way that timing based attacks
   * cannot gain information about the platform. */
  private timingSafeEqual(
    a: ArrayBufferView | ArrayBufferLike | DataView,
    b: ArrayBufferView | ArrayBufferLike | DataView,
  ): boolean {
    if (a.byteLength !== b.byteLength) {
      return false;
    }
    if (!(a instanceof DataView)) {
      a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
    }
    if (!(b instanceof DataView)) {
      b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
    }
    this.assert(a instanceof DataView);
    this.assert(b instanceof DataView);
    const length = a.byteLength;
    let out = 0;
    let i = -1;
    while (++i < length) {
      out |= a.getUint8(i) ^ b.getUint8(i);
    }
    return out === 0;
  }

  /**
   * Validates whether or not the webhook payload was sent by Orb.
   *
   * An error will be raised if the webhook payload was not sent by Orb.
   */
  verifySignature(
    body: string,
    headers: HeadersLike,
    secret: string | undefined | null = this._client.webhookSecret,
  ): void {
    const whsecret = this.parseSecret(secret);

    const msgTimestamp = getRequiredHeader(headers, 'X-Orb-Timestamp');
    const msgSignature = getRequiredHeader(headers, 'X-Orb-Signature');

    const nowSeconds = Math.floor(Date.now() / 1000);
    // The timestamp header does not include a timezone (it is UTC by default)
    const timezoneSuffix = msgTimestamp.includes('Z') || msgTimestamp.includes('+') ? '' : 'Z';
    const timestamp = new Date(msgTimestamp + timezoneSuffix);
    const timestampSeconds = Math.floor(timestamp.getTime() / 1000);
    if (isNaN(timestampSeconds)) {
      throw new Error('Invalid timestamp header');
    }

    const webhookToleranceInSeconds = 5 * 60; // 5 minutes
    if (nowSeconds - timestampSeconds > webhookToleranceInSeconds) {
      throw new Error('Webhook timestamp is too old');
    }

    if (timestampSeconds > nowSeconds + webhookToleranceInSeconds) {
      console.warn({ timestampSeconds, nowSeconds, webhookToleranceInSeconds });
      throw new Error('Webhook timestamp is too new');
    }

    if (typeof body !== 'string') {
      throw new Error(
        'Webhook body must be passed as the raw JSON string sent from the server (do not parse it first).',
      );
    }

    const computedSignature = this.signPayload(body, { timestamp: msgTimestamp, secret: whsecret });
    const expectedSignature = computedSignature.split('=')[1];

    const passedSignatures = msgSignature.split(' ');

    const encoder = new globalThis.TextEncoder();
    for (const versionedSignature of passedSignatures) {
      const [version, signature] = versionedSignature.split('=');
      debug('verifySignature', { version, signature, expectedSignature, computedSignature });

      if (version !== 'v1') {
        continue;
      }

      if (this.timingSafeEqual(encoder.encode(signature), encoder.encode(expectedSignature))) {
        // valid!
        return;
      }
    }

    throw new Error('None of the given webhook signatures match the expected signature');
  }
}

// Base webhook event interface
interface BaseWebhookEvent {
  id: string;
  created_at: string;
  type: string;
}

// Customer events
interface CustomerCreatedEvent extends BaseWebhookEvent {
  type: 'customer.created';
  customer: Customer;
  properties: Record<string, never>;
}

interface CustomerEditedEvent extends BaseWebhookEvent {
  type: 'customer.edited';
  customer: Customer;
  properties: {
    previous_attributes: Partial<Customer>;
  };
}

// Subscription events
interface SubscriptionEvent extends BaseWebhookEvent {
  subscription: Subscription;
}

interface SubscriptionCreatedEvent extends SubscriptionEvent {
  type: 'subscription.created';
  properties: Record<string, never>;
}

interface SubscriptionStartedEvent extends SubscriptionEvent {
  type: 'subscription.started';
  properties: Record<string, never>;
}

interface SubscriptionFixedFeeQuantityUpdatedEvent extends SubscriptionEvent {
  type: 'subscription.fixed_fee_quantity_updated';
  properties: {
    old_quantity: number;
    new_quantity: number;
    effective_date: string;
    price_id: string;
  };
}

interface SubscriptionEditedEvent extends SubscriptionEvent {
  type: 'subscription.edited';
  properties: {
    previous_attributes: Partial<Subscription>;
  };
}

interface SubscriptionEndedEvent extends SubscriptionEvent {
  type: 'subscription.ended';
  properties: Record<string, never>;
}

interface SubscriptionPlanChangedEvent extends SubscriptionEvent {
  type: 'subscription.plan_changed';
  properties: {
    previous_plan_id: string;
  };
}

interface SubscriptionPlanVersionChangeScheduledEvent extends SubscriptionEvent {
  type: 'subscription.plan_version_change_scheduled';
  properties: {
    effective_date: string;
    previous_plan_version_number: number;
    new_plan_version_number: number;
  };
}

interface SubscriptionPlanVersionChangedEvent extends SubscriptionEvent {
  type: 'subscription.plan_version_changed';
  properties: {
    effective_date: string;
    previous_plan_version_number: number;
    new_plan_version_number: number;
  };
}

// Invoice events
interface InvoiceEvent extends BaseWebhookEvent {
  invoice: Invoice;
}

interface InvoiceDateElapsedEvent extends InvoiceEvent {
  type: 'invoice.invoice_date_elapsed';
  properties: {
    invoice_date: string;
  };
}

interface InvoiceIssuedEvent extends InvoiceEvent {
  type: 'invoice.issued';
  properties: {
    automatically_marked_as_paid: boolean;
  };
}

interface InvoiceIssueFailedEvent extends InvoiceEvent {
  type: 'invoice.issue_failed';
  properties: {
    reason: string;
  };
}

interface InvoicePaymentFailedEvent extends InvoiceEvent {
  type: 'invoice.payment_failed';
  properties: {
    payment_provider: 'stripe';
    payment_provider_id: string;
    payment_provider_transaction_id: string | null;
  };
}

interface InvoicePaymentProcessingEvent extends InvoiceEvent {
  type: 'invoice.payment_processing';
  properties: {
    payment_provider: 'stripe';
    payment_provider_id: string;
  };
}

interface InvoicePaymentSucceededEvent extends InvoiceEvent {
  type: 'invoice.payment_succeeded';
  properties: {
    payment_provider: 'stripe';
    payment_provider_id: string;
    payment_provider_transaction_id: string;
  };
}

interface InvoiceEditedEvent extends InvoiceEvent {
  type: 'invoice.edited';
  properties: {
    previous_attributes: {
      amount_due?: string;
      subtotal?: string;
      total?: string;
      discounts?: Array<Discount>;
      minimum?: any;
      line_items?: Array<Invoice['line_items'][0]>;
    };
  };
}

interface InvoiceManuallyMarkedAsVoidEvent extends InvoiceEvent {
  type: 'invoice.manually_marked_as_void';
  properties: Record<string, never>;
}

interface InvoiceManuallyMarkedAsPaidEvent extends InvoiceEvent {
  type: 'invoice.manually_marked_as_paid';
  properties: {
    payment_received_date: string;
    external_id: string;
    notes: string;
  };
}

interface InvoiceUndoMarkAsPaidEvent extends InvoiceEvent {
  type: 'invoice.undo_mark_as_paid';
  properties: Record<string, never>;
}

interface InvoiceSyncSucceededEvent extends InvoiceEvent {
  type: 'invoice.sync_succeeded';
  properties: {
    payment_provider: string;
    payment_provider_id: string;
  };
}

interface InvoiceSyncFailedEvent extends InvoiceEvent {
  type: 'invoice.sync_failed';
  properties: {
    payment_provider: string;
    payment_provider_id: string;
  };
}

// Credit note events
interface CreditNoteEvent extends BaseWebhookEvent {
  credit_note: CreditNote;
}

interface CreditNoteIssuedEvent extends CreditNoteEvent {
  type: 'credit_note.issued';
  properties: Record<string, never>;
}

interface CreditNoteMarkedAsVoidEvent extends CreditNoteEvent {
  type: 'credit_note.marked_as_void';
  properties: Record<string, never>;
}

// Usage and balance events
interface SubscriptionUsageExceededEvent extends SubscriptionEvent {
  type: 'subscription.usage_exceeded';
  properties: {
    billable_metric_id: string;
    timeframe_start: string;
    timeframe_end: string;
    quantity_threshold: number;
  };
}

interface SubscriptionCostExceededEvent extends SubscriptionEvent {
  type: 'subscription.cost_exceeded';
  properties: {
    timeframe_start: string;
    timeframe_end: string;
    amount_threshold: number;
  };
}

interface CustomerCreditBalanceEvent extends BaseWebhookEvent {
  type: 'customer.credit_balance_depleted' | 'customer.credit_balance_recovered';
  customer: Customer;
  properties: {
    pricing_unit: {
      name: string;
      symbol: string;
      display_name: string;
    };
  };
}

interface CustomerCreditBalanceDroppedEvent extends BaseWebhookEvent {
  type: 'customer.credit_balance_dropped';
  customer: Customer;
  properties: {
    balance_threshold: string;
    pricing_unit: {
      name: string;
      symbol: string;
      display_name: string;
    };
  };
}

// Test event
interface ResourceEventTest extends BaseWebhookEvent {
  type: 'resource_event.test';
  message: string;
}

// Union type of all possible webhook events
export type WebhookEvent =
  | CustomerCreatedEvent
  | CustomerEditedEvent
  | SubscriptionCreatedEvent
  | SubscriptionStartedEvent
  | SubscriptionFixedFeeQuantityUpdatedEvent
  | SubscriptionEditedEvent
  | SubscriptionEndedEvent
  | SubscriptionPlanChangedEvent
  | SubscriptionPlanVersionChangeScheduledEvent
  | SubscriptionPlanVersionChangedEvent
  | InvoiceDateElapsedEvent
  | InvoiceIssuedEvent
  | InvoiceIssueFailedEvent
  | InvoicePaymentFailedEvent
  | InvoicePaymentProcessingEvent
  | InvoicePaymentSucceededEvent
  | InvoiceEditedEvent
  | InvoiceManuallyMarkedAsVoidEvent
  | InvoiceManuallyMarkedAsPaidEvent
  | InvoiceUndoMarkAsPaidEvent
  | InvoiceSyncSucceededEvent
  | InvoiceSyncFailedEvent
  | CreditNoteIssuedEvent
  | CreditNoteMarkedAsVoidEvent
  | SubscriptionUsageExceededEvent
  | SubscriptionCostExceededEvent
  | CustomerCreditBalanceEvent
  | CustomerCreditBalanceDroppedEvent
  | ResourceEventTest;
