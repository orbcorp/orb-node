// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as PricesAPI from './prices';
import * as Shared from '../shared';
import * as ExternalPriceIDAPI from './external-price-id';
import { ExternalPriceID, ExternalPriceIDUpdateParams } from './external-price-id';
import { Page, type PageParams } from '../../pagination';

export class Prices extends APIResource {
  externalPriceId: ExternalPriceIDAPI.ExternalPriceID = new ExternalPriceIDAPI.ExternalPriceID(this._client);

  /**
   * This endpoint is used to create a [price](/product-catalog/price-configuration).
   * A price created using this endpoint is always an add-on, meaning that it's not
   * associated with a specific plan and can instead be individually added to
   * subscriptions, including subscriptions on different plans.
   *
   * An `external_price_id` can be optionally specified as an alias to allow
   * ergonomic interaction with prices in the Orb API.
   *
   * See the [Price resource](/product-catalog/price-configuration) for the
   * specification of different price model configurations possible in this endpoint.
   */
  create(body: PriceCreateParams, options?: Core.RequestOptions): Core.APIPromise<Price> {
    return this._client.post('/prices', { body, ...options });
  }

  /**
   * This endpoint allows you to update the `metadata` property on a price. If you
   * pass null for the metadata value, it will clear any existing metadata for that
   * price.
   */
  update(priceId: string, body: PriceUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Price> {
    return this._client.put(`/prices/${priceId}`, { body, ...options });
  }

  /**
   * This endpoint is used to list all add-on prices created using the
   * [price creation endpoint](/api-reference/price/create-price).
   */
  list(query?: PriceListParams, options?: Core.RequestOptions): Core.PagePromise<PricesPage, Price>;
  list(options?: Core.RequestOptions): Core.PagePromise<PricesPage, Price>;
  list(
    query: PriceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<PricesPage, Price> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/prices', PricesPage, { query, ...options });
  }

  /**
   * [NOTE] It is recommended to use the `/v1/prices/evaluate` which offers further
   * functionality, such as multiple prices, inline price definitions, and querying
   * over preview events.
   *
   * This endpoint is used to evaluate the output of a price for a given customer and
   * time range. It enables filtering and grouping the output using
   * [computed properties](/extensibility/advanced-metrics#computed-properties),
   * supporting the following workflows:
   *
   * 1. Showing detailed usage and costs to the end customer.
   * 2. Auditing subtotals on invoice line items.
   *
   * For these workflows, the expressiveness of computed properties in both the
   * filters and grouping is critical. For example, if you'd like to show your
   * customer their usage grouped by hour and another property, you can do so with
   * the following `grouping_keys`:
   * `["hour_floor_timestamp_millis(timestamp_millis)", "my_property"]`. If you'd
   * like to examine a customer's usage for a specific property value, you can do so
   * with the following `filter`:
   * `my_property = 'foo' AND my_other_property = 'bar'`.
   *
   * By default, the start of the time range must be no more than 100 days ago and
   * the length of the results must be no greater than 1000. Note that this is a POST
   * endpoint rather than a GET endpoint because it employs a JSON body rather than
   * query parameters.
   */
  evaluate(
    priceId: string,
    body: PriceEvaluateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PriceEvaluateResponse> {
    return this._client.post(`/prices/${priceId}/evaluate`, { body, ...options });
  }

  /**
   * This endpoint is used to evaluate the output of price(s) for a given customer
   * and time range over either ingested events or preview events. It enables
   * filtering and grouping the output using
   * [computed properties](/extensibility/advanced-metrics#computed-properties),
   * supporting the following workflows:
   *
   * 1. Showing detailed usage and costs to the end customer.
   * 2. Auditing subtotals on invoice line items.
   *
   * Prices may either reference existing prices in your Orb account or be defined
   * inline in the request body. Up to 100 prices can be evaluated in a single
   * request.
   *
   * Price evaluation by default uses ingested events, but you can also provide a
   * list of preview events to use instead. Up to 500 preview events can be provided
   * in a single request. When using ingested events, the start of the time range
   * must be no more than 100 days ago.
   *
   * For these workflows, the expressiveness of computed properties in both the
   * filters and grouping is critical. For example, if you'd like to show your
   * customer their usage grouped by hour and another property, you can do so with
   * the following `grouping_keys`:
   * `["hour_floor_timestamp_millis(timestamp_millis)", "my_property"]`. If you'd
   * like to examine a customer's usage for a specific property value, you can do so
   * with the following `filter`:
   * `my_property = 'foo' AND my_other_property = 'bar'`.
   *
   * The length of the results must be no greater than 1000. Note that this is a POST
   * endpoint rather than a GET endpoint because it employs a JSON body rather than
   * query parameters.
   */
  evaluateMultiple(
    body: PriceEvaluateMultipleParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PriceEvaluateMultipleResponse> {
    return this._client.post('/prices/evaluate', { body, ...options });
  }

  /**
   * This endpoint returns a price given an identifier.
   */
  fetch(priceId: string, options?: Core.RequestOptions): Core.APIPromise<Price> {
    return this._client.get(`/prices/${priceId}`, options);
  }
}

export class PricesPage extends Page<Price> {}

export interface EvaluatePriceGroup {
  /**
   * The price's output for the group
   */
  amount: string;

  /**
   * The values for the group in the order specified by `grouping_keys`
   */
  grouping_values: Array<string | number | boolean>;

  /**
   * The price's usage quantity for the group
   */
  quantity: number;
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
export type Price =
  | Price.UnitPrice
  | Price.PackagePrice
  | Price.MatrixPrice
  | Price.TieredPrice
  | Price.TieredBpsPrice
  | Price.BpsPrice
  | Price.BulkBpsPrice
  | Price.BulkPrice
  | Price.ThresholdTotalAmountPrice
  | Price.TieredPackagePrice
  | Price.GroupedTieredPrice
  | Price.TieredWithMinimumPrice
  | Price.TieredPackageWithMinimumPrice
  | Price.PackageWithAllocationPrice
  | Price.UnitWithPercentPrice
  | Price.MatrixWithAllocationPrice
  | Price.TieredWithProrationPrice
  | Price.UnitWithProrationPrice
  | Price.GroupedAllocationPrice
  | Price.GroupedWithProratedMinimumPrice
  | Price.GroupedWithMeteredMinimumPrice
  | Price.MatrixWithDisplayNamePrice
  | Price.BulkWithProrationPrice
  | Price.GroupedTieredPackagePrice
  | Price.MaxGroupTieredPackagePrice
  | Price.ScalableMatrixWithUnitPricingPrice
  | Price.ScalableMatrixWithTieredPricingPrice
  | Price.CumulativeGroupedBulkPrice;

export namespace Price {
  export interface UnitPrice {
    id: string;

    billable_metric: UnitPrice.BillableMetric | null;

    billing_cycle_configuration: UnitPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: UnitPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: UnitPrice.InvoicingCycleConfiguration | null;

    item: UnitPrice.Item;

    /**
     * @deprecated
     */
    maximum: UnitPrice.Maximum | null;

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
    minimum: UnitPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'unit';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    unit_config: UnitPrice.UnitConfig;

    dimensional_price_configuration?: UnitPrice.DimensionalPriceConfiguration | null;
  }

  export namespace UnitPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface UnitConfig {
      /**
       * Rate per unit of usage
       */
      unit_amount: string;
    }

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface PackagePrice {
    id: string;

    billable_metric: PackagePrice.BillableMetric | null;

    billing_cycle_configuration: PackagePrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: PackagePrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: PackagePrice.InvoicingCycleConfiguration | null;

    item: PackagePrice.Item;

    /**
     * @deprecated
     */
    maximum: PackagePrice.Maximum | null;

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
    minimum: PackagePrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'package';

    name: string;

    package_config: PackagePrice.PackageConfig;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: PackagePrice.DimensionalPriceConfiguration | null;
  }

  export namespace PackagePrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface MatrixPrice {
    id: string;

    billable_metric: MatrixPrice.BillableMetric | null;

    billing_cycle_configuration: MatrixPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: MatrixPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: MatrixPrice.InvoicingCycleConfiguration | null;

    item: MatrixPrice.Item;

    matrix_config: MatrixPrice.MatrixConfig;

    /**
     * @deprecated
     */
    maximum: MatrixPrice.Maximum | null;

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
    minimum: MatrixPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'matrix';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: MatrixPrice.DimensionalPriceConfiguration | null;
  }

  export namespace MatrixPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
    }

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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface TieredPrice {
    id: string;

    billable_metric: TieredPrice.BillableMetric | null;

    billing_cycle_configuration: TieredPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: TieredPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: TieredPrice.InvoicingCycleConfiguration | null;

    item: TieredPrice.Item;

    /**
     * @deprecated
     */
    maximum: TieredPrice.Maximum | null;

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
    minimum: TieredPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'tiered';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_config: TieredPrice.TieredConfig;

    dimensional_price_configuration?: TieredPrice.DimensionalPriceConfiguration | null;
  }

  export namespace TieredPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface TieredBpsPrice {
    id: string;

    billable_metric: TieredBpsPrice.BillableMetric | null;

    billing_cycle_configuration: TieredBpsPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: TieredBpsPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: TieredBpsPrice.InvoicingCycleConfiguration | null;

    item: TieredBpsPrice.Item;

    /**
     * @deprecated
     */
    maximum: TieredBpsPrice.Maximum | null;

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
    minimum: TieredBpsPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'tiered_bps';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_bps_config: TieredBpsPrice.TieredBpsConfig;

    dimensional_price_configuration?: TieredBpsPrice.DimensionalPriceConfiguration | null;
  }

  export namespace TieredBpsPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface BpsPrice {
    id: string;

    billable_metric: BpsPrice.BillableMetric | null;

    billing_cycle_configuration: BpsPrice.BillingCycleConfiguration;

    bps_config: BpsPrice.BpsConfig;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: BpsPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: BpsPrice.InvoicingCycleConfiguration | null;

    item: BpsPrice.Item;

    /**
     * @deprecated
     */
    maximum: BpsPrice.Maximum | null;

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
    minimum: BpsPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'bps';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: BpsPrice.DimensionalPriceConfiguration | null;
  }

  export namespace BpsPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

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

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface BulkBpsPrice {
    id: string;

    billable_metric: BulkBpsPrice.BillableMetric | null;

    billing_cycle_configuration: BulkBpsPrice.BillingCycleConfiguration;

    bulk_bps_config: BulkBpsPrice.BulkBpsConfig;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: BulkBpsPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: BulkBpsPrice.InvoicingCycleConfiguration | null;

    item: BulkBpsPrice.Item;

    /**
     * @deprecated
     */
    maximum: BulkBpsPrice.Maximum | null;

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
    minimum: BulkBpsPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'bulk_bps';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: BulkBpsPrice.DimensionalPriceConfiguration | null;
  }

  export namespace BulkBpsPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

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

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface BulkPrice {
    id: string;

    billable_metric: BulkPrice.BillableMetric | null;

    billing_cycle_configuration: BulkPrice.BillingCycleConfiguration;

    bulk_config: BulkPrice.BulkConfig;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: BulkPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: BulkPrice.InvoicingCycleConfiguration | null;

    item: BulkPrice.Item;

    /**
     * @deprecated
     */
    maximum: BulkPrice.Maximum | null;

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
    minimum: BulkPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'bulk';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: BulkPrice.DimensionalPriceConfiguration | null;
  }

  export namespace BulkPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

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

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface ThresholdTotalAmountPrice {
    id: string;

    billable_metric: ThresholdTotalAmountPrice.BillableMetric | null;

    billing_cycle_configuration: ThresholdTotalAmountPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: ThresholdTotalAmountPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: ThresholdTotalAmountPrice.InvoicingCycleConfiguration | null;

    item: ThresholdTotalAmountPrice.Item;

    /**
     * @deprecated
     */
    maximum: ThresholdTotalAmountPrice.Maximum | null;

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
    minimum: ThresholdTotalAmountPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'threshold_total_amount';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    threshold_total_amount_config: Record<string, unknown>;

    dimensional_price_configuration?: ThresholdTotalAmountPrice.DimensionalPriceConfiguration | null;
  }

  export namespace ThresholdTotalAmountPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface TieredPackagePrice {
    id: string;

    billable_metric: TieredPackagePrice.BillableMetric | null;

    billing_cycle_configuration: TieredPackagePrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: TieredPackagePrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: TieredPackagePrice.InvoicingCycleConfiguration | null;

    item: TieredPackagePrice.Item;

    /**
     * @deprecated
     */
    maximum: TieredPackagePrice.Maximum | null;

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
    minimum: TieredPackagePrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_package_config: Record<string, unknown>;

    dimensional_price_configuration?: TieredPackagePrice.DimensionalPriceConfiguration | null;
  }

  export namespace TieredPackagePrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface GroupedTieredPrice {
    id: string;

    billable_metric: GroupedTieredPrice.BillableMetric | null;

    billing_cycle_configuration: GroupedTieredPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: GroupedTieredPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_tiered_config: Record<string, unknown>;

    invoicing_cycle_configuration: GroupedTieredPrice.InvoicingCycleConfiguration | null;

    item: GroupedTieredPrice.Item;

    /**
     * @deprecated
     */
    maximum: GroupedTieredPrice.Maximum | null;

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
    minimum: GroupedTieredPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'grouped_tiered';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: GroupedTieredPrice.DimensionalPriceConfiguration | null;
  }

  export namespace GroupedTieredPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface TieredWithMinimumPrice {
    id: string;

    billable_metric: TieredWithMinimumPrice.BillableMetric | null;

    billing_cycle_configuration: TieredWithMinimumPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: TieredWithMinimumPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: TieredWithMinimumPrice.InvoicingCycleConfiguration | null;

    item: TieredWithMinimumPrice.Item;

    /**
     * @deprecated
     */
    maximum: TieredWithMinimumPrice.Maximum | null;

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
    minimum: TieredWithMinimumPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'tiered_with_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_with_minimum_config: Record<string, unknown>;

    dimensional_price_configuration?: TieredWithMinimumPrice.DimensionalPriceConfiguration | null;
  }

  export namespace TieredWithMinimumPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface TieredPackageWithMinimumPrice {
    id: string;

    billable_metric: TieredPackageWithMinimumPrice.BillableMetric | null;

    billing_cycle_configuration: TieredPackageWithMinimumPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: TieredPackageWithMinimumPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: TieredPackageWithMinimumPrice.InvoicingCycleConfiguration | null;

    item: TieredPackageWithMinimumPrice.Item;

    /**
     * @deprecated
     */
    maximum: TieredPackageWithMinimumPrice.Maximum | null;

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
    minimum: TieredPackageWithMinimumPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'tiered_package_with_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_package_with_minimum_config: Record<string, unknown>;

    dimensional_price_configuration?: TieredPackageWithMinimumPrice.DimensionalPriceConfiguration | null;
  }

  export namespace TieredPackageWithMinimumPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface PackageWithAllocationPrice {
    id: string;

    billable_metric: PackageWithAllocationPrice.BillableMetric | null;

    billing_cycle_configuration: PackageWithAllocationPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: PackageWithAllocationPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: PackageWithAllocationPrice.InvoicingCycleConfiguration | null;

    item: PackageWithAllocationPrice.Item;

    /**
     * @deprecated
     */
    maximum: PackageWithAllocationPrice.Maximum | null;

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
    minimum: PackageWithAllocationPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'package_with_allocation';

    name: string;

    package_with_allocation_config: Record<string, unknown>;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: PackageWithAllocationPrice.DimensionalPriceConfiguration | null;
  }

  export namespace PackageWithAllocationPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface UnitWithPercentPrice {
    id: string;

    billable_metric: UnitWithPercentPrice.BillableMetric | null;

    billing_cycle_configuration: UnitWithPercentPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: UnitWithPercentPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: UnitWithPercentPrice.InvoicingCycleConfiguration | null;

    item: UnitWithPercentPrice.Item;

    /**
     * @deprecated
     */
    maximum: UnitWithPercentPrice.Maximum | null;

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
    minimum: UnitWithPercentPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'unit_with_percent';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    unit_with_percent_config: Record<string, unknown>;

    dimensional_price_configuration?: UnitWithPercentPrice.DimensionalPriceConfiguration | null;
  }

  export namespace UnitWithPercentPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface MatrixWithAllocationPrice {
    id: string;

    billable_metric: MatrixWithAllocationPrice.BillableMetric | null;

    billing_cycle_configuration: MatrixWithAllocationPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: MatrixWithAllocationPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: MatrixWithAllocationPrice.InvoicingCycleConfiguration | null;

    item: MatrixWithAllocationPrice.Item;

    matrix_with_allocation_config: MatrixWithAllocationPrice.MatrixWithAllocationConfig;

    /**
     * @deprecated
     */
    maximum: MatrixWithAllocationPrice.Maximum | null;

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
    minimum: MatrixWithAllocationPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'matrix_with_allocation';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: MatrixWithAllocationPrice.DimensionalPriceConfiguration | null;
  }

  export namespace MatrixWithAllocationPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
    }

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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface TieredWithProrationPrice {
    id: string;

    billable_metric: TieredWithProrationPrice.BillableMetric | null;

    billing_cycle_configuration: TieredWithProrationPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: TieredWithProrationPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: TieredWithProrationPrice.InvoicingCycleConfiguration | null;

    item: TieredWithProrationPrice.Item;

    /**
     * @deprecated
     */
    maximum: TieredWithProrationPrice.Maximum | null;

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
    minimum: TieredWithProrationPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'tiered_with_proration';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_with_proration_config: Record<string, unknown>;

    dimensional_price_configuration?: TieredWithProrationPrice.DimensionalPriceConfiguration | null;
  }

  export namespace TieredWithProrationPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface UnitWithProrationPrice {
    id: string;

    billable_metric: UnitWithProrationPrice.BillableMetric | null;

    billing_cycle_configuration: UnitWithProrationPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: UnitWithProrationPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: UnitWithProrationPrice.InvoicingCycleConfiguration | null;

    item: UnitWithProrationPrice.Item;

    /**
     * @deprecated
     */
    maximum: UnitWithProrationPrice.Maximum | null;

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
    minimum: UnitWithProrationPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'unit_with_proration';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    unit_with_proration_config: Record<string, unknown>;

    dimensional_price_configuration?: UnitWithProrationPrice.DimensionalPriceConfiguration | null;
  }

  export namespace UnitWithProrationPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface GroupedAllocationPrice {
    id: string;

    billable_metric: GroupedAllocationPrice.BillableMetric | null;

    billing_cycle_configuration: GroupedAllocationPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: GroupedAllocationPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_allocation_config: Record<string, unknown>;

    invoicing_cycle_configuration: GroupedAllocationPrice.InvoicingCycleConfiguration | null;

    item: GroupedAllocationPrice.Item;

    /**
     * @deprecated
     */
    maximum: GroupedAllocationPrice.Maximum | null;

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
    minimum: GroupedAllocationPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'grouped_allocation';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: GroupedAllocationPrice.DimensionalPriceConfiguration | null;
  }

  export namespace GroupedAllocationPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface GroupedWithProratedMinimumPrice {
    id: string;

    billable_metric: GroupedWithProratedMinimumPrice.BillableMetric | null;

    billing_cycle_configuration: GroupedWithProratedMinimumPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: GroupedWithProratedMinimumPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_with_prorated_minimum_config: Record<string, unknown>;

    invoicing_cycle_configuration: GroupedWithProratedMinimumPrice.InvoicingCycleConfiguration | null;

    item: GroupedWithProratedMinimumPrice.Item;

    /**
     * @deprecated
     */
    maximum: GroupedWithProratedMinimumPrice.Maximum | null;

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
    minimum: GroupedWithProratedMinimumPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'grouped_with_prorated_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: GroupedWithProratedMinimumPrice.DimensionalPriceConfiguration | null;
  }

  export namespace GroupedWithProratedMinimumPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface GroupedWithMeteredMinimumPrice {
    id: string;

    billable_metric: GroupedWithMeteredMinimumPrice.BillableMetric | null;

    billing_cycle_configuration: GroupedWithMeteredMinimumPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: GroupedWithMeteredMinimumPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_with_metered_minimum_config: Record<string, unknown>;

    invoicing_cycle_configuration: GroupedWithMeteredMinimumPrice.InvoicingCycleConfiguration | null;

    item: GroupedWithMeteredMinimumPrice.Item;

    /**
     * @deprecated
     */
    maximum: GroupedWithMeteredMinimumPrice.Maximum | null;

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
    minimum: GroupedWithMeteredMinimumPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'grouped_with_metered_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: GroupedWithMeteredMinimumPrice.DimensionalPriceConfiguration | null;
  }

  export namespace GroupedWithMeteredMinimumPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface MatrixWithDisplayNamePrice {
    id: string;

    billable_metric: MatrixWithDisplayNamePrice.BillableMetric | null;

    billing_cycle_configuration: MatrixWithDisplayNamePrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: MatrixWithDisplayNamePrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: MatrixWithDisplayNamePrice.InvoicingCycleConfiguration | null;

    item: MatrixWithDisplayNamePrice.Item;

    matrix_with_display_name_config: Record<string, unknown>;

    /**
     * @deprecated
     */
    maximum: MatrixWithDisplayNamePrice.Maximum | null;

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
    minimum: MatrixWithDisplayNamePrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'matrix_with_display_name';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: MatrixWithDisplayNamePrice.DimensionalPriceConfiguration | null;
  }

  export namespace MatrixWithDisplayNamePrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface BulkWithProrationPrice {
    id: string;

    billable_metric: BulkWithProrationPrice.BillableMetric | null;

    billing_cycle_configuration: BulkWithProrationPrice.BillingCycleConfiguration;

    bulk_with_proration_config: Record<string, unknown>;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: BulkWithProrationPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: BulkWithProrationPrice.InvoicingCycleConfiguration | null;

    item: BulkWithProrationPrice.Item;

    /**
     * @deprecated
     */
    maximum: BulkWithProrationPrice.Maximum | null;

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
    minimum: BulkWithProrationPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'bulk_with_proration';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: BulkWithProrationPrice.DimensionalPriceConfiguration | null;
  }

  export namespace BulkWithProrationPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface GroupedTieredPackagePrice {
    id: string;

    billable_metric: GroupedTieredPackagePrice.BillableMetric | null;

    billing_cycle_configuration: GroupedTieredPackagePrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: GroupedTieredPackagePrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_tiered_package_config: Record<string, unknown>;

    invoicing_cycle_configuration: GroupedTieredPackagePrice.InvoicingCycleConfiguration | null;

    item: GroupedTieredPackagePrice.Item;

    /**
     * @deprecated
     */
    maximum: GroupedTieredPackagePrice.Maximum | null;

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
    minimum: GroupedTieredPackagePrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'grouped_tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: GroupedTieredPackagePrice.DimensionalPriceConfiguration | null;
  }

  export namespace GroupedTieredPackagePrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface MaxGroupTieredPackagePrice {
    id: string;

    billable_metric: MaxGroupTieredPackagePrice.BillableMetric | null;

    billing_cycle_configuration: MaxGroupTieredPackagePrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: MaxGroupTieredPackagePrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: MaxGroupTieredPackagePrice.InvoicingCycleConfiguration | null;

    item: MaxGroupTieredPackagePrice.Item;

    max_group_tiered_package_config: Record<string, unknown>;

    /**
     * @deprecated
     */
    maximum: MaxGroupTieredPackagePrice.Maximum | null;

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
    minimum: MaxGroupTieredPackagePrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'max_group_tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: MaxGroupTieredPackagePrice.DimensionalPriceConfiguration | null;
  }

  export namespace MaxGroupTieredPackagePrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface ScalableMatrixWithUnitPricingPrice {
    id: string;

    billable_metric: ScalableMatrixWithUnitPricingPrice.BillableMetric | null;

    billing_cycle_configuration: ScalableMatrixWithUnitPricingPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: ScalableMatrixWithUnitPricingPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: ScalableMatrixWithUnitPricingPrice.InvoicingCycleConfiguration | null;

    item: ScalableMatrixWithUnitPricingPrice.Item;

    /**
     * @deprecated
     */
    maximum: ScalableMatrixWithUnitPricingPrice.Maximum | null;

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
    minimum: ScalableMatrixWithUnitPricingPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'scalable_matrix_with_unit_pricing';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    scalable_matrix_with_unit_pricing_config: Record<string, unknown>;

    dimensional_price_configuration?: ScalableMatrixWithUnitPricingPrice.DimensionalPriceConfiguration | null;
  }

  export namespace ScalableMatrixWithUnitPricingPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface ScalableMatrixWithTieredPricingPrice {
    id: string;

    billable_metric: ScalableMatrixWithTieredPricingPrice.BillableMetric | null;

    billing_cycle_configuration: ScalableMatrixWithTieredPricingPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: ScalableMatrixWithTieredPricingPrice.CreditAllocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: ScalableMatrixWithTieredPricingPrice.InvoicingCycleConfiguration | null;

    item: ScalableMatrixWithTieredPricingPrice.Item;

    /**
     * @deprecated
     */
    maximum: ScalableMatrixWithTieredPricingPrice.Maximum | null;

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
    minimum: ScalableMatrixWithTieredPricingPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'scalable_matrix_with_tiered_pricing';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    scalable_matrix_with_tiered_pricing_config: Record<string, unknown>;

    dimensional_price_configuration?: ScalableMatrixWithTieredPricingPrice.DimensionalPriceConfiguration | null;
  }

  export namespace ScalableMatrixWithTieredPricingPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }

  export interface CumulativeGroupedBulkPrice {
    id: string;

    billable_metric: CumulativeGroupedBulkPrice.BillableMetric | null;

    billing_cycle_configuration: CumulativeGroupedBulkPrice.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: CumulativeGroupedBulkPrice.CreditAllocation | null;

    cumulative_grouped_bulk_config: Record<string, unknown>;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: CumulativeGroupedBulkPrice.InvoicingCycleConfiguration | null;

    item: CumulativeGroupedBulkPrice.Item;

    /**
     * @deprecated
     */
    maximum: CumulativeGroupedBulkPrice.Maximum | null;

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
    minimum: CumulativeGroupedBulkPrice.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'cumulative_grouped_bulk';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: CumulativeGroupedBulkPrice.DimensionalPriceConfiguration | null;
  }

  export namespace CumulativeGroupedBulkPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface BillingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: CreditAllocation.CustomExpiration | null;
    }

    export namespace CreditAllocation {
      export interface CustomExpiration {
        duration: number;

        duration_unit: 'day' | 'month';
      }
    }

    export interface InvoicingCycleConfiguration {
      duration: number;

      duration_unit: 'day' | 'month';
    }

    export interface Item {
      id: string;

      name: string;
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

    export interface DimensionalPriceConfiguration {
      dimension_values: Array<string>;

      dimensional_price_group_id: string;
    }
  }
}

export interface PriceEvaluateResponse {
  data: Array<EvaluatePriceGroup>;
}

export interface PriceEvaluateMultipleResponse {
  data: Array<PriceEvaluateMultipleResponse.Data>;
}

export namespace PriceEvaluateMultipleResponse {
  export interface Data {
    /**
     * The currency of the price
     */
    currency: string;

    /**
     * The computed price groups associated with input price.
     */
    price_groups: Array<PricesAPI.EvaluatePriceGroup>;

    /**
     * The index of the inline price
     */
    inline_price_index?: number | null;

    /**
     * The ID of the price
     */
    price_id?: string | null;
  }
}

export type PriceCreateParams =
  | PriceCreateParams.NewFloatingUnitPrice
  | PriceCreateParams.NewFloatingPackagePrice
  | PriceCreateParams.NewFloatingMatrixPrice
  | PriceCreateParams.NewFloatingMatrixWithAllocationPrice
  | PriceCreateParams.NewFloatingTieredPrice
  | PriceCreateParams.NewFloatingTieredBpsPrice
  | PriceCreateParams.NewFloatingBpsPrice
  | PriceCreateParams.NewFloatingBulkBpsPrice
  | PriceCreateParams.NewFloatingBulkPrice
  | PriceCreateParams.NewFloatingThresholdTotalAmountPrice
  | PriceCreateParams.NewFloatingTieredPackagePrice
  | PriceCreateParams.NewFloatingGroupedTieredPrice
  | PriceCreateParams.NewFloatingMaxGroupTieredPackagePrice
  | PriceCreateParams.NewFloatingTieredWithMinimumPrice
  | PriceCreateParams.NewFloatingPackageWithAllocationPrice
  | PriceCreateParams.NewFloatingTieredPackageWithMinimumPrice
  | PriceCreateParams.NewFloatingUnitWithPercentPrice
  | PriceCreateParams.NewFloatingTieredWithProrationPrice
  | PriceCreateParams.NewFloatingUnitWithProrationPrice
  | PriceCreateParams.NewFloatingGroupedAllocationPrice
  | PriceCreateParams.NewFloatingGroupedWithProratedMinimumPrice
  | PriceCreateParams.NewFloatingGroupedWithMeteredMinimumPrice
  | PriceCreateParams.NewFloatingMatrixWithDisplayNamePrice
  | PriceCreateParams.NewFloatingBulkWithProrationPrice
  | PriceCreateParams.NewFloatingGroupedTieredPackagePrice
  | PriceCreateParams.NewFloatingScalableMatrixWithUnitPricingPrice
  | PriceCreateParams.NewFloatingScalableMatrixWithTieredPricingPrice
  | PriceCreateParams.NewFloatingCumulativeGroupedBulkPrice;

export declare namespace PriceCreateParams {
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

    unit_config: NewFloatingUnitPrice.UnitConfig;

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
    billing_cycle_configuration?: NewFloatingUnitPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingUnitPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingUnitPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingUnitPrice {
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

    package_config: NewFloatingPackagePrice.PackageConfig;

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
    billing_cycle_configuration?: NewFloatingPackagePrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingPackagePrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingPackagePrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingPackagePrice {
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

    matrix_config: NewFloatingMatrixPrice.MatrixConfig;

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
    billing_cycle_configuration?: NewFloatingMatrixPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingMatrixPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingMatrixPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingMatrixPrice {
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

    matrix_with_allocation_config: NewFloatingMatrixWithAllocationPrice.MatrixWithAllocationConfig;

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
    billing_cycle_configuration?: NewFloatingMatrixWithAllocationPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingMatrixWithAllocationPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingMatrixWithAllocationPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingMatrixWithAllocationPrice {
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

    tiered_config: NewFloatingTieredPrice.TieredConfig;

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
    billing_cycle_configuration?: NewFloatingTieredPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingTieredPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingTieredPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingTieredPrice {
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

    tiered_bps_config: NewFloatingTieredBpsPrice.TieredBpsConfig;

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
    billing_cycle_configuration?: NewFloatingTieredBpsPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingTieredBpsPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingTieredBpsPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingTieredBpsPrice {
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

  export interface NewFloatingBpsPrice {
    bps_config: NewFloatingBpsPrice.BpsConfig;

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
    billing_cycle_configuration?: NewFloatingBpsPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingBpsPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingBpsPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingBpsPrice {
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

  export interface NewFloatingBulkBpsPrice {
    bulk_bps_config: NewFloatingBulkBpsPrice.BulkBpsConfig;

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
    billing_cycle_configuration?: NewFloatingBulkBpsPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingBulkBpsPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingBulkBpsPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingBulkBpsPrice {
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

  export interface NewFloatingBulkPrice {
    bulk_config: NewFloatingBulkPrice.BulkConfig;

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
    billing_cycle_configuration?: NewFloatingBulkPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingBulkPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingBulkPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingBulkPrice {
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
    billing_cycle_configuration?: NewFloatingThresholdTotalAmountPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingThresholdTotalAmountPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingThresholdTotalAmountPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingThresholdTotalAmountPrice {
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
    billing_cycle_configuration?: NewFloatingTieredPackagePrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingTieredPackagePrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingTieredPackagePrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingTieredPackagePrice {
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

  export interface NewFloatingGroupedTieredPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

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
    billing_cycle_configuration?: NewFloatingGroupedTieredPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingGroupedTieredPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingGroupedTieredPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingGroupedTieredPrice {
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
    billing_cycle_configuration?: NewFloatingMaxGroupTieredPackagePrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingMaxGroupTieredPackagePrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingMaxGroupTieredPackagePrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingMaxGroupTieredPackagePrice {
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
    billing_cycle_configuration?: NewFloatingTieredWithMinimumPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingTieredWithMinimumPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingTieredWithMinimumPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingTieredWithMinimumPrice {
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
    billing_cycle_configuration?: NewFloatingPackageWithAllocationPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingPackageWithAllocationPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingPackageWithAllocationPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingPackageWithAllocationPrice {
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
    billing_cycle_configuration?: NewFloatingTieredPackageWithMinimumPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingTieredPackageWithMinimumPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingTieredPackageWithMinimumPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingTieredPackageWithMinimumPrice {
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
    billing_cycle_configuration?: NewFloatingUnitWithPercentPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingUnitWithPercentPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingUnitWithPercentPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingUnitWithPercentPrice {
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
    billing_cycle_configuration?: NewFloatingTieredWithProrationPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingTieredWithProrationPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingTieredWithProrationPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingTieredWithProrationPrice {
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
    billing_cycle_configuration?: NewFloatingUnitWithProrationPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingUnitWithProrationPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingUnitWithProrationPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingUnitWithProrationPrice {
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

  export interface NewFloatingGroupedAllocationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

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
    billing_cycle_configuration?: NewFloatingGroupedAllocationPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingGroupedAllocationPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingGroupedAllocationPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingGroupedAllocationPrice {
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

  export interface NewFloatingGroupedWithProratedMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

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
    billing_cycle_configuration?: NewFloatingGroupedWithProratedMinimumPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingGroupedWithProratedMinimumPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingGroupedWithProratedMinimumPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingGroupedWithProratedMinimumPrice {
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

  export interface NewFloatingGroupedWithMeteredMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

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
    billing_cycle_configuration?: NewFloatingGroupedWithMeteredMinimumPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingGroupedWithMeteredMinimumPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingGroupedWithMeteredMinimumPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingGroupedWithMeteredMinimumPrice {
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
    billing_cycle_configuration?: NewFloatingMatrixWithDisplayNamePrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingMatrixWithDisplayNamePrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingMatrixWithDisplayNamePrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingMatrixWithDisplayNamePrice {
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

  export interface NewFloatingBulkWithProrationPrice {
    bulk_with_proration_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewFloatingBulkWithProrationPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingBulkWithProrationPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingBulkWithProrationPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingBulkWithProrationPrice {
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

  export interface NewFloatingGroupedTieredPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

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
    billing_cycle_configuration?: NewFloatingGroupedTieredPackagePrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingGroupedTieredPackagePrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingGroupedTieredPackagePrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingGroupedTieredPackagePrice {
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
    billing_cycle_configuration?: NewFloatingScalableMatrixWithUnitPricingPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingScalableMatrixWithUnitPricingPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingScalableMatrixWithUnitPricingPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingScalableMatrixWithUnitPricingPrice {
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
    billing_cycle_configuration?: NewFloatingScalableMatrixWithTieredPricingPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingScalableMatrixWithTieredPricingPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingScalableMatrixWithTieredPricingPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingScalableMatrixWithTieredPricingPrice {
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

  export interface NewFloatingCumulativeGroupedBulkPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    cumulative_grouped_bulk_config: Record<string, unknown>;

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
    billing_cycle_configuration?: NewFloatingCumulativeGroupedBulkPrice.BillingCycleConfiguration | null;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * For dimensional price: specifies a price group and dimension values
     */
    dimensional_price_configuration?: NewFloatingCumulativeGroupedBulkPrice.DimensionalPriceConfiguration | null;

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
    invoicing_cycle_configuration?: NewFloatingCumulativeGroupedBulkPrice.InvoicingCycleConfiguration | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export namespace NewFloatingCumulativeGroupedBulkPrice {
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

export interface PriceUpdateParams {
  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface PriceListParams extends PageParams {}

export interface PriceEvaluateParams {
  /**
   * The exclusive upper bound for event timestamps
   */
  timeframe_end: string;

  /**
   * The inclusive lower bound for event timestamps
   */
  timeframe_start: string;

  /**
   * The ID of the customer to which this evaluation is scoped.
   */
  customer_id?: string | null;

  /**
   * The external customer ID of the customer to which this evaluation is scoped.
   */
  external_customer_id?: string | null;

  /**
   * A boolean
   * [computed property](/extensibility/advanced-metrics#computed-properties) used to
   * filter the underlying billable metric
   */
  filter?: string | null;

  /**
   * Properties (or
   * [computed properties](/extensibility/advanced-metrics#computed-properties)) used
   * to group the underlying billable metric
   */
  grouping_keys?: Array<string>;
}

export interface PriceEvaluateMultipleParams {
  /**
   * The exclusive upper bound for event timestamps
   */
  timeframe_end: string;

  /**
   * The inclusive lower bound for event timestamps
   */
  timeframe_start: string;

  /**
   * The ID of the customer to which this evaluation is scoped.
   */
  customer_id?: string | null;

  /**
   * Optional list of preview events to use instead of actual usage data (max 500)
   */
  events?: Array<PriceEvaluateMultipleParams.Event> | null;

  /**
   * The external customer ID of the customer to which this evaluation is scoped.
   */
  external_customer_id?: string | null;

  /**
   * List of prices to evaluate (max 100)
   */
  price_evaluations?: Array<PriceEvaluateMultipleParams.PriceEvaluation>;
}

export namespace PriceEvaluateMultipleParams {
  export interface Event {
    /**
     * A name to meaningfully identify the action or event type.
     */
    event_name: string;

    /**
     * A dictionary of custom properties. Values in this dictionary must be numeric,
     * boolean, or strings. Nested dictionaries are disallowed.
     */
    properties: Record<string, unknown>;

    /**
     * An ISO 8601 format date with no timezone offset (i.e. UTC). This should
     * represent the time that usage was recorded, and is particularly important to
     * attribute usage to a given billing period.
     */
    timestamp: string;

    /**
     * The Orb Customer identifier
     */
    customer_id?: string | null;

    /**
     * An alias for the Orb customer, whose mapping is specified when creating the
     * customer
     */
    external_customer_id?: string | null;
  }

  export interface PriceEvaluation {
    /**
     * A boolean
     * [computed property](/extensibility/advanced-metrics#computed-properties) used to
     * filter the underlying billable metric
     */
    filter?: string | null;

    /**
     * Properties (or
     * [computed properties](/extensibility/advanced-metrics#computed-properties)) used
     * to group the underlying billable metric
     */
    grouping_keys?: Array<string>;

    /**
     * An inline price definition to evaluate, allowing you to test price
     * configurations before adding them to Orb.
     */
    price?:
      | PriceEvaluation.NewFloatingUnitPrice
      | PriceEvaluation.NewFloatingPackagePrice
      | PriceEvaluation.NewFloatingMatrixPrice
      | PriceEvaluation.NewFloatingMatrixWithAllocationPrice
      | PriceEvaluation.NewFloatingTieredPrice
      | PriceEvaluation.NewFloatingTieredBpsPrice
      | PriceEvaluation.NewFloatingBpsPrice
      | PriceEvaluation.NewFloatingBulkBpsPrice
      | PriceEvaluation.NewFloatingBulkPrice
      | PriceEvaluation.NewFloatingThresholdTotalAmountPrice
      | PriceEvaluation.NewFloatingTieredPackagePrice
      | PriceEvaluation.NewFloatingGroupedTieredPrice
      | PriceEvaluation.NewFloatingMaxGroupTieredPackagePrice
      | PriceEvaluation.NewFloatingTieredWithMinimumPrice
      | PriceEvaluation.NewFloatingPackageWithAllocationPrice
      | PriceEvaluation.NewFloatingTieredPackageWithMinimumPrice
      | PriceEvaluation.NewFloatingUnitWithPercentPrice
      | PriceEvaluation.NewFloatingTieredWithProrationPrice
      | PriceEvaluation.NewFloatingUnitWithProrationPrice
      | PriceEvaluation.NewFloatingGroupedAllocationPrice
      | PriceEvaluation.NewFloatingGroupedWithProratedMinimumPrice
      | PriceEvaluation.NewFloatingGroupedWithMeteredMinimumPrice
      | PriceEvaluation.NewFloatingMatrixWithDisplayNamePrice
      | PriceEvaluation.NewFloatingBulkWithProrationPrice
      | PriceEvaluation.NewFloatingGroupedTieredPackagePrice
      | PriceEvaluation.NewFloatingScalableMatrixWithUnitPricingPrice
      | PriceEvaluation.NewFloatingScalableMatrixWithTieredPricingPrice
      | PriceEvaluation.NewFloatingCumulativeGroupedBulkPrice
      | null;

    /**
     * The ID of a price to evaluate that exists in your Orb account.
     */
    price_id?: string | null;
  }

  export namespace PriceEvaluation {
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

      unit_config: NewFloatingUnitPrice.UnitConfig;

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
      billing_cycle_configuration?: NewFloatingUnitPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingUnitPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingUnitPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingUnitPrice {
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

      package_config: NewFloatingPackagePrice.PackageConfig;

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
      billing_cycle_configuration?: NewFloatingPackagePrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingPackagePrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingPackagePrice {
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

      matrix_config: NewFloatingMatrixPrice.MatrixConfig;

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
      billing_cycle_configuration?: NewFloatingMatrixPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingMatrixPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingMatrixPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingMatrixPrice {
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

      matrix_with_allocation_config: NewFloatingMatrixWithAllocationPrice.MatrixWithAllocationConfig;

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
      billing_cycle_configuration?: NewFloatingMatrixWithAllocationPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingMatrixWithAllocationPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingMatrixWithAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingMatrixWithAllocationPrice {
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

      tiered_config: NewFloatingTieredPrice.TieredConfig;

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
      billing_cycle_configuration?: NewFloatingTieredPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingTieredPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingTieredPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingTieredPrice {
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

      tiered_bps_config: NewFloatingTieredBpsPrice.TieredBpsConfig;

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
      billing_cycle_configuration?: NewFloatingTieredBpsPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingTieredBpsPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingTieredBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingTieredBpsPrice {
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

    export interface NewFloatingBpsPrice {
      bps_config: NewFloatingBpsPrice.BpsConfig;

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
      billing_cycle_configuration?: NewFloatingBpsPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingBpsPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingBpsPrice {
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

    export interface NewFloatingBulkBpsPrice {
      bulk_bps_config: NewFloatingBulkBpsPrice.BulkBpsConfig;

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
      billing_cycle_configuration?: NewFloatingBulkBpsPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingBulkBpsPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingBulkBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingBulkBpsPrice {
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

    export interface NewFloatingBulkPrice {
      bulk_config: NewFloatingBulkPrice.BulkConfig;

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
      billing_cycle_configuration?: NewFloatingBulkPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingBulkPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingBulkPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingBulkPrice {
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
      billing_cycle_configuration?: NewFloatingThresholdTotalAmountPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingThresholdTotalAmountPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingThresholdTotalAmountPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingThresholdTotalAmountPrice {
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
      billing_cycle_configuration?: NewFloatingTieredPackagePrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingTieredPackagePrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingTieredPackagePrice {
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

    export interface NewFloatingGroupedTieredPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

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
      billing_cycle_configuration?: NewFloatingGroupedTieredPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingGroupedTieredPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingGroupedTieredPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingGroupedTieredPrice {
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
      billing_cycle_configuration?: NewFloatingMaxGroupTieredPackagePrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingMaxGroupTieredPackagePrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingMaxGroupTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingMaxGroupTieredPackagePrice {
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
      billing_cycle_configuration?: NewFloatingTieredWithMinimumPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingTieredWithMinimumPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingTieredWithMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingTieredWithMinimumPrice {
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
      billing_cycle_configuration?: NewFloatingPackageWithAllocationPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingPackageWithAllocationPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingPackageWithAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingPackageWithAllocationPrice {
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
      billing_cycle_configuration?: NewFloatingTieredPackageWithMinimumPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingTieredPackageWithMinimumPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingTieredPackageWithMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingTieredPackageWithMinimumPrice {
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
      billing_cycle_configuration?: NewFloatingUnitWithPercentPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingUnitWithPercentPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingUnitWithPercentPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingUnitWithPercentPrice {
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
      billing_cycle_configuration?: NewFloatingTieredWithProrationPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingTieredWithProrationPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingTieredWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingTieredWithProrationPrice {
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
      billing_cycle_configuration?: NewFloatingUnitWithProrationPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingUnitWithProrationPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingUnitWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingUnitWithProrationPrice {
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

    export interface NewFloatingGroupedAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

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
      billing_cycle_configuration?: NewFloatingGroupedAllocationPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingGroupedAllocationPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingGroupedAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingGroupedAllocationPrice {
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

    export interface NewFloatingGroupedWithProratedMinimumPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

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
      billing_cycle_configuration?: NewFloatingGroupedWithProratedMinimumPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingGroupedWithProratedMinimumPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingGroupedWithProratedMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingGroupedWithProratedMinimumPrice {
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

    export interface NewFloatingGroupedWithMeteredMinimumPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

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
      billing_cycle_configuration?: NewFloatingGroupedWithMeteredMinimumPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingGroupedWithMeteredMinimumPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingGroupedWithMeteredMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingGroupedWithMeteredMinimumPrice {
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
      billing_cycle_configuration?: NewFloatingMatrixWithDisplayNamePrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingMatrixWithDisplayNamePrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingMatrixWithDisplayNamePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingMatrixWithDisplayNamePrice {
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

    export interface NewFloatingBulkWithProrationPrice {
      bulk_with_proration_config: Record<string, unknown>;

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
      billing_cycle_configuration?: NewFloatingBulkWithProrationPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingBulkWithProrationPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingBulkWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingBulkWithProrationPrice {
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

    export interface NewFloatingGroupedTieredPackagePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

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
      billing_cycle_configuration?: NewFloatingGroupedTieredPackagePrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingGroupedTieredPackagePrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingGroupedTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingGroupedTieredPackagePrice {
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
      billing_cycle_configuration?: NewFloatingScalableMatrixWithUnitPricingPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingScalableMatrixWithUnitPricingPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingScalableMatrixWithUnitPricingPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingScalableMatrixWithUnitPricingPrice {
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
      billing_cycle_configuration?: NewFloatingScalableMatrixWithTieredPricingPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingScalableMatrixWithTieredPricingPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingScalableMatrixWithTieredPricingPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingScalableMatrixWithTieredPricingPrice {
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

    export interface NewFloatingCumulativeGroupedBulkPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      cumulative_grouped_bulk_config: Record<string, unknown>;

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
      billing_cycle_configuration?: NewFloatingCumulativeGroupedBulkPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

      /**
       * For dimensional price: specifies a price group and dimension values
       */
      dimensional_price_configuration?: NewFloatingCumulativeGroupedBulkPrice.DimensionalPriceConfiguration | null;

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
      invoicing_cycle_configuration?: NewFloatingCumulativeGroupedBulkPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingCumulativeGroupedBulkPrice {
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

Prices.PricesPage = PricesPage;
Prices.ExternalPriceID = ExternalPriceID;

export declare namespace Prices {
  export {
    type EvaluatePriceGroup as EvaluatePriceGroup,
    type Price as Price,
    type PriceEvaluateResponse as PriceEvaluateResponse,
    type PriceEvaluateMultipleResponse as PriceEvaluateMultipleResponse,
    PricesPage as PricesPage,
    type PriceCreateParams as PriceCreateParams,
    type PriceUpdateParams as PriceUpdateParams,
    type PriceListParams as PriceListParams,
    type PriceEvaluateParams as PriceEvaluateParams,
    type PriceEvaluateMultipleParams as PriceEvaluateMultipleParams,
  };

  export {
    ExternalPriceID as ExternalPriceID,
    type ExternalPriceIDUpdateParams as ExternalPriceIDUpdateParams,
  };
}
