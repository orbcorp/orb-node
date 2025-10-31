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

  filters?: Array<Allocation.Filter>;
}

export namespace Allocation {
  export interface Filter {
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
  filters?: Array<AmountDiscount.Filter> | null;

  reason?: string | null;
}

export namespace AmountDiscount {
  export interface Filter {
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
  filters: Array<AmountDiscountInterval.Filter>;

  /**
   * The start date of the discount interval.
   */
  start_date: string;
}

export namespace AmountDiscountInterval {
  export interface Filter {
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

/**
 * Configuration for bulk pricing
 */
export interface BulkConfig {
  /**
   * Bulk tiers for rating based on total usage volume
   */
  tiers: Array<BulkTier>;
}

/**
 * Configuration for a single bulk pricing tier
 */
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
  created_invoices: Array<ChangedSubscriptionResources.CreatedInvoice>;

  /**
   * The credit notes that were voided as part of this operation.
   */
  voided_credit_notes: Array<CreditNote>;

  /**
   * The invoices that were voided as part of this operation.
   */
  voided_invoices: Array<Invoice>;
}

export namespace ChangedSubscriptionResources {
  export interface CreatedInvoice {
    id: string;

    /**
     * This is the final amount required to be charged to the customer and reflects the
     * application of the customer balance to the `total` of the invoice.
     */
    amount_due: string;

    auto_collection: CreatedInvoice.AutoCollection;

    billing_address: Shared.Address | null;

    /**
     * The creation time of the resource in Orb.
     */
    created_at: string;

    /**
     * A list of credit notes associated with the invoice
     */
    credit_notes: Array<CreatedInvoice.CreditNote>;

    /**
     * An ISO 4217 currency string or `credits`
     */
    currency: string;

    customer: Shared.CustomerMinified;

    customer_balance_transactions: Array<CreatedInvoice.CustomerBalanceTransaction>;

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
    customer_tax_id: Shared.CustomerTaxID | null;

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
     * True if the invoice has only in-advance fixed fees and is payable now
     */
    is_payable_now: boolean;

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
    line_items: Array<CreatedInvoice.LineItem>;

    maximum: Shared.Maximum | null;

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
    metadata: { [key: string]: string };

    minimum: Shared.Minimum | null;

    minimum_amount: string | null;

    /**
     * If the invoice has a status of `paid`, this gives a timestamp when the invoice
     * was paid.
     */
    paid_at: string | null;

    /**
     * A list of payment attempts associated with the invoice
     */
    payment_attempts: Array<CreatedInvoice.PaymentAttempt>;

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

    shipping_address: Shared.Address | null;

    status: 'issued' | 'paid' | 'synced' | 'void' | 'draft';

    subscription: Shared.SubscriptionMinified | null;

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

  export namespace CreatedInvoice {
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
        | 'external_payment'
        | 'small_invoice_carryover';

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

      /**
       * @deprecated This field is deprecated in favor of `adjustments`
       */
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
       * The line amount before any adjustments.
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
       * URL to the downloadable PDF version of the receipt. This field will be `null`
       * for payment attempts that did not succeed.
       */
      receipt_pdf: string | null;

      /**
       * Whether the payment attempt succeeded.
       */
      succeeded: boolean;
    }
  }
}

export interface ConversionRateTier {
  /**
   * Exclusive tier starting value
   */
  first_unit: number;

  /**
   * Amount per unit of overage
   */
  unit_amount: string;

  /**
   * Inclusive tier ending value. If null, this is treated as the last tier
   */
  last_unit?: number | null;
}

export interface ConversionRateTieredConfig {
  /**
   * Tiers for rating based on total usage quantities into the specified tier
   */
  tiers: Array<ConversionRateTier>;
}

export interface ConversionRateUnitConfig {
  /**
   * Amount per unit of overage
   */
  unit_amount: string;
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

    /**
     * The end time of the service period for this credit note line item.
     */
    end_time_exclusive?: string | null;

    /**
     * The start time of the service period for this credit note line item.
     */
    start_time_inclusive?: string | null;
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
export interface CustomerTaxID {
  country:
    | 'AD'
    | 'AE'
    | 'AL'
    | 'AM'
    | 'AO'
    | 'AR'
    | 'AT'
    | 'AU'
    | 'AW'
    | 'AZ'
    | 'BA'
    | 'BB'
    | 'BD'
    | 'BE'
    | 'BF'
    | 'BG'
    | 'BH'
    | 'BJ'
    | 'BO'
    | 'BR'
    | 'BS'
    | 'BY'
    | 'CA'
    | 'CD'
    | 'CH'
    | 'CL'
    | 'CM'
    | 'CN'
    | 'CO'
    | 'CR'
    | 'CV'
    | 'DE'
    | 'CY'
    | 'CZ'
    | 'DK'
    | 'DO'
    | 'EC'
    | 'EE'
    | 'EG'
    | 'ES'
    | 'ET'
    | 'EU'
    | 'FI'
    | 'FR'
    | 'GB'
    | 'GE'
    | 'GN'
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
    | 'KG'
    | 'KH'
    | 'KR'
    | 'KZ'
    | 'LA'
    | 'LI'
    | 'LT'
    | 'LU'
    | 'LV'
    | 'MA'
    | 'MD'
    | 'ME'
    | 'MK'
    | 'MR'
    | 'MT'
    | 'MX'
    | 'MY'
    | 'NG'
    | 'NL'
    | 'NO'
    | 'NP'
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
    | 'SN'
    | 'SR'
    | 'SV'
    | 'TH'
    | 'TJ'
    | 'TR'
    | 'TW'
    | 'TZ'
    | 'UA'
    | 'UG'
    | 'US'
    | 'UY'
    | 'UZ'
    | 'VE'
    | 'VN'
    | 'ZA'
    | 'ZM'
    | 'ZW';

  type:
    | 'ad_nrt'
    | 'ae_trn'
    | 'al_tin'
    | 'am_tin'
    | 'ao_tin'
    | 'ar_cuit'
    | 'eu_vat'
    | 'au_abn'
    | 'au_arn'
    | 'aw_tin'
    | 'az_tin'
    | 'ba_tin'
    | 'bb_tin'
    | 'bd_bin'
    | 'bf_ifu'
    | 'bg_uic'
    | 'bh_vat'
    | 'bj_ifu'
    | 'bo_tin'
    | 'br_cnpj'
    | 'br_cpf'
    | 'bs_tin'
    | 'by_tin'
    | 'ca_bn'
    | 'ca_gst_hst'
    | 'ca_pst_bc'
    | 'ca_pst_mb'
    | 'ca_pst_sk'
    | 'ca_qst'
    | 'cd_nif'
    | 'ch_uid'
    | 'ch_vat'
    | 'cl_tin'
    | 'cm_niu'
    | 'cn_tin'
    | 'co_nit'
    | 'cr_tin'
    | 'cv_nif'
    | 'de_stn'
    | 'do_rcn'
    | 'ec_ruc'
    | 'eg_tin'
    | 'es_cif'
    | 'et_tin'
    | 'eu_oss_vat'
    | 'gb_vat'
    | 'ge_vat'
    | 'gn_nif'
    | 'hk_br'
    | 'hr_oib'
    | 'hu_tin'
    | 'id_npwp'
    | 'il_vat'
    | 'in_gst'
    | 'is_vat'
    | 'jp_cn'
    | 'jp_rn'
    | 'jp_trn'
    | 'ke_pin'
    | 'kg_tin'
    | 'kh_tin'
    | 'kr_brn'
    | 'kz_bin'
    | 'la_tin'
    | 'li_uid'
    | 'li_vat'
    | 'ma_vat'
    | 'md_vat'
    | 'me_pib'
    | 'mk_vat'
    | 'mr_nif'
    | 'mx_rfc'
    | 'my_frp'
    | 'my_itn'
    | 'my_sst'
    | 'ng_tin'
    | 'no_vat'
    | 'no_voec'
    | 'np_pan'
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
    | 'sn_ninea'
    | 'sr_fin'
    | 'sv_nit'
    | 'th_vat'
    | 'tj_tin'
    | 'tr_tin'
    | 'tw_vat'
    | 'tz_vat'
    | 'ua_vat'
    | 'ug_tin'
    | 'us_ein'
    | 'uy_ruc'
    | 'uz_tin'
    | 'uz_vat'
    | 've_rif'
    | 'vn_tin'
    | 'za_vat'
    | 'zm_tin'
    | 'zw_tin';

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
  metadata: { [key: string]: string };

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
      | 'external_payment'
      | 'small_invoice_carryover';

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

    /**
     * @deprecated This field is deprecated in favor of `adjustments`
     */
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
     * The line amount before any adjustments.
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
     * URL to the downloadable PDF version of the receipt. This field will be `null`
     * for payment attempts that did not succeed.
     */
    receipt_pdf: string | null;

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

/**
 * A minimal representation of an Item containing only the essential identifying
 * information.
 */
export interface ItemSlim {
  /**
   * The Orb-assigned unique identifier for the item.
   */
  id: string;

  /**
   * The name of the item.
   */
  name: string;
}

/**
 * Configuration for matrix pricing
 */
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
   * Matrix values configuration
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

  /**
   * The scaled quantity for this line item for specific pricing structures
   */
  scaled_quantity?: number | null;
}

/**
 * Configuration for a single matrix value
 */
export interface MatrixValue {
  /**
   * One or two matrix keys to filter usage to this Matrix value by
   */
  dimension_values: Array<string | null>;

  /**
   * Unit price for the specified dimension_values
   */
  unit_amount: string;
}

/**
 * Configuration for matrix pricing with usage allocation
 */
export interface MatrixWithAllocationConfig {
  /**
   * Usage allocation
   */
  allocation: string;

  /**
   * Default per unit rate for any usage not bucketed into a specified matrix_value
   */
  default_unit_amount: string;

  /**
   * One or two event property values to evaluate matrix groups by
   */
  dimensions: Array<string | null>;

  /**
   * Matrix values configuration
   */
  matrix_values: Array<MatrixWithAllocationConfig.MatrixValue>;
}

export namespace MatrixWithAllocationConfig {
  /**
   * Configuration for a single matrix value
   */
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
  filters: Array<Maximum.Filter>;

  /**
   * Maximum amount applied
   */
  maximum_amount: string;
}

export namespace Maximum {
  export interface Filter {
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
  filters: Array<MaximumInterval.Filter>;

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

export namespace MaximumInterval {
  export interface Filter {
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
  filters: Array<Minimum.Filter>;

  /**
   * Minimum amount applied
   */
  minimum_amount: string;
}

export namespace Minimum {
  export interface Filter {
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
  filters: Array<MinimumInterval.Filter>;

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

export namespace MinimumInterval {
  export interface Filter {
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
  filters: Array<MonetaryAmountDiscountAdjustment.Filter>;

  /**
   * True for adjustments that apply to an entire invoice, false for adjustments that
   * apply to only one price.
   */
  is_invoice_level: boolean;

  /**
   * The reason for the adjustment.
   */
  reason: string | null;

  /**
   * The adjustment id this adjustment replaces. This adjustment will take the place
   * of the replaced adjustment in plan version migrations.
   */
  replaces_adjustment_id: string | null;
}

export namespace MonetaryAmountDiscountAdjustment {
  export interface Filter {
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
  filters: Array<MonetaryMaximumAdjustment.Filter>;

  /**
   * True for adjustments that apply to an entire invoice, false for adjustments that
   * apply to only one price.
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

  /**
   * The adjustment id this adjustment replaces. This adjustment will take the place
   * of the replaced adjustment in plan version migrations.
   */
  replaces_adjustment_id: string | null;
}

export namespace MonetaryMaximumAdjustment {
  export interface Filter {
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
  filters: Array<MonetaryMinimumAdjustment.Filter>;

  /**
   * True for adjustments that apply to an entire invoice, false for adjustments that
   * apply to only one price.
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

  /**
   * The adjustment id this adjustment replaces. This adjustment will take the place
   * of the replaced adjustment in plan version migrations.
   */
  replaces_adjustment_id: string | null;
}

export namespace MonetaryMinimumAdjustment {
  export interface Filter {
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
  filters: Array<MonetaryPercentageDiscountAdjustment.Filter>;

  /**
   * True for adjustments that apply to an entire invoice, false for adjustments that
   * apply to only one price.
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

  /**
   * The adjustment id this adjustment replaces. This adjustment will take the place
   * of the replaced adjustment in plan version migrations.
   */
  replaces_adjustment_id: string | null;
}

export namespace MonetaryPercentageDiscountAdjustment {
  export interface Filter {
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
  filters: Array<MonetaryUsageDiscountAdjustment.Filter>;

  /**
   * True for adjustments that apply to an entire invoice, false for adjustments that
   * apply to only one price.
   */
  is_invoice_level: boolean;

  /**
   * The reason for the adjustment.
   */
  reason: string | null;

  /**
   * The adjustment id this adjustment replaces. This adjustment will take the place
   * of the replaced adjustment in plan version migrations.
   */
  replaces_adjustment_id: string | null;

  /**
   * The number of usage units by which to discount the price this adjustment applies
   * to in a given billing period.
   */
  usage_discount: number;
}

export namespace MonetaryUsageDiscountAdjustment {
  export interface Filter {
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
}

export interface NewAllocationPrice {
  /**
   * An amount of the currency to allocate to the customer at the specified cadence.
   */
  amount: string;

  /**
   * The cadence at which to allocate the amount to the customer.
   */
  cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual';

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

  /**
   * The filters that determine which items the allocation applies to.
   */
  filters?: Array<NewAllocationPrice.Filter> | null;
}

export namespace NewAllocationPrice {
  /**
   * A PriceFilter that only allows item_id field for block filters.
   */
  export interface Filter {
    /**
     * The property of the price the block applies to. Only item_id is supported.
     */
    field: 'item_id';

    /**
     * Should prices that match the filter be included or excluded.
     */
    operator: 'includes' | 'excludes';

    /**
     * The IDs or values that match this filter.
     */
    values: Array<string>;
  }
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
  filters?: Array<NewAmountDiscount.Filter> | null;

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

export namespace NewAmountDiscount {
  export interface Filter {
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

export interface NewFloatingBulkPrice {
  /**
   * Configuration for bulk pricing
   */
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

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export interface NewFloatingBulkWithProrationPrice {
  /**
   * Configuration for bulk_with_proration pricing
   */
  bulk_with_proration_config: NewFloatingBulkWithProrationPrice.BulkWithProrationConfig;

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

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingBulkWithProrationPrice {
  /**
   * Configuration for bulk_with_proration pricing
   */
  export interface BulkWithProrationConfig {
    /**
     * Bulk tiers for rating based on total usage volume
     */
    tiers: Array<BulkWithProrationConfig.Tier>;
  }

  export namespace BulkWithProrationConfig {
    /**
     * Configuration for a single bulk pricing tier with proration
     */
    export interface Tier {
      /**
       * Cost per unit
       */
      unit_amount: string;

      /**
       * The lower bound for this tier
       */
      tier_lower_bound?: string | null;
    }
  }
}

export interface NewFloatingCumulativeGroupedBulkPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * Configuration for cumulative_grouped_bulk pricing
   */
  cumulative_grouped_bulk_config: NewFloatingCumulativeGroupedBulkPrice.CumulativeGroupedBulkConfig;

  /**
   * An ISO 4217 currency string for which this price is billed in.
   */
  currency: string;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingCumulativeGroupedBulkPrice {
  /**
   * Configuration for cumulative_grouped_bulk pricing
   */
  export interface CumulativeGroupedBulkConfig {
    /**
     * Each tier lower bound must have the same group of values.
     */
    dimension_values: Array<CumulativeGroupedBulkConfig.DimensionValue>;

    /**
     * Grouping key name
     */
    group: string;
  }

  export namespace CumulativeGroupedBulkConfig {
    /**
     * Configuration for a dimension value entry
     */
    export interface DimensionValue {
      /**
       * Grouping key value
       */
      grouping_key: string;

      /**
       * Tier lower bound
       */
      tier_lower_bound: string;

      /**
       * Unit amount for this combination
       */
      unit_amount: string;
    }
  }
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

  /**
   * Configuration for grouped_allocation pricing
   */
  grouped_allocation_config: NewFloatingGroupedAllocationPrice.GroupedAllocationConfig;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingGroupedAllocationPrice {
  /**
   * Configuration for grouped_allocation pricing
   */
  export interface GroupedAllocationConfig {
    /**
     * Usage allocation per group
     */
    allocation: string;

    /**
     * How to determine the groups that should each be allocated some quantity
     */
    grouping_key: string;

    /**
     * Unit rate for post-allocation
     */
    overage_unit_rate: string;
  }
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

  /**
   * Configuration for grouped_tiered_package pricing
   */
  grouped_tiered_package_config: NewFloatingGroupedTieredPackagePrice.GroupedTieredPackageConfig;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingGroupedTieredPackagePrice {
  /**
   * Configuration for grouped_tiered_package pricing
   */
  export interface GroupedTieredPackageConfig {
    /**
     * The event property used to group before tiering
     */
    grouping_key: string;

    /**
     * Package size
     */
    package_size: string;

    /**
     * Apply tiered pricing after rounding up the quantity to the package size. Tiers
     * are defined using exclusive lower bounds.
     */
    tiers: Array<GroupedTieredPackageConfig.Tier>;
  }

  export namespace GroupedTieredPackageConfig {
    /**
     * Configuration for a single tier
     */
    export interface Tier {
      /**
       * Price per package
       */
      per_unit: string;

      /**
       * Tier lower bound
       */
      tier_lower_bound: string;
    }
  }
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

  /**
   * Configuration for grouped_tiered pricing
   */
  grouped_tiered_config: NewFloatingGroupedTieredPrice.GroupedTieredConfig;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingGroupedTieredPrice {
  /**
   * Configuration for grouped_tiered pricing
   */
  export interface GroupedTieredConfig {
    /**
     * The billable metric property used to group before tiering
     */
    grouping_key: string;

    /**
     * Apply tiered pricing to each segment generated after grouping with the provided
     * key
     */
    tiers: Array<GroupedTieredConfig.Tier>;
  }

  export namespace GroupedTieredConfig {
    /**
     * Configuration for a single tier
     */
    export interface Tier {
      /**
       * Tier lower bound
       */
      tier_lower_bound: string;

      /**
       * Per unit amount
       */
      unit_amount: string;
    }
  }
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

  /**
   * Configuration for grouped_with_metered_minimum pricing
   */
  grouped_with_metered_minimum_config: NewFloatingGroupedWithMeteredMinimumPrice.GroupedWithMeteredMinimumConfig;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingGroupedWithMeteredMinimumPrice {
  /**
   * Configuration for grouped_with_metered_minimum pricing
   */
  export interface GroupedWithMeteredMinimumConfig {
    /**
     * Used to partition the usage into groups. The minimum amount is applied to each
     * group.
     */
    grouping_key: string;

    /**
     * The minimum amount to charge per group per unit
     */
    minimum_unit_amount: string;

    /**
     * Used to determine the unit rate
     */
    pricing_key: string;

    /**
     * Scale the unit rates by the scaling factor.
     */
    scaling_factors: Array<GroupedWithMeteredMinimumConfig.ScalingFactor>;

    /**
     * Used to determine the unit rate scaling factor
     */
    scaling_key: string;

    /**
     * Apply per unit pricing to each pricing value. The minimum amount is applied any
     * unmatched usage.
     */
    unit_amounts: Array<GroupedWithMeteredMinimumConfig.UnitAmount>;
  }

  export namespace GroupedWithMeteredMinimumConfig {
    /**
     * Configuration for a scaling factor
     */
    export interface ScalingFactor {
      /**
       * Scaling factor
       */
      scaling_factor: string;

      /**
       * Scaling value
       */
      scaling_value: string;
    }

    /**
     * Configuration for a unit amount
     */
    export interface UnitAmount {
      /**
       * Pricing value
       */
      pricing_value: string;

      /**
       * Per unit amount
       */
      unit_amount: string;
    }
  }
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

  /**
   * Configuration for grouped_with_prorated_minimum pricing
   */
  grouped_with_prorated_minimum_config: NewFloatingGroupedWithProratedMinimumPrice.GroupedWithProratedMinimumConfig;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingGroupedWithProratedMinimumPrice {
  /**
   * Configuration for grouped_with_prorated_minimum pricing
   */
  export interface GroupedWithProratedMinimumConfig {
    /**
     * How to determine the groups that should each have a minimum
     */
    grouping_key: string;

    /**
     * The minimum amount to charge per group
     */
    minimum: string;

    /**
     * The amount to charge per unit
     */
    unit_rate: string;
  }
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

  /**
   * Configuration for matrix pricing
   */
  matrix_config: MatrixConfig;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
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

  /**
   * Configuration for matrix_with_allocation pricing
   */
  matrix_with_allocation_config: MatrixWithAllocationConfig;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
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

  /**
   * Configuration for matrix_with_display_name pricing
   */
  matrix_with_display_name_config: NewFloatingMatrixWithDisplayNamePrice.MatrixWithDisplayNameConfig;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingMatrixWithDisplayNamePrice {
  /**
   * Configuration for matrix_with_display_name pricing
   */
  export interface MatrixWithDisplayNameConfig {
    /**
     * Used to determine the unit rate
     */
    dimension: string;

    /**
     * Apply per unit pricing to each dimension value
     */
    unit_amounts: Array<MatrixWithDisplayNameConfig.UnitAmount>;
  }

  export namespace MatrixWithDisplayNameConfig {
    /**
     * Configuration for a unit amount item
     */
    export interface UnitAmount {
      /**
       * The dimension value
       */
      dimension_value: string;

      /**
       * Display name for this dimension value
       */
      display_name: string;

      /**
       * Per unit amount
       */
      unit_amount: string;
    }
  }
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

  /**
   * Configuration for max_group_tiered_package pricing
   */
  max_group_tiered_package_config: NewFloatingMaxGroupTieredPackagePrice.MaxGroupTieredPackageConfig;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingMaxGroupTieredPackagePrice {
  /**
   * Configuration for max_group_tiered_package pricing
   */
  export interface MaxGroupTieredPackageConfig {
    /**
     * The event property used to group before tiering the group with the highest value
     */
    grouping_key: string;

    /**
     * Package size
     */
    package_size: string;

    /**
     * Apply tiered pricing to the largest group after grouping with the provided key.
     */
    tiers: Array<MaxGroupTieredPackageConfig.Tier>;
  }

  export namespace MaxGroupTieredPackageConfig {
    /**
     * Configuration for a single tier
     */
    export interface Tier {
      /**
       * Tier lower bound
       */
      tier_lower_bound: string;

      /**
       * Per unit amount
       */
      unit_amount: string;
    }
  }
}

export interface NewFloatingMinimumCompositePrice {
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

  /**
   * Configuration for minimum pricing
   */
  minimum_config: NewFloatingMinimumCompositePrice.MinimumConfig;

  /**
   * The pricing model type
   */
  model_type: 'minimum';

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingMinimumCompositePrice {
  /**
   * Configuration for minimum pricing
   */
  export interface MinimumConfig {
    /**
     * The minimum amount to apply
     */
    minimum_amount: string;

    /**
     * If true, subtotals from this price are prorated based on the service period
     */
    prorated?: boolean;
  }
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

  /**
   * The pricing model type
   */
  model_type: 'package';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for package pricing
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
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

  /**
   * The pricing model type
   */
  model_type: 'package_with_allocation';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for package_with_allocation pricing
   */
  package_with_allocation_config: NewFloatingPackageWithAllocationPrice.PackageWithAllocationConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingPackageWithAllocationPrice {
  /**
   * Configuration for package_with_allocation pricing
   */
  export interface PackageWithAllocationConfig {
    /**
     * Usage allocation
     */
    allocation: string;

    /**
     * Price per package
     */
    package_amount: string;

    /**
     * Package size
     */
    package_size: string;
  }
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

  /**
   * The pricing model type
   */
  model_type: 'scalable_matrix_with_tiered_pricing';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for scalable_matrix_with_tiered_pricing pricing
   */
  scalable_matrix_with_tiered_pricing_config: NewFloatingScalableMatrixWithTieredPricingPrice.ScalableMatrixWithTieredPricingConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingScalableMatrixWithTieredPricingPrice {
  /**
   * Configuration for scalable_matrix_with_tiered_pricing pricing
   */
  export interface ScalableMatrixWithTieredPricingConfig {
    /**
     * Used for the scalable matrix first dimension
     */
    first_dimension: string;

    /**
     * Apply a scaling factor to each dimension
     */
    matrix_scaling_factors: Array<ScalableMatrixWithTieredPricingConfig.MatrixScalingFactor>;

    /**
     * Tier pricing structure
     */
    tiers: Array<ScalableMatrixWithTieredPricingConfig.Tier>;

    /**
     * Used for the scalable matrix second dimension (optional)
     */
    second_dimension?: string | null;
  }

  export namespace ScalableMatrixWithTieredPricingConfig {
    /**
     * Configuration for a single matrix scaling factor
     */
    export interface MatrixScalingFactor {
      /**
       * First dimension value
       */
      first_dimension_value: string;

      /**
       * Scaling factor
       */
      scaling_factor: string;

      /**
       * Second dimension value (optional)
       */
      second_dimension_value?: string | null;
    }

    /**
     * Configuration for a single tier entry with business logic
     */
    export interface Tier {
      /**
       * Tier lower bound
       */
      tier_lower_bound: string;

      /**
       * Per unit amount
       */
      unit_amount: string;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'scalable_matrix_with_unit_pricing';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for scalable_matrix_with_unit_pricing pricing
   */
  scalable_matrix_with_unit_pricing_config: NewFloatingScalableMatrixWithUnitPricingPrice.ScalableMatrixWithUnitPricingConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingScalableMatrixWithUnitPricingPrice {
  /**
   * Configuration for scalable_matrix_with_unit_pricing pricing
   */
  export interface ScalableMatrixWithUnitPricingConfig {
    /**
     * Used to determine the unit rate
     */
    first_dimension: string;

    /**
     * Apply a scaling factor to each dimension
     */
    matrix_scaling_factors: Array<ScalableMatrixWithUnitPricingConfig.MatrixScalingFactor>;

    /**
     * The final unit price to rate against the output of the matrix
     */
    unit_price: string;

    /**
     * If true, the unit price will be prorated to the billing period
     */
    prorate?: boolean | null;

    /**
     * Used to determine the unit rate (optional)
     */
    second_dimension?: string | null;
  }

  export namespace ScalableMatrixWithUnitPricingConfig {
    /**
     * Configuration for a single matrix scaling factor
     */
    export interface MatrixScalingFactor {
      /**
       * First dimension value
       */
      first_dimension_value: string;

      /**
       * Scaling factor
       */
      scaling_factor: string;

      /**
       * Second dimension value (optional)
       */
      second_dimension_value?: string | null;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'threshold_total_amount';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for threshold_total_amount pricing
   */
  threshold_total_amount_config: NewFloatingThresholdTotalAmountPrice.ThresholdTotalAmountConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingThresholdTotalAmountPrice {
  /**
   * Configuration for threshold_total_amount pricing
   */
  export interface ThresholdTotalAmountConfig {
    /**
     * When the quantity consumed passes a provided threshold, the configured total
     * will be charged
     */
    consumption_table: Array<ThresholdTotalAmountConfig.ConsumptionTable>;

    /**
     * If true, the unit price will be prorated to the billing period
     */
    prorate?: boolean | null;
  }

  export namespace ThresholdTotalAmountConfig {
    /**
     * Configuration for a single threshold
     */
    export interface ConsumptionTable {
      /**
       * Quantity threshold
       */
      threshold: string;

      /**
       * Total amount for this threshold
       */
      total_amount: string;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'tiered_package';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for tiered_package pricing
   */
  tiered_package_config: NewFloatingTieredPackagePrice.TieredPackageConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingTieredPackagePrice {
  /**
   * Configuration for tiered_package pricing
   */
  export interface TieredPackageConfig {
    /**
     * Package size
     */
    package_size: string;

    /**
     * Apply tiered pricing after rounding up the quantity to the package size. Tiers
     * are defined using exclusive lower bounds. The tier bounds are defined based on
     * the total quantity rather than the number of packages, so they must be multiples
     * of the package size.
     */
    tiers: Array<TieredPackageConfig.Tier>;
  }

  export namespace TieredPackageConfig {
    /**
     * Configuration for a single tier with business logic
     */
    export interface Tier {
      /**
       * Price per package
       */
      per_unit: string;

      /**
       * Tier lower bound
       */
      tier_lower_bound: string;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'tiered_package_with_minimum';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for tiered_package_with_minimum pricing
   */
  tiered_package_with_minimum_config: NewFloatingTieredPackageWithMinimumPrice.TieredPackageWithMinimumConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingTieredPackageWithMinimumPrice {
  /**
   * Configuration for tiered_package_with_minimum pricing
   */
  export interface TieredPackageWithMinimumConfig {
    /**
     * Package size
     */
    package_size: number;

    /**
     * Apply tiered pricing after rounding up the quantity to the package size. Tiers
     * are defined using exclusive lower bounds.
     */
    tiers: Array<TieredPackageWithMinimumConfig.Tier>;
  }

  export namespace TieredPackageWithMinimumConfig {
    /**
     * Configuration for a single tier
     */
    export interface Tier {
      /**
       * Minimum amount
       */
      minimum_amount: string;

      /**
       * Price per package
       */
      per_unit: string;

      /**
       * Tier lower bound
       */
      tier_lower_bound: string;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'tiered';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for tiered pricing
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
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

  /**
   * The pricing model type
   */
  model_type: 'tiered_with_minimum';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for tiered_with_minimum pricing
   */
  tiered_with_minimum_config: NewFloatingTieredWithMinimumPrice.TieredWithMinimumConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingTieredWithMinimumPrice {
  /**
   * Configuration for tiered_with_minimum pricing
   */
  export interface TieredWithMinimumConfig {
    /**
     * Tiered pricing with a minimum amount dependent on the volume tier. Tiers are
     * defined using exclusive lower bounds.
     */
    tiers: Array<TieredWithMinimumConfig.Tier>;

    /**
     * If true, tiers with an accrued amount of 0 will not be included in the rating.
     */
    hide_zero_amount_tiers?: boolean;

    /**
     * If true, the unit price will be prorated to the billing period
     */
    prorate?: boolean;
  }

  export namespace TieredWithMinimumConfig {
    /**
     * Configuration for a single tier
     */
    export interface Tier {
      /**
       * Minimum amount
       */
      minimum_amount: string;

      /**
       * Tier lower bound
       */
      tier_lower_bound: string;

      /**
       * Per unit amount
       */
      unit_amount: string;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'tiered_with_proration';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for tiered_with_proration pricing
   */
  tiered_with_proration_config: NewFloatingTieredWithProrationPrice.TieredWithProrationConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingTieredWithProrationPrice {
  /**
   * Configuration for tiered_with_proration pricing
   */
  export interface TieredWithProrationConfig {
    /**
     * Tiers for rating based on total usage quantities into the specified tier with
     * proration
     */
    tiers: Array<TieredWithProrationConfig.Tier>;
  }

  export namespace TieredWithProrationConfig {
    /**
     * Configuration for a single tiered with proration tier
     */
    export interface Tier {
      /**
       * Inclusive tier starting value
       */
      tier_lower_bound: string;

      /**
       * Amount per unit
       */
      unit_amount: string;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'unit';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for unit pricing
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
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

  /**
   * The pricing model type
   */
  model_type: 'unit_with_percent';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for unit_with_percent pricing
   */
  unit_with_percent_config: NewFloatingUnitWithPercentPrice.UnitWithPercentConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingUnitWithPercentPrice {
  /**
   * Configuration for unit_with_percent pricing
   */
  export interface UnitWithPercentConfig {
    /**
     * What percent, out of 100, of the calculated total to charge
     */
    percent: string;

    /**
     * Rate per unit of usage
     */
    unit_amount: string;
  }
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

  /**
   * The pricing model type
   */
  model_type: 'unit_with_proration';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for unit_with_proration pricing
   */
  unit_with_proration_config: NewFloatingUnitWithProrationPrice.UnitWithProrationConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;
}

export namespace NewFloatingUnitWithProrationPrice {
  /**
   * Configuration for unit_with_proration pricing
   */
  export interface UnitWithProrationConfig {
    /**
     * Rate per unit of usage
     */
    unit_amount: string;
  }
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
  filters?: Array<NewMaximum.Filter> | null;

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

export namespace NewMaximum {
  export interface Filter {
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
  filters?: Array<NewMinimum.Filter> | null;

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

export namespace NewMinimum {
  export interface Filter {
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
  filters?: Array<NewPercentageDiscount.Filter> | null;

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

export namespace NewPercentageDiscount {
  export interface Filter {
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
}

export interface NewPlanBulkPrice {
  /**
   * Configuration for bulk pricing
   */
  bulk_config: BulkConfig;

  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export interface NewPlanBulkWithProrationPrice {
  /**
   * Configuration for bulk_with_proration pricing
   */
  bulk_with_proration_config: NewPlanBulkWithProrationPrice.BulkWithProrationConfig;

  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanBulkWithProrationPrice {
  /**
   * Configuration for bulk_with_proration pricing
   */
  export interface BulkWithProrationConfig {
    /**
     * Bulk tiers for rating based on total usage volume
     */
    tiers: Array<BulkWithProrationConfig.Tier>;
  }

  export namespace BulkWithProrationConfig {
    /**
     * Configuration for a single bulk pricing tier with proration
     */
    export interface Tier {
      /**
       * Cost per unit
       */
      unit_amount: string;

      /**
       * The lower bound for this tier
       */
      tier_lower_bound?: string | null;
    }
  }
}

export interface NewPlanCumulativeGroupedBulkPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * Configuration for cumulative_grouped_bulk pricing
   */
  cumulative_grouped_bulk_config: NewPlanCumulativeGroupedBulkPrice.CumulativeGroupedBulkConfig;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanCumulativeGroupedBulkPrice {
  /**
   * Configuration for cumulative_grouped_bulk pricing
   */
  export interface CumulativeGroupedBulkConfig {
    /**
     * Each tier lower bound must have the same group of values.
     */
    dimension_values: Array<CumulativeGroupedBulkConfig.DimensionValue>;

    /**
     * Grouping key name
     */
    group: string;
  }

  export namespace CumulativeGroupedBulkConfig {
    /**
     * Configuration for a dimension value entry
     */
    export interface DimensionValue {
      /**
       * Grouping key value
       */
      grouping_key: string;

      /**
       * Tier lower bound
       */
      tier_lower_bound: string;

      /**
       * Unit amount for this combination
       */
      unit_amount: string;
    }
  }
}

export interface NewPlanGroupedAllocationPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * Configuration for grouped_allocation pricing
   */
  grouped_allocation_config: NewPlanGroupedAllocationPrice.GroupedAllocationConfig;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanGroupedAllocationPrice {
  /**
   * Configuration for grouped_allocation pricing
   */
  export interface GroupedAllocationConfig {
    /**
     * Usage allocation per group
     */
    allocation: string;

    /**
     * How to determine the groups that should each be allocated some quantity
     */
    grouping_key: string;

    /**
     * Unit rate for post-allocation
     */
    overage_unit_rate: string;
  }
}

export interface NewPlanGroupedTieredPackagePrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * Configuration for grouped_tiered_package pricing
   */
  grouped_tiered_package_config: NewPlanGroupedTieredPackagePrice.GroupedTieredPackageConfig;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanGroupedTieredPackagePrice {
  /**
   * Configuration for grouped_tiered_package pricing
   */
  export interface GroupedTieredPackageConfig {
    /**
     * The event property used to group before tiering
     */
    grouping_key: string;

    /**
     * Package size
     */
    package_size: string;

    /**
     * Apply tiered pricing after rounding up the quantity to the package size. Tiers
     * are defined using exclusive lower bounds.
     */
    tiers: Array<GroupedTieredPackageConfig.Tier>;
  }

  export namespace GroupedTieredPackageConfig {
    /**
     * Configuration for a single tier
     */
    export interface Tier {
      /**
       * Price per package
       */
      per_unit: string;

      /**
       * Tier lower bound
       */
      tier_lower_bound: string;
    }
  }
}

export interface NewPlanGroupedTieredPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * Configuration for grouped_tiered pricing
   */
  grouped_tiered_config: NewPlanGroupedTieredPrice.GroupedTieredConfig;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanGroupedTieredPrice {
  /**
   * Configuration for grouped_tiered pricing
   */
  export interface GroupedTieredConfig {
    /**
     * The billable metric property used to group before tiering
     */
    grouping_key: string;

    /**
     * Apply tiered pricing to each segment generated after grouping with the provided
     * key
     */
    tiers: Array<GroupedTieredConfig.Tier>;
  }

  export namespace GroupedTieredConfig {
    /**
     * Configuration for a single tier
     */
    export interface Tier {
      /**
       * Tier lower bound
       */
      tier_lower_bound: string;

      /**
       * Per unit amount
       */
      unit_amount: string;
    }
  }
}

export interface NewPlanGroupedWithMeteredMinimumPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * Configuration for grouped_with_metered_minimum pricing
   */
  grouped_with_metered_minimum_config: NewPlanGroupedWithMeteredMinimumPrice.GroupedWithMeteredMinimumConfig;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanGroupedWithMeteredMinimumPrice {
  /**
   * Configuration for grouped_with_metered_minimum pricing
   */
  export interface GroupedWithMeteredMinimumConfig {
    /**
     * Used to partition the usage into groups. The minimum amount is applied to each
     * group.
     */
    grouping_key: string;

    /**
     * The minimum amount to charge per group per unit
     */
    minimum_unit_amount: string;

    /**
     * Used to determine the unit rate
     */
    pricing_key: string;

    /**
     * Scale the unit rates by the scaling factor.
     */
    scaling_factors: Array<GroupedWithMeteredMinimumConfig.ScalingFactor>;

    /**
     * Used to determine the unit rate scaling factor
     */
    scaling_key: string;

    /**
     * Apply per unit pricing to each pricing value. The minimum amount is applied any
     * unmatched usage.
     */
    unit_amounts: Array<GroupedWithMeteredMinimumConfig.UnitAmount>;
  }

  export namespace GroupedWithMeteredMinimumConfig {
    /**
     * Configuration for a scaling factor
     */
    export interface ScalingFactor {
      /**
       * Scaling factor
       */
      scaling_factor: string;

      /**
       * Scaling value
       */
      scaling_value: string;
    }

    /**
     * Configuration for a unit amount
     */
    export interface UnitAmount {
      /**
       * Pricing value
       */
      pricing_value: string;

      /**
       * Per unit amount
       */
      unit_amount: string;
    }
  }
}

export interface NewPlanGroupedWithProratedMinimumPrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * Configuration for grouped_with_prorated_minimum pricing
   */
  grouped_with_prorated_minimum_config: NewPlanGroupedWithProratedMinimumPrice.GroupedWithProratedMinimumConfig;

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanGroupedWithProratedMinimumPrice {
  /**
   * Configuration for grouped_with_prorated_minimum pricing
   */
  export interface GroupedWithProratedMinimumConfig {
    /**
     * How to determine the groups that should each have a minimum
     */
    grouping_key: string;

    /**
     * The minimum amount to charge per group
     */
    minimum: string;

    /**
     * The amount to charge per unit
     */
    unit_rate: string;
  }
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

  /**
   * Configuration for matrix pricing
   */
  matrix_config: MatrixConfig;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
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

  /**
   * Configuration for matrix_with_allocation pricing
   */
  matrix_with_allocation_config: MatrixWithAllocationConfig;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
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

  /**
   * Configuration for matrix_with_display_name pricing
   */
  matrix_with_display_name_config: NewPlanMatrixWithDisplayNamePrice.MatrixWithDisplayNameConfig;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanMatrixWithDisplayNamePrice {
  /**
   * Configuration for matrix_with_display_name pricing
   */
  export interface MatrixWithDisplayNameConfig {
    /**
     * Used to determine the unit rate
     */
    dimension: string;

    /**
     * Apply per unit pricing to each dimension value
     */
    unit_amounts: Array<MatrixWithDisplayNameConfig.UnitAmount>;
  }

  export namespace MatrixWithDisplayNameConfig {
    /**
     * Configuration for a unit amount item
     */
    export interface UnitAmount {
      /**
       * The dimension value
       */
      dimension_value: string;

      /**
       * Display name for this dimension value
       */
      display_name: string;

      /**
       * Per unit amount
       */
      unit_amount: string;
    }
  }
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

  /**
   * Configuration for max_group_tiered_package pricing
   */
  max_group_tiered_package_config: NewPlanMaxGroupTieredPackagePrice.MaxGroupTieredPackageConfig;

  /**
   * The pricing model type
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanMaxGroupTieredPackagePrice {
  /**
   * Configuration for max_group_tiered_package pricing
   */
  export interface MaxGroupTieredPackageConfig {
    /**
     * The event property used to group before tiering the group with the highest value
     */
    grouping_key: string;

    /**
     * Package size
     */
    package_size: string;

    /**
     * Apply tiered pricing to the largest group after grouping with the provided key.
     */
    tiers: Array<MaxGroupTieredPackageConfig.Tier>;
  }

  export namespace MaxGroupTieredPackageConfig {
    /**
     * Configuration for a single tier
     */
    export interface Tier {
      /**
       * Tier lower bound
       */
      tier_lower_bound: string;

      /**
       * Per unit amount
       */
      unit_amount: string;
    }
  }
}

export interface NewPlanMinimumCompositePrice {
  /**
   * The cadence to bill for this price on.
   */
  cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

  /**
   * The id of the item the price will be associated with.
   */
  item_id: string;

  /**
   * Configuration for minimum pricing
   */
  minimum_config: NewPlanMinimumCompositePrice.MinimumConfig;

  /**
   * The pricing model type
   */
  model_type: 'minimum';

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanMinimumCompositePrice {
  /**
   * Configuration for minimum pricing
   */
  export interface MinimumConfig {
    /**
     * The minimum amount to apply
     */
    minimum_amount: string;

    /**
     * If true, subtotals from this price are prorated based on the service period
     */
    prorated?: boolean;
  }
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

  /**
   * The pricing model type
   */
  model_type: 'package';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for package pricing
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
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

  /**
   * The pricing model type
   */
  model_type: 'package_with_allocation';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for package_with_allocation pricing
   */
  package_with_allocation_config: NewPlanPackageWithAllocationPrice.PackageWithAllocationConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanPackageWithAllocationPrice {
  /**
   * Configuration for package_with_allocation pricing
   */
  export interface PackageWithAllocationConfig {
    /**
     * Usage allocation
     */
    allocation: string;

    /**
     * Price per package
     */
    package_amount: string;

    /**
     * Package size
     */
    package_size: string;
  }
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

  /**
   * The pricing model type
   */
  model_type: 'scalable_matrix_with_tiered_pricing';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for scalable_matrix_with_tiered_pricing pricing
   */
  scalable_matrix_with_tiered_pricing_config: NewPlanScalableMatrixWithTieredPricingPrice.ScalableMatrixWithTieredPricingConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanScalableMatrixWithTieredPricingPrice {
  /**
   * Configuration for scalable_matrix_with_tiered_pricing pricing
   */
  export interface ScalableMatrixWithTieredPricingConfig {
    /**
     * Used for the scalable matrix first dimension
     */
    first_dimension: string;

    /**
     * Apply a scaling factor to each dimension
     */
    matrix_scaling_factors: Array<ScalableMatrixWithTieredPricingConfig.MatrixScalingFactor>;

    /**
     * Tier pricing structure
     */
    tiers: Array<ScalableMatrixWithTieredPricingConfig.Tier>;

    /**
     * Used for the scalable matrix second dimension (optional)
     */
    second_dimension?: string | null;
  }

  export namespace ScalableMatrixWithTieredPricingConfig {
    /**
     * Configuration for a single matrix scaling factor
     */
    export interface MatrixScalingFactor {
      /**
       * First dimension value
       */
      first_dimension_value: string;

      /**
       * Scaling factor
       */
      scaling_factor: string;

      /**
       * Second dimension value (optional)
       */
      second_dimension_value?: string | null;
    }

    /**
     * Configuration for a single tier entry with business logic
     */
    export interface Tier {
      /**
       * Tier lower bound
       */
      tier_lower_bound: string;

      /**
       * Per unit amount
       */
      unit_amount: string;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'scalable_matrix_with_unit_pricing';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for scalable_matrix_with_unit_pricing pricing
   */
  scalable_matrix_with_unit_pricing_config: NewPlanScalableMatrixWithUnitPricingPrice.ScalableMatrixWithUnitPricingConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanScalableMatrixWithUnitPricingPrice {
  /**
   * Configuration for scalable_matrix_with_unit_pricing pricing
   */
  export interface ScalableMatrixWithUnitPricingConfig {
    /**
     * Used to determine the unit rate
     */
    first_dimension: string;

    /**
     * Apply a scaling factor to each dimension
     */
    matrix_scaling_factors: Array<ScalableMatrixWithUnitPricingConfig.MatrixScalingFactor>;

    /**
     * The final unit price to rate against the output of the matrix
     */
    unit_price: string;

    /**
     * If true, the unit price will be prorated to the billing period
     */
    prorate?: boolean | null;

    /**
     * Used to determine the unit rate (optional)
     */
    second_dimension?: string | null;
  }

  export namespace ScalableMatrixWithUnitPricingConfig {
    /**
     * Configuration for a single matrix scaling factor
     */
    export interface MatrixScalingFactor {
      /**
       * First dimension value
       */
      first_dimension_value: string;

      /**
       * Scaling factor
       */
      scaling_factor: string;

      /**
       * Second dimension value (optional)
       */
      second_dimension_value?: string | null;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'threshold_total_amount';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for threshold_total_amount pricing
   */
  threshold_total_amount_config: NewPlanThresholdTotalAmountPrice.ThresholdTotalAmountConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanThresholdTotalAmountPrice {
  /**
   * Configuration for threshold_total_amount pricing
   */
  export interface ThresholdTotalAmountConfig {
    /**
     * When the quantity consumed passes a provided threshold, the configured total
     * will be charged
     */
    consumption_table: Array<ThresholdTotalAmountConfig.ConsumptionTable>;

    /**
     * If true, the unit price will be prorated to the billing period
     */
    prorate?: boolean | null;
  }

  export namespace ThresholdTotalAmountConfig {
    /**
     * Configuration for a single threshold
     */
    export interface ConsumptionTable {
      /**
       * Quantity threshold
       */
      threshold: string;

      /**
       * Total amount for this threshold
       */
      total_amount: string;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'tiered_package';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for tiered_package pricing
   */
  tiered_package_config: NewPlanTieredPackagePrice.TieredPackageConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanTieredPackagePrice {
  /**
   * Configuration for tiered_package pricing
   */
  export interface TieredPackageConfig {
    /**
     * Package size
     */
    package_size: string;

    /**
     * Apply tiered pricing after rounding up the quantity to the package size. Tiers
     * are defined using exclusive lower bounds. The tier bounds are defined based on
     * the total quantity rather than the number of packages, so they must be multiples
     * of the package size.
     */
    tiers: Array<TieredPackageConfig.Tier>;
  }

  export namespace TieredPackageConfig {
    /**
     * Configuration for a single tier with business logic
     */
    export interface Tier {
      /**
       * Price per package
       */
      per_unit: string;

      /**
       * Tier lower bound
       */
      tier_lower_bound: string;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'tiered_package_with_minimum';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for tiered_package_with_minimum pricing
   */
  tiered_package_with_minimum_config: NewPlanTieredPackageWithMinimumPrice.TieredPackageWithMinimumConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanTieredPackageWithMinimumPrice {
  /**
   * Configuration for tiered_package_with_minimum pricing
   */
  export interface TieredPackageWithMinimumConfig {
    /**
     * Package size
     */
    package_size: number;

    /**
     * Apply tiered pricing after rounding up the quantity to the package size. Tiers
     * are defined using exclusive lower bounds.
     */
    tiers: Array<TieredPackageWithMinimumConfig.Tier>;
  }

  export namespace TieredPackageWithMinimumConfig {
    /**
     * Configuration for a single tier
     */
    export interface Tier {
      /**
       * Minimum amount
       */
      minimum_amount: string;

      /**
       * Price per package
       */
      per_unit: string;

      /**
       * Tier lower bound
       */
      tier_lower_bound: string;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'tiered';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for tiered pricing
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
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

  /**
   * The pricing model type
   */
  model_type: 'tiered_with_minimum';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for tiered_with_minimum pricing
   */
  tiered_with_minimum_config: NewPlanTieredWithMinimumPrice.TieredWithMinimumConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanTieredWithMinimumPrice {
  /**
   * Configuration for tiered_with_minimum pricing
   */
  export interface TieredWithMinimumConfig {
    /**
     * Tiered pricing with a minimum amount dependent on the volume tier. Tiers are
     * defined using exclusive lower bounds.
     */
    tiers: Array<TieredWithMinimumConfig.Tier>;

    /**
     * If true, tiers with an accrued amount of 0 will not be included in the rating.
     */
    hide_zero_amount_tiers?: boolean;

    /**
     * If true, the unit price will be prorated to the billing period
     */
    prorate?: boolean;
  }

  export namespace TieredWithMinimumConfig {
    /**
     * Configuration for a single tier
     */
    export interface Tier {
      /**
       * Minimum amount
       */
      minimum_amount: string;

      /**
       * Tier lower bound
       */
      tier_lower_bound: string;

      /**
       * Per unit amount
       */
      unit_amount: string;
    }
  }
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

  /**
   * The pricing model type
   */
  model_type: 'unit';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for unit pricing
   */
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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
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

  /**
   * The pricing model type
   */
  model_type: 'unit_with_percent';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for unit_with_percent pricing
   */
  unit_with_percent_config: NewPlanUnitWithPercentPrice.UnitWithPercentConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanUnitWithPercentPrice {
  /**
   * Configuration for unit_with_percent pricing
   */
  export interface UnitWithPercentConfig {
    /**
     * What percent, out of 100, of the calculated total to charge
     */
    percent: string;

    /**
     * Rate per unit of usage
     */
    unit_amount: string;
  }
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

  /**
   * The pricing model type
   */
  model_type: 'unit_with_proration';

  /**
   * The name of the price.
   */
  name: string;

  /**
   * Configuration for unit_with_proration pricing
   */
  unit_with_proration_config: NewPlanUnitWithProrationPrice.UnitWithProrationConfig;

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
   * The configuration for the rate of the price currency to the invoicing currency.
   */
  conversion_rate_config?: UnitConversionRateConfig | TieredConversionRateConfig | null;

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
  metadata?: { [key: string]: string | null } | null;

  /**
   * A transient ID that can be used to reference this price when adding adjustments
   * in the same API call.
   */
  reference_id?: string | null;
}

export namespace NewPlanUnitWithProrationPrice {
  /**
   * Configuration for unit_with_proration pricing
   */
  export interface UnitWithProrationConfig {
    /**
     * Rate per unit of usage
     */
    unit_amount: string;
  }
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
  filters?: Array<NewUsageDiscount.Filter> | null;

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

export namespace NewUsageDiscount {
  export interface Filter {
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

/**
 * Configuration for package pricing
 */
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
  filters?: Array<PercentageDiscount.Filter> | null;

  reason?: string | null;
}

export namespace PercentageDiscount {
  export interface Filter {
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
  filters: Array<PercentageDiscountInterval.Filter>;

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

export namespace PercentageDiscountInterval {
  export interface Filter {
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
  filters: Array<PlanPhaseAmountDiscountAdjustment.Filter>;

  /**
   * True for adjustments that apply to an entire invoice, false for adjustments that
   * apply to only one price.
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
   * The adjustment id this adjustment replaces. This adjustment will take the place
   * of the replaced adjustment in plan version migrations.
   */
  replaces_adjustment_id: string | null;
}

export namespace PlanPhaseAmountDiscountAdjustment {
  export interface Filter {
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
  filters: Array<PlanPhaseMaximumAdjustment.Filter>;

  /**
   * True for adjustments that apply to an entire invoice, false for adjustments that
   * apply to only one price.
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

  /**
   * The adjustment id this adjustment replaces. This adjustment will take the place
   * of the replaced adjustment in plan version migrations.
   */
  replaces_adjustment_id: string | null;
}

export namespace PlanPhaseMaximumAdjustment {
  export interface Filter {
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
  filters: Array<PlanPhaseMinimumAdjustment.Filter>;

  /**
   * True for adjustments that apply to an entire invoice, false for adjustments that
   * apply to only one price.
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

  /**
   * The adjustment id this adjustment replaces. This adjustment will take the place
   * of the replaced adjustment in plan version migrations.
   */
  replaces_adjustment_id: string | null;
}

export namespace PlanPhaseMinimumAdjustment {
  export interface Filter {
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
  filters: Array<PlanPhasePercentageDiscountAdjustment.Filter>;

  /**
   * True for adjustments that apply to an entire invoice, false for adjustments that
   * apply to only one price.
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

  /**
   * The adjustment id this adjustment replaces. This adjustment will take the place
   * of the replaced adjustment in plan version migrations.
   */
  replaces_adjustment_id: string | null;
}

export namespace PlanPhasePercentageDiscountAdjustment {
  export interface Filter {
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
  filters: Array<PlanPhaseUsageDiscountAdjustment.Filter>;

  /**
   * True for adjustments that apply to an entire invoice, false for adjustments that
   * apply to only one price.
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
   * The adjustment id this adjustment replaces. This adjustment will take the place
   * of the replaced adjustment in plan version migrations.
   */
  replaces_adjustment_id: string | null;

  /**
   * The number of usage units by which to discount the price this adjustment applies
   * to in a given billing period.
   */
  usage_discount: number;
}

export namespace PlanPhaseUsageDiscountAdjustment {
  export interface Filter {
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
  | Price.TieredPrice
  | Price.BulkPrice
  | Price.BulkWithFiltersPrice
  | Price.PackagePrice
  | Price.MatrixPrice
  | Price.ThresholdTotalAmountPrice
  | Price.TieredPackagePrice
  | Price.TieredWithMinimumPrice
  | Price.GroupedTieredPrice
  | Price.TieredPackageWithMinimumPrice
  | Price.PackageWithAllocationPrice
  | Price.UnitWithPercentPrice
  | Price.MatrixWithAllocationPrice
  | Price.TieredWithProrationPrice
  | Price.UnitWithProrationPrice
  | Price.GroupedAllocationPrice
  | Price.BulkWithProrationPrice
  | Price.GroupedWithProratedMinimumPrice
  | Price.GroupedWithMeteredMinimumPrice
  | Price.GroupedWithMinMaxThresholdsPrice
  | Price.MatrixWithDisplayNamePrice
  | Price.GroupedTieredPackagePrice
  | Price.MaxGroupTieredPackagePrice
  | Price.ScalableMatrixWithUnitPricingPrice
  | Price.ScalableMatrixWithTieredPricingPrice
  | Price.CumulativeGroupedBulkPrice
  | Price.MinimumCompositePrice
  | Price.PercentCompositePrice
  | Price.EventOutputPrice;

export namespace Price {
  export interface UnitPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<UnitPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'unit';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    /**
     * Configuration for unit pricing
     */
    unit_config: Shared.UnitConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace UnitPrice {
    export interface CompositePriceFilter {
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
  }

  export interface TieredPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<TieredPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'tiered';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    /**
     * Configuration for tiered pricing
     */
    tiered_config: Shared.TieredConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace TieredPrice {
    export interface CompositePriceFilter {
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
  }

  export interface BulkPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    /**
     * Configuration for bulk pricing
     */
    bulk_config: Shared.BulkConfig;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<BulkPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'bulk';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace BulkPrice {
    export interface CompositePriceFilter {
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
  }

  export interface BulkWithFiltersPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    /**
     * Configuration for bulk_with_filters pricing
     */
    bulk_with_filters_config: BulkWithFiltersPrice.BulkWithFiltersConfig;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<BulkWithFiltersPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'bulk_with_filters';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace BulkWithFiltersPrice {
    /**
     * Configuration for bulk_with_filters pricing
     */
    export interface BulkWithFiltersConfig {
      /**
       * Property filters to apply (all must match)
       */
      filters: Array<BulkWithFiltersConfig.Filter>;

      /**
       * Bulk tiers for rating based on total usage volume
       */
      tiers: Array<BulkWithFiltersConfig.Tier>;
    }

    export namespace BulkWithFiltersConfig {
      /**
       * Configuration for a single property filter
       */
      export interface Filter {
        /**
         * Event property key to filter on
         */
        property_key: string;

        /**
         * Event property value to match
         */
        property_value: string;
      }

      /**
       * Configuration for a single bulk pricing tier
       */
      export interface Tier {
        /**
         * Amount per unit
         */
        unit_amount: string;

        /**
         * The lower bound for this tier
         */
        tier_lower_bound?: string | null;
      }
    }

    export interface CompositePriceFilter {
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
  }

  export interface PackagePrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<PackagePrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'package';

    name: string;

    /**
     * Configuration for package pricing
     */
    package_config: Shared.PackageConfig;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace PackagePrice {
    export interface CompositePriceFilter {
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
  }

  export interface MatrixPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<MatrixPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
    item: Shared.ItemSlim;

    /**
     * Configuration for matrix pricing
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'matrix';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace MatrixPrice {
    export interface CompositePriceFilter {
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
  }

  export interface ThresholdTotalAmountPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<ThresholdTotalAmountPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'threshold_total_amount';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    /**
     * Configuration for threshold_total_amount pricing
     */
    threshold_total_amount_config: ThresholdTotalAmountPrice.ThresholdTotalAmountConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace ThresholdTotalAmountPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for threshold_total_amount pricing
     */
    export interface ThresholdTotalAmountConfig {
      /**
       * When the quantity consumed passes a provided threshold, the configured total
       * will be charged
       */
      consumption_table: Array<ThresholdTotalAmountConfig.ConsumptionTable>;

      /**
       * If true, the unit price will be prorated to the billing period
       */
      prorate?: boolean | null;
    }

    export namespace ThresholdTotalAmountConfig {
      /**
       * Configuration for a single threshold
       */
      export interface ConsumptionTable {
        /**
         * Quantity threshold
         */
        threshold: string;

        /**
         * Total amount for this threshold
         */
        total_amount: string;
      }
    }
  }

  export interface TieredPackagePrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<TieredPackagePrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    /**
     * Configuration for tiered_package pricing
     */
    tiered_package_config: TieredPackagePrice.TieredPackageConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace TieredPackagePrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for tiered_package pricing
     */
    export interface TieredPackageConfig {
      /**
       * Package size
       */
      package_size: string;

      /**
       * Apply tiered pricing after rounding up the quantity to the package size. Tiers
       * are defined using exclusive lower bounds. The tier bounds are defined based on
       * the total quantity rather than the number of packages, so they must be multiples
       * of the package size.
       */
      tiers: Array<TieredPackageConfig.Tier>;
    }

    export namespace TieredPackageConfig {
      /**
       * Configuration for a single tier with business logic
       */
      export interface Tier {
        /**
         * Price per package
         */
        per_unit: string;

        /**
         * Tier lower bound
         */
        tier_lower_bound: string;
      }
    }
  }

  export interface TieredWithMinimumPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<TieredWithMinimumPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'tiered_with_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    /**
     * Configuration for tiered_with_minimum pricing
     */
    tiered_with_minimum_config: TieredWithMinimumPrice.TieredWithMinimumConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace TieredWithMinimumPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for tiered_with_minimum pricing
     */
    export interface TieredWithMinimumConfig {
      /**
       * Tiered pricing with a minimum amount dependent on the volume tier. Tiers are
       * defined using exclusive lower bounds.
       */
      tiers: Array<TieredWithMinimumConfig.Tier>;

      /**
       * If true, tiers with an accrued amount of 0 will not be included in the rating.
       */
      hide_zero_amount_tiers?: boolean;

      /**
       * If true, the unit price will be prorated to the billing period
       */
      prorate?: boolean;
    }

    export namespace TieredWithMinimumConfig {
      /**
       * Configuration for a single tier
       */
      export interface Tier {
        /**
         * Minimum amount
         */
        minimum_amount: string;

        /**
         * Tier lower bound
         */
        tier_lower_bound: string;

        /**
         * Per unit amount
         */
        unit_amount: string;
      }
    }
  }

  export interface GroupedTieredPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<GroupedTieredPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    /**
     * Configuration for grouped_tiered pricing
     */
    grouped_tiered_config: GroupedTieredPrice.GroupedTieredConfig;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'grouped_tiered';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace GroupedTieredPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for grouped_tiered pricing
     */
    export interface GroupedTieredConfig {
      /**
       * The billable metric property used to group before tiering
       */
      grouping_key: string;

      /**
       * Apply tiered pricing to each segment generated after grouping with the provided
       * key
       */
      tiers: Array<GroupedTieredConfig.Tier>;
    }

    export namespace GroupedTieredConfig {
      /**
       * Configuration for a single tier
       */
      export interface Tier {
        /**
         * Tier lower bound
         */
        tier_lower_bound: string;

        /**
         * Per unit amount
         */
        unit_amount: string;
      }
    }
  }

  export interface TieredPackageWithMinimumPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<TieredPackageWithMinimumPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'tiered_package_with_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    /**
     * Configuration for tiered_package_with_minimum pricing
     */
    tiered_package_with_minimum_config: TieredPackageWithMinimumPrice.TieredPackageWithMinimumConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace TieredPackageWithMinimumPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for tiered_package_with_minimum pricing
     */
    export interface TieredPackageWithMinimumConfig {
      /**
       * Package size
       */
      package_size: number;

      /**
       * Apply tiered pricing after rounding up the quantity to the package size. Tiers
       * are defined using exclusive lower bounds.
       */
      tiers: Array<TieredPackageWithMinimumConfig.Tier>;
    }

    export namespace TieredPackageWithMinimumConfig {
      /**
       * Configuration for a single tier
       */
      export interface Tier {
        /**
         * Minimum amount
         */
        minimum_amount: string;

        /**
         * Price per package
         */
        per_unit: string;

        /**
         * Tier lower bound
         */
        tier_lower_bound: string;
      }
    }
  }

  export interface PackageWithAllocationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<PackageWithAllocationPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'package_with_allocation';

    name: string;

    /**
     * Configuration for package_with_allocation pricing
     */
    package_with_allocation_config: PackageWithAllocationPrice.PackageWithAllocationConfig;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace PackageWithAllocationPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for package_with_allocation pricing
     */
    export interface PackageWithAllocationConfig {
      /**
       * Usage allocation
       */
      allocation: string;

      /**
       * Price per package
       */
      package_amount: string;

      /**
       * Package size
       */
      package_size: string;
    }
  }

  export interface UnitWithPercentPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<UnitWithPercentPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'unit_with_percent';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    /**
     * Configuration for unit_with_percent pricing
     */
    unit_with_percent_config: UnitWithPercentPrice.UnitWithPercentConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace UnitWithPercentPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for unit_with_percent pricing
     */
    export interface UnitWithPercentConfig {
      /**
       * What percent, out of 100, of the calculated total to charge
       */
      percent: string;

      /**
       * Rate per unit of usage
       */
      unit_amount: string;
    }
  }

  export interface MatrixWithAllocationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<MatrixWithAllocationPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
    item: Shared.ItemSlim;

    /**
     * Configuration for matrix_with_allocation pricing
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'matrix_with_allocation';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace MatrixWithAllocationPrice {
    export interface CompositePriceFilter {
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
  }

  export interface TieredWithProrationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<TieredWithProrationPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'tiered_with_proration';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    /**
     * Configuration for tiered_with_proration pricing
     */
    tiered_with_proration_config: TieredWithProrationPrice.TieredWithProrationConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace TieredWithProrationPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for tiered_with_proration pricing
     */
    export interface TieredWithProrationConfig {
      /**
       * Tiers for rating based on total usage quantities into the specified tier with
       * proration
       */
      tiers: Array<TieredWithProrationConfig.Tier>;
    }

    export namespace TieredWithProrationConfig {
      /**
       * Configuration for a single tiered with proration tier
       */
      export interface Tier {
        /**
         * Inclusive tier starting value
         */
        tier_lower_bound: string;

        /**
         * Amount per unit
         */
        unit_amount: string;
      }
    }
  }

  export interface UnitWithProrationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<UnitWithProrationPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'unit_with_proration';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    /**
     * Configuration for unit_with_proration pricing
     */
    unit_with_proration_config: UnitWithProrationPrice.UnitWithProrationConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace UnitWithProrationPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for unit_with_proration pricing
     */
    export interface UnitWithProrationConfig {
      /**
       * Rate per unit of usage
       */
      unit_amount: string;
    }
  }

  export interface GroupedAllocationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<GroupedAllocationPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    /**
     * Configuration for grouped_allocation pricing
     */
    grouped_allocation_config: GroupedAllocationPrice.GroupedAllocationConfig;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'grouped_allocation';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace GroupedAllocationPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for grouped_allocation pricing
     */
    export interface GroupedAllocationConfig {
      /**
       * Usage allocation per group
       */
      allocation: string;

      /**
       * How to determine the groups that should each be allocated some quantity
       */
      grouping_key: string;

      /**
       * Unit rate for post-allocation
       */
      overage_unit_rate: string;
    }
  }

  export interface BulkWithProrationPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    /**
     * Configuration for bulk_with_proration pricing
     */
    bulk_with_proration_config: BulkWithProrationPrice.BulkWithProrationConfig;

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<BulkWithProrationPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'bulk_with_proration';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace BulkWithProrationPrice {
    /**
     * Configuration for bulk_with_proration pricing
     */
    export interface BulkWithProrationConfig {
      /**
       * Bulk tiers for rating based on total usage volume
       */
      tiers: Array<BulkWithProrationConfig.Tier>;
    }

    export namespace BulkWithProrationConfig {
      /**
       * Configuration for a single bulk pricing tier with proration
       */
      export interface Tier {
        /**
         * Cost per unit
         */
        unit_amount: string;

        /**
         * The lower bound for this tier
         */
        tier_lower_bound?: string | null;
      }
    }

    export interface CompositePriceFilter {
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
  }

  export interface GroupedWithProratedMinimumPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<GroupedWithProratedMinimumPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    /**
     * Configuration for grouped_with_prorated_minimum pricing
     */
    grouped_with_prorated_minimum_config: GroupedWithProratedMinimumPrice.GroupedWithProratedMinimumConfig;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'grouped_with_prorated_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace GroupedWithProratedMinimumPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for grouped_with_prorated_minimum pricing
     */
    export interface GroupedWithProratedMinimumConfig {
      /**
       * How to determine the groups that should each have a minimum
       */
      grouping_key: string;

      /**
       * The minimum amount to charge per group
       */
      minimum: string;

      /**
       * The amount to charge per unit
       */
      unit_rate: string;
    }
  }

  export interface GroupedWithMeteredMinimumPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<GroupedWithMeteredMinimumPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    /**
     * Configuration for grouped_with_metered_minimum pricing
     */
    grouped_with_metered_minimum_config: GroupedWithMeteredMinimumPrice.GroupedWithMeteredMinimumConfig;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'grouped_with_metered_minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace GroupedWithMeteredMinimumPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for grouped_with_metered_minimum pricing
     */
    export interface GroupedWithMeteredMinimumConfig {
      /**
       * Used to partition the usage into groups. The minimum amount is applied to each
       * group.
       */
      grouping_key: string;

      /**
       * The minimum amount to charge per group per unit
       */
      minimum_unit_amount: string;

      /**
       * Used to determine the unit rate
       */
      pricing_key: string;

      /**
       * Scale the unit rates by the scaling factor.
       */
      scaling_factors: Array<GroupedWithMeteredMinimumConfig.ScalingFactor>;

      /**
       * Used to determine the unit rate scaling factor
       */
      scaling_key: string;

      /**
       * Apply per unit pricing to each pricing value. The minimum amount is applied any
       * unmatched usage.
       */
      unit_amounts: Array<GroupedWithMeteredMinimumConfig.UnitAmount>;
    }

    export namespace GroupedWithMeteredMinimumConfig {
      /**
       * Configuration for a scaling factor
       */
      export interface ScalingFactor {
        /**
         * Scaling factor
         */
        scaling_factor: string;

        /**
         * Scaling value
         */
        scaling_value: string;
      }

      /**
       * Configuration for a unit amount
       */
      export interface UnitAmount {
        /**
         * Pricing value
         */
        pricing_value: string;

        /**
         * Per unit amount
         */
        unit_amount: string;
      }
    }
  }

  export interface GroupedWithMinMaxThresholdsPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<GroupedWithMinMaxThresholdsPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    /**
     * Configuration for grouped_with_min_max_thresholds pricing
     */
    grouped_with_min_max_thresholds_config: GroupedWithMinMaxThresholdsPrice.GroupedWithMinMaxThresholdsConfig;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'grouped_with_min_max_thresholds';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace GroupedWithMinMaxThresholdsPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for grouped_with_min_max_thresholds pricing
     */
    export interface GroupedWithMinMaxThresholdsConfig {
      /**
       * The event property used to group before applying thresholds
       */
      grouping_key: string;

      /**
       * The maximum amount to charge each group
       */
      maximum_charge: string;

      /**
       * The minimum amount to charge each group, regardless of usage
       */
      minimum_charge: string;

      /**
       * The base price charged per group
       */
      per_unit_rate: string;
    }
  }

  export interface MatrixWithDisplayNamePrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<MatrixWithDisplayNamePrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
    item: Shared.ItemSlim;

    /**
     * Configuration for matrix_with_display_name pricing
     */
    matrix_with_display_name_config: MatrixWithDisplayNamePrice.MatrixWithDisplayNameConfig;

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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'matrix_with_display_name';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace MatrixWithDisplayNamePrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for matrix_with_display_name pricing
     */
    export interface MatrixWithDisplayNameConfig {
      /**
       * Used to determine the unit rate
       */
      dimension: string;

      /**
       * Apply per unit pricing to each dimension value
       */
      unit_amounts: Array<MatrixWithDisplayNameConfig.UnitAmount>;
    }

    export namespace MatrixWithDisplayNameConfig {
      /**
       * Configuration for a unit amount item
       */
      export interface UnitAmount {
        /**
         * The dimension value
         */
        dimension_value: string;

        /**
         * Display name for this dimension value
         */
        display_name: string;

        /**
         * Per unit amount
         */
        unit_amount: string;
      }
    }
  }

  export interface GroupedTieredPackagePrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<GroupedTieredPackagePrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    /**
     * Configuration for grouped_tiered_package pricing
     */
    grouped_tiered_package_config: GroupedTieredPackagePrice.GroupedTieredPackageConfig;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'grouped_tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace GroupedTieredPackagePrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for grouped_tiered_package pricing
     */
    export interface GroupedTieredPackageConfig {
      /**
       * The event property used to group before tiering
       */
      grouping_key: string;

      /**
       * Package size
       */
      package_size: string;

      /**
       * Apply tiered pricing after rounding up the quantity to the package size. Tiers
       * are defined using exclusive lower bounds.
       */
      tiers: Array<GroupedTieredPackageConfig.Tier>;
    }

    export namespace GroupedTieredPackageConfig {
      /**
       * Configuration for a single tier
       */
      export interface Tier {
        /**
         * Price per package
         */
        per_unit: string;

        /**
         * Tier lower bound
         */
        tier_lower_bound: string;
      }
    }
  }

  export interface MaxGroupTieredPackagePrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<MaxGroupTieredPackagePrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
    item: Shared.ItemSlim;

    /**
     * Configuration for max_group_tiered_package pricing
     */
    max_group_tiered_package_config: MaxGroupTieredPackagePrice.MaxGroupTieredPackageConfig;

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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'max_group_tiered_package';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace MaxGroupTieredPackagePrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for max_group_tiered_package pricing
     */
    export interface MaxGroupTieredPackageConfig {
      /**
       * The event property used to group before tiering the group with the highest value
       */
      grouping_key: string;

      /**
       * Package size
       */
      package_size: string;

      /**
       * Apply tiered pricing to the largest group after grouping with the provided key.
       */
      tiers: Array<MaxGroupTieredPackageConfig.Tier>;
    }

    export namespace MaxGroupTieredPackageConfig {
      /**
       * Configuration for a single tier
       */
      export interface Tier {
        /**
         * Tier lower bound
         */
        tier_lower_bound: string;

        /**
         * Per unit amount
         */
        unit_amount: string;
      }
    }
  }

  export interface ScalableMatrixWithUnitPricingPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<ScalableMatrixWithUnitPricingPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'scalable_matrix_with_unit_pricing';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    /**
     * Configuration for scalable_matrix_with_unit_pricing pricing
     */
    scalable_matrix_with_unit_pricing_config: ScalableMatrixWithUnitPricingPrice.ScalableMatrixWithUnitPricingConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace ScalableMatrixWithUnitPricingPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for scalable_matrix_with_unit_pricing pricing
     */
    export interface ScalableMatrixWithUnitPricingConfig {
      /**
       * Used to determine the unit rate
       */
      first_dimension: string;

      /**
       * Apply a scaling factor to each dimension
       */
      matrix_scaling_factors: Array<ScalableMatrixWithUnitPricingConfig.MatrixScalingFactor>;

      /**
       * The final unit price to rate against the output of the matrix
       */
      unit_price: string;

      /**
       * If true, the unit price will be prorated to the billing period
       */
      prorate?: boolean | null;

      /**
       * Used to determine the unit rate (optional)
       */
      second_dimension?: string | null;
    }

    export namespace ScalableMatrixWithUnitPricingConfig {
      /**
       * Configuration for a single matrix scaling factor
       */
      export interface MatrixScalingFactor {
        /**
         * First dimension value
         */
        first_dimension_value: string;

        /**
         * Scaling factor
         */
        scaling_factor: string;

        /**
         * Second dimension value (optional)
         */
        second_dimension_value?: string | null;
      }
    }
  }

  export interface ScalableMatrixWithTieredPricingPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<ScalableMatrixWithTieredPricingPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'scalable_matrix_with_tiered_pricing';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    /**
     * Configuration for scalable_matrix_with_tiered_pricing pricing
     */
    scalable_matrix_with_tiered_pricing_config: ScalableMatrixWithTieredPricingPrice.ScalableMatrixWithTieredPricingConfig;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace ScalableMatrixWithTieredPricingPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for scalable_matrix_with_tiered_pricing pricing
     */
    export interface ScalableMatrixWithTieredPricingConfig {
      /**
       * Used for the scalable matrix first dimension
       */
      first_dimension: string;

      /**
       * Apply a scaling factor to each dimension
       */
      matrix_scaling_factors: Array<ScalableMatrixWithTieredPricingConfig.MatrixScalingFactor>;

      /**
       * Tier pricing structure
       */
      tiers: Array<ScalableMatrixWithTieredPricingConfig.Tier>;

      /**
       * Used for the scalable matrix second dimension (optional)
       */
      second_dimension?: string | null;
    }

    export namespace ScalableMatrixWithTieredPricingConfig {
      /**
       * Configuration for a single matrix scaling factor
       */
      export interface MatrixScalingFactor {
        /**
         * First dimension value
         */
        first_dimension_value: string;

        /**
         * Scaling factor
         */
        scaling_factor: string;

        /**
         * Second dimension value (optional)
         */
        second_dimension_value?: string | null;
      }

      /**
       * Configuration for a single tier entry with business logic
       */
      export interface Tier {
        /**
         * Tier lower bound
         */
        tier_lower_bound: string;

        /**
         * Per unit amount
         */
        unit_amount: string;
      }
    }
  }

  export interface CumulativeGroupedBulkPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<CumulativeGroupedBulkPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    /**
     * Configuration for cumulative_grouped_bulk pricing
     */
    cumulative_grouped_bulk_config: CumulativeGroupedBulkPrice.CumulativeGroupedBulkConfig;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'cumulative_grouped_bulk';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace CumulativeGroupedBulkPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for cumulative_grouped_bulk pricing
     */
    export interface CumulativeGroupedBulkConfig {
      /**
       * Each tier lower bound must have the same group of values.
       */
      dimension_values: Array<CumulativeGroupedBulkConfig.DimensionValue>;

      /**
       * Grouping key name
       */
      group: string;
    }

    export namespace CumulativeGroupedBulkConfig {
      /**
       * Configuration for a dimension value entry
       */
      export interface DimensionValue {
        /**
         * Grouping key value
         */
        grouping_key: string;

        /**
         * Tier lower bound
         */
        tier_lower_bound: string;

        /**
         * Unit amount for this combination
         */
        unit_amount: string;
      }
    }
  }

  export interface MinimumCompositePrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<MinimumCompositePrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * Configuration for minimum pricing
     */
    minimum_config: MinimumCompositePrice.MinimumConfig;

    /**
     * The pricing model type
     */
    model_type: 'minimum';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace MinimumCompositePrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for minimum pricing
     */
    export interface MinimumConfig {
      /**
       * The minimum amount to apply
       */
      minimum_amount: string;

      /**
       * If true, subtotals from this price are prorated based on the service period
       */
      prorated?: boolean;
    }
  }

  export interface PercentCompositePrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<PercentCompositePrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

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

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'percent';

    name: string;

    /**
     * Configuration for percent pricing
     */
    percent_config: PercentCompositePrice.PercentConfig;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace PercentCompositePrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for percent pricing
     */
    export interface PercentConfig {
      /**
       * What percent of the component subtotals to charge
       */
      percent: number;
    }
  }

  export interface EventOutputPrice {
    id: string;

    billable_metric: Shared.BillableMetricTiny | null;

    billing_cycle_configuration: Shared.BillingCycleConfiguration;

    billing_mode: 'in_advance' | 'in_arrear';

    cadence: 'one_time' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';

    composite_price_filters: Array<EventOutputPrice.CompositePriceFilter> | null;

    conversion_rate: number | null;

    conversion_rate_config: Shared.UnitConversionRateConfig | Shared.TieredConversionRateConfig | null;

    created_at: string;

    credit_allocation: Shared.Allocation | null;

    currency: string;

    /**
     * @deprecated
     */
    discount: Shared.Discount | null;

    /**
     * Configuration for event_output pricing
     */
    event_output_config: EventOutputPrice.EventOutputConfig;

    external_price_id: string | null;

    fixed_price_quantity: number | null;

    invoicing_cycle_configuration: Shared.BillingCycleConfiguration | null;

    /**
     * A minimal representation of an Item containing only the essential identifying
     * information.
     */
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
    metadata: { [key: string]: string };

    /**
     * @deprecated
     */
    minimum: Shared.Minimum | null;

    /**
     * @deprecated
     */
    minimum_amount: string | null;

    /**
     * The pricing model type
     */
    model_type: 'event_output';

    name: string;

    plan_phase_order: number | null;

    price_type: 'usage_price' | 'fixed_price' | 'composite_price';

    /**
     * The price id this price replaces. This price will take the place of the replaced
     * price in plan version migrations.
     */
    replaces_price_id: string | null;

    dimensional_price_configuration?: Shared.DimensionalPriceConfiguration | null;
  }

  export namespace EventOutputPrice {
    export interface CompositePriceFilter {
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

    /**
     * Configuration for event_output pricing
     */
    export interface EventOutputConfig {
      /**
       * The key in the event data to extract the unit rate from.
       */
      unit_rating_key: string;

      /**
       * If provided, this amount will be used as the unit rate when an event does not
       * have a value for the `unit_rating_key`. If not provided, events missing a unit
       * rate will be ignored.
       */
      default_unit_rate?: string | null;

      /**
       * An optional key in the event data to group by (e.g., event ID). All events will
       * also be grouped by their unit rate.
       */
      grouping_key?: string | null;
    }
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

/**
 * Configuration for a single tier
 */
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
   * Inclusive tier ending value. This value is null if and only if this is the last
   * tier.
   */
  last_unit?: number | null;
}

export interface TierSubLineItem {
  /**
   * The total amount for this sub line item.
   */
  amount: string;

  grouping: SubLineItemGrouping | null;

  name: string;

  quantity: number;

  tier_config: TierSubLineItem.TierConfig;

  type: 'tier';
}

export namespace TierSubLineItem {
  export interface TierConfig {
    first_unit: number;

    last_unit: number | null;

    unit_amount: string;
  }
}

/**
 * Configuration for tiered pricing
 */
export interface TieredConfig {
  /**
   * Tiers for rating based on total usage quantities into the specified tier
   */
  tiers: Array<Tier>;
}

export interface TieredConversionRateConfig {
  conversion_rate_type: 'tiered';

  tiered_config: ConversionRateTieredConfig;
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
  filters?: Array<TrialDiscount.Filter> | null;

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

export namespace TrialDiscount {
  export interface Filter {
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
}

/**
 * Configuration for unit pricing
 */
export interface UnitConfig {
  /**
   * Rate per unit of usage
   */
  unit_amount: string;
}

export interface UnitConversionRateConfig {
  conversion_rate_type: 'unit';

  unit_config: ConversionRateUnitConfig;
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
  filters?: Array<UsageDiscount.Filter> | null;

  reason?: string | null;
}

export namespace UsageDiscount {
  export interface Filter {
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
  filters: Array<UsageDiscountInterval.Filter>;

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

export namespace UsageDiscountInterval {
  export interface Filter {
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
}

export class CreditNotesPage extends Page<CreditNote> {}

export class InvoicesPage extends Page<Invoice> {}

export class PricesPage extends Page<Price> {}
