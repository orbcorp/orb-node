// File generated from our OpenAPI spec by Stainless.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import { isRequestOptions } from 'orb-billing/core';
import * as CustomersAPI from 'orb-billing/resources/customers/customers';
import * as BalanceTransactionsAPI from 'orb-billing/resources/customers/balance-transactions';
import * as CostsAPI from 'orb-billing/resources/customers/costs';
import * as UsageAPI from 'orb-billing/resources/customers/usage';
import * as CreditsAPI from 'orb-billing/resources/customers/credits/credits';
import { Page, type PageParams } from 'orb-billing/pagination';

export class Customers extends APIResource {
  costs: CostsAPI.Costs = new CostsAPI.Costs(this._client);
  usage: UsageAPI.Usage = new UsageAPI.Usage(this._client);
  credits: CreditsAPI.Credits = new CreditsAPI.Credits(this._client);
  balanceTransactions: BalanceTransactionsAPI.BalanceTransactions =
    new BalanceTransactionsAPI.BalanceTransactions(this._client);

  /**
   * This operation is used to create an Orb customer, who is party to the core
   * billing relationship. See [Customer](../guides/concepts#customer) for an
   * overview of the customer resource.
   *
   * This endpoint is critical in the following Orb functionality:
   *
   * - Automated charges can be configured by setting `payment_provider` and
   *   `payment_provider_id` to automatically issue invoices
   * - [Customer ID Aliases](../guides/events-and-metrics/customer-aliases) can be
   *   configured by setting `external_customer_id`
   * - [Timezone localization](../guides/product-catalog/timezones.md) can be
   *   configured on a per-customer basis by setting the `timezone` parameter
   */
  create(body: CustomerCreateParams, options?: Core.RequestOptions): Core.APIPromise<Customer> {
    return this._client.post('/customers', { body, ...options });
  }

  /**
   * This endpoint can be used to update the `payment_provider`,
   * `payment_provider_id`, `name`, `email`, `email_delivery`, `tax_id`,
   * `auto_collection`, `metadata`, `shipping_address`, `billing_address`, and
   * `additional_emails` of an existing customer. Other fields on a customer are
   * currently immutable.
   */
  update(
    customerId: string,
    body?: CustomerUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Customer>;
  update(customerId: string, options?: Core.RequestOptions): Core.APIPromise<Customer>;
  update(
    customerId: string,
    body: CustomerUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Customer> {
    if (isRequestOptions(body)) {
      return this.update(customerId, {}, body);
    }
    return this._client.put(`/customers/${customerId}`, { body, ...options });
  }

  /**
   * This endpoint returns a list of all customers for an account. The list of
   * customers is ordered starting from the most recently created customer. This
   * endpoint follows Orb's
   * [standardized pagination format](../reference/pagination).
   *
   * See [Customer](../guides/concepts#customer) for an overview of the customer
   * model.
   */
  list(query?: CustomerListParams, options?: Core.RequestOptions): Core.PagePromise<CustomersPage, Customer>;
  list(options?: Core.RequestOptions): Core.PagePromise<CustomersPage, Customer>;
  list(
    query: CustomerListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CustomersPage, Customer> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/customers', CustomersPage, { query, ...options });
  }

  /**
   * This performs a deletion of this customer, its subscriptions, and its invoices.
   * This operation is irreversible. Note that this is a _soft_ deletion, but the
   * data will be inaccessible through the API and Orb dashboard. For hard-deletion,
   * please reach out to the Orb team directly.
   *
   * **Note**: This operation happens asynchronously and can be expected to take a
   * few minutes to propagate to related resources. However, querying for the
   * customer on subsequent GET requests while deletion is in process will reflect
   * its deletion with a `deleted: true` property. Once the customer deletion has
   * been fully processed, the customer will not be returned in the API.
   *
   * On successful processing, this returns an empty dictionary (`{}`) in the API.
   */
  delete(customerId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/customers/${customerId}`, {
      ...options,
      headers: { Accept: '', ...options?.headers },
    });
  }

  /**
   * This endpoint is used to fetch customer details given an identifier. If the
   * `Customer` is in the process of being deleted, only the properties `id` and
   * `deleted: true` will be returned.
   *
   * See the [Customer resource](../guides/core-concepts.mdx#customer) for a full
   * discussion of the Customer model.
   */
  fetch(customerId: string, options?: Core.RequestOptions): Core.APIPromise<Customer> {
    return this._client.get(`/customers/${customerId}`, options);
  }

  /**
   * This endpoint is used to fetch customer details given an `external_customer_id`
   * (see [Customer ID Aliases](../guides/events-and-metrics/customer-aliases)).
   *
   * Note that the resource and semantics of this endpoint exactly mirror
   * [Get Customer](fetch-customer).
   */
  fetchByExternalId(externalCustomerId: string, options?: Core.RequestOptions): Core.APIPromise<Customer> {
    return this._client.get(`/customers/external_customer_id/${externalCustomerId}`, options);
  }

  /**
   * This endpoint is used to update customer details given an `external_customer_id`
   * (see [Customer ID Aliases](../guides/events-and-metrics/customer-aliases)). Note
   * that the resource and semantics of this endpoint exactly mirror
   * [Update Customer](update-customer).
   */
  updateByExternalId(
    id: string,
    body?: CustomerUpdateByExternalIDParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Customer>;
  updateByExternalId(id: string, options?: Core.RequestOptions): Core.APIPromise<Customer>;
  updateByExternalId(
    id: string,
    body: CustomerUpdateByExternalIDParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Customer> {
    if (isRequestOptions(body)) {
      return this.updateByExternalId(id, {}, body);
    }
    return this._client.put(`/customers/external_customer_id/${id}`, { body, ...options });
  }
}

export class CustomersPage extends Page<Customer> {}

/**
 * A customer is a buyer of your products, and the other party to the billing
 * relationship.
 *
 * In Orb, customers are assigned system generated identifiers automatically, but
 * it's often desirable to have these match existing identifiers in your system. To
 * avoid having to denormalize Orb ID information, you can pass in an
 * `external_customer_id` with your own identifier. See
 * [Customer ID Aliases](../guides/events-and-metrics/customer-aliases) for further
 * information about how these aliases work in Orb.
 *
 * In addition to having an identifier in your system, a customer may exist in a
 * payment provider solution like Stripe. Use the `payment_provider_id` and the
 * `payment_provider` enum field to express this mapping.
 *
 * A customer also has a timezone (from the standard
 * [IANA timezone database](https://www.iana.org/time-zones)), which defaults to
 * your account's timezone. See
 * [Timezone localization](../guides/product-catalog/timezones.md) for information
 * on what this timezone parameter influences within Orb.
 */
export interface Customer {
  id: string;

  additional_emails: Array<string>;

  auto_collection: boolean;

  /**
   * The customer's current balance in their currency.
   */
  balance: string;

  billing_address: Customer.BillingAddress | null;

  created_at: string;

  currency: string | null;

  /**
   * A valid customer email, to be used for notifications. When Orb triggers payment
   * through a payment gateway, this email will be used for any automatically issued
   * receipts.
   */
  email: string;

  email_delivery: boolean;

  /**
   * An optional user-defined ID for this customer resource, used throughout the
   * system as an alias for this Customer. Use this field to identify a customer by
   * an existing identifier in your system.
   */
  external_customer_id: string | null;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The full name of the customer
   */
  name: string;

  /**
   * This is used for creating charges or invoices in an external system via Orb.
   * When not in test mode, the connection must first be configured in the Orb
   * webapp.
   */
  payment_provider: 'quickbooks' | 'bill.com' | 'stripe_charge' | 'stripe_invoice' | 'netsuite' | null;

  /**
   * The ID of this customer in an external payments solution, such as Stripe. This
   * is used for creating charges or invoices in the external system via Orb.
   */
  payment_provider_id: string | null;

  portal_url: string | null;

  shipping_address: Customer.ShippingAddress | null;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT number                                                                                     |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | Croatia              | `eu_vat`     | European VAT number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT number                                                                                     |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | Estonia              | `eu_vat`     | European VAT number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT number                                                                                     |
   * | France               | `eu_vat`     | European VAT number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary tax number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST number                                                                                  |
   * | Norway               | `no_vat`     | Norwegian VAT number                                                                                    |
   * | Philippines          | `ph_tin   `  | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT number                                                                                     |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia tax number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF number (previously Spanish CIF number)                                                      |
   * | Spain                | `eu_vat`     | European VAT number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   */
  tax_id: Customer.TaxID | null;

  /**
   * A timezone identifier from the IANA timezone database, such as
   * "America/Los_Angeles". This "defaults to your account's timezone if not set.
   * This cannot be changed after customer creation.
   */
  timezone: string;

  accounting_sync_configuration?: Customer.AccountingSyncConfiguration | null;

  reporting_configuration?: Customer.ReportingConfiguration | null;
}

export namespace Customer {
  export interface BillingAddress {
    city: string | null;

    country: string | null;

    line1: string | null;

    line2: string | null;

    postal_code: string | null;

    state: string | null;
  }

  export interface ShippingAddress {
    city: string | null;

    country: string | null;

    line1: string | null;

    line2: string | null;

    postal_code: string | null;

    state: string | null;
  }

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT number                                                                                     |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | Croatia              | `eu_vat`     | European VAT number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT number                                                                                     |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | Estonia              | `eu_vat`     | European VAT number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT number                                                                                     |
   * | France               | `eu_vat`     | European VAT number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary tax number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST number                                                                                  |
   * | Norway               | `no_vat`     | Norwegian VAT number                                                                                    |
   * | Philippines          | `ph_tin   `  | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT number                                                                                     |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia tax number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF number (previously Spanish CIF number)                                                      |
   * | Spain                | `eu_vat`     | European VAT number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   */
  export interface TaxID {
    country:
      | 'AE'
      | 'AT'
      | 'AU'
      | 'BE'
      | 'BG'
      | 'BR'
      | 'CA'
      | 'CH'
      | 'CL'
      | 'CY'
      | 'CZ'
      | 'DE'
      | 'DK'
      | 'EE'
      | 'EG'
      | 'ES'
      | 'EU'
      | 'FI'
      | 'FR'
      | 'GB'
      | 'GE'
      | 'GR'
      | 'HK'
      | 'HR'
      | 'HU'
      | 'ID'
      | 'IE'
      | 'IL'
      | 'IN'
      | 'IS'
      | 'IT'
      | 'JP'
      | 'KE'
      | 'KR'
      | 'LI'
      | 'LT'
      | 'LU'
      | 'LV'
      | 'MT'
      | 'MX'
      | 'MY'
      | 'NL'
      | 'NO'
      | 'NZ'
      | 'PH'
      | 'PL'
      | 'PT'
      | 'RO'
      | 'RU'
      | 'SA'
      | 'SE'
      | 'SG'
      | 'SI'
      | 'SK'
      | 'TH'
      | 'TR'
      | 'TW'
      | 'UA'
      | 'US'
      | 'ZA';

    type:
      | 'ae_trn'
      | 'eu_vat'
      | 'au_abn'
      | 'au_arn'
      | 'bg_uic'
      | 'br_cnpj'
      | 'br_cpf'
      | 'ca_bn'
      | 'ca_gst_hst'
      | 'ca_pst_bc'
      | 'ca_pst_mb'
      | 'ca_pst_sk'
      | 'ca_qst'
      | 'ch_vat'
      | 'cl_tin'
      | 'eg_tin'
      | 'es_cif'
      | 'eu_oss_vat'
      | 'gb_vat'
      | 'ge_vat'
      | 'hk_br'
      | 'hu_tin'
      | 'id_npwp'
      | 'il_vat'
      | 'in_gst'
      | 'is_vat'
      | 'jp_cn'
      | 'jp_rn'
      | 'jp_trn'
      | 'ke_pin'
      | 'kr_brn'
      | 'li_uid'
      | 'mx_rfc'
      | 'my_frp'
      | 'my_itn'
      | 'my_sst'
      | 'no_vat'
      | 'nz_gst'
      | 'ph_tin'
      | 'ru_inn'
      | 'ru_kpp'
      | 'sa_vat'
      | 'sg_gst'
      | 'sg_uen'
      | 'si_tin'
      | 'th_vat'
      | 'tr_tin'
      | 'tw_vat'
      | 'ua_vat'
      | 'us_ein'
      | 'za_vat';

    value: string;
  }

  export interface AccountingSyncConfiguration {
    accounting_providers: Array<AccountingSyncConfiguration.AccountingProvider>;

    excluded: boolean;
  }

  export namespace AccountingSyncConfiguration {
    export interface AccountingProvider {
      external_provider_id: string | null;

      provider_type: 'quickbooks' | 'netsuite';
    }
  }

  export interface ReportingConfiguration {
    exempt: boolean;
  }
}

export interface CustomerCreateParams {
  /**
   * A valid customer email, to be used for notifications. When Orb triggers payment
   * through a payment gateway, this email will be used for any automatically issued
   * receipts.
   */
  email: string;

  /**
   * The full name of the customer
   */
  name: string;

  accounting_sync_configuration?: CustomerCreateParams.AccountingSyncConfiguration | null;

  /**
   * Additional email addresses for this customer. If populated, these email
   * addresses will be CC'd for customer communications.
   */
  additional_emails?: Array<string> | null;

  /**
   * Used to determine if invoices for this customer will automatically attempt to
   * charge a saved payment method, if available. This parameter defaults to `True`
   * when a payment provider is provided on customer creation.
   */
  auto_collection?: boolean | null;

  billing_address?: CustomerCreateParams.BillingAddress | null;

  /**
   * An ISO 4217 currency string used for the customer's invoices and balance. If not
   * set at creation time, will be set at subscription creation time.
   */
  currency?: string | null;

  email_delivery?: boolean | null;

  /**
   * An optional user-defined ID for this customer resource, used throughout the
   * system as an alias for this Customer. Use this field to identify a customer by
   * an existing identifier in your system.
   */
  external_customer_id?: string | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;

  /**
   * This is used for creating charges or invoices in an external system via Orb.
   * When not in test mode, the connection must first be configured in the Orb
   * webapp.
   */
  payment_provider?: 'quickbooks' | 'bill.com' | 'stripe_charge' | 'stripe_invoice' | 'netsuite' | null;

  /**
   * The ID of this customer in an external payments solution, such as Stripe. This
   * is used for creating charges or invoices in the external system via Orb.
   */
  payment_provider_id?: string | null;

  reporting_configuration?: CustomerCreateParams.ReportingConfiguration | null;

  shipping_address?: CustomerCreateParams.ShippingAddress | null;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT number                                                                                     |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | Croatia              | `eu_vat`     | European VAT number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT number                                                                                     |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | Estonia              | `eu_vat`     | European VAT number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT number                                                                                     |
   * | France               | `eu_vat`     | European VAT number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary tax number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST number                                                                                  |
   * | Norway               | `no_vat`     | Norwegian VAT number                                                                                    |
   * | Philippines          | `ph_tin   `  | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT number                                                                                     |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia tax number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF number (previously Spanish CIF number)                                                      |
   * | Spain                | `eu_vat`     | European VAT number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   */
  tax_id?: CustomerCreateParams.TaxID | null;

  /**
   * A timezone identifier from the IANA timezone database, such as
   * `"America/Los_Angeles"`. This defaults to your account's timezone if not set.
   * This cannot be changed after customer creation.
   */
  timezone?: string | null;
}

export namespace CustomerCreateParams {
  export interface AccountingSyncConfiguration {
    accounting_providers?: Array<AccountingSyncConfiguration.AccountingProvider> | null;

    excluded?: boolean | null;
  }

  export namespace AccountingSyncConfiguration {
    export interface AccountingProvider {
      external_provider_id: string;

      provider_type: string;
    }
  }

  export interface BillingAddress {
    city?: string | null;

    country?: string | null;

    line1?: string | null;

    line2?: string | null;

    postal_code?: string | null;

    state?: string | null;
  }

  export interface ReportingConfiguration {
    exempt: boolean;
  }

  export interface ShippingAddress {
    city?: string | null;

    country?: string | null;

    line1?: string | null;

    line2?: string | null;

    postal_code?: string | null;

    state?: string | null;
  }

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT number                                                                                     |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | Croatia              | `eu_vat`     | European VAT number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT number                                                                                     |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | Estonia              | `eu_vat`     | European VAT number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT number                                                                                     |
   * | France               | `eu_vat`     | European VAT number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary tax number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST number                                                                                  |
   * | Norway               | `no_vat`     | Norwegian VAT number                                                                                    |
   * | Philippines          | `ph_tin   `  | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT number                                                                                     |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia tax number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF number (previously Spanish CIF number)                                                      |
   * | Spain                | `eu_vat`     | European VAT number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   */
  export interface TaxID {
    country:
      | 'AE'
      | 'AT'
      | 'AU'
      | 'BE'
      | 'BG'
      | 'BR'
      | 'CA'
      | 'CH'
      | 'CL'
      | 'CY'
      | 'CZ'
      | 'DE'
      | 'DK'
      | 'EE'
      | 'EG'
      | 'ES'
      | 'EU'
      | 'FI'
      | 'FR'
      | 'GB'
      | 'GE'
      | 'GR'
      | 'HK'
      | 'HR'
      | 'HU'
      | 'ID'
      | 'IE'
      | 'IL'
      | 'IN'
      | 'IS'
      | 'IT'
      | 'JP'
      | 'KE'
      | 'KR'
      | 'LI'
      | 'LT'
      | 'LU'
      | 'LV'
      | 'MT'
      | 'MX'
      | 'MY'
      | 'NL'
      | 'NO'
      | 'NZ'
      | 'PH'
      | 'PL'
      | 'PT'
      | 'RO'
      | 'RU'
      | 'SA'
      | 'SE'
      | 'SG'
      | 'SI'
      | 'SK'
      | 'TH'
      | 'TR'
      | 'TW'
      | 'UA'
      | 'US'
      | 'ZA';

    type:
      | 'ae_trn'
      | 'eu_vat'
      | 'au_abn'
      | 'au_arn'
      | 'bg_uic'
      | 'br_cnpj'
      | 'br_cpf'
      | 'ca_bn'
      | 'ca_gst_hst'
      | 'ca_pst_bc'
      | 'ca_pst_mb'
      | 'ca_pst_sk'
      | 'ca_qst'
      | 'ch_vat'
      | 'cl_tin'
      | 'eg_tin'
      | 'es_cif'
      | 'eu_oss_vat'
      | 'gb_vat'
      | 'ge_vat'
      | 'hk_br'
      | 'hu_tin'
      | 'id_npwp'
      | 'il_vat'
      | 'in_gst'
      | 'is_vat'
      | 'jp_cn'
      | 'jp_rn'
      | 'jp_trn'
      | 'ke_pin'
      | 'kr_brn'
      | 'li_uid'
      | 'mx_rfc'
      | 'my_frp'
      | 'my_itn'
      | 'my_sst'
      | 'no_vat'
      | 'nz_gst'
      | 'ph_tin'
      | 'ru_inn'
      | 'ru_kpp'
      | 'sa_vat'
      | 'sg_gst'
      | 'sg_uen'
      | 'si_tin'
      | 'th_vat'
      | 'tr_tin'
      | 'tw_vat'
      | 'ua_vat'
      | 'us_ein'
      | 'za_vat';

    value: string;
  }
}

export interface CustomerUpdateParams {
  accounting_sync_configuration?: CustomerUpdateParams.AccountingSyncConfiguration | null;

  /**
   * Additional email addresses for this customer. If populated, these email
   * addresses will be CC'd for customer communications.
   */
  additional_emails?: Array<string> | null;

  /**
   * Used to determine if invoices for this customer will automatically attempt to
   * charge a saved payment method, if available. This parameter defaults to `True`
   * when a payment provider is provided on customer creation.
   */
  auto_collection?: boolean | null;

  billing_address?: CustomerUpdateParams.BillingAddress | null;

  /**
   * An ISO 4217 currency string used for the customer's invoices and balance. If not
   * set at creation time, will be set at subscription creation time.
   */
  currency?: string | null;

  /**
   * A valid customer email, to be used for invoicing and notifications.
   */
  email?: string | null;

  email_delivery?: boolean | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;

  /**
   * The full name of the customer
   */
  name?: string | null;

  /**
   * This is used for creating charges or invoices in an external system via Orb.
   * When not in test mode:
   *
   * - the connection must first be configured in the Orb webapp.
   * - if the provider is an invoicing provider (`stripe_invoice`, `quickbooks`,
   *   `bill.com`, `netsuite`), any product mappings must first be configured with
   *   the Orb team.
   */
  payment_provider?: 'quickbooks' | 'bill.com' | 'stripe_charge' | 'stripe_invoice' | 'netsuite' | null;

  /**
   * The ID of this customer in an external payments solution, such as Stripe. This
   * is used for creating charges or invoices in the external system via Orb.
   */
  payment_provider_id?: string | null;

  reporting_configuration?: CustomerUpdateParams.ReportingConfiguration | null;

  shipping_address?: CustomerUpdateParams.ShippingAddress | null;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT number                                                                                     |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | Croatia              | `eu_vat`     | European VAT number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT number                                                                                     |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | Estonia              | `eu_vat`     | European VAT number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT number                                                                                     |
   * | France               | `eu_vat`     | European VAT number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary tax number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST number                                                                                  |
   * | Norway               | `no_vat`     | Norwegian VAT number                                                                                    |
   * | Philippines          | `ph_tin   `  | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT number                                                                                     |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia tax number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF number (previously Spanish CIF number)                                                      |
   * | Spain                | `eu_vat`     | European VAT number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   */
  tax_id?: CustomerUpdateParams.TaxID | null;
}

export namespace CustomerUpdateParams {
  export interface AccountingSyncConfiguration {
    accounting_providers?: Array<AccountingSyncConfiguration.AccountingProvider> | null;

    excluded?: boolean | null;
  }

  export namespace AccountingSyncConfiguration {
    export interface AccountingProvider {
      external_provider_id: string;

      provider_type: string;
    }
  }

  export interface BillingAddress {
    city?: string | null;

    country?: string | null;

    line1?: string | null;

    line2?: string | null;

    postal_code?: string | null;

    state?: string | null;
  }

  export interface ReportingConfiguration {
    exempt: boolean;
  }

  export interface ShippingAddress {
    city?: string | null;

    country?: string | null;

    line1?: string | null;

    line2?: string | null;

    postal_code?: string | null;

    state?: string | null;
  }

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT number                                                                                     |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | Croatia              | `eu_vat`     | European VAT number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT number                                                                                     |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | Estonia              | `eu_vat`     | European VAT number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT number                                                                                     |
   * | France               | `eu_vat`     | European VAT number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary tax number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST number                                                                                  |
   * | Norway               | `no_vat`     | Norwegian VAT number                                                                                    |
   * | Philippines          | `ph_tin   `  | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT number                                                                                     |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia tax number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF number (previously Spanish CIF number)                                                      |
   * | Spain                | `eu_vat`     | European VAT number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   */
  export interface TaxID {
    country:
      | 'AE'
      | 'AT'
      | 'AU'
      | 'BE'
      | 'BG'
      | 'BR'
      | 'CA'
      | 'CH'
      | 'CL'
      | 'CY'
      | 'CZ'
      | 'DE'
      | 'DK'
      | 'EE'
      | 'EG'
      | 'ES'
      | 'EU'
      | 'FI'
      | 'FR'
      | 'GB'
      | 'GE'
      | 'GR'
      | 'HK'
      | 'HR'
      | 'HU'
      | 'ID'
      | 'IE'
      | 'IL'
      | 'IN'
      | 'IS'
      | 'IT'
      | 'JP'
      | 'KE'
      | 'KR'
      | 'LI'
      | 'LT'
      | 'LU'
      | 'LV'
      | 'MT'
      | 'MX'
      | 'MY'
      | 'NL'
      | 'NO'
      | 'NZ'
      | 'PH'
      | 'PL'
      | 'PT'
      | 'RO'
      | 'RU'
      | 'SA'
      | 'SE'
      | 'SG'
      | 'SI'
      | 'SK'
      | 'TH'
      | 'TR'
      | 'TW'
      | 'UA'
      | 'US'
      | 'ZA';

    type:
      | 'ae_trn'
      | 'eu_vat'
      | 'au_abn'
      | 'au_arn'
      | 'bg_uic'
      | 'br_cnpj'
      | 'br_cpf'
      | 'ca_bn'
      | 'ca_gst_hst'
      | 'ca_pst_bc'
      | 'ca_pst_mb'
      | 'ca_pst_sk'
      | 'ca_qst'
      | 'ch_vat'
      | 'cl_tin'
      | 'eg_tin'
      | 'es_cif'
      | 'eu_oss_vat'
      | 'gb_vat'
      | 'ge_vat'
      | 'hk_br'
      | 'hu_tin'
      | 'id_npwp'
      | 'il_vat'
      | 'in_gst'
      | 'is_vat'
      | 'jp_cn'
      | 'jp_rn'
      | 'jp_trn'
      | 'ke_pin'
      | 'kr_brn'
      | 'li_uid'
      | 'mx_rfc'
      | 'my_frp'
      | 'my_itn'
      | 'my_sst'
      | 'no_vat'
      | 'nz_gst'
      | 'ph_tin'
      | 'ru_inn'
      | 'ru_kpp'
      | 'sa_vat'
      | 'sg_gst'
      | 'sg_uen'
      | 'si_tin'
      | 'th_vat'
      | 'tr_tin'
      | 'tw_vat'
      | 'ua_vat'
      | 'us_ein'
      | 'za_vat';

    value: string;
  }
}

export interface CustomerListParams extends PageParams {
  'created_at[gt]'?: string | null;

  'created_at[gte]'?: string | null;

  'created_at[lt]'?: string | null;

  'created_at[lte]'?: string | null;
}

export interface CustomerUpdateByExternalIDParams {
  accounting_sync_configuration?: CustomerUpdateByExternalIDParams.AccountingSyncConfiguration | null;

  /**
   * Additional email addresses for this customer. If populated, these email
   * addresses will be CC'd for customer communications.
   */
  additional_emails?: Array<string> | null;

  /**
   * Used to determine if invoices for this customer will automatically attempt to
   * charge a saved payment method, if available. This parameter defaults to `True`
   * when a payment provider is provided on customer creation.
   */
  auto_collection?: boolean | null;

  billing_address?: CustomerUpdateByExternalIDParams.BillingAddress | null;

  /**
   * An ISO 4217 currency string used for the customer's invoices and balance. If not
   * set at creation time, will be set at subscription creation time.
   */
  currency?: string | null;

  /**
   * A valid customer email, to be used for invoicing and notifications.
   */
  email?: string | null;

  email_delivery?: boolean | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;

  /**
   * The full name of the customer
   */
  name?: string | null;

  /**
   * This is used for creating charges or invoices in an external system via Orb.
   * When not in test mode:
   *
   * - the connection must first be configured in the Orb webapp.
   * - if the provider is an invoicing provider (`stripe_invoice`, `quickbooks`,
   *   `bill.com`, `netsuite`), any product mappings must first be configured with
   *   the Orb team.
   */
  payment_provider?: 'quickbooks' | 'bill.com' | 'stripe_charge' | 'stripe_invoice' | 'netsuite' | null;

  /**
   * The ID of this customer in an external payments solution, such as Stripe. This
   * is used for creating charges or invoices in the external system via Orb.
   */
  payment_provider_id?: string | null;

  reporting_configuration?: CustomerUpdateByExternalIDParams.ReportingConfiguration | null;

  shipping_address?: CustomerUpdateByExternalIDParams.ShippingAddress | null;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT number                                                                                     |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | Croatia              | `eu_vat`     | European VAT number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT number                                                                                     |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | Estonia              | `eu_vat`     | European VAT number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT number                                                                                     |
   * | France               | `eu_vat`     | European VAT number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary tax number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST number                                                                                  |
   * | Norway               | `no_vat`     | Norwegian VAT number                                                                                    |
   * | Philippines          | `ph_tin   `  | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT number                                                                                     |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia tax number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF number (previously Spanish CIF number)                                                      |
   * | Spain                | `eu_vat`     | European VAT number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   */
  tax_id?: CustomerUpdateByExternalIDParams.TaxID | null;
}

export namespace CustomerUpdateByExternalIDParams {
  export interface AccountingSyncConfiguration {
    accounting_providers?: Array<AccountingSyncConfiguration.AccountingProvider> | null;

    excluded?: boolean | null;
  }

  export namespace AccountingSyncConfiguration {
    export interface AccountingProvider {
      external_provider_id: string;

      provider_type: string;
    }
  }

  export interface BillingAddress {
    city?: string | null;

    country?: string | null;

    line1?: string | null;

    line2?: string | null;

    postal_code?: string | null;

    state?: string | null;
  }

  export interface ReportingConfiguration {
    exempt: boolean;
  }

  export interface ShippingAddress {
    city?: string | null;

    country?: string | null;

    line1?: string | null;

    line2?: string | null;

    postal_code?: string | null;

    state?: string | null;
  }

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT number                                                                                     |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | Croatia              | `eu_vat`     | European VAT number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT number                                                                                     |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | Estonia              | `eu_vat`     | European VAT number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT number                                                                                     |
   * | France               | `eu_vat`     | European VAT number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary tax number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST number                                                                                  |
   * | Norway               | `no_vat`     | Norwegian VAT number                                                                                    |
   * | Philippines          | `ph_tin   `  | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT number                                                                                     |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia tax number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF number (previously Spanish CIF number)                                                      |
   * | Spain                | `eu_vat`     | European VAT number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   */
  export interface TaxID {
    country:
      | 'AE'
      | 'AT'
      | 'AU'
      | 'BE'
      | 'BG'
      | 'BR'
      | 'CA'
      | 'CH'
      | 'CL'
      | 'CY'
      | 'CZ'
      | 'DE'
      | 'DK'
      | 'EE'
      | 'EG'
      | 'ES'
      | 'EU'
      | 'FI'
      | 'FR'
      | 'GB'
      | 'GE'
      | 'GR'
      | 'HK'
      | 'HR'
      | 'HU'
      | 'ID'
      | 'IE'
      | 'IL'
      | 'IN'
      | 'IS'
      | 'IT'
      | 'JP'
      | 'KE'
      | 'KR'
      | 'LI'
      | 'LT'
      | 'LU'
      | 'LV'
      | 'MT'
      | 'MX'
      | 'MY'
      | 'NL'
      | 'NO'
      | 'NZ'
      | 'PH'
      | 'PL'
      | 'PT'
      | 'RO'
      | 'RU'
      | 'SA'
      | 'SE'
      | 'SG'
      | 'SI'
      | 'SK'
      | 'TH'
      | 'TR'
      | 'TW'
      | 'UA'
      | 'US'
      | 'ZA';

    type:
      | 'ae_trn'
      | 'eu_vat'
      | 'au_abn'
      | 'au_arn'
      | 'bg_uic'
      | 'br_cnpj'
      | 'br_cpf'
      | 'ca_bn'
      | 'ca_gst_hst'
      | 'ca_pst_bc'
      | 'ca_pst_mb'
      | 'ca_pst_sk'
      | 'ca_qst'
      | 'ch_vat'
      | 'cl_tin'
      | 'eg_tin'
      | 'es_cif'
      | 'eu_oss_vat'
      | 'gb_vat'
      | 'ge_vat'
      | 'hk_br'
      | 'hu_tin'
      | 'id_npwp'
      | 'il_vat'
      | 'in_gst'
      | 'is_vat'
      | 'jp_cn'
      | 'jp_rn'
      | 'jp_trn'
      | 'ke_pin'
      | 'kr_brn'
      | 'li_uid'
      | 'mx_rfc'
      | 'my_frp'
      | 'my_itn'
      | 'my_sst'
      | 'no_vat'
      | 'nz_gst'
      | 'ph_tin'
      | 'ru_inn'
      | 'ru_kpp'
      | 'sa_vat'
      | 'sg_gst'
      | 'sg_uen'
      | 'si_tin'
      | 'th_vat'
      | 'tr_tin'
      | 'tw_vat'
      | 'ua_vat'
      | 'us_ein'
      | 'za_vat';

    value: string;
  }
}

export namespace Customers {
  export import Customer = CustomersAPI.Customer;
  export import CustomersPage = CustomersAPI.CustomersPage;
  export import CustomerCreateParams = CustomersAPI.CustomerCreateParams;
  export import CustomerUpdateParams = CustomersAPI.CustomerUpdateParams;
  export import CustomerListParams = CustomersAPI.CustomerListParams;
  export import CustomerUpdateByExternalIDParams = CustomersAPI.CustomerUpdateByExternalIDParams;
  export import Costs = CostsAPI.Costs;
  export import CostListResponse = CostsAPI.CostListResponse;
  export import CostListByExternalIDResponse = CostsAPI.CostListByExternalIDResponse;
  export import CostListParams = CostsAPI.CostListParams;
  export import CostListByExternalIDParams = CostsAPI.CostListByExternalIDParams;
  export import Usage = UsageAPI.Usage;
  export import UsageUpdateResponse = UsageAPI.UsageUpdateResponse;
  export import UsageUpdateByExternalIDResponse = UsageAPI.UsageUpdateByExternalIDResponse;
  export import UsageUpdateParams = UsageAPI.UsageUpdateParams;
  export import UsageUpdateByExternalIDParams = UsageAPI.UsageUpdateByExternalIDParams;
  export import Credits = CreditsAPI.Credits;
  export import CreditListResponse = CreditsAPI.CreditListResponse;
  export import CreditListByExternalIDResponse = CreditsAPI.CreditListByExternalIDResponse;
  export import CreditListResponsesPage = CreditsAPI.CreditListResponsesPage;
  export import CreditListByExternalIDResponsesPage = CreditsAPI.CreditListByExternalIDResponsesPage;
  export import CreditListParams = CreditsAPI.CreditListParams;
  export import CreditListByExternalIDParams = CreditsAPI.CreditListByExternalIDParams;
  export import BalanceTransactions = BalanceTransactionsAPI.BalanceTransactions;
  export import BalanceTransactionCreateResponse = BalanceTransactionsAPI.BalanceTransactionCreateResponse;
  export import BalanceTransactionListResponse = BalanceTransactionsAPI.BalanceTransactionListResponse;
  export import BalanceTransactionListResponsesPage = BalanceTransactionsAPI.BalanceTransactionListResponsesPage;
  export import BalanceTransactionCreateParams = BalanceTransactionsAPI.BalanceTransactionCreateParams;
  export import BalanceTransactionListParams = BalanceTransactionsAPI.BalanceTransactionListParams;
}
