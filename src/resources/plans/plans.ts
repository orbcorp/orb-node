// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as Shared from '../shared';
import * as ExternalPlanIDAPI from './external-plan-id';
import { ExternalPlanID, ExternalPlanIDUpdateParams } from './external-plan-id';
import * as MigrationsAPI from './migrations';
import {
  MigrationCancelResponse,
  MigrationListParams,
  MigrationListResponse,
  MigrationListResponsesPage,
  MigrationRetrieveResponse,
  Migrations,
} from './migrations';
import { Page, type PageParams } from '../../pagination';

/**
 * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be subscribed to by a
 * customer. Plans define the billing behavior of the subscription. You can see more about how to configure prices
 * in the [Price resource](/reference/price).
 */
export class Plans extends APIResource {
  externalPlanId: ExternalPlanIDAPI.ExternalPlanID = new ExternalPlanIDAPI.ExternalPlanID(this._client);
  migrations: MigrationsAPI.Migrations = new MigrationsAPI.Migrations(this._client);

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
    | Shared.PlanPhaseUsageDiscountAdjustment
    | Shared.PlanPhaseAmountDiscountAdjustment
    | Shared.PlanPhasePercentageDiscountAdjustment
    | Shared.PlanPhaseMinimumAdjustment
    | Shared.PlanPhaseMaximumAdjustment
  >;

  /**
   * @deprecated Legacy field representing the parent plan if the current plan is a
   * 'child plan', overriding prices from the parent.
   */
  base_plan: Plan.BasePlan | null;

  /**
   * @deprecated Legacy field representing the parent plan ID if the current plan is
   * a 'child plan', overriding prices from the parent.
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
  maximum: Shared.Maximum | null;

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
  metadata: { [key: string]: string };

  /**
   * @deprecated
   */
  minimum: Shared.Minimum | null;

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
  prices: Array<Shared.Price>;

  product: Plan.Product;

  status: 'active' | 'archived' | 'draft';

  trial_config: Plan.TrialConfig;

  version: number;
}

export namespace Plan {
  /**
   * @deprecated Legacy field representing the parent plan if the current plan is a
   * 'child plan', overriding prices from the parent.
   */
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

    maximum: Shared.Maximum | null;

    maximum_amount: string | null;

    minimum: Shared.Minimum | null;

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
  prices: Array<PlanCreateParams.Price>;

  /**
   * Adjustments for this plan. If the plan has phases, this includes adjustments
   * across all phases of the plan.
   */
  adjustments?: Array<PlanCreateParams.Adjustment> | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * The net terms determines the difference between the invoice date and the issue
   * date for the invoice. If you intend the invoice to be due on issue, set this
   * to 0.
   */
  net_terms?: number | null;

  /**
   * Configuration of pre-defined phases, each with their own prices and adjustments.
   * Leave unspecified for plans with a single phase.
   */
  plan_phases?: Array<PlanCreateParams.PlanPhase> | null;

  /**
   * The status of the plan to create (either active or draft). If not specified,
   * this defaults to active.
   */
  status?: 'active' | 'draft';
}

export namespace PlanCreateParams {
  export interface Price {
    /**
     * The allocation price to add to the plan.
     */
    allocation_price?: Shared.NewAllocationPrice | null;

    /**
     * The license allocation price to add to the plan.
     */
    license_allocation_price?:
      | Price.NewLicenseAllocationUnitPrice
      | Price.NewLicenseAllocationTieredPrice
      | Price.NewLicenseAllocationBulkPrice
      | Price.NewLicenseAllocationBulkWithFiltersPrice
      | Price.NewLicenseAllocationPackagePrice
      | Price.NewLicenseAllocationMatrixPrice
      | Price.NewLicenseAllocationThresholdTotalAmountPrice
      | Price.NewLicenseAllocationTieredPackagePrice
      | Price.NewLicenseAllocationTieredWithMinimumPrice
      | Price.NewLicenseAllocationGroupedTieredPrice
      | Price.NewLicenseAllocationTieredPackageWithMinimumPrice
      | Price.NewLicenseAllocationPackageWithAllocationPrice
      | Price.NewLicenseAllocationUnitWithPercentPrice
      | Price.NewLicenseAllocationMatrixWithAllocationPrice
      | Price.NewLicenseAllocationTieredWithProrationPrice
      | Price.NewLicenseAllocationUnitWithProrationPrice
      | Price.NewLicenseAllocationGroupedAllocationPrice
      | Price.NewLicenseAllocationBulkWithProrationPrice
      | Price.NewLicenseAllocationGroupedWithProratedMinimumPrice
      | Price.NewLicenseAllocationGroupedWithMeteredMinimumPrice
      | Price.NewLicenseAllocationGroupedWithMinMaxThresholdsPrice
      | Price.NewLicenseAllocationMatrixWithDisplayNamePrice
      | Price.NewLicenseAllocationGroupedTieredPackagePrice
      | Price.NewLicenseAllocationMaxGroupTieredPackagePrice
      | Price.NewLicenseAllocationScalableMatrixWithUnitPricingPrice
      | Price.NewLicenseAllocationScalableMatrixWithTieredPricingPrice
      | Price.NewLicenseAllocationCumulativeGroupedBulkPrice
      | Price.NewLicenseAllocationCumulativeGroupedAllocationPrice
      | Price.NewLicenseAllocationMinimumCompositePrice
      | Price.NewLicenseAllocationPercentCompositePrice
      | Price.NewLicenseAllocationEventOutputPrice
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
      | Price.NewPlanBulkWithFiltersPrice
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
      | Price.NewPlanTieredWithProrationPrice
      | Shared.NewPlanUnitWithProrationPrice
      | Shared.NewPlanGroupedAllocationPrice
      | Shared.NewPlanBulkWithProrationPrice
      | Shared.NewPlanGroupedWithProratedMinimumPrice
      | Shared.NewPlanGroupedWithMeteredMinimumPrice
      | Price.NewPlanGroupedWithMinMaxThresholdsPrice
      | Shared.NewPlanMatrixWithDisplayNamePrice
      | Shared.NewPlanGroupedTieredPackagePrice
      | Shared.NewPlanMaxGroupTieredPackagePrice
      | Shared.NewPlanScalableMatrixWithUnitPricingPrice
      | Shared.NewPlanScalableMatrixWithTieredPricingPrice
      | Shared.NewPlanCumulativeGroupedBulkPrice
      | Price.NewPlanCumulativeGroupedAllocationPrice
      | Shared.NewPlanMinimumCompositePrice
      | Price.NewPlanPercentCompositePrice
      | Price.NewPlanEventOutputPrice
      | null;
  }

  export namespace Price {
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

  export interface Adjustment {
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

  export interface PlanPhase {
    /**
     * Determines the ordering of the phase in a plan's lifecycle. 1 = first phase.
     */
    order: number;

    /**
     * Align billing cycle day with phase start date.
     */
    align_billing_with_phase_start_date?: boolean | null;

    /**
     * How many terms of length `duration_unit` this phase is active for. If null, this
     * phase is evergreen and active indefinitely
     */
    duration?: number | null;

    duration_unit?: 'daily' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | null;
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
  metadata?: { [key: string]: string | null } | null;
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

Plans.PlansPage = PlansPage;
Plans.ExternalPlanID = ExternalPlanID;
Plans.Migrations = Migrations;
Plans.MigrationListResponsesPage = MigrationListResponsesPage;

export declare namespace Plans {
  export {
    type Plan as Plan,
    PlansPage as PlansPage,
    type PlanCreateParams as PlanCreateParams,
    type PlanUpdateParams as PlanUpdateParams,
    type PlanListParams as PlanListParams,
  };

  export { ExternalPlanID as ExternalPlanID, type ExternalPlanIDUpdateParams as ExternalPlanIDUpdateParams };

  export {
    Migrations as Migrations,
    type MigrationRetrieveResponse as MigrationRetrieveResponse,
    type MigrationListResponse as MigrationListResponse,
    type MigrationCancelResponse as MigrationCancelResponse,
    MigrationListResponsesPage as MigrationListResponsesPage,
    type MigrationListParams as MigrationListParams,
  };
}
