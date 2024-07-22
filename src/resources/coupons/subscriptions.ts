// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as CouponsSubscriptionsAPI from './subscriptions';
import * as SubscriptionsAPI from '../subscriptions';
import { SubscriptionsPage } from '../subscriptions';
import { type PageParams } from '../../pagination';

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
