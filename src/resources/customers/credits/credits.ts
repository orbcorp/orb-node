// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as CreditsAPI from './credits';
import * as LedgerAPI from './ledger';
import * as TopUpsAPI from './top-ups';
import { Page, type PageParams } from '../../../pagination';

export class Credits extends APIResource {
  ledger: LedgerAPI.Ledger = new LedgerAPI.Ledger(this._client);
  topUps: TopUpsAPI.TopUps = new TopUpsAPI.TopUps(this._client);

  /**
   * Returns a paginated list of unexpired, non-zero credit blocks for a customer.
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

  maximum_initial_balance: number | null;

  per_unit_cost_basis: string | null;

  status: 'active' | 'pending_payment';
}

export interface CreditListByExternalIDResponse {
  id: string;

  balance: number;

  effective_date: string | null;

  expiry_date: string | null;

  maximum_initial_balance: number | null;

  per_unit_cost_basis: string | null;

  status: 'active' | 'pending_payment';
}

export interface CreditListParams extends PageParams {
  /**
   * The ledger currency or custom pricing unit to use.
   */
  currency?: string | null;

  /**
   * Include all blocks, not just active ones.
   */
  include_all_blocks?: boolean;
}

export interface CreditListByExternalIDParams extends PageParams {
  /**
   * The ledger currency or custom pricing unit to use.
   */
  currency?: string | null;

  /**
   * Include all blocks, not just active ones.
   */
  include_all_blocks?: boolean;
}

export namespace Credits {
  export import CreditListResponse = CreditsAPI.CreditListResponse;
  export import CreditListByExternalIDResponse = CreditsAPI.CreditListByExternalIDResponse;
  export import CreditListResponsesPage = CreditsAPI.CreditListResponsesPage;
  export import CreditListByExternalIDResponsesPage = CreditsAPI.CreditListByExternalIDResponsesPage;
  export import CreditListParams = CreditsAPI.CreditListParams;
  export import CreditListByExternalIDParams = CreditsAPI.CreditListByExternalIDParams;
  export import Ledger = LedgerAPI.Ledger;
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
  export import TopUps = TopUpsAPI.TopUps;
  export import TopUpCreateResponse = TopUpsAPI.TopUpCreateResponse;
  export import TopUpListResponse = TopUpsAPI.TopUpListResponse;
  export import TopUpCreateByExternalIDResponse = TopUpsAPI.TopUpCreateByExternalIDResponse;
  export import TopUpListByExternalIDResponse = TopUpsAPI.TopUpListByExternalIDResponse;
  export import TopUpListResponsesPage = TopUpsAPI.TopUpListResponsesPage;
  export import TopUpListByExternalIDResponsesPage = TopUpsAPI.TopUpListByExternalIDResponsesPage;
  export import TopUpCreateParams = TopUpsAPI.TopUpCreateParams;
  export import TopUpListParams = TopUpsAPI.TopUpListParams;
  export import TopUpCreateByExternalIDParams = TopUpsAPI.TopUpCreateByExternalIDParams;
  export import TopUpListByExternalIDParams = TopUpsAPI.TopUpListByExternalIDParams;
}
