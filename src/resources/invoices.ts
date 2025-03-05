// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as Shared from './shared';
import { InvoiceModelsPage } from './shared';
import { type PageParams } from '../pagination';

export class Invoices extends APIResource {
  /**
   * This endpoint is used to create a one-off invoice for a customer.
   */
  create(body: InvoiceCreateParams, options?: Core.RequestOptions): Core.APIPromise<Shared.InvoiceModel> {
    return this._client.post('/invoices', { body, ...options });
  }

  /**
   * This endpoint allows you to update the `metadata` property on an invoice. If you
   * pass null for the metadata value, it will clear any existing metadata for that
   * invoice.
   *
   * `metadata` can be modified regardless of invoice state.
   */
  update(
    invoiceId: string,
    body: InvoiceUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.InvoiceModel> {
    return this._client.put(`/invoices/${invoiceId}`, { body, ...options });
  }

  /**
   * This endpoint returns a list of all [`Invoice`](/core-concepts#invoice)s for an
   * account in a list format.
   *
   * The list of invoices is ordered starting from the most recently issued invoice
   * date. The response also includes
   * [`pagination_metadata`](/api-reference/pagination), which lets the caller
   * retrieve the next page of results if they exist.
   *
   * By default, this only returns invoices that are `issued`, `paid`, or `synced`.
   *
   * When fetching any `draft` invoices, this returns the last-computed invoice
   * values for each draft invoice, which may not always be up-to-date since Orb
   * regularly refreshes invoices asynchronously.
   */
  list(
    query?: InvoiceListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<InvoiceModelsPage, Shared.InvoiceModel>;
  list(options?: Core.RequestOptions): Core.PagePromise<InvoiceModelsPage, Shared.InvoiceModel>;
  list(
    query: InvoiceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<InvoiceModelsPage, Shared.InvoiceModel> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/invoices', InvoiceModelsPage, { query, ...options });
  }

  /**
   * This endpoint is used to fetch an [`Invoice`](/core-concepts#invoice) given an
   * identifier.
   */
  fetch(invoiceId: string, options?: Core.RequestOptions): Core.APIPromise<Shared.InvoiceModel> {
    return this._client.get(`/invoices/${invoiceId}`, options);
  }

  /**
   * This endpoint can be used to fetch the upcoming
   * [invoice](/core-concepts#invoice) for the current billing period given a
   * subscription.
   */
  fetchUpcoming(
    query: InvoiceFetchUpcomingParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InvoiceFetchUpcomingResponse> {
    return this._client.get('/invoices/upcoming', { query, ...options });
  }

  /**
   * This endpoint allows an eligible invoice to be issued manually. This is only
   * possible with invoices where status is `draft`, `will_auto_issue` is false, and
   * an `eligible_to_issue_at` is a time in the past. Issuing an invoice could
   * possibly trigger side effects, some of which could be customer-visible (e.g.
   * sending emails, auto-collecting payment, syncing the invoice to external
   * providers, etc).
   */
  issue(
    invoiceId: string,
    body?: InvoiceIssueParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.InvoiceModel>;
  issue(invoiceId: string, options?: Core.RequestOptions): Core.APIPromise<Shared.InvoiceModel>;
  issue(
    invoiceId: string,
    body: InvoiceIssueParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.InvoiceModel> {
    if (isRequestOptions(body)) {
      return this.issue(invoiceId, {}, body);
    }
    return this._client.post(`/invoices/${invoiceId}/issue`, { body, ...options });
  }

  /**
   * This endpoint allows an invoice's status to be set the `paid` status. This can
   * only be done to invoices that are in the `issued` status.
   */
  markPaid(
    invoiceId: string,
    body: InvoiceMarkPaidParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.InvoiceModel> {
    return this._client.post(`/invoices/${invoiceId}/mark_paid`, { body, ...options });
  }

  /**
   * This endpoint collects payment for an invoice using the customer's default
   * payment method. This action can only be taken on invoices with status "issued".
   */
  pay(invoiceId: string, options?: Core.RequestOptions): Core.APIPromise<Shared.InvoiceModel> {
    return this._client.post(`/invoices/${invoiceId}/pay`, options);
  }

  /**
   * This endpoint allows an invoice's status to be set the `void` status. This can
   * only be done to invoices that are in the `issued` status.
   *
   * If the associated invoice has used the customer balance to change the amount
   * due, the customer balance operation will be reverted. For example, if the
   * invoice used $10 of customer balance, that amount will be added back to the
   * customer balance upon voiding.
   *
   * If the invoice was used to purchase a credit block, but the invoice is not yet
   * paid, the credit block will be voided. If the invoice was created due to a
   * top-up, the top-up will be disabled.
   */
  void(invoiceId: string, options?: Core.RequestOptions): Core.APIPromise<Shared.InvoiceModel> {
    return this._client.post(`/invoices/${invoiceId}/void`, options);
  }
}

/**
 * An [`Invoice`](/core-concepts#invoice) is a fundamental billing entity,
 * representing the request for payment for a single subscription. This includes a
 * set of line items, which correspond to prices in the subscription's plan and can
 * represent fixed recurring fees or usage-based fees. They are generated at the
 * end of a billing period, or as the result of an action, such as a cancellation.
 */
export interface Invoice {
  id: string;

  /**
   * This is the final amount required to be charged to the customer and reflects the
   * application of the customer balance to the `total` of the invoice.
   */
  amount_due: string;

  auto_collection: Shared.AutoCollectionModel;

  billing_address: Shared.AddressModel | null;

  /**
   * The creation time of the resource in Orb.
   */
  created_at: string;

  /**
   * A list of credit notes associated with the invoice
   */
  credit_notes: Array<Shared.CreditNoteSummaryModel>;

  /**
   * An ISO 4217 currency string or `credits`
   */
  currency: string;

  customer: Shared.CustomerMinifiedModel;

  customer_balance_transactions: Array<Shared.CustomerBalanceTransactionModel>;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Andorra              | `ad_nrt`     | Andorran NRT Number                                                                                     |
   * | Argentina            | `ar_cuit`    | Argentinian Tax ID Number                                                                               |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT Number                                                                                     |
   * | Bahrain              | `bh_vat`     | Bahraini VAT Number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT Number                                                                                     |
   * | Bolivia              | `bo_tin`     | Bolivian Tax ID                                                                                         |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ Number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF Number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT Number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST Number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST Number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST Number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST Number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST Number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | China                | `cn_tin`     | Chinese Tax ID                                                                                          |
   * | Colombia             | `co_nit`     | Colombian NIT Number                                                                                    |
   * | Costa Rica           | `cr_tin`     | Costa Rican Tax ID                                                                                      |
   * | Croatia              | `eu_vat`     | European VAT Number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT Number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT Number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT Number                                                                                     |
   * | Dominican Republic   | `do_rcn`     | Dominican RCN Number                                                                                    |
   * | Ecuador              | `ec_ruc`     | Ecuadorian RUC Number                                                                                   |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | El Salvador          | `sv_nit`     | El Salvadorian NIT Number                                                                               |
   * | Estonia              | `eu_vat`     | European VAT Number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT Number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT Number                                                                                     |
   * | France               | `eu_vat`     | European VAT Number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT Number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT Number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR Number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT Number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary Tax Number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST Number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP Number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT Number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT Number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kazakhstan           | `kz_bin`     | Kazakhstani Business Identification Number                                                              |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID Number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT Number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT Number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP Number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST Number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT Number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC Number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT Number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST Number                                                                                  |
   * | Nigeria              | `ng_tin`     | Nigerian Tax Identification Number                                                                      |
   * | Norway               | `no_vat`     | Norwegian VAT Number                                                                                    |
   * | Norway               | `no_voec`    | Norwegian VAT on e-commerce Number                                                                      |
   * | Oman                 | `om_vat`     | Omani VAT Number                                                                                        |
   * | Peru                 | `pe_ruc`     | Peruvian RUC Number                                                                                     |
   * | Philippines          | `ph_tin `    | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT Number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania              | `ro_tin`     | Romanian Tax ID Number                                                                                  |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sa_vat`     | Saudi Arabia VAT                                                                                        |
   * | Serbia               | `rs_pib`     | Serbian PIB Number                                                                                      |
   * | Singapore            | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia Tax Number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT Number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF Number (previously Spanish CIF Number)                                                      |
   * | Spain                | `eu_vat`     | European VAT Number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT Number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT Number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT Number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT Number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   * | Uruguay              | `uy_ruc`     | Uruguayan RUC Number                                                                                    |
   * | Venezuela            | `ve_rif`     | Venezuelan RIF Number                                                                                   |
   * | Vietnam              | `vn_tin`     | Vietnamese Tax ID Number                                                                                |
   */
  customer_tax_id: Shared.CustomerTaxIDModel | null;

  /**
   * @deprecated This field is deprecated in favor of `discounts`. If a `discounts`
   * list is provided, the first discount in the list will be returned. If the list
   * is empty, `None` will be returned.
   */
  discount: unknown;

  discounts: Array<Shared.InvoiceLevelDiscount>;

  /**
   * When the invoice payment is due. The due date is null if the invoice is not yet
   * finalized.
   */
  due_date: string | null;

  /**
   * If the invoice has a status of `draft`, this will be the time that the invoice
   * will be eligible to be issued, otherwise it will be `null`. If `auto-issue` is
   * true, the invoice will automatically begin issuing at this time.
   */
  eligible_to_issue_at: string | null;

  /**
   * A URL for the customer-facing invoice portal. This URL expires 30 days after the
   * invoice's due date, or 60 days after being re-generated through the UI.
   */
  hosted_invoice_url: string | null;

  /**
   * The scheduled date of the invoice
   */
  invoice_date: string;

  /**
   * Automatically generated invoice number to help track and reconcile invoices.
   * Invoice numbers have a prefix such as `RFOBWG`. These can be sequential per
   * account or customer.
   */
  invoice_number: string;

  /**
   * The link to download the PDF representation of the `Invoice`.
   */
  invoice_pdf: string | null;

  invoice_source: 'subscription' | 'partial' | 'one_off';

  /**
   * If the invoice failed to issue, this will be the last time it failed to issue
   * (even if it is now in a different state.)
   */
  issue_failed_at: string | null;

  /**
   * If the invoice has been issued, this will be the time it transitioned to
   * `issued` (even if it is now in a different state.)
   */
  issued_at: string | null;

  /**
   * The breakdown of prices in this invoice.
   */
  line_items: Array<Shared.InvoiceLineItemModel>;

  maximum: Shared.MaximumModel | null;

  maximum_amount: string | null;

  /**
   * Free-form text which is available on the invoice PDF and the Orb invoice portal.
   */
  memo: string | null;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  minimum: Shared.MinimumModel | null;

  minimum_amount: string | null;

  /**
   * If the invoice has a status of `paid`, this gives a timestamp when the invoice
   * was paid.
   */
  paid_at: string | null;

  /**
   * A list of payment attempts associated with the invoice
   */
  payment_attempts: Array<Shared.PaymentAttemptModel>;

  /**
   * If payment was attempted on this invoice but failed, this will be the time of
   * the most recent attempt.
   */
  payment_failed_at: string | null;

  /**
   * If payment was attempted on this invoice, this will be the start time of the
   * most recent attempt. This field is especially useful for delayed-notification
   * payment mechanisms (like bank transfers), where payment can take 3 days or more.
   */
  payment_started_at: string | null;

  /**
   * If the invoice is in draft, this timestamp will reflect when the invoice is
   * scheduled to be issued.
   */
  scheduled_issue_at: string | null;

  shipping_address: Shared.AddressModel | null;

  status: 'issued' | 'paid' | 'synced' | 'void' | 'draft';

  subscription: Shared.SubscriptionMinifiedModel | null;

  /**
   * The total before any discounts and minimums are applied.
   */
  subtotal: string;

  /**
   * If the invoice failed to sync, this will be the last time an external invoicing
   * provider sync was attempted. This field will always be `null` for invoices using
   * Orb Invoicing.
   */
  sync_failed_at: string | null;

  /**
   * The total after any minimums and discounts have been applied.
   */
  total: string;

  /**
   * If the invoice has a status of `void`, this gives a timestamp when the invoice
   * was voided.
   */
  voided_at: string | null;

  /**
   * This is true if the invoice will be automatically issued in the future, and
   * false otherwise.
   */
  will_auto_issue: boolean;
}

export interface InvoiceFetchUpcomingResponse {
  id: string;

  /**
   * This is the final amount required to be charged to the customer and reflects the
   * application of the customer balance to the `total` of the invoice.
   */
  amount_due: string;

  auto_collection: Shared.AutoCollectionModel;

  billing_address: Shared.AddressModel | null;

  /**
   * The creation time of the resource in Orb.
   */
  created_at: string;

  /**
   * A list of credit notes associated with the invoice
   */
  credit_notes: Array<Shared.CreditNoteSummaryModel>;

  /**
   * An ISO 4217 currency string or `credits`
   */
  currency: string;

  customer: Shared.CustomerMinifiedModel;

  customer_balance_transactions: Array<Shared.CustomerBalanceTransactionModel>;

  /**
   * Tax IDs are commonly required to be displayed on customer invoices, which are
   * added to the headers of invoices.
   *
   * ### Supported Tax ID Countries and Types
   *
   * | Country              | Type         | Description                                                                                             |
   * | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
   * | Andorra              | `ad_nrt`     | Andorran NRT Number                                                                                     |
   * | Argentina            | `ar_cuit`    | Argentinian Tax ID Number                                                                               |
   * | Australia            | `au_abn`     | Australian Business Number (AU ABN)                                                                     |
   * | Australia            | `au_arn`     | Australian Taxation Office Reference Number                                                             |
   * | Austria              | `eu_vat`     | European VAT Number                                                                                     |
   * | Bahrain              | `bh_vat`     | Bahraini VAT Number                                                                                     |
   * | Belgium              | `eu_vat`     | European VAT Number                                                                                     |
   * | Bolivia              | `bo_tin`     | Bolivian Tax ID                                                                                         |
   * | Brazil               | `br_cnpj`    | Brazilian CNPJ Number                                                                                   |
   * | Brazil               | `br_cpf`     | Brazilian CPF Number                                                                                    |
   * | Bulgaria             | `bg_uic`     | Bulgaria Unified Identification Code                                                                    |
   * | Bulgaria             | `eu_vat`     | European VAT Number                                                                                     |
   * | Canada               | `ca_bn`      | Canadian BN                                                                                             |
   * | Canada               | `ca_gst_hst` | Canadian GST/HST Number                                                                                 |
   * | Canada               | `ca_pst_bc`  | Canadian PST Number (British Columbia)                                                                  |
   * | Canada               | `ca_pst_mb`  | Canadian PST Number (Manitoba)                                                                          |
   * | Canada               | `ca_pst_sk`  | Canadian PST Number (Saskatchewan)                                                                      |
   * | Canada               | `ca_qst`     | Canadian QST Number (Québec)                                                                            |
   * | Chile                | `cl_tin`     | Chilean TIN                                                                                             |
   * | China                | `cn_tin`     | Chinese Tax ID                                                                                          |
   * | Colombia             | `co_nit`     | Colombian NIT Number                                                                                    |
   * | Costa Rica           | `cr_tin`     | Costa Rican Tax ID                                                                                      |
   * | Croatia              | `eu_vat`     | European VAT Number                                                                                     |
   * | Cyprus               | `eu_vat`     | European VAT Number                                                                                     |
   * | Czech Republic       | `eu_vat`     | European VAT Number                                                                                     |
   * | Denmark              | `eu_vat`     | European VAT Number                                                                                     |
   * | Dominican Republic   | `do_rcn`     | Dominican RCN Number                                                                                    |
   * | Ecuador              | `ec_ruc`     | Ecuadorian RUC Number                                                                                   |
   * | Egypt                | `eg_tin`     | Egyptian Tax Identification Number                                                                      |
   * | El Salvador          | `sv_nit`     | El Salvadorian NIT Number                                                                               |
   * | Estonia              | `eu_vat`     | European VAT Number                                                                                     |
   * | EU                   | `eu_oss_vat` | European One Stop Shop VAT Number for non-Union scheme                                                  |
   * | Finland              | `eu_vat`     | European VAT Number                                                                                     |
   * | France               | `eu_vat`     | European VAT Number                                                                                     |
   * | Georgia              | `ge_vat`     | Georgian VAT                                                                                            |
   * | Germany              | `eu_vat`     | European VAT Number                                                                                     |
   * | Greece               | `eu_vat`     | European VAT Number                                                                                     |
   * | Hong Kong            | `hk_br`      | Hong Kong BR Number                                                                                     |
   * | Hungary              | `eu_vat`     | European VAT Number                                                                                     |
   * | Hungary              | `hu_tin`     | Hungary Tax Number (adószám)                                                                            |
   * | Iceland              | `is_vat`     | Icelandic VAT                                                                                           |
   * | India                | `in_gst`     | Indian GST Number                                                                                       |
   * | Indonesia            | `id_npwp`    | Indonesian NPWP Number                                                                                  |
   * | Ireland              | `eu_vat`     | European VAT Number                                                                                     |
   * | Israel               | `il_vat`     | Israel VAT                                                                                              |
   * | Italy                | `eu_vat`     | European VAT Number                                                                                     |
   * | Japan                | `jp_cn`      | Japanese Corporate Number (_Hōjin Bangō_)                                                               |
   * | Japan                | `jp_rn`      | Japanese Registered Foreign Businesses' Registration Number (_Tōroku Kokugai Jigyōsha no Tōroku Bangō_) |
   * | Japan                | `jp_trn`     | Japanese Tax Registration Number (_Tōroku Bangō_)                                                       |
   * | Kazakhstan           | `kz_bin`     | Kazakhstani Business Identification Number                                                              |
   * | Kenya                | `ke_pin`     | Kenya Revenue Authority Personal Identification Number                                                  |
   * | Latvia               | `eu_vat`     | European VAT Number                                                                                     |
   * | Liechtenstein        | `li_uid`     | Liechtensteinian UID Number                                                                             |
   * | Lithuania            | `eu_vat`     | European VAT Number                                                                                     |
   * | Luxembourg           | `eu_vat`     | European VAT Number                                                                                     |
   * | Malaysia             | `my_frp`     | Malaysian FRP Number                                                                                    |
   * | Malaysia             | `my_itn`     | Malaysian ITN                                                                                           |
   * | Malaysia             | `my_sst`     | Malaysian SST Number                                                                                    |
   * | Malta                | `eu_vat `    | European VAT Number                                                                                     |
   * | Mexico               | `mx_rfc`     | Mexican RFC Number                                                                                      |
   * | Netherlands          | `eu_vat`     | European VAT Number                                                                                     |
   * | New Zealand          | `nz_gst`     | New Zealand GST Number                                                                                  |
   * | Nigeria              | `ng_tin`     | Nigerian Tax Identification Number                                                                      |
   * | Norway               | `no_vat`     | Norwegian VAT Number                                                                                    |
   * | Norway               | `no_voec`    | Norwegian VAT on e-commerce Number                                                                      |
   * | Oman                 | `om_vat`     | Omani VAT Number                                                                                        |
   * | Peru                 | `pe_ruc`     | Peruvian RUC Number                                                                                     |
   * | Philippines          | `ph_tin `    | Philippines Tax Identification Number                                                                   |
   * | Poland               | `eu_vat`     | European VAT Number                                                                                     |
   * | Portugal             | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania              | `eu_vat`     | European VAT Number                                                                                     |
   * | Romania              | `ro_tin`     | Romanian Tax ID Number                                                                                  |
   * | Russia               | `ru_inn`     | Russian INN                                                                                             |
   * | Russia               | `ru_kpp`     | Russian KPP                                                                                             |
   * | Saudi Arabia         | `sa_vat`     | Saudi Arabia VAT                                                                                        |
   * | Serbia               | `rs_pib`     | Serbian PIB Number                                                                                      |
   * | Singapore            | `sg_gst`     | Singaporean GST                                                                                         |
   * | Singapore            | `sg_uen`     | Singaporean UEN                                                                                         |
   * | Slovakia             | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia             | `eu_vat`     | European VAT Number                                                                                     |
   * | Slovenia             | `si_tin`     | Slovenia Tax Number (davčna številka)                                                                   |
   * | South Africa         | `za_vat`     | South African VAT Number                                                                                |
   * | South Korea          | `kr_brn`     | Korean BRN                                                                                              |
   * | Spain                | `es_cif`     | Spanish NIF Number (previously Spanish CIF Number)                                                      |
   * | Spain                | `eu_vat`     | European VAT Number                                                                                     |
   * | Sweden               | `eu_vat`     | European VAT Number                                                                                     |
   * | Switzerland          | `ch_vat`     | Switzerland VAT Number                                                                                  |
   * | Taiwan               | `tw_vat`     | Taiwanese VAT                                                                                           |
   * | Thailand             | `th_vat`     | Thai VAT                                                                                                |
   * | Turkey               | `tr_tin`     | Turkish Tax Identification Number                                                                       |
   * | Ukraine              | `ua_vat`     | Ukrainian VAT                                                                                           |
   * | United Arab Emirates | `ae_trn`     | United Arab Emirates TRN                                                                                |
   * | United Kingdom       | `eu_vat`     | Northern Ireland VAT Number                                                                             |
   * | United Kingdom       | `gb_vat`     | United Kingdom VAT Number                                                                               |
   * | United States        | `us_ein`     | United States EIN                                                                                       |
   * | Uruguay              | `uy_ruc`     | Uruguayan RUC Number                                                                                    |
   * | Venezuela            | `ve_rif`     | Venezuelan RIF Number                                                                                   |
   * | Vietnam              | `vn_tin`     | Vietnamese Tax ID Number                                                                                |
   */
  customer_tax_id: Shared.CustomerTaxIDModel | null;

  /**
   * @deprecated This field is deprecated in favor of `discounts`. If a `discounts`
   * list is provided, the first discount in the list will be returned. If the list
   * is empty, `None` will be returned.
   */
  discount: unknown;

  discounts: Array<Shared.InvoiceLevelDiscount>;

  /**
   * When the invoice payment is due. The due date is null if the invoice is not yet
   * finalized.
   */
  due_date: string | null;

  /**
   * If the invoice has a status of `draft`, this will be the time that the invoice
   * will be eligible to be issued, otherwise it will be `null`. If `auto-issue` is
   * true, the invoice will automatically begin issuing at this time.
   */
  eligible_to_issue_at: string | null;

  /**
   * A URL for the customer-facing invoice portal. This URL expires 30 days after the
   * invoice's due date, or 60 days after being re-generated through the UI.
   */
  hosted_invoice_url: string | null;

  /**
   * Automatically generated invoice number to help track and reconcile invoices.
   * Invoice numbers have a prefix such as `RFOBWG`. These can be sequential per
   * account or customer.
   */
  invoice_number: string;

  /**
   * The link to download the PDF representation of the `Invoice`.
   */
  invoice_pdf: string | null;

  invoice_source: 'subscription' | 'partial' | 'one_off';

  /**
   * If the invoice failed to issue, this will be the last time it failed to issue
   * (even if it is now in a different state.)
   */
  issue_failed_at: string | null;

  /**
   * If the invoice has been issued, this will be the time it transitioned to
   * `issued` (even if it is now in a different state.)
   */
  issued_at: string | null;

  /**
   * The breakdown of prices in this invoice.
   */
  line_items: Array<Shared.InvoiceLineItemModel>;

  maximum: Shared.MaximumModel | null;

  maximum_amount: string | null;

  /**
   * Free-form text which is available on the invoice PDF and the Orb invoice portal.
   */
  memo: string | null;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  minimum: Shared.MinimumModel | null;

  minimum_amount: string | null;

  /**
   * If the invoice has a status of `paid`, this gives a timestamp when the invoice
   * was paid.
   */
  paid_at: string | null;

  /**
   * A list of payment attempts associated with the invoice
   */
  payment_attempts: Array<Shared.PaymentAttemptModel>;

  /**
   * If payment was attempted on this invoice but failed, this will be the time of
   * the most recent attempt.
   */
  payment_failed_at: string | null;

  /**
   * If payment was attempted on this invoice, this will be the start time of the
   * most recent attempt. This field is especially useful for delayed-notification
   * payment mechanisms (like bank transfers), where payment can take 3 days or more.
   */
  payment_started_at: string | null;

  /**
   * If the invoice is in draft, this timestamp will reflect when the invoice is
   * scheduled to be issued.
   */
  scheduled_issue_at: string | null;

  shipping_address: Shared.AddressModel | null;

  status: 'issued' | 'paid' | 'synced' | 'void' | 'draft';

  subscription: Shared.SubscriptionMinifiedModel | null;

  /**
   * The total before any discounts and minimums are applied.
   */
  subtotal: string;

  /**
   * If the invoice failed to sync, this will be the last time an external invoicing
   * provider sync was attempted. This field will always be `null` for invoices using
   * Orb Invoicing.
   */
  sync_failed_at: string | null;

  /**
   * The scheduled date of the invoice
   */
  target_date: string;

  /**
   * The total after any minimums and discounts have been applied.
   */
  total: string;

  /**
   * If the invoice has a status of `void`, this gives a timestamp when the invoice
   * was voided.
   */
  voided_at: string | null;

  /**
   * This is true if the invoice will be automatically issued in the future, and
   * false otherwise.
   */
  will_auto_issue: boolean;
}

export interface InvoiceCreateParams {
  /**
   * An ISO 4217 currency string. Must be the same as the customer's currency if it
   * is set.
   */
  currency: string;

  /**
   * Optional invoice date to set. Must be in the past, if not set, `invoice_date` is
   * set to the current time in the customer's timezone.
   */
  invoice_date: string;

  line_items: Array<InvoiceCreateParams.LineItem>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of '0' here represents that the
   * invoice is due on issue, whereas a value of 30 represents that the customer has
   * 30 days to pay the invoice.
   */
  net_terms: number;

  /**
   * The id of the `Customer` to create this invoice for. One of `customer_id` and
   * `external_customer_id` are required.
   */
  customer_id?: string | null;

  /**
   * An optional discount to attach to the invoice.
   */
  discount?: Shared.Discount | null;

  /**
   * The `external_customer_id` of the `Customer` to create this invoice for. One of
   * `customer_id` and `external_customer_id` are required.
   */
  external_customer_id?: string | null;

  /**
   * An optional memo to attach to the invoice.
   */
  memo?: string | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;

  /**
   * When true, this invoice will automatically be issued upon creation. When false,
   * the resulting invoice will require manual review to issue. Defaulted to false.
   */
  will_auto_issue?: boolean;
}

export namespace InvoiceCreateParams {
  export interface LineItem {
    /**
     * A date string to specify the line item's end date in the customer's timezone.
     */
    end_date: string;

    item_id: string;

    model_type: 'unit';

    /**
     * The name of the line item.
     */
    name: string;

    /**
     * The number of units on the line item
     */
    quantity: number;

    /**
     * A date string to specify the line item's start date in the customer's timezone.
     */
    start_date: string;

    unit_config: Shared.UnitConfigModel;
  }
}

export interface InvoiceUpdateParams {
  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface InvoiceListParams extends PageParams {
  amount?: string | null;

  'amount[gt]'?: string | null;

  'amount[lt]'?: string | null;

  customer_id?: string | null;

  date_type?: 'due_date' | 'invoice_date' | null;

  due_date?: string | null;

  /**
   * Filters invoices by their due dates within a specific time range in the past.
   * Specify the range as a number followed by 'd' (days) or 'm' (months). For
   * example, '7d' filters invoices due in the last 7 days, and '2m' filters those
   * due in the last 2 months.
   */
  due_date_window?: string | null;

  'due_date[gt]'?: string | null;

  'due_date[lt]'?: string | null;

  external_customer_id?: string | null;

  'invoice_date[gt]'?: string | null;

  'invoice_date[gte]'?: string | null;

  'invoice_date[lt]'?: string | null;

  'invoice_date[lte]'?: string | null;

  is_recurring?: boolean | null;

  status?: Array<'draft' | 'issued' | 'paid' | 'synced' | 'void'> | null;

  subscription_id?: string | null;
}

export interface InvoiceFetchUpcomingParams {
  subscription_id: string;
}

export interface InvoiceIssueParams {
  /**
   * If true, the invoice will be issued synchronously. If false, the invoice will be
   * issued asynchronously. The synchronous option is only available for invoices
   * that have no usage fees. If the invoice is configured to sync to an external
   * provider, a successful response from this endpoint guarantees the invoice is
   * present in the provider.
   */
  synchronous?: boolean;
}

export interface InvoiceMarkPaidParams {
  /**
   * A date string to specify the date of the payment.
   */
  payment_received_date: string;

  /**
   * An optional external ID to associate with the payment.
   */
  external_id?: string | null;

  /**
   * An optional note to associate with the payment.
   */
  notes?: string | null;
}

export declare namespace Invoices {
  export {
    type Invoice as Invoice,
    type InvoiceFetchUpcomingResponse as InvoiceFetchUpcomingResponse,
    type InvoiceCreateParams as InvoiceCreateParams,
    type InvoiceUpdateParams as InvoiceUpdateParams,
    type InvoiceListParams as InvoiceListParams,
    type InvoiceFetchUpcomingParams as InvoiceFetchUpcomingParams,
    type InvoiceIssueParams as InvoiceIssueParams,
    type InvoiceMarkPaidParams as InvoiceMarkPaidParams,
  };
}

export { InvoiceModelsPage };
