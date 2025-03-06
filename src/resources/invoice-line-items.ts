// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';
import * as PricesAPI from './prices/prices';

export class InvoiceLineItems extends APIResource {
  /**
   * This creates a one-off fixed fee invoice line item on an Invoice. This can only
   * be done for invoices that are in a `draft` status.
   */
  create(
    body: InvoiceLineItemCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InvoiceLineItemCreateResponse> {
    return this._client.post('/invoice_line_items', { body, ...options });
  }
}

export interface InvoiceLineItemCreateResponse {
  /**
   * A unique ID for this line item.
   */
  id: string;

  /**
   * The line amount after any adjustments and before overage conversion, credits and
   * partial invoicing.
   */
  adjusted_subtotal: string;

  /**
   * All adjustments applied to the line item in the order they were applied based on
   * invoice calculations (ie. usage discounts -> amount discounts -> percentage
   * discounts -> minimums -> maximums).
   */
  adjustments: Array<
    | InvoiceLineItemCreateResponse.MonetaryUsageDiscountAdjustment
    | InvoiceLineItemCreateResponse.MonetaryAmountDiscountAdjustment
    | InvoiceLineItemCreateResponse.MonetaryPercentageDiscountAdjustment
    | InvoiceLineItemCreateResponse.MonetaryMinimumAdjustment
    | InvoiceLineItemCreateResponse.MonetaryMaximumAdjustment
  >;

  /**
   * The final amount for a line item after all adjustments and pre paid credits have
   * been applied.
   */
  amount: string;

  /**
   * The number of prepaid credits applied.
   */
  credits_applied: string;

  discount: Shared.Discount | null;

  /**
   * The end date of the range of time applied for this line item's price.
   */
  end_date: string;

  /**
   * An additional filter that was used to calculate the usage for this line item.
   */
  filter: string | null;

  /**
   * [DEPRECATED] For configured prices that are split by a grouping key, this will
   * be populated with the key and a value. The `amount` and `subtotal` will be the
   * values for this particular grouping.
   */
  grouping: string | null;

  /**
   * @deprecated This field is deprecated in favor of `adjustments`.
   */
  maximum: InvoiceLineItemCreateResponse.Maximum | null;

  /**
   * @deprecated This field is deprecated in favor of `adjustments`.
   */
  maximum_amount: string | null;

  /**
   * @deprecated This field is deprecated in favor of `adjustments`.
   */
  minimum: InvoiceLineItemCreateResponse.Minimum | null;

  /**
   * @deprecated This field is deprecated in favor of `adjustments`.
   */
  minimum_amount: string | null;

  /**
   * The name of the price associated with this line item.
   */
  name: string;

  /**
   * Any amount applied from a partial invoice
   */
  partially_invoiced_amount: string;

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
  price: PricesAPI.Price | null;

  /**
   * Either the fixed fee quantity or the usage during the service period.
   */
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
   * The line amount before before any adjustments.
   */
  subtotal: string;

  /**
   * An array of tax rates and their incurred tax amounts. Empty if no tax
   * integration is configured.
   */
  tax_amounts: Array<InvoiceLineItemCreateResponse.TaxAmount>;

  /**
   * A list of customer ids that were used to calculate the usage for this line item.
   */
  usage_customer_ids: Array<string> | null;
}

export namespace InvoiceLineItemCreateResponse {
  export interface MonetaryUsageDiscountAdjustment {
    id: string;

    adjustment_type: 'usage_discount';

    /**
     * The value applied by an adjustment.
     */
    amount: string;

    /**
     * The price IDs that this adjustment applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * True for adjustments that apply to an entire invocice, false for adjustments
     * that apply to only one price.
     */
    is_invoice_level: boolean;

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

  export interface MonetaryAmountDiscountAdjustment {
    id: string;

    adjustment_type: 'amount_discount';

    /**
     * The value applied by an adjustment.
     */
    amount: string;

    /**
     * The amount by which to discount the prices this adjustment applies to in a given
     * billing period.
     */
    amount_discount: string;

    /**
     * The price IDs that this adjustment applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * True for adjustments that apply to an entire invocice, false for adjustments
     * that apply to only one price.
     */
    is_invoice_level: boolean;

    /**
     * The reason for the adjustment.
     */
    reason: string | null;
  }

  export interface MonetaryPercentageDiscountAdjustment {
    id: string;

    adjustment_type: 'percentage_discount';

    /**
     * The value applied by an adjustment.
     */
    amount: string;

    /**
     * The price IDs that this adjustment applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The reason for the adjustment.
     */
    reason: string | null;
  }

  export interface MonetaryMinimumAdjustment {
    id: string;

    adjustment_type: 'minimum';

    /**
     * The value applied by an adjustment.
     */
    amount: string;

    /**
     * The price IDs that this adjustment applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The reason for the adjustment.
     */
    reason: string | null;
  }

  export interface MonetaryMaximumAdjustment {
    id: string;

    adjustment_type: 'maximum';

    /**
     * The value applied by an adjustment.
     */
    amount: string;

    /**
     * The price IDs that this adjustment applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The reason for the adjustment.
     */
    reason: string | null;
  }

  /**
   * @deprecated This field is deprecated in favor of `adjustments`.
   */
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

  /**
   * @deprecated This field is deprecated in favor of `adjustments`.
   */
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

export declare namespace InvoiceLineItems {
  export {
    type InvoiceLineItemCreateResponse as InvoiceLineItemCreateResponse,
    type InvoiceLineItemCreateParams as InvoiceLineItemCreateParams,
  };
}
