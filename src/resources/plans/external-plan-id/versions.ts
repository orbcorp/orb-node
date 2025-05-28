// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';
import * as PricesAPI from '../../prices/prices';

export class Versions extends APIResource {
  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint allows the creation of a new plan version for an existing plan.
   */
  create(
    externalPlanId: string,
    body: VersionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VersionCreateResponse> {
    return this._client.post(`/plans/external_plan_id/${externalPlanId}/versions`, { body, ...options });
  }

  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint is used to fetch a plan version. It returns the phases, prices,
   * and adjustments present on this version of the plan.
   */
  retrieve(
    externalPlanId: string,
    version: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VersionRetrieveResponse> {
    return this._client.get(`/plans/external_plan_id/${externalPlanId}/versions/${version}`, options);
  }
}

/**
 * The PlanVersion resource represents the prices and adjustments present on a
 * specific version of a plan.
 */
export interface VersionCreateResponse {
  /**
   * Adjustments for this plan. If the plan has phases, this includes adjustments
   * across all phases of the plan.
   */
  adjustments: Array<
    | VersionCreateResponse.PlanPhaseUsageDiscountAdjustment
    | VersionCreateResponse.PlanPhaseAmountDiscountAdjustment
    | VersionCreateResponse.PlanPhasePercentageDiscountAdjustment
    | VersionCreateResponse.PlanPhaseMinimumAdjustment
    | VersionCreateResponse.PlanPhaseMaximumAdjustment
  >;

  created_at: string;

  plan_phases: Array<VersionCreateResponse.PlanPhase> | null;

  /**
   * Prices for this plan. If the plan has phases, this includes prices across all
   * phases of the plan.
   */
  prices: Array<PricesAPI.Price>;

  version: number;
}

export namespace VersionCreateResponse {
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

  export interface PlanPhase {
    id: string;

    description: string | null;

    /**
     * How many terms of length `duration_unit` this phase is active for. If null, this
     * phase is evergreen and active indefinitely
     */
    duration: number | null;

    duration_unit: 'daily' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | null;

    name: string;

    /**
     * Determines the ordering of the phase in a plan's lifecycle. 1 = first phase.
     */
    order: number;
  }
}

/**
 * The PlanVersion resource represents the prices and adjustments present on a
 * specific version of a plan.
 */
export interface VersionRetrieveResponse {
  /**
   * Adjustments for this plan. If the plan has phases, this includes adjustments
   * across all phases of the plan.
   */
  adjustments: Array<
    | VersionRetrieveResponse.PlanPhaseUsageDiscountAdjustment
    | VersionRetrieveResponse.PlanPhaseAmountDiscountAdjustment
    | VersionRetrieveResponse.PlanPhasePercentageDiscountAdjustment
    | VersionRetrieveResponse.PlanPhaseMinimumAdjustment
    | VersionRetrieveResponse.PlanPhaseMaximumAdjustment
  >;

  created_at: string;

  plan_phases: Array<VersionRetrieveResponse.PlanPhase> | null;

  /**
   * Prices for this plan. If the plan has phases, this includes prices across all
   * phases of the plan.
   */
  prices: Array<PricesAPI.Price>;

  version: number;
}

export namespace VersionRetrieveResponse {
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

  export interface PlanPhase {
    id: string;

    description: string | null;

    /**
     * How many terms of length `duration_unit` this phase is active for. If null, this
     * phase is evergreen and active indefinitely
     */
    duration: number | null;

    duration_unit: 'daily' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | null;

    name: string;

    /**
     * Determines the ordering of the phase in a plan's lifecycle. 1 = first phase.
     */
    order: number;
  }
}

export interface VersionCreateParams {
  /**
   * New version number.
   */
  version: number;

  /**
   * Additional adjustments to be added to the plan.
   */
  add_adjustments?: Array<VersionCreateParams.AddAdjustment> | null;

  /**
   * Additional prices to be added to the plan.
   */
  add_prices?: Array<VersionCreateParams.AddPrice> | null;

  /**
   * Adjustments to be removed from the plan.
   */
  remove_adjustments?: Array<VersionCreateParams.RemoveAdjustment> | null;

  /**
   * Prices to be removed from the plan.
   */
  remove_prices?: Array<VersionCreateParams.RemovePrice> | null;

  /**
   * Adjustments to be replaced with additional adjustments on the plan.
   */
  replace_adjustments?: Array<VersionCreateParams.ReplaceAdjustment> | null;

  /**
   * Prices to be replaced with additional prices on the plan.
   */
  replace_prices?: Array<VersionCreateParams.ReplacePrice> | null;

  /**
   * Set this new plan version as the default
   */
  set_as_default?: boolean | null;
}

export namespace VersionCreateParams {
  export interface AddAdjustment {
    /**
     * The definition of a new adjustment to create and add to the plan.
     */
    adjustment:
      | AddAdjustment.NewPercentageDiscount
      | AddAdjustment.NewUsageDiscount
      | AddAdjustment.NewAmountDiscount
      | AddAdjustment.NewMinimum
      | AddAdjustment.NewMaximum;

    /**
     * The phase to add this adjustment to.
     */
    plan_phase_order?: number | null;
  }

  export namespace AddAdjustment {
    export interface NewPercentageDiscount {
      adjustment_type: 'percentage_discount';

      percentage_discount: number;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewUsageDiscount {
      adjustment_type: 'usage_discount';

      usage_discount: number;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids?: Array<string> | null;

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
      applies_to_price_ids?: Array<string> | null;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMinimum {
      adjustment_type: 'minimum';

      /**
       * The item ID that revenue from this minimum will be attributed to.
       */
      item_id: string;

      minimum_amount: string;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMaximum {
      adjustment_type: 'maximum';

      maximum_amount: string;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }
  }

  export interface AddPrice {
    /**
     * The allocation price to add to the plan.
     */
    allocation_price?: AddPrice.AllocationPrice | null;

    /**
     * The phase to add this price to.
     */
    plan_phase_order?: number | null;

    /**
     * The price to add to the plan
     */
    price?:
      | AddPrice.NewPlanUnitPrice
      | AddPrice.NewPlanPackagePrice
      | AddPrice.NewPlanMatrixPrice
      | AddPrice.NewPlanTieredPrice
      | AddPrice.NewPlanTieredBpsPrice
      | AddPrice.NewPlanBpsPrice
      | AddPrice.NewPlanBulkBpsPrice
      | AddPrice.NewPlanBulkPrice
      | AddPrice.NewPlanThresholdTotalAmountPrice
      | AddPrice.NewPlanTieredPackagePrice
      | AddPrice.NewPlanTieredWithMinimumPrice
      | AddPrice.NewPlanUnitWithPercentPrice
      | AddPrice.NewPlanPackageWithAllocationPrice
      | AddPrice.NewPlanTierWithProrationPrice
      | AddPrice.NewPlanUnitWithProrationPrice
      | AddPrice.NewPlanGroupedAllocationPrice
      | AddPrice.NewPlanGroupedWithProratedMinimumPrice
      | AddPrice.NewPlanGroupedWithMeteredMinimumPrice
      | AddPrice.NewPlanMatrixWithDisplayNamePrice
      | AddPrice.NewPlanBulkWithProrationPrice
      | AddPrice.NewPlanGroupedTieredPackagePrice
      | AddPrice.NewPlanMaxGroupTieredPackagePrice
      | AddPrice.NewPlanScalableMatrixWithUnitPricingPrice
      | AddPrice.NewPlanScalableMatrixWithTieredPricingPrice
      | AddPrice.NewPlanCumulativeGroupedBulkPrice
      | AddPrice.NewPlanTieredPackageWithMinimumPrice
      | AddPrice.NewPlanMatrixWithAllocationPrice
      | AddPrice.NewPlanGroupedTieredPrice
      | null;
  }

  export namespace AddPrice {
    /**
     * The allocation price to add to the plan.
     */
    export interface AllocationPrice {
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

  export interface RemoveAdjustment {
    /**
     * The id of the adjustment to remove from on the plan.
     */
    adjustment_id: string;

    /**
     * The phase to remove this adjustment from.
     */
    plan_phase_order?: number | null;
  }

  export interface RemovePrice {
    /**
     * The id of the price to remove from the plan.
     */
    price_id: string;

    /**
     * The phase to remove this price from.
     */
    plan_phase_order?: number | null;
  }

  export interface ReplaceAdjustment {
    /**
     * The definition of a new adjustment to create and add to the plan.
     */
    adjustment:
      | ReplaceAdjustment.NewPercentageDiscount
      | ReplaceAdjustment.NewUsageDiscount
      | ReplaceAdjustment.NewAmountDiscount
      | ReplaceAdjustment.NewMinimum
      | ReplaceAdjustment.NewMaximum;

    /**
     * The id of the adjustment on the plan to replace in the plan.
     */
    replaces_adjustment_id: string;

    /**
     * The phase to replace this adjustment from.
     */
    plan_phase_order?: number | null;
  }

  export namespace ReplaceAdjustment {
    export interface NewPercentageDiscount {
      adjustment_type: 'percentage_discount';

      percentage_discount: number;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewUsageDiscount {
      adjustment_type: 'usage_discount';

      usage_discount: number;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids?: Array<string> | null;

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
      applies_to_price_ids?: Array<string> | null;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMinimum {
      adjustment_type: 'minimum';

      /**
       * The item ID that revenue from this minimum will be attributed to.
       */
      item_id: string;

      minimum_amount: string;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMaximum {
      adjustment_type: 'maximum';

      maximum_amount: string;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }
  }

  export interface ReplacePrice {
    /**
     * The id of the price on the plan to replace in the plan.
     */
    replaces_price_id: string;

    /**
     * The allocation price to add to the plan.
     */
    allocation_price?: ReplacePrice.AllocationPrice | null;

    /**
     * The phase to replace this price from.
     */
    plan_phase_order?: number | null;

    /**
     * The price to add to the plan
     */
    price?:
      | ReplacePrice.NewPlanUnitPrice
      | ReplacePrice.NewPlanPackagePrice
      | ReplacePrice.NewPlanMatrixPrice
      | ReplacePrice.NewPlanTieredPrice
      | ReplacePrice.NewPlanTieredBpsPrice
      | ReplacePrice.NewPlanBpsPrice
      | ReplacePrice.NewPlanBulkBpsPrice
      | ReplacePrice.NewPlanBulkPrice
      | ReplacePrice.NewPlanThresholdTotalAmountPrice
      | ReplacePrice.NewPlanTieredPackagePrice
      | ReplacePrice.NewPlanTieredWithMinimumPrice
      | ReplacePrice.NewPlanUnitWithPercentPrice
      | ReplacePrice.NewPlanPackageWithAllocationPrice
      | ReplacePrice.NewPlanTierWithProrationPrice
      | ReplacePrice.NewPlanUnitWithProrationPrice
      | ReplacePrice.NewPlanGroupedAllocationPrice
      | ReplacePrice.NewPlanGroupedWithProratedMinimumPrice
      | ReplacePrice.NewPlanGroupedWithMeteredMinimumPrice
      | ReplacePrice.NewPlanMatrixWithDisplayNamePrice
      | ReplacePrice.NewPlanBulkWithProrationPrice
      | ReplacePrice.NewPlanGroupedTieredPackagePrice
      | ReplacePrice.NewPlanMaxGroupTieredPackagePrice
      | ReplacePrice.NewPlanScalableMatrixWithUnitPricingPrice
      | ReplacePrice.NewPlanScalableMatrixWithTieredPricingPrice
      | ReplacePrice.NewPlanCumulativeGroupedBulkPrice
      | ReplacePrice.NewPlanTieredPackageWithMinimumPrice
      | ReplacePrice.NewPlanMatrixWithAllocationPrice
      | ReplacePrice.NewPlanGroupedTieredPrice
      | null;
  }

  export namespace ReplacePrice {
    /**
     * The allocation price to add to the plan.
     */
    export interface AllocationPrice {
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
}

export declare namespace Versions {
  export {
    type VersionCreateResponse as VersionCreateResponse,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionCreateParams as VersionCreateParams,
  };
}
