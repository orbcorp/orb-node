// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { Page, type PageParams } from '../../pagination';

export class BalanceTransactions extends APIResource {
  /**
   * Creates an immutable balance transaction that updates the customer's balance and
   * returns back the newly created transaction.
   */
  create(
    customerId: string,
    body: BalanceTransactionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BalanceTransactionCreateResponse> {
    return this._client.post(`/customers/${customerId}/balance_transactions`, { body, ...options });
  }

  /**
   * ## The customer balance
   *
   * The customer balance is an amount in the customer's currency, which Orb
   * automatically applies to subsequent invoices. This balance can be adjusted
   * manually via Orb's webapp on the customer details page. You can use this balance
   * to provide a fixed mid-period credit to the customer. Commonly, this is done due
   * to system downtime/SLA violation, or an adhoc adjustment discussed with the
   * customer.
   *
   * If the balance is a positive value at the time of invoicing, it represents that
   * the customer has credit that should be used to offset the amount due on the next
   * issued invoice. In this case, Orb will automatically reduce the next invoice by
   * the balance amount, and roll over any remaining balance if the invoice is fully
   * discounted.
   *
   * If the balance is a negative value at the time of invoicing, Orb will increase
   * the invoice's amount due with a positive adjustment, and reset the balance to 0.
   *
   * This endpoint retrieves all customer balance transactions in reverse
   * chronological order for a single customer, providing a complete audit trail of
   * all adjustments and invoice applications.
   *
   * ## Eligibility
   *
   * The customer balance can only be applied to invoices or adjusted manually if
   * invoices are not synced to a separate invoicing provider. If a payment gateway
   * such as Stripe is used, the balance will be applied to the invoice before
   * forwarding payment to the gateway.
   */
  list(
    customerId: string,
    query?: BalanceTransactionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalanceTransactionListResponsesPage, BalanceTransactionListResponse>;
  list(
    customerId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalanceTransactionListResponsesPage, BalanceTransactionListResponse>;
  list(
    customerId: string,
    query: BalanceTransactionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalanceTransactionListResponsesPage, BalanceTransactionListResponse> {
    if (isRequestOptions(query)) {
      return this.list(customerId, {}, query);
    }
    return this._client.getAPIList(
      `/customers/${customerId}/balance_transactions`,
      BalanceTransactionListResponsesPage,
      { query, ...options },
    );
  }
}

export class BalanceTransactionListResponsesPage extends Page<BalanceTransactionListResponse> {}

export interface BalanceTransactionCreateResponse {
  /**
   * A unique id for this transaction.
   */
  id: string;

  action:
    | 'applied_to_invoice'
    | 'manual_adjustment'
    | 'prorated_refund'
    | 'revert_prorated_refund'
    | 'return_from_voiding'
    | 'credit_note_applied'
    | 'credit_note_voided'
    | 'overpayment_refund'
    | 'external_payment';

  /**
   * The value of the amount changed in the transaction.
   */
  amount: string;

  /**
   * The creation time of this transaction.
   */
  created_at: string;

  credit_note: BalanceTransactionCreateResponse.CreditNote | null;

  /**
   * An optional description provided for manual customer balance adjustments.
   */
  description: string | null;

  /**
   * The new value of the customer's balance prior to the transaction, in the
   * customer's currency.
   */
  ending_balance: string;

  invoice: BalanceTransactionCreateResponse.Invoice | null;

  /**
   * The original value of the customer's balance prior to the transaction, in the
   * customer's currency.
   */
  starting_balance: string;

  type: 'increment' | 'decrement';
}

export namespace BalanceTransactionCreateResponse {
  export interface CreditNote {
    /**
     * The id of the Credit note
     */
    id: string;
  }

  export interface Invoice {
    /**
     * The Invoice id
     */
    id: string;
  }
}

export interface BalanceTransactionListResponse {
  /**
   * A unique id for this transaction.
   */
  id: string;

  action:
    | 'applied_to_invoice'
    | 'manual_adjustment'
    | 'prorated_refund'
    | 'revert_prorated_refund'
    | 'return_from_voiding'
    | 'credit_note_applied'
    | 'credit_note_voided'
    | 'overpayment_refund'
    | 'external_payment';

  /**
   * The value of the amount changed in the transaction.
   */
  amount: string;

  /**
   * The creation time of this transaction.
   */
  created_at: string;

  credit_note: BalanceTransactionListResponse.CreditNote | null;

  /**
   * An optional description provided for manual customer balance adjustments.
   */
  description: string | null;

  /**
   * The new value of the customer's balance prior to the transaction, in the
   * customer's currency.
   */
  ending_balance: string;

  invoice: BalanceTransactionListResponse.Invoice | null;

  /**
   * The original value of the customer's balance prior to the transaction, in the
   * customer's currency.
   */
  starting_balance: string;

  type: 'increment' | 'decrement';
}

export namespace BalanceTransactionListResponse {
  export interface CreditNote {
    /**
     * The id of the Credit note
     */
    id: string;
  }

  export interface Invoice {
    /**
     * The Invoice id
     */
    id: string;
  }
}

export interface BalanceTransactionCreateParams {
  amount: string;

  type: 'increment' | 'decrement';

  /**
   * An optional description that can be specified around this entry.
   */
  description?: string | null;
}

export interface BalanceTransactionListParams extends PageParams {
  'operation_time[gt]'?: string | null;

  'operation_time[gte]'?: string | null;

  'operation_time[lt]'?: string | null;

  'operation_time[lte]'?: string | null;
}

BalanceTransactions.BalanceTransactionListResponsesPage = BalanceTransactionListResponsesPage;

export declare namespace BalanceTransactions {
  export {
    type BalanceTransactionCreateResponse as BalanceTransactionCreateResponse,
    type BalanceTransactionListResponse as BalanceTransactionListResponse,
    BalanceTransactionListResponsesPage as BalanceTransactionListResponsesPage,
    type BalanceTransactionCreateParams as BalanceTransactionCreateParams,
    type BalanceTransactionListParams as BalanceTransactionListParams,
  };
}
