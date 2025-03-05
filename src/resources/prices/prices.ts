// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as Shared from '../shared';
import { PriceModelsPage } from '../shared';
import * as ExternalPriceIDAPI from './external-price-id';
import { ExternalPriceID, ExternalPriceIDUpdateParams } from './external-price-id';
import { type PageParams } from '../../pagination';

export class Prices extends APIResource {
  externalPriceId: ExternalPriceIDAPI.ExternalPriceID = new ExternalPriceIDAPI.ExternalPriceID(this._client);

  /**
   * This endpoint is used to create a [price](/product-catalog/price-configuration).
   * A price created using this endpoint is always an add-on, meaning that it’s not
   * associated with a specific plan and can instead be individually added to
   * subscriptions, including subscriptions on different plans.
   *
   * An `external_price_id` can be optionally specified as an alias to allow
   * ergonomic interaction with prices in the Orb API.
   *
   * See the [Price resource](/product-catalog/price-configuration) for the
   * specification of different price model configurations possible in this endpoint.
   */
  create(body: PriceCreateParams, options?: Core.RequestOptions): Core.APIPromise<Shared.PriceModel> {
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
  ): Core.APIPromise<Shared.PriceModel> {
    return this._client.put(`/prices/${priceId}`, { body, ...options });
  }

  /**
   * This endpoint is used to list all add-on prices created using the
   * [price creation endpoint](/api-reference/price/create-price).
   */
  list(
    query?: PriceListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<PriceModelsPage, Shared.PriceModel>;
  list(options?: Core.RequestOptions): Core.PagePromise<PriceModelsPage, Shared.PriceModel>;
  list(
    query: PriceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<PriceModelsPage, Shared.PriceModel> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/prices', PriceModelsPage, { query, ...options });
  }

  /**
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
   * This endpoint returns a price given an identifier.
   */
  fetch(priceId: string, options?: Core.RequestOptions): Core.APIPromise<Shared.PriceModel> {
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

export interface PriceEvaluateResponse {
  data: Array<EvaluatePriceGroup>;
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

Prices.ExternalPriceID = ExternalPriceID;

export declare namespace Prices {
  export {
    type EvaluatePriceGroup as EvaluatePriceGroup,
    type Price as Price,
    type PriceEvaluateResponse as PriceEvaluateResponse,
    type PriceCreateParams as PriceCreateParams,
    type PriceUpdateParams as PriceUpdateParams,
    type PriceListParams as PriceListParams,
    type PriceEvaluateParams as PriceEvaluateParams,
  };

  export {
    ExternalPriceID as ExternalPriceID,
    type ExternalPriceIDUpdateParams as ExternalPriceIDUpdateParams,
  };
}

export { PriceModelsPage };
