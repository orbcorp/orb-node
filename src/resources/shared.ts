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

  reason?: string | null;
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

  reason?: string | null;
}

export interface TrialDiscount {
  discount_type: 'trial';

  /**
   * List of price_ids that this discount applies to. For plan/plan phase discounts,
   * this can be a subset of prices.
   */
  applies_to_price_ids?: Array<string> | null;

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

  reason?: string | null;
}
