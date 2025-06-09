// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as Shared from './shared';
import { CreditNotesPage } from './shared';
import { type PageParams } from '../pagination';

export class CreditNotes extends APIResource {
  /**
   * This endpoint is used to create a single
   * [`Credit Note`](/invoicing/credit-notes).
   */
  create(body: CreditNoteCreateParams, options?: Core.RequestOptions): Core.APIPromise<Shared.CreditNote> {
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
  ): Core.PagePromise<CreditNotesPage, Shared.CreditNote>;
  list(options?: Core.RequestOptions): Core.PagePromise<CreditNotesPage, Shared.CreditNote>;
  list(
    query: CreditNoteListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditNotesPage, Shared.CreditNote> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/credit_notes', CreditNotesPage, { query, ...options });
  }

  /**
   * This endpoint is used to fetch a single [`Credit Note`](/invoicing/credit-notes)
   * given an identifier.
   */
  fetch(creditNoteId: string, options?: Core.RequestOptions): Core.APIPromise<Shared.CreditNote> {
    return this._client.get(`/credit_notes/${creditNoteId}`, options);
  }
}

export interface CreditNoteCreateParams {
  line_items: Array<CreditNoteCreateParams.LineItem>;

  /**
   * An optional reason for the credit note.
   */
  reason: 'duplicate' | 'fraudulent' | 'order_change' | 'product_unsatisfactory';

  /**
   * An optional memo to attach to the credit note.
   */
  memo?: string | null;
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

export interface CreditNoteListParams extends PageParams {
  'created_at[gt]'?: string | null;

  'created_at[gte]'?: string | null;

  'created_at[lt]'?: string | null;

  'created_at[lte]'?: string | null;
}

export declare namespace CreditNotes {
  export {
    type CreditNoteCreateParams as CreditNoteCreateParams,
    type CreditNoteListParams as CreditNoteListParams,
  };
}

export { CreditNotesPage };
