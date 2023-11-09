// File generated from our OpenAPI spec by Stainless.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import { isRequestOptions } from 'orb-billing/core';
import * as PricesAPI from 'orb-billing/resources/prices/prices';
import * as Shared from 'orb-billing/resources/shared';
import * as ExternalPriceIDAPI from 'orb-billing/resources/prices/external-price-id';
import { Page, type PageParams } from 'orb-billing/pagination';

export class Prices extends APIResource {
  externalPriceId: ExternalPriceIDAPI.ExternalPriceID = new ExternalPriceIDAPI.ExternalPriceID(this.client);

  /**
   * This endpoint is used to create a [price](../reference/price). A price created
   * using this endpoint is always an add-on, meaning that it’s not associated with a
   * specific plan and can instead be individually added to subscriptions, including
   * subscriptions on different plans.
   *
   * An `external_price_id` can be optionally specified as an alias to allow
   * ergonomic interaction with prices in the Orb API.
   *
   * See the [Price resource](../reference/price) for the specification of different
   * price model configurations possible in this endpoint.
   */
  create(body: PriceCreateParams, options?: Core.RequestOptions): Core.APIPromise<Price> {
    return this.post('/prices', { body, ...options });
  }

  /**
   * This endpoint is used to list all add-on prices created using the
   * [price creation endpoint](../reference/create-price).
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
    return this.getAPIList('/prices', PricesPage, { query, ...options });
  }

  /**
   * This endpoint returns a price given an identifier.
   */
  fetch(priceId: string, options?: Core.RequestOptions): Core.APIPromise<Price> {
    return this.get(`/prices/${priceId}`, options);
  }
}

export class PricesPage extends Page<Price> {}

/**
 * The Price resource represents a price that can be billed on a subscription,
 * resulting in a charge on an invoice in the form of an invoice line item. Prices
 * take a quantity and determine an amount to bill.
 *
 * Orb supports a few different pricing models out of the box. Each of these models
 * is serialized differently in a given Price object. The model_type field
 * determines the key for the configuration object that is present.
 *
 * ## Unit pricing
 *
 * With unit pricing, each unit costs a fixed amount.
 *
 * ```json
 * {
 *     ...
 *     "model_type": "unit",
 *     "unit_config": {
 *         "unit_amount": "0.50"
 *     }
 *     ...
 * }
 * ```
 *
 * ## Tiered pricing
 *
 * In tiered pricing, the cost of a given unit depends on the tier range that it
 * falls into, where each tier range is defined by an upper and lower bound. For
 * example, the first ten units may cost $0.50 each and all units thereafter may
 * cost $0.10 each.
 *
 * ```json
 * {
 *     ...
 *     "model_type": "tiered",
 *     "tiered_config": {
 *         "tiers": [
 *             {
 *                 "first_unit": 1,
 *                 "last_unit": 10,
 *                 "unit_amount": "0.50"
 *             },
 *             {
 *                 "first_unit": 11,
 *                 "last_unit": null,
 *                 "unit_amount": "0.10"
 *             }
 *         ]
 *     }
 *     ...
 * ```
 *
 * ## Bulk pricing
 *
 * Bulk pricing applies when the number of units determine the cost of all units.
 * For example, if you've bought less than 10 units, they may each be $0.50 for a
 * total of $5.00. Once you've bought more than 10 units, all units may now be
 * priced at $0.40 (i.e. 101 units total would be $40.40).
 *
 * ```json
 * {
 *     ...
 *     "model_type": "bulk",
 *     "bulk_config": {
 *         "tiers": [
 *             {
 *                 "maximum_units": 10,
 *                 "unit_amount": "0.50"
 *             },
 *             {
 *                 "maximum_units": 1000,
 *                 "unit_amount": "0.40"
 *             }
 *         ]
 *     }
 *     ...
 * }
 * ```
 *
 * ## Package pricing
 *
 * Package pricing defines the size or granularity of a unit for billing purposes.
 * For example, if the package size is set to 5, then 4 units will be billed as 5
 * and 6 units will be billed at 10.
 *
 * ```json
 * {
 *     ...
 *     "model_type": "package",
 *     "package_config": {
 *         "package_amount": "0.80",
 *         "package_size": 10
 *     }
 *     ...
 * }
 * ```
 *
 * ## BPS pricing
 *
 * BPS pricing specifies a per-event (e.g. per-payment) rate in one hundredth of a
 * percent (the number of basis points to charge), as well as a cap per event to
 * assess. For example, this would allow you to assess a fee of 0.25% on every
 * payment you process, with a maximum charge of $25 per payment.
 *
 * ```json
 * {
 *     ...
 *     "model_type": "bps",
 *     "bps_config": {
 *        "bps": 125,
 *        "per_unit_maximum": "11.00"
 *     }
 *     ...
 *  }
 * ```
 *
 * ## Bulk BPS pricing
 *
 * Bulk BPS pricing specifies BPS parameters in a tiered manner, dependent on the
 * total quantity across all events. Similar to bulk pricing, the BPS parameters of
 * a given event depends on the tier range that the billing period falls into. Each
 * tier range is defined by an upper bound. For example, after $1.5M of payment
 * volume is reached, each individual payment may have a lower cap or a smaller
 * take-rate.
 *
 * ```json
 *     ...
 *     "model_type": "bulk_bps",
 *     "bulk_bps_config": {
 *         "tiers": [
 *            {
 *                 "maximum_amount": "1000000.00",
 *                 "bps": 125,
 *                 "per_unit_maximum": "19.00"
 *            },
 *           {
 *                 "maximum_amount": null,
 *                 "bps": 115,
 *                 "per_unit_maximum": "4.00"
 *             }
 *         ]
 *     }
 *     ...
 * }
 * ```
 *
 * ## Tiered BPS pricing
 *
 * Tiered BPS pricing specifies BPS parameters in a graduated manner, where an
 * event's applicable parameter is a function of its marginal addition to the
 * period total. Similar to tiered pricing, the BPS parameters of a given event
 * depends on the tier range that it falls into, where each tier range is defined
 * by an upper and lower bound. For example, the first few payments may have a 0.8
 * BPS take-rate and all payments after a specific volume may incur a take-rate of
 * 0.5 BPS each.
 *
 * ```json
 *     ...
 *     "model_type": "tiered_bps",
 *     "tiered_bps_config": {
 *         "tiers": [
 *            {
 *                 "minimum_amount": "0",
 *                 "maximum_amount": "1000000.00",
 *                 "bps": 125,
 *                 "per_unit_maximum": "19.00"
 *            },
 *           {
 *                 "minimum_amount": "1000000.00",
 *                 "maximum_amount": null,
 *                 "bps": 115,
 *                 "per_unit_maximum": "4.00"
 *             }
 *         ]
 *     }
 *     ...
 * }
 * ```
 *
 * ## Matrix pricing
 *
 * Matrix pricing defines a set of unit prices in a one or two-dimensional matrix.
 * `dimensions` defines the two event property values evaluated in this pricing
 * model. In a one-dimensional matrix, the second value is `null`. Every
 * configuration has a list of `matrix_values` which give the unit prices for
 * specified property values. In a one-dimensional matrix, the matrix values will
 * have `dimension_values` where the second value of the pair is null. If an event
 * does not match any of the dimension values in the matrix, it will resort to the
 * `default_unit_amount`.
 *
 * ```json
 * {
 *     "model_type": "matrix"
 *     "matrix_config": {
 *         "default_unit_amount": "3.00",
 *         "dimensions": [
 *             "cluster_name",
 *             "region"
 *         ],
 *         "matrix_values": [
 *             {
 *                 "dimension_values": [
 *                     "alpha",
 *                     "west"
 *                 ],
 *                 "unit_amount": "2.00"
 *             },
 *             ...
 *         ]
 *     }
 * }
 * ```
 *
 * ### Fixed fees
 *
 * Fixed fees are prices that are applied independent of usage quantities, and
 * follow unit pricing. They also have an additional parameter
 * `fixed_price_quantity`. If the Price represents a fixed cost, this represents
 * the quantity of units applied.
 *
 * ```json
 * {
 *     ...
 *     "id": "price_id",
 *     "model_type": "unit",
 *     "unit_config": {
 *        "unit_amount": "2.00"
 *     },
 *     "fixed_price_quantity": 3.0
 *     ...
 * }
 * ```
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
  | Price.TestRatingFunctionPrice
  | Price.FivetranExamplePrice
  | Price.ThresholdTotalAmountPrice
  | Price.TieredPackagePrice
  | Price.TieredWithMinimumPrice
  | Price.PackageWithAllocationPrice;

export namespace Price {
  export interface UnitPrice {
    id: string;

    billable_metric: UnitPrice.BillableMetric | null;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: UnitPrice.Item;

    maximum: UnitPrice.Maximum | null;

    maximum_amount: string | null;

    minimum: UnitPrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'unit';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    unit_config: UnitPrice.UnitConfig;
  }

  export namespace UnitPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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

    export interface UnitConfig {
      /**
       * Rate per unit of usage
       */
      unit_amount: string;

      /**
       * Multiplier to scale rated quantity by
       */
      scaling_factor?: number | null;
    }
  }

  export interface PackagePrice {
    id: string;

    billable_metric: PackagePrice.BillableMetric | null;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: PackagePrice.Item;

    maximum: PackagePrice.Maximum | null;

    maximum_amount: string | null;

    minimum: PackagePrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'package';

    name: string;

    package_config: PackagePrice.PackageConfig;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';
  }

  export namespace PackagePrice {
    export interface BillableMetric {
      id: string;
    }

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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

    export interface PackageConfig {
      /**
       * A currency amount to rate usage by
       */
      package_amount: string;

      /**
       * An integer amount to represent package size. For example, 1000 here would divide
       * usage by 1000 before multiplying by package_amount in rating
       */
      package_size?: number | null;
    }
  }

  export interface MatrixPrice {
    id: string;

    billable_metric: MatrixPrice.BillableMetric | null;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: MatrixPrice.Item;

    matrix_config: MatrixPrice.MatrixConfig;

    maximum: MatrixPrice.Maximum | null;

    maximum_amount: string | null;

    minimum: MatrixPrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'matrix';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';
  }

  export namespace MatrixPrice {
    export interface BillableMetric {
      id: string;
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

      /**
       * Default optional multiplier to scale rated quantities that fall into the default
       * bucket by
       */
      scaling_factor?: number | null;
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

        /**
         * Optional multiplier to scale rated quantities by
         */
        scaling_factor?: number | null;
      }
    }

    export interface Maximum {
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

    export interface Minimum {
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
  }

  export interface TieredPrice {
    id: string;

    billable_metric: TieredPrice.BillableMetric | null;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: TieredPrice.Item;

    maximum: TieredPrice.Maximum | null;

    maximum_amount: string | null;

    minimum: TieredPrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'tiered';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_config: TieredPrice.TieredConfig;
  }

  export namespace TieredPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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

    export interface TieredConfig {
      /**
       * Tiers for rating based on total usage quantities into the specified tier
       */
      tiers: Array<TieredConfig.Tier>;
    }

    export namespace TieredConfig {
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
  }

  export interface TieredBpsPrice {
    id: string;

    billable_metric: TieredBpsPrice.BillableMetric | null;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: TieredBpsPrice.Item;

    maximum: TieredBpsPrice.Maximum | null;

    maximum_amount: string | null;

    minimum: TieredBpsPrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'tiered_bps';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_bps_config: TieredBpsPrice.TieredBpsConfig;
  }

  export namespace TieredBpsPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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
  }

  export interface BpsPrice {
    id: string;

    billable_metric: BpsPrice.BillableMetric | null;

    bps_config: BpsPrice.BpsConfig;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: BpsPrice.Item;

    maximum: BpsPrice.Maximum | null;

    maximum_amount: string | null;

    minimum: BpsPrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'bps';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';
  }

  export namespace BpsPrice {
    export interface BillableMetric {
      id: string;
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

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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
  }

  export interface BulkBpsPrice {
    id: string;

    billable_metric: BulkBpsPrice.BillableMetric | null;

    bulk_bps_config: BulkBpsPrice.BulkBpsConfig;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: BulkBpsPrice.Item;

    maximum: BulkBpsPrice.Maximum | null;

    maximum_amount: string | null;

    minimum: BulkBpsPrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'bulk_bps';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';
  }

  export namespace BulkBpsPrice {
    export interface BillableMetric {
      id: string;
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

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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
  }

  export interface BulkPrice {
    id: string;

    billable_metric: BulkPrice.BillableMetric | null;

    bulk_config: BulkPrice.BulkConfig;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: BulkPrice.Item;

    maximum: BulkPrice.Maximum | null;

    maximum_amount: string | null;

    minimum: BulkPrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'bulk';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';
  }

  export namespace BulkPrice {
    export interface BillableMetric {
      id: string;
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

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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
  }

  export interface TestRatingFunctionPrice {
    id: string;

    billable_metric: TestRatingFunctionPrice.BillableMetric | null;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: TestRatingFunctionPrice.Item;

    maximum: TestRatingFunctionPrice.Maximum | null;

    maximum_amount: string | null;

    minimum: TestRatingFunctionPrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'test_rating_function';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    test_rating_function_config: Record<string, unknown>;
  }

  export namespace TestRatingFunctionPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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
  }

  export interface FivetranExamplePrice {
    id: string;

    billable_metric: FivetranExamplePrice.BillableMetric | null;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fivetran_example_config: Record<string, unknown>;

    fixed_price_quantity: number | null;

    item: FivetranExamplePrice.Item;

    maximum: FivetranExamplePrice.Maximum | null;

    maximum_amount: string | null;

    minimum: FivetranExamplePrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'fivetran_example';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';
  }

  export namespace FivetranExamplePrice {
    export interface BillableMetric {
      id: string;
    }

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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
  }

  export interface ThresholdTotalAmountPrice {
    id: string;

    billable_metric: ThresholdTotalAmountPrice.BillableMetric | null;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: ThresholdTotalAmountPrice.Item;

    maximum: ThresholdTotalAmountPrice.Maximum | null;

    maximum_amount: string | null;

    minimum: ThresholdTotalAmountPrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'threshold_total_amount';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    threshold_total_amount_config: Record<string, unknown>;
  }

  export namespace ThresholdTotalAmountPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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
  }

  export interface TieredPackagePrice {
    id: string;

    billable_metric: TieredPackagePrice.BillableMetric | null;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: TieredPackagePrice.Item;

    maximum: TieredPackagePrice.Maximum | null;

    maximum_amount: string | null;

    minimum: TieredPackagePrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_package_config: Record<string, unknown>;
  }

  export namespace TieredPackagePrice {
    export interface BillableMetric {
      id: string;
    }

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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
  }

  export interface TieredWithMinimumPrice {
    id: string;

    billable_metric: TieredWithMinimumPrice.BillableMetric | null;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: TieredWithMinimumPrice.Item;

    maximum: TieredWithMinimumPrice.Maximum | null;

    maximum_amount: string | null;

    minimum: TieredWithMinimumPrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'tiered_with_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_with_minimum_config: Record<string, unknown>;
  }

  export namespace TieredWithMinimumPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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
  }

  export interface PackageWithAllocationPrice {
    id: string;

    billable_metric: PackageWithAllocationPrice.BillableMetric | null;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'annual';

    created_at: string;

    currency: string;

    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    item: PackageWithAllocationPrice.Item;

    maximum: PackageWithAllocationPrice.Maximum | null;

    maximum_amount: string | null;

    minimum: PackageWithAllocationPrice.Minimum | null;

    minimum_amount: string | null;

    model_type: 'package_with_allocation';

    name: string;

    package_with_allocation_config: Record<string, unknown>;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';
  }

  export namespace PackageWithAllocationPrice {
    export interface BillableMetric {
      id: string;
    }

    export interface Item {
      id: string;

      name: string;
    }

    export interface Maximum {
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

    export interface Minimum {
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
  }
}

export type PriceCreateParams =
  | PriceCreateParams.NewFloatingUnitPrice
  | PriceCreateParams.NewFloatingPackagePrice
  | PriceCreateParams.NewFloatingMatrixPrice
  | PriceCreateParams.NewFloatingTieredPrice
  | PriceCreateParams.NewFloatingTieredBpsPrice
  | PriceCreateParams.NewFloatingBpsPrice
  | PriceCreateParams.NewFloatingBulkBpsPrice
  | PriceCreateParams.NewFloatingBulkPrice
  | PriceCreateParams.NewFloatingThresholdTotalAmountPrice
  | PriceCreateParams.NewFloatingTieredPackagePrice
  | PriceCreateParams.NewFloatingTieredWithMinimumPrice
  | PriceCreateParams.NewFloatingPackageWithAllocationPrice;

export namespace PriceCreateParams {
  export interface NewFloatingUnitPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'monthly' | 'quarterly' | 'one_time';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the plan will be associated with.
     */
    item_id: string;

    model_type: 'unit';

    /**
     * The name of the price.
     */
    name: string;

    unit_config: PriceCreateParams.NewFloatingUnitPrice.UnitConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;
  }

  export namespace NewFloatingUnitPrice {
    export interface UnitConfig {
      /**
       * Rate per unit of usage
       */
      unit_amount: string;

      /**
       * Multiplier to scale rated quantity by
       */
      scaling_factor?: number | null;
    }
  }

  export interface NewFloatingPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'monthly' | 'quarterly' | 'one_time';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the plan will be associated with.
     */
    item_id: string;

    model_type: 'package';

    /**
     * The name of the price.
     */
    name: string;

    package_config: PriceCreateParams.NewFloatingPackagePrice.PackageConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;
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
      package_size?: number | null;
    }
  }

  export interface NewFloatingMatrixPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'monthly' | 'quarterly' | 'one_time';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the plan will be associated with.
     */
    item_id: string;

    matrix_config: PriceCreateParams.NewFloatingMatrixPrice.MatrixConfig;

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
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;
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

      /**
       * Default optional multiplier to scale rated quantities that fall into the default
       * bucket by
       */
      scaling_factor?: number | null;
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

        /**
         * Optional multiplier to scale rated quantities by
         */
        scaling_factor?: number | null;
      }
    }
  }

  export interface NewFloatingTieredPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'monthly' | 'quarterly' | 'one_time';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the plan will be associated with.
     */
    item_id: string;

    model_type: 'tiered';

    /**
     * The name of the price.
     */
    name: string;

    tiered_config: PriceCreateParams.NewFloatingTieredPrice.TieredConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;
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
  }

  export interface NewFloatingTieredBpsPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'monthly' | 'quarterly' | 'one_time';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the plan will be associated with.
     */
    item_id: string;

    model_type: 'tiered_bps';

    /**
     * The name of the price.
     */
    name: string;

    tiered_bps_config: PriceCreateParams.NewFloatingTieredBpsPrice.TieredBpsConfig;

    /**
     * The id of the billable metric for the price. Only needed if the price is
     * usage-based.
     */
    billable_metric_id?: string | null;

    /**
     * If the Price represents a fixed cost, the price will be billed in-advance if
     * this is true, and in-arrears if this is false.
     */
    billed_in_advance?: boolean | null;

    /**
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;
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
  }

  export interface NewFloatingBpsPrice {
    bps_config: PriceCreateParams.NewFloatingBpsPrice.BpsConfig;

    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'monthly' | 'quarterly' | 'one_time';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the plan will be associated with.
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
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;
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
  }

  export interface NewFloatingBulkBpsPrice {
    bulk_bps_config: PriceCreateParams.NewFloatingBulkBpsPrice.BulkBpsConfig;

    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'monthly' | 'quarterly' | 'one_time';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the plan will be associated with.
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
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;
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
  }

  export interface NewFloatingBulkPrice {
    bulk_config: PriceCreateParams.NewFloatingBulkPrice.BulkConfig;

    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'monthly' | 'quarterly' | 'one_time';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the plan will be associated with.
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
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;
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
  }

  export interface NewFloatingThresholdTotalAmountPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'monthly' | 'quarterly' | 'one_time';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the plan will be associated with.
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
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;
  }

  export interface NewFloatingTieredPackagePrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'monthly' | 'quarterly' | 'one_time';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the plan will be associated with.
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
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;
  }

  export interface NewFloatingTieredWithMinimumPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'monthly' | 'quarterly' | 'one_time';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the plan will be associated with.
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
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;
  }

  export interface NewFloatingPackageWithAllocationPrice {
    /**
     * The cadence to bill for this price on.
     */
    cadence: 'annual' | 'monthly' | 'quarterly' | 'one_time';

    /**
     * An ISO 4217 currency string for which this price is billed in.
     */
    currency: string;

    /**
     * The id of the item the plan will be associated with.
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
     * An alias for the price.
     */
    external_price_id?: string | null;

    /**
     * If the Price represents a fixed cost, this represents the quantity of units
     * applied.
     */
    fixed_price_quantity?: number | null;

    /**
     * The property used to group this price on an invoice
     */
    invoice_grouping_key?: string | null;
  }
}

export interface PriceListParams extends PageParams {}

export namespace Prices {
  export import Price = PricesAPI.Price;
  export import PricesPage = PricesAPI.PricesPage;
  export import PriceCreateParams = PricesAPI.PriceCreateParams;
  export import PriceListParams = PricesAPI.PriceListParams;
  export import ExternalPriceID = ExternalPriceIDAPI.ExternalPriceID;
}
