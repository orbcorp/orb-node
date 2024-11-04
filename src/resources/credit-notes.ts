// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { Page, type PageParams } from '../pagination';

export class CreditNotes extends APIResource {
  /**
   * This endpoint is used to create a single
   * [`Credit Note`](../guides/invoicing/credit-notes).
   */
  create(body: CreditNoteCreateParams, options?: Core.RequestOptions): Core.APIPromise<CreditNote> {
    return this._client.post('/credit_notes', { body, ...options });
  }

  /**
   * Get a paginated list of CreditNotes. Users can also filter by customer_id,
   * subscription_id, or external_customer_id. The credit notes will be returned in
   * reverse chronological order by `creation_time`.
   */
  list(
    query?: CreditNoteListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditNotesPage, CreditNote>;
  list(options?: Core.RequestOptions): Core.PagePromise<CreditNotesPage, CreditNote>;
  list(
    query: CreditNoteListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditNotesPage, CreditNote> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/credit_notes', CreditNotesPage, { query, ...options });
  }

  /**
   * This endpoint is used to fetch a single
   * [`Credit Note`](../guides/invoicing/credit-notes) given an identifier.
   */
  fetch(creditNoteId: string, options?: Core.RequestOptions): Core.APIPromise<CreditNote> {
    return this._client.get(`/credit_notes/${creditNoteId}`, options);
  }
}

export class CreditNotesPage extends Page<CreditNote> {}

/**
 * The [Credit Note](/guides/invoicing/credit-notes) resource represents a credit
 * that has been applied to a particular invoice.
 */
export interface CreditNote {
  /**
   * The Orb id of this credit note.
   */
  id: string;

  /**
   * The creation time of the resource in Orb.
   */
  created_at: string;

  /**
   * The unique identifier for credit notes.
   */
  credit_note_number: string;

  /**
   * A URL to a PDF of the credit note.
   */
  credit_note_pdf: string | null;

  customer: CreditNote.Customer;

  /**
   * The id of the invoice resource that this credit note is applied to.
   */
  invoice_id: string;

  /**
   * All of the line items associated with this credit note.
   */
  line_items: Array<CreditNote.LineItem>;

  /**
   * The maximum amount applied on the original invoice
   */
  maximum_amount_adjustment: CreditNote.MaximumAmountAdjustment | null;

  /**
   * An optional memo supplied on the credit note.
   */
  memo: string | null;

  /**
   * Any credited amount from the applied minimum on the invoice.
   */
  minimum_amount_refunded: string | null;

  reason: 'Duplicate' | 'Fraudulent' | 'Order change' | 'Product unsatisfactory' | null;

  /**
   * The total prior to any creditable invoice-level discounts or minimums.
   */
  subtotal: string;

  /**
   * The total including creditable invoice-level discounts or minimums, and tax.
   */
  total: string;

  type: 'refund' | 'adjustment';

  /**
   * The time at which the credit note was voided in Orb, if applicable.
   */
  voided_at: string | null;

  /**
   * Any discounts applied on the original invoice.
   */
  discounts?: Array<CreditNote.Discount>;
}

export namespace CreditNote {
  export interface Customer {
    id: string;

    external_customer_id: string | null;
  }

  export interface LineItem {
    /**
     * The Orb id of this resource.
     */
    id: string;

    /**
     * The amount of the line item, including any line item minimums and discounts.
     */
    amount: string;

    /**
     * The name of the corresponding invoice line item.
     */
    name: string;

    /**
     * An optional quantity credited.
     */
    quantity: number | null;

    /**
     * The amount of the line item, excluding any line item minimums and discounts.
     */
    subtotal: string;

    /**
     * Any tax amounts applied onto the line item.
     */
    tax_amounts: Array<LineItem.TaxAmount>;

    /**
     * Any line item discounts from the invoice's line item.
     */
    discounts?: Array<LineItem.Discount>;
  }

  export namespace LineItem {
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

    export interface Discount {
      id: string;

      amount_applied: string;

      applies_to_price_ids: Array<string>;

      discount_type: 'percentage' | 'amount';

      percentage_discount: number;

      amount_discount?: string | null;

      reason?: string | null;
    }
  }

  /**
   * The maximum amount applied on the original invoice
   */
  export interface MaximumAmountAdjustment {
    amount_applied: string;

    discount_type: 'percentage';

    percentage_discount: number;

    applies_to_prices?: Array<MaximumAmountAdjustment.AppliesToPrice> | null;

    reason?: string | null;
  }

  export namespace MaximumAmountAdjustment {
    export interface AppliesToPrice {
      id: string;

      name: string;
    }
  }

  export interface Discount {
    amount_applied: string;

    discount_type: 'percentage';

    percentage_discount: number;

    applies_to_prices?: Array<Discount.AppliesToPrice> | null;

    reason?: string | null;
  }

  export namespace Discount {
    export interface AppliesToPrice {
      id: string;

      name: string;
    }
  }
}

export interface CreditNoteCreateParams {
  line_items: Array<CreditNoteCreateParams.LineItem>;

  /**
   * An optional memo to attach to the credit note.
   */
  memo?: string | null;

  /**
   * An optional reason for the credit note.
   */
  reason?: 'duplicate' | 'fraudulent' | 'order_change' | 'product_unsatisfactory' | null;
}

export namespace CreditNoteCreateParams {
  export interface LineItem {
    /**
     * The total amount in the invoice's currency to credit this line item.
     */
    amount: string;

    /**
     * The ID of the line item to credit.
     */
    invoice_line_item_id: string;
  }
}

export interface CreditNoteListParams extends PageParams {}

CreditNotes.CreditNotesPage = CreditNotesPage;

export declare namespace CreditNotes {
  export {
    type CreditNote as CreditNote,
    CreditNotesPage as CreditNotesPage,
    type CreditNoteCreateParams as CreditNoteCreateParams,
    type CreditNoteListParams as CreditNoteListParams,
  };
}
