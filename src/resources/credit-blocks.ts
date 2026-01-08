// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class CreditBlocks extends APIResource {
  /**
   * This endpoint returns a credit block identified by its block_id.
   */
  retrieve(blockId: string, options?: Core.RequestOptions): Core.APIPromise<CreditBlockRetrieveResponse> {
    return this._client.get(`/credit_blocks/${blockId}`, options);
  }

  /**
   * This endpoint deletes a credit block by its ID.
   *
   * When a credit block is deleted:
   *
   * - The block is removed from the customer's credit ledger.
   * - Any usage of the credit block is reversed, and the ledger is replayed as if
   *   the block never existed.
   * - If invoices were generated from the purchase of the credit block, they will be
   *   deleted if in draft status, voided if issued, or a credit note will be issued
   *   if the invoice is paid.
   *
   * <Note>
   * Issued invoices that had credits applied from this block will not be regenerated, but the ledger will
   * reflect the state as if credits from the deleted block were never applied.
   * </Note>
   */
  delete(blockId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/credit_blocks/${blockId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * The Credit Block resource models prepaid credits within Orb.
 */
export interface CreditBlockRetrieveResponse {
  id: string;

  balance: number;

  effective_date: string | null;

  expiry_date: string | null;

  filters: Array<CreditBlockRetrieveResponse.Filter>;

  maximum_initial_balance: number | null;

  per_unit_cost_basis: string | null;

  status: 'active' | 'pending_payment';
}

export namespace CreditBlockRetrieveResponse {
  export interface Filter {
    /**
     * The property of the price to filter on.
     */
    field: 'price_id' | 'item_id' | 'price_type' | 'currency' | 'pricing_unit_id';

    /**
     * Should prices that match the filter be included or excluded.
     */
    operator: 'includes' | 'excludes';

    /**
     * The IDs or values that match this filter.
     */
    values: Array<string>;
  }
}

export declare namespace CreditBlocks {
  export { type CreditBlockRetrieveResponse as CreditBlockRetrieveResponse };
}
