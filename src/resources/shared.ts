// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';
import { Page } from '../pagination';

export type AddCreditLedgerEntryRequest =
  | AddCreditLedgerEntryRequest.AddIncrementCreditLedgerEntryRequestParams
  | AddCreditLedgerEntryRequest.AddDecrementCreditLedgerEntryRequestParams
  | AddCreditLedgerEntryRequest.AddExpirationChangeCreditLedgerEntryRequestParams
  | AddCreditLedgerEntryRequest.AddVoidCreditLedgerEntryRequestParams
  | AddCreditLedgerEntryRequest.AddAmendmentCreditLedgerEntryRequestParams;

export namespace AddCreditLedgerEntryRequest {
  export interface AddIncrementCreditLedgerEntryRequestParams {
    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement, void, or undo operations.
     */
    amount: number;

    entry_type: 'increment';

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * An ISO 8601 format date that denotes when this credit balance should become
     * available for use.
     */
    effective_date?: string | null;

    /**
     * An ISO 8601 format date that denotes when this credit balance should expire.
     */
    expiry_date?: string | null;

    /**
     * Passing `invoice_settings` automatically generates an invoice for the newly
     * added credits. If `invoice_settings` is passed, you must specify
     * per_unit_cost_basis, as the calculation of the invoice total is done on that
     * basis.
     */
    invoice_settings?: AddIncrementCreditLedgerEntryRequestParams.InvoiceSettings | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * Can only be specified when entry_type=increment. How much, in the customer's
     * currency, a customer paid for a single credit in this block
     */
    per_unit_cost_basis?: string | null;
  }

  export namespace AddIncrementCreditLedgerEntryRequestParams {
    /**
     * Passing `invoice_settings` automatically generates an invoice for the newly
     * added credits. If `invoice_settings` is passed, you must specify
     * per_unit_cost_basis, as the calculation of the invoice total is done on that
     * basis.
     */
    export interface InvoiceSettings {
      /**
       * Whether the credits purchase invoice should auto collect with the customer's
       * saved payment method.
       */
      auto_collection: boolean;

      /**
       * The net terms determines the difference between the invoice date and the issue
       * date for the invoice. If you intend the invoice to be due on issue, set this
       * to 0.
       */
      net_terms: number;

      /**
       * An optional memo to display on the invoice.
       */
      memo?: string | null;

      /**
       * If true, the new credit block will require that the corresponding invoice is
       * paid before it can be drawn down from.
       */
      require_successful_payment?: boolean;
    }
  }

  export interface AddDecrementCreditLedgerEntryRequestParams {
    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement, void, or undo operations.
     */
    amount: number;

    entry_type: 'decrement';

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface AddExpirationChangeCreditLedgerEntryRequestParams {
    entry_type: 'expiration_change';

    /**
     * An ISO 8601 format date that identifies the origination credit block to expire
     */
    expiry_date: string | null;

    /**
     * A future date (specified in YYYY-MM-DD format) used for expiration change,
     * denoting when credits transferred (as part of a partial block expiration) should
     * expire.
     */
    target_expiry_date: string;

    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement, void, or undo operations.
     */
    amount?: number | null;

    /**
     * The ID of the block affected by an expiration_change, used to differentiate
     * between multiple blocks with the same `expiry_date`.
     */
    block_id?: string | null;

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface AddVoidCreditLedgerEntryRequestParams {
    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement, void, or undo operations.
     */
    amount: number;

    /**
     * The ID of the block to void.
     */
    block_id: string;

    entry_type: 'void';

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * Can only be specified when `entry_type=void`. The reason for the void.
     */
    void_reason?: 'refund' | null;
  }

  export interface AddAmendmentCreditLedgerEntryRequestParams {
    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement or void operations.
     */
    amount: number;

    /**
     * The ID of the block to reverse a decrement from.
     */
    block_id: string;

    entry_type: 'amendment';

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }
}

export interface AddCreditTopUpRequest {
  /**
   * The amount to increment when the threshold is reached.
   */
  amount: string;

  /**
   * The currency or custom pricing unit to use for this top-up. If this is a
   * real-world currency, it must match the customer's invoicing currency.
   */
  currency: string;

  /**
   * Settings for invoices generated by triggered top-ups.
   */
  invoice_settings: AddCreditTopUpRequest.InvoiceSettings;

  /**
   * How much, in the customer's currency, to charge for each unit.
   */
  per_unit_cost_basis: string;

  /**
   * The threshold at which to trigger the top-up. If the balance is at or below this
   * threshold, the top-up will be triggered.
   */
  threshold: string;

  /**
   * The date from which the top-up is active. If unspecified, the top-up is active
   * immediately.
   */
  active_from?: string | null;

  /**
   * The number of days or months after which the top-up expires. If unspecified, it
   * does not expire.
   */
  expires_after?: number | null;

  /**
   * The unit of expires_after.
   */
  expires_after_unit?: 'day' | 'month' | null;
}

export namespace AddCreditTopUpRequest {
  /**
   * Settings for invoices generated by triggered top-ups.
   */
  export interface InvoiceSettings {
    /**
     * Whether the credits purchase invoice should auto collect with the customer's
     * saved payment method.
     */
    auto_collection: boolean;

    /**
     * The net terms determines the difference between the invoice date and the issue
     * date for the invoice. If you intend the invoice to be due on issue, set this
     * to 0.
     */
    net_terms: number;

    /**
     * An optional memo to display on the invoice.
     */
    memo?: string | null;

    /**
     * If true, new credit blocks created by this top-up will require that the
     * corresponding invoice is paid before they can be drawn down from.
     */
    require_successful_payment?: boolean;
  }
}

export interface AddSubscriptionAdjustmentParams {
  /**
   * The definition of a new adjustment to create and add to the subscription.
   */
  adjustment: NewAdjustmentModel;

  /**
   * The end date of the adjustment interval. This is the date that the adjustment
   * will stop affecting prices on the subscription.
   */
  end_date?: string | null;

  /**
   * The phase to add this adjustment to.
   */
  plan_phase_order?: number | null;

  /**
   * The start date of the adjustment interval. This is the date that the adjustment
   * will start affecting prices on the subscription. If null, the adjustment will
   * start when the phase or subscription starts.
   */
  start_date?: string | null;
}

export interface AddSubscriptionPriceParams {
  /**
   * The definition of a new allocation price to create and add to the subscription.
   */
  allocation_price?: NewAllocationPriceModel | null;

  /**
   * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's
   * discounts for this price.
   */
  discounts?: Array<DiscountOverrideModel> | null;

  /**
   * The end date of the price interval. This is the date that the price will stop
   * billing on the subscription. If null, billing will end when the phase or
   * subscription ends.
   */
  end_date?: string | null;

  /**
   * The external price id of the price to add to the subscription.
   */
  external_price_id?: string | null;

  /**
   * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's maximum
   * amount for this price.
   */
  maximum_amount?: string | null;

  /**
   * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's minimum
   * amount for this price.
   */
  minimum_amount?: string | null;

  /**
   * The phase to add this price to.
   */
  plan_phase_order?: number | null;

  /**
   * The definition of a new price to create and add to the subscription.
   */
  price?: NewSubscriptionPriceModel | null;

  /**
   * The id of the price to add to the subscription.
   */
  price_id?: string | null;

  /**
   * The start date of the price interval. This is the date that the price will start
   * billing on the subscription. If null, billing will start when the phase or
   * subscription starts.
   */
  start_date?: string | null;
}

export interface AddressInputModel {
  city?: string | null;

  country?: string | null;

  line1?: string | null;

  line2?: string | null;

  postal_code?: string | null;

  state?: string | null;
}

export interface AddressModel {
  city: string | null;

  country: string | null;

  line1: string | null;

  line2: string | null;

  postal_code: string | null;

  state: string | null;
}

export interface AdjustmentIntervalModel {
  id: string;

  adjustment: AdjustmentModel;

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

export type AdjustmentModel =
  | AdjustmentModel.PlanPhaseUsageDiscountAdjustment
  | AdjustmentModel.PlanPhaseAmountDiscountAdjustment
  | AdjustmentModel.PlanPhasePercentageDiscountAdjustment
  | AdjustmentModel.PlanPhaseMinimumAdjustment
  | AdjustmentModel.PlanPhaseMaximumAdjustment;

export namespace AdjustmentModel {
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

export interface AffectedBlockModel {
  id: string;

  expiry_date: string | null;

  per_unit_cost_basis: string | null;
}

export interface AggregatedCostModel {
  per_price_costs: Array<AggregatedCostModel.PerPriceCost>;

  /**
   * Total costs for the timeframe, excluding any minimums and discounts.
   */
  subtotal: string;

  timeframe_end: string;

  timeframe_start: string;

  /**
   * Total costs for the timeframe, including any minimums and discounts.
   */
  total: string;
}

export namespace AggregatedCostModel {
  export interface PerPriceCost {
    /**
     * The price object
     */
    price: Shared.PriceModel;

    /**
     * The price the cost is associated with
     */
    price_id: string;

    /**
     * Price's contributions for the timeframe, excluding any minimums and discounts.
     */
    subtotal: string;

    /**
     * Price's contributions for the timeframe, including minimums and discounts.
     */
    total: string;

    /**
     * The price's quantity for the timeframe
     */
    quantity?: number | null;
  }
}

/**
 * [Alerts within Orb](/product-catalog/configuring-alerts) monitor spending,
 * usage, or credit balance and trigger webhooks when a threshold is exceeded.
 *
 * Alerts created through the API can be scoped to either customers or
 * subscriptions.
 */
export interface AlertModel {
  /**
   * Also referred to as alert_id in this documentation.
   */
  id: string;

  /**
   * The creation time of the resource in Orb.
   */
  created_at: string;

  /**
   * The name of the currency the credit balance or invoice cost is denominated in.
   */
  currency: string | null;

  /**
   * The customer the alert applies to.
   */
  customer: CustomerMinifiedModel | null;

  /**
   * Whether the alert is enabled or disabled.
   */
  enabled: boolean;

  /**
   * The metric the alert applies to.
   */
  metric: AlertModel.Metric | null;

  /**
   * The plan the alert applies to.
   */
  plan: AlertModel.Plan | null;

  /**
   * The subscription the alert applies to.
   */
  subscription: SubscriptionMinifiedModel | null;

  /**
   * The thresholds that define the conditions under which the alert will be
   * triggered.
   */
  thresholds: Array<ThresholdModel> | null;

  /**
   * The type of alert. This must be a valid alert type.
   */
  type:
    | 'usage_exceeded'
    | 'cost_exceeded'
    | 'credit_balance_depleted'
    | 'credit_balance_dropped'
    | 'credit_balance_recovered';
}

export namespace AlertModel {
  /**
   * The metric the alert applies to.
   */
  export interface Metric {
    id: string;
  }

  /**
   * The plan the alert applies to.
   */
  export interface Plan {
    id: string | null;

    /**
     * An optional user-defined ID for this plan resource, used throughout the system
     * as an alias for this Plan. Use this field to identify a plan by an existing
     * identifier in your system.
     */
    external_plan_id: string | null;

    name: string | null;

    plan_version: string;
  }
}

export interface AllocationModel {
  allows_rollover: boolean;

  currency: string;
}

export interface AmountDiscount {
  /**
   * Only available if discount_type is `amount`.
   */
  amount_discount: string;

  /**
   * List of price_ids that this discount applies to. For plan/plan phase discounts,
   * this can be a subset of prices.
   */
  applies_to_price_ids: Array<string>;

  discount_type: 'amount';

  reason?: string | null;
}

export interface AmountDiscountIntervalModel {
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

export interface AmountDiscountModel {
  /**
   * Only available if discount_type is `amount`.
   */
  amount_discount: string;

  /**
   * List of price_ids that this discount applies to. For plan/plan phase discounts,
   * this can be a subset of prices.
   */
  applies_to_price_ids: Array<string>;

  discount_type: 'amount';

  reason?: string | null;
}

export interface AutoCollectionModel {
  /**
   * True only if auto-collection is enabled for this invoice.
   */
  enabled: boolean | null;

  /**
   * If the invoice is scheduled for auto-collection, this field will reflect when
   * the next attempt will occur. If dunning has been exhausted, or auto-collection
   * is not enabled for this invoice, this field will be `null`.
   */
  next_attempt_at: string | null;

  /**
   * Number of auto-collection payment attempts.
   */
  num_attempts: number | null;

  /**
   * If Orb has ever attempted payment auto-collection for this invoice, this field
   * will reflect when that attempt occurred. In conjunction with `next_attempt_at`,
   * this can be used to tell whether the invoice is currently in dunning (that is,
   * `previously_attempted_at` is non-null, and `next_attempt_time` is non-null), or
   * if dunning has been exhausted (`previously_attempted_at` is non-null, but
   * `next_attempt_time` is null).
   */
  previously_attempted_at: string | null;
}

/**
 * A backfill represents an update to historical usage data, adding or replacing
 * events in a timeframe.
 */
export interface BackfillModel {
  id: string;

  /**
   * If in the future, the time at which the backfill will automatically close. If in
   * the past, the time at which the backfill was closed.
   */
  close_time: string | null;

  created_at: string;

  /**
   * The Orb-generated ID of the customer to which this backfill is scoped. If
   * `null`, this backfill is scoped to all customers.
   */
  customer_id: string | null;

  /**
   * The number of events ingested in this backfill.
   */
  events_ingested: number;

  /**
   * If `true`, existing events in the backfill's timeframe will be replaced with the
   * newly ingested events associated with the backfill. If `false`, newly ingested
   * events will be added to the existing events.
   */
  replace_existing_events: boolean;

  /**
   * The time at which this backfill was reverted.
   */
  reverted_at: string | null;

  /**
   * The status of the backfill.
   */
  status: 'pending' | 'reflected' | 'pending_revert' | 'reverted';

  timeframe_end: string;

  timeframe_start: string;

  /**
   * A boolean
   * [computed property](/extensibility/advanced-metrics#computed-properties) used to
   * filter the set of events to deprecate
   */
  deprecation_filter?: string | null;
}

/**
 * The Metric resource represents a calculation of a quantity based on events.
 * Metrics are defined by the query that transforms raw usage events into
 * meaningful values for your customers.
 */
export interface BillableMetricModel {
  id: string;

  description: string | null;

  /**
   * The Item resource represents a sellable product or good. Items are associated
   * with all line items, billable metrics, and prices and are used for defining
   * external sync behavior for invoices and tax calculation purposes.
   */
  item: ItemModel;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  name: string;

  status: 'active' | 'draft' | 'archived';
}

export interface BillableMetricSimpleModel {
  id: string;

  name: string;
}

export interface BillableMetricTinyModel {
  id: string;
}

export interface BillingCycleAnchorConfigurationModel {
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

export interface BillingCycleConfigurationModel {
  duration: number;

  duration_unit: 'day' | 'month';
}

export type BillingCycleRelativeDate = 'start_of_term' | 'end_of_term';

export interface BpsConfigModel {
  /**
   * Basis point take rate per event
   */
  bps: number;

  /**
   * Optional currency amount maximum to cap spend per event
   */
  per_unit_maximum?: string | null;
}

export interface BulkBpsConfigModel {
  /**
   * Tiers for a bulk BPS pricing model where all usage is aggregated to a single
   * tier based on total volume
   */
  tiers: Array<BulkBpsConfigModel.Tier>;
}

export namespace BulkBpsConfigModel {
  export interface Tier {
    /**
     * Basis points to rate on
     */
    bps: number;

    /**
     * Upper bound for tier
     */
    maximum_amount?: string | null;

    /**
     * The maximum amount to charge for any one event
     */
    per_unit_maximum?: string | null;
  }
}

export interface BulkConfigModel {
  /**
   * Bulk tiers for rating based on total usage volume
   */
  tiers: Array<BulkConfigModel.Tier>;
}

export namespace BulkConfigModel {
  export interface Tier {
    /**
     * Amount per unit
     */
    unit_amount: string;

    /**
     * Upper bound for this tier
     */
    maximum_units?: number | null;
  }
}

/**
 * A coupon represents a reusable discount configuration that can be applied either
 * as a fixed or percentage amount to an invoice or subscription. Coupons are
 * activated using a redemption code, which applies the discount to a subscription
 * or invoice. The duration of a coupon determines how long it remains available
 * for use by end users.
 */
export interface CouponModel {
  /**
   * Also referred to as coupon_id in this documentation.
   */
  id: string;

  /**
   * An archived coupon can no longer be redeemed. Active coupons will have a value
   * of null for `archived_at`; this field will be non-null for archived coupons.
   */
  archived_at: string | null;

  discount: PercentageDiscount | AmountDiscount;

  /**
   * This allows for a coupon's discount to apply for a limited time (determined in
   * months); a `null` value here means "unlimited time".
   */
  duration_in_months: number | null;

  /**
   * The maximum number of redemptions allowed for this coupon before it is
   * exhausted; `null` here means "unlimited".
   */
  max_redemptions: number | null;

  /**
   * This string can be used to redeem this coupon for a given subscription.
   */
  redemption_code: string;

  /**
   * The number of times this coupon has been redeemed.
   */
  times_redeemed: number;
}

export interface CouponRedemptionModel {
  coupon_id: string;

  end_date: string | null;

  start_date: string;
}

export interface CreateCustomerAlertRequest {
  /**
   * The case sensitive currency or custom pricing unit to use for this alert.
   */
  currency: string;

  /**
   * The type of alert to create. This must be a valid alert type.
   */
  type:
    | 'usage_exceeded'
    | 'cost_exceeded'
    | 'credit_balance_depleted'
    | 'credit_balance_dropped'
    | 'credit_balance_recovered';

  /**
   * The thresholds that define the values at which the alert will be triggered.
   */
  thresholds?: Array<ThresholdModel> | null;
}

export interface CreditLedgerEntriesModel {
  data: Array<CreditLedgerEntryModel>;

  pagination_metadata: PaginationMetadata;
}

/**
 * The [Credit Ledger Entry resource](/product-catalog/prepurchase) models prepaid
 * credits within Orb.
 */
export type CreditLedgerEntryModel =
  | CreditLedgerEntryModel.IncrementLedgerEntry
  | CreditLedgerEntryModel.DecrementLedgerEntry
  | CreditLedgerEntryModel.ExpirationChangeLedgerEntry
  | CreditLedgerEntryModel.CreditBlockExpiryLedgerEntry
  | CreditLedgerEntryModel.VoidLedgerEntry
  | CreditLedgerEntryModel.VoidInitiatedLedgerEntry
  | CreditLedgerEntryModel.AmendmentLedgerEntry;

export namespace CreditLedgerEntryModel {
  export interface IncrementLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: Shared.AffectedBlockModel;

    currency: string;

    customer: Shared.CustomerMinifiedModel;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'increment';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export interface DecrementLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: Shared.AffectedBlockModel;

    currency: string;

    customer: Shared.CustomerMinifiedModel;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'decrement';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;

    event_id?: string | null;

    invoice_id?: string | null;

    price_id?: string | null;
  }

  export interface ExpirationChangeLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: Shared.AffectedBlockModel;

    currency: string;

    customer: Shared.CustomerMinifiedModel;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'expiration_change';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    new_block_expiry_date: string | null;

    starting_balance: number;
  }

  export interface CreditBlockExpiryLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: Shared.AffectedBlockModel;

    currency: string;

    customer: Shared.CustomerMinifiedModel;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'credit_block_expiry';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export interface VoidLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: Shared.AffectedBlockModel;

    currency: string;

    customer: Shared.CustomerMinifiedModel;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'void';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;

    void_amount: number;

    void_reason: string | null;
  }

  export interface VoidInitiatedLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: Shared.AffectedBlockModel;

    currency: string;

    customer: Shared.CustomerMinifiedModel;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'void_initiated';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    new_block_expiry_date: string;

    starting_balance: number;

    void_amount: number;

    void_reason: string | null;
  }

  export interface AmendmentLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: Shared.AffectedBlockModel;

    currency: string;

    customer: Shared.CustomerMinifiedModel;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'amendment';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }
}

export interface CreditNoteDiscountModel {
  amount_applied: string;

  discount_type: 'percentage';

  percentage_discount: number;

  applies_to_prices?: Array<CreditNoteDiscountModel.AppliesToPrice> | null;

  reason?: string | null;
}

export namespace CreditNoteDiscountModel {
  export interface AppliesToPrice {
    id: string;

    name: string;
  }
}

/**
 * The [Credit Note](/invoicing/credit-notes) resource represents a credit that has
 * been applied to a particular invoice.
 */
export interface CreditNoteModel {
  /**
   * The Orb id of this credit note.
   */
  id: string;

  /**
   * The creation time of the resource in Orb.
   */
  created_at: string;

  /**
   * The unique identifier for credit notes.
   */
  credit_note_number: string;

  /**
   * A URL to a PDF of the credit note.
   */
  credit_note_pdf: string | null;

  customer: CustomerMinifiedModel;

  /**
   * The id of the invoice resource that this credit note is applied to.
   */
  invoice_id: string;

  /**
   * All of the line items associated with this credit note.
   */
  line_items: Array<CreditNoteModel.LineItem>;

  /**
   * The maximum amount applied on the original invoice
   */
  maximum_amount_adjustment: CreditNoteDiscountModel | null;

  /**
   * An optional memo supplied on the credit note.
   */
  memo: string | null;

  /**
   * Any credited amount from the applied minimum on the invoice.
   */
  minimum_amount_refunded: string | null;

  reason: 'Duplicate' | 'Fraudulent' | 'Order change' | 'Product unsatisfactory' | null;

  /**
   * The total prior to any creditable invoice-level discounts or minimums.
   */
  subtotal: string;

  /**
   * The total including creditable invoice-level discounts or minimums, and tax.
   */
  total: string;

  type: 'refund' | 'adjustment';

  /**
   * The time at which the credit note was voided in Orb, if applicable.
   */
  voided_at: string | null;

  /**
   * Any discounts applied on the original invoice.
   */
  discounts?: Array<CreditNoteDiscountModel>;
}

export namespace CreditNoteModel {
  export interface LineItem {
    /**
     * The Orb id of this resource.
     */
    id: string;

    /**
     * The amount of the line item, including any line item minimums and discounts.
     */
    amount: string;

    /**
     * The id of the item associated with this line item.
     */
    item_id: string;

    /**
     * The name of the corresponding invoice line item.
     */
    name: string;

    /**
     * An optional quantity credited.
     */
    quantity: number | null;

    /**
     * The amount of the line item, excluding any line item minimums and discounts.
     */
    subtotal: string;

    /**
     * Any tax amounts applied onto the line item.
     */
    tax_amounts: Array<Shared.TaxAmountModel>;

    /**
     * Any line item discounts from the invoice's line item.
     */
    discounts?: Array<LineItem.Discount>;
  }

  export namespace LineItem {
    export interface Discount {
      id: string;

      amount_applied: string;

      applies_to_price_ids: Array<string>;

      discount_type: 'percentage' | 'amount';

      percentage_discount: number;

      amount_discount?: string | null;

      reason?: string | null;
    }
  }
}

export interface CreditNoteSummaryModel {
  id: string;

  credit_note_number: string;

  /**
   * An optional memo supplied on the credit note.
   */
  memo: string | null;

  reason: string;

  total: string;

  type: string;

  /**
   * If the credit note has a status of `void`, this gives a timestamp when the
   * credit note was voided.
   */
  voided_at: string | null;
}

export type CustomRatingFunctionConfigModel = Record<string, unknown>;

export interface CustomerBalanceTransactionModel {
  /**
   * A unique id for this transaction.
   */
  id: string;

  action:
    | 'applied_to_invoice'
    | 'manual_adjustment'
    | 'prorated_refund'
    | 'revert_prorated_refund'
    | 'return_from_voiding'
    | 'credit_note_applied'
    | 'credit_note_voided'
    | 'overpayment_refund'
    | 'external_payment';

  /**
   * The value of the amount changed in the transaction.
   */
  amount: string;

  /**
   * The creation time of this transaction.
   */
  created_at: string;

  credit_note: CustomerBalanceTransactionModel.CreditNote | null;

  /**
   * An optional description provided for manual customer balance adjustments.
   */
  description: string | null;

  /**
   * The new value of the customer's balance prior to the transaction, in the
   * customer's currency.
   */
  ending_balance: string;

  invoice: CustomerBalanceTransactionModel.Invoice | null;

  /**
   * The original value of the customer's balance prior to the transaction, in the
   * customer's currency.
   */
  starting_balance: string;

  type: 'increment' | 'decrement';
}

export namespace CustomerBalanceTransactionModel {
  export interface CreditNote {
    /**
     * The id of the Credit note
     */
    id: string;
  }

  export interface Invoice {
    /**
     * The Invoice id
     */
    id: string;
  }
}

export interface CustomerCostsModel {
  data: Array<AggregatedCostModel>;
}

export interface CustomerCreditBalancesModel {
  data: Array<CustomerCreditBalancesModel.Data>;

  pagination_metadata: PaginationMetadata;
}

export namespace CustomerCreditBalancesModel {
  export interface Data {
    id: string;

    balance: number;

    effective_date: string | null;

    expiry_date: string | null;

    maximum_initial_balance: number | null;

    per_unit_cost_basis: string | null;

    status: 'active' | 'pending_payment';
  }
}

export interface CustomerHierarchyConfigModel {
  /**
   * A list of child customer IDs to add to the hierarchy. The desired child
   * customers must not already be part of another hierarchy.
   */
  child_customer_ids?: Array<string>;

  /**
   * The ID of the parent customer in the hierarchy. The desired parent customer must
   * not be a child of another customer.
   */
  parent_customer_id?: string | null;
}

export interface CustomerMinifiedModel {
  id: string;

  external_customer_id: string | null;
}

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
export interface CustomerModel {
  id: string;

  additional_emails: Array<string>;

  auto_collection: boolean;

  /**
   * The customer's current balance in their currency.
   */
  balance: string;

  billing_address: AddressModel | null;

  created_at: string;

  currency: string | null;

  /**
   * A valid customer email, to be used for notifications. When Orb triggers payment
   * through a payment gateway, this email will be used for any automatically issued
   * receipts.
   */
  email: string;

  email_delivery: boolean;

  exempt_from_automated_tax: boolean | null;

  /**
   * An optional user-defined ID for this customer resource, used throughout the
   * system as an alias for this Customer. Use this field to identify a customer by
   * an existing identifier in your system.
   */
  external_customer_id: string | null;

  /**
   * The hierarchical relationships for this customer.
   */
  hierarchy: CustomerModel.Hierarchy;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The full name of the customer
   */
  name: string;

  /**
   * This is used for creating charges or invoices in an external system via Orb.
   * When not in test mode, the connection must first be configured in the Orb
   * webapp.
   */
  payment_provider: 'quickbooks' | 'bill.com' | 'stripe_charge' | 'stripe_invoice' | 'netsuite' | null;

  /**
   * The ID of this customer in an external payments solution, such as Stripe. This
   * is used for creating charges or invoices in the external system via Orb.
   */
  payment_provider_id: string | null;

  portal_url: string | null;

  shipping_address: AddressModel | null;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Andorra              | `ad_nrt`     | Andorran NRT Number                                                                                     |
   * | Argentina            | `ar_cuit`    | Argentinian Tax ID Number                                                                               |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT Number                                                                                     |
   * | Bahrain              | `bh_vat`     | Bahraini VAT Number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT Number                                                                                     |
   * | Bolivia              | `bo_tin`     | Bolivian Tax ID                                                                                         |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ Number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF Number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT Number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST Number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST Number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST Number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST Number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST Number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | China                | `cn_tin`     | Chinese Tax ID                                                                                          |
   * | Colombia             | `co_nit`     | Colombian NIT Number                                                                                    |
   * | Costa Rica           | `cr_tin`     | Costa Rican Tax ID                                                                                      |
   * | Croatia              | `eu_vat`     | European VAT Number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT Number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT Number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT Number                                                                                     |
   * | Dominican Republic   | `do_rcn`     | Dominican RCN Number                                                                                    |
   * | Ecuador              | `ec_ruc`     | Ecuadorian RUC Number                                                                                   |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | El Salvador          | `sv_nit`     | El Salvadorian NIT Number                                                                               |
   * | Estonia              | `eu_vat`     | European VAT Number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT Number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT Number                                                                                     |
   * | France               | `eu_vat`     | European VAT Number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT Number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT Number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR Number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT Number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary Tax Number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST Number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP Number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT Number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT Number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kazakhstan           | `kz_bin`     | Kazakhstani Business Identification Number                                                              |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID Number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT Number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT Number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP Number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST Number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT Number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC Number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT Number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST Number                                                                                  |
   * | Nigeria              | `ng_tin`     | Nigerian Tax Identification Number                                                                      |
   * | Norway               | `no_vat`     | Norwegian VAT Number                                                                                    |
   * | Norway               | `no_voec`    | Norwegian VAT on e-commerce Number                                                                      |
   * | Oman                 | `om_vat`     | Omani VAT Number                                                                                        |
   * | Peru                 | `pe_ruc`     | Peruvian RUC Number                                                                                     |
   * | Philippines          | `ph_tin `    | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT Number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania              | `ro_tin`     | Romanian Tax ID Number                                                                                  |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sa_vat`     | Saudi Arabia VAT                                                                                        |
   * | Serbia               | `rs_pib`     | Serbian PIB Number                                                                                      |
   * | Singapore            | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia Tax Number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT Number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF Number (previously Spanish CIF Number)                                                      |
   * | Spain                | `eu_vat`     | European VAT Number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT Number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT Number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT Number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT Number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   * | Uruguay              | `uy_ruc`     | Uruguayan RUC Number                                                                                    |
   * | Venezuela            | `ve_rif`     | Venezuelan RIF Number                                                                                   |
   * | Vietnam              | `vn_tin`     | Vietnamese Tax ID Number                                                                                |
   */
  tax_id: CustomerTaxIDModel | null;

  /**
   * A timezone identifier from the IANA timezone database, such as
   * "America/Los_Angeles". This "defaults to your account's timezone if not set.
   * This cannot be changed after customer creation.
   */
  timezone: string;

  accounting_sync_configuration?: CustomerModel.AccountingSyncConfiguration | null;

  reporting_configuration?: CustomerModel.ReportingConfiguration | null;
}

export namespace CustomerModel {
  /**
   * The hierarchical relationships for this customer.
   */
  export interface Hierarchy {
    children: Array<Shared.CustomerMinifiedModel>;

    parent: Shared.CustomerMinifiedModel | null;
  }

  export interface AccountingSyncConfiguration {
    accounting_providers: Array<AccountingSyncConfiguration.AccountingProvider>;

    excluded: boolean;
  }

  export namespace AccountingSyncConfiguration {
    export interface AccountingProvider {
      external_provider_id: string | null;

      provider_type: 'quickbooks' | 'netsuite';
    }
  }

  export interface ReportingConfiguration {
    exempt: boolean;
  }
}

/**
 * Tax IDs are commonly required to be displayed on customer invoices, which are
 * added to the headers of invoices.
 *
 * ### Supported Tax ID Countries and Types
 *
 * | Country              | Type         | Description                                                                                             |
 * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
 * | Andorra              | `ad_nrt`     | Andorran NRT Number                                                                                     |
 * | Argentina            | `ar_cuit`    | Argentinian Tax ID Number                                                                               |
 * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
 * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
 * | Austria              | `eu_vat`     | European VAT Number                                                                                     |
 * | Bahrain              | `bh_vat`     | Bahraini VAT Number                                                                                     |
 * | Belgium              | `eu_vat`     | European VAT Number                                                                                     |
 * | Bolivia              | `bo_tin`     | Bolivian Tax ID                                                                                         |
 * | Brazil               | `br_cnpj`    | Brazilian CNPJ Number                                                                                   |
 * | Brazil               | `br_cpf`     | Brazilian CPF Number                                                                                    |
 * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
 * | Bulgaria             | `eu_vat`     | European VAT Number                                                                                     |
 * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
 * | Canada               | `ca_gst_hst` | Canadian GST/HST Number                                                                                 |
 * | Canada               | `ca_pst_bc`  | Canadian PST Number (British Columbia)                                                                  |
 * | Canada               | `ca_pst_mb`  | Canadian PST Number (Manitoba)                                                                          |
 * | Canada               | `ca_pst_sk`  | Canadian PST Number (Saskatchewan)                                                                      |
 * | Canada               | `ca_qst`     | Canadian QST Number (Québec)                                                                            |
 * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
 * | China                | `cn_tin`     | Chinese Tax ID                                                                                          |
 * | Colombia             | `co_nit`     | Colombian NIT Number                                                                                    |
 * | Costa Rica           | `cr_tin`     | Costa Rican Tax ID                                                                                      |
 * | Croatia              | `eu_vat`     | European VAT Number                                                                                     |
 * | Cyprus               | `eu_vat`     | European VAT Number                                                                                     |
 * | Czech Republic       | `eu_vat`     | European VAT Number                                                                                     |
 * | Denmark              | `eu_vat`     | European VAT Number                                                                                     |
 * | Dominican Republic   | `do_rcn`     | Dominican RCN Number                                                                                    |
 * | Ecuador              | `ec_ruc`     | Ecuadorian RUC Number                                                                                   |
 * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
 * | El Salvador          | `sv_nit`     | El Salvadorian NIT Number                                                                               |
 * | Estonia              | `eu_vat`     | European VAT Number                                                                                     |
 * | EU                   | `eu_oss_vat` | European One Stop Shop VAT Number for non-Union scheme                                                  |
 * | Finland              | `eu_vat`     | European VAT Number                                                                                     |
 * | France               | `eu_vat`     | European VAT Number                                                                                     |
 * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
 * | Germany              | `eu_vat`     | European VAT Number                                                                                     |
 * | Greece               | `eu_vat`     | European VAT Number                                                                                     |
 * | Hong Kong            | `hk_br`      | Hong Kong BR Number                                                                                     |
 * | Hungary              | `eu_vat`     | European VAT Number                                                                                     |
 * | Hungary              | `hu_tin`     | Hungary Tax Number (adószám)                                                                            |
 * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
 * | India                | `in_gst`     | Indian GST Number                                                                                       |
 * | Indonesia            | `id_npwp`    | Indonesian NPWP Number                                                                                  |
 * | Ireland              | `eu_vat`     | European VAT Number                                                                                     |
 * | Israel               | `il_vat`     | Israel VAT                                                                                              |
 * | Italy                | `eu_vat`     | European VAT Number                                                                                     |
 * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
 * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
 * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
 * | Kazakhstan           | `kz_bin`     | Kazakhstani Business Identification Number                                                              |
 * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
 * | Latvia               | `eu_vat`     | European VAT Number                                                                                     |
 * | Liechtenstein        | `li_uid`     | Liechtensteinian UID Number                                                                             |
 * | Lithuania            | `eu_vat`     | European VAT Number                                                                                     |
 * | Luxembourg           | `eu_vat`     | European VAT Number                                                                                     |
 * | Malaysia             | `my_frp`     | Malaysian FRP Number                                                                                    |
 * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
 * | Malaysia             | `my_sst`     | Malaysian SST Number                                                                                    |
 * | Malta                | `eu_vat `    | European VAT Number                                                                                     |
 * | Mexico               | `mx_rfc`     | Mexican RFC Number                                                                                      |
 * | Netherlands          | `eu_vat`     | European VAT Number                                                                                     |
 * | New Zealand          | `nz_gst`     | New Zealand GST Number                                                                                  |
 * | Nigeria              | `ng_tin`     | Nigerian Tax Identification Number                                                                      |
 * | Norway               | `no_vat`     | Norwegian VAT Number                                                                                    |
 * | Norway               | `no_voec`    | Norwegian VAT on e-commerce Number                                                                      |
 * | Oman                 | `om_vat`     | Omani VAT Number                                                                                        |
 * | Peru                 | `pe_ruc`     | Peruvian RUC Number                                                                                     |
 * | Philippines          | `ph_tin `    | Philippines Tax Identification Number                                                                   |
 * | Poland               | `eu_vat`     | European VAT Number                                                                                     |
 * | Portugal             | `eu_vat`     | European VAT Number                                                                                     |
 * | Romania              | `eu_vat`     | European VAT Number                                                                                     |
 * | Romania              | `ro_tin`     | Romanian Tax ID Number                                                                                  |
 * | Russia               | `ru_inn`     | Russian INN                                                                                             |
 * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
 * | Saudi Arabia         | `sa_vat`     | Saudi Arabia VAT                                                                                        |
 * | Serbia               | `rs_pib`     | Serbian PIB Number                                                                                      |
 * | Singapore            | `sg_gst`     | Singaporean GST                                                                                         |
 * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
 * | Slovakia             | `eu_vat`     | European VAT Number                                                                                     |
 * | Slovenia             | `eu_vat`     | European VAT Number                                                                                     |
 * | Slovenia             | `si_tin`     | Slovenia Tax Number (davčna številka)                                                                   |
 * | South Africa         | `za_vat`     | South African VAT Number                                                                                |
 * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
 * | Spain                | `es_cif`     | Spanish NIF Number (previously Spanish CIF Number)                                                      |
 * | Spain                | `eu_vat`     | European VAT Number                                                                                     |
 * | Sweden               | `eu_vat`     | European VAT Number                                                                                     |
 * | Switzerland          | `ch_vat`     | Switzerland VAT Number                                                                                  |
 * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
 * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
 * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
 * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
 * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
 * | United Kingdom       | `eu_vat`     | Northern Ireland VAT Number                                                                             |
 * | United Kingdom       | `gb_vat`     | United Kingdom VAT Number                                                                               |
 * | United States        | `us_ein`     | United States EIN                                                                                       |
 * | Uruguay              | `uy_ruc`     | Uruguayan RUC Number                                                                                    |
 * | Venezuela            | `ve_rif`     | Venezuelan RIF Number                                                                                   |
 * | Vietnam              | `vn_tin`     | Vietnamese Tax ID Number                                                                                |
 */
export interface CustomerTaxIDModel {
  country:
    | 'AD'
    | 'AE'
    | 'AR'
    | 'AT'
    | 'AU'
    | 'BE'
    | 'BG'
    | 'BH'
    | 'BO'
    | 'BR'
    | 'CA'
    | 'CH'
    | 'CL'
    | 'CN'
    | 'CO'
    | 'CR'
    | 'CY'
    | 'CZ'
    | 'DE'
    | 'DK'
    | 'EE'
    | 'DO'
    | 'EC'
    | 'EG'
    | 'ES'
    | 'EU'
    | 'FI'
    | 'FR'
    | 'GB'
    | 'GE'
    | 'GR'
    | 'HK'
    | 'HR'
    | 'HU'
    | 'ID'
    | 'IE'
    | 'IL'
    | 'IN'
    | 'IS'
    | 'IT'
    | 'JP'
    | 'KE'
    | 'KR'
    | 'KZ'
    | 'LI'
    | 'LT'
    | 'LU'
    | 'LV'
    | 'MT'
    | 'MX'
    | 'MY'
    | 'NG'
    | 'NL'
    | 'NO'
    | 'NZ'
    | 'OM'
    | 'PE'
    | 'PH'
    | 'PL'
    | 'PT'
    | 'RO'
    | 'RS'
    | 'RU'
    | 'SA'
    | 'SE'
    | 'SG'
    | 'SI'
    | 'SK'
    | 'SV'
    | 'TH'
    | 'TR'
    | 'TW'
    | 'UA'
    | 'US'
    | 'UY'
    | 'VE'
    | 'VN'
    | 'ZA';

  type:
    | 'ad_nrt'
    | 'ae_trn'
    | 'ar_cuit'
    | 'eu_vat'
    | 'au_abn'
    | 'au_arn'
    | 'bg_uic'
    | 'bh_vat'
    | 'bo_tin'
    | 'br_cnpj'
    | 'br_cpf'
    | 'ca_bn'
    | 'ca_gst_hst'
    | 'ca_pst_bc'
    | 'ca_pst_mb'
    | 'ca_pst_sk'
    | 'ca_qst'
    | 'ch_vat'
    | 'cl_tin'
    | 'cn_tin'
    | 'co_nit'
    | 'cr_tin'
    | 'do_rcn'
    | 'ec_ruc'
    | 'eg_tin'
    | 'es_cif'
    | 'eu_oss_vat'
    | 'gb_vat'
    | 'ge_vat'
    | 'hk_br'
    | 'hu_tin'
    | 'id_npwp'
    | 'il_vat'
    | 'in_gst'
    | 'is_vat'
    | 'jp_cn'
    | 'jp_rn'
    | 'jp_trn'
    | 'ke_pin'
    | 'kr_brn'
    | 'kz_bin'
    | 'li_uid'
    | 'mx_rfc'
    | 'my_frp'
    | 'my_itn'
    | 'my_sst'
    | 'ng_tin'
    | 'no_vat'
    | 'no_voec'
    | 'nz_gst'
    | 'om_vat'
    | 'pe_ruc'
    | 'ph_tin'
    | 'ro_tin'
    | 'rs_pib'
    | 'ru_inn'
    | 'ru_kpp'
    | 'sa_vat'
    | 'sg_gst'
    | 'sg_uen'
    | 'si_tin'
    | 'sv_nit'
    | 'th_vat'
    | 'tr_tin'
    | 'tw_vat'
    | 'ua_vat'
    | 'us_ein'
    | 'uy_ruc'
    | 've_rif'
    | 'vn_tin'
    | 'za_vat';

  value: string;
}

export interface DimensionalPriceConfigurationModel {
  dimension_values: Array<string>;

  dimensional_price_group_id: string;
}

/**
 * A dimensional price group is used to partition the result of a billable metric
 * by a set of dimensions. Prices in a price group must specify the parition used
 * to derive their usage.
 */
export interface DimensionalPriceGroupModel {
  id: string;

  /**
   * The billable metric associated with this dimensional price group. All prices
   * associated with this dimensional price group will be computed using this
   * billable metric.
   */
  billable_metric_id: string;

  /**
   * The dimensions that this dimensional price group is defined over
   */
  dimensions: Array<string>;

  /**
   * An alias for the dimensional price group
   */
  external_dimensional_price_group_id: string | null;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The name of the dimensional price group
   */
  name: string;
}

export type Discount = PercentageDiscount | TrialDiscount | Discount.UsageDiscount | AmountDiscount;

export namespace Discount {
  export interface UsageDiscount {
    /**
     * List of price_ids that this discount applies to. For plan/plan phase discounts,
     * this can be a subset of prices.
     */
    applies_to_price_ids: Array<string>;

    discount_type: 'usage';

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;

    reason?: string | null;
  }
}

export type DiscountModel = PercentageDiscount | TrialDiscount | DiscountModel.UsageDiscount | AmountDiscount;

export namespace DiscountModel {
  export interface UsageDiscount {
    /**
     * List of price_ids that this discount applies to. For plan/plan phase discounts,
     * this can be a subset of prices.
     */
    applies_to_price_ids: Array<string>;

    discount_type: 'usage';

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;

    reason?: string | null;
  }
}

export interface DiscountOverrideModel {
  discount_type: 'percentage' | 'usage' | 'amount';

  /**
   * Only available if discount_type is `amount`.
   */
  amount_discount?: string | null;

  /**
   * Only available if discount_type is `percentage`. This is a number between 0
   * and 1.
   */
  percentage_discount?: number | null;

  /**
   * Only available if discount_type is `usage`. Number of usage units that this
   * discount is for
   */
  usage_discount?: number | null;
}

export interface EditCustomerModel {
  accounting_sync_configuration?: NewAccountingSyncConfigurationModel | null;

  /**
   * Additional email addresses for this customer. If populated, these email
   * addresses will be CC'd for customer communications.
   */
  additional_emails?: Array<string> | null;

  /**
   * Used to determine if invoices for this customer will automatically attempt to
   * charge a saved payment method, if available. This parameter defaults to `True`
   * when a payment provider is provided on customer creation.
   */
  auto_collection?: boolean | null;

  billing_address?: AddressInputModel | null;

  /**
   * An ISO 4217 currency string used for the customer's invoices and balance. If not
   * set at creation time, will be set at subscription creation time.
   */
  currency?: string | null;

  /**
   * A valid customer email, to be used for invoicing and notifications.
   */
  email?: string | null;

  email_delivery?: boolean | null;

  /**
   * The external customer ID. This can only be set if empty and the customer has no
   * past or current subscriptions.
   */
  external_customer_id?: string | null;

  /**
   * The hierarchical relationships for this customer.
   */
  hierarchy?: CustomerHierarchyConfigModel | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;

  /**
   * The full name of the customer
   */
  name?: string | null;

  /**
   * This is used for creating charges or invoices in an external system via Orb.
   * When not in test mode:
   *
   * - the connection must first be configured in the Orb webapp.
   * - if the provider is an invoicing provider (`stripe_invoice`, `quickbooks`,
   *   `bill.com`, `netsuite`), any product mappings must first be configured with
   *   the Orb team.
   */
  payment_provider?: 'quickbooks' | 'bill.com' | 'stripe_charge' | 'stripe_invoice' | 'netsuite' | null;

  /**
   * The ID of this customer in an external payments solution, such as Stripe. This
   * is used for creating charges or invoices in the external system via Orb.
   */
  payment_provider_id?: string | null;

  reporting_configuration?: NewReportingConfigurationModel | null;

  shipping_address?: AddressInputModel | null;

  tax_configuration?: NewTaxConfigurationModel | null;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Andorra              | `ad_nrt`     | Andorran NRT Number                                                                                     |
   * | Argentina            | `ar_cuit`    | Argentinian Tax ID Number                                                                               |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT Number                                                                                     |
   * | Bahrain              | `bh_vat`     | Bahraini VAT Number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT Number                                                                                     |
   * | Bolivia              | `bo_tin`     | Bolivian Tax ID                                                                                         |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ Number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF Number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT Number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST Number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST Number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST Number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST Number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST Number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | China                | `cn_tin`     | Chinese Tax ID                                                                                          |
   * | Colombia             | `co_nit`     | Colombian NIT Number                                                                                    |
   * | Costa Rica           | `cr_tin`     | Costa Rican Tax ID                                                                                      |
   * | Croatia              | `eu_vat`     | European VAT Number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT Number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT Number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT Number                                                                                     |
   * | Dominican Republic   | `do_rcn`     | Dominican RCN Number                                                                                    |
   * | Ecuador              | `ec_ruc`     | Ecuadorian RUC Number                                                                                   |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | El Salvador          | `sv_nit`     | El Salvadorian NIT Number                                                                               |
   * | Estonia              | `eu_vat`     | European VAT Number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT Number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT Number                                                                                     |
   * | France               | `eu_vat`     | European VAT Number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT Number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT Number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR Number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT Number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary Tax Number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST Number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP Number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT Number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT Number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kazakhstan           | `kz_bin`     | Kazakhstani Business Identification Number                                                              |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID Number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT Number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT Number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP Number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST Number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT Number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC Number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT Number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST Number                                                                                  |
   * | Nigeria              | `ng_tin`     | Nigerian Tax Identification Number                                                                      |
   * | Norway               | `no_vat`     | Norwegian VAT Number                                                                                    |
   * | Norway               | `no_voec`    | Norwegian VAT on e-commerce Number                                                                      |
   * | Oman                 | `om_vat`     | Omani VAT Number                                                                                        |
   * | Peru                 | `pe_ruc`     | Peruvian RUC Number                                                                                     |
   * | Philippines          | `ph_tin `    | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT Number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania              | `ro_tin`     | Romanian Tax ID Number                                                                                  |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sa_vat`     | Saudi Arabia VAT                                                                                        |
   * | Serbia               | `rs_pib`     | Serbian PIB Number                                                                                      |
   * | Singapore            | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia Tax Number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT Number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF Number (previously Spanish CIF Number)                                                      |
   * | Spain                | `eu_vat`     | European VAT Number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT Number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT Number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT Number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT Number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   * | Uruguay              | `uy_ruc`     | Uruguayan RUC Number                                                                                    |
   * | Venezuela            | `ve_rif`     | Venezuelan RIF Number                                                                                   |
   * | Vietnam              | `vn_tin`     | Vietnamese Tax ID Number                                                                                |
   */
  tax_id?: CustomerTaxIDModel | null;
}

export interface EditPlanModel {
  /**
   * An optional user-defined ID for this plan resource, used throughout the system
   * as an alias for this Plan. Use this field to identify a plan by an existing
   * identifier in your system.
   */
  external_plan_id?: string | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface FixedFeeQuantityScheduleEntryModel {
  end_date: string | null;

  price_id: string;

  quantity: number;

  start_date: string;
}

export type InvoiceLevelDiscount = PercentageDiscount | AmountDiscount | TrialDiscount;

export type InvoiceLevelDiscountModel = PercentageDiscount | AmountDiscount | TrialDiscount;

export interface InvoiceLineItemModel {
  /**
   * A unique ID for this line item.
   */
  id: string;

  /**
   * The line amount after any adjustments and before overage conversion, credits and
   * partial invoicing.
   */
  adjusted_subtotal: string;

  /**
   * All adjustments (ie. maximums, minimums, discounts) applied to the line item.
   */
  adjustments: Array<
    | InvoiceLineItemModel.MonetaryUsageDiscountAdjustment
    | InvoiceLineItemModel.MonetaryAmountDiscountAdjustment
    | InvoiceLineItemModel.MonetaryPercentageDiscountAdjustment
    | InvoiceLineItemModel.MonetaryMinimumAdjustment
    | InvoiceLineItemModel.MonetaryMaximumAdjustment
  >;

  /**
   * The final amount for a line item after all adjustments and pre paid credits have
   * been applied.
   */
  amount: string;

  /**
   * The number of prepaid credits applied.
   */
  credits_applied: string;

  discount: Discount | null;

  /**
   * The end date of the range of time applied for this line item's price.
   */
  end_date: string;

  /**
   * An additional filter that was used to calculate the usage for this line item.
   */
  filter: string | null;

  /**
   * [DEPRECATED] For configured prices that are split by a grouping key, this will
   * be populated with the key and a value. The `amount` and `subtotal` will be the
   * values for this particular grouping.
   */
  grouping: string | null;

  /**
   * @deprecated This field is deprecated in favor of `adjustments`.
   */
  maximum: MaximumModel | null;

  /**
   * @deprecated This field is deprecated in favor of `adjustments`.
   */
  maximum_amount: string | null;

  /**
   * @deprecated This field is deprecated in favor of `adjustments`.
   */
  minimum: MinimumModel | null;

  /**
   * @deprecated This field is deprecated in favor of `adjustments`.
   */
  minimum_amount: string | null;

  /**
   * The name of the price associated with this line item.
   */
  name: string;

  /**
   * Any amount applied from a partial invoice
   */
  partially_invoiced_amount: string;

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
  price: PriceModel | null;

  /**
   * Either the fixed fee quantity or the usage during the service period.
   */
  quantity: number;

  /**
   * The start date of the range of time applied for this line item's price.
   */
  start_date: string;

  /**
   * For complex pricing structures, the line item can be broken down further in
   * `sub_line_items`.
   */
  sub_line_items: Array<
    | InvoiceLineItemModel.MatrixSubLineItem
    | InvoiceLineItemModel.TierSubLineItem
    | InvoiceLineItemModel.OtherSubLineItem
  >;

  /**
   * The line amount before before any adjustments.
   */
  subtotal: string;

  /**
   * An array of tax rates and their incurred tax amounts. Empty if no tax
   * integration is configured.
   */
  tax_amounts: Array<TaxAmountModel>;

  /**
   * A list of customer ids that were used to calculate the usage for this line item.
   */
  usage_customer_ids: Array<string> | null;
}

export namespace InvoiceLineItemModel {
  export interface MonetaryUsageDiscountAdjustment {
    id: string;

    adjustment_type: 'usage_discount';

    /**
     * The value applied by an adjustment.
     */
    amount: string;

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
     * The reason for the adjustment.
     */
    reason: string | null;

    /**
     * The number of usage units by which to discount the price this adjustment applies
     * to in a given billing period.
     */
    usage_discount: number;
  }

  export interface MonetaryAmountDiscountAdjustment {
    id: string;

    adjustment_type: 'amount_discount';

    /**
     * The value applied by an adjustment.
     */
    amount: string;

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
     * The reason for the adjustment.
     */
    reason: string | null;
  }

  export interface MonetaryPercentageDiscountAdjustment {
    id: string;

    adjustment_type: 'percentage_discount';

    /**
     * The value applied by an adjustment.
     */
    amount: string;

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
     * The reason for the adjustment.
     */
    reason: string | null;
  }

  export interface MonetaryMinimumAdjustment {
    id: string;

    adjustment_type: 'minimum';

    /**
     * The value applied by an adjustment.
     */
    amount: string;

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
     * The reason for the adjustment.
     */
    reason: string | null;
  }

  export interface MonetaryMaximumAdjustment {
    id: string;

    adjustment_type: 'maximum';

    /**
     * The value applied by an adjustment.
     */
    amount: string;

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
     * The reason for the adjustment.
     */
    reason: string | null;
  }

  export interface MatrixSubLineItem {
    /**
     * The total amount for this sub line item.
     */
    amount: string;

    grouping: Shared.SubLineItemGroupingModel | null;

    matrix_config: MatrixSubLineItem.MatrixConfig;

    name: string;

    quantity: number;

    type: 'matrix';
  }

  export namespace MatrixSubLineItem {
    export interface MatrixConfig {
      /**
       * The ordered dimension values for this line item.
       */
      dimension_values: Array<string | null>;
    }
  }

  export interface TierSubLineItem {
    /**
     * The total amount for this sub line item.
     */
    amount: string;

    grouping: Shared.SubLineItemGroupingModel | null;

    name: string;

    quantity: number;

    tier_config: TierSubLineItem.TierConfig;

    type: 'tier';
  }

  export namespace TierSubLineItem {
    export interface TierConfig {
      first_unit: number;

      last_unit: number | null;

      unit_amount: string;
    }
  }

  export interface OtherSubLineItem {
    /**
     * The total amount for this sub line item.
     */
    amount: string;

    grouping: Shared.SubLineItemGroupingModel | null;

    name: string;

    quantity: number;

    type: "'null'";
  }
}

/**
 * An [`Invoice`](/core-concepts#invoice) is a fundamental billing entity,
 * representing the request for payment for a single subscription. This includes a
 * set of line items, which correspond to prices in the subscription's plan and can
 * represent fixed recurring fees or usage-based fees. They are generated at the
 * end of a billing period, or as the result of an action, such as a cancellation.
 */
export interface InvoiceModel {
  id: string;

  /**
   * This is the final amount required to be charged to the customer and reflects the
   * application of the customer balance to the `total` of the invoice.
   */
  amount_due: string;

  auto_collection: AutoCollectionModel;

  billing_address: AddressModel | null;

  /**
   * The creation time of the resource in Orb.
   */
  created_at: string;

  /**
   * A list of credit notes associated with the invoice
   */
  credit_notes: Array<CreditNoteSummaryModel>;

  /**
   * An ISO 4217 currency string or `credits`
   */
  currency: string;

  customer: CustomerMinifiedModel;

  customer_balance_transactions: Array<CustomerBalanceTransactionModel>;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Andorra              | `ad_nrt`     | Andorran NRT Number                                                                                     |
   * | Argentina            | `ar_cuit`    | Argentinian Tax ID Number                                                                               |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT Number                                                                                     |
   * | Bahrain              | `bh_vat`     | Bahraini VAT Number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT Number                                                                                     |
   * | Bolivia              | `bo_tin`     | Bolivian Tax ID                                                                                         |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ Number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF Number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT Number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST Number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST Number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST Number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST Number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST Number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | China                | `cn_tin`     | Chinese Tax ID                                                                                          |
   * | Colombia             | `co_nit`     | Colombian NIT Number                                                                                    |
   * | Costa Rica           | `cr_tin`     | Costa Rican Tax ID                                                                                      |
   * | Croatia              | `eu_vat`     | European VAT Number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT Number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT Number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT Number                                                                                     |
   * | Dominican Republic   | `do_rcn`     | Dominican RCN Number                                                                                    |
   * | Ecuador              | `ec_ruc`     | Ecuadorian RUC Number                                                                                   |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | El Salvador          | `sv_nit`     | El Salvadorian NIT Number                                                                               |
   * | Estonia              | `eu_vat`     | European VAT Number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT Number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT Number                                                                                     |
   * | France               | `eu_vat`     | European VAT Number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT Number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT Number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR Number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT Number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary Tax Number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST Number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP Number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT Number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT Number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kazakhstan           | `kz_bin`     | Kazakhstani Business Identification Number                                                              |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID Number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT Number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT Number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP Number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST Number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT Number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC Number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT Number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST Number                                                                                  |
   * | Nigeria              | `ng_tin`     | Nigerian Tax Identification Number                                                                      |
   * | Norway               | `no_vat`     | Norwegian VAT Number                                                                                    |
   * | Norway               | `no_voec`    | Norwegian VAT on e-commerce Number                                                                      |
   * | Oman                 | `om_vat`     | Omani VAT Number                                                                                        |
   * | Peru                 | `pe_ruc`     | Peruvian RUC Number                                                                                     |
   * | Philippines          | `ph_tin `    | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT Number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania              | `ro_tin`     | Romanian Tax ID Number                                                                                  |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sa_vat`     | Saudi Arabia VAT                                                                                        |
   * | Serbia               | `rs_pib`     | Serbian PIB Number                                                                                      |
   * | Singapore            | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia Tax Number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT Number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF Number (previously Spanish CIF Number)                                                      |
   * | Spain                | `eu_vat`     | European VAT Number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT Number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT Number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT Number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT Number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   * | Uruguay              | `uy_ruc`     | Uruguayan RUC Number                                                                                    |
   * | Venezuela            | `ve_rif`     | Venezuelan RIF Number                                                                                   |
   * | Vietnam              | `vn_tin`     | Vietnamese Tax ID Number                                                                                |
   */
  customer_tax_id: CustomerTaxIDModel | null;

  /**
   * @deprecated This field is deprecated in favor of `discounts`. If a `discounts`
   * list is provided, the first discount in the list will be returned. If the list
   * is empty, `None` will be returned.
   */
  discount: unknown;

  discounts: Array<InvoiceLevelDiscount>;

  /**
   * When the invoice payment is due. The due date is null if the invoice is not yet
   * finalized.
   */
  due_date: string | null;

  /**
   * If the invoice has a status of `draft`, this will be the time that the invoice
   * will be eligible to be issued, otherwise it will be `null`. If `auto-issue` is
   * true, the invoice will automatically begin issuing at this time.
   */
  eligible_to_issue_at: string | null;

  /**
   * A URL for the customer-facing invoice portal. This URL expires 30 days after the
   * invoice's due date, or 60 days after being re-generated through the UI.
   */
  hosted_invoice_url: string | null;

  /**
   * The scheduled date of the invoice
   */
  invoice_date: string;

  /**
   * Automatically generated invoice number to help track and reconcile invoices.
   * Invoice numbers have a prefix such as `RFOBWG`. These can be sequential per
   * account or customer.
   */
  invoice_number: string;

  /**
   * The link to download the PDF representation of the `Invoice`.
   */
  invoice_pdf: string | null;

  invoice_source: 'subscription' | 'partial' | 'one_off';

  /**
   * If the invoice failed to issue, this will be the last time it failed to issue
   * (even if it is now in a different state.)
   */
  issue_failed_at: string | null;

  /**
   * If the invoice has been issued, this will be the time it transitioned to
   * `issued` (even if it is now in a different state.)
   */
  issued_at: string | null;

  /**
   * The breakdown of prices in this invoice.
   */
  line_items: Array<InvoiceLineItemModel>;

  maximum: MaximumModel | null;

  maximum_amount: string | null;

  /**
   * Free-form text which is available on the invoice PDF and the Orb invoice portal.
   */
  memo: string | null;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  minimum: MinimumModel | null;

  minimum_amount: string | null;

  /**
   * If the invoice has a status of `paid`, this gives a timestamp when the invoice
   * was paid.
   */
  paid_at: string | null;

  /**
   * A list of payment attempts associated with the invoice
   */
  payment_attempts: Array<PaymentAttemptModel>;

  /**
   * If payment was attempted on this invoice but failed, this will be the time of
   * the most recent attempt.
   */
  payment_failed_at: string | null;

  /**
   * If payment was attempted on this invoice, this will be the start time of the
   * most recent attempt. This field is especially useful for delayed-notification
   * payment mechanisms (like bank transfers), where payment can take 3 days or more.
   */
  payment_started_at: string | null;

  /**
   * If the invoice is in draft, this timestamp will reflect when the invoice is
   * scheduled to be issued.
   */
  scheduled_issue_at: string | null;

  shipping_address: AddressModel | null;

  status: 'issued' | 'paid' | 'synced' | 'void' | 'draft';

  subscription: SubscriptionMinifiedModel | null;

  /**
   * The total before any discounts and minimums are applied.
   */
  subtotal: string;

  /**
   * If the invoice failed to sync, this will be the last time an external invoicing
   * provider sync was attempted. This field will always be `null` for invoices using
   * Orb Invoicing.
   */
  sync_failed_at: string | null;

  /**
   * The total after any minimums and discounts have been applied.
   */
  total: string;

  /**
   * If the invoice has a status of `void`, this gives a timestamp when the invoice
   * was voided.
   */
  voided_at: string | null;

  /**
   * This is true if the invoice will be automatically issued in the future, and
   * false otherwise.
   */
  will_auto_issue: boolean;
}

export interface ItemExternalConnectionModel {
  external_connection_name:
    | 'stripe'
    | 'quickbooks'
    | 'bill.com'
    | 'netsuite'
    | 'taxjar'
    | 'avalara'
    | 'anrok';

  external_entity_id: string;
}

/**
 * The Item resource represents a sellable product or good. Items are associated
 * with all line items, billable metrics, and prices and are used for defining
 * external sync behavior for invoices and tax calculation purposes.
 */
export interface ItemModel {
  id: string;

  created_at: string;

  external_connections: Array<ItemExternalConnectionModel>;

  name: string;
}

export interface ItemSlimModel {
  id: string;

  name: string;
}

export interface MatrixConfigModel {
  /**
   * Default per unit rate for any usage not bucketed into a specified matrix_value
   */
  default_unit_amount: string;

  /**
   * One or two event property values to evaluate matrix groups by
   */
  dimensions: Array<string | null>;

  /**
   * Matrix values for specified matrix grouping keys
   */
  matrix_values: Array<MatrixValueModel>;
}

export interface MatrixValueModel {
  /**
   * One or two matrix keys to filter usage to this Matrix value by. For example,
   * ["region", "tier"] could be used to filter cloud usage by a cloud region and an
   * instance tier.
   */
  dimension_values: Array<string | null>;

  /**
   * Unit price for the specified dimension_values
   */
  unit_amount: string;
}

export interface MatrixWithAllocationConfigModel {
  /**
   * Allocation to be used to calculate the price
   */
  allocation: number;

  /**
   * Default per unit rate for any usage not bucketed into a specified matrix_value
   */
  default_unit_amount: string;

  /**
   * One or two event property values to evaluate matrix groups by
   */
  dimensions: Array<string | null>;

  /**
   * Matrix values for specified matrix grouping keys
   */
  matrix_values: Array<MatrixValueModel>;
}

export interface MaximumIntervalModel {
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

export interface MaximumModel {
  /**
   * List of price_ids that this maximum amount applies to. For plan/plan phase
   * maximums, this can be a subset of prices.
   */
  applies_to_price_ids: Array<string>;

  /**
   * Maximum amount applied
   */
  maximum_amount: string;
}

export interface MinimumIntervalModel {
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

export interface MinimumModel {
  /**
   * List of price_ids that this minimum amount applies to. For plan/plan phase
   * minimums, this can be a subset of prices.
   */
  applies_to_price_ids: Array<string>;

  /**
   * Minimum amount applied
   */
  minimum_amount: string;
}

export interface MutatedSubscriptionModel {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<AdjustmentIntervalModel>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: BillingCycleAnchorConfigurationModel;

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
  customer: CustomerModel;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    AmountDiscountIntervalModel | PercentageDiscountIntervalModel | UsageDiscountIntervalModel
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<FixedFeeQuantityScheduleEntryModel>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<MaximumIntervalModel>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<MinimumIntervalModel>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlanModel;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<PriceIntervalModel>;

  redeemed_coupon: CouponRedemptionModel | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: SubscriptionTrialInfoModel;
}

export interface NewAccountingSyncConfigurationModel {
  accounting_providers?: Array<NewAccountingSyncConfigurationModel.AccountingProvider> | null;

  excluded?: boolean | null;
}

export namespace NewAccountingSyncConfigurationModel {
  export interface AccountingProvider {
    external_provider_id: string;

    provider_type: string;
  }
}

export type NewAdjustmentModel =
  | NewAdjustmentModel.NewPercentageDiscount
  | NewAdjustmentModel.NewUsageDiscount
  | NewAdjustmentModel.NewAmountDiscount
  | NewAdjustmentModel.NewMinimum
  | NewAdjustmentModel.NewMaximum;

export namespace NewAdjustmentModel {
  export interface NewPercentageDiscount {
    adjustment_type: 'percentage_discount';

    /**
     * The set of price IDs to which this adjustment applies.
     */
    applies_to_price_ids: Array<string>;

    percentage_discount: number;

    /**
     * When false, this adjustment will be applied to a single price. Otherwise, it
     * will be applied at the invoice level, possibly to multiple prices.
     */
    is_invoice_level?: boolean;
  }

  export interface NewUsageDiscount {
    adjustment_type: 'usage_discount';

    /**
     * The set of price IDs to which this adjustment applies.
     */
    applies_to_price_ids: Array<string>;

    usage_discount: number;

    /**
     * When false, this adjustment will be applied to a single price. Otherwise, it
     * will be applied at the invoice level, possibly to multiple prices.
     */
    is_invoice_level?: boolean;
  }

  export interface NewAmountDiscount {
    adjustment_type: 'amount_discount';

    amount_discount: string;

    /**
     * The set of price IDs to which this adjustment applies.
     */
    applies_to_price_ids: Array<string>;

    /**
     * When false, this adjustment will be applied to a single price. Otherwise, it
     * will be applied at the invoice level, possibly to multiple prices.
     */
    is_invoice_level?: boolean;
  }

  export interface NewMinimum {
    adjustment_type: 'minimum';

    /**
     * The set of price IDs to which this adjustment applies.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The item ID that revenue from this minimum will be attributed to.
     */
    item_id: string;

    minimum_amount: string;

    /**
     * When false, this adjustment will be applied to a single price. Otherwise, it
     * will be applied at the invoice level, possibly to multiple prices.
     */
    is_invoice_level?: boolean;
  }

  export interface NewMaximum {
    adjustment_type: 'maximum';

    /**
     * The set of price IDs to which this adjustment applies.
     */
    applies_to_price_ids: Array<string>;

    maximum_amount: string;

    /**
     * When false, this adjustment will be applied to a single price. Otherwise, it
     * will be applied at the invoice level, possibly to multiple prices.
     */
    is_invoice_level?: boolean;
  }
}

export interface NewAllocationPriceModel {
  /**
   * An amount of the currency to allocate to the customer at the specified cadence.
   */
  amount: string;

  /**
   * The cadence at which to allocate the amount to the customer.
   */
  cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

  /**
   * An ISO 4217 currency string or a custom pricing unit identifier in which to bill
   * this price.
   */
  currency: string;

  /**
   * Whether the allocated amount should expire at the end of the cadence or roll
   * over to the next period.
   */
  expires_at_end_of_cadence: boolean;
}

export interface NewBillingCycleConfigurationModel {
  /**
   * The duration of the billing period.
   */
  duration: number;

  /**
   * The unit of billing period duration.
   */
  duration_unit: 'day' | 'month';
}

export type NewFloatingPriceModel =
  | NewFloatingPriceModel.NewFloatingUnitPrice
  | NewFloatingPriceModel.NewFloatingPackagePrice
  | NewFloatingPriceModel.NewFloatingMatrixPrice
  | NewFloatingPriceModel.NewFloatingMatrixWithAllocationPrice
  | NewFloatingPriceModel.NewFloatingTieredPrice
  | NewFloatingPriceModel.NewFloatingTieredBpsPrice
  | NewFloatingPriceModel.NewFloatingBpsPrice
  | NewFloatingPriceModel.NewFloatingBulkBpsPrice
  | NewFloatingPriceModel.NewFloatingBulkPrice
  | NewFloatingPriceModel.NewFloatingThresholdTotalAmountPrice
  | NewFloatingPriceModel.NewFloatingTieredPackagePrice
  | NewFloatingPriceModel.NewFloatingGroupedTieredPrice
  | NewFloatingPriceModel.NewFloatingMaxGroupTieredPackagePrice
  | NewFloatingPriceModel.NewFloatingTieredWithMinimumPrice
  | NewFloatingPriceModel.NewFloatingPackageWithAllocationPrice
  | NewFloatingPriceModel.NewFloatingTieredPackageWithMinimumPrice
  | NewFloatingPriceModel.NewFloatingUnitWithPercentPrice
  | NewFloatingPriceModel.NewFloatingTieredWithProrationPrice
  | NewFloatingPriceModel.NewFloatingUnitWithProrationPrice
  | NewFloatingPriceModel.NewFloatingGroupedAllocationPrice
  | NewFloatingPriceModel.NewFloatingGroupedWithProratedMinimumPrice
  | NewFloatingPriceModel.NewFloatingGroupedWithMeteredMinimumPrice
  | NewFloatingPriceModel.NewFloatingMatrixWithDisplayNamePrice
  | NewFloatingPriceModel.NewFloatingBulkWithProrationPrice
  | NewFloatingPriceModel.NewFloatingGroupedTieredPackagePrice
  | NewFloatingPriceModel.NewFloatingScalableMatrixWithUnitPricingPrice
  | NewFloatingPriceModel.NewFloatingScalableMatrixWithTieredPricingPrice
  | NewFloatingPriceModel.NewFloatingCumulativeGroupedBulkPrice;

export namespace NewFloatingPriceModel {
  export interface NewFloatingUnitPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'unit';

    /**
     * The name of the price.
     */
    name: string;

    unit_config: Shared.UnitConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'package';

    /**
     * The name of the price.
     */
    name: string;

    package_config: Shared.PackageConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingMatrixPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    matrix_config: Shared.MatrixConfigModel;

    model_type: 'matrix';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingMatrixWithAllocationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    matrix_with_allocation_config: Shared.MatrixWithAllocationConfigModel;

    model_type: 'matrix_with_allocation';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingTieredPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'tiered';

    /**
     * The name of the price.
     */
    name: string;

    tiered_config: Shared.TieredConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingTieredBpsPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'tiered_bps';

    /**
     * The name of the price.
     */
    name: string;

    tiered_bps_config: Shared.TieredBpsConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingBpsPrice {
    bps_config: Shared.BpsConfigModel;

    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'bps';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingBulkBpsPrice {
    bulk_bps_config: Shared.BulkBpsConfigModel;

    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'bulk_bps';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingBulkPrice {
    bulk_config: Shared.BulkConfigModel;

    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'bulk';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingThresholdTotalAmountPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'threshold_total_amount';

    /**
     * The name of the price.
     */
    name: string;

    threshold_total_amount_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingTieredPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'tiered_package';

    /**
     * The name of the price.
     */
    name: string;

    tiered_package_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingGroupedTieredPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    grouped_tiered_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'grouped_tiered';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingMaxGroupTieredPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    max_group_tiered_package_config: Shared.CustomRatingFunctionConfigModel;

    model_type: 'max_group_tiered_package';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingTieredWithMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'tiered_with_minimum';

    /**
     * The name of the price.
     */
    name: string;

    tiered_with_minimum_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingPackageWithAllocationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'package_with_allocation';

    /**
     * The name of the price.
     */
    name: string;

    package_with_allocation_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingTieredPackageWithMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'tiered_package_with_minimum';

    /**
     * The name of the price.
     */
    name: string;

    tiered_package_with_minimum_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingUnitWithPercentPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'unit_with_percent';

    /**
     * The name of the price.
     */
    name: string;

    unit_with_percent_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingTieredWithProrationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'tiered_with_proration';

    /**
     * The name of the price.
     */
    name: string;

    tiered_with_proration_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingUnitWithProrationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'unit_with_proration';

    /**
     * The name of the price.
     */
    name: string;

    unit_with_proration_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingGroupedAllocationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    grouped_allocation_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'grouped_allocation';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingGroupedWithProratedMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    grouped_with_prorated_minimum_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'grouped_with_prorated_minimum';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingGroupedWithMeteredMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    grouped_with_metered_minimum_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'grouped_with_metered_minimum';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingMatrixWithDisplayNamePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    matrix_with_display_name_config: Shared.CustomRatingFunctionConfigModel;

    model_type: 'matrix_with_display_name';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingBulkWithProrationPrice {
    bulk_with_proration_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'bulk_with_proration';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingGroupedTieredPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    grouped_tiered_package_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'grouped_tiered_package';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingScalableMatrixWithUnitPricingPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'scalable_matrix_with_unit_pricing';

    /**
     * The name of the price.
     */
    name: string;

    scalable_matrix_with_unit_pricing_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingScalableMatrixWithTieredPricingPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'scalable_matrix_with_tiered_pricing';

    /**
     * The name of the price.
     */
    name: string;

    scalable_matrix_with_tiered_pricing_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface NewFloatingCumulativeGroupedBulkPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    cumulative_grouped_bulk_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'cumulative_grouped_bulk';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }
}

export interface NewReportingConfigurationModel {
  exempt: boolean;
}

export type NewSubscriptionPriceModel =
  | NewSubscriptionPriceModel.NewSubscriptionUnitPrice
  | NewSubscriptionPriceModel.NewSubscriptionPackagePrice
  | NewSubscriptionPriceModel.NewSubscriptionMatrixPrice
  | NewSubscriptionPriceModel.NewSubscriptionTieredPrice
  | NewSubscriptionPriceModel.NewSubscriptionTieredBpsPrice
  | NewSubscriptionPriceModel.NewSubscriptionBpsPrice
  | NewSubscriptionPriceModel.NewSubscriptionBulkBpsPrice
  | NewSubscriptionPriceModel.NewSubscriptionBulkPrice
  | NewSubscriptionPriceModel.NewSubscriptionThresholdTotalAmountPrice
  | NewSubscriptionPriceModel.NewSubscriptionTieredPackagePrice
  | NewSubscriptionPriceModel.NewSubscriptionTieredWithMinimumPrice
  | NewSubscriptionPriceModel.NewSubscriptionUnitWithPercentPrice
  | NewSubscriptionPriceModel.NewSubscriptionPackageWithAllocationPrice
  | NewSubscriptionPriceModel.NewSubscriptionTierWithProrationPrice
  | NewSubscriptionPriceModel.NewSubscriptionUnitWithProrationPrice
  | NewSubscriptionPriceModel.NewSubscriptionGroupedAllocationPrice
  | NewSubscriptionPriceModel.NewSubscriptionGroupedWithProratedMinimumPrice
  | NewSubscriptionPriceModel.NewSubscriptionBulkWithProrationPrice
  | NewSubscriptionPriceModel.NewSubscriptionScalableMatrixWithUnitPricingPrice
  | NewSubscriptionPriceModel.NewSubscriptionScalableMatrixWithTieredPricingPrice
  | NewSubscriptionPriceModel.NewSubscriptionCumulativeGroupedBulkPrice
  | NewSubscriptionPriceModel.NewSubscriptionMaxGroupTieredPackagePrice
  | NewSubscriptionPriceModel.NewSubscriptionGroupedWithMeteredMinimumPrice
  | NewSubscriptionPriceModel.NewSubscriptionMatrixWithDisplayNamePrice
  | NewSubscriptionPriceModel.NewSubscriptionGroupedTieredPackagePrice;

export namespace NewSubscriptionPriceModel {
  export interface NewSubscriptionUnitPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'unit';

    /**
     * The name of the price.
     */
    name: string;

    unit_config: Shared.UnitConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'package';

    /**
     * The name of the price.
     */
    name: string;

    package_config: Shared.PackageConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionMatrixPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    matrix_config: Shared.MatrixConfigModel;

    model_type: 'matrix';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionTieredPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'tiered';

    /**
     * The name of the price.
     */
    name: string;

    tiered_config: Shared.TieredConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionTieredBpsPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'tiered_bps';

    /**
     * The name of the price.
     */
    name: string;

    tiered_bps_config: Shared.TieredBpsConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionBpsPrice {
    bps_config: Shared.BpsConfigModel;

    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'bps';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionBulkBpsPrice {
    bulk_bps_config: Shared.BulkBpsConfigModel;

    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'bulk_bps';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionBulkPrice {
    bulk_config: Shared.BulkConfigModel;

    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'bulk';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionThresholdTotalAmountPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'threshold_total_amount';

    /**
     * The name of the price.
     */
    name: string;

    threshold_total_amount_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionTieredPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'tiered_package';

    /**
     * The name of the price.
     */
    name: string;

    tiered_package_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionTieredWithMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'tiered_with_minimum';

    /**
     * The name of the price.
     */
    name: string;

    tiered_with_minimum_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionUnitWithPercentPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'unit_with_percent';

    /**
     * The name of the price.
     */
    name: string;

    unit_with_percent_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionPackageWithAllocationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'package_with_allocation';

    /**
     * The name of the price.
     */
    name: string;

    package_with_allocation_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionTierWithProrationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'tiered_with_proration';

    /**
     * The name of the price.
     */
    name: string;

    tiered_with_proration_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionUnitWithProrationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'unit_with_proration';

    /**
     * The name of the price.
     */
    name: string;

    unit_with_proration_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionGroupedAllocationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    grouped_allocation_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'grouped_allocation';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionGroupedWithProratedMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    grouped_with_prorated_minimum_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'grouped_with_prorated_minimum';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionBulkWithProrationPrice {
    bulk_with_proration_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'bulk_with_proration';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionScalableMatrixWithUnitPricingPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'scalable_matrix_with_unit_pricing';

    /**
     * The name of the price.
     */
    name: string;

    scalable_matrix_with_unit_pricing_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionScalableMatrixWithTieredPricingPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'scalable_matrix_with_tiered_pricing';

    /**
     * The name of the price.
     */
    name: string;

    scalable_matrix_with_tiered_pricing_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionCumulativeGroupedBulkPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    cumulative_grouped_bulk_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'cumulative_grouped_bulk';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionMaxGroupTieredPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    max_group_tiered_package_config: Shared.CustomRatingFunctionConfigModel;

    model_type: 'max_group_tiered_package';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionGroupedWithMeteredMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    grouped_with_metered_minimum_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'grouped_with_metered_minimum';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionMatrixWithDisplayNamePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    matrix_with_display_name_config: Shared.CustomRatingFunctionConfigModel;

    model_type: 'matrix_with_display_name';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }

  export interface NewSubscriptionGroupedTieredPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    grouped_tiered_package_config: Shared.CustomRatingFunctionConfigModel;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'grouped_tiered_package';

    /**
     * The name of the price.
     */
    name: string;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    billing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * An ISO 4217 currency string, or custom pricing unit identifier, in which this
     * price is billed.
     */
    currency?: string | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    invoicing_cycle_configuration?: Shared.NewBillingCycleConfigurationModel | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * A transient ID that can be used to reference this price when adding adjustments
     * in the same API call.
     */
    reference_id?: string | null;
  }
}

export type NewTaxConfigurationModel =
  | NewTaxConfigurationModel.NewAvalaraTaxConfiguration
  | NewTaxConfigurationModel.NewTaxJarConfiguration;

export namespace NewTaxConfigurationModel {
  export interface NewAvalaraTaxConfiguration {
    tax_exempt: boolean;

    tax_provider: 'avalara';

    tax_exemption_code?: string | null;
  }

  export interface NewTaxJarConfiguration {
    tax_exempt: boolean;

    tax_provider: 'taxjar';
  }
}

export interface PackageConfigModel {
  /**
   * A currency amount to rate usage by
   */
  package_amount: string;

  /**
   * An integer amount to represent package size. For example, 1000 here would divide
   * usage by 1000 before multiplying by package_amount in rating
   */
  package_size: number;
}

export interface PaginationMetadata {
  has_more: boolean;

  next_cursor: string | null;
}

export interface PaginationMetadataModel {
  has_more: boolean;

  next_cursor: string | null;
}

export interface PaymentAttemptModel {
  /**
   * The ID of the payment attempt.
   */
  id: string;

  /**
   * The amount of the payment attempt.
   */
  amount: string;

  /**
   * The time at which the payment attempt was created.
   */
  created_at: string;

  /**
   * The payment provider that attempted to collect the payment.
   */
  payment_provider: 'stripe' | null;

  /**
   * The ID of the payment attempt in the payment provider.
   */
  payment_provider_id: string | null;

  /**
   * Whether the payment attempt succeeded.
   */
  succeeded: boolean;
}

export interface PercentageDiscount {
  /**
   * List of price_ids that this discount applies to. For plan/plan phase discounts,
   * this can be a subset of prices.
   */
  applies_to_price_ids: Array<string>;

  discount_type: 'percentage';

  /**
   * Only available if discount_type is `percentage`. This is a number between 0
   * and 1.
   */
  percentage_discount: number;

  reason?: string | null;
}

export interface PercentageDiscountIntervalModel {
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

export interface PercentageDiscountModel {
  /**
   * List of price_ids that this discount applies to. For plan/plan phase discounts,
   * this can be a subset of prices.
   */
  applies_to_price_ids: Array<string>;

  discount_type: 'percentage';

  /**
   * Only available if discount_type is `percentage`. This is a number between 0
   * and 1.
   */
  percentage_discount: number;

  reason?: string | null;
}

export interface PlanMinifiedModel {
  id: string | null;

  /**
   * An optional user-defined ID for this plan resource, used throughout the system
   * as an alias for this Plan. Use this field to identify a plan by an existing
   * identifier in your system.
   */
  external_plan_id: string | null;

  name: string | null;
}

/**
 * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
 * subscribed to by a customer. Plans define the billing behavior of the
 * subscription. You can see more about how to configure prices in the
 * [Price resource](/reference/price).
 */
export interface PlanModel {
  id: string;

  /**
   * Adjustments for this plan. If the plan has phases, this includes adjustments
   * across all phases of the plan.
   */
  adjustments: Array<AdjustmentModel>;

  base_plan: PlanMinifiedModel | null;

  /**
   * The parent plan id if the given plan was created by overriding one or more of
   * the parent's prices
   */
  base_plan_id: string | null;

  created_at: string;

  /**
   * @deprecated An ISO 4217 currency string or custom pricing unit (`credits`) for
   * this plan's prices.
   */
  currency: string;

  /**
   * The default memo text on the invoices corresponding to subscriptions on this
   * plan. Note that each subscription may configure its own memo.
   */
  default_invoice_memo: string | null;

  description: string;

  discount: Discount | null;

  /**
   * An optional user-defined ID for this plan resource, used throughout the system
   * as an alias for this Plan. Use this field to identify a plan by an existing
   * identifier in your system.
   */
  external_plan_id: string | null;

  /**
   * An ISO 4217 currency string for which this plan is billed in. Matches `currency`
   * unless `currency` is a custom pricing unit.
   */
  invoicing_currency: string;

  maximum: MaximumModel | null;

  maximum_amount: string | null;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  minimum: MinimumModel | null;

  minimum_amount: string | null;

  name: string;

  /**
   * Determines the difference between the invoice issue date and the due date. A
   * value of "0" here signifies that invoices are due on issue, whereas a value of
   * "30" means that the customer has a month to pay the invoice before its overdue.
   * Note that individual subscriptions or invoices may set a different net terms
   * configuration.
   */
  net_terms: number | null;

  plan_phases: Array<PlanModel.PlanPhase> | null;

  /**
   * Prices for this plan. If the plan has phases, this includes prices across all
   * phases of the plan.
   */
  prices: Array<PriceModel>;

  product: PlanModel.Product;

  status: 'active' | 'archived' | 'draft';

  trial_config: PlanModel.TrialConfig;

  version: number;
}

export namespace PlanModel {
  export interface PlanPhase {
    id: string;

    description: string | null;

    discount: Shared.Discount | null;

    /**
     * How many terms of length `duration_unit` this phase is active for. If null, this
     * phase is evergreen and active indefinitely
     */
    duration: number | null;

    duration_unit: 'daily' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | null;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    name: string;

    /**
     * Determines the ordering of the phase in a plan's lifecycle. 1 = first phase.
     */
    order: number;
  }

  export interface Product {
    id: string;

    created_at: string;

    name: string;
  }

  export interface TrialConfig {
    trial_period: number | null;

    trial_period_unit: 'days';
  }
}

export interface PriceIntervalFixedFeeQuantityTransitionModel {
  /**
   * The date that the fixed fee quantity transition should take effect.
   */
  effective_date: string;

  /**
   * The quantity of the fixed fee quantity transition.
   */
  quantity: number;
}

/**
 * The Price Interval resource represents a period of time for which a price will
 * bill on a subscription. A subscription’s price intervals define its billing
 * behavior.
 */
export interface PriceIntervalModel {
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
  fixed_fee_quantity_transitions: Array<PriceIntervalModel.FixedFeeQuantityTransition> | null;

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
  price: PriceModel;

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

export namespace PriceIntervalModel {
  export interface FixedFeeQuantityTransition {
    effective_date: string;

    price_id: string;

    quantity: number;
  }
}

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
export type PriceModel =
  | PriceModel.UnitPrice
  | PriceModel.PackagePrice
  | PriceModel.MatrixPrice
  | PriceModel.TieredPrice
  | PriceModel.TieredBpsPrice
  | PriceModel.BpsPrice
  | PriceModel.BulkBpsPrice
  | PriceModel.BulkPrice
  | PriceModel.ThresholdTotalAmountPrice
  | PriceModel.TieredPackagePrice
  | PriceModel.GroupedTieredPrice
  | PriceModel.TieredWithMinimumPrice
  | PriceModel.TieredPackageWithMinimumPrice
  | PriceModel.PackageWithAllocationPrice
  | PriceModel.UnitWithPercentPrice
  | PriceModel.MatrixWithAllocationPrice
  | PriceModel.TieredWithProrationPrice
  | PriceModel.UnitWithProrationPrice
  | PriceModel.GroupedAllocationPrice
  | PriceModel.GroupedWithProratedMinimumPrice
  | PriceModel.GroupedWithMeteredMinimumPrice
  | PriceModel.MatrixWithDisplayNamePrice
  | PriceModel.BulkWithProrationPrice
  | PriceModel.GroupedTieredPackagePrice
  | PriceModel.MaxGroupTieredPackagePrice
  | PriceModel.ScalableMatrixWithUnitPricingPrice
  | PriceModel.ScalableMatrixWithTieredPricingPrice
  | PriceModel.CumulativeGroupedBulkPrice;

export namespace PriceModel {
  export interface UnitPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'unit';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    unit_config: Shared.UnitConfigModel;

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface PackagePrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'package';

    name: string;

    package_config: Shared.PackageConfigModel;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface MatrixPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    matrix_config: Shared.MatrixConfigModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'matrix';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface TieredPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'tiered';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_config: Shared.TieredConfigModel;

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface TieredBpsPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'tiered_bps';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_bps_config: Shared.TieredBpsConfigModel;

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface BpsPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    bps_config: Shared.BpsConfigModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'bps';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface BulkBpsPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    bulk_bps_config: Shared.BulkBpsConfigModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'bulk_bps';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface BulkPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    bulk_config: Shared.BulkConfigModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'bulk';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface ThresholdTotalAmountPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'threshold_total_amount';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    threshold_total_amount_config: Shared.CustomRatingFunctionConfigModel;

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface TieredPackagePrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_package_config: Shared.CustomRatingFunctionConfigModel;

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface GroupedTieredPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_tiered_config: Shared.CustomRatingFunctionConfigModel;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'grouped_tiered';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface TieredWithMinimumPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'tiered_with_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_with_minimum_config: Shared.CustomRatingFunctionConfigModel;

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface TieredPackageWithMinimumPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'tiered_package_with_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_package_with_minimum_config: Shared.CustomRatingFunctionConfigModel;

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface PackageWithAllocationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'package_with_allocation';

    name: string;

    package_with_allocation_config: Shared.CustomRatingFunctionConfigModel;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface UnitWithPercentPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'unit_with_percent';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    unit_with_percent_config: Shared.CustomRatingFunctionConfigModel;

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface MatrixWithAllocationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    matrix_with_allocation_config: Shared.MatrixWithAllocationConfigModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'matrix_with_allocation';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface TieredWithProrationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'tiered_with_proration';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_with_proration_config: Shared.CustomRatingFunctionConfigModel;

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface UnitWithProrationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'unit_with_proration';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    unit_with_proration_config: Shared.CustomRatingFunctionConfigModel;

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface GroupedAllocationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_allocation_config: Shared.CustomRatingFunctionConfigModel;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'grouped_allocation';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface GroupedWithProratedMinimumPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_with_prorated_minimum_config: Shared.CustomRatingFunctionConfigModel;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'grouped_with_prorated_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface GroupedWithMeteredMinimumPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_with_metered_minimum_config: Shared.CustomRatingFunctionConfigModel;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'grouped_with_metered_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface MatrixWithDisplayNamePrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    matrix_with_display_name_config: Shared.CustomRatingFunctionConfigModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'matrix_with_display_name';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface BulkWithProrationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    bulk_with_proration_config: Shared.CustomRatingFunctionConfigModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'bulk_with_proration';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface GroupedTieredPackagePrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_tiered_package_config: Shared.CustomRatingFunctionConfigModel;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'grouped_tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface MaxGroupTieredPackagePrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    max_group_tiered_package_config: Shared.CustomRatingFunctionConfigModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'max_group_tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface ScalableMatrixWithUnitPricingPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'scalable_matrix_with_unit_pricing';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    scalable_matrix_with_unit_pricing_config: Shared.CustomRatingFunctionConfigModel;

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface ScalableMatrixWithTieredPricingPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'scalable_matrix_with_tiered_pricing';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    scalable_matrix_with_tiered_pricing_config: Shared.CustomRatingFunctionConfigModel;

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }

  export interface CumulativeGroupedBulkPrice {
    id: string;

    billable_metric: Shared.BillableMetricTinyModel | null;

    billing_cycle_configuration: Shared.BillingCycleConfigurationModel;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.AllocationModel | null;

    cumulative_grouped_bulk_config: Shared.CustomRatingFunctionConfigModel;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfigurationModel | null;

    item: Shared.ItemSlimModel;

    maximum: Shared.MaximumModel | null;

    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    minimum: Shared.MinimumModel | null;

    minimum_amount: string | null;

    model_type: 'cumulative_grouped_bulk';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfigurationModel | null;
  }
}

export interface RemoveSubscriptionAdjustmentParams {
  /**
   * The id of the adjustment to remove on the subscription.
   */
  adjustment_id: string;
}

export interface RemoveSubscriptionPriceParams {
  /**
   * The external price id of the price to remove on the subscription.
   */
  external_price_id?: string | null;

  /**
   * The id of the price to remove on the subscription.
   */
  price_id?: string | null;
}

export interface ReplaceSubscriptionAdjustmentParams {
  /**
   * The definition of a new adjustment to create and add to the subscription.
   */
  adjustment: NewAdjustmentModel;

  /**
   * The id of the adjustment on the plan to replace in the subscription.
   */
  replaces_adjustment_id: string;
}

export interface ReplaceSubscriptionPriceParams {
  /**
   * The id of the price on the plan to replace in the subscription.
   */
  replaces_price_id: string;

  /**
   * The definition of a new allocation price to create and add to the subscription.
   */
  allocation_price?: NewAllocationPriceModel | null;

  /**
   * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's
   * discounts for the replacement price.
   */
  discounts?: Array<DiscountOverrideModel> | null;

  /**
   * The external price id of the price to add to the subscription.
   */
  external_price_id?: string | null;

  /**
   * The new quantity of the price, if the price is a fixed price.
   */
  fixed_price_quantity?: number | null;

  /**
   * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's maximum
   * amount for the replacement price.
   */
  maximum_amount?: string | null;

  /**
   * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's minimum
   * amount for the replacement price.
   */
  minimum_amount?: string | null;

  /**
   * The definition of a new price to create and add to the subscription.
   */
  price?: NewSubscriptionPriceModel | null;

  /**
   * The id of the price to add to the subscription.
   */
  price_id?: string | null;
}

export interface SubLineItemGroupingModel {
  key: string;

  /**
   * No value indicates the default group
   */
  value: string | null;
}

export interface SubscriptionMinifiedModel {
  id: string;
}

/**
 * A [subscription](/core-concepts#subscription) represents the purchase of a plan
 * by a customer.
 *
 * By default, subscriptions begin on the day that they're created and renew
 * automatically for each billing cycle at the cadence that's configured in the
 * plan definition.
 *
 * Subscriptions also default to **beginning of month alignment**, which means the
 * first invoice issued for the subscription will have pro-rated charges between
 * the `start_date` and the first of the following month. Subsequent billing
 * periods will always start and end on a month boundary (e.g. subsequent month
 * starts for monthly billing).
 *
 * Depending on the plan configuration, any _flat_ recurring fees will be billed
 * either at the beginning (in-advance) or end (in-arrears) of each billing cycle.
 * Plans default to **in-advance billing**. Usage-based fees are billed in arrears
 * as usage is accumulated. In the normal course of events, you can expect an
 * invoice to contain usage-based charges for the previous period, and a recurring
 * fee for the following period.
 */
export interface SubscriptionModel {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<AdjustmentIntervalModel>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: BillingCycleAnchorConfigurationModel;

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
  customer: CustomerModel;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    AmountDiscountIntervalModel | PercentageDiscountIntervalModel | UsageDiscountIntervalModel
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<FixedFeeQuantityScheduleEntryModel>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<MaximumIntervalModel>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<MinimumIntervalModel>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlanModel;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<PriceIntervalModel>;

  redeemed_coupon: CouponRedemptionModel | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: SubscriptionTrialInfoModel;
}

export interface SubscriptionTrialInfoModel {
  end_date: string | null;
}

export interface SubscriptionsModel {
  data: Array<SubscriptionModel>;

  pagination_metadata: PaginationMetadata;
}

export interface TaxAmountModel {
  /**
   * The amount of additional tax incurred by this tax rate.
   */
  amount: string;

  /**
   * The human-readable description of the applied tax rate.
   */
  tax_rate_description: string;

  /**
   * The tax rate percentage, out of 100.
   */
  tax_rate_percentage: string | null;
}

/**
 * Thresholds are used to define the conditions under which an alert will be
 * triggered.
 */
export interface ThresholdModel {
  /**
   * The value at which an alert will fire. For credit balance alerts, the alert will
   * fire at or below this value. For usage and cost alerts, the alert will fire at
   * or above this value.
   */
  value: number;
}

export interface TieredBpsConfigModel {
  /**
   * Tiers for a Graduated BPS pricing model, where usage is bucketed into specified
   * tiers
   */
  tiers: Array<TieredBpsConfigModel.Tier>;
}

export namespace TieredBpsConfigModel {
  export interface Tier {
    /**
     * Per-event basis point rate
     */
    bps: number;

    /**
     * Inclusive tier starting value
     */
    minimum_amount: string;

    /**
     * Exclusive tier ending value
     */
    maximum_amount?: string | null;

    /**
     * Per unit maximum to charge
     */
    per_unit_maximum?: string | null;
  }
}

export interface TieredConfigModel {
  /**
   * Tiers for rating based on total usage quantities into the specified tier
   */
  tiers: Array<TieredConfigModel.Tier>;
}

export namespace TieredConfigModel {
  export interface Tier {
    /**
     * Inclusive tier starting value
     */
    first_unit: number;

    /**
     * Amount per unit
     */
    unit_amount: string;

    /**
     * Exclusive tier ending value. If null, this is treated as the last tier
     */
    last_unit?: number | null;
  }
}

export interface TopUpModel {
  id: string;

  /**
   * The amount to increment when the threshold is reached.
   */
  amount: string;

  /**
   * The currency or custom pricing unit to use for this top-up. If this is a
   * real-world currency, it must match the customer's invoicing currency.
   */
  currency: string;

  /**
   * Settings for invoices generated by triggered top-ups.
   */
  invoice_settings: TopUpModel.InvoiceSettings;

  /**
   * How much, in the customer's currency, to charge for each unit.
   */
  per_unit_cost_basis: string;

  /**
   * The threshold at which to trigger the top-up. If the balance is at or below this
   * threshold, the top-up will be triggered.
   */
  threshold: string;

  /**
   * The number of days or months after which the top-up expires. If unspecified, it
   * does not expire.
   */
  expires_after?: number | null;

  /**
   * The unit of expires_after.
   */
  expires_after_unit?: 'day' | 'month' | null;
}

export namespace TopUpModel {
  /**
   * Settings for invoices generated by triggered top-ups.
   */
  export interface InvoiceSettings {
    /**
     * Whether the credits purchase invoice should auto collect with the customer's
     * saved payment method.
     */
    auto_collection: boolean;

    /**
     * The net terms determines the difference between the invoice date and the issue
     * date for the invoice. If you intend the invoice to be due on issue, set this
     * to 0.
     */
    net_terms: number;

    /**
     * An optional memo to display on the invoice.
     */
    memo?: string | null;

    /**
     * If true, new credit blocks created by this top-up will require that the
     * corresponding invoice is paid before they can be drawn down from.
     */
    require_successful_payment?: boolean;
  }
}

export interface TopUpsModel {
  data: Array<TopUpModel>;

  pagination_metadata: PaginationMetadata;
}

export interface TrialDiscount {
  /**
   * List of price_ids that this discount applies to. For plan/plan phase discounts,
   * this can be a subset of prices.
   */
  applies_to_price_ids: Array<string>;

  discount_type: 'trial';

  reason?: string | null;

  /**
   * Only available if discount_type is `trial`
   */
  trial_amount_discount?: string | null;

  /**
   * Only available if discount_type is `trial`
   */
  trial_percentage_discount?: number | null;
}

export interface TrialDiscountModel {
  /**
   * List of price_ids that this discount applies to. For plan/plan phase discounts,
   * this can be a subset of prices.
   */
  applies_to_price_ids: Array<string>;

  discount_type: 'trial';

  reason?: string | null;

  /**
   * Only available if discount_type is `trial`
   */
  trial_amount_discount?: string | null;

  /**
   * Only available if discount_type is `trial`
   */
  trial_percentage_discount?: number | null;
}

export interface UnitConfigModel {
  /**
   * Rate per unit of usage
   */
  unit_amount: string;
}

export interface UpdatePriceRequestParams {
  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface UsageDiscountIntervalModel {
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

export interface UsageModel {
  quantity: number;

  timeframe_end: string;

  timeframe_start: string;
}

export class CouponModelsPage extends Page<CouponModel> {}

export class SubscriptionModelsPage extends Page<SubscriptionModel> {}

export class CreditNoteModelsPage extends Page<CreditNoteModel> {}

export class CustomerModelsPage extends Page<CustomerModel> {}

export class CreditLedgerEntryModelsPage extends Page<CreditLedgerEntryModel> {}

export class TopUpModelsPage extends Page<TopUpModel> {}

export class CustomerBalanceTransactionModelsPage extends Page<CustomerBalanceTransactionModel> {}

export class BackfillModelsPage extends Page<BackfillModel> {}

export class InvoiceModelsPage extends Page<InvoiceModel> {}

export class ItemModelsPage extends Page<ItemModel> {}

export class BillableMetricModelsPage extends Page<BillableMetricModel> {}

export class PlanModelsPage extends Page<PlanModel> {}

export class PriceModelsPage extends Page<PriceModel> {}

export class AlertModelsPage extends Page<AlertModel> {}

export class DimensionalPriceGroupModelsPage extends Page<DimensionalPriceGroupModel> {}
