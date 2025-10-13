// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as PricesAPI from './prices';
import * as Shared from '../shared';
import { PricesPage } from '../shared';
import * as ExternalPriceIDAPI from './external-price-id';
import { ExternalPriceID, ExternalPriceIDUpdateParams } from './external-price-id';
import { type PageParams } from '../../pagination';

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
  create(body: PriceCreateParams, options?: Core.RequestOptions): Core.APIPromise<Shared.Price> {
    return this._client.post('/prices', { body, ...options });
  }

  /**
   * This endpoint allows you to update the `metadata` property on a price. If you
   * pass null for the metadata value, it will clear any existing metadata for that
   * price.
   */
  update(
    priceId: string,
    body: PriceUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.Price> {
    return this._client.put(`/prices/${priceId}`, { body, ...options });
  }

  /**
   * This endpoint is used to list all add-on prices created using the
   * [price creation endpoint](/api-reference/price/create-price).
   */
  list(query?: PriceListParams, options?: Core.RequestOptions): Core.PagePromise<PricesPage, Shared.Price>;
  list(options?: Core.RequestOptions): Core.PagePromise<PricesPage, Shared.Price>;
  list(
    query: PriceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<PricesPage, Shared.Price> {
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
   * and time range over ingested events. It enables filtering and grouping the
   * output using
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
   * Prices may either reference existing prices in your Orb account or be defined
   * inline in the request body. Up to 100 prices can be evaluated in a single
   * request.
   *
   * Prices are evaluated on ingested events and the start of the time range must be
   * no more than 100 days ago. To evaluate based off a set of provided events, the
   * [evaluate preview events](/api-reference/price/evaluate-preview-events) endpoint
   * can be used instead.
   *
   * Note that this is a POST endpoint rather than a GET endpoint because it employs
   * a JSON body rather than query parameters.
   */
  evaluateMultiple(
    body: PriceEvaluateMultipleParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PriceEvaluateMultipleResponse> {
    return this._client.post('/prices/evaluate', { body, ...options });
  }

  /**
   * This endpoint evaluates prices on preview events instead of actual usage, making
   * it ideal for building price calculators and cost estimation tools. You can
   * filter and group results using
   * [computed properties](/extensibility/advanced-metrics#computed-properties) to
   * analyze pricing across different dimensions.
   *
   * Prices may either reference existing prices in your Orb account or be defined
   * inline in the request body. The endpoint has the following limitations:
   *
   * 1. Up to 100 prices can be evaluated in a single request.
   * 2. Up to 500 preview events can be provided in a single request.
   *
   * A top-level customer_id is required to evaluate the preview events.
   * Additionally, all events without a customer_id will have the top-level
   * customer_id added.
   *
   * Note that this is a POST endpoint rather than a GET endpoint because it employs
   * a JSON body rather than query parameters.
   */
  evaluatePreviewEvents(
    body: PriceEvaluatePreviewEventsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PriceEvaluatePreviewEventsResponse> {
    return this._client.post('/prices/evaluate_preview_events', { body, ...options });
  }

  /**
   * This endpoint returns a price given an identifier.
   */
  fetch(priceId: string, options?: Core.RequestOptions): Core.APIPromise<Shared.Price> {
    return this._client.get(`/prices/${priceId}`, options);
  }
}

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
     * The external ID of the price
     */
    external_price_id?: string | null;

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

export interface PriceEvaluatePreviewEventsResponse {
  data: Array<PriceEvaluatePreviewEventsResponse.Data>;
}

export namespace PriceEvaluatePreviewEventsResponse {
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
     * The external ID of the price
     */
    external_price_id?: string | null;

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
  | PriceCreateParams.NewFloatingTieredPrice
  | PriceCreateParams.NewFloatingBulkPrice
  | PriceCreateParams.NewFloatingBulkWithFiltersPrice
  | PriceCreateParams.NewFloatingPackagePrice
  | PriceCreateParams.NewFloatingMatrixPrice
  | PriceCreateParams.NewFloatingThresholdTotalAmountPrice
  | PriceCreateParams.NewFloatingTieredPackagePrice
  | PriceCreateParams.NewFloatingTieredWithMinimumPrice
  | PriceCreateParams.NewFloatingGroupedTieredPrice
  | PriceCreateParams.NewFloatingTieredPackageWithMinimumPrice
  | PriceCreateParams.NewFloatingPackageWithAllocationPrice
  | PriceCreateParams.NewFloatingUnitWithPercentPrice
  | PriceCreateParams.NewFloatingMatrixWithAllocationPrice
  | PriceCreateParams.NewFloatingTieredWithProrationPrice
  | PriceCreateParams.NewFloatingUnitWithProrationPrice
  | PriceCreateParams.NewFloatingGroupedAllocationPrice
  | PriceCreateParams.NewFloatingBulkWithProrationPrice
  | PriceCreateParams.NewFloatingGroupedWithProratedMinimumPrice
  | PriceCreateParams.NewFloatingGroupedWithMeteredMinimumPrice
  | PriceCreateParams.NewFloatingGroupedWithMinMaxThresholdsPrice
  | PriceCreateParams.NewFloatingMatrixWithDisplayNamePrice
  | PriceCreateParams.NewFloatingGroupedTieredPackagePrice
  | PriceCreateParams.NewFloatingMaxGroupTieredPackagePrice
  | PriceCreateParams.NewFloatingScalableMatrixWithUnitPricingPrice
  | PriceCreateParams.NewFloatingScalableMatrixWithTieredPricingPrice
  | PriceCreateParams.NewFloatingCumulativeGroupedBulkPrice
  | PriceCreateParams.NewFloatingMinimumCompositePrice
  | PriceCreateParams.NewFloatingPercentCompositePrice
  | PriceCreateParams.NewFloatingEventOutputPrice;

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
  }

  export interface NewFloatingBulkPrice {
    /**
     * Configuration for bulk pricing
     */
    bulk_config: Shared.BulkConfig;

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
  }

  export interface NewFloatingBulkWithFiltersPrice {
    /**
     * Configuration for bulk_with_filters pricing
     */
    bulk_with_filters_config: NewFloatingBulkWithFiltersPrice.BulkWithFiltersConfig;

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
  }

  export namespace NewFloatingBulkWithFiltersPrice {
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
    threshold_total_amount_config: NewFloatingThresholdTotalAmountPrice.ThresholdTotalAmountConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

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
  }

  export namespace NewFloatingThresholdTotalAmountPrice {
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
        /**
         * Quantity threshold
         */
        threshold: string;

        /**
         * Total amount for this threshold
         */
        total_amount: string;
      }
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
    tiered_package_config: NewFloatingTieredPackagePrice.TieredPackageConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

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
  }

  export namespace NewFloatingTieredPackagePrice {
    /**
     * Configuration for tiered_package pricing
     */
    export interface TieredPackageConfig {
      /**
       * Package size
       */
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

        /**
         * Tier lower bound
         */
        tier_lower_bound: string;
      }
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
    tiered_with_minimum_config: NewFloatingTieredWithMinimumPrice.TieredWithMinimumConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

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
  }

  export namespace NewFloatingTieredWithMinimumPrice {
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
        /**
         * Minimum amount
         */
        minimum_amount: string;

        /**
         * Tier lower bound
         */
        tier_lower_bound: string;

        /**
         * Per unit amount
         */
        unit_amount: string;
      }
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

    /**
     * Configuration for grouped_tiered pricing
     */
    grouped_tiered_config: NewFloatingGroupedTieredPrice.GroupedTieredConfig;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

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
  }

  export namespace NewFloatingGroupedTieredPrice {
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
        /**
         * Tier lower bound
         */
        tier_lower_bound: string;

        /**
         * Per unit amount
         */
        unit_amount: string;
      }
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
    tiered_package_with_minimum_config: NewFloatingTieredPackageWithMinimumPrice.TieredPackageWithMinimumConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

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
  }

  export namespace NewFloatingTieredPackageWithMinimumPrice {
    /**
     * Configuration for tiered_package_with_minimum pricing
     */
    export interface TieredPackageWithMinimumConfig {
      /**
       * Package size
       */
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
        /**
         * Minimum amount
         */
        minimum_amount: string;

        /**
         * Price per package
         */
        per_unit: string;

        /**
         * Tier lower bound
         */
        tier_lower_bound: string;
      }
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
    package_with_allocation_config: NewFloatingPackageWithAllocationPrice.PackageWithAllocationConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

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
  }

  export namespace NewFloatingPackageWithAllocationPrice {
    /**
     * Configuration for package_with_allocation pricing
     */
    export interface PackageWithAllocationConfig {
      /**
       * Usage allocation
       */
      allocation: string;

      /**
       * Price per package
       */
      package_amount: string;

      /**
       * Package size
       */
      package_size: string;
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
    unit_with_percent_config: NewFloatingUnitWithPercentPrice.UnitWithPercentConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

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
  }

  export namespace NewFloatingUnitWithPercentPrice {
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
    tiered_with_proration_config: NewFloatingTieredWithProrationPrice.TieredWithProrationConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

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
  }

  export namespace NewFloatingTieredWithProrationPrice {
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
    unit_with_proration_config: NewFloatingUnitWithProrationPrice.UnitWithProrationConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

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
  }

  export namespace NewFloatingUnitWithProrationPrice {
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

  export interface NewFloatingGroupedAllocationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * Configuration for grouped_allocation pricing
     */
    grouped_allocation_config: NewFloatingGroupedAllocationPrice.GroupedAllocationConfig;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

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
  }

  export namespace NewFloatingGroupedAllocationPrice {
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
  }

  export interface NewFloatingBulkWithProrationPrice {
    /**
     * Configuration for bulk_with_proration pricing
     */
    bulk_with_proration_config: NewFloatingBulkWithProrationPrice.BulkWithProrationConfig;

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
  }

  export namespace NewFloatingBulkWithProrationPrice {
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

    /**
     * Configuration for grouped_with_prorated_minimum pricing
     */
    grouped_with_prorated_minimum_config: NewFloatingGroupedWithProratedMinimumPrice.GroupedWithProratedMinimumConfig;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

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
  }

  export namespace NewFloatingGroupedWithProratedMinimumPrice {
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

    /**
     * Configuration for grouped_with_metered_minimum pricing
     */
    grouped_with_metered_minimum_config: NewFloatingGroupedWithMeteredMinimumPrice.GroupedWithMeteredMinimumConfig;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

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
  }

  export namespace NewFloatingGroupedWithMeteredMinimumPrice {
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
        /**
         * Scaling factor
         */
        scaling_factor: string;

        /**
         * Scaling value
         */
        scaling_value: string;
      }

      /**
       * Configuration for a unit amount
       */
      export interface UnitAmount {
        /**
         * Pricing value
         */
        pricing_value: string;

        /**
         * Per unit amount
         */
        unit_amount: string;
      }
    }
  }

  export interface NewFloatingGroupedWithMinMaxThresholdsPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * Configuration for grouped_with_min_max_thresholds pricing
     */
    grouped_with_min_max_thresholds_config: NewFloatingGroupedWithMinMaxThresholdsPrice.GroupedWithMinMaxThresholdsConfig;

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
  }

  export namespace NewFloatingGroupedWithMinMaxThresholdsPrice {
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

    /**
     * Configuration for matrix_with_display_name pricing
     */
    matrix_with_display_name_config: NewFloatingMatrixWithDisplayNamePrice.MatrixWithDisplayNameConfig;

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
  }

  export namespace NewFloatingMatrixWithDisplayNamePrice {
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

  export interface NewFloatingGroupedTieredPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * Configuration for grouped_tiered_package pricing
     */
    grouped_tiered_package_config: NewFloatingGroupedTieredPackagePrice.GroupedTieredPackageConfig;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

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
  }

  export namespace NewFloatingGroupedTieredPackagePrice {
    /**
     * Configuration for grouped_tiered_package pricing
     */
    export interface GroupedTieredPackageConfig {
      /**
       * The event property used to group before tiering
       */
      grouping_key: string;

      /**
       * Package size
       */
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
         * Price per package
         */
        per_unit: string;

        /**
         * Tier lower bound
         */
        tier_lower_bound: string;
      }
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

    /**
     * Configuration for max_group_tiered_package pricing
     */
    max_group_tiered_package_config: NewFloatingMaxGroupTieredPackagePrice.MaxGroupTieredPackageConfig;

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
  }

  export namespace NewFloatingMaxGroupTieredPackagePrice {
    /**
     * Configuration for max_group_tiered_package pricing
     */
    export interface MaxGroupTieredPackageConfig {
      /**
       * The event property used to group before tiering the group with the highest value
       */
      grouping_key: string;

      /**
       * Package size
       */
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
        /**
         * Tier lower bound
         */
        tier_lower_bound: string;

        /**
         * Per unit amount
         */
        unit_amount: string;
      }
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
    scalable_matrix_with_unit_pricing_config: NewFloatingScalableMatrixWithUnitPricingPrice.ScalableMatrixWithUnitPricingConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

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
  }

  export namespace NewFloatingScalableMatrixWithUnitPricingPrice {
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
        /**
         * First dimension value
         */
        first_dimension_value: string;

        /**
         * Scaling factor
         */
        scaling_factor: string;

        /**
         * Second dimension value (optional)
         */
        second_dimension_value?: string | null;
      }
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
    scalable_matrix_with_tiered_pricing_config: NewFloatingScalableMatrixWithTieredPricingPrice.ScalableMatrixWithTieredPricingConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

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
  }

  export namespace NewFloatingScalableMatrixWithTieredPricingPrice {
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

      /**
       * Tier pricing structure
       */
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
        /**
         * First dimension value
         */
        first_dimension_value: string;

        /**
         * Scaling factor
         */
        scaling_factor: string;

        /**
         * Second dimension value (optional)
         */
        second_dimension_value?: string | null;
      }

      /**
       * Configuration for a single tier entry with business logic
       */
      export interface Tier {
        /**
         * Tier lower bound
         */
        tier_lower_bound: string;

        /**
         * Per unit amount
         */
        unit_amount: string;
      }
    }
  }

  export interface NewFloatingCumulativeGroupedBulkPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * Configuration for cumulative_grouped_bulk pricing
     */
    cumulative_grouped_bulk_config: NewFloatingCumulativeGroupedBulkPrice.CumulativeGroupedBulkConfig;

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the price will be associated with.
     */
    item_id: string;

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
  }

  export namespace NewFloatingCumulativeGroupedBulkPrice {
    /**
     * Configuration for cumulative_grouped_bulk pricing
     */
    export interface CumulativeGroupedBulkConfig {
      /**
       * Each tier lower bound must have the same group of values.
       */
      dimension_values: Array<CumulativeGroupedBulkConfig.DimensionValue>;

      /**
       * Grouping key name
       */
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
  }

  export interface NewFloatingMinimumCompositePrice {
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

    /**
     * Configuration for minimum pricing
     */
    minimum_config: NewFloatingMinimumCompositePrice.MinimumConfig;

    /**
     * The pricing model type
     */
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
  }

  export namespace NewFloatingMinimumCompositePrice {
    /**
     * Configuration for minimum pricing
     */
    export interface MinimumConfig {
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

  export interface NewFloatingPercentCompositePrice {
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
    percent_config: NewFloatingPercentCompositePrice.PercentConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

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
  }

  export namespace NewFloatingPercentCompositePrice {
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

  export interface NewFloatingEventOutputPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * Configuration for event_output pricing
     */
    event_output_config: NewFloatingEventOutputPrice.EventOutputConfig;

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
  }

  export namespace NewFloatingEventOutputPrice {
    /**
     * Configuration for event_output pricing
     */
    export interface EventOutputConfig {
      /**
       * The key in the event data to extract the unit rate from.
       */
      unit_rating_key: string;

      /**
       * An optional key in the event data to group by (e.g., event ID). All events will
       * also be grouped by their unit rate.
       */
      grouping_key?: string | null;
    }
  }
}

export interface PriceUpdateParams {
  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: { [key: string]: string | null } | null;
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
   * The external customer ID of the customer to which this evaluation is scoped.
   */
  external_customer_id?: string | null;

  /**
   * List of prices to evaluate (max 100)
   */
  price_evaluations?: Array<PriceEvaluateMultipleParams.PriceEvaluation>;
}

export namespace PriceEvaluateMultipleParams {
  export interface PriceEvaluation {
    /**
     * The external ID of a price to evaluate that exists in your Orb account.
     */
    external_price_id?: string | null;

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
     * New floating price request body params.
     */
    price?:
      | Shared.NewFloatingUnitPrice
      | Shared.NewFloatingTieredPrice
      | Shared.NewFloatingBulkPrice
      | PriceEvaluation.NewFloatingBulkWithFiltersPrice
      | Shared.NewFloatingPackagePrice
      | Shared.NewFloatingMatrixPrice
      | Shared.NewFloatingThresholdTotalAmountPrice
      | Shared.NewFloatingTieredPackagePrice
      | Shared.NewFloatingTieredWithMinimumPrice
      | Shared.NewFloatingGroupedTieredPrice
      | Shared.NewFloatingTieredPackageWithMinimumPrice
      | Shared.NewFloatingPackageWithAllocationPrice
      | Shared.NewFloatingUnitWithPercentPrice
      | Shared.NewFloatingMatrixWithAllocationPrice
      | Shared.NewFloatingTieredWithProrationPrice
      | Shared.NewFloatingUnitWithProrationPrice
      | Shared.NewFloatingGroupedAllocationPrice
      | Shared.NewFloatingBulkWithProrationPrice
      | Shared.NewFloatingGroupedWithProratedMinimumPrice
      | Shared.NewFloatingGroupedWithMeteredMinimumPrice
      | PriceEvaluation.NewFloatingGroupedWithMinMaxThresholdsPrice
      | Shared.NewFloatingMatrixWithDisplayNamePrice
      | Shared.NewFloatingGroupedTieredPackagePrice
      | Shared.NewFloatingMaxGroupTieredPackagePrice
      | Shared.NewFloatingScalableMatrixWithUnitPricingPrice
      | Shared.NewFloatingScalableMatrixWithTieredPricingPrice
      | Shared.NewFloatingCumulativeGroupedBulkPrice
      | Shared.NewFloatingMinimumCompositePrice
      | PriceEvaluation.NewFloatingPercentCompositePrice
      | PriceEvaluation.NewFloatingEventOutputPrice
      | null;

    /**
     * The ID of a price to evaluate that exists in your Orb account.
     */
    price_id?: string | null;
  }

  export namespace PriceEvaluation {
    export interface NewFloatingBulkWithFiltersPrice {
      /**
       * Configuration for bulk_with_filters pricing
       */
      bulk_with_filters_config: NewFloatingBulkWithFiltersPrice.BulkWithFiltersConfig;

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
    }

    export namespace NewFloatingBulkWithFiltersPrice {
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

    export interface NewFloatingGroupedWithMinMaxThresholdsPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * Configuration for grouped_with_min_max_thresholds pricing
       */
      grouped_with_min_max_thresholds_config: NewFloatingGroupedWithMinMaxThresholdsPrice.GroupedWithMinMaxThresholdsConfig;

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
    }

    export namespace NewFloatingGroupedWithMinMaxThresholdsPrice {
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

    export interface NewFloatingPercentCompositePrice {
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
      percent_config: NewFloatingPercentCompositePrice.PercentConfig;

      /**
       * The id of the billable metric for the price. Only needed if the price is
       * usage-based.
       */
      billable_metric_id?: string | null;

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
    }

    export namespace NewFloatingPercentCompositePrice {
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

    export interface NewFloatingEventOutputPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * Configuration for event_output pricing
       */
      event_output_config: NewFloatingEventOutputPrice.EventOutputConfig;

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
    }

    export namespace NewFloatingEventOutputPrice {
      /**
       * Configuration for event_output pricing
       */
      export interface EventOutputConfig {
        /**
         * The key in the event data to extract the unit rate from.
         */
        unit_rating_key: string;

        /**
         * An optional key in the event data to group by (e.g., event ID). All events will
         * also be grouped by their unit rate.
         */
        grouping_key?: string | null;
      }
    }
  }
}

export interface PriceEvaluatePreviewEventsParams {
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
   * List of preview events to use instead of actual usage data
   */
  events?: Array<PriceEvaluatePreviewEventsParams.Event>;

  /**
   * The external customer ID of the customer to which this evaluation is scoped.
   */
  external_customer_id?: string | null;

  /**
   * List of prices to evaluate (max 100)
   */
  price_evaluations?: Array<PriceEvaluatePreviewEventsParams.PriceEvaluation>;
}

export namespace PriceEvaluatePreviewEventsParams {
  export interface Event {
    /**
     * A name to meaningfully identify the action or event type.
     */
    event_name: string;

    /**
     * A dictionary of custom properties. Values in this dictionary must be numeric,
     * boolean, or strings. Nested dictionaries are disallowed.
     */
    properties: { [key: string]: unknown };

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
     * The external ID of a price to evaluate that exists in your Orb account.
     */
    external_price_id?: string | null;

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
     * New floating price request body params.
     */
    price?:
      | Shared.NewFloatingUnitPrice
      | Shared.NewFloatingTieredPrice
      | Shared.NewFloatingBulkPrice
      | PriceEvaluation.NewFloatingBulkWithFiltersPrice
      | Shared.NewFloatingPackagePrice
      | Shared.NewFloatingMatrixPrice
      | Shared.NewFloatingThresholdTotalAmountPrice
      | Shared.NewFloatingTieredPackagePrice
      | Shared.NewFloatingTieredWithMinimumPrice
      | Shared.NewFloatingGroupedTieredPrice
      | Shared.NewFloatingTieredPackageWithMinimumPrice
      | Shared.NewFloatingPackageWithAllocationPrice
      | Shared.NewFloatingUnitWithPercentPrice
      | Shared.NewFloatingMatrixWithAllocationPrice
      | Shared.NewFloatingTieredWithProrationPrice
      | Shared.NewFloatingUnitWithProrationPrice
      | Shared.NewFloatingGroupedAllocationPrice
      | Shared.NewFloatingBulkWithProrationPrice
      | Shared.NewFloatingGroupedWithProratedMinimumPrice
      | Shared.NewFloatingGroupedWithMeteredMinimumPrice
      | PriceEvaluation.NewFloatingGroupedWithMinMaxThresholdsPrice
      | Shared.NewFloatingMatrixWithDisplayNamePrice
      | Shared.NewFloatingGroupedTieredPackagePrice
      | Shared.NewFloatingMaxGroupTieredPackagePrice
      | Shared.NewFloatingScalableMatrixWithUnitPricingPrice
      | Shared.NewFloatingScalableMatrixWithTieredPricingPrice
      | Shared.NewFloatingCumulativeGroupedBulkPrice
      | Shared.NewFloatingMinimumCompositePrice
      | PriceEvaluation.NewFloatingPercentCompositePrice
      | PriceEvaluation.NewFloatingEventOutputPrice
      | null;

    /**
     * The ID of a price to evaluate that exists in your Orb account.
     */
    price_id?: string | null;
  }

  export namespace PriceEvaluation {
    export interface NewFloatingBulkWithFiltersPrice {
      /**
       * Configuration for bulk_with_filters pricing
       */
      bulk_with_filters_config: NewFloatingBulkWithFiltersPrice.BulkWithFiltersConfig;

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
    }

    export namespace NewFloatingBulkWithFiltersPrice {
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

    export interface NewFloatingGroupedWithMinMaxThresholdsPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * Configuration for grouped_with_min_max_thresholds pricing
       */
      grouped_with_min_max_thresholds_config: NewFloatingGroupedWithMinMaxThresholdsPrice.GroupedWithMinMaxThresholdsConfig;

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
    }

    export namespace NewFloatingGroupedWithMinMaxThresholdsPrice {
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

    export interface NewFloatingPercentCompositePrice {
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
      percent_config: NewFloatingPercentCompositePrice.PercentConfig;

      /**
       * The id of the billable metric for the price. Only needed if the price is
       * usage-based.
       */
      billable_metric_id?: string | null;

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
    }

    export namespace NewFloatingPercentCompositePrice {
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

    export interface NewFloatingEventOutputPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * Configuration for event_output pricing
       */
      event_output_config: NewFloatingEventOutputPrice.EventOutputConfig;

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
    }

    export namespace NewFloatingEventOutputPrice {
      /**
       * Configuration for event_output pricing
       */
      export interface EventOutputConfig {
        /**
         * The key in the event data to extract the unit rate from.
         */
        unit_rating_key: string;

        /**
         * An optional key in the event data to group by (e.g., event ID). All events will
         * also be grouped by their unit rate.
         */
        grouping_key?: string | null;
      }
    }
  }
}

Prices.ExternalPriceID = ExternalPriceID;

export declare namespace Prices {
  export {
    type EvaluatePriceGroup as EvaluatePriceGroup,
    type PriceEvaluateResponse as PriceEvaluateResponse,
    type PriceEvaluateMultipleResponse as PriceEvaluateMultipleResponse,
    type PriceEvaluatePreviewEventsResponse as PriceEvaluatePreviewEventsResponse,
    type PriceCreateParams as PriceCreateParams,
    type PriceUpdateParams as PriceUpdateParams,
    type PriceListParams as PriceListParams,
    type PriceEvaluateParams as PriceEvaluateParams,
    type PriceEvaluateMultipleParams as PriceEvaluateMultipleParams,
    type PriceEvaluatePreviewEventsParams as PriceEvaluatePreviewEventsParams,
  };

  export {
    ExternalPriceID as ExternalPriceID,
    type ExternalPriceIDUpdateParams as ExternalPriceIDUpdateParams,
  };
}

export { PricesPage };
