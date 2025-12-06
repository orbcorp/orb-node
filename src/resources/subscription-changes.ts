// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as Shared from './shared';
import * as CustomersAPI from './customers/customers';
import * as PlansAPI from './plans/plans';

export class SubscriptionChanges extends APIResource {
  /**
   * This endpoint returns a subscription change given an identifier.
   *
   * A subscription change is created by including
   * `Create-Pending-Subscription-Change: True` in the header of a subscription
   * mutation API call (e.g.
   * [create subscription endpoint](/api-reference/subscription/create-subscription),
   * [schedule plan change endpoint](/api-reference/subscription/schedule-plan-change),
   * ...). The subscription change will be referenced by the
   * `pending_subscription_change` field in the response.
   */
  retrieve(
    subscriptionChangeId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionChangeRetrieveResponse> {
    return this._client.get(`/subscription_changes/${subscriptionChangeId}`, options);
  }

  /**
   * Apply a subscription change to perform the intended action. If a positive amount
   * is passed with a request to this endpoint, any eligible invoices that were
   * created will be issued immediately if they only contain in-advance fees.
   */
  apply(
    subscriptionChangeId: string,
    body?: SubscriptionChangeApplyParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionChangeApplyResponse>;
  apply(
    subscriptionChangeId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionChangeApplyResponse>;
  apply(
    subscriptionChangeId: string,
    body: SubscriptionChangeApplyParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionChangeApplyResponse> {
    if (isRequestOptions(body)) {
      return this.apply(subscriptionChangeId, {}, body);
    }
    return this._client.post(`/subscription_changes/${subscriptionChangeId}/apply`, { body, ...options });
  }

  /**
   * Cancel a subscription change. The change can no longer be applied. A
   * subscription can only have one "pending" change at a time - use this endpoint to
   * cancel an existing change before creating a new one.
   */
  cancel(
    subscriptionChangeId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionChangeCancelResponse> {
    return this._client.post(`/subscription_changes/${subscriptionChangeId}/cancel`, options);
  }
}

export interface MutatedSubscription {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription sorted by the start_date of the
   * adjustment interval.
   */
  adjustment_intervals: Array<Shared.AdjustmentInterval>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: Shared.BillingCycleAnchorConfiguration;

  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  billing_cycle_day: number;

  created_at: string;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is not part of the billing period. Set to null for
   * subscriptions that are not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if the subscription is not currently active.
   */
  current_billing_period_start_date: string | null;

  /**
   * A customer is a buyer of your products, and the other party to the billing
   * relationship.
   *
   * In Orb, customers are assigned system generated identifiers automatically, but
   * it's often desirable to have these match existing identifiers in your system. To
   * avoid having to denormalize Orb ID information, you can pass in an
   * `external_customer_id` with your own identifier. See
   * [Customer ID Aliases](/events-and-metrics/customer-aliases) for further
   * information about how these aliases work in Orb.
   *
   * In addition to having an identifier in your system, a customer may exist in a
   * payment provider solution like Stripe. Use the `payment_provider_id` and the
   * `payment_provider` enum field to express this mapping.
   *
   * A customer also has a timezone (from the standard
   * [IANA timezone database](https://www.iana.org/time-zones)), which defaults to
   * your account's timezone. See [Timezone localization](/essentials/timezones) for
   * information on what this timezone parameter influences within Orb.
   */
  customer: CustomersAPI.Customer;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * @deprecated The discount intervals for this subscription sorted by the
   * start_date. This field is deprecated in favor of `adjustment_intervals`.
   */
  discount_intervals: Array<
    Shared.AmountDiscountInterval | Shared.PercentageDiscountInterval | Shared.UsageDiscountInterval
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<Shared.FixedFeeQuantityScheduleEntry>;

  invoicing_threshold: string | null;

  /**
   * @deprecated The maximum intervals for this subscription sorted by the
   * start_date. This field is deprecated in favor of `adjustment_intervals`.
   */
  maximum_intervals: Array<Shared.MaximumInterval>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: { [key: string]: string };

  /**
   * @deprecated The minimum intervals for this subscription sorted by the
   * start_date. This field is deprecated in favor of `adjustment_intervals`.
   */
  minimum_intervals: Array<Shared.MinimumInterval>;

  /**
   * The name of the subscription.
   */
  name: string;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * A pending subscription change if one exists on this subscription.
   */
  pending_subscription_change: Shared.SubscriptionChangeMinified | null;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlansAPI.Plan | null;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<Shared.PriceInterval>;

  redeemed_coupon: Shared.CouponRedemption | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: Shared.SubscriptionTrialInfo;

  /**
   * The resources that were changed as part of this operation. Only present when
   * fetched through the subscription changes API or if the
   * `include_changed_resources` parameter was passed in the request.
   */
  changed_resources?: Shared.ChangedSubscriptionResources | null;
}

/**
 * A subscription change represents a desired new subscription / pending change to
 * an existing subscription. It is a way to first preview the effects on the
 * subscription as well as any changes/creation of invoices (see
 * `subscription.changed_resources`).
 */
export interface SubscriptionChangeRetrieveResponse {
  id: string;

  /**
   * The type of change (e.g., 'schedule_plan_change', 'create_subscription').
   */
  change_type: string;

  /**
   * Subscription change will be cancelled at this time and can no longer be applied.
   */
  expiration_time: string;

  status: 'pending' | 'applied' | 'cancelled';

  subscription: MutatedSubscription | null;

  /**
   * When this change was applied.
   */
  applied_at?: string | null;

  /**
   * Billing cycle alignment for plan changes.
   */
  billing_cycle_alignment?: string | null;

  /**
   * When this change was cancelled.
   */
  cancelled_at?: string | null;

  /**
   * How the change is scheduled (e.g., 'immediate', 'end_of_subscription_term',
   * 'requested_date').
   */
  change_option?: string | null;

  /**
   * When this change will take effect.
   */
  effective_date?: string | null;

  /**
   * The target plan ID for plan changes.
   */
  plan_id?: string | null;
}

/**
 * A subscription change represents a desired new subscription / pending change to
 * an existing subscription. It is a way to first preview the effects on the
 * subscription as well as any changes/creation of invoices (see
 * `subscription.changed_resources`).
 */
export interface SubscriptionChangeApplyResponse {
  id: string;

  /**
   * The type of change (e.g., 'schedule_plan_change', 'create_subscription').
   */
  change_type: string;

  /**
   * Subscription change will be cancelled at this time and can no longer be applied.
   */
  expiration_time: string;

  status: 'pending' | 'applied' | 'cancelled';

  subscription: MutatedSubscription | null;

  /**
   * When this change was applied.
   */
  applied_at?: string | null;

  /**
   * Billing cycle alignment for plan changes.
   */
  billing_cycle_alignment?: string | null;

  /**
   * When this change was cancelled.
   */
  cancelled_at?: string | null;

  /**
   * How the change is scheduled (e.g., 'immediate', 'end_of_subscription_term',
   * 'requested_date').
   */
  change_option?: string | null;

  /**
   * When this change will take effect.
   */
  effective_date?: string | null;

  /**
   * The target plan ID for plan changes.
   */
  plan_id?: string | null;
}

/**
 * A subscription change represents a desired new subscription / pending change to
 * an existing subscription. It is a way to first preview the effects on the
 * subscription as well as any changes/creation of invoices (see
 * `subscription.changed_resources`).
 */
export interface SubscriptionChangeCancelResponse {
  id: string;

  /**
   * The type of change (e.g., 'schedule_plan_change', 'create_subscription').
   */
  change_type: string;

  /**
   * Subscription change will be cancelled at this time and can no longer be applied.
   */
  expiration_time: string;

  status: 'pending' | 'applied' | 'cancelled';

  subscription: MutatedSubscription | null;

  /**
   * When this change was applied.
   */
  applied_at?: string | null;

  /**
   * Billing cycle alignment for plan changes.
   */
  billing_cycle_alignment?: string | null;

  /**
   * When this change was cancelled.
   */
  cancelled_at?: string | null;

  /**
   * How the change is scheduled (e.g., 'immediate', 'end_of_subscription_term',
   * 'requested_date').
   */
  change_option?: string | null;

  /**
   * When this change will take effect.
   */
  effective_date?: string | null;

  /**
   * The target plan ID for plan changes.
   */
  plan_id?: string | null;
}

export interface SubscriptionChangeApplyParams {
  /**
   * Description to apply to the balance transaction representing this credit.
   */
  description?: string | null;

  /**
   * Mark all pending invoices that are payable as paid. If amount is also provided,
   * mark as paid and credit the difference to the customer's balance.
   */
  mark_as_paid?: boolean | null;

  /**
   * An optional external ID to associate with the payment. Only applicable when
   * mark_as_paid is true.
   */
  payment_external_id?: string | null;

  /**
   * Optional notes about the payment. Only applicable when mark_as_paid is true.
   */
  payment_notes?: string | null;

  /**
   * A date string to specify the date the payment was received. Only applicable when
   * mark_as_paid is true. If not provided, defaults to the current date.
   */
  payment_received_date?: string | null;

  /**
   * Amount already collected to apply to the customer's balance. If mark_as_paid is
   * also provided, credit the difference to the customer's balance.
   */
  previously_collected_amount?: string | null;
}

export declare namespace SubscriptionChanges {
  export {
    type MutatedSubscription as MutatedSubscription,
    type SubscriptionChangeRetrieveResponse as SubscriptionChangeRetrieveResponse,
    type SubscriptionChangeApplyResponse as SubscriptionChangeApplyResponse,
    type SubscriptionChangeCancelResponse as SubscriptionChangeCancelResponse,
    type SubscriptionChangeApplyParams as SubscriptionChangeApplyParams,
  };
}
