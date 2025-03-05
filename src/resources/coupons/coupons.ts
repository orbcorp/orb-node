// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as Shared from '../shared';
import { CouponModelsPage } from '../shared';
import * as SubscriptionsAPI from './subscriptions';
import { SubscriptionListParams, Subscriptions } from './subscriptions';
import { type PageParams } from '../../pagination';

export class Coupons extends APIResource {
  subscriptions: SubscriptionsAPI.Subscriptions = new SubscriptionsAPI.Subscriptions(this._client);

  /**
   * This endpoint allows the creation of coupons, which can then be redeemed at
   * subscription creation or plan change.
   */
  create(body: CouponCreateParams, options?: Core.RequestOptions): Core.APIPromise<Shared.CouponModel> {
    return this._client.post('/coupons', { body, ...options });
  }

  /**
   * This endpoint returns a list of all coupons for an account in a list format.
   *
   * The list of coupons is ordered starting from the most recently created coupon.
   * The response also includes `pagination_metadata`, which lets the caller retrieve
   * the next page of results if they exist. More information about pagination can be
   * found in the Pagination-metadata schema.
   */
  list(
    query?: CouponListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CouponModelsPage, Shared.CouponModel>;
  list(options?: Core.RequestOptions): Core.PagePromise<CouponModelsPage, Shared.CouponModel>;
  list(
    query: CouponListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CouponModelsPage, Shared.CouponModel> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/coupons', CouponModelsPage, { query, ...options });
  }

  /**
   * This endpoint allows a coupon to be archived. Archived coupons can no longer be
   * redeemed, and will be hidden from lists of active coupons. Additionally, once a
   * coupon is archived, its redemption code can be reused for a different coupon.
   */
  archive(couponId: string, options?: Core.RequestOptions): Core.APIPromise<Shared.CouponModel> {
    return this._client.post(`/coupons/${couponId}/archive`, options);
  }

  /**
   * This endpoint retrieves a coupon by its ID. To fetch coupons by their redemption
   * code, use the [List coupons](list-coupons) endpoint with the redemption_code
   * parameter.
   */
  fetch(couponId: string, options?: Core.RequestOptions): Core.APIPromise<Shared.CouponModel> {
    return this._client.get(`/coupons/${couponId}`, options);
  }
}

/**
 * A coupon represents a reusable discount configuration that can be applied either
 * as a fixed or percentage amount to an invoice or subscription. Coupons are
 * activated using a redemption code, which applies the discount to a subscription
 * or invoice. The duration of a coupon determines how long it remains available
 * for use by end users.
 */
export interface Coupon {
  /**
   * Also referred to as coupon_id in this documentation.
   */
  id: string;

  /**
   * An archived coupon can no longer be redeemed. Active coupons will have a value
   * of null for `archived_at`; this field will be non-null for archived coupons.
   */
  archived_at: string | null;

  discount: Shared.PercentageDiscount | Shared.AmountDiscount;

  /**
   * This allows for a coupon's discount to apply for a limited time (determined in
   * months); a `null` value here means "unlimited time".
   */
  duration_in_months: number | null;

  /**
   * The maximum number of redemptions allowed for this coupon before it is
   * exhausted; `null` here means "unlimited".
   */
  max_redemptions: number | null;

  /**
   * This string can be used to redeem this coupon for a given subscription.
   */
  redemption_code: string;

  /**
   * The number of times this coupon has been redeemed.
   */
  times_redeemed: number;
}

export interface CouponCreateParams {
  discount: CouponCreateParams.NewCouponPercentageDiscount | CouponCreateParams.NewCouponAmountDiscount;

  /**
   * This string can be used to redeem this coupon for a given subscription.
   */
  redemption_code: string;

  /**
   * This allows for a coupon's discount to apply for a limited time (determined in
   * months); a `null` value here means "unlimited time".
   */
  duration_in_months?: number | null;

  /**
   * The maximum number of redemptions allowed for this coupon before it is
   * exhausted;`null` here means "unlimited".
   */
  max_redemptions?: number | null;
}

export namespace CouponCreateParams {
  export interface NewCouponPercentageDiscount {
    discount_type: 'percentage';

    percentage_discount: number;
  }

  export interface NewCouponAmountDiscount {
    amount_discount: string;

    discount_type: 'amount';
  }
}

export interface CouponListParams extends PageParams {
  /**
   * Filter to coupons matching this redemption code.
   */
  redemption_code?: string | null;

  /**
   * Show archived coupons as well (by default, this endpoint only returns active
   * coupons).
   */
  show_archived?: boolean | null;
}

Coupons.Subscriptions = Subscriptions;

export declare namespace Coupons {
  export {
    type Coupon as Coupon,
    type CouponCreateParams as CouponCreateParams,
    type CouponListParams as CouponListParams,
  };

  export { Subscriptions as Subscriptions, type SubscriptionListParams as SubscriptionListParams };
}

export { CouponModelsPage };
