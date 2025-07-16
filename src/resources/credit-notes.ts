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
   *
   * The credit note service period configuration supports two explicit modes:
   *
   * 1. Global service periods: Specify start_date and end_date at the credit note
   *    level. These dates will be applied to all line items uniformly.
   *
   * 2. Individual service periods: Specify start_date and end_date for each line
   *    item. When using this mode, ALL line items must have individual periods
   *    specified.
   *
   * 3. Default behavior: If no service periods are specified (neither global nor
   *    individual), the original invoice line item service periods will be used.
   *
   * Note: Mixing global and individual service periods in the same request is not
   * allowed to prevent confusion.
   *
   * Service period dates are normalized to the start of the day in the customer's
   * timezone to ensure consistent handling across different timezones.
   *
   * Date Format: Use start_date and end_date with format "YYYY-MM-DD" (e.g.,
   * "2023-09-22") to match other Orb APIs like /v1/invoice_line_items.
   *
   * Note: Both start_date and end_date are inclusive - the service period will cover
   * both the start date and end date completely (from start of start_date to end of
   * end_date).
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
   * An optional date string to specify the global credit note service period end
   * date in the customer's timezone. This will be applied to all line items. If not
   * provided, line items will use their original invoice line item service periods.
   * This date is inclusive.
   */
  end_date?: string | null;

  /**
   * An optional memo to attach to the credit note.
   */
  memo?: string | null;

  /**
   * An optional date string to specify the global credit note service period end
   * date in the customer's timezone. This will be applied to all line items. If not
   * provided, line items will use their original invoice line item service periods.
   * This date is inclusive.
   */
  start_date?: string | null;
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

    /**
     * An optional date string to specify this line item's credit note service period
     * end date in the customer's timezone. If provided, this will be used for this
     * specific line item. If not provided, will use the global end_date if available,
     * otherwise defaults to the original invoice line item's end date. This date is
     * inclusive.
     */
    end_date?: string | null;

    /**
     * An optional date string to specify this line item's credit note service period
     * start date in the customer's timezone. If provided, this will be used for this
     * specific line item. If not provided, will use the global start_date if
     * available, otherwise defaults to the original invoice line item's start date.
     * This date is inclusive.
     */
    start_date?: string | null;
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
