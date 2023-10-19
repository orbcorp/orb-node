// File generated from our OpenAPI spec by Stainless.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import { isRequestOptions } from 'orb-billing/core';
import * as CreditsAPI from 'orb-billing/resources/customers/credits/credits';
import * as LedgerAPI from 'orb-billing/resources/customers/credits/ledger';
import { Page, type PageParams } from 'orb-billing/pagination';

export class Credits extends APIResource {
  ledger: LedgerAPI.Ledger = new LedgerAPI.Ledger(this.client);

  /**
   * Returns a paginated list of unexpired, non-zero credit blocks for a customer.
   */
  list(
    customerId: string | null,
    query?: CreditListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditListResponsesPage, CreditListResponse>;
  list(
    customerId: string | null,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditListResponsesPage, CreditListResponse>;
  list(
    customerId: string | null,
    query: CreditListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditListResponsesPage, CreditListResponse> {
    if (isRequestOptions(query)) {
      return this.list(customerId, {}, query);
    }
    return this.getAPIList(`/customers/${customerId}/credits`, CreditListResponsesPage, {
      query,
      ...options,
    });
  }

  /**
   * Returns a paginated list of unexpired, non-zero credit blocks for a customer.
   */
  listByExternalId(
    externalCustomerId: string | null,
    query?: CreditListByExternalIDParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditListByExternalIDResponsesPage, CreditListByExternalIDResponse>;
  listByExternalId(
    externalCustomerId: string | null,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditListByExternalIDResponsesPage, CreditListByExternalIDResponse>;
  listByExternalId(
    externalCustomerId: string | null,
    query: CreditListByExternalIDParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditListByExternalIDResponsesPage, CreditListByExternalIDResponse> {
    if (isRequestOptions(query)) {
      return this.listByExternalId(externalCustomerId, {}, query);
    }
    return this.getAPIList(
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

  expiry_date: string | null;

  per_unit_cost_basis: string | null;
}

export interface CreditListByExternalIDResponse {
  id: string;

  balance: number;

  expiry_date: string | null;

  per_unit_cost_basis: string | null;
}

export interface CreditListParams extends PageParams {}

export interface CreditListByExternalIDParams extends PageParams {}

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
  export import LedgerCreateEntryByExteralIDResponse = LedgerAPI.LedgerCreateEntryByExteralIDResponse;
  export import LedgerListByExternalIDResponse = LedgerAPI.LedgerListByExternalIDResponse;
  export import LedgerListResponsesPage = LedgerAPI.LedgerListResponsesPage;
  export import LedgerListByExternalIDResponsesPage = LedgerAPI.LedgerListByExternalIDResponsesPage;
  export import LedgerListParams = LedgerAPI.LedgerListParams;
  export import LedgerCreateEntryParams = LedgerAPI.LedgerCreateEntryParams;
  export import LedgerCreateEntryByExteralIDParams = LedgerAPI.LedgerCreateEntryByExteralIDParams;
  export import LedgerListByExternalIDParams = LedgerAPI.LedgerListByExternalIDParams;
}
