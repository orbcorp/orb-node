// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as Shared from '../shared';
import * as VersionsAPI from './versions';
import { VersionCreateParams, VersionCreateResponse, VersionRetrieveResponse, Versions } from './versions';
import * as PricesAPI from '../prices/prices';
import * as ExternalPlanIDAPI from './external-plan-id/external-plan-id';
import {
  ExternalPlanID,
  ExternalPlanIDSetDefaultVersionParams,
  ExternalPlanIDUpdateParams,
} from './external-plan-id/external-plan-id';
import { Page, type PageParams } from '../../pagination';

export class Plans extends APIResource {
  externalPlanId: ExternalPlanIDAPI.ExternalPlanID = new ExternalPlanIDAPI.ExternalPlanID(this._client);
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

  /**
   * This endpoint allows creation of plans including their prices.
   */
  create(body: PlanCreateParams, options?: Core.RequestOptions): Core.APIPromise<Plan> {
    return this._client.post('/plans', { body, ...options });
  }

  /**
   * This endpoint can be used to update the `external_plan_id`, and `metadata` of an
   * existing plan.
   *
   * Other fields on a plan are currently immutable.
   */
  update(planId: string, body: PlanUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Plan> {
    return this._client.put(`/plans/${planId}`, { body, ...options });
  }

  /**
   * This endpoint returns a list of all [plans](/core-concepts#plan-and-price) for
   * an account in a list format. The list of plans is ordered starting from the most
   * recently created plan. The response also includes
   * [`pagination_metadata`](/api-reference/pagination), which lets the caller
   * retrieve the next page of results if they exist.
   */
  list(query?: PlanListParams, options?: Core.RequestOptions): Core.PagePromise<PlansPage, Plan>;
  list(options?: Core.RequestOptions): Core.PagePromise<PlansPage, Plan>;
  list(
    query: PlanListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<PlansPage, Plan> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/plans', PlansPage, { query, ...options });
  }

  /**
   * This endpoint is used to fetch [plan](/core-concepts#plan-and-price) details
   * given a plan identifier. It returns information about the prices included in the
   * plan and their configuration, as well as the product that the plan is attached
   * to.
   *
   * ## Serialized prices
   *
   * Orb supports a few different pricing models out of the box. Each of these models
   * is serialized differently in a given [Price](/core-concepts#plan-and-price)
   * object. The `model_type` field determines the key for the configuration object
   * that is present. A detailed explanation of price types can be found in the
   * [Price schema](/core-concepts#plan-and-price).
   *
   * ## Phases
   *
   * Orb supports plan phases, also known as contract ramps. For plans with phases,
   * the serialized prices refer to all prices across all phases.
   */
  fetch(planId: string, options?: Core.RequestOptions): Core.APIPromise<Plan> {
    return this._client.get(`/plans/${planId}`, options);
  }

  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint allows setting the default version of a plan.
   */
  setDefaultVersion(
    planId: string,
    body: PlanSetDefaultVersionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Plan> {
    return this._client.post(`/plans/${planId}/set_default_version`, { body, ...options });
  }
}

export class PlansPage extends Page<Plan> {}

/**
 * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
 * subscribed to by a customer. Plans define the billing behavior of the
 * subscription. You can see more about how to configure prices in the
 * [Price resource](/reference/price).
 */
export interface Plan {
  id: string;

  /**
   * Adjustments for this plan. If the plan has phases, this includes adjustments
   * across all phases of the plan.
   */
  adjustments: Array<
    | Plan.PlanPhaseUsageDiscountAdjustment
    | Plan.PlanPhaseAmountDiscountAdjustment
    | Plan.PlanPhasePercentageDiscountAdjustment
    | Plan.PlanPhaseMinimumAdjustment
    | Plan.PlanPhaseMaximumAdjustment
  >;

  base_plan: Plan.BasePlan | null;

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

  /**
   * @deprecated
   */
  discount: Shared.Discount | null;

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

  /**
   * @deprecated
   */
  maximum: Plan.Maximum | null;

  /**
   * @deprecated
   */
  maximum_amount: string | null;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * @deprecated
   */
  minimum: Plan.Minimum | null;

  /**
   * @deprecated
   */
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

  plan_phases: Array<Plan.PlanPhase> | null;

  /**
   * Prices for this plan. If the plan has phases, this includes prices across all
   * phases of the plan.
   */
  prices: Array<PricesAPI.Price>;

  product: Plan.Product;

  status: 'active' | 'archived' | 'draft';

  trial_config: Plan.TrialConfig;

  version: number;
}

export namespace Plan {
  export interface PlanPhaseUsageDiscountAdjustment {
    id: string;

    adjustment_type: 'usage_discount';

    /**
     * @deprecated The price IDs that this adjustment applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The filters that determine which prices to apply this adjustment to.
     */
    filters: Array<PlanPhaseUsageDiscountAdjustment.Filter>;

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

  export namespace PlanPhaseUsageDiscountAdjustment {
    export interface Filter {
      /**
       * The property of the price to filter on.
       */
      field: 'price_id' | 'item_id' | 'price_type' | 'currency' | 'pricing_unit_id';

      /**
       * Should prices that match the filter be included or excluded.
       */
      operator: 'includes' | 'excludes';

      /**
       * The IDs or values that match this filter.
       */
      values: Array<string>;
    }
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
     * @deprecated The price IDs that this adjustment applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The filters that determine which prices to apply this adjustment to.
     */
    filters: Array<PlanPhaseAmountDiscountAdjustment.Filter>;

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

  export namespace PlanPhaseAmountDiscountAdjustment {
    export interface Filter {
      /**
       * The property of the price to filter on.
       */
      field: 'price_id' | 'item_id' | 'price_type' | 'currency' | 'pricing_unit_id';

      /**
       * Should prices that match the filter be included or excluded.
       */
      operator: 'includes' | 'excludes';

      /**
       * The IDs or values that match this filter.
       */
      values: Array<string>;
    }
  }

  export interface PlanPhasePercentageDiscountAdjustment {
    id: string;

    adjustment_type: 'percentage_discount';

    /**
     * @deprecated The price IDs that this adjustment applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The filters that determine which prices to apply this adjustment to.
     */
    filters: Array<PlanPhasePercentageDiscountAdjustment.Filter>;

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

  export namespace PlanPhasePercentageDiscountAdjustment {
    export interface Filter {
      /**
       * The property of the price to filter on.
       */
      field: 'price_id' | 'item_id' | 'price_type' | 'currency' | 'pricing_unit_id';

      /**
       * Should prices that match the filter be included or excluded.
       */
      operator: 'includes' | 'excludes';

      /**
       * The IDs or values that match this filter.
       */
      values: Array<string>;
    }
  }

  export interface PlanPhaseMinimumAdjustment {
    id: string;

    adjustment_type: 'minimum';

    /**
     * @deprecated The price IDs that this adjustment applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The filters that determine which prices to apply this adjustment to.
     */
    filters: Array<PlanPhaseMinimumAdjustment.Filter>;

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

  export namespace PlanPhaseMinimumAdjustment {
    export interface Filter {
      /**
       * The property of the price to filter on.
       */
      field: 'price_id' | 'item_id' | 'price_type' | 'currency' | 'pricing_unit_id';

      /**
       * Should prices that match the filter be included or excluded.
       */
      operator: 'includes' | 'excludes';

      /**
       * The IDs or values that match this filter.
       */
      values: Array<string>;
    }
  }

  export interface PlanPhaseMaximumAdjustment {
    id: string;

    adjustment_type: 'maximum';

    /**
     * @deprecated The price IDs that this adjustment applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The filters that determine which prices to apply this adjustment to.
     */
    filters: Array<PlanPhaseMaximumAdjustment.Filter>;

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

  export namespace PlanPhaseMaximumAdjustment {
    export interface Filter {
      /**
       * The property of the price to filter on.
       */
      field: 'price_id' | 'item_id' | 'price_type' | 'currency' | 'pricing_unit_id';

      /**
       * Should prices that match the filter be included or excluded.
       */
      operator: 'includes' | 'excludes';

      /**
       * The IDs or values that match this filter.
       */
      values: Array<string>;
    }
  }

  export interface BasePlan {
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
   * @deprecated
   */
  export interface Maximum {
    /**
     * @deprecated List of price_ids that this maximum amount applies to. For plan/plan
     * phase maximums, this can be a subset of prices.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The filters that determine which prices to apply this maximum to.
     */
    filters: Array<Maximum.Filter>;

    /**
     * Maximum amount applied
     */
    maximum_amount: string;
  }

  export namespace Maximum {
    export interface Filter {
      /**
       * The property of the price to filter on.
       */
      field: 'price_id' | 'item_id' | 'price_type' | 'currency' | 'pricing_unit_id';

      /**
       * Should prices that match the filter be included or excluded.
       */
      operator: 'includes' | 'excludes';

      /**
       * The IDs or values that match this filter.
       */
      values: Array<string>;
    }
  }

  /**
   * @deprecated
   */
  export interface Minimum {
    /**
     * @deprecated List of price_ids that this minimum amount applies to. For plan/plan
     * phase minimums, this can be a subset of prices.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The filters that determine which prices to apply this minimum to.
     */
    filters: Array<Minimum.Filter>;

    /**
     * Minimum amount applied
     */
    minimum_amount: string;
  }

  export namespace Minimum {
    export interface Filter {
      /**
       * The property of the price to filter on.
       */
      field: 'price_id' | 'item_id' | 'price_type' | 'currency' | 'pricing_unit_id';

      /**
       * Should prices that match the filter be included or excluded.
       */
      operator: 'includes' | 'excludes';

      /**
       * The IDs or values that match this filter.
       */
      values: Array<string>;
    }
  }

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

    maximum: PlanPhase.Maximum | null;

    maximum_amount: string | null;

    minimum: PlanPhase.Minimum | null;

    minimum_amount: string | null;

    name: string;

    /**
     * Determines the ordering of the phase in a plan's lifecycle. 1 = first phase.
     */
    order: number;
  }

  export namespace PlanPhase {
    export interface Maximum {
      /**
       * @deprecated List of price_ids that this maximum amount applies to. For plan/plan
       * phase maximums, this can be a subset of prices.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The filters that determine which prices to apply this maximum to.
       */
      filters: Array<Maximum.Filter>;

      /**
       * Maximum amount applied
       */
      maximum_amount: string;
    }

    export namespace Maximum {
      export interface Filter {
        /**
         * The property of the price to filter on.
         */
        field: 'price_id' | 'item_id' | 'price_type' | 'currency' | 'pricing_unit_id';

        /**
         * Should prices that match the filter be included or excluded.
         */
        operator: 'includes' | 'excludes';

        /**
         * The IDs or values that match this filter.
         */
        values: Array<string>;
      }
    }

    export interface Minimum {
      /**
       * @deprecated List of price_ids that this minimum amount applies to. For plan/plan
       * phase minimums, this can be a subset of prices.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The filters that determine which prices to apply this minimum to.
       */
      filters: Array<Minimum.Filter>;

      /**
       * Minimum amount applied
       */
      minimum_amount: string;
    }

    export namespace Minimum {
      export interface Filter {
        /**
         * The property of the price to filter on.
         */
        field: 'price_id' | 'item_id' | 'price_type' | 'currency' | 'pricing_unit_id';

        /**
         * Should prices that match the filter be included or excluded.
         */
        operator: 'includes' | 'excludes';

        /**
         * The IDs or values that match this filter.
         */
        values: Array<string>;
      }
    }
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

export interface PlanCreateParams {
  /**
   * An ISO 4217 currency string for invoices generated by subscriptions on this
   * plan.
   */
  currency: string;

  name: string;

  /**
   * Prices for this plan. If the plan has phases, this includes prices across all
   * phases of the plan.
   */
  prices: Array<
    | PlanCreateParams.NewPlanUnitPrice
    | PlanCreateParams.NewPlanPackagePrice
    | PlanCreateParams.NewPlanMatrixPrice
    | PlanCreateParams.NewPlanTieredPrice
    | PlanCreateParams.NewPlanTieredBpsPrice
    | PlanCreateParams.NewPlanBpsPrice
    | PlanCreateParams.NewPlanBulkBpsPrice
    | PlanCreateParams.NewPlanBulkPrice
    | PlanCreateParams.NewPlanThresholdTotalAmountPrice
    | PlanCreateParams.NewPlanTieredPackagePrice
    | PlanCreateParams.NewPlanTieredWithMinimumPrice
    | PlanCreateParams.NewPlanUnitWithPercentPrice
    | PlanCreateParams.NewPlanPackageWithAllocationPrice
    | PlanCreateParams.NewPlanTierWithProrationPrice
    | PlanCreateParams.NewPlanUnitWithProrationPrice
    | PlanCreateParams.NewPlanGroupedAllocationPrice
    | PlanCreateParams.NewPlanGroupedWithProratedMinimumPrice
    | PlanCreateParams.NewPlanGroupedWithMeteredMinimumPrice
    | PlanCreateParams.NewPlanMatrixWithDisplayNamePrice
    | PlanCreateParams.NewPlanBulkWithProrationPrice
    | PlanCreateParams.NewPlanGroupedTieredPackagePrice
    | PlanCreateParams.NewPlanMaxGroupTieredPackagePrice
    | PlanCreateParams.NewPlanScalableMatrixWithUnitPricingPrice
    | PlanCreateParams.NewPlanScalableMatrixWithTieredPricingPrice
    | PlanCreateParams.NewPlanCumulativeGroupedBulkPrice
    | PlanCreateParams.NewPlanTieredPackageWithMinimumPrice
    | PlanCreateParams.NewPlanMatrixWithAllocationPrice
    | PlanCreateParams.NewPlanGroupedTieredPrice
  >;

  /**
   * Free-form text which is available on the invoice PDF and the Orb invoice portal.
   */
  default_invoice_memo?: string | null;

  external_plan_id?: string | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;

  /**
   * The net terms determines the difference between the invoice date and the issue
   * date for the invoice. If you intend the invoice to be due on issue, set this
   * to 0.
   */
  net_terms?: number | null;

  /**
   * The status of the plan to create (either active or draft). If not specified,
   * this defaults to active.
   */
  status?: 'active' | 'draft';
}

export namespace PlanCreateParams {
  export interface NewPlanUnitPrice {
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

    unit_config: NewPlanUnitPrice.UnitConfig;

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
    billing_cycle_configuration?: NewPlanUnitPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanUnitPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanUnitPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanUnitPrice {
    export interface UnitConfig {
      /**
       * Rate per unit of usage
       */
      unit_amount: string;
    }

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanPackagePrice {
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

    package_config: NewPlanPackagePrice.PackageConfig;

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
    billing_cycle_configuration?: NewPlanPackagePrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanPackagePrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanPackagePrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanPackagePrice {
    export interface PackageConfig {
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

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanMatrixPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    matrix_config: NewPlanMatrixPrice.MatrixConfig;

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
    billing_cycle_configuration?: NewPlanMatrixPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanMatrixPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanMatrixPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanMatrixPrice {
    export interface MatrixConfig {
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
      matrix_values: Array<MatrixConfig.MatrixValue>;
    }

    export namespace MatrixConfig {
      export interface MatrixValue {
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
    }

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanTieredPrice {
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

    tiered_config: NewPlanTieredPrice.TieredConfig;

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
    billing_cycle_configuration?: NewPlanTieredPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanTieredPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanTieredPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanTieredPrice {
    export interface TieredConfig {
      /**
       * Tiers for rating based on total usage quantities into the specified tier
       */
      tiers: Array<TieredConfig.Tier>;
    }

    export namespace TieredConfig {
      export interface Tier {
        /**
         * Exclusive tier starting value
         */
        first_unit: number;

        /**
         * Amount per unit
         */
        unit_amount: string;

        /**
         * Inclusive tier ending value. If null, this is treated as the last tier
         */
        last_unit?: number | null;
      }
    }

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanTieredBpsPrice {
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

    tiered_bps_config: NewPlanTieredBpsPrice.TieredBpsConfig;

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
    billing_cycle_configuration?: NewPlanTieredBpsPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanTieredBpsPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanTieredBpsPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanTieredBpsPrice {
    export interface TieredBpsConfig {
      /**
       * Tiers for a Graduated BPS pricing model, where usage is bucketed into specified
       * tiers
       */
      tiers: Array<TieredBpsConfig.Tier>;
    }

    export namespace TieredBpsConfig {
      export interface Tier {
        /**
         * Per-event basis point rate
         */
        bps: number;

        /**
         * Exclusive tier starting value
         */
        minimum_amount: string;

        /**
         * Inclusive tier ending value
         */
        maximum_amount?: string | null;

        /**
         * Per unit maximum to charge
         */
        per_unit_maximum?: string | null;
      }
    }

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanBpsPrice {
    bps_config: NewPlanBpsPrice.BpsConfig;

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
    billing_cycle_configuration?: NewPlanBpsPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanBpsPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanBpsPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanBpsPrice {
    export interface BpsConfig {
      /**
       * Basis point take rate per event
       */
      bps: number;

      /**
       * Optional currency amount maximum to cap spend per event
       */
      per_unit_maximum?: string | null;
    }

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanBulkBpsPrice {
    bulk_bps_config: NewPlanBulkBpsPrice.BulkBpsConfig;

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
    billing_cycle_configuration?: NewPlanBulkBpsPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanBulkBpsPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanBulkBpsPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanBulkBpsPrice {
    export interface BulkBpsConfig {
      /**
       * Tiers for a bulk BPS pricing model where all usage is aggregated to a single
       * tier based on total volume
       */
      tiers: Array<BulkBpsConfig.Tier>;
    }

    export namespace BulkBpsConfig {
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

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanBulkPrice {
    bulk_config: NewPlanBulkPrice.BulkConfig;

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
    billing_cycle_configuration?: NewPlanBulkPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanBulkPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanBulkPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanBulkPrice {
    export interface BulkConfig {
      /**
       * Bulk tiers for rating based on total usage volume
       */
      tiers: Array<BulkConfig.Tier>;
    }

    export namespace BulkConfig {
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
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanThresholdTotalAmountPrice {
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

    threshold_total_amount_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanThresholdTotalAmountPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanThresholdTotalAmountPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanThresholdTotalAmountPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanThresholdTotalAmountPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanTieredPackagePrice {
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

    tiered_package_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanTieredPackagePrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanTieredPackagePrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanTieredPackagePrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanTieredPackagePrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanTieredWithMinimumPrice {
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

    tiered_with_minimum_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanTieredWithMinimumPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanTieredWithMinimumPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanTieredWithMinimumPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanTieredWithMinimumPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanUnitWithPercentPrice {
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

    unit_with_percent_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanUnitWithPercentPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanUnitWithPercentPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanUnitWithPercentPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanUnitWithPercentPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanPackageWithAllocationPrice {
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

    package_with_allocation_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanPackageWithAllocationPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanPackageWithAllocationPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanPackageWithAllocationPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanPackageWithAllocationPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanTierWithProrationPrice {
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

    tiered_with_proration_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanTierWithProrationPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanTierWithProrationPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanTierWithProrationPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanTierWithProrationPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanUnitWithProrationPrice {
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

    unit_with_proration_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanUnitWithProrationPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanUnitWithProrationPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanUnitWithProrationPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanUnitWithProrationPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanGroupedAllocationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    grouped_allocation_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanGroupedAllocationPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanGroupedAllocationPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanGroupedAllocationPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanGroupedAllocationPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanGroupedWithProratedMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    grouped_with_prorated_minimum_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanGroupedWithProratedMinimumPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanGroupedWithProratedMinimumPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanGroupedWithProratedMinimumPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanGroupedWithProratedMinimumPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanGroupedWithMeteredMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    grouped_with_metered_minimum_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanGroupedWithMeteredMinimumPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanGroupedWithMeteredMinimumPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanGroupedWithMeteredMinimumPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanGroupedWithMeteredMinimumPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanMatrixWithDisplayNamePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    matrix_with_display_name_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanMatrixWithDisplayNamePrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanMatrixWithDisplayNamePrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanMatrixWithDisplayNamePrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanMatrixWithDisplayNamePrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanBulkWithProrationPrice {
    bulk_with_proration_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanBulkWithProrationPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanBulkWithProrationPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanBulkWithProrationPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanBulkWithProrationPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanGroupedTieredPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    grouped_tiered_package_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanGroupedTieredPackagePrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanGroupedTieredPackagePrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanGroupedTieredPackagePrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanGroupedTieredPackagePrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanMaxGroupTieredPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    max_group_tiered_package_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanMaxGroupTieredPackagePrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanMaxGroupTieredPackagePrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanMaxGroupTieredPackagePrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanMaxGroupTieredPackagePrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanScalableMatrixWithUnitPricingPrice {
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

    scalable_matrix_with_unit_pricing_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanScalableMatrixWithUnitPricingPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanScalableMatrixWithUnitPricingPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanScalableMatrixWithUnitPricingPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanScalableMatrixWithUnitPricingPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanScalableMatrixWithTieredPricingPrice {
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

    scalable_matrix_with_tiered_pricing_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanScalableMatrixWithTieredPricingPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanScalableMatrixWithTieredPricingPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanScalableMatrixWithTieredPricingPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanScalableMatrixWithTieredPricingPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanCumulativeGroupedBulkPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    cumulative_grouped_bulk_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanCumulativeGroupedBulkPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanCumulativeGroupedBulkPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanCumulativeGroupedBulkPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanCumulativeGroupedBulkPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanTieredPackageWithMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    model_type: 'tiered_package_with_minimum';

    /**
     * The name of the price.
     */
    name: string;

    tiered_package_with_minimum_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanTieredPackageWithMinimumPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanTieredPackageWithMinimumPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanTieredPackageWithMinimumPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanTieredPackageWithMinimumPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanMatrixWithAllocationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

    matrix_with_allocation_config: NewPlanMatrixWithAllocationPrice.MatrixWithAllocationConfig;

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
    billing_cycle_configuration?: NewPlanMatrixWithAllocationPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanMatrixWithAllocationPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanMatrixWithAllocationPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanMatrixWithAllocationPrice {
    export interface MatrixWithAllocationConfig {
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
      matrix_values: Array<MatrixWithAllocationConfig.MatrixValue>;
    }

    export namespace MatrixWithAllocationConfig {
      export interface MatrixValue {
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
    }

    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }

  export interface NewPlanGroupedTieredPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    grouped_tiered_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewPlanGroupedTieredPrice.BillingCycleConfiguration | null;

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
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewPlanGroupedTieredPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewPlanGroupedTieredPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewPlanGroupedTieredPrice {
    /**
     * For custom cadence: specifies the duration of the billing period in days or
     * months.
     */
    export interface BillingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    export interface DimensionalPriceConfiguration {
      /**
       * The list of dimension values matching (in order) the dimensions of the price
       * group
       */
      dimension_values: Array<string>;

      /**
       * The id of the dimensional price group to include this price in
       */
      dimensional_price_group_id?: string | null;

      /**
       * The external id of the dimensional price group to include this price in
       */
      external_dimensional_price_group_id?: string | null;
    }

    /**
     * Within each billing cycle, specifies the cadence at which invoices are produced.
     * If unspecified, a single invoice is produced per billing cycle.
     */
    export interface InvoicingCycleConfiguration {
      /**
       * The duration of the billing period.
       */
      duration: number;

      /**
       * The unit of billing period duration.
       */
      duration_unit: 'day' | 'month';
    }
  }
}

export interface PlanUpdateParams {
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

export interface PlanListParams extends PageParams {
  'created_at[gt]'?: string | null;

  'created_at[gte]'?: string | null;

  'created_at[lt]'?: string | null;

  'created_at[lte]'?: string | null;

  /**
   * The plan status to filter to ('active', 'archived', or 'draft').
   */
  status?: 'active' | 'archived' | 'draft';
}

export interface PlanSetDefaultVersionParams {
  /**
   * Plan version to set as the default.
   */
  version: number;
}

Plans.PlansPage = PlansPage;
Plans.ExternalPlanID = ExternalPlanID;
Plans.Versions = Versions;

export declare namespace Plans {
  export {
    type Plan as Plan,
    PlansPage as PlansPage,
    type PlanCreateParams as PlanCreateParams,
    type PlanUpdateParams as PlanUpdateParams,
    type PlanListParams as PlanListParams,
    type PlanSetDefaultVersionParams as PlanSetDefaultVersionParams,
  };

  export {
    ExternalPlanID as ExternalPlanID,
    type ExternalPlanIDUpdateParams as ExternalPlanIDUpdateParams,
    type ExternalPlanIDSetDefaultVersionParams as ExternalPlanIDSetDefaultVersionParams,
  };

  export {
    Versions as Versions,
    type VersionCreateResponse as VersionCreateResponse,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionCreateParams as VersionCreateParams,
  };
}
