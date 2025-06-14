// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
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
   * This deactivates the top-up and voids any invoices associated with pending
   * credit blocks purchased through the top-up.
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
   * This deactivates the top-up and voids any invoices associated with pending
   * credit blocks purchased through the top-up.
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

export interface TopUpInvoiceSettings {
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
   * When true, credit blocks created by this top-up will require that the
   * corresponding invoice is paid before they are drawn down from. If any topup
   * block is pending payment, further automatic top-ups will be paused until the
   * invoice is paid or voided.
   */
  require_successful_payment?: boolean;
}

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
  invoice_settings: TopUpInvoiceSettings;

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
  invoice_settings: TopUpInvoiceSettings;

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
  invoice_settings: TopUpInvoiceSettings;

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
  invoice_settings: TopUpInvoiceSettings;

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
   * The date from which the top-up is active. If unspecified, the top-up is active
   * immediately. This should not be more than 10 days in the past.
   */
  active_from?: string | null;

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
     * When true, credit blocks created by this top-up will require that the
     * corresponding invoice is paid before they are drawn down from. If any topup
     * block is pending payment, further automatic top-ups will be paused until the
     * invoice is paid or voided.
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
   * The date from which the top-up is active. If unspecified, the top-up is active
   * immediately. This should not be more than 10 days in the past.
   */
  active_from?: string | null;

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
     * When true, credit blocks created by this top-up will require that the
     * corresponding invoice is paid before they are drawn down from. If any topup
     * block is pending payment, further automatic top-ups will be paused until the
     * invoice is paid or voided.
     */
    require_successful_payment?: boolean;
  }
}

export interface TopUpListByExternalIDParams extends PageParams {}

TopUps.TopUpListResponsesPage = TopUpListResponsesPage;
TopUps.TopUpListByExternalIDResponsesPage = TopUpListByExternalIDResponsesPage;

export declare namespace TopUps {
  export {
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
