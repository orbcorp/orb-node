// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

/**
 * The [Credit Ledger Entry resource](/product-catalog/prepurchase) models prepaid credits within Orb.
 */
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

  /**
   * This endpoint returns the credit block and its associated purchasing invoices.
   *
   * If a credit block was purchased (as opposed to being manually added), this
   * endpoint returns the invoices that were created to charge the customer for the
   * credit block. For credit blocks with payment schedules spanning multiple periods
   * (e.g., monthly payments over 12 months), multiple invoices will be returned.
   *
   * For credit blocks created by subscription allocation prices, this endpoint
   * returns the subscription invoice containing the allocation line item that
   * created the block.
   *
   * If the credit block was not purchased (e.g., manual increment), an empty
   * invoices list is returned.
   *
   * **Note: This endpoint is currently experimental and its interface may change in
   * future releases. Please contact support before building production integrations
   * against this endpoint.**
   */
  listInvoices(
    blockId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CreditBlockListInvoicesResponse> {
    return this._client.get(`/credit_blocks/${blockId}/invoices`, options);
  }
}

/**
 * The Credit Block resource models prepaid credits within Orb.
 */
export interface CreditBlockRetrieveResponse {
  id: string;

  balance: number;

  /**
   * How this credit block was created: `allocation` (a subscription's recurring
   * credit allocation), `top_up` (an automatic balance-threshold top-up), or
   * `manual` (a manual credit ledger increment, including credits voided or expired
   * off another block).
   */
  credit_block_source: 'allocation' | 'top_up' | 'manual';

  effective_date: string | null;

  expiry_date: string | null;

  filters: Array<CreditBlockRetrieveResponse.Filter>;

  maximum_initial_balance: number | null;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: { [key: string]: string };

  per_unit_cost_basis: string | null;

  status: 'active' | 'pending_payment';

  /**
   * The credit allocation that funded a block. Extends the allocation resource
   * serialized on prices with the catalog-item attribution of the funding price.
   */
  credit_allocation?: CreditBlockRetrieveResponse.CreditAllocation | null;
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

  /**
   * The credit allocation that funded a block. Extends the allocation resource
   * serialized on prices with the catalog-item attribution of the funding price.
   */
  export interface CreditAllocation {
    allows_rollover: boolean;

    currency: string;

    custom_expiration: Shared.CustomExpiration | null;

    /**
     * The ID of the catalog item this block was allocated from, derived from the
     * allocation's price.
     */
    item_id: string;

    filters?: Array<CreditAllocation.Filter>;

    license_type_id?: string | null;
  }

  export namespace CreditAllocation {
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
}

export interface CreditBlockListInvoicesResponse {
  /**
   * The Credit Block resource models prepaid credits within Orb.
   */
  block: CreditBlockListInvoicesResponse.Block;

  invoices: Array<CreditBlockListInvoicesResponse.Invoice>;
}

export namespace CreditBlockListInvoicesResponse {
  /**
   * The Credit Block resource models prepaid credits within Orb.
   */
  export interface Block {
    id: string;

    balance: number;

    /**
     * How this credit block was created: `allocation` (a subscription's recurring
     * credit allocation), `top_up` (an automatic balance-threshold top-up), or
     * `manual` (a manual credit ledger increment, including credits voided or expired
     * off another block).
     */
    credit_block_source: 'allocation' | 'top_up' | 'manual';

    effective_date: string | null;

    expiry_date: string | null;

    filters: Array<Block.Filter>;

    maximum_initial_balance: number | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: { [key: string]: string };

    per_unit_cost_basis: string | null;

    status: 'active' | 'pending_payment';

    /**
     * The credit allocation that funded a block. Extends the allocation resource
     * serialized on prices with the catalog-item attribution of the funding price.
     */
    credit_allocation?: Block.CreditAllocation | null;
  }

  export namespace Block {
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

    /**
     * The credit allocation that funded a block. Extends the allocation resource
     * serialized on prices with the catalog-item attribution of the funding price.
     */
    export interface CreditAllocation {
      allows_rollover: boolean;

      currency: string;

      custom_expiration: Shared.CustomExpiration | null;

      /**
       * The ID of the catalog item this block was allocated from, derived from the
       * allocation's price.
       */
      item_id: string;

      filters?: Array<CreditAllocation.Filter>;

      license_type_id?: string | null;
    }

    export namespace CreditAllocation {
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
  }

  export interface Invoice {
    id: string;

    customer: Shared.CustomerMinified;

    invoice_number: string;

    status: 'issued' | 'paid' | 'synced' | 'void' | 'draft';

    subscription: Shared.SubscriptionMinified | null;
  }
}

export declare namespace CreditBlocks {
  export {
    type CreditBlockRetrieveResponse as CreditBlockRetrieveResponse,
    type CreditBlockListInvoicesResponse as CreditBlockListInvoicesResponse,
  };
}
