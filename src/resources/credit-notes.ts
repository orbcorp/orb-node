// File generated from our OpenAPI spec by Stainless.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import { isRequestOptions } from 'orb-billing/core';
import * as CreditNotesAPI from 'orb-billing/resources/credit-notes';
import { Page, type PageParams } from 'orb-billing/pagination';

export class CreditNotes extends APIResource {
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
    return this.getAPIList('/credit_notes', CreditNotesPage, { query, ...options });
  }

  /**
   * This endpoint is used to fetch a single
   * [`Credit Note`](../guides/invoicing/credit-notes) given an identifier.
   */
  fetch(creditNoteId: string, options?: Core.RequestOptions): Core.APIPromise<CreditNote> {
    return this.get(`/credit_notes/${creditNoteId}`, options);
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
   * Any discounts applied on the original invoice.
   */
  discounts: Array<unknown>;

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
  maximum_amount_adjustment: unknown | null;

  /**
   * An optional memo supplied on the credit note.
   */
  memo: string | null;

  /**
   * Any credited amount from the applied minimum on the invoice.
   */
  minimum_amount_refunded: string | null;

  reason: 'Duplicate' | 'Fraudulent' | 'Order change' | 'Product unsatisfactory';

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
     * Any line items discounts from the invoice's line item.
     */
    discounts: Array<unknown>;

    /**
     * The name of the corresponding invoice line item.
     */
    name: string;

    /**
     * An optional quantity credited.
     */
    quantity: number | null;

    /**
     * Any sub line items that may be credited.
     */
    sub_line_items: Array<LineItem.SubLineItem>;

    /**
     * The amount of the line item, excluding any line item minimums and discounts.
     */
    subtotal: string;

    /**
     * Any tax amounts applied onto the line item.
     */
    tax_amounts: Array<unknown>;
  }

  export namespace LineItem {
    export interface SubLineItem {
      amount: string;

      name: string;

      quantity: number | null;
    }
  }
}

export interface CreditNoteListParams extends PageParams {}

export namespace CreditNotes {
  export import CreditNote = CreditNotesAPI.CreditNote;
  export import CreditNotesPage = CreditNotesAPI.CreditNotesPage;
  export import CreditNoteListParams = CreditNotesAPI.CreditNoteListParams;
}
