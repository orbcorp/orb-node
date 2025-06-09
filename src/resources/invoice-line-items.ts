// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

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
    | Shared.MonetaryUsageDiscountAdjustment
    | Shared.MonetaryAmountDiscountAdjustment
    | Shared.MonetaryPercentageDiscountAdjustment
    | Shared.MonetaryMinimumAdjustment
    | Shared.MonetaryMaximumAdjustment
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
  maximum: Shared.Maximum | null;

  /**
   * @deprecated This field is deprecated in favor of `adjustments`.
   */
  maximum_amount: string | null;

  /**
   * @deprecated This field is deprecated in favor of `adjustments`.
   */
  minimum: Shared.Minimum | null;

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
  price: Shared.Price;

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
  sub_line_items: Array<Shared.MatrixSubLineItem | Shared.TierSubLineItem | Shared.OtherSubLineItem>;

  /**
   * The line amount before before any adjustments.
   */
  subtotal: string;

  /**
   * An array of tax rates and their incurred tax amounts. Empty if no tax
   * integration is configured.
   */
  tax_amounts: Array<Shared.TaxAmount>;

  /**
   * A list of customer ids that were used to calculate the usage for this line item.
   */
  usage_customer_ids: Array<string> | null;
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
