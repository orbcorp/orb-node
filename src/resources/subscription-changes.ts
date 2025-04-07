// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as CreditNotesAPI from './credit-notes';
import * as InvoicesAPI from './invoices';
import * as CustomersAPI from './customers/customers';
import * as PlansAPI from './plans/plans';
import * as PricesAPI from './prices/prices';

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

/**
 * A subscription change represents a desired new subscription / pending change to
 * an existing subscription. It is a way to first preview the effects on the
 * subscription as well as any changes/creation of invoices (see
 * `subscription.changed_resources`).
 */
export interface SubscriptionChangeRetrieveResponse {
  id: string;

  /**
   * Subscription change will be cancelled at this time and can no longer be applied.
   */
  expiration_time: string;

  status: 'pending' | 'applied' | 'cancelled';

  subscription: SubscriptionChangeRetrieveResponse.Subscription | null;

  /**
   * When this change was applied.
   */
  applied_at?: string | null;

  /**
   * When this change was cancelled.
   */
  cancelled_at?: string | null;
}

export namespace SubscriptionChangeRetrieveResponse {
  export interface Subscription {
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
    adjustment_intervals: Array<Subscription.AdjustmentInterval>;

    /**
     * Determines whether issued invoices for this subscription will automatically be
     * charged with the saved payment method on the due date. This property defaults to
     * the plan's behavior. If null, defaults to the customer's setting.
     */
    auto_collection: boolean | null;

    billing_cycle_anchor_configuration: Subscription.BillingCycleAnchorConfiguration;

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
     * The discount intervals for this subscription sorted by the start_date.
     */
    discount_intervals: Array<
      | Subscription.AmountDiscountInterval
      | Subscription.PercentageDiscountInterval
      | Subscription.UsageDiscountInterval
    >;

    /**
     * The date Orb stops billing for this subscription.
     */
    end_date: string | null;

    fixed_fee_quantity_schedule: Array<Subscription.FixedFeeQuantitySchedule>;

    invoicing_threshold: string | null;

    /**
     * The maximum intervals for this subscription sorted by the start_date.
     */
    maximum_intervals: Array<Subscription.MaximumInterval>;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * The minimum intervals for this subscription sorted by the start_date.
     */
    minimum_intervals: Array<Subscription.MinimumInterval>;

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
    pending_subscription_change: Subscription.PendingSubscriptionChange | null;

    /**
     * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
     * subscribed to by a customer. Plans define the billing behavior of the
     * subscription. You can see more about how to configure prices in the
     * [Price resource](/reference/price).
     */
    plan: PlansAPI.Plan;

    /**
     * The price intervals for this subscription.
     */
    price_intervals: Array<Subscription.PriceInterval>;

    redeemed_coupon: Subscription.RedeemedCoupon | null;

    /**
     * The date Orb starts billing for this subscription.
     */
    start_date: string;

    status: 'active' | 'ended' | 'upcoming';

    trial_info: Subscription.TrialInfo;

    /**
     * The resources that were changed as part of this operation. Only present when
     * fetched through the subscription changes API or if the
     * `include_changed_resources` parameter was passed in the request.
     */
    changed_resources?: Subscription.ChangedResources | null;
  }

  export namespace Subscription {
    export interface AdjustmentInterval {
      id: string;

      adjustment:
        | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
        | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
        | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
        | AdjustmentInterval.PlanPhaseMinimumAdjustment
        | AdjustmentInterval.PlanPhaseMaximumAdjustment;

      /**
       * The price interval IDs that this adjustment applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      /**
       * The end date of the adjustment interval.
       */
      end_date: string | null;

      /**
       * The start date of the adjustment interval.
       */
      start_date: string;
    }

    export namespace AdjustmentInterval {
      export interface PlanPhaseUsageDiscountAdjustment {
        id: string;

        adjustment_type: 'usage_discount';

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;

        /**
         * The number of usage units by which to discount the price this adjustment applies
         * to in a given billing period.
         */
        usage_discount: number;
      }

      export interface PlanPhaseAmountDiscountAdjustment {
        id: string;

        adjustment_type: 'amount_discount';

        /**
         * The amount by which to discount the prices this adjustment applies to in a given
         * billing period.
         */
        amount_discount: string;

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;
      }

      export interface PlanPhasePercentageDiscountAdjustment {
        id: string;

        adjustment_type: 'percentage_discount';

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The percentage (as a value between 0 and 1) by which to discount the price
         * intervals this adjustment applies to in a given billing period.
         */
        percentage_discount: number;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;
      }

      export interface PlanPhaseMinimumAdjustment {
        id: string;

        adjustment_type: 'minimum';

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The item ID that revenue from this minimum will be attributed to.
         */
        item_id: string;

        /**
         * The minimum amount to charge in a given billing period for the prices this
         * adjustment applies to.
         */
        minimum_amount: string;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;
      }

      export interface PlanPhaseMaximumAdjustment {
        id: string;

        adjustment_type: 'maximum';

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The maximum amount to charge in a given billing period for the prices this
         * adjustment applies to.
         */
        maximum_amount: string;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;
      }
    }

    export interface BillingCycleAnchorConfiguration {
      /**
       * The day of the month on which the billing cycle is anchored. If the maximum
       * number of days in a month is greater than this value, the last day of the month
       * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
       * period begins on the 30th.
       */
      day: number;

      /**
       * The month on which the billing cycle is anchored (e.g. a quarterly price
       * anchored in February would have cycles starting February, May, August, and
       * November).
       */
      month?: number | null;

      /**
       * The year on which the billing cycle is anchored (e.g. a 2 year billing cycle
       * anchored on 2021 would have cycles starting on 2021, 2023, 2025, etc.).
       */
      year?: number | null;
    }

    export interface AmountDiscountInterval {
      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount: string;

      /**
       * The price ids that this discount interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this discount interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      discount_type: 'amount';

      /**
       * The end date of the discount interval.
       */
      end_date: string | null;

      /**
       * The start date of the discount interval.
       */
      start_date: string;
    }

    export interface PercentageDiscountInterval {
      /**
       * The price ids that this discount interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this discount interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      discount_type: 'percentage';

      /**
       * The end date of the discount interval.
       */
      end_date: string | null;

      /**
       * Only available if discount_type is `percentage`.This is a number between 0
       * and 1.
       */
      percentage_discount: number;

      /**
       * The start date of the discount interval.
       */
      start_date: string;
    }

    export interface UsageDiscountInterval {
      /**
       * The price ids that this discount interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this discount interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      discount_type: 'usage';

      /**
       * The end date of the discount interval.
       */
      end_date: string | null;

      /**
       * The start date of the discount interval.
       */
      start_date: string;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount: number;
    }

    export interface FixedFeeQuantitySchedule {
      end_date: string | null;

      price_id: string;

      quantity: number;

      start_date: string;
    }

    export interface MaximumInterval {
      /**
       * The price ids that this maximum interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this maximum interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      /**
       * The end date of the maximum interval.
       */
      end_date: string | null;

      /**
       * The maximum amount to charge in a given billing period for the price intervals
       * this transform applies to.
       */
      maximum_amount: string;

      /**
       * The start date of the maximum interval.
       */
      start_date: string;
    }

    export interface MinimumInterval {
      /**
       * The price ids that this minimum interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this minimum interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      /**
       * The end date of the minimum interval.
       */
      end_date: string | null;

      /**
       * The minimum amount to charge in a given billing period for the price intervals
       * this minimum applies to.
       */
      minimum_amount: string;

      /**
       * The start date of the minimum interval.
       */
      start_date: string;
    }

    /**
     * A pending subscription change if one exists on this subscription.
     */
    export interface PendingSubscriptionChange {
      id: string;
    }

    /**
     * The Price Interval resource represents a period of time for which a price will
     * bill on a subscription. A subscription’s price intervals define its billing
     * behavior.
     */
    export interface PriceInterval {
      id: string;

      /**
       * The day of the month that Orb bills for this price
       */
      billing_cycle_day: number;

      /**
       * The end of the current billing period. This is an exclusive timestamp, such that
       * the instant returned is exactly the end of the billing period. Set to null if
       * this price interval is not currently active.
       */
      current_billing_period_end_date: string | null;

      /**
       * The start date of the current billing period. This is an inclusive timestamp;
       * the instant returned is exactly the beginning of the billing period. Set to null
       * if this price interval is not currently active.
       */
      current_billing_period_start_date: string | null;

      /**
       * The end date of the price interval. This is the date that Orb stops billing for
       * this price.
       */
      end_date: string | null;

      /**
       * An additional filter to apply to usage queries.
       */
      filter: string | null;

      /**
       * The fixed fee quantity transitions for this price interval. This is only
       * relevant for fixed fees.
       */
      fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

      /**
       * The Price resource represents a price that can be billed on a subscription,
       * resulting in a charge on an invoice in the form of an invoice line item. Prices
       * take a quantity and determine an amount to bill.
       *
       * Orb supports a few different pricing models out of the box. Each of these models
       * is serialized differently in a given Price object. The model_type field
       * determines the key for the configuration object that is present.
       *
       * For more on the types of prices, see
       * [the core concepts documentation](/core-concepts#plan-and-price)
       */
      price: PricesAPI.Price;

      /**
       * The start date of the price interval. This is the date that Orb starts billing
       * for this price.
       */
      start_date: string;

      /**
       * A list of customer IDs whose usage events will be aggregated and billed under
       * this price interval.
       */
      usage_customer_ids: Array<string> | null;
    }

    export namespace PriceInterval {
      export interface FixedFeeQuantityTransition {
        effective_date: string;

        price_id: string;

        quantity: number;
      }
    }

    export interface RedeemedCoupon {
      coupon_id: string;

      end_date: string | null;

      start_date: string;
    }

    export interface TrialInfo {
      end_date: string | null;
    }

    /**
     * The resources that were changed as part of this operation. Only present when
     * fetched through the subscription changes API or if the
     * `include_changed_resources` parameter was passed in the request.
     */
    export interface ChangedResources {
      /**
       * The credit notes that were created as part of this operation.
       */
      created_credit_notes: Array<CreditNotesAPI.CreditNote>;

      /**
       * The invoices that were created as part of this operation.
       */
      created_invoices: Array<InvoicesAPI.Invoice>;

      /**
       * The credit notes that were voided as part of this operation.
       */
      voided_credit_notes: Array<CreditNotesAPI.CreditNote>;

      /**
       * The invoices that were voided as part of this operation.
       */
      voided_invoices: Array<InvoicesAPI.Invoice>;
    }
  }
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
   * Subscription change will be cancelled at this time and can no longer be applied.
   */
  expiration_time: string;

  status: 'pending' | 'applied' | 'cancelled';

  subscription: SubscriptionChangeApplyResponse.Subscription | null;

  /**
   * When this change was applied.
   */
  applied_at?: string | null;

  /**
   * When this change was cancelled.
   */
  cancelled_at?: string | null;
}

export namespace SubscriptionChangeApplyResponse {
  export interface Subscription {
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
    adjustment_intervals: Array<Subscription.AdjustmentInterval>;

    /**
     * Determines whether issued invoices for this subscription will automatically be
     * charged with the saved payment method on the due date. This property defaults to
     * the plan's behavior. If null, defaults to the customer's setting.
     */
    auto_collection: boolean | null;

    billing_cycle_anchor_configuration: Subscription.BillingCycleAnchorConfiguration;

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
     * The discount intervals for this subscription sorted by the start_date.
     */
    discount_intervals: Array<
      | Subscription.AmountDiscountInterval
      | Subscription.PercentageDiscountInterval
      | Subscription.UsageDiscountInterval
    >;

    /**
     * The date Orb stops billing for this subscription.
     */
    end_date: string | null;

    fixed_fee_quantity_schedule: Array<Subscription.FixedFeeQuantitySchedule>;

    invoicing_threshold: string | null;

    /**
     * The maximum intervals for this subscription sorted by the start_date.
     */
    maximum_intervals: Array<Subscription.MaximumInterval>;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * The minimum intervals for this subscription sorted by the start_date.
     */
    minimum_intervals: Array<Subscription.MinimumInterval>;

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
    pending_subscription_change: Subscription.PendingSubscriptionChange | null;

    /**
     * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
     * subscribed to by a customer. Plans define the billing behavior of the
     * subscription. You can see more about how to configure prices in the
     * [Price resource](/reference/price).
     */
    plan: PlansAPI.Plan;

    /**
     * The price intervals for this subscription.
     */
    price_intervals: Array<Subscription.PriceInterval>;

    redeemed_coupon: Subscription.RedeemedCoupon | null;

    /**
     * The date Orb starts billing for this subscription.
     */
    start_date: string;

    status: 'active' | 'ended' | 'upcoming';

    trial_info: Subscription.TrialInfo;

    /**
     * The resources that were changed as part of this operation. Only present when
     * fetched through the subscription changes API or if the
     * `include_changed_resources` parameter was passed in the request.
     */
    changed_resources?: Subscription.ChangedResources | null;
  }

  export namespace Subscription {
    export interface AdjustmentInterval {
      id: string;

      adjustment:
        | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
        | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
        | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
        | AdjustmentInterval.PlanPhaseMinimumAdjustment
        | AdjustmentInterval.PlanPhaseMaximumAdjustment;

      /**
       * The price interval IDs that this adjustment applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      /**
       * The end date of the adjustment interval.
       */
      end_date: string | null;

      /**
       * The start date of the adjustment interval.
       */
      start_date: string;
    }

    export namespace AdjustmentInterval {
      export interface PlanPhaseUsageDiscountAdjustment {
        id: string;

        adjustment_type: 'usage_discount';

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;

        /**
         * The number of usage units by which to discount the price this adjustment applies
         * to in a given billing period.
         */
        usage_discount: number;
      }

      export interface PlanPhaseAmountDiscountAdjustment {
        id: string;

        adjustment_type: 'amount_discount';

        /**
         * The amount by which to discount the prices this adjustment applies to in a given
         * billing period.
         */
        amount_discount: string;

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;
      }

      export interface PlanPhasePercentageDiscountAdjustment {
        id: string;

        adjustment_type: 'percentage_discount';

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The percentage (as a value between 0 and 1) by which to discount the price
         * intervals this adjustment applies to in a given billing period.
         */
        percentage_discount: number;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;
      }

      export interface PlanPhaseMinimumAdjustment {
        id: string;

        adjustment_type: 'minimum';

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The item ID that revenue from this minimum will be attributed to.
         */
        item_id: string;

        /**
         * The minimum amount to charge in a given billing period for the prices this
         * adjustment applies to.
         */
        minimum_amount: string;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;
      }

      export interface PlanPhaseMaximumAdjustment {
        id: string;

        adjustment_type: 'maximum';

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The maximum amount to charge in a given billing period for the prices this
         * adjustment applies to.
         */
        maximum_amount: string;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;
      }
    }

    export interface BillingCycleAnchorConfiguration {
      /**
       * The day of the month on which the billing cycle is anchored. If the maximum
       * number of days in a month is greater than this value, the last day of the month
       * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
       * period begins on the 30th.
       */
      day: number;

      /**
       * The month on which the billing cycle is anchored (e.g. a quarterly price
       * anchored in February would have cycles starting February, May, August, and
       * November).
       */
      month?: number | null;

      /**
       * The year on which the billing cycle is anchored (e.g. a 2 year billing cycle
       * anchored on 2021 would have cycles starting on 2021, 2023, 2025, etc.).
       */
      year?: number | null;
    }

    export interface AmountDiscountInterval {
      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount: string;

      /**
       * The price ids that this discount interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this discount interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      discount_type: 'amount';

      /**
       * The end date of the discount interval.
       */
      end_date: string | null;

      /**
       * The start date of the discount interval.
       */
      start_date: string;
    }

    export interface PercentageDiscountInterval {
      /**
       * The price ids that this discount interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this discount interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      discount_type: 'percentage';

      /**
       * The end date of the discount interval.
       */
      end_date: string | null;

      /**
       * Only available if discount_type is `percentage`.This is a number between 0
       * and 1.
       */
      percentage_discount: number;

      /**
       * The start date of the discount interval.
       */
      start_date: string;
    }

    export interface UsageDiscountInterval {
      /**
       * The price ids that this discount interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this discount interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      discount_type: 'usage';

      /**
       * The end date of the discount interval.
       */
      end_date: string | null;

      /**
       * The start date of the discount interval.
       */
      start_date: string;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount: number;
    }

    export interface FixedFeeQuantitySchedule {
      end_date: string | null;

      price_id: string;

      quantity: number;

      start_date: string;
    }

    export interface MaximumInterval {
      /**
       * The price ids that this maximum interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this maximum interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      /**
       * The end date of the maximum interval.
       */
      end_date: string | null;

      /**
       * The maximum amount to charge in a given billing period for the price intervals
       * this transform applies to.
       */
      maximum_amount: string;

      /**
       * The start date of the maximum interval.
       */
      start_date: string;
    }

    export interface MinimumInterval {
      /**
       * The price ids that this minimum interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this minimum interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      /**
       * The end date of the minimum interval.
       */
      end_date: string | null;

      /**
       * The minimum amount to charge in a given billing period for the price intervals
       * this minimum applies to.
       */
      minimum_amount: string;

      /**
       * The start date of the minimum interval.
       */
      start_date: string;
    }

    /**
     * A pending subscription change if one exists on this subscription.
     */
    export interface PendingSubscriptionChange {
      id: string;
    }

    /**
     * The Price Interval resource represents a period of time for which a price will
     * bill on a subscription. A subscription’s price intervals define its billing
     * behavior.
     */
    export interface PriceInterval {
      id: string;

      /**
       * The day of the month that Orb bills for this price
       */
      billing_cycle_day: number;

      /**
       * The end of the current billing period. This is an exclusive timestamp, such that
       * the instant returned is exactly the end of the billing period. Set to null if
       * this price interval is not currently active.
       */
      current_billing_period_end_date: string | null;

      /**
       * The start date of the current billing period. This is an inclusive timestamp;
       * the instant returned is exactly the beginning of the billing period. Set to null
       * if this price interval is not currently active.
       */
      current_billing_period_start_date: string | null;

      /**
       * The end date of the price interval. This is the date that Orb stops billing for
       * this price.
       */
      end_date: string | null;

      /**
       * An additional filter to apply to usage queries.
       */
      filter: string | null;

      /**
       * The fixed fee quantity transitions for this price interval. This is only
       * relevant for fixed fees.
       */
      fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

      /**
       * The Price resource represents a price that can be billed on a subscription,
       * resulting in a charge on an invoice in the form of an invoice line item. Prices
       * take a quantity and determine an amount to bill.
       *
       * Orb supports a few different pricing models out of the box. Each of these models
       * is serialized differently in a given Price object. The model_type field
       * determines the key for the configuration object that is present.
       *
       * For more on the types of prices, see
       * [the core concepts documentation](/core-concepts#plan-and-price)
       */
      price: PricesAPI.Price;

      /**
       * The start date of the price interval. This is the date that Orb starts billing
       * for this price.
       */
      start_date: string;

      /**
       * A list of customer IDs whose usage events will be aggregated and billed under
       * this price interval.
       */
      usage_customer_ids: Array<string> | null;
    }

    export namespace PriceInterval {
      export interface FixedFeeQuantityTransition {
        effective_date: string;

        price_id: string;

        quantity: number;
      }
    }

    export interface RedeemedCoupon {
      coupon_id: string;

      end_date: string | null;

      start_date: string;
    }

    export interface TrialInfo {
      end_date: string | null;
    }

    /**
     * The resources that were changed as part of this operation. Only present when
     * fetched through the subscription changes API or if the
     * `include_changed_resources` parameter was passed in the request.
     */
    export interface ChangedResources {
      /**
       * The credit notes that were created as part of this operation.
       */
      created_credit_notes: Array<CreditNotesAPI.CreditNote>;

      /**
       * The invoices that were created as part of this operation.
       */
      created_invoices: Array<InvoicesAPI.Invoice>;

      /**
       * The credit notes that were voided as part of this operation.
       */
      voided_credit_notes: Array<CreditNotesAPI.CreditNote>;

      /**
       * The invoices that were voided as part of this operation.
       */
      voided_invoices: Array<InvoicesAPI.Invoice>;
    }
  }
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
   * Subscription change will be cancelled at this time and can no longer be applied.
   */
  expiration_time: string;

  status: 'pending' | 'applied' | 'cancelled';

  subscription: SubscriptionChangeCancelResponse.Subscription | null;

  /**
   * When this change was applied.
   */
  applied_at?: string | null;

  /**
   * When this change was cancelled.
   */
  cancelled_at?: string | null;
}

export namespace SubscriptionChangeCancelResponse {
  export interface Subscription {
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
    adjustment_intervals: Array<Subscription.AdjustmentInterval>;

    /**
     * Determines whether issued invoices for this subscription will automatically be
     * charged with the saved payment method on the due date. This property defaults to
     * the plan's behavior. If null, defaults to the customer's setting.
     */
    auto_collection: boolean | null;

    billing_cycle_anchor_configuration: Subscription.BillingCycleAnchorConfiguration;

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
     * The discount intervals for this subscription sorted by the start_date.
     */
    discount_intervals: Array<
      | Subscription.AmountDiscountInterval
      | Subscription.PercentageDiscountInterval
      | Subscription.UsageDiscountInterval
    >;

    /**
     * The date Orb stops billing for this subscription.
     */
    end_date: string | null;

    fixed_fee_quantity_schedule: Array<Subscription.FixedFeeQuantitySchedule>;

    invoicing_threshold: string | null;

    /**
     * The maximum intervals for this subscription sorted by the start_date.
     */
    maximum_intervals: Array<Subscription.MaximumInterval>;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * The minimum intervals for this subscription sorted by the start_date.
     */
    minimum_intervals: Array<Subscription.MinimumInterval>;

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
    pending_subscription_change: Subscription.PendingSubscriptionChange | null;

    /**
     * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
     * subscribed to by a customer. Plans define the billing behavior of the
     * subscription. You can see more about how to configure prices in the
     * [Price resource](/reference/price).
     */
    plan: PlansAPI.Plan;

    /**
     * The price intervals for this subscription.
     */
    price_intervals: Array<Subscription.PriceInterval>;

    redeemed_coupon: Subscription.RedeemedCoupon | null;

    /**
     * The date Orb starts billing for this subscription.
     */
    start_date: string;

    status: 'active' | 'ended' | 'upcoming';

    trial_info: Subscription.TrialInfo;

    /**
     * The resources that were changed as part of this operation. Only present when
     * fetched through the subscription changes API or if the
     * `include_changed_resources` parameter was passed in the request.
     */
    changed_resources?: Subscription.ChangedResources | null;
  }

  export namespace Subscription {
    export interface AdjustmentInterval {
      id: string;

      adjustment:
        | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
        | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
        | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
        | AdjustmentInterval.PlanPhaseMinimumAdjustment
        | AdjustmentInterval.PlanPhaseMaximumAdjustment;

      /**
       * The price interval IDs that this adjustment applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      /**
       * The end date of the adjustment interval.
       */
      end_date: string | null;

      /**
       * The start date of the adjustment interval.
       */
      start_date: string;
    }

    export namespace AdjustmentInterval {
      export interface PlanPhaseUsageDiscountAdjustment {
        id: string;

        adjustment_type: 'usage_discount';

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;

        /**
         * The number of usage units by which to discount the price this adjustment applies
         * to in a given billing period.
         */
        usage_discount: number;
      }

      export interface PlanPhaseAmountDiscountAdjustment {
        id: string;

        adjustment_type: 'amount_discount';

        /**
         * The amount by which to discount the prices this adjustment applies to in a given
         * billing period.
         */
        amount_discount: string;

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;
      }

      export interface PlanPhasePercentageDiscountAdjustment {
        id: string;

        adjustment_type: 'percentage_discount';

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The percentage (as a value between 0 and 1) by which to discount the price
         * intervals this adjustment applies to in a given billing period.
         */
        percentage_discount: number;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;
      }

      export interface PlanPhaseMinimumAdjustment {
        id: string;

        adjustment_type: 'minimum';

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The item ID that revenue from this minimum will be attributed to.
         */
        item_id: string;

        /**
         * The minimum amount to charge in a given billing period for the prices this
         * adjustment applies to.
         */
        minimum_amount: string;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;
      }

      export interface PlanPhaseMaximumAdjustment {
        id: string;

        adjustment_type: 'maximum';

        /**
         * The price IDs that this adjustment applies to.
         */
        applies_to_price_ids: Array<string>;

        /**
         * True for adjustments that apply to an entire invocice, false for adjustments
         * that apply to only one price.
         */
        is_invoice_level: boolean;

        /**
         * The maximum amount to charge in a given billing period for the prices this
         * adjustment applies to.
         */
        maximum_amount: string;

        /**
         * The plan phase in which this adjustment is active.
         */
        plan_phase_order: number | null;

        /**
         * The reason for the adjustment.
         */
        reason: string | null;
      }
    }

    export interface BillingCycleAnchorConfiguration {
      /**
       * The day of the month on which the billing cycle is anchored. If the maximum
       * number of days in a month is greater than this value, the last day of the month
       * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
       * period begins on the 30th.
       */
      day: number;

      /**
       * The month on which the billing cycle is anchored (e.g. a quarterly price
       * anchored in February would have cycles starting February, May, August, and
       * November).
       */
      month?: number | null;

      /**
       * The year on which the billing cycle is anchored (e.g. a 2 year billing cycle
       * anchored on 2021 would have cycles starting on 2021, 2023, 2025, etc.).
       */
      year?: number | null;
    }

    export interface AmountDiscountInterval {
      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount: string;

      /**
       * The price ids that this discount interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this discount interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      discount_type: 'amount';

      /**
       * The end date of the discount interval.
       */
      end_date: string | null;

      /**
       * The start date of the discount interval.
       */
      start_date: string;
    }

    export interface PercentageDiscountInterval {
      /**
       * The price ids that this discount interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this discount interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      discount_type: 'percentage';

      /**
       * The end date of the discount interval.
       */
      end_date: string | null;

      /**
       * Only available if discount_type is `percentage`.This is a number between 0
       * and 1.
       */
      percentage_discount: number;

      /**
       * The start date of the discount interval.
       */
      start_date: string;
    }

    export interface UsageDiscountInterval {
      /**
       * The price ids that this discount interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this discount interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      discount_type: 'usage';

      /**
       * The end date of the discount interval.
       */
      end_date: string | null;

      /**
       * The start date of the discount interval.
       */
      start_date: string;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount: number;
    }

    export interface FixedFeeQuantitySchedule {
      end_date: string | null;

      price_id: string;

      quantity: number;

      start_date: string;
    }

    export interface MaximumInterval {
      /**
       * The price ids that this maximum interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this maximum interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      /**
       * The end date of the maximum interval.
       */
      end_date: string | null;

      /**
       * The maximum amount to charge in a given billing period for the price intervals
       * this transform applies to.
       */
      maximum_amount: string;

      /**
       * The start date of the maximum interval.
       */
      start_date: string;
    }

    export interface MinimumInterval {
      /**
       * The price ids that this minimum interval applies to.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The price interval ids that this minimum interval applies to.
       */
      applies_to_price_interval_ids: Array<string>;

      /**
       * The end date of the minimum interval.
       */
      end_date: string | null;

      /**
       * The minimum amount to charge in a given billing period for the price intervals
       * this minimum applies to.
       */
      minimum_amount: string;

      /**
       * The start date of the minimum interval.
       */
      start_date: string;
    }

    /**
     * A pending subscription change if one exists on this subscription.
     */
    export interface PendingSubscriptionChange {
      id: string;
    }

    /**
     * The Price Interval resource represents a period of time for which a price will
     * bill on a subscription. A subscription’s price intervals define its billing
     * behavior.
     */
    export interface PriceInterval {
      id: string;

      /**
       * The day of the month that Orb bills for this price
       */
      billing_cycle_day: number;

      /**
       * The end of the current billing period. This is an exclusive timestamp, such that
       * the instant returned is exactly the end of the billing period. Set to null if
       * this price interval is not currently active.
       */
      current_billing_period_end_date: string | null;

      /**
       * The start date of the current billing period. This is an inclusive timestamp;
       * the instant returned is exactly the beginning of the billing period. Set to null
       * if this price interval is not currently active.
       */
      current_billing_period_start_date: string | null;

      /**
       * The end date of the price interval. This is the date that Orb stops billing for
       * this price.
       */
      end_date: string | null;

      /**
       * An additional filter to apply to usage queries.
       */
      filter: string | null;

      /**
       * The fixed fee quantity transitions for this price interval. This is only
       * relevant for fixed fees.
       */
      fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

      /**
       * The Price resource represents a price that can be billed on a subscription,
       * resulting in a charge on an invoice in the form of an invoice line item. Prices
       * take a quantity and determine an amount to bill.
       *
       * Orb supports a few different pricing models out of the box. Each of these models
       * is serialized differently in a given Price object. The model_type field
       * determines the key for the configuration object that is present.
       *
       * For more on the types of prices, see
       * [the core concepts documentation](/core-concepts#plan-and-price)
       */
      price: PricesAPI.Price;

      /**
       * The start date of the price interval. This is the date that Orb starts billing
       * for this price.
       */
      start_date: string;

      /**
       * A list of customer IDs whose usage events will be aggregated and billed under
       * this price interval.
       */
      usage_customer_ids: Array<string> | null;
    }

    export namespace PriceInterval {
      export interface FixedFeeQuantityTransition {
        effective_date: string;

        price_id: string;

        quantity: number;
      }
    }

    export interface RedeemedCoupon {
      coupon_id: string;

      end_date: string | null;

      start_date: string;
    }

    export interface TrialInfo {
      end_date: string | null;
    }

    /**
     * The resources that were changed as part of this operation. Only present when
     * fetched through the subscription changes API or if the
     * `include_changed_resources` parameter was passed in the request.
     */
    export interface ChangedResources {
      /**
       * The credit notes that were created as part of this operation.
       */
      created_credit_notes: Array<CreditNotesAPI.CreditNote>;

      /**
       * The invoices that were created as part of this operation.
       */
      created_invoices: Array<InvoicesAPI.Invoice>;

      /**
       * The credit notes that were voided as part of this operation.
       */
      voided_credit_notes: Array<CreditNotesAPI.CreditNote>;

      /**
       * The invoices that were voided as part of this operation.
       */
      voided_invoices: Array<InvoicesAPI.Invoice>;
    }
  }
}

export interface SubscriptionChangeApplyParams {
  /**
   * Description to apply to the balance transaction representing this credit.
   */
  description?: string | null;

  /**
   * Amount already collected to apply to the customer's balance.
   */
  previously_collected_amount?: string | null;
}

export declare namespace SubscriptionChanges {
  export {
    type SubscriptionChangeRetrieveResponse as SubscriptionChangeRetrieveResponse,
    type SubscriptionChangeApplyResponse as SubscriptionChangeApplyResponse,
    type SubscriptionChangeCancelResponse as SubscriptionChangeCancelResponse,
    type SubscriptionChangeApplyParams as SubscriptionChangeApplyParams,
  };
}
