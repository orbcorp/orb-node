// File generated from our OpenAPI spec by Stainless.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import { isRequestOptions } from 'orb-billing/core';
import * as CouponsSubscriptionsAPI from 'orb-billing/resources/coupons/subscriptions';
import * as SubscriptionsAPI from 'orb-billing/resources/subscriptions';
import { SubscriptionsPage } from 'orb-billing/resources/subscriptions';
import { type PageParams } from 'orb-billing/pagination';

export class Subscriptions extends APIResource {
  /**
   * This endpoint returns a list of all subscriptions that have redeemed a given
   * coupon as a [paginated](../reference/pagination) list, ordered starting from the
   * most recently created subscription. For a full discussion of the subscription
   * resource, see [Subscription](../guides/concepts#subscription).
   */
  list(
    couponId: string,
    query?: SubscriptionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<SubscriptionsPage, SubscriptionsAPI.Subscription>;
  list(
    couponId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<SubscriptionsPage, SubscriptionsAPI.Subscription>;
  list(
    couponId: string,
    query: SubscriptionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<SubscriptionsPage, SubscriptionsAPI.Subscription> {
    if (isRequestOptions(query)) {
      return this.list(couponId, {}, query);
    }
    return this._client.getAPIList(`/coupons/${couponId}/subscriptions`, SubscriptionsPage, {
      query,
      ...options,
    });
  }
}

export interface SubscriptionListParams extends PageParams {}

export namespace Subscriptions {
  export import SubscriptionListParams = CouponsSubscriptionsAPI.SubscriptionListParams;
}

export { SubscriptionsPage };
