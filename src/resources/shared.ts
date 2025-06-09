// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

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

export type BillingCycleRelativeDate = 'start_of_term' | 'end_of_term';

export type Discount = PercentageDiscount | TrialDiscount | UsageDiscount | AmountDiscount;

export type InvoiceLevelDiscount = PercentageDiscount | AmountDiscount | TrialDiscount;

export interface PaginationMetadata {
  has_more: boolean;

  next_cursor: string | null;
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
