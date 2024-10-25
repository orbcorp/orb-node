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
  export type CreditListResponse = CreditsAPI.CreditListResponse;
  export type CreditListByExternalIDResponse = CreditsAPI.CreditListByExternalIDResponse;
  export import CreditListResponsesPage = CreditsAPI.CreditListResponsesPage;
  export import CreditListByExternalIDResponsesPage = CreditsAPI.CreditListByExternalIDResponsesPage;
  export type CreditListParams = CreditsAPI.CreditListParams;
  export type CreditListByExternalIDParams = CreditsAPI.CreditListByExternalIDParams;
  export import Ledger = LedgerAPI.Ledger;
  export type LedgerListResponse = LedgerAPI.LedgerListResponse;
  export type LedgerCreateEntryResponse = LedgerAPI.LedgerCreateEntryResponse;
  export type LedgerCreateEntryByExternalIDResponse = LedgerAPI.LedgerCreateEntryByExternalIDResponse;
  export type LedgerListByExternalIDResponse = LedgerAPI.LedgerListByExternalIDResponse;
  export import LedgerListResponsesPage = LedgerAPI.LedgerListResponsesPage;
  export import LedgerListByExternalIDResponsesPage = LedgerAPI.LedgerListByExternalIDResponsesPage;
  export type LedgerListParams = LedgerAPI.LedgerListParams;
  export type LedgerCreateEntryParams = LedgerAPI.LedgerCreateEntryParams;
  export type LedgerCreateEntryByExternalIDParams = LedgerAPI.LedgerCreateEntryByExternalIDParams;
  export type LedgerListByExternalIDParams = LedgerAPI.LedgerListByExternalIDParams;
  export import TopUps = TopUpsAPI.TopUps;
  export type TopUpCreateResponse = TopUpsAPI.TopUpCreateResponse;
  export type TopUpListResponse = TopUpsAPI.TopUpListResponse;
  export type TopUpCreateByExternalIDResponse = TopUpsAPI.TopUpCreateByExternalIDResponse;
  export type TopUpListByExternalIDResponse = TopUpsAPI.TopUpListByExternalIDResponse;
  export import TopUpListResponsesPage = TopUpsAPI.TopUpListResponsesPage;
  export import TopUpListByExternalIDResponsesPage = TopUpsAPI.TopUpListByExternalIDResponsesPage;
  export type TopUpCreateParams = TopUpsAPI.TopUpCreateParams;
  export type TopUpListParams = TopUpsAPI.TopUpListParams;
  export type TopUpCreateByExternalIDParams = TopUpsAPI.TopUpCreateByExternalIDParams;
  export type TopUpListByExternalIDParams = TopUpsAPI.TopUpListByExternalIDParams;
}
