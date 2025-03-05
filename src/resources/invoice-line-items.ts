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
  ): Core.APIPromise<Shared.InvoiceLineItemModel> {
    return this._client.post('/invoice_line_items', { body, ...options });
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
  export { type InvoiceLineItemCreateParams as InvoiceLineItemCreateParams };
}
