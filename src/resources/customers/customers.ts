// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as Shared from '../shared';
import * as BalanceTransactionsAPI from './balance-transactions';
import {
  BalanceTransactionCreateParams,
  BalanceTransactionCreateResponse,
  BalanceTransactionListParams,
  BalanceTransactionListResponse,
  BalanceTransactionListResponsesPage,
  BalanceTransactions,
} from './balance-transactions';
import * as CostsAPI from './costs';
import {
  CostListByExternalIDParams,
  CostListByExternalIDResponse,
  CostListParams,
  CostListResponse,
  Costs,
} from './costs';
import * as CreditsAPI from './credits/credits';
import {
  CreditListByExternalIDParams,
  CreditListByExternalIDResponse,
  CreditListByExternalIDResponsesPage,
  CreditListParams,
  CreditListResponse,
  CreditListResponsesPage,
  Credits,
} from './credits/credits';
import { Page, type PageParams } from '../../pagination';

export class Customers extends APIResource {
  costs: CostsAPI.Costs = new CostsAPI.Costs(this._client);
  credits: CreditsAPI.Credits = new CreditsAPI.Credits(this._client);
  balanceTransactions: BalanceTransactionsAPI.BalanceTransactions =
    new BalanceTransactionsAPI.BalanceTransactions(this._client);

  /**
   * This operation is used to create an Orb customer, who is party to the core
   * billing relationship. See [Customer](/core-concepts##customer) for an overview
   * of the customer resource.
   *
   * This endpoint is critical in the following Orb functionality:
   *
   * - Automated charges can be configured by setting `payment_provider` and
   *   `payment_provider_id` to automatically issue invoices
   * - [Customer ID Aliases](/events-and-metrics/customer-aliases) can be configured
   *   by setting `external_customer_id`
   * - [Timezone localization](/essentials/timezones) can be configured on a
   *   per-customer basis by setting the `timezone` parameter
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
    body: CustomerUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Customer> {
    return this._client.put(`/customers/${customerId}`, { body, ...options });
  }

  /**
   * This endpoint returns a list of all customers for an account. The list of
   * customers is ordered starting from the most recently created customer. This
   * endpoint follows Orb's
   * [standardized pagination format](/api-reference/pagination).
   *
   * See [Customer](/core-concepts##customer) for an overview of the customer model.
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
   * This performs a deletion of this customer, its subscriptions, and its invoices,
   * provided the customer does not have any issued invoices. Customers with issued
   * invoices cannot be deleted. This operation is irreversible. Note that this is a
   * _soft_ deletion, but the data will be inaccessible through the API and Orb
   * dashboard.
   *
   * For a hard-deletion, please reach out to the Orb team directly.
   *
   * **Note**: This operation happens asynchronously and can be expected to take a
   * few minutes to propagate to related resources. However, querying for the
   * customer on subsequent GET requests while deletion is in process will reflect
   * its deletion.
   */
  delete(customerId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/customers/${customerId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * This endpoint is used to fetch customer details given an identifier. If the
   * `Customer` is in the process of being deleted, only the properties `id` and
   * `deleted: true` will be returned.
   *
   * See the [Customer resource](/core-concepts#customer) for a full discussion of
   * the Customer model.
   */
  fetch(customerId: string, options?: Core.RequestOptions): Core.APIPromise<Customer> {
    return this._client.get(`/customers/${customerId}`, options);
  }

  /**
   * This endpoint is used to fetch customer details given an `external_customer_id`
   * (see [Customer ID Aliases](/events-and-metrics/customer-aliases)).
   *
   * Note that the resource and semantics of this endpoint exactly mirror
   * [Get Customer](fetch-customer).
   */
  fetchByExternalId(externalCustomerId: string, options?: Core.RequestOptions): Core.APIPromise<Customer> {
    return this._client.get(`/customers/external_customer_id/${externalCustomerId}`, options);
  }

  /**
   * Sync Orb's payment methods for the customer with their gateway.
   *
   * This method can be called before taking an action that may cause the customer to
   * be charged, ensuring that the most up-to-date payment method is charged.
   *
   * **Note**: This functionality is currently only available for Stripe.
   */
  syncPaymentMethodsFromGateway(customerId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post(`/customers/${customerId}/sync_payment_methods_from_gateway`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Sync Orb's payment methods for the customer with their gateway.
   *
   * This method can be called before taking an action that may cause the customer to
   * be charged, ensuring that the most up-to-date payment method is charged.
   *
   * **Note**: This functionality is currently only available for Stripe.
   */
  syncPaymentMethodsFromGatewayByExternalCustomerId(
    externalCustomerId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.post(
      `/customers/external_customer_id/${externalCustomerId}/sync_payment_methods_from_gateway`,
      { ...options, headers: { Accept: '*/*', ...options?.headers } },
    );
  }

  /**
   * This endpoint is used to update customer details given an `external_customer_id`
   * (see [Customer ID Aliases](/events-and-metrics/customer-aliases)). Note that the
   * resource and semantics of this endpoint exactly mirror
   * [Update Customer](update-customer).
   */
  updateByExternalId(
    id: string,
    body: CustomerUpdateByExternalIDParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Customer> {
    return this._client.put(`/customers/external_customer_id/${id}`, { body, ...options });
  }
}

export class CustomersPage extends Page<Customer> {}

export interface AccountingProviderConfig {
  external_provider_id: string;

  provider_type: string;
}

export interface AddressInput {
  city?: string | null;

  country?: string | null;

  line1?: string | null;

  line2?: string | null;

  postal_code?: string | null;

  state?: string | null;
}

/**
 * A customer is a buyer of your products, and the other party to the billing
 * relationship.
 *
 * In Orb, customers are assigned system generated identifiers automatically, but
 * it's often desirable to have these match existing identifiers in your system. To
 * avoid having to denormalize Orb ID information, you can pass in an
 * `external_customer_id` with your own identifier. See
 * [Customer ID Aliases](/events-and-metrics/customer-aliases) for further
 * information about how these aliases work in Orb.
 *
 * In addition to having an identifier in your system, a customer may exist in a
 * payment provider solution like Stripe. Use the `payment_provider_id` and the
 * `payment_provider` enum field to express this mapping.
 *
 * A customer also has a timezone (from the standard
 * [IANA timezone database](https://www.iana.org/time-zones)), which defaults to
 * your account's timezone. See [Timezone localization](/essentials/timezones) for
 * information on what this timezone parameter influences within Orb.
 */
export interface Customer {
  id: string;

  additional_emails: Array<string>;

  auto_collection: boolean;

  /**
   * Whether invoices for this customer should be automatically issued. If true,
   * invoices will be automatically issued. If false, invoices will require manual
   * approval. If null, inherits the account-level setting.
   */
  auto_issuance: boolean | null;

  /**
   * The customer's current balance in their currency.
   */
  balance: string;

  billing_address: Shared.Address | null;

  created_at: string;

  currency: string | null;

  /**
   * A valid customer email, to be used for notifications. When Orb triggers payment
   * through a payment gateway, this email will be used for any automatically issued
   * receipts.
   */
  email: string;

  email_delivery: boolean;

  exempt_from_automated_tax: boolean | null;

  /**
   * An optional user-defined ID for this customer resource, used throughout the
   * system as an alias for this Customer. Use this field to identify a customer by
   * an existing identifier in your system.
   */
  external_customer_id: string | null;

  /**
   * The hierarchical relationships for this customer.
   */
  hierarchy: Customer.Hierarchy;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: { [key: string]: string };

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

  shipping_address: Shared.Address | null;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country                | Type         | Description                                                                                             |
   * | ---------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Albania                | `al_tin`     | Albania Tax Identification Number                                                                       |
   * | Andorra                | `ad_nrt`     | Andorran NRT Number                                                                                     |
   * | Angola                 | `ao_tin`     | Angola Tax Identification Number                                                                        |
   * | Argentina              | `ar_cuit`    | Argentinian Tax ID Number                                                                               |
   * | Armenia                | `am_tin`     | Armenia Tax Identification Number                                                                       |
   * | Aruba                  | `aw_tin`     | Aruba Tax Identification Number                                                                         |
   * | Australia              | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia              | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria                | `eu_vat`     | European VAT Number                                                                                     |
   * | Azerbaijan             | `az_tin`     | Azerbaijan Tax Identification Number                                                                    |
   * | Bahamas                | `bs_tin`     | Bahamas Tax Identification Number                                                                       |
   * | Bahrain                | `bh_vat`     | Bahraini VAT Number                                                                                     |
   * | Bangladesh             | `bd_bin`     | Bangladesh Business Identification Number                                                               |
   * | Barbados               | `bb_tin`     | Barbados Tax Identification Number                                                                      |
   * | Belarus                | `by_tin`     | Belarus TIN Number                                                                                      |
   * | Belgium                | `eu_vat`     | European VAT Number                                                                                     |
   * | Benin                  | `bj_ifu`     | Benin Tax Identification Number (Identifiant Fiscal Unique)                                             |
   * | Bolivia                | `bo_tin`     | Bolivian Tax ID                                                                                         |
   * | Bosnia and Herzegovina | `ba_tin`     | Bosnia and Herzegovina Tax Identification Number                                                        |
   * | Brazil                 | `br_cnpj`    | Brazilian CNPJ Number                                                                                   |
   * | Brazil                 | `br_cpf`     | Brazilian CPF Number                                                                                    |
   * | Bulgaria               | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria               | `eu_vat`     | European VAT Number                                                                                     |
   * | Burkina Faso           | `bf_ifu`     | Burkina Faso Tax Identification Number (Numéro d'Identifiant Fiscal Unique)                             |
   * | Cambodia               | `kh_tin`     | Cambodia Tax Identification Number                                                                      |
   * | Cameroon               | `cm_niu`     | Cameroon Tax Identification Number (Numéro d'Identifiant fiscal Unique)                                 |
   * | Canada                 | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada                 | `ca_gst_hst` | Canadian GST/HST Number                                                                                 |
   * | Canada                 | `ca_pst_bc`  | Canadian PST Number (British Columbia)                                                                  |
   * | Canada                 | `ca_pst_mb`  | Canadian PST Number (Manitoba)                                                                          |
   * | Canada                 | `ca_pst_sk`  | Canadian PST Number (Saskatchewan)                                                                      |
   * | Canada                 | `ca_qst`     | Canadian QST Number (Québec)                                                                            |
   * | Cape Verde             | `cv_nif`     | Cape Verde Tax Identification Number (Número de Identificação Fiscal)                                   |
   * | Chile                  | `cl_tin`     | Chilean TIN                                                                                             |
   * | China                  | `cn_tin`     | Chinese Tax ID                                                                                          |
   * | Colombia               | `co_nit`     | Colombian NIT Number                                                                                    |
   * | Congo-Kinshasa         | `cd_nif`     | Congo (DR) Tax Identification Number (Número de Identificação Fiscal)                                   |
   * | Costa Rica             | `cr_tin`     | Costa Rican Tax ID                                                                                      |
   * | Croatia                | `eu_vat`     | European VAT Number                                                                                     |
   * | Croatia                | `hr_oib`     | Croatian Personal Identification Number (OIB)                                                           |
   * | Cyprus                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Czech Republic         | `eu_vat`     | European VAT Number                                                                                     |
   * | Denmark                | `eu_vat`     | European VAT Number                                                                                     |
   * | Dominican Republic     | `do_rcn`     | Dominican RCN Number                                                                                    |
   * | Ecuador                | `ec_ruc`     | Ecuadorian RUC Number                                                                                   |
   * | Egypt                  | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | El Salvador            | `sv_nit`     | El Salvadorian NIT Number                                                                               |
   * | Estonia                | `eu_vat`     | European VAT Number                                                                                     |
   * | Ethiopia               | `et_tin`     | Ethiopia Tax Identification Number                                                                      |
   * | European Union         | `eu_oss_vat` | European One Stop Shop VAT Number for non-Union scheme                                                  |
   * | Finland                | `eu_vat`     | European VAT Number                                                                                     |
   * | France                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Georgia                | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany                | `de_stn`     | German Tax Number (Steuernummer)                                                                        |
   * | Germany                | `eu_vat`     | European VAT Number                                                                                     |
   * | Greece                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Guinea                 | `gn_nif`     | Guinea Tax Identification Number (Número de Identificação Fiscal)                                       |
   * | Hong Kong              | `hk_br`      | Hong Kong BR Number                                                                                     |
   * | Hungary                | `eu_vat`     | European VAT Number                                                                                     |
   * | Hungary                | `hu_tin`     | Hungary Tax Number (adószám)                                                                            |
   * | Iceland                | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                  | `in_gst`     | Indian GST Number                                                                                       |
   * | Indonesia              | `id_npwp`    | Indonesian NPWP Number                                                                                  |
   * | Ireland                | `eu_vat`     | European VAT Number                                                                                     |
   * | Israel                 | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                  | `eu_vat`     | European VAT Number                                                                                     |
   * | Japan                  | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                  | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                  | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kazakhstan             | `kz_bin`     | Kazakhstani Business Identification Number                                                              |
   * | Kenya                  | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Kyrgyzstan             | `kg_tin`     | Kyrgyzstan Tax Identification Number                                                                    |
   * | Laos                   | `la_tin`     | Laos Tax Identification Number                                                                          |
   * | Latvia                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Liechtenstein          | `li_uid`     | Liechtensteinian UID Number                                                                             |
   * | Liechtenstein          | `li_vat`     | Liechtenstein VAT Number                                                                                |
   * | Lithuania              | `eu_vat`     | European VAT Number                                                                                     |
   * | Luxembourg             | `eu_vat`     | European VAT Number                                                                                     |
   * | Malaysia               | `my_frp`     | Malaysian FRP Number                                                                                    |
   * | Malaysia               | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia               | `my_sst`     | Malaysian SST Number                                                                                    |
   * | Malta                  | `eu_vat`     | European VAT Number                                                                                     |
   * | Mauritania             | `mr_nif`     | Mauritania Tax Identification Number (Número de Identificação Fiscal)                                   |
   * | Mexico                 | `mx_rfc`     | Mexican RFC Number                                                                                      |
   * | Moldova                | `md_vat`     | Moldova VAT Number                                                                                      |
   * | Montenegro             | `me_pib`     | Montenegro PIB Number                                                                                   |
   * | Morocco                | `ma_vat`     | Morocco VAT Number                                                                                      |
   * | Nepal                  | `np_pan`     | Nepal PAN Number                                                                                        |
   * | Netherlands            | `eu_vat`     | European VAT Number                                                                                     |
   * | New Zealand            | `nz_gst`     | New Zealand GST Number                                                                                  |
   * | Nigeria                | `ng_tin`     | Nigerian Tax Identification Number                                                                      |
   * | North Macedonia        | `mk_vat`     | North Macedonia VAT Number                                                                              |
   * | Northern Ireland       | `eu_vat`     | Northern Ireland VAT Number                                                                             |
   * | Norway                 | `no_vat`     | Norwegian VAT Number                                                                                    |
   * | Norway                 | `no_voec`    | Norwegian VAT on e-commerce Number                                                                      |
   * | Oman                   | `om_vat`     | Omani VAT Number                                                                                        |
   * | Peru                   | `pe_ruc`     | Peruvian RUC Number                                                                                     |
   * | Philippines            | `ph_tin`     | Philippines Tax Identification Number                                                                   |
   * | Poland                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Portugal               | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania                | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania                | `ro_tin`     | Romanian Tax ID Number                                                                                  |
   * | Russia                 | `ru_inn`     | Russian INN                                                                                             |
   * | Russia                 | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia           | `sa_vat`     | Saudi Arabia VAT                                                                                        |
   * | Senegal                | `sn_ninea`   | Senegal NINEA Number                                                                                    |
   * | Serbia                 | `rs_pib`     | Serbian PIB Number                                                                                      |
   * | Singapore              | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore              | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia               | `si_tin`     | Slovenia Tax Number (davčna številka)                                                                   |
   * | South Africa           | `za_vat`     | South African VAT Number                                                                                |
   * | South Korea            | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                  | `es_cif`     | Spanish NIF Number (previously Spanish CIF Number)                                                      |
   * | Spain                  | `eu_vat`     | European VAT Number                                                                                     |
   * | Suriname               | `sr_fin`     | Suriname FIN Number                                                                                     |
   * | Sweden                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Switzerland            | `ch_uid`     | Switzerland UID Number                                                                                  |
   * | Switzerland            | `ch_vat`     | Switzerland VAT Number                                                                                  |
   * | Taiwan                 | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Tajikistan             | `tj_tin`     | Tajikistan Tax Identification Number                                                                    |
   * | Tanzania               | `tz_vat`     | Tanzania VAT Number                                                                                     |
   * | Thailand               | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey                 | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Uganda                 | `ug_tin`     | Uganda Tax Identification Number                                                                        |
   * | Ukraine                | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates   | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom         | `gb_vat`     | United Kingdom VAT Number                                                                               |
   * | United States          | `us_ein`     | United States EIN                                                                                       |
   * | Uruguay                | `uy_ruc`     | Uruguayan RUC Number                                                                                    |
   * | Uzbekistan             | `uz_tin`     | Uzbekistan TIN Number                                                                                   |
   * | Uzbekistan             | `uz_vat`     | Uzbekistan VAT Number                                                                                   |
   * | Venezuela              | `ve_rif`     | Venezuelan RIF Number                                                                                   |
   * | Vietnam                | `vn_tin`     | Vietnamese Tax ID Number                                                                                |
   * | Zambia                 | `zm_tin`     | Zambia Tax Identification Number                                                                        |
   * | Zimbabwe               | `zw_tin`     | Zimbabwe Tax Identification Number                                                                      |
   */
  tax_id: Shared.CustomerTaxID | null;

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
  /**
   * The hierarchical relationships for this customer.
   */
  export interface Hierarchy {
    children: Array<Shared.CustomerMinified>;

    parent: Shared.CustomerMinified | null;
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

export interface CustomerHierarchyConfig {
  /**
   * A list of child customer IDs to add to the hierarchy. The desired child
   * customers must not already be part of another hierarchy.
   */
  child_customer_ids?: Array<string>;

  /**
   * The ID of the parent customer in the hierarchy. The desired parent customer must
   * not be a child of another customer.
   */
  parent_customer_id?: string | null;
}

export interface NewAccountingSyncConfiguration {
  accounting_providers?: Array<AccountingProviderConfig> | null;

  excluded?: boolean | null;
}

export interface NewAvalaraTaxConfiguration {
  tax_exempt: boolean;

  tax_provider: 'avalara';

  tax_exemption_code?: string | null;
}

export interface NewReportingConfiguration {
  exempt: boolean;
}

export interface NewSphereConfiguration {
  tax_exempt: boolean;

  tax_provider: 'sphere';
}

export interface NewTaxJarConfiguration {
  tax_exempt: boolean;

  tax_provider: 'taxjar';
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

  accounting_sync_configuration?: NewAccountingSyncConfiguration | null;

  /**
   * Additional email addresses for this customer. If populated, these email
   * addresses will be CC'd for customer communications. The total number of email
   * addresses (including the primary email) cannot exceed 50.
   */
  additional_emails?: Array<string> | null;

  /**
   * Used to determine if invoices for this customer will automatically attempt to
   * charge a saved payment method, if available. This parameter defaults to `True`
   * when a payment provider is provided on customer creation.
   */
  auto_collection?: boolean | null;

  /**
   * Used to determine if invoices for this customer will be automatically issued. If
   * true, invoices will be automatically issued. If false, invoices will require
   * manual approval. If `null` is specified, the customer's auto issuance setting
   * will be inherited from the account-level setting.
   */
  auto_issuance?: boolean | null;

  billing_address?: AddressInput | null;

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
   * The hierarchical relationships for this customer.
   */
  hierarchy?: CustomerHierarchyConfig | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: { [key: string]: string | null } | null;

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

  reporting_configuration?: NewReportingConfiguration | null;

  shipping_address?: AddressInput | null;

  tax_configuration?:
    | NewAvalaraTaxConfiguration
    | NewTaxJarConfiguration
    | NewSphereConfiguration
    | CustomerCreateParams.NewNumeralConfiguration
    | null;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country                | Type         | Description                                                                                             |
   * | ---------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Albania                | `al_tin`     | Albania Tax Identification Number                                                                       |
   * | Andorra                | `ad_nrt`     | Andorran NRT Number                                                                                     |
   * | Angola                 | `ao_tin`     | Angola Tax Identification Number                                                                        |
   * | Argentina              | `ar_cuit`    | Argentinian Tax ID Number                                                                               |
   * | Armenia                | `am_tin`     | Armenia Tax Identification Number                                                                       |
   * | Aruba                  | `aw_tin`     | Aruba Tax Identification Number                                                                         |
   * | Australia              | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia              | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria                | `eu_vat`     | European VAT Number                                                                                     |
   * | Azerbaijan             | `az_tin`     | Azerbaijan Tax Identification Number                                                                    |
   * | Bahamas                | `bs_tin`     | Bahamas Tax Identification Number                                                                       |
   * | Bahrain                | `bh_vat`     | Bahraini VAT Number                                                                                     |
   * | Bangladesh             | `bd_bin`     | Bangladesh Business Identification Number                                                               |
   * | Barbados               | `bb_tin`     | Barbados Tax Identification Number                                                                      |
   * | Belarus                | `by_tin`     | Belarus TIN Number                                                                                      |
   * | Belgium                | `eu_vat`     | European VAT Number                                                                                     |
   * | Benin                  | `bj_ifu`     | Benin Tax Identification Number (Identifiant Fiscal Unique)                                             |
   * | Bolivia                | `bo_tin`     | Bolivian Tax ID                                                                                         |
   * | Bosnia and Herzegovina | `ba_tin`     | Bosnia and Herzegovina Tax Identification Number                                                        |
   * | Brazil                 | `br_cnpj`    | Brazilian CNPJ Number                                                                                   |
   * | Brazil                 | `br_cpf`     | Brazilian CPF Number                                                                                    |
   * | Bulgaria               | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria               | `eu_vat`     | European VAT Number                                                                                     |
   * | Burkina Faso           | `bf_ifu`     | Burkina Faso Tax Identification Number (Numéro d'Identifiant Fiscal Unique)                             |
   * | Cambodia               | `kh_tin`     | Cambodia Tax Identification Number                                                                      |
   * | Cameroon               | `cm_niu`     | Cameroon Tax Identification Number (Numéro d'Identifiant fiscal Unique)                                 |
   * | Canada                 | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada                 | `ca_gst_hst` | Canadian GST/HST Number                                                                                 |
   * | Canada                 | `ca_pst_bc`  | Canadian PST Number (British Columbia)                                                                  |
   * | Canada                 | `ca_pst_mb`  | Canadian PST Number (Manitoba)                                                                          |
   * | Canada                 | `ca_pst_sk`  | Canadian PST Number (Saskatchewan)                                                                      |
   * | Canada                 | `ca_qst`     | Canadian QST Number (Québec)                                                                            |
   * | Cape Verde             | `cv_nif`     | Cape Verde Tax Identification Number (Número de Identificação Fiscal)                                   |
   * | Chile                  | `cl_tin`     | Chilean TIN                                                                                             |
   * | China                  | `cn_tin`     | Chinese Tax ID                                                                                          |
   * | Colombia               | `co_nit`     | Colombian NIT Number                                                                                    |
   * | Congo-Kinshasa         | `cd_nif`     | Congo (DR) Tax Identification Number (Número de Identificação Fiscal)                                   |
   * | Costa Rica             | `cr_tin`     | Costa Rican Tax ID                                                                                      |
   * | Croatia                | `eu_vat`     | European VAT Number                                                                                     |
   * | Croatia                | `hr_oib`     | Croatian Personal Identification Number (OIB)                                                           |
   * | Cyprus                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Czech Republic         | `eu_vat`     | European VAT Number                                                                                     |
   * | Denmark                | `eu_vat`     | European VAT Number                                                                                     |
   * | Dominican Republic     | `do_rcn`     | Dominican RCN Number                                                                                    |
   * | Ecuador                | `ec_ruc`     | Ecuadorian RUC Number                                                                                   |
   * | Egypt                  | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | El Salvador            | `sv_nit`     | El Salvadorian NIT Number                                                                               |
   * | Estonia                | `eu_vat`     | European VAT Number                                                                                     |
   * | Ethiopia               | `et_tin`     | Ethiopia Tax Identification Number                                                                      |
   * | European Union         | `eu_oss_vat` | European One Stop Shop VAT Number for non-Union scheme                                                  |
   * | Finland                | `eu_vat`     | European VAT Number                                                                                     |
   * | France                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Georgia                | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany                | `de_stn`     | German Tax Number (Steuernummer)                                                                        |
   * | Germany                | `eu_vat`     | European VAT Number                                                                                     |
   * | Greece                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Guinea                 | `gn_nif`     | Guinea Tax Identification Number (Número de Identificação Fiscal)                                       |
   * | Hong Kong              | `hk_br`      | Hong Kong BR Number                                                                                     |
   * | Hungary                | `eu_vat`     | European VAT Number                                                                                     |
   * | Hungary                | `hu_tin`     | Hungary Tax Number (adószám)                                                                            |
   * | Iceland                | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                  | `in_gst`     | Indian GST Number                                                                                       |
   * | Indonesia              | `id_npwp`    | Indonesian NPWP Number                                                                                  |
   * | Ireland                | `eu_vat`     | European VAT Number                                                                                     |
   * | Israel                 | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                  | `eu_vat`     | European VAT Number                                                                                     |
   * | Japan                  | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                  | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                  | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kazakhstan             | `kz_bin`     | Kazakhstani Business Identification Number                                                              |
   * | Kenya                  | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Kyrgyzstan             | `kg_tin`     | Kyrgyzstan Tax Identification Number                                                                    |
   * | Laos                   | `la_tin`     | Laos Tax Identification Number                                                                          |
   * | Latvia                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Liechtenstein          | `li_uid`     | Liechtensteinian UID Number                                                                             |
   * | Liechtenstein          | `li_vat`     | Liechtenstein VAT Number                                                                                |
   * | Lithuania              | `eu_vat`     | European VAT Number                                                                                     |
   * | Luxembourg             | `eu_vat`     | European VAT Number                                                                                     |
   * | Malaysia               | `my_frp`     | Malaysian FRP Number                                                                                    |
   * | Malaysia               | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia               | `my_sst`     | Malaysian SST Number                                                                                    |
   * | Malta                  | `eu_vat`     | European VAT Number                                                                                     |
   * | Mauritania             | `mr_nif`     | Mauritania Tax Identification Number (Número de Identificação Fiscal)                                   |
   * | Mexico                 | `mx_rfc`     | Mexican RFC Number                                                                                      |
   * | Moldova                | `md_vat`     | Moldova VAT Number                                                                                      |
   * | Montenegro             | `me_pib`     | Montenegro PIB Number                                                                                   |
   * | Morocco                | `ma_vat`     | Morocco VAT Number                                                                                      |
   * | Nepal                  | `np_pan`     | Nepal PAN Number                                                                                        |
   * | Netherlands            | `eu_vat`     | European VAT Number                                                                                     |
   * | New Zealand            | `nz_gst`     | New Zealand GST Number                                                                                  |
   * | Nigeria                | `ng_tin`     | Nigerian Tax Identification Number                                                                      |
   * | North Macedonia        | `mk_vat`     | North Macedonia VAT Number                                                                              |
   * | Northern Ireland       | `eu_vat`     | Northern Ireland VAT Number                                                                             |
   * | Norway                 | `no_vat`     | Norwegian VAT Number                                                                                    |
   * | Norway                 | `no_voec`    | Norwegian VAT on e-commerce Number                                                                      |
   * | Oman                   | `om_vat`     | Omani VAT Number                                                                                        |
   * | Peru                   | `pe_ruc`     | Peruvian RUC Number                                                                                     |
   * | Philippines            | `ph_tin`     | Philippines Tax Identification Number                                                                   |
   * | Poland                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Portugal               | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania                | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania                | `ro_tin`     | Romanian Tax ID Number                                                                                  |
   * | Russia                 | `ru_inn`     | Russian INN                                                                                             |
   * | Russia                 | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia           | `sa_vat`     | Saudi Arabia VAT                                                                                        |
   * | Senegal                | `sn_ninea`   | Senegal NINEA Number                                                                                    |
   * | Serbia                 | `rs_pib`     | Serbian PIB Number                                                                                      |
   * | Singapore              | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore              | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia               | `si_tin`     | Slovenia Tax Number (davčna številka)                                                                   |
   * | South Africa           | `za_vat`     | South African VAT Number                                                                                |
   * | South Korea            | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                  | `es_cif`     | Spanish NIF Number (previously Spanish CIF Number)                                                      |
   * | Spain                  | `eu_vat`     | European VAT Number                                                                                     |
   * | Suriname               | `sr_fin`     | Suriname FIN Number                                                                                     |
   * | Sweden                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Switzerland            | `ch_uid`     | Switzerland UID Number                                                                                  |
   * | Switzerland            | `ch_vat`     | Switzerland VAT Number                                                                                  |
   * | Taiwan                 | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Tajikistan             | `tj_tin`     | Tajikistan Tax Identification Number                                                                    |
   * | Tanzania               | `tz_vat`     | Tanzania VAT Number                                                                                     |
   * | Thailand               | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey                 | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Uganda                 | `ug_tin`     | Uganda Tax Identification Number                                                                        |
   * | Ukraine                | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates   | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom         | `gb_vat`     | United Kingdom VAT Number                                                                               |
   * | United States          | `us_ein`     | United States EIN                                                                                       |
   * | Uruguay                | `uy_ruc`     | Uruguayan RUC Number                                                                                    |
   * | Uzbekistan             | `uz_tin`     | Uzbekistan TIN Number                                                                                   |
   * | Uzbekistan             | `uz_vat`     | Uzbekistan VAT Number                                                                                   |
   * | Venezuela              | `ve_rif`     | Venezuelan RIF Number                                                                                   |
   * | Vietnam                | `vn_tin`     | Vietnamese Tax ID Number                                                                                |
   * | Zambia                 | `zm_tin`     | Zambia Tax Identification Number                                                                        |
   * | Zimbabwe               | `zw_tin`     | Zimbabwe Tax Identification Number                                                                      |
   */
  tax_id?: Shared.CustomerTaxID | null;

  /**
   * A timezone identifier from the IANA timezone database, such as
   * `"America/Los_Angeles"`. This defaults to your account's timezone if not set.
   * This cannot be changed after customer creation.
   */
  timezone?: string | null;
}

export namespace CustomerCreateParams {
  export interface NewNumeralConfiguration {
    tax_exempt: boolean;

    tax_provider: 'numeral';
  }
}

export interface CustomerUpdateParams {
  accounting_sync_configuration?: NewAccountingSyncConfiguration | null;

  /**
   * Additional email addresses for this customer. If populated, these email
   * addresses will be CC'd for customer communications. The total number of email
   * addresses (including the primary email) cannot exceed 50.
   */
  additional_emails?: Array<string> | null;

  /**
   * Used to determine if invoices for this customer will automatically attempt to
   * charge a saved payment method, if available. This parameter defaults to `True`
   * when a payment provider is provided on customer creation.
   */
  auto_collection?: boolean | null;

  /**
   * Used to determine if invoices for this customer will be automatically issued. If
   * true, invoices will be automatically issued. If false, invoices will require
   * manual approval.If `null` is specified, the customer's auto issuance setting
   * will be inherited from the account-level setting.
   */
  auto_issuance?: boolean | null;

  billing_address?: AddressInput | null;

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
   * The external customer ID. This can only be set if the customer has no existing
   * external customer ID. Since this action may change usage quantities for all
   * existing subscriptions, it is disallowed if the customer has issued invoices
   * with usage line items and subject to the same restrictions as backdated
   * subscription creation.
   */
  external_customer_id?: string | null;

  /**
   * The hierarchical relationships for this customer.
   */
  hierarchy?: CustomerHierarchyConfig | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: { [key: string]: string | null } | null;

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

  reporting_configuration?: NewReportingConfiguration | null;

  shipping_address?: AddressInput | null;

  tax_configuration?:
    | NewAvalaraTaxConfiguration
    | NewTaxJarConfiguration
    | NewSphereConfiguration
    | CustomerUpdateParams.NewNumeralConfiguration
    | null;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country                | Type         | Description                                                                                             |
   * | ---------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Albania                | `al_tin`     | Albania Tax Identification Number                                                                       |
   * | Andorra                | `ad_nrt`     | Andorran NRT Number                                                                                     |
   * | Angola                 | `ao_tin`     | Angola Tax Identification Number                                                                        |
   * | Argentina              | `ar_cuit`    | Argentinian Tax ID Number                                                                               |
   * | Armenia                | `am_tin`     | Armenia Tax Identification Number                                                                       |
   * | Aruba                  | `aw_tin`     | Aruba Tax Identification Number                                                                         |
   * | Australia              | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia              | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria                | `eu_vat`     | European VAT Number                                                                                     |
   * | Azerbaijan             | `az_tin`     | Azerbaijan Tax Identification Number                                                                    |
   * | Bahamas                | `bs_tin`     | Bahamas Tax Identification Number                                                                       |
   * | Bahrain                | `bh_vat`     | Bahraini VAT Number                                                                                     |
   * | Bangladesh             | `bd_bin`     | Bangladesh Business Identification Number                                                               |
   * | Barbados               | `bb_tin`     | Barbados Tax Identification Number                                                                      |
   * | Belarus                | `by_tin`     | Belarus TIN Number                                                                                      |
   * | Belgium                | `eu_vat`     | European VAT Number                                                                                     |
   * | Benin                  | `bj_ifu`     | Benin Tax Identification Number (Identifiant Fiscal Unique)                                             |
   * | Bolivia                | `bo_tin`     | Bolivian Tax ID                                                                                         |
   * | Bosnia and Herzegovina | `ba_tin`     | Bosnia and Herzegovina Tax Identification Number                                                        |
   * | Brazil                 | `br_cnpj`    | Brazilian CNPJ Number                                                                                   |
   * | Brazil                 | `br_cpf`     | Brazilian CPF Number                                                                                    |
   * | Bulgaria               | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria               | `eu_vat`     | European VAT Number                                                                                     |
   * | Burkina Faso           | `bf_ifu`     | Burkina Faso Tax Identification Number (Numéro d'Identifiant Fiscal Unique)                             |
   * | Cambodia               | `kh_tin`     | Cambodia Tax Identification Number                                                                      |
   * | Cameroon               | `cm_niu`     | Cameroon Tax Identification Number (Numéro d'Identifiant fiscal Unique)                                 |
   * | Canada                 | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada                 | `ca_gst_hst` | Canadian GST/HST Number                                                                                 |
   * | Canada                 | `ca_pst_bc`  | Canadian PST Number (British Columbia)                                                                  |
   * | Canada                 | `ca_pst_mb`  | Canadian PST Number (Manitoba)                                                                          |
   * | Canada                 | `ca_pst_sk`  | Canadian PST Number (Saskatchewan)                                                                      |
   * | Canada                 | `ca_qst`     | Canadian QST Number (Québec)                                                                            |
   * | Cape Verde             | `cv_nif`     | Cape Verde Tax Identification Number (Número de Identificação Fiscal)                                   |
   * | Chile                  | `cl_tin`     | Chilean TIN                                                                                             |
   * | China                  | `cn_tin`     | Chinese Tax ID                                                                                          |
   * | Colombia               | `co_nit`     | Colombian NIT Number                                                                                    |
   * | Congo-Kinshasa         | `cd_nif`     | Congo (DR) Tax Identification Number (Número de Identificação Fiscal)                                   |
   * | Costa Rica             | `cr_tin`     | Costa Rican Tax ID                                                                                      |
   * | Croatia                | `eu_vat`     | European VAT Number                                                                                     |
   * | Croatia                | `hr_oib`     | Croatian Personal Identification Number (OIB)                                                           |
   * | Cyprus                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Czech Republic         | `eu_vat`     | European VAT Number                                                                                     |
   * | Denmark                | `eu_vat`     | European VAT Number                                                                                     |
   * | Dominican Republic     | `do_rcn`     | Dominican RCN Number                                                                                    |
   * | Ecuador                | `ec_ruc`     | Ecuadorian RUC Number                                                                                   |
   * | Egypt                  | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | El Salvador            | `sv_nit`     | El Salvadorian NIT Number                                                                               |
   * | Estonia                | `eu_vat`     | European VAT Number                                                                                     |
   * | Ethiopia               | `et_tin`     | Ethiopia Tax Identification Number                                                                      |
   * | European Union         | `eu_oss_vat` | European One Stop Shop VAT Number for non-Union scheme                                                  |
   * | Finland                | `eu_vat`     | European VAT Number                                                                                     |
   * | France                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Georgia                | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany                | `de_stn`     | German Tax Number (Steuernummer)                                                                        |
   * | Germany                | `eu_vat`     | European VAT Number                                                                                     |
   * | Greece                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Guinea                 | `gn_nif`     | Guinea Tax Identification Number (Número de Identificação Fiscal)                                       |
   * | Hong Kong              | `hk_br`      | Hong Kong BR Number                                                                                     |
   * | Hungary                | `eu_vat`     | European VAT Number                                                                                     |
   * | Hungary                | `hu_tin`     | Hungary Tax Number (adószám)                                                                            |
   * | Iceland                | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                  | `in_gst`     | Indian GST Number                                                                                       |
   * | Indonesia              | `id_npwp`    | Indonesian NPWP Number                                                                                  |
   * | Ireland                | `eu_vat`     | European VAT Number                                                                                     |
   * | Israel                 | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                  | `eu_vat`     | European VAT Number                                                                                     |
   * | Japan                  | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                  | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                  | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kazakhstan             | `kz_bin`     | Kazakhstani Business Identification Number                                                              |
   * | Kenya                  | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Kyrgyzstan             | `kg_tin`     | Kyrgyzstan Tax Identification Number                                                                    |
   * | Laos                   | `la_tin`     | Laos Tax Identification Number                                                                          |
   * | Latvia                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Liechtenstein          | `li_uid`     | Liechtensteinian UID Number                                                                             |
   * | Liechtenstein          | `li_vat`     | Liechtenstein VAT Number                                                                                |
   * | Lithuania              | `eu_vat`     | European VAT Number                                                                                     |
   * | Luxembourg             | `eu_vat`     | European VAT Number                                                                                     |
   * | Malaysia               | `my_frp`     | Malaysian FRP Number                                                                                    |
   * | Malaysia               | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia               | `my_sst`     | Malaysian SST Number                                                                                    |
   * | Malta                  | `eu_vat`     | European VAT Number                                                                                     |
   * | Mauritania             | `mr_nif`     | Mauritania Tax Identification Number (Número de Identificação Fiscal)                                   |
   * | Mexico                 | `mx_rfc`     | Mexican RFC Number                                                                                      |
   * | Moldova                | `md_vat`     | Moldova VAT Number                                                                                      |
   * | Montenegro             | `me_pib`     | Montenegro PIB Number                                                                                   |
   * | Morocco                | `ma_vat`     | Morocco VAT Number                                                                                      |
   * | Nepal                  | `np_pan`     | Nepal PAN Number                                                                                        |
   * | Netherlands            | `eu_vat`     | European VAT Number                                                                                     |
   * | New Zealand            | `nz_gst`     | New Zealand GST Number                                                                                  |
   * | Nigeria                | `ng_tin`     | Nigerian Tax Identification Number                                                                      |
   * | North Macedonia        | `mk_vat`     | North Macedonia VAT Number                                                                              |
   * | Northern Ireland       | `eu_vat`     | Northern Ireland VAT Number                                                                             |
   * | Norway                 | `no_vat`     | Norwegian VAT Number                                                                                    |
   * | Norway                 | `no_voec`    | Norwegian VAT on e-commerce Number                                                                      |
   * | Oman                   | `om_vat`     | Omani VAT Number                                                                                        |
   * | Peru                   | `pe_ruc`     | Peruvian RUC Number                                                                                     |
   * | Philippines            | `ph_tin`     | Philippines Tax Identification Number                                                                   |
   * | Poland                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Portugal               | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania                | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania                | `ro_tin`     | Romanian Tax ID Number                                                                                  |
   * | Russia                 | `ru_inn`     | Russian INN                                                                                             |
   * | Russia                 | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia           | `sa_vat`     | Saudi Arabia VAT                                                                                        |
   * | Senegal                | `sn_ninea`   | Senegal NINEA Number                                                                                    |
   * | Serbia                 | `rs_pib`     | Serbian PIB Number                                                                                      |
   * | Singapore              | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore              | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia               | `si_tin`     | Slovenia Tax Number (davčna številka)                                                                   |
   * | South Africa           | `za_vat`     | South African VAT Number                                                                                |
   * | South Korea            | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                  | `es_cif`     | Spanish NIF Number (previously Spanish CIF Number)                                                      |
   * | Spain                  | `eu_vat`     | European VAT Number                                                                                     |
   * | Suriname               | `sr_fin`     | Suriname FIN Number                                                                                     |
   * | Sweden                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Switzerland            | `ch_uid`     | Switzerland UID Number                                                                                  |
   * | Switzerland            | `ch_vat`     | Switzerland VAT Number                                                                                  |
   * | Taiwan                 | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Tajikistan             | `tj_tin`     | Tajikistan Tax Identification Number                                                                    |
   * | Tanzania               | `tz_vat`     | Tanzania VAT Number                                                                                     |
   * | Thailand               | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey                 | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Uganda                 | `ug_tin`     | Uganda Tax Identification Number                                                                        |
   * | Ukraine                | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates   | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom         | `gb_vat`     | United Kingdom VAT Number                                                                               |
   * | United States          | `us_ein`     | United States EIN                                                                                       |
   * | Uruguay                | `uy_ruc`     | Uruguayan RUC Number                                                                                    |
   * | Uzbekistan             | `uz_tin`     | Uzbekistan TIN Number                                                                                   |
   * | Uzbekistan             | `uz_vat`     | Uzbekistan VAT Number                                                                                   |
   * | Venezuela              | `ve_rif`     | Venezuelan RIF Number                                                                                   |
   * | Vietnam                | `vn_tin`     | Vietnamese Tax ID Number                                                                                |
   * | Zambia                 | `zm_tin`     | Zambia Tax Identification Number                                                                        |
   * | Zimbabwe               | `zw_tin`     | Zimbabwe Tax Identification Number                                                                      |
   */
  tax_id?: Shared.CustomerTaxID | null;
}

export namespace CustomerUpdateParams {
  export interface NewNumeralConfiguration {
    tax_exempt: boolean;

    tax_provider: 'numeral';
  }
}

export interface CustomerListParams extends PageParams {
  'created_at[gt]'?: string | null;

  'created_at[gte]'?: string | null;

  'created_at[lt]'?: string | null;

  'created_at[lte]'?: string | null;
}

export interface CustomerUpdateByExternalIDParams {
  accounting_sync_configuration?: NewAccountingSyncConfiguration | null;

  /**
   * Additional email addresses for this customer. If populated, these email
   * addresses will be CC'd for customer communications. The total number of email
   * addresses (including the primary email) cannot exceed 50.
   */
  additional_emails?: Array<string> | null;

  /**
   * Used to determine if invoices for this customer will automatically attempt to
   * charge a saved payment method, if available. This parameter defaults to `True`
   * when a payment provider is provided on customer creation.
   */
  auto_collection?: boolean | null;

  /**
   * Used to determine if invoices for this customer will be automatically issued. If
   * true, invoices will be automatically issued. If false, invoices will require
   * manual approval.If `null` is specified, the customer's auto issuance setting
   * will be inherited from the account-level setting.
   */
  auto_issuance?: boolean | null;

  billing_address?: AddressInput | null;

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
   * The external customer ID. This can only be set if the customer has no existing
   * external customer ID. Since this action may change usage quantities for all
   * existing subscriptions, it is disallowed if the customer has issued invoices
   * with usage line items and subject to the same restrictions as backdated
   * subscription creation.
   */
  external_customer_id?: string | null;

  /**
   * The hierarchical relationships for this customer.
   */
  hierarchy?: CustomerHierarchyConfig | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: { [key: string]: string | null } | null;

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

  reporting_configuration?: NewReportingConfiguration | null;

  shipping_address?: AddressInput | null;

  tax_configuration?:
    | NewAvalaraTaxConfiguration
    | NewTaxJarConfiguration
    | NewSphereConfiguration
    | CustomerUpdateByExternalIDParams.NewNumeralConfiguration
    | null;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country                | Type         | Description                                                                                             |
   * | ---------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Albania                | `al_tin`     | Albania Tax Identification Number                                                                       |
   * | Andorra                | `ad_nrt`     | Andorran NRT Number                                                                                     |
   * | Angola                 | `ao_tin`     | Angola Tax Identification Number                                                                        |
   * | Argentina              | `ar_cuit`    | Argentinian Tax ID Number                                                                               |
   * | Armenia                | `am_tin`     | Armenia Tax Identification Number                                                                       |
   * | Aruba                  | `aw_tin`     | Aruba Tax Identification Number                                                                         |
   * | Australia              | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia              | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria                | `eu_vat`     | European VAT Number                                                                                     |
   * | Azerbaijan             | `az_tin`     | Azerbaijan Tax Identification Number                                                                    |
   * | Bahamas                | `bs_tin`     | Bahamas Tax Identification Number                                                                       |
   * | Bahrain                | `bh_vat`     | Bahraini VAT Number                                                                                     |
   * | Bangladesh             | `bd_bin`     | Bangladesh Business Identification Number                                                               |
   * | Barbados               | `bb_tin`     | Barbados Tax Identification Number                                                                      |
   * | Belarus                | `by_tin`     | Belarus TIN Number                                                                                      |
   * | Belgium                | `eu_vat`     | European VAT Number                                                                                     |
   * | Benin                  | `bj_ifu`     | Benin Tax Identification Number (Identifiant Fiscal Unique)                                             |
   * | Bolivia                | `bo_tin`     | Bolivian Tax ID                                                                                         |
   * | Bosnia and Herzegovina | `ba_tin`     | Bosnia and Herzegovina Tax Identification Number                                                        |
   * | Brazil                 | `br_cnpj`    | Brazilian CNPJ Number                                                                                   |
   * | Brazil                 | `br_cpf`     | Brazilian CPF Number                                                                                    |
   * | Bulgaria               | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria               | `eu_vat`     | European VAT Number                                                                                     |
   * | Burkina Faso           | `bf_ifu`     | Burkina Faso Tax Identification Number (Numéro d'Identifiant Fiscal Unique)                             |
   * | Cambodia               | `kh_tin`     | Cambodia Tax Identification Number                                                                      |
   * | Cameroon               | `cm_niu`     | Cameroon Tax Identification Number (Numéro d'Identifiant fiscal Unique)                                 |
   * | Canada                 | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada                 | `ca_gst_hst` | Canadian GST/HST Number                                                                                 |
   * | Canada                 | `ca_pst_bc`  | Canadian PST Number (British Columbia)                                                                  |
   * | Canada                 | `ca_pst_mb`  | Canadian PST Number (Manitoba)                                                                          |
   * | Canada                 | `ca_pst_sk`  | Canadian PST Number (Saskatchewan)                                                                      |
   * | Canada                 | `ca_qst`     | Canadian QST Number (Québec)                                                                            |
   * | Cape Verde             | `cv_nif`     | Cape Verde Tax Identification Number (Número de Identificação Fiscal)                                   |
   * | Chile                  | `cl_tin`     | Chilean TIN                                                                                             |
   * | China                  | `cn_tin`     | Chinese Tax ID                                                                                          |
   * | Colombia               | `co_nit`     | Colombian NIT Number                                                                                    |
   * | Congo-Kinshasa         | `cd_nif`     | Congo (DR) Tax Identification Number (Número de Identificação Fiscal)                                   |
   * | Costa Rica             | `cr_tin`     | Costa Rican Tax ID                                                                                      |
   * | Croatia                | `eu_vat`     | European VAT Number                                                                                     |
   * | Croatia                | `hr_oib`     | Croatian Personal Identification Number (OIB)                                                           |
   * | Cyprus                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Czech Republic         | `eu_vat`     | European VAT Number                                                                                     |
   * | Denmark                | `eu_vat`     | European VAT Number                                                                                     |
   * | Dominican Republic     | `do_rcn`     | Dominican RCN Number                                                                                    |
   * | Ecuador                | `ec_ruc`     | Ecuadorian RUC Number                                                                                   |
   * | Egypt                  | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | El Salvador            | `sv_nit`     | El Salvadorian NIT Number                                                                               |
   * | Estonia                | `eu_vat`     | European VAT Number                                                                                     |
   * | Ethiopia               | `et_tin`     | Ethiopia Tax Identification Number                                                                      |
   * | European Union         | `eu_oss_vat` | European One Stop Shop VAT Number for non-Union scheme                                                  |
   * | Finland                | `eu_vat`     | European VAT Number                                                                                     |
   * | France                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Georgia                | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany                | `de_stn`     | German Tax Number (Steuernummer)                                                                        |
   * | Germany                | `eu_vat`     | European VAT Number                                                                                     |
   * | Greece                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Guinea                 | `gn_nif`     | Guinea Tax Identification Number (Número de Identificação Fiscal)                                       |
   * | Hong Kong              | `hk_br`      | Hong Kong BR Number                                                                                     |
   * | Hungary                | `eu_vat`     | European VAT Number                                                                                     |
   * | Hungary                | `hu_tin`     | Hungary Tax Number (adószám)                                                                            |
   * | Iceland                | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                  | `in_gst`     | Indian GST Number                                                                                       |
   * | Indonesia              | `id_npwp`    | Indonesian NPWP Number                                                                                  |
   * | Ireland                | `eu_vat`     | European VAT Number                                                                                     |
   * | Israel                 | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                  | `eu_vat`     | European VAT Number                                                                                     |
   * | Japan                  | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                  | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                  | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kazakhstan             | `kz_bin`     | Kazakhstani Business Identification Number                                                              |
   * | Kenya                  | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Kyrgyzstan             | `kg_tin`     | Kyrgyzstan Tax Identification Number                                                                    |
   * | Laos                   | `la_tin`     | Laos Tax Identification Number                                                                          |
   * | Latvia                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Liechtenstein          | `li_uid`     | Liechtensteinian UID Number                                                                             |
   * | Liechtenstein          | `li_vat`     | Liechtenstein VAT Number                                                                                |
   * | Lithuania              | `eu_vat`     | European VAT Number                                                                                     |
   * | Luxembourg             | `eu_vat`     | European VAT Number                                                                                     |
   * | Malaysia               | `my_frp`     | Malaysian FRP Number                                                                                    |
   * | Malaysia               | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia               | `my_sst`     | Malaysian SST Number                                                                                    |
   * | Malta                  | `eu_vat`     | European VAT Number                                                                                     |
   * | Mauritania             | `mr_nif`     | Mauritania Tax Identification Number (Número de Identificação Fiscal)                                   |
   * | Mexico                 | `mx_rfc`     | Mexican RFC Number                                                                                      |
   * | Moldova                | `md_vat`     | Moldova VAT Number                                                                                      |
   * | Montenegro             | `me_pib`     | Montenegro PIB Number                                                                                   |
   * | Morocco                | `ma_vat`     | Morocco VAT Number                                                                                      |
   * | Nepal                  | `np_pan`     | Nepal PAN Number                                                                                        |
   * | Netherlands            | `eu_vat`     | European VAT Number                                                                                     |
   * | New Zealand            | `nz_gst`     | New Zealand GST Number                                                                                  |
   * | Nigeria                | `ng_tin`     | Nigerian Tax Identification Number                                                                      |
   * | North Macedonia        | `mk_vat`     | North Macedonia VAT Number                                                                              |
   * | Northern Ireland       | `eu_vat`     | Northern Ireland VAT Number                                                                             |
   * | Norway                 | `no_vat`     | Norwegian VAT Number                                                                                    |
   * | Norway                 | `no_voec`    | Norwegian VAT on e-commerce Number                                                                      |
   * | Oman                   | `om_vat`     | Omani VAT Number                                                                                        |
   * | Peru                   | `pe_ruc`     | Peruvian RUC Number                                                                                     |
   * | Philippines            | `ph_tin`     | Philippines Tax Identification Number                                                                   |
   * | Poland                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Portugal               | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania                | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania                | `ro_tin`     | Romanian Tax ID Number                                                                                  |
   * | Russia                 | `ru_inn`     | Russian INN                                                                                             |
   * | Russia                 | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia           | `sa_vat`     | Saudi Arabia VAT                                                                                        |
   * | Senegal                | `sn_ninea`   | Senegal NINEA Number                                                                                    |
   * | Serbia                 | `rs_pib`     | Serbian PIB Number                                                                                      |
   * | Singapore              | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore              | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia               | `si_tin`     | Slovenia Tax Number (davčna številka)                                                                   |
   * | South Africa           | `za_vat`     | South African VAT Number                                                                                |
   * | South Korea            | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                  | `es_cif`     | Spanish NIF Number (previously Spanish CIF Number)                                                      |
   * | Spain                  | `eu_vat`     | European VAT Number                                                                                     |
   * | Suriname               | `sr_fin`     | Suriname FIN Number                                                                                     |
   * | Sweden                 | `eu_vat`     | European VAT Number                                                                                     |
   * | Switzerland            | `ch_uid`     | Switzerland UID Number                                                                                  |
   * | Switzerland            | `ch_vat`     | Switzerland VAT Number                                                                                  |
   * | Taiwan                 | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Tajikistan             | `tj_tin`     | Tajikistan Tax Identification Number                                                                    |
   * | Tanzania               | `tz_vat`     | Tanzania VAT Number                                                                                     |
   * | Thailand               | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey                 | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Uganda                 | `ug_tin`     | Uganda Tax Identification Number                                                                        |
   * | Ukraine                | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates   | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom         | `gb_vat`     | United Kingdom VAT Number                                                                               |
   * | United States          | `us_ein`     | United States EIN                                                                                       |
   * | Uruguay                | `uy_ruc`     | Uruguayan RUC Number                                                                                    |
   * | Uzbekistan             | `uz_tin`     | Uzbekistan TIN Number                                                                                   |
   * | Uzbekistan             | `uz_vat`     | Uzbekistan VAT Number                                                                                   |
   * | Venezuela              | `ve_rif`     | Venezuelan RIF Number                                                                                   |
   * | Vietnam                | `vn_tin`     | Vietnamese Tax ID Number                                                                                |
   * | Zambia                 | `zm_tin`     | Zambia Tax Identification Number                                                                        |
   * | Zimbabwe               | `zw_tin`     | Zimbabwe Tax Identification Number                                                                      |
   */
  tax_id?: Shared.CustomerTaxID | null;
}

export namespace CustomerUpdateByExternalIDParams {
  export interface NewNumeralConfiguration {
    tax_exempt: boolean;

    tax_provider: 'numeral';
  }
}

Customers.CustomersPage = CustomersPage;
Customers.Costs = Costs;
Customers.Credits = Credits;
Customers.CreditListResponsesPage = CreditListResponsesPage;
Customers.CreditListByExternalIDResponsesPage = CreditListByExternalIDResponsesPage;
Customers.BalanceTransactions = BalanceTransactions;
Customers.BalanceTransactionListResponsesPage = BalanceTransactionListResponsesPage;

export declare namespace Customers {
  export {
    type AccountingProviderConfig as AccountingProviderConfig,
    type AddressInput as AddressInput,
    type Customer as Customer,
    type CustomerHierarchyConfig as CustomerHierarchyConfig,
    type NewAccountingSyncConfiguration as NewAccountingSyncConfiguration,
    type NewAvalaraTaxConfiguration as NewAvalaraTaxConfiguration,
    type NewReportingConfiguration as NewReportingConfiguration,
    type NewSphereConfiguration as NewSphereConfiguration,
    type NewTaxJarConfiguration as NewTaxJarConfiguration,
    CustomersPage as CustomersPage,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerListParams as CustomerListParams,
    type CustomerUpdateByExternalIDParams as CustomerUpdateByExternalIDParams,
  };

  export {
    Costs as Costs,
    type CostListResponse as CostListResponse,
    type CostListByExternalIDResponse as CostListByExternalIDResponse,
    type CostListParams as CostListParams,
    type CostListByExternalIDParams as CostListByExternalIDParams,
  };

  export {
    Credits as Credits,
    type CreditListResponse as CreditListResponse,
    type CreditListByExternalIDResponse as CreditListByExternalIDResponse,
    CreditListResponsesPage as CreditListResponsesPage,
    CreditListByExternalIDResponsesPage as CreditListByExternalIDResponsesPage,
    type CreditListParams as CreditListParams,
    type CreditListByExternalIDParams as CreditListByExternalIDParams,
  };

  export {
    BalanceTransactions as BalanceTransactions,
    type BalanceTransactionCreateResponse as BalanceTransactionCreateResponse,
    type BalanceTransactionListResponse as BalanceTransactionListResponse,
    BalanceTransactionListResponsesPage as BalanceTransactionListResponsesPage,
    type BalanceTransactionCreateParams as BalanceTransactionCreateParams,
    type BalanceTransactionListParams as BalanceTransactionListParams,
  };
}
