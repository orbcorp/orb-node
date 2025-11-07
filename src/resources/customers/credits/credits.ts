// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as LedgerAPI from './ledger';
import {
  AffectedBlock,
  AmendmentLedgerEntry,
  CreditBlockExpiryLedgerEntry,
  DecrementLedgerEntry,
  ExpirationChangeLedgerEntry,
  IncrementLedgerEntry,
  Ledger,
  LedgerCreateEntryByExternalIDParams,
  LedgerCreateEntryByExternalIDResponse,
  LedgerCreateEntryParams,
  LedgerCreateEntryResponse,
  LedgerListByExternalIDParams,
  LedgerListByExternalIDResponse,
  LedgerListByExternalIDResponsesPage,
  LedgerListParams,
  LedgerListResponse,
  LedgerListResponsesPage,
  VoidInitiatedLedgerEntry,
  VoidLedgerEntry,
} from './ledger';
import * as TopUpsAPI from './top-ups';
import {
  TopUpCreateByExternalIDParams,
  TopUpCreateByExternalIDResponse,
  TopUpCreateParams,
  TopUpCreateResponse,
  TopUpInvoiceSettings,
  TopUpListByExternalIDParams,
  TopUpListByExternalIDResponse,
  TopUpListByExternalIDResponsesPage,
  TopUpListParams,
  TopUpListResponse,
  TopUpListResponsesPage,
  TopUps,
} from './top-ups';
import { Page, type PageParams } from '../../../pagination';

export class Credits extends APIResource {
  ledger: LedgerAPI.Ledger = new LedgerAPI.Ledger(this._client);
  topUps: TopUpsAPI.TopUps = new TopUpsAPI.TopUps(this._client);

  /**
   * Returns a paginated list of unexpired, non-zero credit blocks for a customer.
   *
   * If `include_all_blocks` is set to `true`, all credit blocks (including expired
   * and depleted blocks) will be included in the response.
   *
   * Note that `currency` defaults to credits if not specified. To use a real world
   * currency, set `currency` to an ISO 4217 string.
   */
  list(
    customerId: string,
    query?: CreditListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditListResponsesPage, CreditListResponse>;
  list(
    customerId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditListResponsesPage, CreditListResponse>;
  list(
    customerId: string,
    query: CreditListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditListResponsesPage, CreditListResponse> {
    if (isRequestOptions(query)) {
      return this.list(customerId, {}, query);
    }
    return this._client.getAPIList(`/customers/${customerId}/credits`, CreditListResponsesPage, {
      query,
      ...options,
    });
  }

  /**
   * Returns a paginated list of unexpired, non-zero credit blocks for a customer.
   *
   * If `include_all_blocks` is set to `true`, all credit blocks (including expired
   * and depleted blocks) will be included in the response.
   *
   * Note that `currency` defaults to credits if not specified. To use a real world
   * currency, set `currency` to an ISO 4217 string.
   */
  listByExternalId(
    externalCustomerId: string,
    query?: CreditListByExternalIDParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditListByExternalIDResponsesPage, CreditListByExternalIDResponse>;
  listByExternalId(
    externalCustomerId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditListByExternalIDResponsesPage, CreditListByExternalIDResponse>;
  listByExternalId(
    externalCustomerId: string,
    query: CreditListByExternalIDParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditListByExternalIDResponsesPage, CreditListByExternalIDResponse> {
    if (isRequestOptions(query)) {
      return this.listByExternalId(externalCustomerId, {}, query);
    }
    return this._client.getAPIList(
      `/customers/external_customer_id/${externalCustomerId}/credits`,
      CreditListByExternalIDResponsesPage,
      { query, ...options },
    );
  }
}

export class CreditListResponsesPage extends Page<CreditListResponse> {}

export class CreditListByExternalIDResponsesPage extends Page<CreditListByExternalIDResponse> {}

export interface CreditListResponse {
  id: string;

  balance: number;

  effective_date: string | null;

  expiry_date: string | null;

  filters: Array<CreditListResponse.Filter>;

  maximum_initial_balance: number | null;

  per_unit_cost_basis: string | null;

  status: 'active' | 'pending_payment';
}

export namespace CreditListResponse {
  /**
   * A PriceFilter that only allows item_id field for block filters.
   */
  export interface Filter {
    /**
     * The property of the price the block applies to. Only item_id is supported.
     */
    field: 'item_id';

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

export interface CreditListByExternalIDResponse {
  id: string;

  balance: number;

  effective_date: string | null;

  expiry_date: string | null;

  filters: Array<CreditListByExternalIDResponse.Filter>;

  maximum_initial_balance: number | null;

  per_unit_cost_basis: string | null;

  status: 'active' | 'pending_payment';
}

export namespace CreditListByExternalIDResponse {
  /**
   * A PriceFilter that only allows item_id field for block filters.
   */
  export interface Filter {
    /**
     * The property of the price the block applies to. Only item_id is supported.
     */
    field: 'item_id';

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

export interface CreditListParams extends PageParams {
  /**
   * The ledger currency or custom pricing unit to use.
   */
  currency?: string | null;

  /**
   * If set to True, all expired and depleted blocks, as well as active block will be
   * returned.
   */
  include_all_blocks?: boolean;
}

export interface CreditListByExternalIDParams extends PageParams {
  /**
   * The ledger currency or custom pricing unit to use.
   */
  currency?: string | null;

  /**
   * If set to True, all expired and depleted blocks, as well as active block will be
   * returned.
   */
  include_all_blocks?: boolean;
}

Credits.CreditListResponsesPage = CreditListResponsesPage;
Credits.CreditListByExternalIDResponsesPage = CreditListByExternalIDResponsesPage;
Credits.Ledger = Ledger;
Credits.LedgerListResponsesPage = LedgerListResponsesPage;
Credits.LedgerListByExternalIDResponsesPage = LedgerListByExternalIDResponsesPage;
Credits.TopUps = TopUps;
Credits.TopUpListResponsesPage = TopUpListResponsesPage;
Credits.TopUpListByExternalIDResponsesPage = TopUpListByExternalIDResponsesPage;

export declare namespace Credits {
  export {
    type CreditListResponse as CreditListResponse,
    type CreditListByExternalIDResponse as CreditListByExternalIDResponse,
    CreditListResponsesPage as CreditListResponsesPage,
    CreditListByExternalIDResponsesPage as CreditListByExternalIDResponsesPage,
    type CreditListParams as CreditListParams,
    type CreditListByExternalIDParams as CreditListByExternalIDParams,
  };

  export {
    Ledger as Ledger,
    type AffectedBlock as AffectedBlock,
    type AmendmentLedgerEntry as AmendmentLedgerEntry,
    type CreditBlockExpiryLedgerEntry as CreditBlockExpiryLedgerEntry,
    type DecrementLedgerEntry as DecrementLedgerEntry,
    type ExpirationChangeLedgerEntry as ExpirationChangeLedgerEntry,
    type IncrementLedgerEntry as IncrementLedgerEntry,
    type VoidInitiatedLedgerEntry as VoidInitiatedLedgerEntry,
    type VoidLedgerEntry as VoidLedgerEntry,
    type LedgerListResponse as LedgerListResponse,
    type LedgerCreateEntryResponse as LedgerCreateEntryResponse,
    type LedgerCreateEntryByExternalIDResponse as LedgerCreateEntryByExternalIDResponse,
    type LedgerListByExternalIDResponse as LedgerListByExternalIDResponse,
    LedgerListResponsesPage as LedgerListResponsesPage,
    LedgerListByExternalIDResponsesPage as LedgerListByExternalIDResponsesPage,
    type LedgerListParams as LedgerListParams,
    type LedgerCreateEntryParams as LedgerCreateEntryParams,
    type LedgerCreateEntryByExternalIDParams as LedgerCreateEntryByExternalIDParams,
    type LedgerListByExternalIDParams as LedgerListByExternalIDParams,
  };

  export {
    TopUps as TopUps,
    type TopUpInvoiceSettings as TopUpInvoiceSettings,
    type TopUpCreateResponse as TopUpCreateResponse,
    type TopUpListResponse as TopUpListResponse,
    type TopUpCreateByExternalIDResponse as TopUpCreateByExternalIDResponse,
    type TopUpListByExternalIDResponse as TopUpListByExternalIDResponse,
    TopUpListResponsesPage as TopUpListResponsesPage,
    TopUpListByExternalIDResponsesPage as TopUpListByExternalIDResponsesPage,
    type TopUpCreateParams as TopUpCreateParams,
    type TopUpListParams as TopUpListParams,
    type TopUpCreateByExternalIDParams as TopUpCreateByExternalIDParams,
    type TopUpListByExternalIDParams as TopUpListByExternalIDParams,
  };
}
