// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../../../core';
import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as TopUpsAPI from './top-ups';
import { Page, type PageParams } from '../../../pagination';

export class TopUps extends APIResource {
  /**
   * This endpoint allows you to create a new top-up for a specified customer's
   * balance. While this top-up is active, the customer's balance will added in
   * increments of the specified amount whenever the balance reaches the specified
   * threshold.
   *
   * If a top-up already exists for this customer in the same currency, the existing
   * top-up will be replaced.
   */
  create(
    customerId: string,
    body: TopUpCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopUpCreateResponse> {
    return this._client.post(`/customers/${customerId}/credits/top_ups`, { body, ...options });
  }

  /**
   * List top-ups
   */
  list(
    customerId: string,
    query?: TopUpListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TopUpListResponsesPage, TopUpListResponse>;
  list(
    customerId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TopUpListResponsesPage, TopUpListResponse>;
  list(
    customerId: string,
    query: TopUpListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<TopUpListResponsesPage, TopUpListResponse> {
    if (isRequestOptions(query)) {
      return this.list(customerId, {}, query);
    }
    return this._client.getAPIList(`/customers/${customerId}/credits/top_ups`, TopUpListResponsesPage, {
      query,
      ...options,
    });
  }

  /**
   * Delete top-up
   */
  delete(customerId: string, topUpId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/customers/${customerId}/credits/top_ups/${topUpId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * This endpoint allows you to create a new top-up for a specified customer's
   * balance. While this top-up is active, the customer's balance will added in
   * increments of the specified amount whenever the balance reaches the specified
   * threshold.
   *
   * If a top-up already exists for this customer in the same currency, the existing
   * top-up will be replaced.
   */
  createByExternalId(
    externalCustomerId: string,
    body: TopUpCreateByExternalIDParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopUpCreateByExternalIDResponse> {
    return this._client.post(`/customers/external_customer_id/${externalCustomerId}/credits/top_ups`, {
      body,
      ...options,
    });
  }

  /**
   * Delete top-up by external ID
   */
  deleteByExternalId(
    externalCustomerId: string,
    topUpId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.delete(
      `/customers/external_customer_id/${externalCustomerId}/credits/top_ups/${topUpId}`,
      { ...options, headers: { Accept: '*/*', ...options?.headers } },
    );
  }

  /**
   * List top-ups by external ID
   */
  listByExternalId(
    externalCustomerId: string,
    query?: TopUpListByExternalIDParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TopUpListByExternalIDResponsesPage, TopUpListByExternalIDResponse>;
  listByExternalId(
    externalCustomerId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TopUpListByExternalIDResponsesPage, TopUpListByExternalIDResponse>;
  listByExternalId(
    externalCustomerId: string,
    query: TopUpListByExternalIDParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<TopUpListByExternalIDResponsesPage, TopUpListByExternalIDResponse> {
    if (isRequestOptions(query)) {
      return this.listByExternalId(externalCustomerId, {}, query);
    }
    return this._client.getAPIList(
      `/customers/external_customer_id/${externalCustomerId}/credits/top_ups`,
      TopUpListByExternalIDResponsesPage,
      { query, ...options },
    );
  }
}

export class TopUpListResponsesPage extends Page<TopUpListResponse> {}

export class TopUpListByExternalIDResponsesPage extends Page<TopUpListByExternalIDResponse> {}

export interface TopUpCreateResponse {
  id: string;

  /**
   * The amount to increment when the threshold is reached.
   */
  amount: string;

  /**
   * The currency or custom pricing unit to use for this top-up. If this is a
   * real-world currency, it must match the customer's invoicing currency.
   */
  currency: string;

  /**
   * Settings for invoices generated by triggered top-ups.
   */
  invoice_settings: TopUpCreateResponse.InvoiceSettings;

  /**
   * How much, in the customer's currency, to charge for each unit.
   */
  per_unit_cost_basis: string;

  /**
   * The threshold at which to trigger the top-up. If the balance is at or below this
   * threshold, the top-up will be triggered.
   */
  threshold: string;

  /**
   * The number of days or months after which the top-up expires. If unspecified, it
   * does not expire.
   */
  expires_after?: number | null;

  /**
   * The unit of expires_after.
   */
  expires_after_unit?: 'day' | 'month' | null;
}

export namespace TopUpCreateResponse {
  /**
   * Settings for invoices generated by triggered top-ups.
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
     * If true, new credit blocks created by this top-up will require that the
     * corresponding invoice is paid before they can be drawn down from.
     */
    require_successful_payment?: boolean;
  }
}

export interface TopUpListResponse {
  id: string;

  /**
   * The amount to increment when the threshold is reached.
   */
  amount: string;

  /**
   * The currency or custom pricing unit to use for this top-up. If this is a
   * real-world currency, it must match the customer's invoicing currency.
   */
  currency: string;

  /**
   * Settings for invoices generated by triggered top-ups.
   */
  invoice_settings: TopUpListResponse.InvoiceSettings;

  /**
   * How much, in the customer's currency, to charge for each unit.
   */
  per_unit_cost_basis: string;

  /**
   * The threshold at which to trigger the top-up. If the balance is at or below this
   * threshold, the top-up will be triggered.
   */
  threshold: string;

  /**
   * The number of days or months after which the top-up expires. If unspecified, it
   * does not expire.
   */
  expires_after?: number | null;

  /**
   * The unit of expires_after.
   */
  expires_after_unit?: 'day' | 'month' | null;
}

export namespace TopUpListResponse {
  /**
   * Settings for invoices generated by triggered top-ups.
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
     * If true, new credit blocks created by this top-up will require that the
     * corresponding invoice is paid before they can be drawn down from.
     */
    require_successful_payment?: boolean;
  }
}

export interface TopUpCreateByExternalIDResponse {
  id: string;

  /**
   * The amount to increment when the threshold is reached.
   */
  amount: string;

  /**
   * The currency or custom pricing unit to use for this top-up. If this is a
   * real-world currency, it must match the customer's invoicing currency.
   */
  currency: string;

  /**
   * Settings for invoices generated by triggered top-ups.
   */
  invoice_settings: TopUpCreateByExternalIDResponse.InvoiceSettings;

  /**
   * How much, in the customer's currency, to charge for each unit.
   */
  per_unit_cost_basis: string;

  /**
   * The threshold at which to trigger the top-up. If the balance is at or below this
   * threshold, the top-up will be triggered.
   */
  threshold: string;

  /**
   * The number of days or months after which the top-up expires. If unspecified, it
   * does not expire.
   */
  expires_after?: number | null;

  /**
   * The unit of expires_after.
   */
  expires_after_unit?: 'day' | 'month' | null;
}

export namespace TopUpCreateByExternalIDResponse {
  /**
   * Settings for invoices generated by triggered top-ups.
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
     * If true, new credit blocks created by this top-up will require that the
     * corresponding invoice is paid before they can be drawn down from.
     */
    require_successful_payment?: boolean;
  }
}

export interface TopUpListByExternalIDResponse {
  id: string;

  /**
   * The amount to increment when the threshold is reached.
   */
  amount: string;

  /**
   * The currency or custom pricing unit to use for this top-up. If this is a
   * real-world currency, it must match the customer's invoicing currency.
   */
  currency: string;

  /**
   * Settings for invoices generated by triggered top-ups.
   */
  invoice_settings: TopUpListByExternalIDResponse.InvoiceSettings;

  /**
   * How much, in the customer's currency, to charge for each unit.
   */
  per_unit_cost_basis: string;

  /**
   * The threshold at which to trigger the top-up. If the balance is at or below this
   * threshold, the top-up will be triggered.
   */
  threshold: string;

  /**
   * The number of days or months after which the top-up expires. If unspecified, it
   * does not expire.
   */
  expires_after?: number | null;

  /**
   * The unit of expires_after.
   */
  expires_after_unit?: 'day' | 'month' | null;
}

export namespace TopUpListByExternalIDResponse {
  /**
   * Settings for invoices generated by triggered top-ups.
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
     * If true, new credit blocks created by this top-up will require that the
     * corresponding invoice is paid before they can be drawn down from.
     */
    require_successful_payment?: boolean;
  }
}

export interface TopUpCreateParams {
  /**
   * The amount to increment when the threshold is reached.
   */
  amount: string;

  /**
   * The currency or custom pricing unit to use for this top-up. If this is a
   * real-world currency, it must match the customer's invoicing currency.
   */
  currency: string;

  /**
   * Settings for invoices generated by triggered top-ups.
   */
  invoice_settings: TopUpCreateParams.InvoiceSettings;

  /**
   * How much, in the customer's currency, to charge for each unit.
   */
  per_unit_cost_basis: string;

  /**
   * The threshold at which to trigger the top-up. If the balance is at or below this
   * threshold, the top-up will be triggered.
   */
  threshold: string;

  /**
   * The number of days or months after which the top-up expires. If unspecified, it
   * does not expire.
   */
  expires_after?: number | null;

  /**
   * The unit of expires_after.
   */
  expires_after_unit?: 'day' | 'month' | null;
}

export namespace TopUpCreateParams {
  /**
   * Settings for invoices generated by triggered top-ups.
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
     * If true, new credit blocks created by this top-up will require that the
     * corresponding invoice is paid before they can be drawn down from.
     */
    require_successful_payment?: boolean;
  }
}

export interface TopUpListParams extends PageParams {}

export interface TopUpCreateByExternalIDParams {
  /**
   * The amount to increment when the threshold is reached.
   */
  amount: string;

  /**
   * The currency or custom pricing unit to use for this top-up. If this is a
   * real-world currency, it must match the customer's invoicing currency.
   */
  currency: string;

  /**
   * Settings for invoices generated by triggered top-ups.
   */
  invoice_settings: TopUpCreateByExternalIDParams.InvoiceSettings;

  /**
   * How much, in the customer's currency, to charge for each unit.
   */
  per_unit_cost_basis: string;

  /**
   * The threshold at which to trigger the top-up. If the balance is at or below this
   * threshold, the top-up will be triggered.
   */
  threshold: string;

  /**
   * The number of days or months after which the top-up expires. If unspecified, it
   * does not expire.
   */
  expires_after?: number | null;

  /**
   * The unit of expires_after.
   */
  expires_after_unit?: 'day' | 'month' | null;
}

export namespace TopUpCreateByExternalIDParams {
  /**
   * Settings for invoices generated by triggered top-ups.
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
     * If true, new credit blocks created by this top-up will require that the
     * corresponding invoice is paid before they can be drawn down from.
     */
    require_successful_payment?: boolean;
  }
}

export interface TopUpListByExternalIDParams extends PageParams {}

export namespace TopUps {
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
