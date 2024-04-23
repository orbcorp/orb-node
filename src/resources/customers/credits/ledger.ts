// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import { isRequestOptions } from 'orb-billing/core';
import * as LedgerAPI from 'orb-billing/resources/customers/credits/ledger';
import { Page, type PageParams } from 'orb-billing/pagination';

export class Ledger extends APIResource {
  /**
   * The credits ledger provides _auditing_ functionality over Orb's credits system
   * with a list of actions that have taken place to modify a customer's credit
   * balance. This [paginated endpoint](../reference/pagination) lists these entries,
   * starting from the most recent ledger entry.
   *
   * More details on using Orb's real-time credit feature are
   * [here](../guides/product-catalog/prepurchase.md).
   *
   * There are four major types of modifications to credit balance, detailed below.
   *
   * ## Increment
   *
   * Credits (which optionally expire on a future date) can be added via the API
   * ([Add Ledger Entry](create-ledger-entry)). The ledger entry for such an action
   * will always contain the total eligible starting and ending balance for the
   * customer at the time the entry was added to the ledger.
   *
   * ## Decrement
   *
   * Deductions can occur as a result of an API call to create a ledger entry (see
   * [Add Ledger Entry](create-ledger-entry)), or automatically as a result of
   * incurring usage. Both ledger entries present the `decrement` entry type.
   *
   * As usage for a customer is reported into Orb, credits may be deducted according
   * to the customer's plan configuration. An automated deduction of this type will
   * result in a ledger entry, also with a starting and ending balance. In order to
   * provide better tracing capabilities for automatic deductions, Orb always
   * associates each automatic deduction with the `event_id` at the time of
   * ingestion, used to pinpoint _why_ credit deduction took place and to ensure that
   * credits are never deducted without an associated usage event.
   *
   * By default, Orb uses an algorithm that automatically deducts from the _soonest
   * expiring credit block_ first in order to ensure that all credits are utilized
   * appropriately. As an example, if trial credits with an expiration date of 2
   * weeks from now are present for a customer, they will be used before any
   * deductions take place from a non-expiring credit block.
   *
   * If there are multiple blocks with the same expiration date, Orb will deduct from
   * the block with the _lower cost basis_ first (e.g. trial credits with a $0 cost
   * basis before paid credits with a $5.00 cost basis).
   *
   * It's also possible for a single usage event's deduction to _span_ credit blocks.
   * In this case, Orb will deduct from the next block, ending at the credit block
   * which consists of unexpiring credits. Each of these deductions will lead to a
   * _separate_ ledger entry, one per credit block that is deducted from. By default,
   * the customer's total credit balance in Orb can be negative as a result of a
   * decrement.
   *
   * ## Expiration change
   *
   * The expiry of credits can be changed as a result of the API (See
   * [Add Ledger Entry](create-ledger-entry)). This will create a ledger entry that
   * specifies the balance as well as the initial and target expiry dates.
   *
   * Note that for this entry type, `starting_balance` will equal `ending_balance`,
   * and the `amount` represents the balance transferred. The credit block linked to
   * the ledger entry is the source credit block from which there was an expiration
   * change
   *
   * ## Credits expiry
   *
   * When a set of credits expire on pre-set expiration date, the customer's balance
   * automatically reflects this change and adds an entry to the ledger indicating
   * this event. Note that credit expiry should always happen close to a date
   * boundary in the customer's timezone.
   *
   * ## Void initiated
   *
   * Credit blocks can be voided via the API. The `amount` on this entry corresponds
   * to the number of credits that were remaining in the block at time of void.
   * `void_reason` will be populated if the void is created with a reason.
   *
   * ## Void
   *
   * When a set of credits is voided, the customer's balance automatically reflects
   * this change and adds an entry to the ledger indicating this event.
   *
   * ## Amendment
   *
   * When credits are added to a customer's balance as a result of a correction, this
   * entry will be added to the ledger to indicate the adjustment of credits.
   */
  list(
    customerId: string,
    query?: LedgerListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<LedgerListResponsesPage, LedgerListResponse>;
  list(
    customerId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<LedgerListResponsesPage, LedgerListResponse>;
  list(
    customerId: string,
    query: LedgerListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<LedgerListResponsesPage, LedgerListResponse> {
    if (isRequestOptions(query)) {
      return this.list(customerId, {}, query);
    }
    return this._client.getAPIList(`/customers/${customerId}/credits/ledger`, LedgerListResponsesPage, {
      query,
      ...options,
    });
  }

  /**
   * This endpoint allows you to create a new ledger entry for a specified customer's
   * balance. This can be used to increment balance, deduct credits, and change the
   * expiry date of existing credits.
   *
   * ## Effects of adding a ledger entry
   *
   * 1. After calling this endpoint, [Fetch Credit Balance](fetch-customer-credits)
   *    will return a credit block that represents the changes (i.e. balance changes
   *    or transfers).
   * 2. A ledger entry will be added to the credits ledger for this customer, and
   *    therefore returned in the [View Credits Ledger](fetch-customer-credits)
   *    response as well as serialized in the response to this request. In the case
   *    of deductions without a specified block, multiple ledger entries may be
   *    created if the deduction spans credit blocks.
   * 3. If `invoice_settings` is specified, an invoice will be created that reflects
   *    the cost of the credits (based on `amount` and `per_unit_cost_basis`).
   *
   * ## Adding credits
   *
   * Adding credits is done by creating an entry of type `increment`. This requires
   * the caller to specify a number of credits as well as an optional expiry date in
   * `YYYY-MM-DD` format. Orb also recommends specifying a description to assist with
   * auditing. When adding credits, the caller can also specify a cost basis
   * per-credit, to indicate how much in USD a customer paid for a single credit in a
   * block. This can later be used for revenue recognition.
   *
   * The following snippet illustrates a sample request body to increment credits
   * which will expire in January of 2022.
   *
   * ```json
   * {
   *   "entry_type": "increment",
   *   "amount": 100,
   *   "expiry_date": "2022-12-28",
   *   "per_unit_cost_basis": "0.20",
   *   "description": "Purchased 100 credits"
   * }
   * ```
   *
   * Note that by default, Orb will always first increment any _negative_ balance in
   * existing blocks before adding the remaining amount to the desired credit block.
   *
   * ### Invoicing for credits
   *
   * By default, Orb manipulates the credit ledger but does not charge for credits.
   * However, if you pass `invoice_settings` in the body of this request, Orb will
   * also generate a one-off invoice for the customer for the credits pre-purchase.
   * Note that you _must_ provide the `per_unit_cost_basis`, since the total charges
   * on the invoice are calculated by multiplying the cost basis with the number of
   * credit units added.
   *
   * ## Deducting Credits
   *
   * Orb allows you to deduct credits from a customer by creating an entry of type
   * `decrement`. Orb matches the algorithm for automatic deductions for determining
   * which credit blocks to decrement from. In the case that the deduction leads to
   * multiple ledger entries, the response from this endpoint will be the final
   * deduction. Orb also optionally allows specifying a description to assist with
   * auditing.
   *
   * The following snippet illustrates a sample request body to decrement credits.
   *
   * ```json
   * {
   *   "entry_type": "decrement",
   *   "amount": 20,
   *   "description": "Removing excess credits"
   * }
   * ```
   *
   * ## Changing credits expiry
   *
   * If you'd like to change when existing credits expire, you should create a ledger
   * entry of type `expiration_change`. For this entry, the required parameter
   * `expiry_date` identifies the _originating_ block, and the required parameter
   * `target_expiry_date` identifies when the transferred credits should now expire.
   * A new credit block will be created with expiry date `target_expiry_date`, with
   * the same cost basis data as the original credit block, if present.
   *
   * Note that the balance of the block with the given `expiry_date` must be at least
   * equal to the desired transfer amount determined by the `amount` parameter.
   *
   * The following snippet illustrates a sample request body to extend the expiration
   * date of credits by one year:
   *
   * ```json
   * {
   *   "entry_type": "expiration_change",
   *   "amount": 10,
   *   "expiry_date": "2022-12-28",
   *   "block_id": "UiUhFWeLHPrBY4Ad",
   *   "target_expiry_date": "2023-12-28",
   *   "description": "Extending credit validity"
   * }
   * ```
   *
   * ## Voiding credits
   *
   * If you'd like to void a credit block, create a ledger entry of type `void`. For
   * this entry, `block_id` is required to identify the block, and `amount` indicates
   * how many credits to void, up to the block's initial balance. Pass in a
   * `void_reason` of `refund` if the void is due to a refund.
   *
   * ## Amendment
   *
   * If you'd like to undo a decrement on a credit block, create a ledger entry of
   * type `amendment`. For this entry, `block_id` is required to identify the block
   * that was originally decremented from, and `amount` indicates how many credits to
   * return to the customer, up to the block's initial balance.
   */
  createEntry(
    customerId: string,
    body: LedgerCreateEntryParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LedgerCreateEntryResponse> {
    return this._client.post(`/customers/${customerId}/credits/ledger_entry`, { body, ...options });
  }

  /**
   * This endpoint allows you to create a new ledger entry for a specified customer's
   * balance. This can be used to increment balance, deduct credits, and change the
   * expiry date of existing credits.
   *
   * ## Effects of adding a ledger entry
   *
   * 1. After calling this endpoint, [Fetch Credit Balance](fetch-customer-credits)
   *    will return a credit block that represents the changes (i.e. balance changes
   *    or transfers).
   * 2. A ledger entry will be added to the credits ledger for this customer, and
   *    therefore returned in the [View Credits Ledger](fetch-customer-credits)
   *    response as well as serialized in the response to this request. In the case
   *    of deductions without a specified block, multiple ledger entries may be
   *    created if the deduction spans credit blocks.
   * 3. If `invoice_settings` is specified, an invoice will be created that reflects
   *    the cost of the credits (based on `amount` and `per_unit_cost_basis`).
   *
   * ## Adding credits
   *
   * Adding credits is done by creating an entry of type `increment`. This requires
   * the caller to specify a number of credits as well as an optional expiry date in
   * `YYYY-MM-DD` format. Orb also recommends specifying a description to assist with
   * auditing. When adding credits, the caller can also specify a cost basis
   * per-credit, to indicate how much in USD a customer paid for a single credit in a
   * block. This can later be used for revenue recognition.
   *
   * The following snippet illustrates a sample request body to increment credits
   * which will expire in January of 2022.
   *
   * ```json
   * {
   *   "entry_type": "increment",
   *   "amount": 100,
   *   "expiry_date": "2022-12-28",
   *   "per_unit_cost_basis": "0.20",
   *   "description": "Purchased 100 credits"
   * }
   * ```
   *
   * Note that by default, Orb will always first increment any _negative_ balance in
   * existing blocks before adding the remaining amount to the desired credit block.
   *
   * ### Invoicing for credits
   *
   * By default, Orb manipulates the credit ledger but does not charge for credits.
   * However, if you pass `invoice_settings` in the body of this request, Orb will
   * also generate a one-off invoice for the customer for the credits pre-purchase.
   * Note that you _must_ provide the `per_unit_cost_basis`, since the total charges
   * on the invoice are calculated by multiplying the cost basis with the number of
   * credit units added.
   *
   * ## Deducting Credits
   *
   * Orb allows you to deduct credits from a customer by creating an entry of type
   * `decrement`. Orb matches the algorithm for automatic deductions for determining
   * which credit blocks to decrement from. In the case that the deduction leads to
   * multiple ledger entries, the response from this endpoint will be the final
   * deduction. Orb also optionally allows specifying a description to assist with
   * auditing.
   *
   * The following snippet illustrates a sample request body to decrement credits.
   *
   * ```json
   * {
   *   "entry_type": "decrement",
   *   "amount": 20,
   *   "description": "Removing excess credits"
   * }
   * ```
   *
   * ## Changing credits expiry
   *
   * If you'd like to change when existing credits expire, you should create a ledger
   * entry of type `expiration_change`. For this entry, the required parameter
   * `expiry_date` identifies the _originating_ block, and the required parameter
   * `target_expiry_date` identifies when the transferred credits should now expire.
   * A new credit block will be created with expiry date `target_expiry_date`, with
   * the same cost basis data as the original credit block, if present.
   *
   * Note that the balance of the block with the given `expiry_date` must be at least
   * equal to the desired transfer amount determined by the `amount` parameter.
   *
   * The following snippet illustrates a sample request body to extend the expiration
   * date of credits by one year:
   *
   * ```json
   * {
   *   "entry_type": "expiration_change",
   *   "amount": 10,
   *   "expiry_date": "2022-12-28",
   *   "block_id": "UiUhFWeLHPrBY4Ad",
   *   "target_expiry_date": "2023-12-28",
   *   "description": "Extending credit validity"
   * }
   * ```
   *
   * ## Voiding credits
   *
   * If you'd like to void a credit block, create a ledger entry of type `void`. For
   * this entry, `block_id` is required to identify the block, and `amount` indicates
   * how many credits to void, up to the block's initial balance. Pass in a
   * `void_reason` of `refund` if the void is due to a refund.
   *
   * ## Amendment
   *
   * If you'd like to undo a decrement on a credit block, create a ledger entry of
   * type `amendment`. For this entry, `block_id` is required to identify the block
   * that was originally decremented from, and `amount` indicates how many credits to
   * return to the customer, up to the block's initial balance.
   */
  createEntryByExternalId(
    externalCustomerId: string,
    body: LedgerCreateEntryByExternalIDParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LedgerCreateEntryByExternalIDResponse> {
    return this._client.post(`/customers/external_customer_id/${externalCustomerId}/credits/ledger_entry`, {
      body,
      ...options,
    });
  }

  /**
   * The credits ledger provides _auditing_ functionality over Orb's credits system
   * with a list of actions that have taken place to modify a customer's credit
   * balance. This [paginated endpoint](../reference/pagination) lists these entries,
   * starting from the most recent ledger entry.
   *
   * More details on using Orb's real-time credit feature are
   * [here](../guides/product-catalog/prepurchase.md).
   *
   * There are four major types of modifications to credit balance, detailed below.
   *
   * ## Increment
   *
   * Credits (which optionally expire on a future date) can be added via the API
   * ([Add Ledger Entry](create-ledger-entry)). The ledger entry for such an action
   * will always contain the total eligible starting and ending balance for the
   * customer at the time the entry was added to the ledger.
   *
   * ## Decrement
   *
   * Deductions can occur as a result of an API call to create a ledger entry (see
   * [Add Ledger Entry](create-ledger-entry)), or automatically as a result of
   * incurring usage. Both ledger entries present the `decrement` entry type.
   *
   * As usage for a customer is reported into Orb, credits may be deducted according
   * to the customer's plan configuration. An automated deduction of this type will
   * result in a ledger entry, also with a starting and ending balance. In order to
   * provide better tracing capabilities for automatic deductions, Orb always
   * associates each automatic deduction with the `event_id` at the time of
   * ingestion, used to pinpoint _why_ credit deduction took place and to ensure that
   * credits are never deducted without an associated usage event.
   *
   * By default, Orb uses an algorithm that automatically deducts from the _soonest
   * expiring credit block_ first in order to ensure that all credits are utilized
   * appropriately. As an example, if trial credits with an expiration date of 2
   * weeks from now are present for a customer, they will be used before any
   * deductions take place from a non-expiring credit block.
   *
   * If there are multiple blocks with the same expiration date, Orb will deduct from
   * the block with the _lower cost basis_ first (e.g. trial credits with a $0 cost
   * basis before paid credits with a $5.00 cost basis).
   *
   * It's also possible for a single usage event's deduction to _span_ credit blocks.
   * In this case, Orb will deduct from the next block, ending at the credit block
   * which consists of unexpiring credits. Each of these deductions will lead to a
   * _separate_ ledger entry, one per credit block that is deducted from. By default,
   * the customer's total credit balance in Orb can be negative as a result of a
   * decrement.
   *
   * ## Expiration change
   *
   * The expiry of credits can be changed as a result of the API (See
   * [Add Ledger Entry](create-ledger-entry)). This will create a ledger entry that
   * specifies the balance as well as the initial and target expiry dates.
   *
   * Note that for this entry type, `starting_balance` will equal `ending_balance`,
   * and the `amount` represents the balance transferred. The credit block linked to
   * the ledger entry is the source credit block from which there was an expiration
   * change
   *
   * ## Credits expiry
   *
   * When a set of credits expire on pre-set expiration date, the customer's balance
   * automatically reflects this change and adds an entry to the ledger indicating
   * this event. Note that credit expiry should always happen close to a date
   * boundary in the customer's timezone.
   *
   * ## Void initiated
   *
   * Credit blocks can be voided via the API. The `amount` on this entry corresponds
   * to the number of credits that were remaining in the block at time of void.
   * `void_reason` will be populated if the void is created with a reason.
   *
   * ## Void
   *
   * When a set of credits is voided, the customer's balance automatically reflects
   * this change and adds an entry to the ledger indicating this event.
   *
   * ## Amendment
   *
   * When credits are added to a customer's balance as a result of a correction, this
   * entry will be added to the ledger to indicate the adjustment of credits.
   */
  listByExternalId(
    externalCustomerId: string,
    query?: LedgerListByExternalIDParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<LedgerListByExternalIDResponsesPage, LedgerListByExternalIDResponse>;
  listByExternalId(
    externalCustomerId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<LedgerListByExternalIDResponsesPage, LedgerListByExternalIDResponse>;
  listByExternalId(
    externalCustomerId: string,
    query: LedgerListByExternalIDParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<LedgerListByExternalIDResponsesPage, LedgerListByExternalIDResponse> {
    if (isRequestOptions(query)) {
      return this.listByExternalId(externalCustomerId, {}, query);
    }
    return this._client.getAPIList(
      `/customers/external_customer_id/${externalCustomerId}/credits/ledger`,
      LedgerListByExternalIDResponsesPage,
      { query, ...options },
    );
  }
}

export class LedgerListResponsesPage extends Page<LedgerListResponse> {}

export class LedgerListByExternalIDResponsesPage extends Page<LedgerListByExternalIDResponse> {}

/**
 * The [Credit Ledger Entry resource](/guides/product-catalog/prepurchase) models
 * prepaid credits within Orb.
 */
export type LedgerListResponse =
  | LedgerListResponse.IncrementLedgerEntry
  | LedgerListResponse.DecrementLedgerEntry
  | LedgerListResponse.ExpirationChangeLedgerEntry
  | LedgerListResponse.CreditBlockExpiryLedgerEntry
  | LedgerListResponse.VoidLedgerEntry
  | LedgerListResponse.VoidInitiatedLedgerEntry
  | LedgerListResponse.AmendmentLedgerEntry;

export namespace LedgerListResponse {
  export interface IncrementLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: IncrementLedgerEntry.CreditBlock;

    currency: string;

    customer: IncrementLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'increment';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export namespace IncrementLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface DecrementLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: DecrementLedgerEntry.CreditBlock;

    currency: string;

    customer: DecrementLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'decrement';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;

    event_id?: string | null;

    invoice_id?: string | null;

    price_id?: string | null;
  }

  export namespace DecrementLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface ExpirationChangeLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: ExpirationChangeLedgerEntry.CreditBlock;

    currency: string;

    customer: ExpirationChangeLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'expiration_change';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    new_block_expiry_date: string;

    starting_balance: number;
  }

  export namespace ExpirationChangeLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface CreditBlockExpiryLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: CreditBlockExpiryLedgerEntry.CreditBlock;

    currency: string;

    customer: CreditBlockExpiryLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'credit_block_expiry';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export namespace CreditBlockExpiryLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface VoidLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: VoidLedgerEntry.CreditBlock;

    currency: string;

    customer: VoidLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'void';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;

    void_amount: number;

    void_reason: string | null;
  }

  export namespace VoidLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface VoidInitiatedLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: VoidInitiatedLedgerEntry.CreditBlock;

    currency: string;

    customer: VoidInitiatedLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'void_initiated';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    new_block_expiry_date: string;

    starting_balance: number;

    void_amount: number;

    void_reason: string | null;
  }

  export namespace VoidInitiatedLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface AmendmentLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: AmendmentLedgerEntry.CreditBlock;

    currency: string;

    customer: AmendmentLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'amendment';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export namespace AmendmentLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }
}

/**
 * The [Credit Ledger Entry resource](/guides/product-catalog/prepurchase) models
 * prepaid credits within Orb.
 */
export type LedgerCreateEntryResponse =
  | LedgerCreateEntryResponse.IncrementLedgerEntry
  | LedgerCreateEntryResponse.DecrementLedgerEntry
  | LedgerCreateEntryResponse.ExpirationChangeLedgerEntry
  | LedgerCreateEntryResponse.CreditBlockExpiryLedgerEntry
  | LedgerCreateEntryResponse.VoidLedgerEntry
  | LedgerCreateEntryResponse.VoidInitiatedLedgerEntry
  | LedgerCreateEntryResponse.AmendmentLedgerEntry;

export namespace LedgerCreateEntryResponse {
  export interface IncrementLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: IncrementLedgerEntry.CreditBlock;

    currency: string;

    customer: IncrementLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'increment';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export namespace IncrementLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface DecrementLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: DecrementLedgerEntry.CreditBlock;

    currency: string;

    customer: DecrementLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'decrement';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;

    event_id?: string | null;

    invoice_id?: string | null;

    price_id?: string | null;
  }

  export namespace DecrementLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface ExpirationChangeLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: ExpirationChangeLedgerEntry.CreditBlock;

    currency: string;

    customer: ExpirationChangeLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'expiration_change';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    new_block_expiry_date: string;

    starting_balance: number;
  }

  export namespace ExpirationChangeLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface CreditBlockExpiryLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: CreditBlockExpiryLedgerEntry.CreditBlock;

    currency: string;

    customer: CreditBlockExpiryLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'credit_block_expiry';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export namespace CreditBlockExpiryLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface VoidLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: VoidLedgerEntry.CreditBlock;

    currency: string;

    customer: VoidLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'void';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;

    void_amount: number;

    void_reason: string | null;
  }

  export namespace VoidLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface VoidInitiatedLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: VoidInitiatedLedgerEntry.CreditBlock;

    currency: string;

    customer: VoidInitiatedLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'void_initiated';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    new_block_expiry_date: string;

    starting_balance: number;

    void_amount: number;

    void_reason: string | null;
  }

  export namespace VoidInitiatedLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface AmendmentLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: AmendmentLedgerEntry.CreditBlock;

    currency: string;

    customer: AmendmentLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'amendment';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export namespace AmendmentLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }
}

/**
 * The [Credit Ledger Entry resource](/guides/product-catalog/prepurchase) models
 * prepaid credits within Orb.
 */
export type LedgerCreateEntryByExternalIDResponse =
  | LedgerCreateEntryByExternalIDResponse.IncrementLedgerEntry
  | LedgerCreateEntryByExternalIDResponse.DecrementLedgerEntry
  | LedgerCreateEntryByExternalIDResponse.ExpirationChangeLedgerEntry
  | LedgerCreateEntryByExternalIDResponse.CreditBlockExpiryLedgerEntry
  | LedgerCreateEntryByExternalIDResponse.VoidLedgerEntry
  | LedgerCreateEntryByExternalIDResponse.VoidInitiatedLedgerEntry
  | LedgerCreateEntryByExternalIDResponse.AmendmentLedgerEntry;

export namespace LedgerCreateEntryByExternalIDResponse {
  export interface IncrementLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: IncrementLedgerEntry.CreditBlock;

    currency: string;

    customer: IncrementLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'increment';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export namespace IncrementLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface DecrementLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: DecrementLedgerEntry.CreditBlock;

    currency: string;

    customer: DecrementLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'decrement';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;

    event_id?: string | null;

    invoice_id?: string | null;

    price_id?: string | null;
  }

  export namespace DecrementLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface ExpirationChangeLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: ExpirationChangeLedgerEntry.CreditBlock;

    currency: string;

    customer: ExpirationChangeLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'expiration_change';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    new_block_expiry_date: string;

    starting_balance: number;
  }

  export namespace ExpirationChangeLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface CreditBlockExpiryLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: CreditBlockExpiryLedgerEntry.CreditBlock;

    currency: string;

    customer: CreditBlockExpiryLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'credit_block_expiry';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export namespace CreditBlockExpiryLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface VoidLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: VoidLedgerEntry.CreditBlock;

    currency: string;

    customer: VoidLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'void';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;

    void_amount: number;

    void_reason: string | null;
  }

  export namespace VoidLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface VoidInitiatedLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: VoidInitiatedLedgerEntry.CreditBlock;

    currency: string;

    customer: VoidInitiatedLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'void_initiated';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    new_block_expiry_date: string;

    starting_balance: number;

    void_amount: number;

    void_reason: string | null;
  }

  export namespace VoidInitiatedLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface AmendmentLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: AmendmentLedgerEntry.CreditBlock;

    currency: string;

    customer: AmendmentLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'amendment';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export namespace AmendmentLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }
}

/**
 * The [Credit Ledger Entry resource](/guides/product-catalog/prepurchase) models
 * prepaid credits within Orb.
 */
export type LedgerListByExternalIDResponse =
  | LedgerListByExternalIDResponse.IncrementLedgerEntry
  | LedgerListByExternalIDResponse.DecrementLedgerEntry
  | LedgerListByExternalIDResponse.ExpirationChangeLedgerEntry
  | LedgerListByExternalIDResponse.CreditBlockExpiryLedgerEntry
  | LedgerListByExternalIDResponse.VoidLedgerEntry
  | LedgerListByExternalIDResponse.VoidInitiatedLedgerEntry
  | LedgerListByExternalIDResponse.AmendmentLedgerEntry;

export namespace LedgerListByExternalIDResponse {
  export interface IncrementLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: IncrementLedgerEntry.CreditBlock;

    currency: string;

    customer: IncrementLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'increment';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export namespace IncrementLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface DecrementLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: DecrementLedgerEntry.CreditBlock;

    currency: string;

    customer: DecrementLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'decrement';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;

    event_id?: string | null;

    invoice_id?: string | null;

    price_id?: string | null;
  }

  export namespace DecrementLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface ExpirationChangeLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: ExpirationChangeLedgerEntry.CreditBlock;

    currency: string;

    customer: ExpirationChangeLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'expiration_change';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    new_block_expiry_date: string;

    starting_balance: number;
  }

  export namespace ExpirationChangeLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface CreditBlockExpiryLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: CreditBlockExpiryLedgerEntry.CreditBlock;

    currency: string;

    customer: CreditBlockExpiryLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'credit_block_expiry';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export namespace CreditBlockExpiryLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface VoidLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: VoidLedgerEntry.CreditBlock;

    currency: string;

    customer: VoidLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'void';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;

    void_amount: number;

    void_reason: string | null;
  }

  export namespace VoidLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface VoidInitiatedLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: VoidInitiatedLedgerEntry.CreditBlock;

    currency: string;

    customer: VoidInitiatedLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'void_initiated';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    new_block_expiry_date: string;

    starting_balance: number;

    void_amount: number;

    void_reason: string | null;
  }

  export namespace VoidInitiatedLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }

  export interface AmendmentLedgerEntry {
    id: string;

    amount: number;

    created_at: string;

    credit_block: AmendmentLedgerEntry.CreditBlock;

    currency: string;

    customer: AmendmentLedgerEntry.Customer;

    description: string | null;

    ending_balance: number;

    entry_status: 'committed' | 'pending';

    entry_type: 'amendment';

    ledger_sequence_number: number;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    starting_balance: number;
  }

  export namespace AmendmentLedgerEntry {
    export interface CreditBlock {
      id: string;

      expiry_date: string | null;

      per_unit_cost_basis: string | null;
    }

    export interface Customer {
      id: string;

      external_customer_id: string | null;
    }
  }
}

export interface LedgerListParams extends PageParams {
  'created_at[gt]'?: string | null;

  'created_at[gte]'?: string | null;

  'created_at[lt]'?: string | null;

  'created_at[lte]'?: string | null;

  /**
   * The ledger currency or custom pricing unit to use.
   */
  currency?: string | null;

  entry_status?: 'committed' | 'pending' | null;

  entry_type?:
    | 'increment'
    | 'decrement'
    | 'expiration_change'
    | 'credit_block_expiry'
    | 'void'
    | 'void_initiated'
    | 'amendment'
    | null;

  minimum_amount?: string | null;
}

export type LedgerCreateEntryParams =
  | LedgerCreateEntryParams.AddIncrementCreditLedgerEntryRequestParams
  | LedgerCreateEntryParams.AddDecrementCreditLedgerEntryRequestParams
  | LedgerCreateEntryParams.AddExpirationChangeCreditLedgerEntryRequestParams
  | LedgerCreateEntryParams.AddVoidCreditLedgerEntryRequestParams
  | LedgerCreateEntryParams.AddAmendmentCreditLedgerEntryRequestParams;

export namespace LedgerCreateEntryParams {
  export interface AddIncrementCreditLedgerEntryRequestParams {
    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement, void, or undo operations.
     */
    amount: number;

    entry_type: 'increment';

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * An ISO 8601 format date that denotes when this credit balance should become
     * available for use.
     */
    effective_date?: string | null;

    /**
     * An ISO 8601 format date that denotes when this credit balance should expire.
     */
    expiry_date?: string | null;

    /**
     * Passing `invoice_settings` automatically generates an invoice for the newly
     * added credits. If `invoice_settings` is passed, you must specify
     * per_unit_cost_basis, as the calculation of the invoice total is done on that
     * basis.
     */
    invoice_settings?: LedgerCreateEntryParams.AddIncrementCreditLedgerEntryRequestParams.InvoiceSettings | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * Can only be specified when entry_type=increment. How much, in the customer's
     * currency, a customer paid for a single credit in this block
     */
    per_unit_cost_basis?: string | null;
  }

  export namespace AddIncrementCreditLedgerEntryRequestParams {
    /**
     * Passing `invoice_settings` automatically generates an invoice for the newly
     * added credits. If `invoice_settings` is passed, you must specify
     * per_unit_cost_basis, as the calculation of the invoice total is done on that
     * basis.
     */
    export interface InvoiceSettings {
      /**
       * Whether the credits purchase invoice should auto collect with the customer's
       * saved payment method.
       */
      auto_collection: boolean;

      /**
       * The net terms determines the difference between the invoice date and the issue
       * date for the invoice. If you intend the invoice to be due on issue, set this
       * to 0.
       */
      net_terms: number;

      /**
       * An optional memo to display on the invoice.
       */
      memo?: string | null;

      /**
       * If true, the new credit block will require that the corresponding invoice is
       * paid before it can be drawn down from.
       */
      require_successful_payment?: boolean;
    }
  }

  export interface AddDecrementCreditLedgerEntryRequestParams {
    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement, void, or undo operations.
     */
    amount: number;

    entry_type: 'decrement';

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface AddExpirationChangeCreditLedgerEntryRequestParams {
    entry_type: 'expiration_change';

    /**
     * An ISO 8601 format date that identifies the origination credit block to expire
     */
    expiry_date: string | null;

    /**
     * A future date (specified in YYYY-MM-DD format) used for expiration change,
     * denoting when credits transferred (as part of a partial block expiration) should
     * expire.
     */
    target_expiry_date: string;

    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement, void, or undo operations.
     */
    amount?: number | null;

    /**
     * The ID of the block affected by an expiration_change, used to differentiate
     * between multiple blocks with the same `expiry_date`.
     */
    block_id?: string | null;

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface AddVoidCreditLedgerEntryRequestParams {
    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement, void, or undo operations.
     */
    amount: number;

    /**
     * The ID of the block to void.
     */
    block_id: string;

    entry_type: 'void';

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * Can only be specified when `entry_type=void`. The reason for the void.
     */
    void_reason?: 'refund' | null;
  }

  export interface AddAmendmentCreditLedgerEntryRequestParams {
    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement or void operations.
     */
    amount: number;

    /**
     * The ID of the block to reverse a decrement from.
     */
    block_id: string;

    entry_type: 'amendment';

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }
}

export type LedgerCreateEntryByExternalIDParams =
  | LedgerCreateEntryByExternalIDParams.AddIncrementCreditLedgerEntryRequestParams
  | LedgerCreateEntryByExternalIDParams.AddDecrementCreditLedgerEntryRequestParams
  | LedgerCreateEntryByExternalIDParams.AddExpirationChangeCreditLedgerEntryRequestParams
  | LedgerCreateEntryByExternalIDParams.AddVoidCreditLedgerEntryRequestParams
  | LedgerCreateEntryByExternalIDParams.AddAmendmentCreditLedgerEntryRequestParams;

export namespace LedgerCreateEntryByExternalIDParams {
  export interface AddIncrementCreditLedgerEntryRequestParams {
    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement, void, or undo operations.
     */
    amount: number;

    entry_type: 'increment';

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * An ISO 8601 format date that denotes when this credit balance should become
     * available for use.
     */
    effective_date?: string | null;

    /**
     * An ISO 8601 format date that denotes when this credit balance should expire.
     */
    expiry_date?: string | null;

    /**
     * Passing `invoice_settings` automatically generates an invoice for the newly
     * added credits. If `invoice_settings` is passed, you must specify
     * per_unit_cost_basis, as the calculation of the invoice total is done on that
     * basis.
     */
    invoice_settings?: LedgerCreateEntryByExternalIDParams.AddIncrementCreditLedgerEntryRequestParams.InvoiceSettings | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * Can only be specified when entry_type=increment. How much, in the customer's
     * currency, a customer paid for a single credit in this block
     */
    per_unit_cost_basis?: string | null;
  }

  export namespace AddIncrementCreditLedgerEntryRequestParams {
    /**
     * Passing `invoice_settings` automatically generates an invoice for the newly
     * added credits. If `invoice_settings` is passed, you must specify
     * per_unit_cost_basis, as the calculation of the invoice total is done on that
     * basis.
     */
    export interface InvoiceSettings {
      /**
       * Whether the credits purchase invoice should auto collect with the customer's
       * saved payment method.
       */
      auto_collection: boolean;

      /**
       * The net terms determines the difference between the invoice date and the issue
       * date for the invoice. If you intend the invoice to be due on issue, set this
       * to 0.
       */
      net_terms: number;

      /**
       * An optional memo to display on the invoice.
       */
      memo?: string | null;

      /**
       * If true, the new credit block will require that the corresponding invoice is
       * paid before it can be drawn down from.
       */
      require_successful_payment?: boolean;
    }
  }

  export interface AddDecrementCreditLedgerEntryRequestParams {
    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement, void, or undo operations.
     */
    amount: number;

    entry_type: 'decrement';

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface AddExpirationChangeCreditLedgerEntryRequestParams {
    entry_type: 'expiration_change';

    /**
     * An ISO 8601 format date that identifies the origination credit block to expire
     */
    expiry_date: string | null;

    /**
     * A future date (specified in YYYY-MM-DD format) used for expiration change,
     * denoting when credits transferred (as part of a partial block expiration) should
     * expire.
     */
    target_expiry_date: string;

    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement, void, or undo operations.
     */
    amount?: number | null;

    /**
     * The ID of the block affected by an expiration_change, used to differentiate
     * between multiple blocks with the same `expiry_date`.
     */
    block_id?: string | null;

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }

  export interface AddVoidCreditLedgerEntryRequestParams {
    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement, void, or undo operations.
     */
    amount: number;

    /**
     * The ID of the block to void.
     */
    block_id: string;

    entry_type: 'void';

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;

    /**
     * Can only be specified when `entry_type=void`. The reason for the void.
     */
    void_reason?: 'refund' | null;
  }

  export interface AddAmendmentCreditLedgerEntryRequestParams {
    /**
     * The number of credits to effect. Note that this is required for increment,
     * decrement or void operations.
     */
    amount: number;

    /**
     * The ID of the block to reverse a decrement from.
     */
    block_id: string;

    entry_type: 'amendment';

    /**
     * The currency or custom pricing unit to use for this ledger entry. If this is a
     * real-world currency, it must match the customer's invoicing currency.
     */
    currency?: string | null;

    /**
     * Optional metadata that can be specified when adding ledger results via the API.
     * For example, this can be used to note an increment refers to trial credits, or
     * for noting corrections as a result of an incident, etc.
     */
    description?: string | null;

    /**
     * User-specified key/value pairs for the resource. Individual keys can be removed
     * by setting the value to `null`, and the entire metadata mapping can be cleared
     * by setting `metadata` to `null`.
     */
    metadata?: Record<string, string | null> | null;
  }
}

export interface LedgerListByExternalIDParams extends PageParams {
  'created_at[gt]'?: string | null;

  'created_at[gte]'?: string | null;

  'created_at[lt]'?: string | null;

  'created_at[lte]'?: string | null;

  /**
   * The ledger currency or custom pricing unit to use.
   */
  currency?: string | null;

  entry_status?: 'committed' | 'pending' | null;

  entry_type?:
    | 'increment'
    | 'decrement'
    | 'expiration_change'
    | 'credit_block_expiry'
    | 'void'
    | 'void_initiated'
    | 'amendment'
    | null;

  minimum_amount?: string | null;
}

export namespace Ledger {
  export import LedgerListResponse = LedgerAPI.LedgerListResponse;
  export import LedgerCreateEntryResponse = LedgerAPI.LedgerCreateEntryResponse;
  export import LedgerCreateEntryByExternalIDResponse = LedgerAPI.LedgerCreateEntryByExternalIDResponse;
  export import LedgerListByExternalIDResponse = LedgerAPI.LedgerListByExternalIDResponse;
  export import LedgerListResponsesPage = LedgerAPI.LedgerListResponsesPage;
  export import LedgerListByExternalIDResponsesPage = LedgerAPI.LedgerListByExternalIDResponsesPage;
  export import LedgerListParams = LedgerAPI.LedgerListParams;
  export import LedgerCreateEntryParams = LedgerAPI.LedgerCreateEntryParams;
  export import LedgerCreateEntryByExternalIDParams = LedgerAPI.LedgerCreateEntryByExternalIDParams;
  export import LedgerListByExternalIDParams = LedgerAPI.LedgerListByExternalIDParams;
}
