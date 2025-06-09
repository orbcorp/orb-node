// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';
import { Page } from '../pagination';

export interface Address {
  city: string | null;

  country: string | null;

  line1: string | null;

  line2: string | null;

  postal_code: string | null;

  state: string | null;
}

export interface AdjustmentInterval {
  id: string;

  adjustment:
    | PlanPhaseUsageDiscountAdjustment
    | PlanPhaseAmountDiscountAdjustment
    | PlanPhasePercentageDiscountAdjustment
    | PlanPhaseMinimumAdjustment
    | PlanPhaseMaximumAdjustment;

  /**
   * The price interval IDs that this adjustment applies to.
   */
  applies_to_price_interval_ids: Array<string>;

  /**
   * The end date of the adjustment interval.
   */
  end_date: string | null;

  /**
   * The start date of the adjustment interval.
   */
  start_date: string;
}

export interface AggregatedCost {
  per_price_costs: Array<PerPriceCost>;

  /**
   * Total costs for the timeframe, excluding any minimums and discounts.
   */
  subtotal: string;

  timeframe_end: string;

  timeframe_start: string;

  /**
   * Total costs for the timeframe, including any minimums and discounts.
   */
  total: string;
}

export interface Allocation {
  allows_rollover: boolean;

  currency: string;

  custom_expiration: CustomExpiration | null;
}

export interface AmountDiscount {
  /**
   * Only available if discount_type is `amount`.
   */
  amount_discount: string;

  discount_type: 'amount';

  /**
   * List of price_ids that this discount applies to. For plan/plan phase discounts,
   * this can be a subset of prices.
   */
  applies_to_price_ids?: Array<string> | null;

  /**
   * The filters that determine which prices to apply this discount to.
   */
  filters?: Array<TransformPriceFilter> | null;

  reason?: string | null;
}

export interface AmountDiscountInterval {
  /**
   * Only available if discount_type is `amount`.
   */
  amount_discount: string;

  /**
   * The price interval ids that this discount interval applies to.
   */
  applies_to_price_interval_ids: Array<string>;

  discount_type: 'amount';

  /**
   * The end date of the discount interval.
   */
  end_date: string | null;

  /**
   * The filters that determine which prices this discount interval applies to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * The start date of the discount interval.
   */
  start_date: string;
}

export interface BillableMetricTiny {
  id: string;
}

export interface BillingCycleAnchorConfiguration {
  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  day: number;

  /**
   * The month on which the billing cycle is anchored (e.g. a quarterly price
   * anchored in February would have cycles starting February, May, August, and
   * November).
   */
  month?: number | null;

  /**
   * The year on which the billing cycle is anchored (e.g. a 2 year billing cycle
   * anchored on 2021 would have cycles starting on 2021, 2023, 2025, etc.).
   */
  year?: number | null;
}

export interface BillingCycleConfiguration {
  duration: number;

  duration_unit: 'day' | 'month';
}

export type BillingCycleRelativeDate = 'start_of_term' | 'end_of_term';

export interface BPSConfig {
  /**
   * Basis point take rate per event
   */
  bps: number;

  /**
   * Optional currency amount maximum to cap spend per event
   */
  per_unit_maximum?: string | null;
}

export interface BPSTier {
  /**
   * Per-event basis point rate
   */
  bps: number;

  /**
   * Exclusive tier starting value
   */
  minimum_amount: string;

  /**
   * Inclusive tier ending value
   */
  maximum_amount?: string | null;

  /**
   * Per unit maximum to charge
   */
  per_unit_maximum?: string | null;
}

export interface BulkBPSConfig {
  /**
   * Tiers for a bulk BPS pricing model where all usage is aggregated to a single
   * tier based on total volume
   */
  tiers: Array<BulkBPSTier>;
}

export interface BulkBPSTier {
  /**
   * Basis points to rate on
   */
  bps: number;

  /**
   * Upper bound for tier
   */
  maximum_amount?: string | null;

  /**
   * The maximum amount to charge for any one event
   */
  per_unit_maximum?: string | null;
}

export interface BulkConfig {
  /**
   * Bulk tiers for rating based on total usage volume
   */
  tiers: Array<BulkTier>;
}

export interface BulkTier {
  /**
   * Amount per unit
   */
  unit_amount: string;

  /**
   * Upper bound for this tier
   */
  maximum_units?: number | null;
}

export interface ChangedSubscriptionResources {
  /**
   * The credit notes that were created as part of this operation.
   */
  created_credit_notes: Array<CreditNote>;

  /**
   * The invoices that were created as part of this operation.
   */
  created_invoices: Array<Invoice>;

  /**
   * The credit notes that were voided as part of this operation.
   */
  voided_credit_notes: Array<CreditNote>;

  /**
   * The invoices that were voided as part of this operation.
   */
  voided_invoices: Array<Invoice>;
}

export interface CouponRedemption {
  coupon_id: string;

  end_date: string | null;

  start_date: string;
}

/**
 * The [Credit Note](/invoicing/credit-notes) resource represents a credit that has
 * been applied to a particular invoice.
 */
export interface CreditNote {
  /**
   * The Orb id of this credit note.
   */
  id: string;

  /**
   * The creation time of the resource in Orb.
   */
  created_at: string;

  /**
   * The unique identifier for credit notes.
   */
  credit_note_number: string;

  /**
   * A URL to a PDF of the credit note.
   */
  credit_note_pdf: string | null;

  customer: CustomerMinified;

  /**
   * The id of the invoice resource that this credit note is applied to.
   */
  invoice_id: string;

  /**
   * All of the line items associated with this credit note.
   */
  line_items: Array<CreditNote.LineItem>;

  /**
   * The maximum amount applied on the original invoice
   */
  maximum_amount_adjustment: CreditNote.MaximumAmountAdjustment | null;

  /**
   * An optional memo supplied on the credit note.
   */
  memo: string | null;

  /**
   * Any credited amount from the applied minimum on the invoice.
   */
  minimum_amount_refunded: string | null;

  reason: 'Duplicate' | 'Fraudulent' | 'Order change' | 'Product unsatisfactory' | null;

  /**
   * The total prior to any creditable invoice-level discounts or minimums.
   */
  subtotal: string;

  /**
   * The total including creditable invoice-level discounts or minimums, and tax.
   */
  total: string;

  type: 'refund' | 'adjustment';

  /**
   * The time at which the credit note was voided in Orb, if applicable.
   */
  voided_at: string | null;

  /**
   * Any discounts applied on the original invoice.
   */
  discounts?: Array<CreditNote.Discount>;
}

export namespace CreditNote {
  export interface LineItem {
    /**
     * The Orb id of this resource.
     */
    id: string;

    /**
     * The amount of the line item, including any line item minimums and discounts.
     */
    amount: string;

    /**
     * The id of the item associated with this line item.
     */
    item_id: string;

    /**
     * The name of the corresponding invoice line item.
     */
    name: string;

    /**
     * An optional quantity credited.
     */
    quantity: number | null;

    /**
     * The amount of the line item, excluding any line item minimums and discounts.
     */
    subtotal: string;

    /**
     * Any tax amounts applied onto the line item.
     */
    tax_amounts: Array<Shared.TaxAmount>;

    /**
     * Any line item discounts from the invoice's line item.
     */
    discounts?: Array<LineItem.Discount>;
  }

  export namespace LineItem {
    export interface Discount {
      id: string;

      amount_applied: string;

      applies_to_price_ids: Array<string>;

      discount_type: 'percentage' | 'amount';

      percentage_discount: number;

      amount_discount?: string | null;

      reason?: string | null;
    }
  }

  /**
   * The maximum amount applied on the original invoice
   */
  export interface MaximumAmountAdjustment {
    amount_applied: string;

    discount_type: 'percentage';

    percentage_discount: number;

    applies_to_prices?: Array<MaximumAmountAdjustment.AppliesToPrice> | null;

    reason?: string | null;
  }

  export namespace MaximumAmountAdjustment {
    export interface AppliesToPrice {
      id: string;

      name: string;
    }
  }

  export interface Discount {
    amount_applied: string;

    discount_type: 'percentage';

    percentage_discount: number;

    applies_to_prices?: Array<Discount.AppliesToPrice> | null;

    reason?: string | null;
  }

  export namespace Discount {
    export interface AppliesToPrice {
      id: string;

      name: string;
    }
  }
}

export interface CreditNoteTiny {
  /**
   * The id of the Credit note
   */
  id: string;
}

export interface CustomExpiration {
  duration: number;

  duration_unit: 'day' | 'month';
}

export interface CustomerMinified {
  id: string;

  external_customer_id: string | null;
}

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
export interface CustomerTaxID {
  country:
    | 'AD'
    | 'AE'
    | 'AR'
    | 'AT'
    | 'AU'
    | 'BE'
    | 'BG'
    | 'BH'
    | 'BO'
    | 'BR'
    | 'CA'
    | 'CH'
    | 'CL'
    | 'CN'
    | 'CO'
    | 'CR'
    | 'CY'
    | 'CZ'
    | 'DE'
    | 'DK'
    | 'EE'
    | 'DO'
    | 'EC'
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
    | 'KZ'
    | 'LI'
    | 'LT'
    | 'LU'
    | 'LV'
    | 'MT'
    | 'MX'
    | 'MY'
    | 'NG'
    | 'NL'
    | 'NO'
    | 'NZ'
    | 'OM'
    | 'PE'
    | 'PH'
    | 'PL'
    | 'PT'
    | 'RO'
    | 'RS'
    | 'RU'
    | 'SA'
    | 'SE'
    | 'SG'
    | 'SI'
    | 'SK'
    | 'SV'
    | 'TH'
    | 'TR'
    | 'TW'
    | 'UA'
    | 'US'
    | 'UY'
    | 'VE'
    | 'VN'
    | 'ZA';

  type:
    | 'ad_nrt'
    | 'ae_trn'
    | 'ar_cuit'
    | 'eu_vat'
    | 'au_abn'
    | 'au_arn'
    | 'bg_uic'
    | 'bh_vat'
    | 'bo_tin'
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
    | 'cn_tin'
    | 'co_nit'
    | 'cr_tin'
    | 'do_rcn'
    | 'ec_ruc'
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
    | 'kz_bin'
    | 'li_uid'
    | 'mx_rfc'
    | 'my_frp'
    | 'my_itn'
    | 'my_sst'
    | 'ng_tin'
    | 'no_vat'
    | 'no_voec'
    | 'nz_gst'
    | 'om_vat'
    | 'pe_ruc'
    | 'ph_tin'
    | 'ro_tin'
    | 'rs_pib'
    | 'ru_inn'
    | 'ru_kpp'
    | 'sa_vat'
    | 'sg_gst'
    | 'sg_uen'
    | 'si_tin'
    | 'sv_nit'
    | 'th_vat'
    | 'tr_tin'
    | 'tw_vat'
    | 'ua_vat'
    | 'us_ein'
    | 'uy_ruc'
    | 've_rif'
    | 'vn_tin'
    | 'za_vat';

  value: string;
}

export interface DimensionalPriceConfiguration {
  dimension_values: Array<string>;

  dimensional_price_group_id: string;
}

export type Discount = PercentageDiscount | TrialDiscount | UsageDiscount | AmountDiscount;

export interface FixedFeeQuantityScheduleEntry {
  end_date: string | null;

  price_id: string;

  quantity: number;

  start_date: string;
}

export interface FixedFeeQuantityTransition {
  effective_date: string;

  price_id: string;

  quantity: number;
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

  auto_collection: Invoice.AutoCollection;

  billing_address: Address | null;

  /**
   * The creation time of the resource in Orb.
   */
  created_at: string;

  /**
   * A list of credit notes associated with the invoice
   */
  credit_notes: Array<Invoice.CreditNote>;

  /**
   * An ISO 4217 currency string or `credits`
   */
  currency: string;

  customer: CustomerMinified;

  customer_balance_transactions: Array<Invoice.CustomerBalanceTransaction>;

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
  customer_tax_id: CustomerTaxID | null;

  /**
   * @deprecated This field is deprecated in favor of `discounts`. If a `discounts`
   * list is provided, the first discount in the list will be returned. If the list
   * is empty, `None` will be returned.
   */
  discount: unknown;

  discounts: Array<InvoiceLevelDiscount>;

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
  line_items: Array<Invoice.LineItem>;

  maximum: Maximum | null;

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

  minimum: Minimum | null;

  minimum_amount: string | null;

  /**
   * If the invoice has a status of `paid`, this gives a timestamp when the invoice
   * was paid.
   */
  paid_at: string | null;

  /**
   * A list of payment attempts associated with the invoice
   */
  payment_attempts: Array<Invoice.PaymentAttempt>;

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

  shipping_address: Address | null;

  status: 'issued' | 'paid' | 'synced' | 'void' | 'draft';

  subscription: SubscriptionMinified | null;

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

export namespace Invoice {
  export interface AutoCollection {
    /**
     * True only if auto-collection is enabled for this invoice.
     */
    enabled: boolean | null;

    /**
     * If the invoice is scheduled for auto-collection, this field will reflect when
     * the next attempt will occur. If dunning has been exhausted, or auto-collection
     * is not enabled for this invoice, this field will be `null`.
     */
    next_attempt_at: string | null;

    /**
     * Number of auto-collection payment attempts.
     */
    num_attempts: number | null;

    /**
     * If Orb has ever attempted payment auto-collection for this invoice, this field
     * will reflect when that attempt occurred. In conjunction with `next_attempt_at`,
     * this can be used to tell whether the invoice is currently in dunning (that is,
     * `previously_attempted_at` is non-null, and `next_attempt_time` is non-null), or
     * if dunning has been exhausted (`previously_attempted_at` is non-null, but
     * `next_attempt_time` is null).
     */
    previously_attempted_at: string | null;
  }

  export interface CreditNote {
    id: string;

    credit_note_number: string;

    /**
     * An optional memo supplied on the credit note.
     */
    memo: string | null;

    reason: string;

    total: string;

    type: string;

    /**
     * If the credit note has a status of `void`, this gives a timestamp when the
     * credit note was voided.
     */
    voided_at: string | null;
  }

  export interface CustomerBalanceTransaction {
    /**
     * A unique id for this transaction.
     */
    id: string;

    action:
      | 'applied_to_invoice'
      | 'manual_adjustment'
      | 'prorated_refund'
      | 'revert_prorated_refund'
      | 'return_from_voiding'
      | 'credit_note_applied'
      | 'credit_note_voided'
      | 'overpayment_refund'
      | 'external_payment';

    /**
     * The value of the amount changed in the transaction.
     */
    amount: string;

    /**
     * The creation time of this transaction.
     */
    created_at: string;

    credit_note: Shared.CreditNoteTiny | null;

    /**
     * An optional description provided for manual customer balance adjustments.
     */
    description: string | null;

    /**
     * The new value of the customer's balance prior to the transaction, in the
     * customer's currency.
     */
    ending_balance: string;

    invoice: Shared.InvoiceTiny | null;

    /**
     * The original value of the customer's balance prior to the transaction, in the
     * customer's currency.
     */
    starting_balance: string;

    type: 'increment' | 'decrement';
  }

  export interface LineItem {
    /**
     * A unique ID for this line item.
     */
    id: string;

    /**
     * The line amount after any adjustments and before overage conversion, credits and
     * partial invoicing.
     */
    adjusted_subtotal: string;

    /**
     * All adjustments applied to the line item in the order they were applied based on
     * invoice calculations (ie. usage discounts -> amount discounts -> percentage
     * discounts -> minimums -> maximums).
     */
    adjustments: Array<
      | Shared.MonetaryUsageDiscountAdjustment
      | Shared.MonetaryAmountDiscountAdjustment
      | Shared.MonetaryPercentageDiscountAdjustment
      | Shared.MonetaryMinimumAdjustment
      | Shared.MonetaryMaximumAdjustment
    >;

    /**
     * The final amount for a line item after all adjustments and pre paid credits have
     * been applied.
     */
    amount: string;

    /**
     * The number of prepaid credits applied.
     */
    credits_applied: string;

    discount: Shared.Discount | null;

    /**
     * The end date of the range of time applied for this line item's price.
     */
    end_date: string;

    /**
     * An additional filter that was used to calculate the usage for this line item.
     */
    filter: string | null;

    /**
     * [DEPRECATED] For configured prices that are split by a grouping key, this will
     * be populated with the key and a value. The `amount` and `subtotal` will be the
     * values for this particular grouping.
     */
    grouping: string | null;

    /**
     * @deprecated This field is deprecated in favor of `adjustments`.
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated This field is deprecated in favor of `adjustments`.
     */
    maximum_amount: string | null;

    /**
     * @deprecated This field is deprecated in favor of `adjustments`.
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated This field is deprecated in favor of `adjustments`.
     */
    minimum_amount: string | null;

    /**
     * The name of the price associated with this line item.
     */
    name: string;

    /**
     * Any amount applied from a partial invoice
     */
    partially_invoiced_amount: string;

    /**
     * The Price resource represents a price that can be billed on a subscription,
     * resulting in a charge on an invoice in the form of an invoice line item. Prices
     * take a quantity and determine an amount to bill.
     *
     * Orb supports a few different pricing models out of the box. Each of these models
     * is serialized differently in a given Price object. The model_type field
     * determines the key for the configuration object that is present.
     *
     * For more on the types of prices, see
     * [the core concepts documentation](/core-concepts#plan-and-price)
     */
    price: Shared.Price;

    /**
     * Either the fixed fee quantity or the usage during the service period.
     */
    quantity: number;

    /**
     * The start date of the range of time applied for this line item's price.
     */
    start_date: string;

    /**
     * For complex pricing structures, the line item can be broken down further in
     * `sub_line_items`.
     */
    sub_line_items: Array<Shared.MatrixSubLineItem | Shared.TierSubLineItem | Shared.OtherSubLineItem>;

    /**
     * The line amount before before any adjustments.
     */
    subtotal: string;

    /**
     * An array of tax rates and their incurred tax amounts. Empty if no tax
     * integration is configured.
     */
    tax_amounts: Array<Shared.TaxAmount>;

    /**
     * A list of customer ids that were used to calculate the usage for this line item.
     */
    usage_customer_ids: Array<string> | null;
  }

  export interface PaymentAttempt {
    /**
     * The ID of the payment attempt.
     */
    id: string;

    /**
     * The amount of the payment attempt.
     */
    amount: string;

    /**
     * The time at which the payment attempt was created.
     */
    created_at: string;

    /**
     * The payment provider that attempted to collect the payment.
     */
    payment_provider: 'stripe' | null;

    /**
     * The ID of the payment attempt in the payment provider.
     */
    payment_provider_id: string | null;

    /**
     * Whether the payment attempt succeeded.
     */
    succeeded: boolean;
  }
}

export type InvoiceLevelDiscount = PercentageDiscount | AmountDiscount | TrialDiscount;

export interface InvoiceTiny {
  /**
   * The Invoice id
   */
  id: string;
}

export interface ItemSlim {
  id: string;

  name: string;
}

export interface MatrixConfig {
  /**
   * Default per unit rate for any usage not bucketed into a specified matrix_value
   */
  default_unit_amount: string;

  /**
   * One or two event property values to evaluate matrix groups by
   */
  dimensions: Array<string | null>;

  /**
   * Matrix values for specified matrix grouping keys
   */
  matrix_values: Array<MatrixValue>;
}

export interface MatrixSubLineItem {
  /**
   * The total amount for this sub line item.
   */
  amount: string;

  grouping: SubLineItemGrouping | null;

  matrix_config: SubLineItemMatrixConfig;

  name: string;

  quantity: number;

  type: 'matrix';
}

export interface MatrixValue {
  /**
   * One or two matrix keys to filter usage to this Matrix value by. For example,
   * ["region", "tier"] could be used to filter cloud usage by a cloud region and an
   * instance tier.
   */
  dimension_values: Array<string | null>;

  /**
   * Unit price for the specified dimension_values
   */
  unit_amount: string;
}

export interface MatrixWithAllocationConfig {
  /**
   * Allocation to be used to calculate the price
   */
  allocation: number;

  /**
   * Default per unit rate for any usage not bucketed into a specified matrix_value
   */
  default_unit_amount: string;

  /**
   * One or two event property values to evaluate matrix groups by
   */
  dimensions: Array<string | null>;

  /**
   * Matrix values for specified matrix grouping keys
   */
  matrix_values: Array<MatrixValue>;
}

export interface Maximum {
  /**
   * @deprecated List of price_ids that this maximum amount applies to. For plan/plan
   * phase maximums, this can be a subset of prices.
   */
  applies_to_price_ids: Array<string>;

  /**
   * The filters that determine which prices to apply this maximum to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * Maximum amount applied
   */
  maximum_amount: string;
}

export interface MaximumInterval {
  /**
   * The price interval ids that this maximum interval applies to.
   */
  applies_to_price_interval_ids: Array<string>;

  /**
   * The end date of the maximum interval.
   */
  end_date: string | null;

  /**
   * The filters that determine which prices this maximum interval applies to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * The maximum amount to charge in a given billing period for the price intervals
   * this transform applies to.
   */
  maximum_amount: string;

  /**
   * The start date of the maximum interval.
   */
  start_date: string;
}

export interface Minimum {
  /**
   * @deprecated List of price_ids that this minimum amount applies to. For plan/plan
   * phase minimums, this can be a subset of prices.
   */
  applies_to_price_ids: Array<string>;

  /**
   * The filters that determine which prices to apply this minimum to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * Minimum amount applied
   */
  minimum_amount: string;
}

export interface MinimumInterval {
  /**
   * The price interval ids that this minimum interval applies to.
   */
  applies_to_price_interval_ids: Array<string>;

  /**
   * The end date of the minimum interval.
   */
  end_date: string | null;

  /**
   * The filters that determine which prices this minimum interval applies to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * The minimum amount to charge in a given billing period for the price intervals
   * this minimum applies to.
   */
  minimum_amount: string;

  /**
   * The start date of the minimum interval.
   */
  start_date: string;
}

export interface MonetaryAmountDiscountAdjustment {
  id: string;

  adjustment_type: 'amount_discount';

  /**
   * The value applied by an adjustment.
   */
  amount: string;

  /**
   * The amount by which to discount the prices this adjustment applies to in a given
   * billing period.
   */
  amount_discount: string;

  /**
   * @deprecated The price IDs that this adjustment applies to.
   */
  applies_to_price_ids: Array<string>;

  /**
   * The filters that determine which prices to apply this adjustment to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * True for adjustments that apply to an entire invocice, false for adjustments
   * that apply to only one price.
   */
  is_invoice_level: boolean;

  /**
   * The reason for the adjustment.
   */
  reason: string | null;
}

export interface MonetaryMaximumAdjustment {
  id: string;

  adjustment_type: 'maximum';

  /**
   * The value applied by an adjustment.
   */
  amount: string;

  /**
   * @deprecated The price IDs that this adjustment applies to.
   */
  applies_to_price_ids: Array<string>;

  /**
   * The filters that determine which prices to apply this adjustment to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * True for adjustments that apply to an entire invocice, false for adjustments
   * that apply to only one price.
   */
  is_invoice_level: boolean;

  /**
   * The maximum amount to charge in a given billing period for the prices this
   * adjustment applies to.
   */
  maximum_amount: string;

  /**
   * The reason for the adjustment.
   */
  reason: string | null;
}

export interface MonetaryMinimumAdjustment {
  id: string;

  adjustment_type: 'minimum';

  /**
   * The value applied by an adjustment.
   */
  amount: string;

  /**
   * @deprecated The price IDs that this adjustment applies to.
   */
  applies_to_price_ids: Array<string>;

  /**
   * The filters that determine which prices to apply this adjustment to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * True for adjustments that apply to an entire invocice, false for adjustments
   * that apply to only one price.
   */
  is_invoice_level: boolean;

  /**
   * The item ID that revenue from this minimum will be attributed to.
   */
  item_id: string;

  /**
   * The minimum amount to charge in a given billing period for the prices this
   * adjustment applies to.
   */
  minimum_amount: string;

  /**
   * The reason for the adjustment.
   */
  reason: string | null;
}

export interface MonetaryPercentageDiscountAdjustment {
  id: string;

  adjustment_type: 'percentage_discount';

  /**
   * The value applied by an adjustment.
   */
  amount: string;

  /**
   * @deprecated The price IDs that this adjustment applies to.
   */
  applies_to_price_ids: Array<string>;

  /**
   * The filters that determine which prices to apply this adjustment to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * True for adjustments that apply to an entire invocice, false for adjustments
   * that apply to only one price.
   */
  is_invoice_level: boolean;

  /**
   * The percentage (as a value between 0 and 1) by which to discount the price
   * intervals this adjustment applies to in a given billing period.
   */
  percentage_discount: number;

  /**
   * The reason for the adjustment.
   */
  reason: string | null;
}

export interface MonetaryUsageDiscountAdjustment {
  id: string;

  adjustment_type: 'usage_discount';

  /**
   * The value applied by an adjustment.
   */
  amount: string;

  /**
   * @deprecated The price IDs that this adjustment applies to.
   */
  applies_to_price_ids: Array<string>;

  /**
   * The filters that determine which prices to apply this adjustment to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * True for adjustments that apply to an entire invocice, false for adjustments
   * that apply to only one price.
   */
  is_invoice_level: boolean;

  /**
   * The reason for the adjustment.
   */
  reason: string | null;

  /**
   * The number of usage units by which to discount the price this adjustment applies
   * to in a given billing period.
   */
  usage_discount: number;
}

export interface NewAllocationPrice {
  /**
   * An amount of the currency to allocate to the customer at the specified cadence.
   */
  amount: string;

  /**
   * The cadence at which to allocate the amount to the customer.
   */
  cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

  /**
   * An ISO 4217 currency string or a custom pricing unit identifier in which to bill
   * this price.
   */
  currency: string;

  /**
   * The custom expiration for the allocation.
   */
  custom_expiration?: CustomExpiration | null;

  /**
   * Whether the allocated amount should expire at the end of the cadence or roll
   * over to the next period. Set to null if using custom_expiration.
   */
  expires_at_end_of_cadence?: boolean | null;
}

export interface NewAmountDiscount {
  adjustment_type: 'amount_discount';

  amount_discount: string;

  /**
   * If set, the adjustment will apply to every price on the subscription.
   */
  applies_to_all?: true | null;

  /**
   * The set of item IDs to which this adjustment applies.
   */
  applies_to_item_ids?: Array<string> | null;

  /**
   * The set of price IDs to which this adjustment applies.
   */
  applies_to_price_ids?: Array<string> | null;

  /**
   * If set, only prices in the specified currency will have the adjustment applied.
   */
  currency?: string | null;

  /**
   * A list of filters that determine which prices this adjustment will apply to.
   */
  filters?: Array<TransformPriceFilter> | null;

  /**
   * When false, this adjustment will be applied to a single price. Otherwise, it
   * will be applied at the invoice level, possibly to multiple prices.
   */
  is_invoice_level?: boolean;

  /**
   * If set, only prices of the specified type will have the adjustment applied.
   */
  price_type?: 'usage' | 'fixed_in_advance' | 'fixed_in_arrears' | 'fixed' | 'in_arrears' | null;
}

export interface NewBillingCycleConfiguration {
  /**
   * The duration of the billing period.
   */
  duration: number;

  /**
   * The unit of billing period duration.
   */
  duration_unit: 'day' | 'month';
}

export interface NewDimensionalPriceConfiguration {
  /**
   * The list of dimension values matching (in order) the dimensions of the price
   * group
   */
  dimension_values: Array<string>;

  /**
   * The id of the dimensional price group to include this price in
   */
  dimensional_price_group_id?: string | null;

  /**
   * The external id of the dimensional price group to include this price in
   */
  external_dimensional_price_group_id?: string | null;
}

export interface NewFloatingBPSPrice {
  bps_config: BPSConfig;

  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'bps';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingBulkBPSPrice {
  bulk_bps_config: BulkBPSConfig;

  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'bulk_bps';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingBulkPrice {
  bulk_config: BulkConfig;

  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'bulk';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingBulkWithProrationPrice {
  bulk_with_proration_config: Record<string, unknown>;

  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'bulk_with_proration';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingCumulativeGroupedBulkPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  cumulative_grouped_bulk_config: Record<string, unknown>;

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'cumulative_grouped_bulk';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingGroupedAllocationPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  grouped_allocation_config: Record<string, unknown>;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'grouped_allocation';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingGroupedTieredPackagePrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  grouped_tiered_package_config: Record<string, unknown>;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'grouped_tiered_package';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingGroupedTieredPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  grouped_tiered_config: Record<string, unknown>;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'grouped_tiered';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingGroupedWithMeteredMinimumPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  grouped_with_metered_minimum_config: Record<string, unknown>;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'grouped_with_metered_minimum';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingGroupedWithProratedMinimumPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  grouped_with_prorated_minimum_config: Record<string, unknown>;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'grouped_with_prorated_minimum';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingMatrixPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  matrix_config: MatrixConfig;

  model_type: 'matrix';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingMatrixWithAllocationPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  matrix_with_allocation_config: MatrixWithAllocationConfig;

  model_type: 'matrix_with_allocation';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingMatrixWithDisplayNamePrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  matrix_with_display_name_config: Record<string, unknown>;

  model_type: 'matrix_with_display_name';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingMaxGroupTieredPackagePrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  max_group_tiered_package_config: Record<string, unknown>;

  model_type: 'max_group_tiered_package';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingPackagePrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'package';

  /**
   * The name of the price.
   */
  name: string;

  package_config: PackageConfig;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingPackageWithAllocationPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'package_with_allocation';

  /**
   * The name of the price.
   */
  name: string;

  package_with_allocation_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingScalableMatrixWithTieredPricingPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'scalable_matrix_with_tiered_pricing';

  /**
   * The name of the price.
   */
  name: string;

  scalable_matrix_with_tiered_pricing_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingScalableMatrixWithUnitPricingPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'scalable_matrix_with_unit_pricing';

  /**
   * The name of the price.
   */
  name: string;

  scalable_matrix_with_unit_pricing_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingThresholdTotalAmountPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'threshold_total_amount';

  /**
   * The name of the price.
   */
  name: string;

  threshold_total_amount_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingTieredBPSPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'tiered_bps';

  /**
   * The name of the price.
   */
  name: string;

  tiered_bps_config: TieredBPSConfig;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingTieredPackagePrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'tiered_package';

  /**
   * The name of the price.
   */
  name: string;

  tiered_package_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingTieredPackageWithMinimumPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'tiered_package_with_minimum';

  /**
   * The name of the price.
   */
  name: string;

  tiered_package_with_minimum_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingTieredPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'tiered';

  /**
   * The name of the price.
   */
  name: string;

  tiered_config: TieredConfig;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingTieredWithMinimumPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'tiered_with_minimum';

  /**
   * The name of the price.
   */
  name: string;

  tiered_with_minimum_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingTieredWithProrationPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'tiered_with_proration';

  /**
   * The name of the price.
   */
  name: string;

  tiered_with_proration_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingUnitPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'unit';

  /**
   * The name of the price.
   */
  name: string;

  unit_config: UnitConfig;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingUnitWithPercentPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'unit_with_percent';

  /**
   * The name of the price.
   */
  name: string;

  unit_with_percent_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewFloatingUnitWithProrationPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'unit_with_proration';

  /**
   * The name of the price.
   */
  name: string;

  unit_with_proration_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewMaximum {
  adjustment_type: 'maximum';

  maximum_amount: string;

  /**
   * If set, the adjustment will apply to every price on the subscription.
   */
  applies_to_all?: true | null;

  /**
   * The set of item IDs to which this adjustment applies.
   */
  applies_to_item_ids?: Array<string> | null;

  /**
   * The set of price IDs to which this adjustment applies.
   */
  applies_to_price_ids?: Array<string> | null;

  /**
   * If set, only prices in the specified currency will have the adjustment applied.
   */
  currency?: string | null;

  /**
   * A list of filters that determine which prices this adjustment will apply to.
   */
  filters?: Array<TransformPriceFilter> | null;

  /**
   * When false, this adjustment will be applied to a single price. Otherwise, it
   * will be applied at the invoice level, possibly to multiple prices.
   */
  is_invoice_level?: boolean;

  /**
   * If set, only prices of the specified type will have the adjustment applied.
   */
  price_type?: 'usage' | 'fixed_in_advance' | 'fixed_in_arrears' | 'fixed' | 'in_arrears' | null;
}

export interface NewMinimum {
  adjustment_type: 'minimum';

  /**
   * The item ID that revenue from this minimum will be attributed to.
   */
  item_id: string;

  minimum_amount: string;

  /**
   * If set, the adjustment will apply to every price on the subscription.
   */
  applies_to_all?: true | null;

  /**
   * The set of item IDs to which this adjustment applies.
   */
  applies_to_item_ids?: Array<string> | null;

  /**
   * The set of price IDs to which this adjustment applies.
   */
  applies_to_price_ids?: Array<string> | null;

  /**
   * If set, only prices in the specified currency will have the adjustment applied.
   */
  currency?: string | null;

  /**
   * A list of filters that determine which prices this adjustment will apply to.
   */
  filters?: Array<TransformPriceFilter> | null;

  /**
   * When false, this adjustment will be applied to a single price. Otherwise, it
   * will be applied at the invoice level, possibly to multiple prices.
   */
  is_invoice_level?: boolean;

  /**
   * If set, only prices of the specified type will have the adjustment applied.
   */
  price_type?: 'usage' | 'fixed_in_advance' | 'fixed_in_arrears' | 'fixed' | 'in_arrears' | null;
}

export interface NewPercentageDiscount {
  adjustment_type: 'percentage_discount';

  percentage_discount: number;

  /**
   * If set, the adjustment will apply to every price on the subscription.
   */
  applies_to_all?: true | null;

  /**
   * The set of item IDs to which this adjustment applies.
   */
  applies_to_item_ids?: Array<string> | null;

  /**
   * The set of price IDs to which this adjustment applies.
   */
  applies_to_price_ids?: Array<string> | null;

  /**
   * If set, only prices in the specified currency will have the adjustment applied.
   */
  currency?: string | null;

  /**
   * A list of filters that determine which prices this adjustment will apply to.
   */
  filters?: Array<TransformPriceFilter> | null;

  /**
   * When false, this adjustment will be applied to a single price. Otherwise, it
   * will be applied at the invoice level, possibly to multiple prices.
   */
  is_invoice_level?: boolean;

  /**
   * If set, only prices of the specified type will have the adjustment applied.
   */
  price_type?: 'usage' | 'fixed_in_advance' | 'fixed_in_arrears' | 'fixed' | 'in_arrears' | null;
}

export interface NewPlanBPSPrice {
  bps_config: BPSConfig;

  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'bps';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanBulkBPSPrice {
  bulk_bps_config: BulkBPSConfig;

  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'bulk_bps';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanBulkPrice {
  bulk_config: BulkConfig;

  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'bulk';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanBulkWithProrationPrice {
  bulk_with_proration_config: Record<string, unknown>;

  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'bulk_with_proration';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanCumulativeGroupedBulkPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  cumulative_grouped_bulk_config: Record<string, unknown>;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'cumulative_grouped_bulk';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanGroupedAllocationPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  grouped_allocation_config: Record<string, unknown>;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'grouped_allocation';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanGroupedTieredPackagePrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  grouped_tiered_package_config: Record<string, unknown>;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'grouped_tiered_package';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanGroupedTieredPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  grouped_tiered_config: Record<string, unknown>;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'grouped_tiered';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanGroupedWithMeteredMinimumPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  grouped_with_metered_minimum_config: Record<string, unknown>;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'grouped_with_metered_minimum';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanGroupedWithProratedMinimumPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  grouped_with_prorated_minimum_config: Record<string, unknown>;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'grouped_with_prorated_minimum';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanMatrixPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  matrix_config: MatrixConfig;

  model_type: 'matrix';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanMatrixWithAllocationPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  matrix_with_allocation_config: MatrixWithAllocationConfig;

  model_type: 'matrix_with_allocation';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanMatrixWithDisplayNamePrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  matrix_with_display_name_config: Record<string, unknown>;

  model_type: 'matrix_with_display_name';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanMaxGroupTieredPackagePrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  max_group_tiered_package_config: Record<string, unknown>;

  model_type: 'max_group_tiered_package';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanPackagePrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'package';

  /**
   * The name of the price.
   */
  name: string;

  package_config: PackageConfig;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanPackageWithAllocationPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'package_with_allocation';

  /**
   * The name of the price.
   */
  name: string;

  package_with_allocation_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanScalableMatrixWithTieredPricingPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'scalable_matrix_with_tiered_pricing';

  /**
   * The name of the price.
   */
  name: string;

  scalable_matrix_with_tiered_pricing_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanScalableMatrixWithUnitPricingPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'scalable_matrix_with_unit_pricing';

  /**
   * The name of the price.
   */
  name: string;

  scalable_matrix_with_unit_pricing_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanThresholdTotalAmountPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'threshold_total_amount';

  /**
   * The name of the price.
   */
  name: string;

  threshold_total_amount_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanTierWithProrationPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'tiered_with_proration';

  /**
   * The name of the price.
   */
  name: string;

  tiered_with_proration_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanTieredBPSPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'tiered_bps';

  /**
   * The name of the price.
   */
  name: string;

  tiered_bps_config: TieredBPSConfig;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanTieredPackagePrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'tiered_package';

  /**
   * The name of the price.
   */
  name: string;

  tiered_package_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanTieredPackageWithMinimumPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'tiered_package_with_minimum';

  /**
   * The name of the price.
   */
  name: string;

  tiered_package_with_minimum_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanTieredPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'tiered';

  /**
   * The name of the price.
   */
  name: string;

  tiered_config: TieredConfig;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanTieredWithMinimumPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'tiered_with_minimum';

  /**
   * The name of the price.
   */
  name: string;

  tiered_with_minimum_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanUnitPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'unit';

  /**
   * The name of the price.
   */
  name: string;

  unit_config: UnitConfig;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanUnitWithPercentPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'unit_with_percent';

  /**
   * The name of the price.
   */
  name: string;

  unit_with_percent_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewPlanUnitWithProrationPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  model_type: 'unit_with_proration';

  /**
   * The name of the price.
   */
  name: string;

  unit_with_proration_config: Record<string, unknown>;

  /**
   * The id of the billable metric for the price. Only needed if the price is
   * usage-based.
   */
  billable_metric_id?: string | null;

  /**
   * If the Price represents a fixed cost, the price will be billed in-advance if
   * this is true, and in-arrears if this is false.
   */
  billed_in_advance?: boolean | null;

  /**
   * For custom cadence: specifies the duration of the billing period in days or
   * months.
   */
  billing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * The per unit conversion rate of the price currency to the invoicing currency.
   */
  conversion_rate?: number | null;

  /**
   * An ISO 4217 currency string, or custom pricing unit identifier, in which this
   * price is billed.
   */
  currency?: string | null;

  /**
   * For dimensional price: specifies a price group and dimension values
   */
  dimensional_price_configuration?: NewDimensionalPriceConfiguration | null;

  /**
   * An alias for the price.
   */
  external_price_id?: string | null;

  /**
   * If the Price represents a fixed cost, this represents the quantity of units
   * applied.
   */
  fixed_price_quantity?: number | null;

  /**
   * The property used to group this price on an invoice
   */
  invoice_grouping_key?: string | null;

  /**
   * Within each billing cycle, specifies the cadence at which invoices are produced.
   * If unspecified, a single invoice is produced per billing cycle.
   */
  invoicing_cycle_configuration?: NewBillingCycleConfiguration | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface NewUsageDiscount {
  adjustment_type: 'usage_discount';

  usage_discount: number;

  /**
   * If set, the adjustment will apply to every price on the subscription.
   */
  applies_to_all?: true | null;

  /**
   * The set of item IDs to which this adjustment applies.
   */
  applies_to_item_ids?: Array<string> | null;

  /**
   * The set of price IDs to which this adjustment applies.
   */
  applies_to_price_ids?: Array<string> | null;

  /**
   * If set, only prices in the specified currency will have the adjustment applied.
   */
  currency?: string | null;

  /**
   * A list of filters that determine which prices this adjustment will apply to.
   */
  filters?: Array<TransformPriceFilter> | null;

  /**
   * When false, this adjustment will be applied to a single price. Otherwise, it
   * will be applied at the invoice level, possibly to multiple prices.
   */
  is_invoice_level?: boolean;

  /**
   * If set, only prices of the specified type will have the adjustment applied.
   */
  price_type?: 'usage' | 'fixed_in_advance' | 'fixed_in_arrears' | 'fixed' | 'in_arrears' | null;
}

export interface OtherSubLineItem {
  /**
   * The total amount for this sub line item.
   */
  amount: string;

  grouping: SubLineItemGrouping | null;

  name: string;

  quantity: number;

  type: "'null'";
}

export interface PackageConfig {
  /**
   * A currency amount to rate usage by
   */
  package_amount: string;

  /**
   * An integer amount to represent package size. For example, 1000 here would divide
   * usage by 1000 before multiplying by package_amount in rating
   */
  package_size: number;
}

export interface PaginationMetadata {
  has_more: boolean;

  next_cursor: string | null;
}

export interface PerPriceCost {
  /**
   * The price object
   */
  price: Price;

  /**
   * The price the cost is associated with
   */
  price_id: string;

  /**
   * Price's contributions for the timeframe, excluding any minimums and discounts.
   */
  subtotal: string;

  /**
   * Price's contributions for the timeframe, including minimums and discounts.
   */
  total: string;

  /**
   * The price's quantity for the timeframe
   */
  quantity?: number | null;
}

export interface PercentageDiscount {
  discount_type: 'percentage';

  /**
   * Only available if discount_type is `percentage`. This is a number between 0
   * and 1.
   */
  percentage_discount: number;

  /**
   * List of price_ids that this discount applies to. For plan/plan phase discounts,
   * this can be a subset of prices.
   */
  applies_to_price_ids?: Array<string> | null;

  /**
   * The filters that determine which prices to apply this discount to.
   */
  filters?: Array<TransformPriceFilter> | null;

  reason?: string | null;
}

export interface PercentageDiscountInterval {
  /**
   * The price interval ids that this discount interval applies to.
   */
  applies_to_price_interval_ids: Array<string>;

  discount_type: 'percentage';

  /**
   * The end date of the discount interval.
   */
  end_date: string | null;

  /**
   * The filters that determine which prices this discount interval applies to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * Only available if discount_type is `percentage`.This is a number between 0
   * and 1.
   */
  percentage_discount: number;

  /**
   * The start date of the discount interval.
   */
  start_date: string;
}

export interface PlanPhaseAmountDiscountAdjustment {
  id: string;

  adjustment_type: 'amount_discount';

  /**
   * The amount by which to discount the prices this adjustment applies to in a given
   * billing period.
   */
  amount_discount: string;

  /**
   * @deprecated The price IDs that this adjustment applies to.
   */
  applies_to_price_ids: Array<string>;

  /**
   * The filters that determine which prices to apply this adjustment to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * True for adjustments that apply to an entire invocice, false for adjustments
   * that apply to only one price.
   */
  is_invoice_level: boolean;

  /**
   * The plan phase in which this adjustment is active.
   */
  plan_phase_order: number | null;

  /**
   * The reason for the adjustment.
   */
  reason: string | null;
}

export interface PlanPhaseMaximumAdjustment {
  id: string;

  adjustment_type: 'maximum';

  /**
   * @deprecated The price IDs that this adjustment applies to.
   */
  applies_to_price_ids: Array<string>;

  /**
   * The filters that determine which prices to apply this adjustment to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * True for adjustments that apply to an entire invocice, false for adjustments
   * that apply to only one price.
   */
  is_invoice_level: boolean;

  /**
   * The maximum amount to charge in a given billing period for the prices this
   * adjustment applies to.
   */
  maximum_amount: string;

  /**
   * The plan phase in which this adjustment is active.
   */
  plan_phase_order: number | null;

  /**
   * The reason for the adjustment.
   */
  reason: string | null;
}

export interface PlanPhaseMinimumAdjustment {
  id: string;

  adjustment_type: 'minimum';

  /**
   * @deprecated The price IDs that this adjustment applies to.
   */
  applies_to_price_ids: Array<string>;

  /**
   * The filters that determine which prices to apply this adjustment to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * True for adjustments that apply to an entire invocice, false for adjustments
   * that apply to only one price.
   */
  is_invoice_level: boolean;

  /**
   * The item ID that revenue from this minimum will be attributed to.
   */
  item_id: string;

  /**
   * The minimum amount to charge in a given billing period for the prices this
   * adjustment applies to.
   */
  minimum_amount: string;

  /**
   * The plan phase in which this adjustment is active.
   */
  plan_phase_order: number | null;

  /**
   * The reason for the adjustment.
   */
  reason: string | null;
}

export interface PlanPhasePercentageDiscountAdjustment {
  id: string;

  adjustment_type: 'percentage_discount';

  /**
   * @deprecated The price IDs that this adjustment applies to.
   */
  applies_to_price_ids: Array<string>;

  /**
   * The filters that determine which prices to apply this adjustment to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * True for adjustments that apply to an entire invocice, false for adjustments
   * that apply to only one price.
   */
  is_invoice_level: boolean;

  /**
   * The percentage (as a value between 0 and 1) by which to discount the price
   * intervals this adjustment applies to in a given billing period.
   */
  percentage_discount: number;

  /**
   * The plan phase in which this adjustment is active.
   */
  plan_phase_order: number | null;

  /**
   * The reason for the adjustment.
   */
  reason: string | null;
}

export interface PlanPhaseUsageDiscountAdjustment {
  id: string;

  adjustment_type: 'usage_discount';

  /**
   * @deprecated The price IDs that this adjustment applies to.
   */
  applies_to_price_ids: Array<string>;

  /**
   * The filters that determine which prices to apply this adjustment to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * True for adjustments that apply to an entire invocice, false for adjustments
   * that apply to only one price.
   */
  is_invoice_level: boolean;

  /**
   * The plan phase in which this adjustment is active.
   */
  plan_phase_order: number | null;

  /**
   * The reason for the adjustment.
   */
  reason: string | null;

  /**
   * The number of usage units by which to discount the price this adjustment applies
   * to in a given billing period.
   */
  usage_discount: number;
}

/**
 * The Price resource represents a price that can be billed on a subscription,
 * resulting in a charge on an invoice in the form of an invoice line item. Prices
 * take a quantity and determine an amount to bill.
 *
 * Orb supports a few different pricing models out of the box. Each of these models
 * is serialized differently in a given Price object. The model_type field
 * determines the key for the configuration object that is present.
 *
 * For more on the types of prices, see
 * [the core concepts documentation](/core-concepts#plan-and-price)
 */
export type Price =
  | Price.UnitPrice
  | Price.PackagePrice
  | Price.MatrixPrice
  | Price.TieredPrice
  | Price.TieredBPSPrice
  | Price.BPSPrice
  | Price.BulkBPSPrice
  | Price.BulkPrice
  | Price.ThresholdTotalAmountPrice
  | Price.TieredPackagePrice
  | Price.GroupedTieredPrice
  | Price.TieredWithMinimumPrice
  | Price.TieredPackageWithMinimumPrice
  | Price.PackageWithAllocationPrice
  | Price.UnitWithPercentPrice
  | Price.MatrixWithAllocationPrice
  | Price.TieredWithProrationPrice
  | Price.UnitWithProrationPrice
  | Price.GroupedAllocationPrice
  | Price.GroupedWithProratedMinimumPrice
  | Price.GroupedWithMeteredMinimumPrice
  | Price.MatrixWithDisplayNamePrice
  | Price.BulkWithProrationPrice
  | Price.GroupedTieredPackagePrice
  | Price.MaxGroupTieredPackagePrice
  | Price.ScalableMatrixWithUnitPricingPrice
  | Price.ScalableMatrixWithTieredPricingPrice
  | Price.CumulativeGroupedBulkPrice;

export namespace Price {
  export interface UnitPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'unit';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    unit_config: Shared.UnitConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface PackagePrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'package';

    name: string;

    package_config: Shared.PackageConfig;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface MatrixPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    matrix_config: Shared.MatrixConfig;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'matrix';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface TieredPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'tiered';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_config: Shared.TieredConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface TieredBPSPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'tiered_bps';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_bps_config: Shared.TieredBPSConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface BPSPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    bps_config: Shared.BPSConfig;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'bps';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface BulkBPSPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    bulk_bps_config: Shared.BulkBPSConfig;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'bulk_bps';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface BulkPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    bulk_config: Shared.BulkConfig;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'bulk';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface ThresholdTotalAmountPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'threshold_total_amount';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    threshold_total_amount_config: Record<string, unknown>;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface TieredPackagePrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_package_config: Record<string, unknown>;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface GroupedTieredPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_tiered_config: Record<string, unknown>;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'grouped_tiered';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface TieredWithMinimumPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'tiered_with_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_with_minimum_config: Record<string, unknown>;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface TieredPackageWithMinimumPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'tiered_package_with_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_package_with_minimum_config: Record<string, unknown>;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface PackageWithAllocationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'package_with_allocation';

    name: string;

    package_with_allocation_config: Record<string, unknown>;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface UnitWithPercentPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'unit_with_percent';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    unit_with_percent_config: Record<string, unknown>;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface MatrixWithAllocationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    matrix_with_allocation_config: Shared.MatrixWithAllocationConfig;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'matrix_with_allocation';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface TieredWithProrationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'tiered_with_proration';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    tiered_with_proration_config: Record<string, unknown>;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface UnitWithProrationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'unit_with_proration';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    unit_with_proration_config: Record<string, unknown>;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface GroupedAllocationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_allocation_config: Record<string, unknown>;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'grouped_allocation';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface GroupedWithProratedMinimumPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_with_prorated_minimum_config: Record<string, unknown>;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'grouped_with_prorated_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface GroupedWithMeteredMinimumPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_with_metered_minimum_config: Record<string, unknown>;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'grouped_with_metered_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface MatrixWithDisplayNamePrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    matrix_with_display_name_config: Record<string, unknown>;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'matrix_with_display_name';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface BulkWithProrationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    bulk_with_proration_config: Record<string, unknown>;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'bulk_with_proration';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface GroupedTieredPackagePrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    grouped_tiered_package_config: Record<string, unknown>;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'grouped_tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface MaxGroupTieredPackagePrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    max_group_tiered_package_config: Record<string, unknown>;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'max_group_tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface ScalableMatrixWithUnitPricingPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'scalable_matrix_with_unit_pricing';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    scalable_matrix_with_unit_pricing_config: Record<string, unknown>;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface ScalableMatrixWithTieredPricingPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'scalable_matrix_with_tiered_pricing';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    scalable_matrix_with_tiered_pricing_config: Record<string, unknown>;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export interface CumulativeGroupedBulkPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    conversion_rate: number | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    cumulative_grouped_bulk_config: Record<string, unknown>;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    item: Shared.ItemSlim;

    /**
     * @deprecated
     */
    maximum: Shared.Maximum | null;

    /**
     * @deprecated
     */
    maximum_amount: string | null;

    /**
     * User specified key-value pairs for the resource. If not present, this defaults
     * to an empty dictionary. Individual keys can be removed by setting the value to
     * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
     * `null`.
     */
    metadata: Record<string, string>;

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    model_type: 'cumulative_grouped_bulk';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price';

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }
}

/**
 * The Price Interval resource represents a period of time for which a price will
 * bill on a subscription. A subscription’s price intervals define its billing
 * behavior.
 */
export interface PriceInterval {
  id: string;

  /**
   * The day of the month that Orb bills for this price
   */
  billing_cycle_day: number;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is exactly the end of the billing period. Set to null if
   * this price interval is not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if this price interval is not currently active.
   */
  current_billing_period_start_date: string | null;

  /**
   * The end date of the price interval. This is the date that Orb stops billing for
   * this price.
   */
  end_date: string | null;

  /**
   * An additional filter to apply to usage queries.
   */
  filter: string | null;

  /**
   * The fixed fee quantity transitions for this price interval. This is only
   * relevant for fixed fees.
   */
  fixed_fee_quantity_transitions: Array<FixedFeeQuantityTransition> | null;

  /**
   * The Price resource represents a price that can be billed on a subscription,
   * resulting in a charge on an invoice in the form of an invoice line item. Prices
   * take a quantity and determine an amount to bill.
   *
   * Orb supports a few different pricing models out of the box. Each of these models
   * is serialized differently in a given Price object. The model_type field
   * determines the key for the configuration object that is present.
   *
   * For more on the types of prices, see
   * [the core concepts documentation](/core-concepts#plan-and-price)
   */
  price: Price;

  /**
   * The start date of the price interval. This is the date that Orb starts billing
   * for this price.
   */
  start_date: string;

  /**
   * A list of customer IDs whose usage events will be aggregated and billed under
   * this price interval.
   */
  usage_customer_ids: Array<string> | null;
}

export interface SubLineItemGrouping {
  key: string;

  /**
   * No value indicates the default group
   */
  value: string | null;
}

export interface SubLineItemMatrixConfig {
  /**
   * The ordered dimension values for this line item.
   */
  dimension_values: Array<string | null>;
}

export interface SubscriptionChangeMinified {
  id: string;
}

export interface SubscriptionMinified {
  id: string;
}

export interface SubscriptionTrialInfo {
  end_date: string | null;
}

export interface TaxAmount {
  /**
   * The amount of additional tax incurred by this tax rate.
   */
  amount: string;

  /**
   * The human-readable description of the applied tax rate.
   */
  tax_rate_description: string;

  /**
   * The tax rate percentage, out of 100.
   */
  tax_rate_percentage: string | null;
}

export interface Tier {
  /**
   * Exclusive tier starting value
   */
  first_unit: number;

  /**
   * Amount per unit
   */
  unit_amount: string;

  /**
   * Inclusive tier ending value. If null, this is treated as the last tier
   */
  last_unit?: number | null;
}

export interface TierConfig {
  first_unit: number;

  last_unit: number | null;

  unit_amount: string;
}

export interface TierSubLineItem {
  /**
   * The total amount for this sub line item.
   */
  amount: string;

  grouping: SubLineItemGrouping | null;

  name: string;

  quantity: number;

  tier_config: TierConfig;

  type: 'tier';
}

export interface TieredBPSConfig {
  /**
   * Tiers for a Graduated BPS pricing model, where usage is bucketed into specified
   * tiers
   */
  tiers: Array<BPSTier>;
}

export interface TieredConfig {
  /**
   * Tiers for rating based on total usage quantities into the specified tier
   */
  tiers: Array<Tier>;
}

export interface TransformPriceFilter {
  /**
   * The property of the price to filter on.
   */
  field: 'price_id' | 'item_id' | 'price_type' | 'currency' | 'pricing_unit_id';

  /**
   * Should prices that match the filter be included or excluded.
   */
  operator: 'includes' | 'excludes';

  /**
   * The IDs or values that match this filter.
   */
  values: Array<string>;
}

export interface TrialDiscount {
  discount_type: 'trial';

  /**
   * List of price_ids that this discount applies to. For plan/plan phase discounts,
   * this can be a subset of prices.
   */
  applies_to_price_ids?: Array<string> | null;

  /**
   * The filters that determine which prices to apply this discount to.
   */
  filters?: Array<TransformPriceFilter> | null;

  reason?: string | null;

  /**
   * Only available if discount_type is `trial`
   */
  trial_amount_discount?: string | null;

  /**
   * Only available if discount_type is `trial`
   */
  trial_percentage_discount?: number | null;
}

export interface UnitConfig {
  /**
   * Rate per unit of usage
   */
  unit_amount: string;
}

export interface UsageDiscount {
  discount_type: 'usage';

  /**
   * Only available if discount_type is `usage`. Number of usage units that this
   * discount is for
   */
  usage_discount: number;

  /**
   * List of price_ids that this discount applies to. For plan/plan phase discounts,
   * this can be a subset of prices.
   */
  applies_to_price_ids?: Array<string> | null;

  /**
   * The filters that determine which prices to apply this discount to.
   */
  filters?: Array<TransformPriceFilter> | null;

  reason?: string | null;
}

export interface UsageDiscountInterval {
  /**
   * The price interval ids that this discount interval applies to.
   */
  applies_to_price_interval_ids: Array<string>;

  discount_type: 'usage';

  /**
   * The end date of the discount interval.
   */
  end_date: string | null;

  /**
   * The filters that determine which prices this discount interval applies to.
   */
  filters: Array<TransformPriceFilter>;

  /**
   * The start date of the discount interval.
   */
  start_date: string;

  /**
   * Only available if discount_type is `usage`. Number of usage units that this
   * discount is for
   */
  usage_discount: number;
}

export class CreditNotesPage extends Page<CreditNote> {}

export class InvoicesPage extends Page<Invoice> {}

export class PricesPage extends Page<Price> {}
