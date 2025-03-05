// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as Shared from '../../shared';
import { CustomerCreditBalancesModelDataPage } from '../../shared';
import * as LedgerAPI from './ledger';
import {
  Ledger,
  LedgerCreateEntryByExternalIDParams,
  LedgerCreateEntryParams,
  LedgerListByExternalIDParams,
  LedgerListParams,
} from './ledger';
import * as TopUpsAPI from './top-ups';
import {
  TopUpCreateByExternalIDParams,
  TopUpCreateParams,
  TopUpListByExternalIDParams,
  TopUpListParams,
  TopUps,
} from './top-ups';
import { type PageParams } from '../../../pagination';

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
  ): Core.PagePromise<CustomerCreditBalancesModelDataPage, Shared.CustomerCreditBalancesModel.Data>;
  list(
    customerId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CustomerCreditBalancesModelDataPage, Shared.CustomerCreditBalancesModel.Data>;
  list(
    customerId: string,
    query: CreditListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CustomerCreditBalancesModelDataPage, Shared.CustomerCreditBalancesModel.Data> {
    if (isRequestOptions(query)) {
      return this.list(customerId, {}, query);
    }
    return this._client.getAPIList(`/customers/${customerId}/credits`, CustomerCreditBalancesModelDataPage, {
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
  ): Core.PagePromise<CustomerCreditBalancesModelDataPage, Shared.CustomerCreditBalancesModel.Data>;
  listByExternalId(
    externalCustomerId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CustomerCreditBalancesModelDataPage, Shared.CustomerCreditBalancesModel.Data>;
  listByExternalId(
    externalCustomerId: string,
    query: CreditListByExternalIDParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CustomerCreditBalancesModelDataPage, Shared.CustomerCreditBalancesModel.Data> {
    if (isRequestOptions(query)) {
      return this.listByExternalId(externalCustomerId, {}, query);
    }
    return this._client.getAPIList(
      `/customers/external_customer_id/${externalCustomerId}/credits`,
      CustomerCreditBalancesModelDataPage,
      { query, ...options },
    );
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

Credits.Ledger = Ledger;
Credits.TopUps = TopUps;

export declare namespace Credits {
  export {
    type CreditListParams as CreditListParams,
    type CreditListByExternalIDParams as CreditListByExternalIDParams,
  };

  export {
    Ledger as Ledger,
    type LedgerListParams as LedgerListParams,
    type LedgerCreateEntryParams as LedgerCreateEntryParams,
    type LedgerCreateEntryByExternalIDParams as LedgerCreateEntryByExternalIDParams,
    type LedgerListByExternalIDParams as LedgerListByExternalIDParams,
  };

  export {
    TopUps as TopUps,
    type TopUpCreateParams as TopUpCreateParams,
    type TopUpListParams as TopUpListParams,
    type TopUpCreateByExternalIDParams as TopUpCreateByExternalIDParams,
    type TopUpListByExternalIDParams as TopUpListByExternalIDParams,
  };
}

export { CustomerCreditBalancesModelDataPage };
