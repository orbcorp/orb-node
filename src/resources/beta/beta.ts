// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as Shared from '../shared';
import * as ExternalPlanIDAPI from './external-plan-id';
import {
  ExternalPlanID,
  ExternalPlanIDCreatePlanVersionParams,
  ExternalPlanIDSetDefaultPlanVersionParams,
} from './external-plan-id';
import * as PlansAPI from '../plans/plans';

export class Beta extends APIResource {
  externalPlanId: ExternalPlanIDAPI.ExternalPlanID = new ExternalPlanIDAPI.ExternalPlanID(this._client);

  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint allows the creation of a new plan version for an existing plan.
   */
  createPlanVersion(
    planId: string,
    body: BetaCreatePlanVersionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PlanVersion> {
    return this._client.post(`/plans/${planId}/versions`, { body, ...options });
  }

  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint is used to fetch a plan version. It returns the phases, prices,
   * and adjustments present on this version of the plan.
   */
  fetchPlanVersion(
    planId: string,
    version: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PlanVersion> {
    return this._client.get(`/plans/${planId}/versions/${version}`, options);
  }

  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint allows setting the default version of a plan.
   */
  setDefaultPlanVersion(
    planId: string,
    body: BetaSetDefaultPlanVersionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PlansAPI.Plan> {
    return this._client.post(`/plans/${planId}/set_default_version`, { body, ...options });
  }
}

/**
 * The PlanVersion resource represents the prices and adjustments present on a
 * specific version of a plan.
 */
export interface PlanVersion {
  /**
   * Adjustments for this plan. If the plan has phases, this includes adjustments
   * across all phases of the plan.
   */
  adjustments: Array<
    | Shared.PlanPhaseUsageDiscountAdjustment
    | Shared.PlanPhaseAmountDiscountAdjustment
    | Shared.PlanPhasePercentageDiscountAdjustment
    | Shared.PlanPhaseMinimumAdjustment
    | Shared.PlanPhaseMaximumAdjustment
  >;

  created_at: string;

  plan_phases: Array<PlanVersionPhase> | null;

  /**
   * Prices for this plan. If the plan has phases, this includes prices across all
   * phases of the plan.
   */
  prices: Array<Shared.Price>;

  version: number;
}

export interface PlanVersionPhase {
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

export interface BetaCreatePlanVersionParams {
  /**
   * New version number.
   */
  version: number;

  /**
   * Additional adjustments to be added to the plan.
   */
  add_adjustments?: Array<BetaCreatePlanVersionParams.AddAdjustment> | null;

  /**
   * Additional prices to be added to the plan.
   */
  add_prices?: Array<BetaCreatePlanVersionParams.AddPrice> | null;

  /**
   * Adjustments to be removed from the plan.
   */
  remove_adjustments?: Array<BetaCreatePlanVersionParams.RemoveAdjustment> | null;

  /**
   * Prices to be removed from the plan.
   */
  remove_prices?: Array<BetaCreatePlanVersionParams.RemovePrice> | null;

  /**
   * Adjustments to be replaced with additional adjustments on the plan.
   */
  replace_adjustments?: Array<BetaCreatePlanVersionParams.ReplaceAdjustment> | null;

  /**
   * Prices to be replaced with additional prices on the plan.
   */
  replace_prices?: Array<BetaCreatePlanVersionParams.ReplacePrice> | null;

  /**
   * Set this new plan version as the default
   */
  set_as_default?: boolean | null;
}

export namespace BetaCreatePlanVersionParams {
  export interface AddAdjustment {
    /**
     * The definition of a new adjustment to create and add to the plan.
     */
    adjustment:
      | Shared.NewPercentageDiscount
      | Shared.NewUsageDiscount
      | Shared.NewAmountDiscount
      | Shared.NewMinimum
      | Shared.NewMaximum;

    /**
     * The phase to add this adjustment to.
     */
    plan_phase_order?: number | null;
  }

  export interface AddPrice {
    /**
     * The allocation price to add to the plan.
     */
    allocation_price?: Shared.NewAllocationPrice | null;

    /**
     * The phase to add this price to.
     */
    plan_phase_order?: number | null;

    /**
     * The price to add to the plan
     */
    price?:
      | Shared.NewPlanUnitPrice
      | Shared.NewPlanPackagePrice
      | Shared.NewPlanMatrixPrice
      | Shared.NewPlanTieredPrice
      | Shared.NewPlanBulkPrice
      | Shared.NewPlanThresholdTotalAmountPrice
      | Shared.NewPlanTieredPackagePrice
      | Shared.NewPlanTieredWithMinimumPrice
      | Shared.NewPlanUnitWithPercentPrice
      | Shared.NewPlanPackageWithAllocationPrice
      | Shared.NewPlanTierWithProrationPrice
      | Shared.NewPlanUnitWithProrationPrice
      | Shared.NewPlanGroupedAllocationPrice
      | Shared.NewPlanGroupedWithProratedMinimumPrice
      | Shared.NewPlanGroupedWithMeteredMinimumPrice
      | AddPrice.NewPlanGroupedWithMinMaxThresholdsPrice
      | Shared.NewPlanMatrixWithDisplayNamePrice
      | Shared.NewPlanBulkWithProrationPrice
      | Shared.NewPlanGroupedTieredPackagePrice
      | Shared.NewPlanMaxGroupTieredPackagePrice
      | Shared.NewPlanScalableMatrixWithUnitPricingPrice
      | Shared.NewPlanScalableMatrixWithTieredPricingPrice
      | Shared.NewPlanCumulativeGroupedBulkPrice
      | Shared.NewPlanTieredPackageWithMinimumPrice
      | Shared.NewPlanMatrixWithAllocationPrice
      | Shared.NewPlanGroupedTieredPrice
      | AddPrice.NewPlanMinimumCompositePrice
      | null;
  }

  export namespace AddPrice {
    export interface NewPlanGroupedWithMinMaxThresholdsPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      grouped_with_min_max_thresholds_config: { [key: string]: unknown };

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      model_type: 'grouped_with_min_max_thresholds';

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
      billing_cycle_configuration?: Shared.NewBillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * The configuration for the rate of the price currency to the invoicing currency.
       */
      conversion_rate_config?: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

      /**
       * An ISO 4217 currency string, or custom pricing unit identifier, in which this
       * price is billed.
       */
      currency?: string | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: Shared.NewDimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: Shared.NewBillingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: { [key: string]: string | null } | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export interface NewPlanMinimumCompositePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      minimum_config: NewPlanMinimumCompositePrice.MinimumConfig;

      model_type: 'minimum';

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
      billing_cycle_configuration?: Shared.NewBillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * The configuration for the rate of the price currency to the invoicing currency.
       */
      conversion_rate_config?: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

      /**
       * An ISO 4217 currency string, or custom pricing unit identifier, in which this
       * price is billed.
       */
      currency?: string | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: Shared.NewDimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: Shared.NewBillingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: { [key: string]: string | null } | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewPlanMinimumCompositePrice {
      export interface MinimumConfig {
        /**
         * The minimum amount to apply
         */
        minimum_amount: string;

        /**
         * By default, subtotals from minimum composite prices are prorated based on the
         * service period. Set to false to disable proration.
         */
        prorated?: boolean | null;
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
      | Shared.NewPercentageDiscount
      | Shared.NewUsageDiscount
      | Shared.NewAmountDiscount
      | Shared.NewMinimum
      | Shared.NewMaximum;

    /**
     * The id of the adjustment on the plan to replace in the plan.
     */
    replaces_adjustment_id: string;

    /**
     * The phase to replace this adjustment from.
     */
    plan_phase_order?: number | null;
  }

  export interface ReplacePrice {
    /**
     * The id of the price on the plan to replace in the plan.
     */
    replaces_price_id: string;

    /**
     * The allocation price to add to the plan.
     */
    allocation_price?: Shared.NewAllocationPrice | null;

    /**
     * The phase to replace this price from.
     */
    plan_phase_order?: number | null;

    /**
     * The price to add to the plan
     */
    price?:
      | Shared.NewPlanUnitPrice
      | Shared.NewPlanPackagePrice
      | Shared.NewPlanMatrixPrice
      | Shared.NewPlanTieredPrice
      | Shared.NewPlanBulkPrice
      | Shared.NewPlanThresholdTotalAmountPrice
      | Shared.NewPlanTieredPackagePrice
      | Shared.NewPlanTieredWithMinimumPrice
      | Shared.NewPlanUnitWithPercentPrice
      | Shared.NewPlanPackageWithAllocationPrice
      | Shared.NewPlanTierWithProrationPrice
      | Shared.NewPlanUnitWithProrationPrice
      | Shared.NewPlanGroupedAllocationPrice
      | Shared.NewPlanGroupedWithProratedMinimumPrice
      | Shared.NewPlanGroupedWithMeteredMinimumPrice
      | ReplacePrice.NewPlanGroupedWithMinMaxThresholdsPrice
      | Shared.NewPlanMatrixWithDisplayNamePrice
      | Shared.NewPlanBulkWithProrationPrice
      | Shared.NewPlanGroupedTieredPackagePrice
      | Shared.NewPlanMaxGroupTieredPackagePrice
      | Shared.NewPlanScalableMatrixWithUnitPricingPrice
      | Shared.NewPlanScalableMatrixWithTieredPricingPrice
      | Shared.NewPlanCumulativeGroupedBulkPrice
      | Shared.NewPlanTieredPackageWithMinimumPrice
      | Shared.NewPlanMatrixWithAllocationPrice
      | Shared.NewPlanGroupedTieredPrice
      | ReplacePrice.NewPlanMinimumCompositePrice
      | null;
  }

  export namespace ReplacePrice {
    export interface NewPlanGroupedWithMinMaxThresholdsPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      grouped_with_min_max_thresholds_config: { [key: string]: unknown };

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      model_type: 'grouped_with_min_max_thresholds';

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
      billing_cycle_configuration?: Shared.NewBillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * The configuration for the rate of the price currency to the invoicing currency.
       */
      conversion_rate_config?: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

      /**
       * An ISO 4217 currency string, or custom pricing unit identifier, in which this
       * price is billed.
       */
      currency?: string | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: Shared.NewDimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: Shared.NewBillingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: { [key: string]: string | null } | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export interface NewPlanMinimumCompositePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      minimum_config: NewPlanMinimumCompositePrice.MinimumConfig;

      model_type: 'minimum';

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
      billing_cycle_configuration?: Shared.NewBillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * The configuration for the rate of the price currency to the invoicing currency.
       */
      conversion_rate_config?: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

      /**
       * An ISO 4217 currency string, or custom pricing unit identifier, in which this
       * price is billed.
       */
      currency?: string | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: Shared.NewDimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: Shared.NewBillingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: { [key: string]: string | null } | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewPlanMinimumCompositePrice {
      export interface MinimumConfig {
        /**
         * The minimum amount to apply
         */
        minimum_amount: string;

        /**
         * By default, subtotals from minimum composite prices are prorated based on the
         * service period. Set to false to disable proration.
         */
        prorated?: boolean | null;
      }
    }
  }
}

export interface BetaSetDefaultPlanVersionParams {
  /**
   * Plan version to set as the default.
   */
  version: number;
}

Beta.ExternalPlanID = ExternalPlanID;

export declare namespace Beta {
  export {
    type PlanVersion as PlanVersion,
    type PlanVersionPhase as PlanVersionPhase,
    type BetaCreatePlanVersionParams as BetaCreatePlanVersionParams,
    type BetaSetDefaultPlanVersionParams as BetaSetDefaultPlanVersionParams,
  };

  export {
    ExternalPlanID as ExternalPlanID,
    type ExternalPlanIDCreatePlanVersionParams as ExternalPlanIDCreatePlanVersionParams,
    type ExternalPlanIDSetDefaultPlanVersionParams as ExternalPlanIDSetDefaultPlanVersionParams,
  };
}
