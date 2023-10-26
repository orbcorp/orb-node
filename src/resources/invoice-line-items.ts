// File generated from our OpenAPI spec by Stainless.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import * as InvoiceLineItemsAPI from 'orb-billing/resources/invoice-line-items';
import * as Shared from 'orb-billing/resources/shared';
import * as PricesAPI from 'orb-billing/resources/prices/prices';

export class InvoiceLineItems extends APIResource {
  /**
   * This creates a one-off fixed fee invoice line item on an Invoice. This can only
   * be done for invoices that are in a `draft` status.
   */
  create(
    body: InvoiceLineItemCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InvoiceLineItemCreateResponse> {
    return this.post('/invoice_line_items', { body, ...options });
  }
}

export interface InvoiceLineItemCreateResponse {
  /**
   * A unique ID for this line item.
   */
  id: string;

  /**
   * The final amount after any discounts or minimums.
   */
  amount: string;

  discount: Shared.Discount | null;

  /**
   * The end date of the range of time applied for this line item's price.
   */
  end_date: string;

  /**
   * [DEPRECATED] For configured prices that are split by a grouping key, this will
   * be populated with the key and a value. The `amount` and `subtotal` will be the
   * values for this particular grouping.
   */
  grouping: string | null;

  maximum: InvoiceLineItemCreateResponse.Maximum | null;

  maximum_amount: string | null;

  minimum: InvoiceLineItemCreateResponse.Minimum | null;

  minimum_amount: string | null;

  /**
   * The name of the price associated with this line item.
   */
  name: string;

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
  price: PricesAPI.Price | null;

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
    | InvoiceLineItemCreateResponse.MatrixSubLineItem
    | InvoiceLineItemCreateResponse.TierSubLineItem
    | InvoiceLineItemCreateResponse.OtherSubLineItem
  >;

  /**
   * The line amount before any line item-specific discounts or minimums.
   */
  subtotal: string;

  /**
   * An array of tax rates and their incurred tax amounts. Empty if no tax
   * integration is configured.
   */
  tax_amounts: Array<InvoiceLineItemCreateResponse.TaxAmount>;
}

export namespace InvoiceLineItemCreateResponse {
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

  export interface MatrixSubLineItem {
    /**
     * The total amount for this sub line item.
     */
    amount: string;

    grouping: MatrixSubLineItem.Grouping | null;

    matrix_config: MatrixSubLineItem.MatrixConfig;

    name: string;

    quantity: number;

    type: 'matrix';
  }

  export namespace MatrixSubLineItem {
    export interface Grouping {
      key: string;

      /**
       * No value indicates the default group
       */
      value: string | null;
    }

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

    grouping: TierSubLineItem.Grouping | null;

    name: string;

    quantity: number;

    tier_config: TierSubLineItem.TierConfig;

    type: 'tier';
  }

  export namespace TierSubLineItem {
    export interface Grouping {
      key: string;

      /**
       * No value indicates the default group
       */
      value: string | null;
    }

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

    grouping: OtherSubLineItem.Grouping | null;

    name: string;

    quantity: number;

    type: "'null'";
  }

  export namespace OtherSubLineItem {
    export interface Grouping {
      key: string;

      /**
       * No value indicates the default group
       */
      value: string | null;
    }
  }

  export interface TaxAmount {
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
}

export interface InvoiceLineItemCreateParams {
  /**
   * The total amount in the invoice's currency to add to the line item.
   */
  amount: string;

  /**
   * A date string to specify the line item's end date in the customer's timezone.
   */
  end_date: string;

  /**
   * The id of the Invoice to add this line item.
   */
  invoice_id: string;

  /**
   * The item name associated with this line item. If an item with the same name
   * exists in Orb, that item will be associated with the line item.
   */
  name: string;

  /**
   * The number of units on the line item
   */
  quantity: number;

  /**
   * A date string to specify the line item's start date in the customer's timezone.
   */
  start_date: string;
}

export namespace InvoiceLineItems {
  export import InvoiceLineItemCreateResponse = InvoiceLineItemsAPI.InvoiceLineItemCreateResponse;
  export import InvoiceLineItemCreateParams = InvoiceLineItemsAPI.InvoiceLineItemCreateParams;
}
