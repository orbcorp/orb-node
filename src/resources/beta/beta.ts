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

/**
 * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be subscribed to by a
 * customer. Plans define the billing behavior of the subscription. You can see more about how to configure prices
 * in the [Price resource](/reference/price).
 */
export class Beta extends APIResource {
  externalPlanId: ExternalPlanIDAPI.ExternalPlanID = new ExternalPlanIDAPI.ExternalPlanID(this._client);

  /**
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
     * The license allocation price to add to the plan.
     */
    license_allocation_price?:
      | AddPrice.NewLicenseAllocationUnitPrice
      | AddPrice.NewLicenseAllocationTieredPrice
      | AddPrice.NewLicenseAllocationBulkPrice
      | AddPrice.NewLicenseAllocationBulkWithFiltersPrice
      | AddPrice.NewLicenseAllocationPackagePrice
      | AddPrice.NewLicenseAllocationMatrixPrice
      | AddPrice.NewLicenseAllocationThresholdTotalAmountPrice
      | AddPrice.NewLicenseAllocationTieredPackagePrice
      | AddPrice.NewLicenseAllocationTieredWithMinimumPrice
      | AddPrice.NewLicenseAllocationGroupedTieredPrice
      | AddPrice.NewLicenseAllocationTieredPackageWithMinimumPrice
      | AddPrice.NewLicenseAllocationPackageWithAllocationPrice
      | AddPrice.NewLicenseAllocationUnitWithPercentPrice
      | AddPrice.NewLicenseAllocationMatrixWithAllocationPrice
      | AddPrice.NewLicenseAllocationTieredWithProrationPrice
      | AddPrice.NewLicenseAllocationUnitWithProrationPrice
      | AddPrice.NewLicenseAllocationGroupedAllocationPrice
      | AddPrice.NewLicenseAllocationBulkWithProrationPrice
      | AddPrice.NewLicenseAllocationGroupedWithProratedMinimumPrice
      | AddPrice.NewLicenseAllocationGroupedWithMeteredMinimumPrice
      | AddPrice.NewLicenseAllocationGroupedWithMinMaxThresholdsPrice
      | AddPrice.NewLicenseAllocationMatrixWithDisplayNamePrice
      | AddPrice.NewLicenseAllocationGroupedTieredPackagePrice
      | AddPrice.NewLicenseAllocationMaxGroupTieredPackagePrice
      | AddPrice.NewLicenseAllocationScalableMatrixWithUnitPricingPrice
      | AddPrice.NewLicenseAllocationScalableMatrixWithTieredPricingPrice
      | AddPrice.NewLicenseAllocationCumulativeGroupedBulkPrice
      | AddPrice.NewLicenseAllocationCumulativeGroupedAllocationPrice
      | AddPrice.NewLicenseAllocationMinimumCompositePrice
      | AddPrice.NewLicenseAllocationPercentCompositePrice
      | AddPrice.NewLicenseAllocationEventOutputPrice
      | null;

    /**
     * The phase to add this price to.
     */
    plan_phase_order?: number | null;

    /**
     * New plan price request body params.
     */
    price?:
      | Shared.NewPlanUnitPrice
      | Shared.NewPlanTieredPrice
      | Shared.NewPlanBulkPrice
      | AddPrice.NewPlanBulkWithFiltersPrice
      | Shared.NewPlanPackagePrice
      | Shared.NewPlanMatrixPrice
      | Shared.NewPlanThresholdTotalAmountPrice
      | Shared.NewPlanTieredPackagePrice
      | Shared.NewPlanTieredWithMinimumPrice
      | Shared.NewPlanGroupedTieredPrice
      | Shared.NewPlanTieredPackageWithMinimumPrice
      | Shared.NewPlanPackageWithAllocationPrice
      | Shared.NewPlanUnitWithPercentPrice
      | Shared.NewPlanMatrixWithAllocationPrice
      | AddPrice.NewPlanTieredWithProrationPrice
      | Shared.NewPlanUnitWithProrationPrice
      | Shared.NewPlanGroupedAllocationPrice
      | Shared.NewPlanBulkWithProrationPrice
      | Shared.NewPlanGroupedWithProratedMinimumPrice
      | Shared.NewPlanGroupedWithMeteredMinimumPrice
      | AddPrice.NewPlanGroupedWithMinMaxThresholdsPrice
      | Shared.NewPlanMatrixWithDisplayNamePrice
      | Shared.NewPlanGroupedTieredPackagePrice
      | Shared.NewPlanMaxGroupTieredPackagePrice
      | Shared.NewPlanScalableMatrixWithUnitPricingPrice
      | Shared.NewPlanScalableMatrixWithTieredPricingPrice
      | Shared.NewPlanCumulativeGroupedBulkPrice
      | AddPrice.NewPlanCumulativeGroupedAllocationPrice
      | Shared.NewPlanMinimumCompositePrice
      | AddPrice.NewPlanPercentCompositePrice
      | AddPrice.NewPlanEventOutputPrice
      | null;
  }

  export namespace AddPrice {
    export interface NewLicenseAllocationUnitPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationUnitPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'unit';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for unit pricing
       */
      unit_config: Shared.UnitConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationUnitPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationTieredPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationTieredPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'tiered';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for tiered pricing
       */
      tiered_config: Shared.TieredConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationTieredPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationBulkPrice {
      /**
       * Configuration for bulk pricing
       */
      bulk_config: Shared.BulkConfig;

      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationBulkPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationBulkPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationBulkWithFiltersPrice {
      /**
       * Configuration for bulk_with_filters pricing
       */
      bulk_with_filters_config: NewLicenseAllocationBulkWithFiltersPrice.BulkWithFiltersConfig;

      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationBulkWithFiltersPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'bulk_with_filters';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationBulkWithFiltersPrice {
      /**
       * Configuration for bulk_with_filters pricing
       */
      export interface BulkWithFiltersConfig {
        /**
         * Property filters to apply (all must match)
         */
        filters: Array<BulkWithFiltersConfig.Filter>;

        /**
         * Bulk tiers for rating based on total usage volume
         */
        tiers: Array<BulkWithFiltersConfig.Tier>;
      }

      export namespace BulkWithFiltersConfig {
        /**
         * Configuration for a single property filter
         */
        export interface Filter {
          /**
           * Event property key to filter on
           */
          property_key: string;

          /**
           * Event property value to match
           */
          property_value: string;
        }

        /**
         * Configuration for a single bulk pricing tier
         */
        export interface Tier {
          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * The lower bound for this tier
           */
          tier_lower_bound?: string | null;
        }
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationPackagePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationPackagePrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'package';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for package pricing
       */
      package_config: Shared.PackageConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationPackagePrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationMatrixPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationMatrixPrice.LicenseAllocation>;

      /**
       * Configuration for matrix pricing
       */
      matrix_config: Shared.MatrixConfig;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationMatrixPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationThresholdTotalAmountPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationThresholdTotalAmountPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'threshold_total_amount';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for threshold_total_amount pricing
       */
      threshold_total_amount_config: NewLicenseAllocationThresholdTotalAmountPrice.ThresholdTotalAmountConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationThresholdTotalAmountPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for threshold_total_amount pricing
       */
      export interface ThresholdTotalAmountConfig {
        /**
         * When the quantity consumed passes a provided threshold, the configured total
         * will be charged
         */
        consumption_table: Array<ThresholdTotalAmountConfig.ConsumptionTable>;

        /**
         * If true, the unit price will be prorated to the billing period
         */
        prorate?: boolean | null;
      }

      export namespace ThresholdTotalAmountConfig {
        /**
         * Configuration for a single threshold
         */
        export interface ConsumptionTable {
          threshold: string;

          /**
           * Total amount for this threshold
           */
          total_amount: string;
        }
      }
    }

    export interface NewLicenseAllocationTieredPackagePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationTieredPackagePrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'tiered_package';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for tiered_package pricing
       */
      tiered_package_config: NewLicenseAllocationTieredPackagePrice.TieredPackageConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationTieredPackagePrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for tiered_package pricing
       */
      export interface TieredPackageConfig {
        package_size: string;

        /**
         * Apply tiered pricing after rounding up the quantity to the package size. Tiers
         * are defined using exclusive lower bounds. The tier bounds are defined based on
         * the total quantity rather than the number of packages, so they must be multiples
         * of the package size.
         */
        tiers: Array<TieredPackageConfig.Tier>;
      }

      export namespace TieredPackageConfig {
        /**
         * Configuration for a single tier with business logic
         */
        export interface Tier {
          /**
           * Price per package
           */
          per_unit: string;

          tier_lower_bound: string;
        }
      }
    }

    export interface NewLicenseAllocationTieredWithMinimumPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationTieredWithMinimumPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'tiered_with_minimum';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for tiered_with_minimum pricing
       */
      tiered_with_minimum_config: NewLicenseAllocationTieredWithMinimumPrice.TieredWithMinimumConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationTieredWithMinimumPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for tiered_with_minimum pricing
       */
      export interface TieredWithMinimumConfig {
        /**
         * Tiered pricing with a minimum amount dependent on the volume tier. Tiers are
         * defined using exclusive lower bounds.
         */
        tiers: Array<TieredWithMinimumConfig.Tier>;

        /**
         * If true, tiers with an accrued amount of 0 will not be included in the rating.
         */
        hide_zero_amount_tiers?: boolean;

        /**
         * If true, the unit price will be prorated to the billing period
         */
        prorate?: boolean;
      }

      export namespace TieredWithMinimumConfig {
        /**
         * Configuration for a single tier
         */
        export interface Tier {
          minimum_amount: string;

          tier_lower_bound: string;

          /**
           * Per unit amount
           */
          unit_amount: string;
        }
      }
    }

    export interface NewLicenseAllocationGroupedTieredPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_tiered pricing
       */
      grouped_tiered_config: NewLicenseAllocationGroupedTieredPrice.GroupedTieredConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationGroupedTieredPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationGroupedTieredPrice {
      /**
       * Configuration for grouped_tiered pricing
       */
      export interface GroupedTieredConfig {
        /**
         * The billable metric property used to group before tiering
         */
        grouping_key: string;

        /**
         * Apply tiered pricing to each segment generated after grouping with the provided
         * key
         */
        tiers: Array<GroupedTieredConfig.Tier>;
      }

      export namespace GroupedTieredConfig {
        /**
         * Configuration for a single tier
         */
        export interface Tier {
          tier_lower_bound: string;

          /**
           * Per unit amount
           */
          unit_amount: string;
        }
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationTieredPackageWithMinimumPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationTieredPackageWithMinimumPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'tiered_package_with_minimum';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for tiered_package_with_minimum pricing
       */
      tiered_package_with_minimum_config: NewLicenseAllocationTieredPackageWithMinimumPrice.TieredPackageWithMinimumConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationTieredPackageWithMinimumPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for tiered_package_with_minimum pricing
       */
      export interface TieredPackageWithMinimumConfig {
        package_size: number;

        /**
         * Apply tiered pricing after rounding up the quantity to the package size. Tiers
         * are defined using exclusive lower bounds.
         */
        tiers: Array<TieredPackageWithMinimumConfig.Tier>;
      }

      export namespace TieredPackageWithMinimumConfig {
        /**
         * Configuration for a single tier
         */
        export interface Tier {
          minimum_amount: string;

          per_unit: string;

          tier_lower_bound: string;
        }
      }
    }

    export interface NewLicenseAllocationPackageWithAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationPackageWithAllocationPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'package_with_allocation';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for package_with_allocation pricing
       */
      package_with_allocation_config: NewLicenseAllocationPackageWithAllocationPrice.PackageWithAllocationConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationPackageWithAllocationPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for package_with_allocation pricing
       */
      export interface PackageWithAllocationConfig {
        allocation: string;

        package_amount: string;

        package_size: string;
      }
    }

    export interface NewLicenseAllocationUnitWithPercentPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationUnitWithPercentPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'unit_with_percent';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for unit_with_percent pricing
       */
      unit_with_percent_config: NewLicenseAllocationUnitWithPercentPrice.UnitWithPercentConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationUnitWithPercentPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for unit_with_percent pricing
       */
      export interface UnitWithPercentConfig {
        /**
         * What percent, out of 100, of the calculated total to charge
         */
        percent: string;

        /**
         * Rate per unit of usage
         */
        unit_amount: string;
      }
    }

    export interface NewLicenseAllocationMatrixWithAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationMatrixWithAllocationPrice.LicenseAllocation>;

      /**
       * Configuration for matrix_with_allocation pricing
       */
      matrix_with_allocation_config: Shared.MatrixWithAllocationConfig;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationMatrixWithAllocationPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationTieredWithProrationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationTieredWithProrationPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'tiered_with_proration';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for tiered_with_proration pricing
       */
      tiered_with_proration_config: NewLicenseAllocationTieredWithProrationPrice.TieredWithProrationConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationTieredWithProrationPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for tiered_with_proration pricing
       */
      export interface TieredWithProrationConfig {
        /**
         * Tiers for rating based on total usage quantities into the specified tier with
         * proration
         */
        tiers: Array<TieredWithProrationConfig.Tier>;
      }

      export namespace TieredWithProrationConfig {
        /**
         * Configuration for a single tiered with proration tier
         */
        export interface Tier {
          /**
           * Inclusive tier starting value
           */
          tier_lower_bound: string;

          /**
           * Amount per unit
           */
          unit_amount: string;
        }
      }
    }

    export interface NewLicenseAllocationUnitWithProrationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationUnitWithProrationPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'unit_with_proration';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for unit_with_proration pricing
       */
      unit_with_proration_config: NewLicenseAllocationUnitWithProrationPrice.UnitWithProrationConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationUnitWithProrationPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for unit_with_proration pricing
       */
      export interface UnitWithProrationConfig {
        /**
         * Rate per unit of usage
         */
        unit_amount: string;
      }
    }

    export interface NewLicenseAllocationGroupedAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_allocation pricing
       */
      grouped_allocation_config: NewLicenseAllocationGroupedAllocationPrice.GroupedAllocationConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationGroupedAllocationPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationGroupedAllocationPrice {
      /**
       * Configuration for grouped_allocation pricing
       */
      export interface GroupedAllocationConfig {
        /**
         * Usage allocation per group
         */
        allocation: string;

        /**
         * How to determine the groups that should each be allocated some quantity
         */
        grouping_key: string;

        /**
         * Unit rate for post-allocation
         */
        overage_unit_rate: string;
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationBulkWithProrationPrice {
      /**
       * Configuration for bulk_with_proration pricing
       */
      bulk_with_proration_config: NewLicenseAllocationBulkWithProrationPrice.BulkWithProrationConfig;

      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationBulkWithProrationPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationBulkWithProrationPrice {
      /**
       * Configuration for bulk_with_proration pricing
       */
      export interface BulkWithProrationConfig {
        /**
         * Bulk tiers for rating based on total usage volume
         */
        tiers: Array<BulkWithProrationConfig.Tier>;
      }

      export namespace BulkWithProrationConfig {
        /**
         * Configuration for a single bulk pricing tier with proration
         */
        export interface Tier {
          /**
           * Cost per unit
           */
          unit_amount: string;

          /**
           * The lower bound for this tier
           */
          tier_lower_bound?: string | null;
        }
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationGroupedWithProratedMinimumPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_with_prorated_minimum pricing
       */
      grouped_with_prorated_minimum_config: NewLicenseAllocationGroupedWithProratedMinimumPrice.GroupedWithProratedMinimumConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationGroupedWithProratedMinimumPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationGroupedWithProratedMinimumPrice {
      /**
       * Configuration for grouped_with_prorated_minimum pricing
       */
      export interface GroupedWithProratedMinimumConfig {
        /**
         * How to determine the groups that should each have a minimum
         */
        grouping_key: string;

        /**
         * The minimum amount to charge per group
         */
        minimum: string;

        /**
         * The amount to charge per unit
         */
        unit_rate: string;
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationGroupedWithMeteredMinimumPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_with_metered_minimum pricing
       */
      grouped_with_metered_minimum_config: NewLicenseAllocationGroupedWithMeteredMinimumPrice.GroupedWithMeteredMinimumConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationGroupedWithMeteredMinimumPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationGroupedWithMeteredMinimumPrice {
      /**
       * Configuration for grouped_with_metered_minimum pricing
       */
      export interface GroupedWithMeteredMinimumConfig {
        /**
         * Used to partition the usage into groups. The minimum amount is applied to each
         * group.
         */
        grouping_key: string;

        /**
         * The minimum amount to charge per group per unit
         */
        minimum_unit_amount: string;

        /**
         * Used to determine the unit rate
         */
        pricing_key: string;

        /**
         * Scale the unit rates by the scaling factor.
         */
        scaling_factors: Array<GroupedWithMeteredMinimumConfig.ScalingFactor>;

        /**
         * Used to determine the unit rate scaling factor
         */
        scaling_key: string;

        /**
         * Apply per unit pricing to each pricing value. The minimum amount is applied any
         * unmatched usage.
         */
        unit_amounts: Array<GroupedWithMeteredMinimumConfig.UnitAmount>;
      }

      export namespace GroupedWithMeteredMinimumConfig {
        /**
         * Configuration for a scaling factor
         */
        export interface ScalingFactor {
          scaling_factor: string;

          scaling_value: string;
        }

        /**
         * Configuration for a unit amount
         */
        export interface UnitAmount {
          pricing_value: string;

          /**
           * Per unit amount
           */
          unit_amount: string;
        }
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationGroupedWithMinMaxThresholdsPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_with_min_max_thresholds pricing
       */
      grouped_with_min_max_thresholds_config: NewLicenseAllocationGroupedWithMinMaxThresholdsPrice.GroupedWithMinMaxThresholdsConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationGroupedWithMinMaxThresholdsPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationGroupedWithMinMaxThresholdsPrice {
      /**
       * Configuration for grouped_with_min_max_thresholds pricing
       */
      export interface GroupedWithMinMaxThresholdsConfig {
        /**
         * The event property used to group before applying thresholds
         */
        grouping_key: string;

        /**
         * The maximum amount to charge each group
         */
        maximum_charge: string;

        /**
         * The minimum amount to charge each group, regardless of usage
         */
        minimum_charge: string;

        /**
         * The base price charged per group
         */
        per_unit_rate: string;
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationMatrixWithDisplayNamePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationMatrixWithDisplayNamePrice.LicenseAllocation>;

      /**
       * Configuration for matrix_with_display_name pricing
       */
      matrix_with_display_name_config: NewLicenseAllocationMatrixWithDisplayNamePrice.MatrixWithDisplayNameConfig;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationMatrixWithDisplayNamePrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for matrix_with_display_name pricing
       */
      export interface MatrixWithDisplayNameConfig {
        /**
         * Used to determine the unit rate
         */
        dimension: string;

        /**
         * Apply per unit pricing to each dimension value
         */
        unit_amounts: Array<MatrixWithDisplayNameConfig.UnitAmount>;
      }

      export namespace MatrixWithDisplayNameConfig {
        /**
         * Configuration for a unit amount item
         */
        export interface UnitAmount {
          /**
           * The dimension value
           */
          dimension_value: string;

          /**
           * Display name for this dimension value
           */
          display_name: string;

          /**
           * Per unit amount
           */
          unit_amount: string;
        }
      }
    }

    export interface NewLicenseAllocationGroupedTieredPackagePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_tiered_package pricing
       */
      grouped_tiered_package_config: NewLicenseAllocationGroupedTieredPackagePrice.GroupedTieredPackageConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationGroupedTieredPackagePrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationGroupedTieredPackagePrice {
      /**
       * Configuration for grouped_tiered_package pricing
       */
      export interface GroupedTieredPackageConfig {
        /**
         * The event property used to group before tiering
         */
        grouping_key: string;

        package_size: string;

        /**
         * Apply tiered pricing after rounding up the quantity to the package size. Tiers
         * are defined using exclusive lower bounds.
         */
        tiers: Array<GroupedTieredPackageConfig.Tier>;
      }

      export namespace GroupedTieredPackageConfig {
        /**
         * Configuration for a single tier
         */
        export interface Tier {
          /**
           * Per package
           */
          per_unit: string;

          tier_lower_bound: string;
        }
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationMaxGroupTieredPackagePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationMaxGroupTieredPackagePrice.LicenseAllocation>;

      /**
       * Configuration for max_group_tiered_package pricing
       */
      max_group_tiered_package_config: NewLicenseAllocationMaxGroupTieredPackagePrice.MaxGroupTieredPackageConfig;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationMaxGroupTieredPackagePrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for max_group_tiered_package pricing
       */
      export interface MaxGroupTieredPackageConfig {
        /**
         * The event property used to group before tiering the group with the highest value
         */
        grouping_key: string;

        package_size: string;

        /**
         * Apply tiered pricing to the largest group after grouping with the provided key.
         */
        tiers: Array<MaxGroupTieredPackageConfig.Tier>;
      }

      export namespace MaxGroupTieredPackageConfig {
        /**
         * Configuration for a single tier
         */
        export interface Tier {
          tier_lower_bound: string;

          /**
           * Per unit amount
           */
          unit_amount: string;
        }
      }
    }

    export interface NewLicenseAllocationScalableMatrixWithUnitPricingPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationScalableMatrixWithUnitPricingPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'scalable_matrix_with_unit_pricing';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for scalable_matrix_with_unit_pricing pricing
       */
      scalable_matrix_with_unit_pricing_config: NewLicenseAllocationScalableMatrixWithUnitPricingPrice.ScalableMatrixWithUnitPricingConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationScalableMatrixWithUnitPricingPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for scalable_matrix_with_unit_pricing pricing
       */
      export interface ScalableMatrixWithUnitPricingConfig {
        /**
         * Used to determine the unit rate
         */
        first_dimension: string;

        /**
         * Apply a scaling factor to each dimension
         */
        matrix_scaling_factors: Array<ScalableMatrixWithUnitPricingConfig.MatrixScalingFactor>;

        /**
         * The final unit price to rate against the output of the matrix
         */
        unit_price: string;

        /**
         * The property used to group this price
         */
        grouping_key?: string | null;

        /**
         * If true, the unit price will be prorated to the billing period
         */
        prorate?: boolean | null;

        /**
         * Used to determine the unit rate (optional)
         */
        second_dimension?: string | null;
      }

      export namespace ScalableMatrixWithUnitPricingConfig {
        /**
         * Configuration for a single matrix scaling factor
         */
        export interface MatrixScalingFactor {
          first_dimension_value: string;

          scaling_factor: string;

          second_dimension_value?: string | null;
        }
      }
    }

    export interface NewLicenseAllocationScalableMatrixWithTieredPricingPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationScalableMatrixWithTieredPricingPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'scalable_matrix_with_tiered_pricing';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for scalable_matrix_with_tiered_pricing pricing
       */
      scalable_matrix_with_tiered_pricing_config: NewLicenseAllocationScalableMatrixWithTieredPricingPrice.ScalableMatrixWithTieredPricingConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationScalableMatrixWithTieredPricingPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for scalable_matrix_with_tiered_pricing pricing
       */
      export interface ScalableMatrixWithTieredPricingConfig {
        /**
         * Used for the scalable matrix first dimension
         */
        first_dimension: string;

        /**
         * Apply a scaling factor to each dimension
         */
        matrix_scaling_factors: Array<ScalableMatrixWithTieredPricingConfig.MatrixScalingFactor>;

        tiers: Array<ScalableMatrixWithTieredPricingConfig.Tier>;

        /**
         * Used for the scalable matrix second dimension (optional)
         */
        second_dimension?: string | null;
      }

      export namespace ScalableMatrixWithTieredPricingConfig {
        /**
         * Configuration for a single matrix scaling factor
         */
        export interface MatrixScalingFactor {
          first_dimension_value: string;

          scaling_factor: string;

          second_dimension_value?: string | null;
        }

        /**
         * Configuration for a single tier entry with business logic
         */
        export interface Tier {
          tier_lower_bound: string;

          unit_amount: string;
        }
      }
    }

    export interface NewLicenseAllocationCumulativeGroupedBulkPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for cumulative_grouped_bulk pricing
       */
      cumulative_grouped_bulk_config: NewLicenseAllocationCumulativeGroupedBulkPrice.CumulativeGroupedBulkConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationCumulativeGroupedBulkPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationCumulativeGroupedBulkPrice {
      /**
       * Configuration for cumulative_grouped_bulk pricing
       */
      export interface CumulativeGroupedBulkConfig {
        /**
         * Each tier lower bound must have the same group of values.
         */
        dimension_values: Array<CumulativeGroupedBulkConfig.DimensionValue>;

        group: string;
      }

      export namespace CumulativeGroupedBulkConfig {
        /**
         * Configuration for a dimension value entry
         */
        export interface DimensionValue {
          /**
           * Grouping key value
           */
          grouping_key: string;

          /**
           * Tier lower bound
           */
          tier_lower_bound: string;

          /**
           * Unit amount for this combination
           */
          unit_amount: string;
        }
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationCumulativeGroupedAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for cumulative_grouped_allocation pricing
       */
      cumulative_grouped_allocation_config: NewLicenseAllocationCumulativeGroupedAllocationPrice.CumulativeGroupedAllocationConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationCumulativeGroupedAllocationPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'cumulative_grouped_allocation';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationCumulativeGroupedAllocationPrice {
      /**
       * Configuration for cumulative_grouped_allocation pricing
       */
      export interface CumulativeGroupedAllocationConfig {
        /**
         * The overall allocation across all groups
         */
        cumulative_allocation: string;

        /**
         * The allocation per individual group
         */
        group_allocation: string;

        /**
         * The event property used to group usage before applying allocations
         */
        grouping_key: string;

        /**
         * The amount to charge for each unit outside of the allocation
         */
        unit_amount: string;
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationMinimumCompositePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationMinimumCompositePrice.LicenseAllocation>;

      /**
       * Configuration for minimum_composite pricing
       */
      minimum_composite_config: NewLicenseAllocationMinimumCompositePrice.MinimumCompositeConfig;

      /**
       * The pricing model type
       */
      model_type: 'minimum_composite';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationMinimumCompositePrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for minimum_composite pricing
       */
      export interface MinimumCompositeConfig {
        /**
         * The minimum amount to apply
         */
        minimum_amount: string;

        /**
         * If true, subtotals from this price are prorated based on the service period
         */
        prorated?: boolean;
      }
    }

    export interface NewLicenseAllocationPercentCompositePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationPercentCompositePrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'percent';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for percent pricing
       */
      percent_config: NewLicenseAllocationPercentCompositePrice.PercentConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationPercentCompositePrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for percent pricing
       */
      export interface PercentConfig {
        /**
         * What percent of the component subtotals to charge
         */
        percent: number;
      }
    }

    export interface NewLicenseAllocationEventOutputPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for event_output pricing
       */
      event_output_config: NewLicenseAllocationEventOutputPrice.EventOutputConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationEventOutputPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'event_output';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationEventOutputPrice {
      /**
       * Configuration for event_output pricing
       */
      export interface EventOutputConfig {
        /**
         * The key in the event data to extract the unit rate from.
         */
        unit_rating_key: string;

        /**
         * If provided, this amount will be used as the unit rate when an event does not
         * have a value for the `unit_rating_key`. If not provided, events missing a unit
         * rate will be ignored.
         */
        default_unit_rate?: string | null;

        /**
         * An optional key in the event data to group by (e.g., event ID). All events will
         * also be grouped by their unit rate.
         */
        grouping_key?: string | null;
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewPlanBulkWithFiltersPrice {
      /**
       * Configuration for bulk_with_filters pricing
       */
      bulk_with_filters_config: NewPlanBulkWithFiltersPrice.BulkWithFiltersConfig;

      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * The pricing model type
       */
      model_type: 'bulk_with_filters';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewPlanBulkWithFiltersPrice {
      /**
       * Configuration for bulk_with_filters pricing
       */
      export interface BulkWithFiltersConfig {
        /**
         * Property filters to apply (all must match)
         */
        filters: Array<BulkWithFiltersConfig.Filter>;

        /**
         * Bulk tiers for rating based on total usage volume
         */
        tiers: Array<BulkWithFiltersConfig.Tier>;
      }

      export namespace BulkWithFiltersConfig {
        /**
         * Configuration for a single property filter
         */
        export interface Filter {
          /**
           * Event property key to filter on
           */
          property_key: string;

          /**
           * Event property value to match
           */
          property_value: string;
        }

        /**
         * Configuration for a single bulk pricing tier
         */
        export interface Tier {
          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * The lower bound for this tier
           */
          tier_lower_bound?: string | null;
        }
      }
    }

    export interface NewPlanTieredWithProrationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * The pricing model type
       */
      model_type: 'tiered_with_proration';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for tiered_with_proration pricing
       */
      tiered_with_proration_config: NewPlanTieredWithProrationPrice.TieredWithProrationConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewPlanTieredWithProrationPrice {
      /**
       * Configuration for tiered_with_proration pricing
       */
      export interface TieredWithProrationConfig {
        /**
         * Tiers for rating based on total usage quantities into the specified tier with
         * proration
         */
        tiers: Array<TieredWithProrationConfig.Tier>;
      }

      export namespace TieredWithProrationConfig {
        /**
         * Configuration for a single tiered with proration tier
         */
        export interface Tier {
          /**
           * Inclusive tier starting value
           */
          tier_lower_bound: string;

          /**
           * Amount per unit
           */
          unit_amount: string;
        }
      }
    }

    export interface NewPlanGroupedWithMinMaxThresholdsPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_with_min_max_thresholds pricing
       */
      grouped_with_min_max_thresholds_config: NewPlanGroupedWithMinMaxThresholdsPrice.GroupedWithMinMaxThresholdsConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewPlanGroupedWithMinMaxThresholdsPrice {
      /**
       * Configuration for grouped_with_min_max_thresholds pricing
       */
      export interface GroupedWithMinMaxThresholdsConfig {
        /**
         * The event property used to group before applying thresholds
         */
        grouping_key: string;

        /**
         * The maximum amount to charge each group
         */
        maximum_charge: string;

        /**
         * The minimum amount to charge each group, regardless of usage
         */
        minimum_charge: string;

        /**
         * The base price charged per group
         */
        per_unit_rate: string;
      }
    }

    export interface NewPlanCumulativeGroupedAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for cumulative_grouped_allocation pricing
       */
      cumulative_grouped_allocation_config: NewPlanCumulativeGroupedAllocationPrice.CumulativeGroupedAllocationConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * The pricing model type
       */
      model_type: 'cumulative_grouped_allocation';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewPlanCumulativeGroupedAllocationPrice {
      /**
       * Configuration for cumulative_grouped_allocation pricing
       */
      export interface CumulativeGroupedAllocationConfig {
        /**
         * The overall allocation across all groups
         */
        cumulative_allocation: string;

        /**
         * The allocation per individual group
         */
        group_allocation: string;

        /**
         * The event property used to group usage before applying allocations
         */
        grouping_key: string;

        /**
         * The amount to charge for each unit outside of the allocation
         */
        unit_amount: string;
      }
    }

    export interface NewPlanPercentCompositePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * The pricing model type
       */
      model_type: 'percent';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for percent pricing
       */
      percent_config: NewPlanPercentCompositePrice.PercentConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewPlanPercentCompositePrice {
      /**
       * Configuration for percent pricing
       */
      export interface PercentConfig {
        /**
         * What percent of the component subtotals to charge
         */
        percent: number;
      }
    }

    export interface NewPlanEventOutputPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for event_output pricing
       */
      event_output_config: NewPlanEventOutputPrice.EventOutputConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * The pricing model type
       */
      model_type: 'event_output';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewPlanEventOutputPrice {
      /**
       * Configuration for event_output pricing
       */
      export interface EventOutputConfig {
        /**
         * The key in the event data to extract the unit rate from.
         */
        unit_rating_key: string;

        /**
         * If provided, this amount will be used as the unit rate when an event does not
         * have a value for the `unit_rating_key`. If not provided, events missing a unit
         * rate will be ignored.
         */
        default_unit_rate?: string | null;

        /**
         * An optional key in the event data to group by (e.g., event ID). All events will
         * also be grouped by their unit rate.
         */
        grouping_key?: string | null;
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
     * The license allocation price to add to the plan.
     */
    license_allocation_price?:
      | ReplacePrice.NewLicenseAllocationUnitPrice
      | ReplacePrice.NewLicenseAllocationTieredPrice
      | ReplacePrice.NewLicenseAllocationBulkPrice
      | ReplacePrice.NewLicenseAllocationBulkWithFiltersPrice
      | ReplacePrice.NewLicenseAllocationPackagePrice
      | ReplacePrice.NewLicenseAllocationMatrixPrice
      | ReplacePrice.NewLicenseAllocationThresholdTotalAmountPrice
      | ReplacePrice.NewLicenseAllocationTieredPackagePrice
      | ReplacePrice.NewLicenseAllocationTieredWithMinimumPrice
      | ReplacePrice.NewLicenseAllocationGroupedTieredPrice
      | ReplacePrice.NewLicenseAllocationTieredPackageWithMinimumPrice
      | ReplacePrice.NewLicenseAllocationPackageWithAllocationPrice
      | ReplacePrice.NewLicenseAllocationUnitWithPercentPrice
      | ReplacePrice.NewLicenseAllocationMatrixWithAllocationPrice
      | ReplacePrice.NewLicenseAllocationTieredWithProrationPrice
      | ReplacePrice.NewLicenseAllocationUnitWithProrationPrice
      | ReplacePrice.NewLicenseAllocationGroupedAllocationPrice
      | ReplacePrice.NewLicenseAllocationBulkWithProrationPrice
      | ReplacePrice.NewLicenseAllocationGroupedWithProratedMinimumPrice
      | ReplacePrice.NewLicenseAllocationGroupedWithMeteredMinimumPrice
      | ReplacePrice.NewLicenseAllocationGroupedWithMinMaxThresholdsPrice
      | ReplacePrice.NewLicenseAllocationMatrixWithDisplayNamePrice
      | ReplacePrice.NewLicenseAllocationGroupedTieredPackagePrice
      | ReplacePrice.NewLicenseAllocationMaxGroupTieredPackagePrice
      | ReplacePrice.NewLicenseAllocationScalableMatrixWithUnitPricingPrice
      | ReplacePrice.NewLicenseAllocationScalableMatrixWithTieredPricingPrice
      | ReplacePrice.NewLicenseAllocationCumulativeGroupedBulkPrice
      | ReplacePrice.NewLicenseAllocationCumulativeGroupedAllocationPrice
      | ReplacePrice.NewLicenseAllocationMinimumCompositePrice
      | ReplacePrice.NewLicenseAllocationPercentCompositePrice
      | ReplacePrice.NewLicenseAllocationEventOutputPrice
      | null;

    /**
     * The phase to replace this price from.
     */
    plan_phase_order?: number | null;

    /**
     * New plan price request body params.
     */
    price?:
      | Shared.NewPlanUnitPrice
      | Shared.NewPlanTieredPrice
      | Shared.NewPlanBulkPrice
      | ReplacePrice.NewPlanBulkWithFiltersPrice
      | Shared.NewPlanPackagePrice
      | Shared.NewPlanMatrixPrice
      | Shared.NewPlanThresholdTotalAmountPrice
      | Shared.NewPlanTieredPackagePrice
      | Shared.NewPlanTieredWithMinimumPrice
      | Shared.NewPlanGroupedTieredPrice
      | Shared.NewPlanTieredPackageWithMinimumPrice
      | Shared.NewPlanPackageWithAllocationPrice
      | Shared.NewPlanUnitWithPercentPrice
      | Shared.NewPlanMatrixWithAllocationPrice
      | ReplacePrice.NewPlanTieredWithProrationPrice
      | Shared.NewPlanUnitWithProrationPrice
      | Shared.NewPlanGroupedAllocationPrice
      | Shared.NewPlanBulkWithProrationPrice
      | Shared.NewPlanGroupedWithProratedMinimumPrice
      | Shared.NewPlanGroupedWithMeteredMinimumPrice
      | ReplacePrice.NewPlanGroupedWithMinMaxThresholdsPrice
      | Shared.NewPlanMatrixWithDisplayNamePrice
      | Shared.NewPlanGroupedTieredPackagePrice
      | Shared.NewPlanMaxGroupTieredPackagePrice
      | Shared.NewPlanScalableMatrixWithUnitPricingPrice
      | Shared.NewPlanScalableMatrixWithTieredPricingPrice
      | Shared.NewPlanCumulativeGroupedBulkPrice
      | ReplacePrice.NewPlanCumulativeGroupedAllocationPrice
      | Shared.NewPlanMinimumCompositePrice
      | ReplacePrice.NewPlanPercentCompositePrice
      | ReplacePrice.NewPlanEventOutputPrice
      | null;
  }

  export namespace ReplacePrice {
    export interface NewLicenseAllocationUnitPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationUnitPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'unit';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for unit pricing
       */
      unit_config: Shared.UnitConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationUnitPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationTieredPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationTieredPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'tiered';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for tiered pricing
       */
      tiered_config: Shared.TieredConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationTieredPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationBulkPrice {
      /**
       * Configuration for bulk pricing
       */
      bulk_config: Shared.BulkConfig;

      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationBulkPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationBulkPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationBulkWithFiltersPrice {
      /**
       * Configuration for bulk_with_filters pricing
       */
      bulk_with_filters_config: NewLicenseAllocationBulkWithFiltersPrice.BulkWithFiltersConfig;

      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationBulkWithFiltersPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'bulk_with_filters';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationBulkWithFiltersPrice {
      /**
       * Configuration for bulk_with_filters pricing
       */
      export interface BulkWithFiltersConfig {
        /**
         * Property filters to apply (all must match)
         */
        filters: Array<BulkWithFiltersConfig.Filter>;

        /**
         * Bulk tiers for rating based on total usage volume
         */
        tiers: Array<BulkWithFiltersConfig.Tier>;
      }

      export namespace BulkWithFiltersConfig {
        /**
         * Configuration for a single property filter
         */
        export interface Filter {
          /**
           * Event property key to filter on
           */
          property_key: string;

          /**
           * Event property value to match
           */
          property_value: string;
        }

        /**
         * Configuration for a single bulk pricing tier
         */
        export interface Tier {
          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * The lower bound for this tier
           */
          tier_lower_bound?: string | null;
        }
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationPackagePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationPackagePrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'package';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for package pricing
       */
      package_config: Shared.PackageConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationPackagePrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationMatrixPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationMatrixPrice.LicenseAllocation>;

      /**
       * Configuration for matrix pricing
       */
      matrix_config: Shared.MatrixConfig;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationMatrixPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationThresholdTotalAmountPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationThresholdTotalAmountPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'threshold_total_amount';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for threshold_total_amount pricing
       */
      threshold_total_amount_config: NewLicenseAllocationThresholdTotalAmountPrice.ThresholdTotalAmountConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationThresholdTotalAmountPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for threshold_total_amount pricing
       */
      export interface ThresholdTotalAmountConfig {
        /**
         * When the quantity consumed passes a provided threshold, the configured total
         * will be charged
         */
        consumption_table: Array<ThresholdTotalAmountConfig.ConsumptionTable>;

        /**
         * If true, the unit price will be prorated to the billing period
         */
        prorate?: boolean | null;
      }

      export namespace ThresholdTotalAmountConfig {
        /**
         * Configuration for a single threshold
         */
        export interface ConsumptionTable {
          threshold: string;

          /**
           * Total amount for this threshold
           */
          total_amount: string;
        }
      }
    }

    export interface NewLicenseAllocationTieredPackagePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationTieredPackagePrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'tiered_package';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for tiered_package pricing
       */
      tiered_package_config: NewLicenseAllocationTieredPackagePrice.TieredPackageConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationTieredPackagePrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for tiered_package pricing
       */
      export interface TieredPackageConfig {
        package_size: string;

        /**
         * Apply tiered pricing after rounding up the quantity to the package size. Tiers
         * are defined using exclusive lower bounds. The tier bounds are defined based on
         * the total quantity rather than the number of packages, so they must be multiples
         * of the package size.
         */
        tiers: Array<TieredPackageConfig.Tier>;
      }

      export namespace TieredPackageConfig {
        /**
         * Configuration for a single tier with business logic
         */
        export interface Tier {
          /**
           * Price per package
           */
          per_unit: string;

          tier_lower_bound: string;
        }
      }
    }

    export interface NewLicenseAllocationTieredWithMinimumPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationTieredWithMinimumPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'tiered_with_minimum';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for tiered_with_minimum pricing
       */
      tiered_with_minimum_config: NewLicenseAllocationTieredWithMinimumPrice.TieredWithMinimumConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationTieredWithMinimumPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for tiered_with_minimum pricing
       */
      export interface TieredWithMinimumConfig {
        /**
         * Tiered pricing with a minimum amount dependent on the volume tier. Tiers are
         * defined using exclusive lower bounds.
         */
        tiers: Array<TieredWithMinimumConfig.Tier>;

        /**
         * If true, tiers with an accrued amount of 0 will not be included in the rating.
         */
        hide_zero_amount_tiers?: boolean;

        /**
         * If true, the unit price will be prorated to the billing period
         */
        prorate?: boolean;
      }

      export namespace TieredWithMinimumConfig {
        /**
         * Configuration for a single tier
         */
        export interface Tier {
          minimum_amount: string;

          tier_lower_bound: string;

          /**
           * Per unit amount
           */
          unit_amount: string;
        }
      }
    }

    export interface NewLicenseAllocationGroupedTieredPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_tiered pricing
       */
      grouped_tiered_config: NewLicenseAllocationGroupedTieredPrice.GroupedTieredConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationGroupedTieredPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationGroupedTieredPrice {
      /**
       * Configuration for grouped_tiered pricing
       */
      export interface GroupedTieredConfig {
        /**
         * The billable metric property used to group before tiering
         */
        grouping_key: string;

        /**
         * Apply tiered pricing to each segment generated after grouping with the provided
         * key
         */
        tiers: Array<GroupedTieredConfig.Tier>;
      }

      export namespace GroupedTieredConfig {
        /**
         * Configuration for a single tier
         */
        export interface Tier {
          tier_lower_bound: string;

          /**
           * Per unit amount
           */
          unit_amount: string;
        }
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationTieredPackageWithMinimumPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationTieredPackageWithMinimumPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'tiered_package_with_minimum';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for tiered_package_with_minimum pricing
       */
      tiered_package_with_minimum_config: NewLicenseAllocationTieredPackageWithMinimumPrice.TieredPackageWithMinimumConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationTieredPackageWithMinimumPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for tiered_package_with_minimum pricing
       */
      export interface TieredPackageWithMinimumConfig {
        package_size: number;

        /**
         * Apply tiered pricing after rounding up the quantity to the package size. Tiers
         * are defined using exclusive lower bounds.
         */
        tiers: Array<TieredPackageWithMinimumConfig.Tier>;
      }

      export namespace TieredPackageWithMinimumConfig {
        /**
         * Configuration for a single tier
         */
        export interface Tier {
          minimum_amount: string;

          per_unit: string;

          tier_lower_bound: string;
        }
      }
    }

    export interface NewLicenseAllocationPackageWithAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationPackageWithAllocationPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'package_with_allocation';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for package_with_allocation pricing
       */
      package_with_allocation_config: NewLicenseAllocationPackageWithAllocationPrice.PackageWithAllocationConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationPackageWithAllocationPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for package_with_allocation pricing
       */
      export interface PackageWithAllocationConfig {
        allocation: string;

        package_amount: string;

        package_size: string;
      }
    }

    export interface NewLicenseAllocationUnitWithPercentPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationUnitWithPercentPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'unit_with_percent';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for unit_with_percent pricing
       */
      unit_with_percent_config: NewLicenseAllocationUnitWithPercentPrice.UnitWithPercentConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationUnitWithPercentPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for unit_with_percent pricing
       */
      export interface UnitWithPercentConfig {
        /**
         * What percent, out of 100, of the calculated total to charge
         */
        percent: string;

        /**
         * Rate per unit of usage
         */
        unit_amount: string;
      }
    }

    export interface NewLicenseAllocationMatrixWithAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationMatrixWithAllocationPrice.LicenseAllocation>;

      /**
       * Configuration for matrix_with_allocation pricing
       */
      matrix_with_allocation_config: Shared.MatrixWithAllocationConfig;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationMatrixWithAllocationPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationTieredWithProrationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationTieredWithProrationPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'tiered_with_proration';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for tiered_with_proration pricing
       */
      tiered_with_proration_config: NewLicenseAllocationTieredWithProrationPrice.TieredWithProrationConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationTieredWithProrationPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for tiered_with_proration pricing
       */
      export interface TieredWithProrationConfig {
        /**
         * Tiers for rating based on total usage quantities into the specified tier with
         * proration
         */
        tiers: Array<TieredWithProrationConfig.Tier>;
      }

      export namespace TieredWithProrationConfig {
        /**
         * Configuration for a single tiered with proration tier
         */
        export interface Tier {
          /**
           * Inclusive tier starting value
           */
          tier_lower_bound: string;

          /**
           * Amount per unit
           */
          unit_amount: string;
        }
      }
    }

    export interface NewLicenseAllocationUnitWithProrationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationUnitWithProrationPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'unit_with_proration';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for unit_with_proration pricing
       */
      unit_with_proration_config: NewLicenseAllocationUnitWithProrationPrice.UnitWithProrationConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationUnitWithProrationPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for unit_with_proration pricing
       */
      export interface UnitWithProrationConfig {
        /**
         * Rate per unit of usage
         */
        unit_amount: string;
      }
    }

    export interface NewLicenseAllocationGroupedAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_allocation pricing
       */
      grouped_allocation_config: NewLicenseAllocationGroupedAllocationPrice.GroupedAllocationConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationGroupedAllocationPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationGroupedAllocationPrice {
      /**
       * Configuration for grouped_allocation pricing
       */
      export interface GroupedAllocationConfig {
        /**
         * Usage allocation per group
         */
        allocation: string;

        /**
         * How to determine the groups that should each be allocated some quantity
         */
        grouping_key: string;

        /**
         * Unit rate for post-allocation
         */
        overage_unit_rate: string;
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationBulkWithProrationPrice {
      /**
       * Configuration for bulk_with_proration pricing
       */
      bulk_with_proration_config: NewLicenseAllocationBulkWithProrationPrice.BulkWithProrationConfig;

      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationBulkWithProrationPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationBulkWithProrationPrice {
      /**
       * Configuration for bulk_with_proration pricing
       */
      export interface BulkWithProrationConfig {
        /**
         * Bulk tiers for rating based on total usage volume
         */
        tiers: Array<BulkWithProrationConfig.Tier>;
      }

      export namespace BulkWithProrationConfig {
        /**
         * Configuration for a single bulk pricing tier with proration
         */
        export interface Tier {
          /**
           * Cost per unit
           */
          unit_amount: string;

          /**
           * The lower bound for this tier
           */
          tier_lower_bound?: string | null;
        }
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationGroupedWithProratedMinimumPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_with_prorated_minimum pricing
       */
      grouped_with_prorated_minimum_config: NewLicenseAllocationGroupedWithProratedMinimumPrice.GroupedWithProratedMinimumConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationGroupedWithProratedMinimumPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationGroupedWithProratedMinimumPrice {
      /**
       * Configuration for grouped_with_prorated_minimum pricing
       */
      export interface GroupedWithProratedMinimumConfig {
        /**
         * How to determine the groups that should each have a minimum
         */
        grouping_key: string;

        /**
         * The minimum amount to charge per group
         */
        minimum: string;

        /**
         * The amount to charge per unit
         */
        unit_rate: string;
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationGroupedWithMeteredMinimumPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_with_metered_minimum pricing
       */
      grouped_with_metered_minimum_config: NewLicenseAllocationGroupedWithMeteredMinimumPrice.GroupedWithMeteredMinimumConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationGroupedWithMeteredMinimumPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationGroupedWithMeteredMinimumPrice {
      /**
       * Configuration for grouped_with_metered_minimum pricing
       */
      export interface GroupedWithMeteredMinimumConfig {
        /**
         * Used to partition the usage into groups. The minimum amount is applied to each
         * group.
         */
        grouping_key: string;

        /**
         * The minimum amount to charge per group per unit
         */
        minimum_unit_amount: string;

        /**
         * Used to determine the unit rate
         */
        pricing_key: string;

        /**
         * Scale the unit rates by the scaling factor.
         */
        scaling_factors: Array<GroupedWithMeteredMinimumConfig.ScalingFactor>;

        /**
         * Used to determine the unit rate scaling factor
         */
        scaling_key: string;

        /**
         * Apply per unit pricing to each pricing value. The minimum amount is applied any
         * unmatched usage.
         */
        unit_amounts: Array<GroupedWithMeteredMinimumConfig.UnitAmount>;
      }

      export namespace GroupedWithMeteredMinimumConfig {
        /**
         * Configuration for a scaling factor
         */
        export interface ScalingFactor {
          scaling_factor: string;

          scaling_value: string;
        }

        /**
         * Configuration for a unit amount
         */
        export interface UnitAmount {
          pricing_value: string;

          /**
           * Per unit amount
           */
          unit_amount: string;
        }
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationGroupedWithMinMaxThresholdsPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_with_min_max_thresholds pricing
       */
      grouped_with_min_max_thresholds_config: NewLicenseAllocationGroupedWithMinMaxThresholdsPrice.GroupedWithMinMaxThresholdsConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationGroupedWithMinMaxThresholdsPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationGroupedWithMinMaxThresholdsPrice {
      /**
       * Configuration for grouped_with_min_max_thresholds pricing
       */
      export interface GroupedWithMinMaxThresholdsConfig {
        /**
         * The event property used to group before applying thresholds
         */
        grouping_key: string;

        /**
         * The maximum amount to charge each group
         */
        maximum_charge: string;

        /**
         * The minimum amount to charge each group, regardless of usage
         */
        minimum_charge: string;

        /**
         * The base price charged per group
         */
        per_unit_rate: string;
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationMatrixWithDisplayNamePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationMatrixWithDisplayNamePrice.LicenseAllocation>;

      /**
       * Configuration for matrix_with_display_name pricing
       */
      matrix_with_display_name_config: NewLicenseAllocationMatrixWithDisplayNamePrice.MatrixWithDisplayNameConfig;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationMatrixWithDisplayNamePrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for matrix_with_display_name pricing
       */
      export interface MatrixWithDisplayNameConfig {
        /**
         * Used to determine the unit rate
         */
        dimension: string;

        /**
         * Apply per unit pricing to each dimension value
         */
        unit_amounts: Array<MatrixWithDisplayNameConfig.UnitAmount>;
      }

      export namespace MatrixWithDisplayNameConfig {
        /**
         * Configuration for a unit amount item
         */
        export interface UnitAmount {
          /**
           * The dimension value
           */
          dimension_value: string;

          /**
           * Display name for this dimension value
           */
          display_name: string;

          /**
           * Per unit amount
           */
          unit_amount: string;
        }
      }
    }

    export interface NewLicenseAllocationGroupedTieredPackagePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_tiered_package pricing
       */
      grouped_tiered_package_config: NewLicenseAllocationGroupedTieredPackagePrice.GroupedTieredPackageConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationGroupedTieredPackagePrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationGroupedTieredPackagePrice {
      /**
       * Configuration for grouped_tiered_package pricing
       */
      export interface GroupedTieredPackageConfig {
        /**
         * The event property used to group before tiering
         */
        grouping_key: string;

        package_size: string;

        /**
         * Apply tiered pricing after rounding up the quantity to the package size. Tiers
         * are defined using exclusive lower bounds.
         */
        tiers: Array<GroupedTieredPackageConfig.Tier>;
      }

      export namespace GroupedTieredPackageConfig {
        /**
         * Configuration for a single tier
         */
        export interface Tier {
          /**
           * Per package
           */
          per_unit: string;

          tier_lower_bound: string;
        }
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationMaxGroupTieredPackagePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationMaxGroupTieredPackagePrice.LicenseAllocation>;

      /**
       * Configuration for max_group_tiered_package pricing
       */
      max_group_tiered_package_config: NewLicenseAllocationMaxGroupTieredPackagePrice.MaxGroupTieredPackageConfig;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationMaxGroupTieredPackagePrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for max_group_tiered_package pricing
       */
      export interface MaxGroupTieredPackageConfig {
        /**
         * The event property used to group before tiering the group with the highest value
         */
        grouping_key: string;

        package_size: string;

        /**
         * Apply tiered pricing to the largest group after grouping with the provided key.
         */
        tiers: Array<MaxGroupTieredPackageConfig.Tier>;
      }

      export namespace MaxGroupTieredPackageConfig {
        /**
         * Configuration for a single tier
         */
        export interface Tier {
          tier_lower_bound: string;

          /**
           * Per unit amount
           */
          unit_amount: string;
        }
      }
    }

    export interface NewLicenseAllocationScalableMatrixWithUnitPricingPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationScalableMatrixWithUnitPricingPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'scalable_matrix_with_unit_pricing';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for scalable_matrix_with_unit_pricing pricing
       */
      scalable_matrix_with_unit_pricing_config: NewLicenseAllocationScalableMatrixWithUnitPricingPrice.ScalableMatrixWithUnitPricingConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationScalableMatrixWithUnitPricingPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for scalable_matrix_with_unit_pricing pricing
       */
      export interface ScalableMatrixWithUnitPricingConfig {
        /**
         * Used to determine the unit rate
         */
        first_dimension: string;

        /**
         * Apply a scaling factor to each dimension
         */
        matrix_scaling_factors: Array<ScalableMatrixWithUnitPricingConfig.MatrixScalingFactor>;

        /**
         * The final unit price to rate against the output of the matrix
         */
        unit_price: string;

        /**
         * The property used to group this price
         */
        grouping_key?: string | null;

        /**
         * If true, the unit price will be prorated to the billing period
         */
        prorate?: boolean | null;

        /**
         * Used to determine the unit rate (optional)
         */
        second_dimension?: string | null;
      }

      export namespace ScalableMatrixWithUnitPricingConfig {
        /**
         * Configuration for a single matrix scaling factor
         */
        export interface MatrixScalingFactor {
          first_dimension_value: string;

          scaling_factor: string;

          second_dimension_value?: string | null;
        }
      }
    }

    export interface NewLicenseAllocationScalableMatrixWithTieredPricingPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationScalableMatrixWithTieredPricingPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'scalable_matrix_with_tiered_pricing';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for scalable_matrix_with_tiered_pricing pricing
       */
      scalable_matrix_with_tiered_pricing_config: NewLicenseAllocationScalableMatrixWithTieredPricingPrice.ScalableMatrixWithTieredPricingConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationScalableMatrixWithTieredPricingPrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for scalable_matrix_with_tiered_pricing pricing
       */
      export interface ScalableMatrixWithTieredPricingConfig {
        /**
         * Used for the scalable matrix first dimension
         */
        first_dimension: string;

        /**
         * Apply a scaling factor to each dimension
         */
        matrix_scaling_factors: Array<ScalableMatrixWithTieredPricingConfig.MatrixScalingFactor>;

        tiers: Array<ScalableMatrixWithTieredPricingConfig.Tier>;

        /**
         * Used for the scalable matrix second dimension (optional)
         */
        second_dimension?: string | null;
      }

      export namespace ScalableMatrixWithTieredPricingConfig {
        /**
         * Configuration for a single matrix scaling factor
         */
        export interface MatrixScalingFactor {
          first_dimension_value: string;

          scaling_factor: string;

          second_dimension_value?: string | null;
        }

        /**
         * Configuration for a single tier entry with business logic
         */
        export interface Tier {
          tier_lower_bound: string;

          unit_amount: string;
        }
      }
    }

    export interface NewLicenseAllocationCumulativeGroupedBulkPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for cumulative_grouped_bulk pricing
       */
      cumulative_grouped_bulk_config: NewLicenseAllocationCumulativeGroupedBulkPrice.CumulativeGroupedBulkConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationCumulativeGroupedBulkPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationCumulativeGroupedBulkPrice {
      /**
       * Configuration for cumulative_grouped_bulk pricing
       */
      export interface CumulativeGroupedBulkConfig {
        /**
         * Each tier lower bound must have the same group of values.
         */
        dimension_values: Array<CumulativeGroupedBulkConfig.DimensionValue>;

        group: string;
      }

      export namespace CumulativeGroupedBulkConfig {
        /**
         * Configuration for a dimension value entry
         */
        export interface DimensionValue {
          /**
           * Grouping key value
           */
          grouping_key: string;

          /**
           * Tier lower bound
           */
          tier_lower_bound: string;

          /**
           * Unit amount for this combination
           */
          unit_amount: string;
        }
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationCumulativeGroupedAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for cumulative_grouped_allocation pricing
       */
      cumulative_grouped_allocation_config: NewLicenseAllocationCumulativeGroupedAllocationPrice.CumulativeGroupedAllocationConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationCumulativeGroupedAllocationPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'cumulative_grouped_allocation';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationCumulativeGroupedAllocationPrice {
      /**
       * Configuration for cumulative_grouped_allocation pricing
       */
      export interface CumulativeGroupedAllocationConfig {
        /**
         * The overall allocation across all groups
         */
        cumulative_allocation: string;

        /**
         * The allocation per individual group
         */
        group_allocation: string;

        /**
         * The event property used to group usage before applying allocations
         */
        grouping_key: string;

        /**
         * The amount to charge for each unit outside of the allocation
         */
        unit_amount: string;
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewLicenseAllocationMinimumCompositePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationMinimumCompositePrice.LicenseAllocation>;

      /**
       * Configuration for minimum_composite pricing
       */
      minimum_composite_config: NewLicenseAllocationMinimumCompositePrice.MinimumCompositeConfig;

      /**
       * The pricing model type
       */
      model_type: 'minimum_composite';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationMinimumCompositePrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for minimum_composite pricing
       */
      export interface MinimumCompositeConfig {
        /**
         * The minimum amount to apply
         */
        minimum_amount: string;

        /**
         * If true, subtotals from this price are prorated based on the service period
         */
        prorated?: boolean;
      }
    }

    export interface NewLicenseAllocationPercentCompositePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationPercentCompositePrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'percent';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for percent pricing
       */
      percent_config: NewLicenseAllocationPercentCompositePrice.PercentConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationPercentCompositePrice {
      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }

      /**
       * Configuration for percent pricing
       */
      export interface PercentConfig {
        /**
         * What percent of the component subtotals to charge
         */
        percent: number;
      }
    }

    export interface NewLicenseAllocationEventOutputPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for event_output pricing
       */
      event_output_config: NewLicenseAllocationEventOutputPrice.EventOutputConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * License allocations to associate with this price. Each entry defines a
       * per-license credit pool granted each cadence. Requires license_type_id or
       * license_type_configuration to be set.
       */
      license_allocations: Array<NewLicenseAllocationEventOutputPrice.LicenseAllocation>;

      /**
       * The pricing model type
       */
      model_type: 'event_output';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewLicenseAllocationEventOutputPrice {
      /**
       * Configuration for event_output pricing
       */
      export interface EventOutputConfig {
        /**
         * The key in the event data to extract the unit rate from.
         */
        unit_rating_key: string;

        /**
         * If provided, this amount will be used as the unit rate when an event does not
         * have a value for the `unit_rating_key`. If not provided, events missing a unit
         * rate will be ignored.
         */
        default_unit_rate?: string | null;

        /**
         * An optional key in the event data to group by (e.g., event ID). All events will
         * also be grouped by their unit rate.
         */
        grouping_key?: string | null;
      }

      export interface LicenseAllocation {
        /**
         * The amount of credits granted per active license per cadence.
         */
        amount: string;

        /**
         * The currency of the license allocation.
         */
        currency: string;

        /**
         * When True, overage beyond the allocation is written off.
         */
        write_off_overage?: boolean | null;
      }
    }

    export interface NewPlanBulkWithFiltersPrice {
      /**
       * Configuration for bulk_with_filters pricing
       */
      bulk_with_filters_config: NewPlanBulkWithFiltersPrice.BulkWithFiltersConfig;

      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * The pricing model type
       */
      model_type: 'bulk_with_filters';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewPlanBulkWithFiltersPrice {
      /**
       * Configuration for bulk_with_filters pricing
       */
      export interface BulkWithFiltersConfig {
        /**
         * Property filters to apply (all must match)
         */
        filters: Array<BulkWithFiltersConfig.Filter>;

        /**
         * Bulk tiers for rating based on total usage volume
         */
        tiers: Array<BulkWithFiltersConfig.Tier>;
      }

      export namespace BulkWithFiltersConfig {
        /**
         * Configuration for a single property filter
         */
        export interface Filter {
          /**
           * Event property key to filter on
           */
          property_key: string;

          /**
           * Event property value to match
           */
          property_value: string;
        }

        /**
         * Configuration for a single bulk pricing tier
         */
        export interface Tier {
          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * The lower bound for this tier
           */
          tier_lower_bound?: string | null;
        }
      }
    }

    export interface NewPlanTieredWithProrationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * The pricing model type
       */
      model_type: 'tiered_with_proration';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for tiered_with_proration pricing
       */
      tiered_with_proration_config: NewPlanTieredWithProrationPrice.TieredWithProrationConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewPlanTieredWithProrationPrice {
      /**
       * Configuration for tiered_with_proration pricing
       */
      export interface TieredWithProrationConfig {
        /**
         * Tiers for rating based on total usage quantities into the specified tier with
         * proration
         */
        tiers: Array<TieredWithProrationConfig.Tier>;
      }

      export namespace TieredWithProrationConfig {
        /**
         * Configuration for a single tiered with proration tier
         */
        export interface Tier {
          /**
           * Inclusive tier starting value
           */
          tier_lower_bound: string;

          /**
           * Amount per unit
           */
          unit_amount: string;
        }
      }
    }

    export interface NewPlanGroupedWithMinMaxThresholdsPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for grouped_with_min_max_thresholds pricing
       */
      grouped_with_min_max_thresholds_config: NewPlanGroupedWithMinMaxThresholdsPrice.GroupedWithMinMaxThresholdsConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * The pricing model type
       */
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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewPlanGroupedWithMinMaxThresholdsPrice {
      /**
       * Configuration for grouped_with_min_max_thresholds pricing
       */
      export interface GroupedWithMinMaxThresholdsConfig {
        /**
         * The event property used to group before applying thresholds
         */
        grouping_key: string;

        /**
         * The maximum amount to charge each group
         */
        maximum_charge: string;

        /**
         * The minimum amount to charge each group, regardless of usage
         */
        minimum_charge: string;

        /**
         * The base price charged per group
         */
        per_unit_rate: string;
      }
    }

    export interface NewPlanCumulativeGroupedAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for cumulative_grouped_allocation pricing
       */
      cumulative_grouped_allocation_config: NewPlanCumulativeGroupedAllocationPrice.CumulativeGroupedAllocationConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * The pricing model type
       */
      model_type: 'cumulative_grouped_allocation';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewPlanCumulativeGroupedAllocationPrice {
      /**
       * Configuration for cumulative_grouped_allocation pricing
       */
      export interface CumulativeGroupedAllocationConfig {
        /**
         * The overall allocation across all groups
         */
        cumulative_allocation: string;

        /**
         * The allocation per individual group
         */
        group_allocation: string;

        /**
         * The event property used to group usage before applying allocations
         */
        grouping_key: string;

        /**
         * The amount to charge for each unit outside of the allocation
         */
        unit_amount: string;
      }
    }

    export interface NewPlanPercentCompositePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * The pricing model type
       */
      model_type: 'percent';

      /**
       * The name of the price.
       */
      name: string;

      /**
       * Configuration for percent pricing
       */
      percent_config: NewPlanPercentCompositePrice.PercentConfig;

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewPlanPercentCompositePrice {
      /**
       * Configuration for percent pricing
       */
      export interface PercentConfig {
        /**
         * What percent of the component subtotals to charge
         */
        percent: number;
      }
    }

    export interface NewPlanEventOutputPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * Configuration for event_output pricing
       */
      event_output_config: NewPlanEventOutputPrice.EventOutputConfig;

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      /**
       * The pricing model type
       */
      model_type: 'event_output';

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
       * The ID of the license type to associate with this price.
       */
      license_type_id?: string | null;

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

    export namespace NewPlanEventOutputPrice {
      /**
       * Configuration for event_output pricing
       */
      export interface EventOutputConfig {
        /**
         * The key in the event data to extract the unit rate from.
         */
        unit_rating_key: string;

        /**
         * If provided, this amount will be used as the unit rate when an event does not
         * have a value for the `unit_rating_key`. If not provided, events missing a unit
         * rate will be ignored.
         */
        default_unit_rate?: string | null;

        /**
         * An optional key in the event data to group by (e.g., event ID). All events will
         * also be grouped by their unit rate.
         */
        grouping_key?: string | null;
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
