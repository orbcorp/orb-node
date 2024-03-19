// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export type Discount =
  | Discount.PercentageDiscount
  | Discount.TrialDiscount
  | Discount.UsageDiscount
  | Discount.AmountDiscount;

export namespace Discount {
  export interface PercentageDiscount {
    /**
     * List of price_ids that this discount applies to. For plan/plan phase discounts,
     * this can be a subset of prices.
     */
    applies_to_price_ids: Array<string>;

    discount_type: 'percentage';

    /**
     * Only available if discount_type is `percentage`. This is a number between 0
     * and 1.
     */
    percentage_discount: number;

    reason?: string | null;
  }

  export interface TrialDiscount {
    /**
     * List of price_ids that this discount applies to. For plan/plan phase discounts,
     * this can be a subset of prices.
     */
    applies_to_price_ids: Array<string>;

    discount_type: 'trial';

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
    /**
     * List of price_ids that this discount applies to. For plan/plan phase discounts,
     * this can be a subset of prices.
     */
    applies_to_price_ids: Array<string>;

    discount_type: 'usage';

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;

    reason?: string | null;
  }

  export interface AmountDiscount {
    /**
     * Only available if discount_type is `amount`.
     */
    amount_discount: string;

    /**
     * List of price_ids that this discount applies to. For plan/plan phase discounts,
     * this can be a subset of prices.
     */
    applies_to_price_ids: Array<string>;

    discount_type: 'amount';

    reason?: string | null;
  }
}
