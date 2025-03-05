// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as Shared from './shared';
import * as CustomersAPI from './customers/customers';
import * as PlansAPI from './plans/plans';
import * as PricesAPI from './prices/prices';
import { Page, type PageParams } from '../pagination';

export class Subscriptions extends APIResource {
  /**
   * A subscription represents the purchase of a plan by a customer. The customer is
   * identified by either the `customer_id` or the `external_customer_id`, and
   * exactly one of these fields must be provided.
   *
   * By default, subscriptions begin on the day that they're created and renew
   * automatically for each billing cycle at the cadence that's configured in the
   * plan definition.
   *
   * The default configuration for subscriptions in Orb is **In-advance billing** and
   * **Beginning of month alignment** (see
   * [Subscription](/core-concepts##subscription) for more details).
   *
   * In order to change the alignment behavior, Orb also supports billing
   * subscriptions on the day of the month they are created. If
   * `align_billing_with_subscription_start_date = true` is specified, subscriptions
   * have billing cycles that are aligned with their `start_date`. For example, a
   * subscription that begins on January 15th will have a billing cycle from January
   * 15th to February 15th. Every subsequent billing cycle will continue to start and
   * invoice on the 15th.
   *
   * If the "day" value is greater than the number of days in the month, the next
   * billing cycle will start at the end of the month. For example, if the start_date
   * is January 31st, the next billing cycle will start on February 28th.
   *
   * If a customer was created with a currency, Orb only allows subscribing the
   * customer to a plan with a matching `invoicing_currency`. If the customer does
   * not have a currency set, on subscription creation, we set the customer's
   * currency to be the `invoicing_currency` of the plan.
   *
   * ## Customize your customer's subscriptions
   *
   * Prices and adjustments in a plan can be added, removed, or replaced for the
   * subscription being created. This is useful when a customer has prices that
   * differ from the default prices for a specific plan.
   *
   * <Note>
   * This feature is only available for accounts that have migrated to Subscription Overrides Version 2. You can find your
   * Subscription Overrides Version at the bottom of your [Plans page](https://app.withorb.com/plans)
   * </Note>
   *
   * ### Adding Prices
   *
   * To add prices, provide a list of objects with the key `add_prices`. An object in
   * the list must specify an existing add-on price with a `price_id` or
   * `external_price_id` field, or create a new add-on price by including an object
   * with the key `price`, identical to what would be used in the request body for
   * the [create price endpoint](/api-reference/price/create-price). See the
   * [Price resource](/product-catalog/price-configuration) for the specification of
   * different price model configurations possible in this object.
   *
   * If the plan has phases, each object in the list must include a number with
   * `plan_phase_order` key to indicate which phase the price should be added to.
   *
   * An object in the list can specify an optional `start_date` and optional
   * `end_date`. This is equivalent to creating a price interval with the
   * [add/edit price intervals endpoint](/api-reference/price-interval/add-or-edit-price-intervals).
   * If unspecified, the start or end date of the phase or subscription will be used.
   *
   * An object in the list can specify an optional `minimum_amount`,
   * `maximum_amount`, or `discounts`. This will create adjustments which apply only
   * to this price.
   *
   * Additionally, an object in the list can specify an optional `reference_id`. This
   * ID can be used to reference this price when
   * [adding an adjustment](#adding-adjustments) in the same API call. However the ID
   * is _transient_ and cannot be used to refer to the price in future API calls.
   *
   * ### Removing Prices
   *
   * To remove prices, provide a list of objects with the key `remove_prices`. An
   * object in the list must specify a plan price with either a `price_id` or
   * `external_price_id` field.
   *
   * ### Replacing Prices
   *
   * To replace prices, provide a list of objects with the key `replace_prices`. An
   * object in the list must specify a plan price to replace with the
   * `replaces_price_id` key, and it must specify a price to replace it with by
   * either referencing an existing add-on price with a `price_id` or
   * `external_price_id` field, or by creating a new add-on price by including an
   * object with the key `price`, identical to what would be used in the request body
   * for the [create price endpoint](/api-reference/price/create-price). See the
   * [Price resource](/product-catalog/price-configuration) for the specification of
   * different price model configurations possible in this object.
   *
   * For fixed fees, an object in the list can supply a `fixed_price_quantity`
   * instead of a `price`, `price_id`, or `external_price_id` field. This will update
   * only the quantity for the price, similar to the
   * [Update price quantity](/api-reference/subscription/update-price-quantity)
   * endpoint.
   *
   * The replacement price will have the same phase, if applicable, and the same
   * start and end dates as the price it replaces.
   *
   * An object in the list can specify an optional `minimum_amount`,
   * `maximum_amount`, or `discounts`. This will create adjustments which apply only
   * to this price.
   *
   * Additionally, an object in the list can specify an optional `reference_id`. This
   * ID can be used to reference the replacement price when
   * [adding an adjustment](#adding-adjustments) in the same API call. However the ID
   * is _transient_ and cannot be used to refer to the price in future API calls.
   *
   * ### Adding adjustments
   *
   * To add adjustments, provide a list of objects with the key `add_adjustments`. An
   * object in the list must include an object with the key `adjustment`, identical
   * to the adjustment object in the
   * [add/edit price intervals endpoint](/api-reference/price-interval/add-or-edit-price-intervals).
   *
   * If the plan has phases, each object in the list must include a number with
   * `plan_phase_order` key to indicate which phase the adjustment should be added
   * to.
   *
   * An object in the list can specify an optional `start_date` and optional
   * `end_date`. If unspecified, the start or end date of the phase or subscription
   * will be used.
   *
   * ### Removing adjustments
   *
   * To remove adjustments, provide a list of objects with the key
   * `remove_adjustments`. An object in the list must include a key, `adjustment_id`,
   * with the ID of the adjustment to be removed.
   *
   * ### Replacing adjustments
   *
   * To replace adjustments, provide a list of objects with the key
   * `replace_adjustments`. An object in the list must specify a plan adjustment to
   * replace with the `replaces_adjustment_id` key, and it must specify an adjustment
   * to replace it with by including an object with the key `adjustment`, identical
   * to the adjustment object in the
   * [add/edit price intervals endpoint](/api-reference/price-interval/add-or-edit-price-intervals).
   *
   * The replacement adjustment will have the same phase, if applicable, and the same
   * start and end dates as the adjustment it replaces.
   *
   * ## Price overrides (DEPRECATED)
   *
   * <Note>
   * Price overrides are being phased out in favor adding/removing/replacing prices. (See
   * [Customize your customer's subscriptions](/api-reference/subscription/create-subscription))
   * </Note>
   *
   * Price overrides are used to update some or all prices in a plan for the specific
   * subscription being created. This is useful when a new customer has negotiated a
   * rate that is unique to the customer.
   *
   * To override prices, provide a list of objects with the key `price_overrides`.
   * The price object in the list of overrides is expected to contain the existing
   * price id, the `model_type` and configuration. (See the
   * [Price resource](/product-catalog/price-configuration) for the specification of
   * different price model configurations.) The numerical values can be updated, but
   * the billable metric, cadence, type, and name of a price can not be overridden.
   *
   * ### Maximums and Minimums
   *
   * Minimums and maximums, much like price overrides, can be useful when a new
   * customer has negotiated a new or different minimum or maximum spend cap than the
   * default for a given price. If one exists for a price and null is provided for
   * the minimum/maximum override on creation, then there will be no minimum/maximum
   * on the new subscription. If no value is provided, then the default price maximum
   * or minimum is used.
   *
   * To add a minimum for a specific price, add `minimum_amount` to the specific
   * price in the `price_overrides` object.
   *
   * To add a maximum for a specific price, add `maximum_amount` to the specific
   * price in the `price_overrides` object.
   *
   * ### Minimum override example
   *
   * Price minimum override example:
   *
   * ```json
   * {
   *   ...
   *   "id": "price_id",
   *   "model_type": "unit",
   *   "unit_config": {
   *     "unit_amount": "0.50"
   *   },
   *   "minimum_amount": "100.00"
   *   ...
   * }
   * ```
   *
   * Removing an existing minimum example
   *
   * ```json
   * {
   *   ...
   *   "id": "price_id",
   *   "model_type": "unit",
   *   "unit_config": {
   *     "unit_amount": "0.50"
   *   },
   *   "minimum_amount": null
   *   ...
   * }
   * ```
   *
   * ### Discounts
   *
   * Discounts, like price overrides, can be useful when a new customer has
   * negotiated a new or different discount than the default for a price. If a
   * discount exists for a price and a null discount is provided on creation, then
   * there will be no discount on the new subscription.
   *
   * To add a discount for a specific price, add `discount` to the price in the
   * `price_overrides` object. Discount should be a dictionary of the format:
   *
   * ```ts
   * {
   *   "discount_type": "amount" | "percentage" | "usage",
   *   "amount_discount": string,
   *   "percentage_discount": string,
   *   "usage_discount": string
   * }
   * ```
   *
   * where either `amount_discount`, `percentage_discount`, or `usage_discount` is
   * provided.
   *
   * Price discount example
   *
   * ```json
   * {
   *   ...
   *   "id": "price_id",
   *   "model_type": "unit",
   *   "unit_config": {
   *     "unit_amount": "0.50"
   *   },
   *   "discount": {"discount_type": "amount", "amount_discount": "175"},
   * }
   * ```
   *
   * Removing an existing discount example
   *
   * ```json
   * {
   *   "customer_id": "customer_id",
   *   "plan_id": "plan_id",
   *   "discount": null,
   *   "price_overrides": [ ... ]
   *   ...
   * }
   * ```
   *
   * ## Threshold Billing
   *
   * Orb supports invoicing for a subscription when a preconfigured usage threshold
   * is hit. To enable threshold billing, pass in an `invoicing_threshold`, which is
   * specified in the subscription's invoicing currency, when creating a
   * subscription. E.g. pass in `10.00` to issue an invoice when usage amounts hit
   * $10.00 for a subscription that invoices in USD.
   */
  create(
    body: SubscriptionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionCreateResponse> {
    return this._client.post('/subscriptions', { body, ...options });
  }

  /**
   * This endpoint can be used to update the `metadata`, `net terms`,
   * `auto_collection`, `invoicing_threshold`, and `default_invoice_memo` properties
   * on a subscription.
   */
  update(
    subscriptionId: string,
    body: SubscriptionUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Subscription> {
    return this._client.put(`/subscriptions/${subscriptionId}`, { body, ...options });
  }

  /**
   * This endpoint returns a list of all subscriptions for an account as a
   * [paginated](/api-reference/pagination) list, ordered starting from the most
   * recently created subscription. For a full discussion of the subscription
   * resource, see [Subscription](/core-concepts##subscription).
   *
   * Subscriptions can be filtered for a specific customer by using either the
   * customer_id or external_customer_id query parameters. To filter subscriptions
   * for multiple customers, use the customer_id[] or external_customer_id[] query
   * parameters.
   */
  list(
    query?: SubscriptionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<SubscriptionsPage, Subscription>;
  list(options?: Core.RequestOptions): Core.PagePromise<SubscriptionsPage, Subscription>;
  list(
    query: SubscriptionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<SubscriptionsPage, Subscription> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/subscriptions', SubscriptionsPage, { query, ...options });
  }

  /**
   * This endpoint can be used to cancel an existing subscription. It returns the
   * serialized subscription object with an `end_date` parameter that signifies when
   * the subscription will transition to an ended state.
   *
   * The body parameter `cancel_option` determines the cancellation behavior. Orb
   * supports three cancellation options:
   *
   * - `end_of_subscription_term`: stops the subscription from auto-renewing.
   *   Subscriptions that have been cancelled with this option can still incur
   *   charges for the remainder of their term:
   *
   *   - Issuing this cancellation request for a monthly subscription will keep the
   *     subscription active until the start of the subsequent month, and potentially
   *     issue an invoice for any usage charges incurred in the intervening period.
   *   - Issuing this cancellation request for a quarterly subscription will keep the
   *     subscription active until the end of the quarter and potentially issue an
   *     invoice for any usage charges incurred in the intervening period.
   *   - Issuing this cancellation request for a yearly subscription will keep the
   *     subscription active for the full year. For example, a yearly subscription
   *     starting on 2021-11-01 and cancelled on 2021-12-08 will remain active until
   *     2022-11-01 and potentially issue charges in the intervening months for any
   *     recurring monthly usage charges in its plan.
   *   - **Note**: If a subscription's plan contains prices with difference cadences,
   *     the end of term date will be determined by the largest cadence value. For
   *     example, cancelling end of term for a subscription with a quarterly fixed
   *     fee with a monthly usage fee will result in the subscription ending at the
   *     end of the quarter.
   *
   * - `immediate`: ends the subscription immediately, setting the `end_date` to the
   *   current time:
   *
   *   - Subscriptions that have been cancelled with this option will be invoiced
   *     immediately. This invoice will include any usage fees incurred in the
   *     billing period up to the cancellation, along with any prorated recurring
   *     fees for the billing period, if applicable.
   *   - **Note**: If the subscription has a recurring fee that was paid in-advance,
   *     the prorated amount for the remaining time period will be added to the
   *     [customer's balance](list-balance-transactions) upon immediate cancellation.
   *     However, if the customer is ineligible to use the customer balance, the
   *     subscription cannot be cancelled immediately.
   *
   * - `requested_date`: ends the subscription on a specified date, which requires a
   *   `cancellation_date` to be passed in. If no timezone is provided, the
   *   customer's timezone is used. For example, a subscription starting on January
   *   1st with a monthly price can be set to be cancelled on the first of any month
   *   after January 1st (e.g. March 1st, April 1st, May 1st). A subscription with
   *   multiple prices with different cadences defines the "term" to be the highest
   *   cadence of the prices.
   *
   * Upcoming subscriptions are only eligible for immediate cancellation, which will
   * set the `end_date` equal to the `start_date` upon cancellation.
   *
   * ## Backdated cancellations
   *
   * Orb allows you to cancel a subscription in the past as long as there are no paid
   * invoices between the `requested_date` and the current time. If the cancellation
   * is after the latest issued invoice, Orb will generate a balance refund for the
   * current period. If the cancellation is before the most recently issued invoice,
   * Orb will void the intervening invoice and generate a new one based on the new
   * dates for the subscription. See the section on
   * [cancellation behaviors](/product-catalog/creating-subscriptions#cancellation-behaviors).
   */
  cancel(
    subscriptionId: string,
    body: SubscriptionCancelParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionCancelResponse> {
    return this._client.post(`/subscriptions/${subscriptionId}/cancel`, { body, ...options });
  }

  /**
   * This endpoint is used to fetch a [Subscription](/core-concepts##subscription)
   * given an identifier.
   */
  fetch(subscriptionId: string, options?: Core.RequestOptions): Core.APIPromise<Subscription> {
    return this._client.get(`/subscriptions/${subscriptionId}`, options);
  }

  /**
   * This endpoint is used to fetch a day-by-day snapshot of a subscription's costs
   * in Orb, calculated by applying pricing information to the underlying usage (see
   * the [subscription usage endpoint](fetch-subscription-usage) to fetch usage per
   * metric, in usage units rather than a currency).
   *
   * The semantics of this endpoint exactly mirror those of
   * [fetching a customer's costs](fetch-customer-costs). Use this endpoint to limit
   * your analysis of costs to a specific subscription for the customer (e.g. to
   * de-aggregate costs when a customer's subscription has started and stopped on the
   * same day).
   */
  fetchCosts(
    subscriptionId: string,
    query?: SubscriptionFetchCostsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionFetchCostsResponse>;
  fetchCosts(
    subscriptionId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionFetchCostsResponse>;
  fetchCosts(
    subscriptionId: string,
    query: SubscriptionFetchCostsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionFetchCostsResponse> {
    if (isRequestOptions(query)) {
      return this.fetchCosts(subscriptionId, {}, query);
    }
    return this._client.get(`/subscriptions/${subscriptionId}/costs`, { query, ...options });
  }

  /**
   * This endpoint returns a [paginated](/api-reference/pagination) list of all plans
   * associated with a subscription along with their start and end dates. This list
   * contains the subscription's initial plan along with past and future plan
   * changes.
   */
  fetchSchedule(
    subscriptionId: string,
    query?: SubscriptionFetchScheduleParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<SubscriptionFetchScheduleResponsesPage, SubscriptionFetchScheduleResponse>;
  fetchSchedule(
    subscriptionId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<SubscriptionFetchScheduleResponsesPage, SubscriptionFetchScheduleResponse>;
  fetchSchedule(
    subscriptionId: string,
    query: SubscriptionFetchScheduleParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<SubscriptionFetchScheduleResponsesPage, SubscriptionFetchScheduleResponse> {
    if (isRequestOptions(query)) {
      return this.fetchSchedule(subscriptionId, {}, query);
    }
    return this._client.getAPIList(
      `/subscriptions/${subscriptionId}/schedule`,
      SubscriptionFetchScheduleResponsesPage,
      { query, ...options },
    );
  }

  /**
   * This endpoint is used to fetch a subscription's usage in Orb. Especially when
   * combined with optional query parameters, this endpoint is a powerful way to
   * build visualizations on top of Orb's event data and metrics.
   *
   * With no query parameters specified, this endpoint returns usage for the
   * subscription's _current billing period_ across each billable metric that
   * participates in the subscription. Usage quantities returned are the result of
   * evaluating the metric definition for the entirety of the customer's billing
   * period.
   *
   * ### Default response shape
   *
   * Orb returns a `data` array with an object corresponding to each billable metric.
   * Nested within this object is a `usage` array which has a `quantity` value and a
   * corresponding `timeframe_start` and `timeframe_end`. The `quantity` value
   * represents the calculated usage value for the billable metric over the specified
   * timeframe (inclusive of the `timeframe_start` timestamp and exclusive of the
   * `timeframe_end` timestamp).
   *
   * Orb will include _every_ window in the response starting from the beginning of
   * the billing period, even when there were no events (and therefore no usage) in
   * the window. This increases the size of the response but prevents the caller from
   * filling in gaps and handling cumbersome time-based logic.
   *
   * The query parameters in this endpoint serve to override this behavior and
   * provide some key functionality, as listed below. Note that this functionality
   * can also be used _in conjunction_ with each other, e.g. to display grouped usage
   * on a custom timeframe.
   *
   * ## Custom timeframe
   *
   * In order to view usage for a custom timeframe rather than the current billing
   * period, specify a `timeframe_start` and `timeframe_end`. This will calculate
   * quantities for usage incurred between timeframe_start (inclusive) and
   * timeframe_end (exclusive), i.e. `[timeframe_start, timeframe_end)`.
   *
   * Note:
   *
   * - These timestamps must be specified in ISO 8601 format and UTC timezone, e.g.
   *   `2022-02-01T05:00:00Z`.
   * - Both parameters must be specified if either is specified.
   *
   * ## Grouping by custom attributes
   *
   * In order to view a single metric grouped by a specific _attribute_ that each
   * event is tagged with (e.g. `cluster`), you must additionally specify a
   * `billable_metric_id` and a `group_by` key. The `group_by` key denotes the event
   * property on which to group.
   *
   * When returning grouped usage, only usage for `billable_metric_id` is returned,
   * and a separate object in the `data` array is returned for each value of the
   * `group_by` key present in your events. The `quantity` value is the result of
   * evaluating the billable metric for events filtered to a single value of the
   * `group_by` key.
   *
   * Orb expects that events that match the billable metric will contain values in
   * the `properties` dictionary that correspond to the `group_by` key specified. By
   * default, Orb will not return a `null` group (i.e. events that match the metric
   * but do not have the key set). Currently, it is only possible to view usage
   * grouped by a single attribute at a time.
   *
   * When viewing grouped usage, Orb uses pagination to limit the response size to
   * 1000 groups by default. If there are more groups for a given subscription,
   * pagination metadata in the response can be used to fetch all of the data.
   *
   * The following example shows usage for an "API Requests" billable metric grouped
   * by `region`. Note the extra `metric_group` dictionary in the response, which
   * provides metadata about the group:
   *
   * ```json
   * {
   *     "data": [
   *         {
   *             "usage": [
   *                 {
   *                     "quantity": 0.19291,
   *                     "timeframe_start": "2021-10-01T07:00:00Z",
   *                     "timeframe_end": "2021-10-02T07:00:00Z",
   *                 },
   *                 ...
   *             ],
   *             "metric_group": {
   *                 "property_key": "region",
   *                 "property_value": "asia/pacific"
   *             },
   *             "billable_metric": {
   *                 "id": "Fe9pbpMk86xpwdGB",
   *                 "name": "API Requests"
   *             },
   *             "view_mode": "periodic"
   *         },
   *         ...
   *     ]
   * }
   * ```
   *
   * ## Windowed usage
   *
   * The `granularity` parameter can be used to _window_ the usage `quantity` value
   * into periods. When not specified, usage is returned for the entirety of the time
   * range.
   *
   * When `granularity = day` is specified with a timeframe longer than a day, Orb
   * will return a `quantity` value for each full day between `timeframe_start` and
   * `timeframe_end`. Note that the days are demarcated by the _customer's local
   * midnight_.
   *
   * For example, with `timeframe_start = 2022-02-01T05:00:00Z`,
   * `timeframe_end = 2022-02-04T01:00:00Z` and `granularity=day`, the following
   * windows will be returned for a customer in the `America/Los_Angeles` timezone
   * since local midnight is `08:00` UTC:
   *
   * - `[2022-02-01T05:00:00Z, 2022-02-01T08:00:00Z)`
   * - `[2022-02-01T08:00:00, 2022-02-02T08:00:00Z)`
   * - `[2022-02-02T08:00:00, 2022-02-03T08:00:00Z)`
   * - `[2022-02-03T08:00:00, 2022-02-04T01:00:00Z)`
   *
   * ```json
   * {
   *     "data": [
   *         {
   *             "billable_metric": {
   *                 "id": "Q8w89wjTtBdejXKsm",
   *                 "name": "API Requests"
   *             },
   *             "usage": [
   *                 {
   *                     "quantity": 0,
   *                     "timeframe_end": "2022-02-01T08:00:00+00:00",
   *                     "timeframe_start": "2022-02-01T05:00:00+00:00"
   *                 },
   *                 {
   *
   *                     "quantity": 0,
   *                     "timeframe_end": "2022-02-02T08:00:00+00:00",
   *                     "timeframe_start": "2022-02-01T08:00:00+00:00"
   *                 },
   *                 {
   *                     "quantity": 0,
   *                     "timeframe_end": "2022-02-03T08:00:00+00:00",
   *                     "timeframe_start": "2022-02-02T08:00:00+00:00"
   *                 },
   *                 {
   *                     "quantity": 0,
   *                     "timeframe_end": "2022-02-04T01:00:00+00:00",
   *                     "timeframe_start": "2022-02-03T08:00:00+00:00"
   *                 }
   *             ],
   *             "view_mode": "periodic"
   *         },
   *         ...
   *     ]
   * }
   * ```
   *
   * ## Decomposable vs. non-decomposable metrics
   *
   * Billable metrics fall into one of two categories: decomposable and
   * non-decomposable. A decomposable billable metric, such as a sum or a count, can
   * be displayed and aggregated across arbitrary timescales. On the other hand, a
   * non-decomposable metric is not meaningful when only a slice of the billing
   * window is considered.
   *
   * As an example, if we have a billable metric that's defined to count unique
   * users, displaying a graph of unique users for each day is not representative of
   * the billable metric value over the month (days could have an overlapping set of
   * 'unique' users). Instead, what's useful for any given day is the number of
   * unique users in the billing period so far, which are the _cumulative_ unique
   * users.
   *
   * Accordingly, this endpoint returns treats these two types of metrics differently
   * when `group_by` is specified:
   *
   * - Decomposable metrics can be grouped by any event property.
   * - Non-decomposable metrics can only be grouped by the corresponding price's
   *   invoice grouping key. If no invoice grouping key is present, the metric does
   *   not support `group_by`.
   *
   * ## Matrix prices
   *
   * When a billable metric is attached to a price that uses matrix pricing, it's
   * important to view usage grouped by those matrix dimensions. In this case, use
   * the query parameters `first_dimension_key`, `first_dimension_value` and
   * `second_dimension_key`, `second_dimension_value` while filtering to a specific
   * `billable_metric_id`.
   *
   * For example, if your compute metric has a separate unit price (i.e. a matrix
   * pricing model) per `region` and `provider`, your request might provide the
   * following parameters:
   *
   * - `first_dimension_key`: `region`
   * - `first_dimension_value`: `us-east-1`
   * - `second_dimension_key`: `provider`
   * - `second_dimension_value`: `aws`
   */
  fetchUsage(
    subscriptionId: string,
    query?: SubscriptionFetchUsageParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionUsage>;
  fetchUsage(subscriptionId: string, options?: Core.RequestOptions): Core.APIPromise<SubscriptionUsage>;
  fetchUsage(
    subscriptionId: string,
    query: SubscriptionFetchUsageParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionUsage> {
    if (isRequestOptions(query)) {
      return this.fetchUsage(subscriptionId, {}, query);
    }
    return this._client.get(`/subscriptions/${subscriptionId}/usage`, { query, ...options });
  }

  /**
   * This endpoint is used to add and edit subscription
   * [price intervals](/api-reference/price-interval/add-or-edit-price-intervals). By
   * making modifications to a subscription’s price intervals, you can
   * [flexibly and atomically control the billing behavior of a subscription](/product-catalog/modifying-subscriptions).
   *
   * ## Adding price intervals
   *
   * Prices can be added as price intervals to a subscription by specifying them in
   * the `add` array. A `price_id` or `external_price_id` from an add-on price or
   * previously removed plan price can be specified to reuse an existing price
   * definition (however, please note that prices from other plans cannot be added to
   * the subscription). Additionally, a new price can be specified using the `price`
   * field — this price will be created automatically.
   *
   * A `start_date` must be specified for the price interval. This is the date when
   * the price will start billing on the subscription, so this will notably result in
   * an immediate charge at this time for any billed in advance fixed fees. The
   * `end_date` will default to null, resulting in a price interval that will bill on
   * a continually recurring basis. Both of these dates can be set in the past or the
   * future and Orb will generate or modify invoices to ensure the subscription’s
   * invoicing behavior is correct.
   *
   * Additionally, a discount, minimum, or maximum can be specified on the price
   * interval. This will only apply to this price interval, not any other price
   * intervals on the subscription.
   *
   * ## Adjustment intervals
   *
   * An adjustment interval represents the time period that a particular adjustment
   * (a discount, minimum, or maximum) applies to the prices on a subscription.
   * Adjustment intervals can be added to a subscription by specifying them in the
   * `add_adjustments` array, or modified via the `edit_adjustments` array. When
   * creating an adjustment interval, you'll need to provide the definition of the
   * new adjustment (the type of adjustment, and which prices it applies to), as well
   * as the start and end dates for the adjustment interval. The start and end dates
   * of an existing adjustment interval can be edited via the `edit_adjustments`
   * field (just like price intervals). (To "change" the amount of a discount,
   * minimum, or maximum, then, you'll need to end the existing interval, and create
   * a new adjustment interval with the new amount and a start date that matches the
   * end date of the previous interval.)
   *
   * ## Editing price intervals
   *
   * Price intervals can be adjusted by specifying edits to make in the `edit` array.
   * A `price_interval_id` to edit must be specified — this can be retrieved from the
   * `price_intervals` field on the subscription.
   *
   * A new `start_date` or `end_date` can be specified to change the range of the
   * price interval, which will modify past or future invoices to ensure correctness.
   * If either of these dates are unspecified, they will default to the existing date
   * on the price interval. To remove a price interval entirely from a subscription,
   * set the `end_date` to be equivalent to the `start_date`.
   *
   * ## Fixed fee quantity transitions
   *
   * The fixed fee quantity transitions for a fixed fee price interval can also be
   * specified when adding or editing by passing an array for
   * `fixed_fee_quantity_transitions`. A fixed fee quantity transition must have a
   * `quantity` and an `effective_date`, which is the date after which the new
   * quantity will be used for billing. If a fixed fee quantity transition is
   * scheduled at a billing period boundary, the full quantity will be billed on an
   * invoice with the other prices on the subscription. If the fixed fee quantity
   * transition is scheduled mid-billing period, the difference between the existing
   * quantity and quantity specified in the transition will be prorated for the rest
   * of the billing period and billed immediately, which will generate a new invoice.
   *
   * Notably, the list of fixed fee quantity transitions passed will overwrite the
   * existing fixed fee quantity transitions on the price interval, so the entire
   * list of transitions must be specified to add additional transitions. The
   * existing list of transitions can be retrieved using the
   * `fixed_fee_quantity_transitions` property on a subscription’s serialized price
   * intervals.
   */
  priceIntervals(
    subscriptionId: string,
    body: SubscriptionPriceIntervalsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionPriceIntervalsResponse> {
    return this._client.post(`/subscriptions/${subscriptionId}/price_intervals`, { body, ...options });
  }

  /**
   * This endpoint can be used to change an existing subscription's plan. It returns
   * the serialized updated subscription object.
   *
   * The body parameter `change_option` determines when the plan change occurrs. Orb
   * supports three options:
   *
   * - `end_of_subscription_term`: changes the plan at the end of the existing plan's
   *   term.
   *   - Issuing this plan change request for a monthly subscription will keep the
   *     existing plan active until the start of the subsequent month. Issuing this
   *     plan change request for a yearly subscription will keep the existing plan
   *     active for the full year. Charges incurred in the remaining period will be
   *     invoiced as normal.
   *   - Example: The plan is billed monthly on the 1st of the month, the request is
   *     made on January 15th, so the plan will be changed on February 1st, and
   *     invoice will be issued on February 1st for the last month of the original
   *     plan.
   * - `immediate`: changes the plan immediately.
   *   - Subscriptions that have their plan changed with this option will move to the
   *     new plan immediately, and be invoiced immediately.
   *   - This invoice will include any usage fees incurred in the billing period up
   *     to the change, along with any prorated recurring fees for the billing
   *     period, if applicable.
   *   - Example: The plan is billed monthly on the 1st of the month, the request is
   *     made on January 15th, so the plan will be changed on January 15th, and an
   *     invoice will be issued for the partial month, from January 1 to January 15,
   *     on the original plan.
   * - `requested_date`: changes the plan on the requested date (`change_date`).
   *   - If no timezone is provided, the customer's timezone is used. The
   *     `change_date` body parameter is required if this option is chosen.
   *   - Example: The plan is billed monthly on the 1st of the month, the request is
   *     made on January 15th, with a requested `change_date` of February 15th, so
   *     the plan will be changed on February 15th, and invoices will be issued on
   *     February 1st and February 15th.
   *
   * Note that one of `plan_id` or `external_plan_id` is required in the request body
   * for this operation.
   *
   * ## Customize your customer's subscriptions
   *
   * Prices and adjustments in a plan can be added, removed, or replaced on the
   * subscription when you schedule the plan change. This is useful when a customer
   * has prices that differ from the default prices for a specific plan.
   *
   * <Note>
   * This feature is only available for accounts that have migrated to Subscription Overrides Version 2. You can find your
   * Subscription Overrides Version at the bottom of your [Plans page](https://app.withorb.com/plans)
   * </Note>
   *
   * ### Adding Prices
   *
   * To add prices, provide a list of objects with the key `add_prices`. An object in
   * the list must specify an existing add-on price with a `price_id` or
   * `external_price_id` field, or create a new add-on price by including an object
   * with the key `price`, identical to what would be used in the request body for
   * the [create price endpoint](/api-reference/price/create-price). See the
   * [Price resource](/product-catalog/price-configuration) for the specification of
   * different price model configurations possible in this object.
   *
   * If the plan has phases, each object in the list must include a number with
   * `plan_phase_order` key to indicate which phase the price should be added to.
   *
   * An object in the list can specify an optional `start_date` and optional
   * `end_date`. If `start_date` is unspecified, the start of the phase / plan change
   * time will be used. If `end_date` is unspecified, it will finish at the end of
   * the phase / have no end time.
   *
   * An object in the list can specify an optional `minimum_amount`,
   * `maximum_amount`, or `discounts`. This will create adjustments which apply only
   * to this price.
   *
   * Additionally, an object in the list can specify an optional `reference_id`. This
   * ID can be used to reference this price when
   * [adding an adjustment](#adding-adjustments) in the same API call. However the ID
   * is _transient_ and cannot be used to refer to the price in future API calls.
   *
   * ### Removing Prices
   *
   * To remove prices, provide a list of objects with the key `remove_prices`. An
   * object in the list must specify a plan price with either a `price_id` or
   * `external_price_id` field.
   *
   * ### Replacing Prices
   *
   * To replace prices, provide a list of objects with the key `replace_prices`. An
   * object in the list must specify a plan price to replace with the
   * `replaces_price_id` key, and it must specify a price to replace it with by
   * either referencing an existing add-on price with a `price_id` or
   * `external_price_id` field, or by creating a new add-on price by including an
   * object with the key `price`, identical to what would be used in the request body
   * for the [create price endpoint](/api-reference/price/create-price). See the
   * [Price resource](/product-catalog/price-configuration) for the specification of
   * different price model configurations possible in this object.
   *
   * For fixed fees, an object in the list can supply a `fixed_price_quantity`
   * instead of a `price`, `price_id`, or `external_price_id` field. This will update
   * only the quantity for the price, similar to the
   * [Update price quantity](/api-reference/subscription/update-price-quantity)
   * endpoint.
   *
   * The replacement price will have the same phase, if applicable, and the same
   * start and end dates as the price it replaces.
   *
   * An object in the list can specify an optional `minimum_amount`,
   * `maximum_amount`, or `discounts`. This will create adjustments which apply only
   * to this price.
   *
   * Additionally, an object in the list can specify an optional `reference_id`. This
   * ID can be used to reference the replacement price when
   * [adding an adjustment](#adding-adjustments) in the same API call. However the ID
   * is _transient_ and cannot be used to refer to the price in future API calls.
   *
   * ### Adding adjustments
   *
   * To add adjustments, provide a list of objects with the key `add_adjustments`. An
   * object in the list must include an object with the key `adjustment`, identical
   * to the adjustment object in the
   * [add/edit price intervals endpoint](/api-reference/price-interval/add-or-edit-price-intervals).
   *
   * If the plan has phases, each object in the list must include a number with
   * `plan_phase_order` key to indicate which phase the adjustment should be added
   * to.
   *
   * An object in the list can specify an optional `start_date` and optional
   * `end_date`. If `start_date` is unspecified, the start of the phase / plan change
   * time will be used. If `end_date` is unspecified, it will finish at the end of
   * the phase / have no end time.
   *
   * ### Removing adjustments
   *
   * To remove adjustments, provide a list of objects with the key
   * `remove_adjustments`. An object in the list must include a key, `adjustment_id`,
   * with the ID of the adjustment to be removed.
   *
   * ### Replacing adjustments
   *
   * To replace adjustments, provide a list of objects with the key
   * `replace_adjustments`. An object in the list must specify a plan adjustment to
   * replace with the `replaces_adjustment_id` key, and it must specify an adjustment
   * to replace it with by including an object with the key `adjustment`, identical
   * to the adjustment object in the
   * [add/edit price intervals endpoint](/api-reference/price-interval/add-or-edit-price-intervals).
   *
   * The replacement adjustment will have the same phase, if applicable, and the same
   * start and end dates as the adjustment it replaces.
   *
   * ## Price overrides (DEPRECATED)
   *
   * <Note>
   * Price overrides are being phased out in favor adding/removing/replacing prices. (See
   * [Customize your customer's subscriptions](/api-reference/subscription/schedule-plan-change))
   * </Note>
   *
   * Price overrides are used to update some or all prices in a plan for the specific
   * subscription being created. This is useful when a new customer has negotiated a
   * rate that is unique to the customer.
   *
   * To override prices, provide a list of objects with the key `price_overrides`.
   * The price object in the list of overrides is expected to contain the existing
   * price id, the `model_type` and configuration. (See the
   * [Price resource](/product-catalog/price-configuration) for the specification of
   * different price model configurations.) The numerical values can be updated, but
   * the billable metric, cadence, type, and name of a price can not be overridden.
   *
   * ### Maximums, and minimums
   *
   * Price overrides are used to update some or all prices in the target plan.
   * Minimums and maximums, much like price overrides, can be useful when a new
   * customer has negotiated a new or different minimum or maximum spend cap than the
   * default for the plan. The request format for maximums and minimums is the same
   * as those in [subscription creation](create-subscription).
   *
   * ## Scheduling multiple plan changes
   *
   * When scheduling multiple plan changes with the same date, the latest plan change
   * on that day takes effect.
   *
   * ## Prorations for in-advance fees
   *
   * By default, Orb calculates the prorated difference in any fixed fees when making
   * a plan change, adjusting the customer balance as needed. For details on this
   * behavior, see
   * [Modifying subscriptions](/product-catalog/modifying-subscriptions#prorations-for-in-advance-fees).
   */
  schedulePlanChange(
    subscriptionId: string,
    body: SubscriptionSchedulePlanChangeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionSchedulePlanChangeResponse> {
    return this._client.post(`/subscriptions/${subscriptionId}/schedule_plan_change`, { body, ...options });
  }

  /**
   * Manually trigger a phase, effective the given date (or the current time, if not
   * specified).
   */
  triggerPhase(
    subscriptionId: string,
    body: SubscriptionTriggerPhaseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionTriggerPhaseResponse> {
    return this._client.post(`/subscriptions/${subscriptionId}/trigger_phase`, { body, ...options });
  }

  /**
   * This endpoint can be used to unschedule any pending cancellations for a
   * subscription.
   *
   * To be eligible, the subscription must currently be active and have a future
   * cancellation. This operation will turn on auto-renew, ensuring that the
   * subscription does not end at the currently scheduled cancellation time.
   */
  unscheduleCancellation(
    subscriptionId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionUnscheduleCancellationResponse> {
    return this._client.post(`/subscriptions/${subscriptionId}/unschedule_cancellation`, options);
  }

  /**
   * This endpoint can be used to clear scheduled updates to the quantity for a fixed
   * fee.
   *
   * If there are no updates scheduled, a request validation error will be returned
   * with a 400 status code.
   */
  unscheduleFixedFeeQuantityUpdates(
    subscriptionId: string,
    body: SubscriptionUnscheduleFixedFeeQuantityUpdatesParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse> {
    return this._client.post(`/subscriptions/${subscriptionId}/unschedule_fixed_fee_quantity_updates`, {
      body,
      ...options,
    });
  }

  /**
   * This endpoint can be used to unschedule any pending plan changes on an existing
   * subscription.
   */
  unschedulePendingPlanChanges(
    subscriptionId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionUnschedulePendingPlanChangesResponse> {
    return this._client.post(`/subscriptions/${subscriptionId}/unschedule_pending_plan_changes`, options);
  }

  /**
   * This endpoint can be used to update the quantity for a fixed fee.
   *
   * To be eligible, the subscription must currently be active and the price
   * specified must be a fixed fee (not usage-based). This operation will immediately
   * update the quantity for the fee, or if a `effective_date` is passed in, will
   * update the quantity on the requested date at midnight in the customer's
   * timezone.
   *
   * In order to change the fixed fee quantity as of the next draft invoice for this
   * subscription, pass `change_option=upcoming_invoice` without an `effective_date`
   * specified.
   *
   * If the fee is an in-advance fixed fee, it will also issue an immediate invoice
   * for the difference for the remainder of the billing period.
   */
  updateFixedFeeQuantity(
    subscriptionId: string,
    body: SubscriptionUpdateFixedFeeQuantityParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionUpdateFixedFeeQuantityResponse> {
    return this._client.post(`/subscriptions/${subscriptionId}/update_fixed_fee_quantity`, {
      body,
      ...options,
    });
  }

  /**
   * This endpoint is used to update the trial end date for a subscription. The new
   * trial end date must be within the time range of the current plan (i.e. the new
   * trial end date must be on or after the subscription's start date on the current
   * plan, and on or before the subscription end date).
   *
   * In order to retroactively remove a trial completely, the end date can be set to
   * the transition date of the subscription to this plan (or, if this is the first
   * plan for this subscription, the subscription's start date). In order to end a
   * trial immediately, the keyword `immediate` can be provided as the trial end
   * date.
   *
   * By default, Orb will shift only the trial end date (and price intervals that
   * start or end on the previous trial end date), and leave all other future price
   * intervals untouched. If the `shift` parameter is set to `true`, Orb will shift
   * all subsequent price and adjustment intervals by the same amount as the trial
   * end date shift (so, e.g., if a plan change is scheduled or an add-on price was
   * added, that change will be pushed back by the same amount of time the trial is
   * extended).
   */
  updateTrial(
    subscriptionId: string,
    body: SubscriptionUpdateTrialParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionUpdateTrialResponse> {
    return this._client.post(`/subscriptions/${subscriptionId}/update_trial`, { body, ...options });
  }
}

export class SubscriptionsPage extends Page<Subscription> {}

export class SubscriptionFetchScheduleResponsesPage extends Page<SubscriptionFetchScheduleResponse> {}

/**
 * A [subscription](/core-concepts#subscription) represents the purchase of a plan
 * by a customer.
 *
 * By default, subscriptions begin on the day that they're created and renew
 * automatically for each billing cycle at the cadence that's configured in the
 * plan definition.
 *
 * Subscriptions also default to **beginning of month alignment**, which means the
 * first invoice issued for the subscription will have pro-rated charges between
 * the `start_date` and the first of the following month. Subsequent billing
 * periods will always start and end on a month boundary (e.g. subsequent month
 * starts for monthly billing).
 *
 * Depending on the plan configuration, any _flat_ recurring fees will be billed
 * either at the beginning (in-advance) or end (in-arrears) of each billing cycle.
 * Plans default to **in-advance billing**. Usage-based fees are billed in arrears
 * as usage is accumulated. In the normal course of events, you can expect an
 * invoice to contain usage-based charges for the previous period, and a recurring
 * fee for the following period.
 */
export interface Subscription {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<Subscription.AdjustmentInterval>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: Subscription.BillingCycleAnchorConfiguration;

  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  billing_cycle_day: number;

  created_at: string;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is not part of the billing period. Set to null for
   * subscriptions that are not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if the subscription is not currently active.
   */
  current_billing_period_start_date: string | null;

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
  customer: CustomersAPI.Customer;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    | Subscription.AmountDiscountInterval
    | Subscription.PercentageDiscountInterval
    | Subscription.UsageDiscountInterval
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<Subscription.FixedFeeQuantitySchedule>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<Subscription.MaximumInterval>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<Subscription.MinimumInterval>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlansAPI.Plan;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<Subscription.PriceInterval>;

  redeemed_coupon: Subscription.RedeemedCoupon | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: Subscription.TrialInfo;
}

export namespace Subscription {
  export interface AdjustmentInterval {
    id: string;

    adjustment:
      | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
      | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseMinimumAdjustment
      | AdjustmentInterval.PlanPhaseMaximumAdjustment;

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

  export namespace AdjustmentInterval {
    export interface PlanPhaseUsageDiscountAdjustment {
      id: string;

      adjustment_type: 'usage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseAmountDiscountAdjustment {
      id: string;

      adjustment_type: 'amount_discount';

      /**
       * The amount by which to discount the prices this adjustment applies to in a given
       * billing period.
       */
      amount_discount: string;

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhasePercentageDiscountAdjustment {
      id: string;

      adjustment_type: 'percentage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMinimumAdjustment {
      id: string;

      adjustment_type: 'minimum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMaximumAdjustment {
      id: string;

      adjustment_type: 'maximum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

  export interface AmountDiscountInterval {
    /**
     * Only available if discount_type is `amount`.
     */
    amount_discount: string;

    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface PercentageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * Only available if discount_type is `percentage`.This is a number between 0
     * and 1.
     */
    percentage_discount: number;

    /**
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface UsageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;
  }

  export interface FixedFeeQuantitySchedule {
    end_date: string | null;

    price_id: string;

    quantity: number;

    start_date: string;
  }

  export interface MaximumInterval {
    /**
     * The price ids that this maximum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this maximum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the maximum interval.
     */
    end_date: string | null;

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

  export interface MinimumInterval {
    /**
     * The price ids that this minimum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this minimum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the minimum interval.
     */
    end_date: string | null;

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
    fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

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
    price: PricesAPI.Price;

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

  export namespace PriceInterval {
    export interface FixedFeeQuantityTransition {
      effective_date: string;

      price_id: string;

      quantity: number;
    }
  }

  export interface RedeemedCoupon {
    coupon_id: string;

    end_date: string | null;

    start_date: string;
  }

  export interface TrialInfo {
    end_date: string | null;
  }
}

export type SubscriptionUsage =
  | SubscriptionUsage.UngroupedSubscriptionUsage
  | SubscriptionUsage.GroupedSubscriptionUsage;

export namespace SubscriptionUsage {
  export interface UngroupedSubscriptionUsage {
    data: Array<UngroupedSubscriptionUsage.Data>;
  }

  export namespace UngroupedSubscriptionUsage {
    export interface Data {
      billable_metric: Data.BillableMetric;

      usage: Array<Data.Usage>;

      view_mode: 'periodic' | 'cumulative';
    }

    export namespace Data {
      export interface BillableMetric {
        id: string;

        name: string;
      }

      export interface Usage {
        quantity: number;

        timeframe_end: string;

        timeframe_start: string;
      }
    }
  }

  export interface GroupedSubscriptionUsage {
    data: Array<GroupedSubscriptionUsage.Data>;

    pagination_metadata?: Shared.PaginationMetadata | null;
  }

  export namespace GroupedSubscriptionUsage {
    export interface Data {
      billable_metric: Data.BillableMetric;

      metric_group: Data.MetricGroup;

      usage: Array<Data.Usage>;

      view_mode: 'periodic' | 'cumulative';
    }

    export namespace Data {
      export interface BillableMetric {
        id: string;

        name: string;
      }

      export interface MetricGroup {
        property_key: string;

        property_value: string;
      }

      export interface Usage {
        quantity: number;

        timeframe_end: string;

        timeframe_start: string;
      }
    }
  }
}

export interface Subscriptions {
  data: Array<Subscription>;

  pagination_metadata: Shared.PaginationMetadata;
}

export interface SubscriptionCreateResponse {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<SubscriptionCreateResponse.AdjustmentInterval>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: SubscriptionCreateResponse.BillingCycleAnchorConfiguration;

  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  billing_cycle_day: number;

  created_at: string;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is not part of the billing period. Set to null for
   * subscriptions that are not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if the subscription is not currently active.
   */
  current_billing_period_start_date: string | null;

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
  customer: CustomersAPI.Customer;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    | SubscriptionCreateResponse.AmountDiscountInterval
    | SubscriptionCreateResponse.PercentageDiscountInterval
    | SubscriptionCreateResponse.UsageDiscountInterval
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<SubscriptionCreateResponse.FixedFeeQuantitySchedule>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<SubscriptionCreateResponse.MaximumInterval>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<SubscriptionCreateResponse.MinimumInterval>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlansAPI.Plan;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<SubscriptionCreateResponse.PriceInterval>;

  redeemed_coupon: SubscriptionCreateResponse.RedeemedCoupon | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: SubscriptionCreateResponse.TrialInfo;
}

export namespace SubscriptionCreateResponse {
  export interface AdjustmentInterval {
    id: string;

    adjustment:
      | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
      | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseMinimumAdjustment
      | AdjustmentInterval.PlanPhaseMaximumAdjustment;

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

  export namespace AdjustmentInterval {
    export interface PlanPhaseUsageDiscountAdjustment {
      id: string;

      adjustment_type: 'usage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseAmountDiscountAdjustment {
      id: string;

      adjustment_type: 'amount_discount';

      /**
       * The amount by which to discount the prices this adjustment applies to in a given
       * billing period.
       */
      amount_discount: string;

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhasePercentageDiscountAdjustment {
      id: string;

      adjustment_type: 'percentage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMinimumAdjustment {
      id: string;

      adjustment_type: 'minimum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMaximumAdjustment {
      id: string;

      adjustment_type: 'maximum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

  export interface AmountDiscountInterval {
    /**
     * Only available if discount_type is `amount`.
     */
    amount_discount: string;

    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface PercentageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * Only available if discount_type is `percentage`.This is a number between 0
     * and 1.
     */
    percentage_discount: number;

    /**
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface UsageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;
  }

  export interface FixedFeeQuantitySchedule {
    end_date: string | null;

    price_id: string;

    quantity: number;

    start_date: string;
  }

  export interface MaximumInterval {
    /**
     * The price ids that this maximum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this maximum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the maximum interval.
     */
    end_date: string | null;

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

  export interface MinimumInterval {
    /**
     * The price ids that this minimum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this minimum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the minimum interval.
     */
    end_date: string | null;

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
    fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

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
    price: PricesAPI.Price;

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

  export namespace PriceInterval {
    export interface FixedFeeQuantityTransition {
      effective_date: string;

      price_id: string;

      quantity: number;
    }
  }

  export interface RedeemedCoupon {
    coupon_id: string;

    end_date: string | null;

    start_date: string;
  }

  export interface TrialInfo {
    end_date: string | null;
  }
}

export interface SubscriptionCancelResponse {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<SubscriptionCancelResponse.AdjustmentInterval>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: SubscriptionCancelResponse.BillingCycleAnchorConfiguration;

  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  billing_cycle_day: number;

  created_at: string;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is not part of the billing period. Set to null for
   * subscriptions that are not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if the subscription is not currently active.
   */
  current_billing_period_start_date: string | null;

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
  customer: CustomersAPI.Customer;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    | SubscriptionCancelResponse.AmountDiscountInterval
    | SubscriptionCancelResponse.PercentageDiscountInterval
    | SubscriptionCancelResponse.UsageDiscountInterval
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<SubscriptionCancelResponse.FixedFeeQuantitySchedule>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<SubscriptionCancelResponse.MaximumInterval>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<SubscriptionCancelResponse.MinimumInterval>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlansAPI.Plan;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<SubscriptionCancelResponse.PriceInterval>;

  redeemed_coupon: SubscriptionCancelResponse.RedeemedCoupon | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: SubscriptionCancelResponse.TrialInfo;
}

export namespace SubscriptionCancelResponse {
  export interface AdjustmentInterval {
    id: string;

    adjustment:
      | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
      | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseMinimumAdjustment
      | AdjustmentInterval.PlanPhaseMaximumAdjustment;

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

  export namespace AdjustmentInterval {
    export interface PlanPhaseUsageDiscountAdjustment {
      id: string;

      adjustment_type: 'usage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseAmountDiscountAdjustment {
      id: string;

      adjustment_type: 'amount_discount';

      /**
       * The amount by which to discount the prices this adjustment applies to in a given
       * billing period.
       */
      amount_discount: string;

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhasePercentageDiscountAdjustment {
      id: string;

      adjustment_type: 'percentage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMinimumAdjustment {
      id: string;

      adjustment_type: 'minimum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMaximumAdjustment {
      id: string;

      adjustment_type: 'maximum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

  export interface AmountDiscountInterval {
    /**
     * Only available if discount_type is `amount`.
     */
    amount_discount: string;

    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface PercentageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * Only available if discount_type is `percentage`.This is a number between 0
     * and 1.
     */
    percentage_discount: number;

    /**
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface UsageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;
  }

  export interface FixedFeeQuantitySchedule {
    end_date: string | null;

    price_id: string;

    quantity: number;

    start_date: string;
  }

  export interface MaximumInterval {
    /**
     * The price ids that this maximum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this maximum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the maximum interval.
     */
    end_date: string | null;

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

  export interface MinimumInterval {
    /**
     * The price ids that this minimum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this minimum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the minimum interval.
     */
    end_date: string | null;

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
    fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

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
    price: PricesAPI.Price;

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

  export namespace PriceInterval {
    export interface FixedFeeQuantityTransition {
      effective_date: string;

      price_id: string;

      quantity: number;
    }
  }

  export interface RedeemedCoupon {
    coupon_id: string;

    end_date: string | null;

    start_date: string;
  }

  export interface TrialInfo {
    end_date: string | null;
  }
}

export interface SubscriptionFetchCostsResponse {
  data: Array<SubscriptionFetchCostsResponse.Data>;
}

export namespace SubscriptionFetchCostsResponse {
  export interface Data {
    per_price_costs: Array<Data.PerPriceCost>;

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

  export namespace Data {
    export interface PerPriceCost {
      /**
       * The price object
       */
      price: PricesAPI.Price;

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
  }
}

export interface SubscriptionFetchScheduleResponse {
  created_at: string;

  end_date: string | null;

  plan: SubscriptionFetchScheduleResponse.Plan;

  start_date: string;
}

export namespace SubscriptionFetchScheduleResponse {
  export interface Plan {
    id: string | null;

    /**
     * An optional user-defined ID for this plan resource, used throughout the system
     * as an alias for this Plan. Use this field to identify a plan by an existing
     * identifier in your system.
     */
    external_plan_id: string | null;

    name: string | null;
  }
}

export interface SubscriptionPriceIntervalsResponse {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<SubscriptionPriceIntervalsResponse.AdjustmentInterval>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: SubscriptionPriceIntervalsResponse.BillingCycleAnchorConfiguration;

  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  billing_cycle_day: number;

  created_at: string;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is not part of the billing period. Set to null for
   * subscriptions that are not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if the subscription is not currently active.
   */
  current_billing_period_start_date: string | null;

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
  customer: CustomersAPI.Customer;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    | SubscriptionPriceIntervalsResponse.AmountDiscountInterval
    | SubscriptionPriceIntervalsResponse.PercentageDiscountInterval
    | SubscriptionPriceIntervalsResponse.UsageDiscountInterval
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<SubscriptionPriceIntervalsResponse.FixedFeeQuantitySchedule>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<SubscriptionPriceIntervalsResponse.MaximumInterval>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<SubscriptionPriceIntervalsResponse.MinimumInterval>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlansAPI.Plan;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<SubscriptionPriceIntervalsResponse.PriceInterval>;

  redeemed_coupon: SubscriptionPriceIntervalsResponse.RedeemedCoupon | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: SubscriptionPriceIntervalsResponse.TrialInfo;
}

export namespace SubscriptionPriceIntervalsResponse {
  export interface AdjustmentInterval {
    id: string;

    adjustment:
      | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
      | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseMinimumAdjustment
      | AdjustmentInterval.PlanPhaseMaximumAdjustment;

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

  export namespace AdjustmentInterval {
    export interface PlanPhaseUsageDiscountAdjustment {
      id: string;

      adjustment_type: 'usage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseAmountDiscountAdjustment {
      id: string;

      adjustment_type: 'amount_discount';

      /**
       * The amount by which to discount the prices this adjustment applies to in a given
       * billing period.
       */
      amount_discount: string;

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhasePercentageDiscountAdjustment {
      id: string;

      adjustment_type: 'percentage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMinimumAdjustment {
      id: string;

      adjustment_type: 'minimum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMaximumAdjustment {
      id: string;

      adjustment_type: 'maximum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

  export interface AmountDiscountInterval {
    /**
     * Only available if discount_type is `amount`.
     */
    amount_discount: string;

    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface PercentageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * Only available if discount_type is `percentage`.This is a number between 0
     * and 1.
     */
    percentage_discount: number;

    /**
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface UsageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;
  }

  export interface FixedFeeQuantitySchedule {
    end_date: string | null;

    price_id: string;

    quantity: number;

    start_date: string;
  }

  export interface MaximumInterval {
    /**
     * The price ids that this maximum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this maximum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the maximum interval.
     */
    end_date: string | null;

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

  export interface MinimumInterval {
    /**
     * The price ids that this minimum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this minimum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the minimum interval.
     */
    end_date: string | null;

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
    fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

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
    price: PricesAPI.Price;

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

  export namespace PriceInterval {
    export interface FixedFeeQuantityTransition {
      effective_date: string;

      price_id: string;

      quantity: number;
    }
  }

  export interface RedeemedCoupon {
    coupon_id: string;

    end_date: string | null;

    start_date: string;
  }

  export interface TrialInfo {
    end_date: string | null;
  }
}

export interface SubscriptionSchedulePlanChangeResponse {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<SubscriptionSchedulePlanChangeResponse.AdjustmentInterval>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: SubscriptionSchedulePlanChangeResponse.BillingCycleAnchorConfiguration;

  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  billing_cycle_day: number;

  created_at: string;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is not part of the billing period. Set to null for
   * subscriptions that are not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if the subscription is not currently active.
   */
  current_billing_period_start_date: string | null;

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
  customer: CustomersAPI.Customer;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    | SubscriptionSchedulePlanChangeResponse.AmountDiscountInterval
    | SubscriptionSchedulePlanChangeResponse.PercentageDiscountInterval
    | SubscriptionSchedulePlanChangeResponse.UsageDiscountInterval
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<SubscriptionSchedulePlanChangeResponse.FixedFeeQuantitySchedule>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<SubscriptionSchedulePlanChangeResponse.MaximumInterval>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<SubscriptionSchedulePlanChangeResponse.MinimumInterval>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlansAPI.Plan;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<SubscriptionSchedulePlanChangeResponse.PriceInterval>;

  redeemed_coupon: SubscriptionSchedulePlanChangeResponse.RedeemedCoupon | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: SubscriptionSchedulePlanChangeResponse.TrialInfo;
}

export namespace SubscriptionSchedulePlanChangeResponse {
  export interface AdjustmentInterval {
    id: string;

    adjustment:
      | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
      | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseMinimumAdjustment
      | AdjustmentInterval.PlanPhaseMaximumAdjustment;

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

  export namespace AdjustmentInterval {
    export interface PlanPhaseUsageDiscountAdjustment {
      id: string;

      adjustment_type: 'usage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseAmountDiscountAdjustment {
      id: string;

      adjustment_type: 'amount_discount';

      /**
       * The amount by which to discount the prices this adjustment applies to in a given
       * billing period.
       */
      amount_discount: string;

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhasePercentageDiscountAdjustment {
      id: string;

      adjustment_type: 'percentage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMinimumAdjustment {
      id: string;

      adjustment_type: 'minimum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMaximumAdjustment {
      id: string;

      adjustment_type: 'maximum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

  export interface AmountDiscountInterval {
    /**
     * Only available if discount_type is `amount`.
     */
    amount_discount: string;

    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface PercentageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * Only available if discount_type is `percentage`.This is a number between 0
     * and 1.
     */
    percentage_discount: number;

    /**
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface UsageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;
  }

  export interface FixedFeeQuantitySchedule {
    end_date: string | null;

    price_id: string;

    quantity: number;

    start_date: string;
  }

  export interface MaximumInterval {
    /**
     * The price ids that this maximum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this maximum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the maximum interval.
     */
    end_date: string | null;

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

  export interface MinimumInterval {
    /**
     * The price ids that this minimum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this minimum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the minimum interval.
     */
    end_date: string | null;

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
    fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

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
    price: PricesAPI.Price;

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

  export namespace PriceInterval {
    export interface FixedFeeQuantityTransition {
      effective_date: string;

      price_id: string;

      quantity: number;
    }
  }

  export interface RedeemedCoupon {
    coupon_id: string;

    end_date: string | null;

    start_date: string;
  }

  export interface TrialInfo {
    end_date: string | null;
  }
}

export interface SubscriptionTriggerPhaseResponse {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<SubscriptionTriggerPhaseResponse.AdjustmentInterval>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: SubscriptionTriggerPhaseResponse.BillingCycleAnchorConfiguration;

  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  billing_cycle_day: number;

  created_at: string;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is not part of the billing period. Set to null for
   * subscriptions that are not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if the subscription is not currently active.
   */
  current_billing_period_start_date: string | null;

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
  customer: CustomersAPI.Customer;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    | SubscriptionTriggerPhaseResponse.AmountDiscountInterval
    | SubscriptionTriggerPhaseResponse.PercentageDiscountInterval
    | SubscriptionTriggerPhaseResponse.UsageDiscountInterval
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<SubscriptionTriggerPhaseResponse.FixedFeeQuantitySchedule>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<SubscriptionTriggerPhaseResponse.MaximumInterval>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<SubscriptionTriggerPhaseResponse.MinimumInterval>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlansAPI.Plan;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<SubscriptionTriggerPhaseResponse.PriceInterval>;

  redeemed_coupon: SubscriptionTriggerPhaseResponse.RedeemedCoupon | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: SubscriptionTriggerPhaseResponse.TrialInfo;
}

export namespace SubscriptionTriggerPhaseResponse {
  export interface AdjustmentInterval {
    id: string;

    adjustment:
      | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
      | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseMinimumAdjustment
      | AdjustmentInterval.PlanPhaseMaximumAdjustment;

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

  export namespace AdjustmentInterval {
    export interface PlanPhaseUsageDiscountAdjustment {
      id: string;

      adjustment_type: 'usage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseAmountDiscountAdjustment {
      id: string;

      adjustment_type: 'amount_discount';

      /**
       * The amount by which to discount the prices this adjustment applies to in a given
       * billing period.
       */
      amount_discount: string;

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhasePercentageDiscountAdjustment {
      id: string;

      adjustment_type: 'percentage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMinimumAdjustment {
      id: string;

      adjustment_type: 'minimum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMaximumAdjustment {
      id: string;

      adjustment_type: 'maximum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

  export interface AmountDiscountInterval {
    /**
     * Only available if discount_type is `amount`.
     */
    amount_discount: string;

    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface PercentageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * Only available if discount_type is `percentage`.This is a number between 0
     * and 1.
     */
    percentage_discount: number;

    /**
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface UsageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;
  }

  export interface FixedFeeQuantitySchedule {
    end_date: string | null;

    price_id: string;

    quantity: number;

    start_date: string;
  }

  export interface MaximumInterval {
    /**
     * The price ids that this maximum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this maximum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the maximum interval.
     */
    end_date: string | null;

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

  export interface MinimumInterval {
    /**
     * The price ids that this minimum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this minimum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the minimum interval.
     */
    end_date: string | null;

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
    fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

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
    price: PricesAPI.Price;

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

  export namespace PriceInterval {
    export interface FixedFeeQuantityTransition {
      effective_date: string;

      price_id: string;

      quantity: number;
    }
  }

  export interface RedeemedCoupon {
    coupon_id: string;

    end_date: string | null;

    start_date: string;
  }

  export interface TrialInfo {
    end_date: string | null;
  }
}

export interface SubscriptionUnscheduleCancellationResponse {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<SubscriptionUnscheduleCancellationResponse.AdjustmentInterval>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: SubscriptionUnscheduleCancellationResponse.BillingCycleAnchorConfiguration;

  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  billing_cycle_day: number;

  created_at: string;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is not part of the billing period. Set to null for
   * subscriptions that are not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if the subscription is not currently active.
   */
  current_billing_period_start_date: string | null;

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
  customer: CustomersAPI.Customer;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    | SubscriptionUnscheduleCancellationResponse.AmountDiscountInterval
    | SubscriptionUnscheduleCancellationResponse.PercentageDiscountInterval
    | SubscriptionUnscheduleCancellationResponse.UsageDiscountInterval
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<SubscriptionUnscheduleCancellationResponse.FixedFeeQuantitySchedule>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<SubscriptionUnscheduleCancellationResponse.MaximumInterval>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<SubscriptionUnscheduleCancellationResponse.MinimumInterval>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlansAPI.Plan;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<SubscriptionUnscheduleCancellationResponse.PriceInterval>;

  redeemed_coupon: SubscriptionUnscheduleCancellationResponse.RedeemedCoupon | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: SubscriptionUnscheduleCancellationResponse.TrialInfo;
}

export namespace SubscriptionUnscheduleCancellationResponse {
  export interface AdjustmentInterval {
    id: string;

    adjustment:
      | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
      | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseMinimumAdjustment
      | AdjustmentInterval.PlanPhaseMaximumAdjustment;

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

  export namespace AdjustmentInterval {
    export interface PlanPhaseUsageDiscountAdjustment {
      id: string;

      adjustment_type: 'usage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseAmountDiscountAdjustment {
      id: string;

      adjustment_type: 'amount_discount';

      /**
       * The amount by which to discount the prices this adjustment applies to in a given
       * billing period.
       */
      amount_discount: string;

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhasePercentageDiscountAdjustment {
      id: string;

      adjustment_type: 'percentage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMinimumAdjustment {
      id: string;

      adjustment_type: 'minimum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMaximumAdjustment {
      id: string;

      adjustment_type: 'maximum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

  export interface AmountDiscountInterval {
    /**
     * Only available if discount_type is `amount`.
     */
    amount_discount: string;

    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface PercentageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * Only available if discount_type is `percentage`.This is a number between 0
     * and 1.
     */
    percentage_discount: number;

    /**
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface UsageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;
  }

  export interface FixedFeeQuantitySchedule {
    end_date: string | null;

    price_id: string;

    quantity: number;

    start_date: string;
  }

  export interface MaximumInterval {
    /**
     * The price ids that this maximum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this maximum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the maximum interval.
     */
    end_date: string | null;

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

  export interface MinimumInterval {
    /**
     * The price ids that this minimum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this minimum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the minimum interval.
     */
    end_date: string | null;

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
    fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

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
    price: PricesAPI.Price;

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

  export namespace PriceInterval {
    export interface FixedFeeQuantityTransition {
      effective_date: string;

      price_id: string;

      quantity: number;
    }
  }

  export interface RedeemedCoupon {
    coupon_id: string;

    end_date: string | null;

    start_date: string;
  }

  export interface TrialInfo {
    end_date: string | null;
  }
}

export interface SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse.AdjustmentInterval>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse.BillingCycleAnchorConfiguration;

  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  billing_cycle_day: number;

  created_at: string;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is not part of the billing period. Set to null for
   * subscriptions that are not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if the subscription is not currently active.
   */
  current_billing_period_start_date: string | null;

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
  customer: CustomersAPI.Customer;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    | SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse.AmountDiscountInterval
    | SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse.PercentageDiscountInterval
    | SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse.UsageDiscountInterval
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse.FixedFeeQuantitySchedule>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse.MaximumInterval>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse.MinimumInterval>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlansAPI.Plan;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse.PriceInterval>;

  redeemed_coupon: SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse.RedeemedCoupon | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse.TrialInfo;
}

export namespace SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse {
  export interface AdjustmentInterval {
    id: string;

    adjustment:
      | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
      | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseMinimumAdjustment
      | AdjustmentInterval.PlanPhaseMaximumAdjustment;

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

  export namespace AdjustmentInterval {
    export interface PlanPhaseUsageDiscountAdjustment {
      id: string;

      adjustment_type: 'usage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseAmountDiscountAdjustment {
      id: string;

      adjustment_type: 'amount_discount';

      /**
       * The amount by which to discount the prices this adjustment applies to in a given
       * billing period.
       */
      amount_discount: string;

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhasePercentageDiscountAdjustment {
      id: string;

      adjustment_type: 'percentage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMinimumAdjustment {
      id: string;

      adjustment_type: 'minimum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMaximumAdjustment {
      id: string;

      adjustment_type: 'maximum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

  export interface AmountDiscountInterval {
    /**
     * Only available if discount_type is `amount`.
     */
    amount_discount: string;

    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface PercentageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * Only available if discount_type is `percentage`.This is a number between 0
     * and 1.
     */
    percentage_discount: number;

    /**
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface UsageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;
  }

  export interface FixedFeeQuantitySchedule {
    end_date: string | null;

    price_id: string;

    quantity: number;

    start_date: string;
  }

  export interface MaximumInterval {
    /**
     * The price ids that this maximum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this maximum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the maximum interval.
     */
    end_date: string | null;

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

  export interface MinimumInterval {
    /**
     * The price ids that this minimum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this minimum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the minimum interval.
     */
    end_date: string | null;

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
    fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

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
    price: PricesAPI.Price;

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

  export namespace PriceInterval {
    export interface FixedFeeQuantityTransition {
      effective_date: string;

      price_id: string;

      quantity: number;
    }
  }

  export interface RedeemedCoupon {
    coupon_id: string;

    end_date: string | null;

    start_date: string;
  }

  export interface TrialInfo {
    end_date: string | null;
  }
}

export interface SubscriptionUnschedulePendingPlanChangesResponse {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<SubscriptionUnschedulePendingPlanChangesResponse.AdjustmentInterval>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: SubscriptionUnschedulePendingPlanChangesResponse.BillingCycleAnchorConfiguration;

  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  billing_cycle_day: number;

  created_at: string;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is not part of the billing period. Set to null for
   * subscriptions that are not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if the subscription is not currently active.
   */
  current_billing_period_start_date: string | null;

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
  customer: CustomersAPI.Customer;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    | SubscriptionUnschedulePendingPlanChangesResponse.AmountDiscountInterval
    | SubscriptionUnschedulePendingPlanChangesResponse.PercentageDiscountInterval
    | SubscriptionUnschedulePendingPlanChangesResponse.UsageDiscountInterval
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<SubscriptionUnschedulePendingPlanChangesResponse.FixedFeeQuantitySchedule>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<SubscriptionUnschedulePendingPlanChangesResponse.MaximumInterval>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<SubscriptionUnschedulePendingPlanChangesResponse.MinimumInterval>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlansAPI.Plan;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<SubscriptionUnschedulePendingPlanChangesResponse.PriceInterval>;

  redeemed_coupon: SubscriptionUnschedulePendingPlanChangesResponse.RedeemedCoupon | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: SubscriptionUnschedulePendingPlanChangesResponse.TrialInfo;
}

export namespace SubscriptionUnschedulePendingPlanChangesResponse {
  export interface AdjustmentInterval {
    id: string;

    adjustment:
      | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
      | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseMinimumAdjustment
      | AdjustmentInterval.PlanPhaseMaximumAdjustment;

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

  export namespace AdjustmentInterval {
    export interface PlanPhaseUsageDiscountAdjustment {
      id: string;

      adjustment_type: 'usage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseAmountDiscountAdjustment {
      id: string;

      adjustment_type: 'amount_discount';

      /**
       * The amount by which to discount the prices this adjustment applies to in a given
       * billing period.
       */
      amount_discount: string;

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhasePercentageDiscountAdjustment {
      id: string;

      adjustment_type: 'percentage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMinimumAdjustment {
      id: string;

      adjustment_type: 'minimum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMaximumAdjustment {
      id: string;

      adjustment_type: 'maximum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

  export interface AmountDiscountInterval {
    /**
     * Only available if discount_type is `amount`.
     */
    amount_discount: string;

    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface PercentageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * Only available if discount_type is `percentage`.This is a number between 0
     * and 1.
     */
    percentage_discount: number;

    /**
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface UsageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;
  }

  export interface FixedFeeQuantitySchedule {
    end_date: string | null;

    price_id: string;

    quantity: number;

    start_date: string;
  }

  export interface MaximumInterval {
    /**
     * The price ids that this maximum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this maximum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the maximum interval.
     */
    end_date: string | null;

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

  export interface MinimumInterval {
    /**
     * The price ids that this minimum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this minimum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the minimum interval.
     */
    end_date: string | null;

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
    fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

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
    price: PricesAPI.Price;

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

  export namespace PriceInterval {
    export interface FixedFeeQuantityTransition {
      effective_date: string;

      price_id: string;

      quantity: number;
    }
  }

  export interface RedeemedCoupon {
    coupon_id: string;

    end_date: string | null;

    start_date: string;
  }

  export interface TrialInfo {
    end_date: string | null;
  }
}

export interface SubscriptionUpdateFixedFeeQuantityResponse {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<SubscriptionUpdateFixedFeeQuantityResponse.AdjustmentInterval>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: SubscriptionUpdateFixedFeeQuantityResponse.BillingCycleAnchorConfiguration;

  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  billing_cycle_day: number;

  created_at: string;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is not part of the billing period. Set to null for
   * subscriptions that are not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if the subscription is not currently active.
   */
  current_billing_period_start_date: string | null;

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
  customer: CustomersAPI.Customer;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    | SubscriptionUpdateFixedFeeQuantityResponse.AmountDiscountInterval
    | SubscriptionUpdateFixedFeeQuantityResponse.PercentageDiscountInterval
    | SubscriptionUpdateFixedFeeQuantityResponse.UsageDiscountInterval
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<SubscriptionUpdateFixedFeeQuantityResponse.FixedFeeQuantitySchedule>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<SubscriptionUpdateFixedFeeQuantityResponse.MaximumInterval>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<SubscriptionUpdateFixedFeeQuantityResponse.MinimumInterval>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlansAPI.Plan;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<SubscriptionUpdateFixedFeeQuantityResponse.PriceInterval>;

  redeemed_coupon: SubscriptionUpdateFixedFeeQuantityResponse.RedeemedCoupon | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: SubscriptionUpdateFixedFeeQuantityResponse.TrialInfo;
}

export namespace SubscriptionUpdateFixedFeeQuantityResponse {
  export interface AdjustmentInterval {
    id: string;

    adjustment:
      | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
      | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseMinimumAdjustment
      | AdjustmentInterval.PlanPhaseMaximumAdjustment;

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

  export namespace AdjustmentInterval {
    export interface PlanPhaseUsageDiscountAdjustment {
      id: string;

      adjustment_type: 'usage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseAmountDiscountAdjustment {
      id: string;

      adjustment_type: 'amount_discount';

      /**
       * The amount by which to discount the prices this adjustment applies to in a given
       * billing period.
       */
      amount_discount: string;

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhasePercentageDiscountAdjustment {
      id: string;

      adjustment_type: 'percentage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMinimumAdjustment {
      id: string;

      adjustment_type: 'minimum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMaximumAdjustment {
      id: string;

      adjustment_type: 'maximum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

  export interface AmountDiscountInterval {
    /**
     * Only available if discount_type is `amount`.
     */
    amount_discount: string;

    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface PercentageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * Only available if discount_type is `percentage`.This is a number between 0
     * and 1.
     */
    percentage_discount: number;

    /**
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface UsageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;
  }

  export interface FixedFeeQuantitySchedule {
    end_date: string | null;

    price_id: string;

    quantity: number;

    start_date: string;
  }

  export interface MaximumInterval {
    /**
     * The price ids that this maximum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this maximum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the maximum interval.
     */
    end_date: string | null;

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

  export interface MinimumInterval {
    /**
     * The price ids that this minimum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this minimum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the minimum interval.
     */
    end_date: string | null;

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
    fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

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
    price: PricesAPI.Price;

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

  export namespace PriceInterval {
    export interface FixedFeeQuantityTransition {
      effective_date: string;

      price_id: string;

      quantity: number;
    }
  }

  export interface RedeemedCoupon {
    coupon_id: string;

    end_date: string | null;

    start_date: string;
  }

  export interface TrialInfo {
    end_date: string | null;
  }
}

export interface SubscriptionUpdateTrialResponse {
  id: string;

  /**
   * The current plan phase that is active, only if the subscription's plan has
   * phases.
   */
  active_plan_phase_order: number | null;

  /**
   * The adjustment intervals for this subscription.
   */
  adjustment_intervals: Array<SubscriptionUpdateTrialResponse.AdjustmentInterval>;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior. If null, defaults to the customer's setting.
   */
  auto_collection: boolean | null;

  billing_cycle_anchor_configuration: SubscriptionUpdateTrialResponse.BillingCycleAnchorConfiguration;

  /**
   * The day of the month on which the billing cycle is anchored. If the maximum
   * number of days in a month is greater than this value, the last day of the month
   * is the billing cycle day (e.g. billing_cycle_day=31 for April means the billing
   * period begins on the 30th.
   */
  billing_cycle_day: number;

  created_at: string;

  /**
   * The end of the current billing period. This is an exclusive timestamp, such that
   * the instant returned is not part of the billing period. Set to null for
   * subscriptions that are not currently active.
   */
  current_billing_period_end_date: string | null;

  /**
   * The start date of the current billing period. This is an inclusive timestamp;
   * the instant returned is exactly the beginning of the billing period. Set to null
   * if the subscription is not currently active.
   */
  current_billing_period_start_date: string | null;

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
  customer: CustomersAPI.Customer;

  /**
   * Determines the default memo on this subscriptions' invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo: string | null;

  /**
   * The discount intervals for this subscription.
   */
  discount_intervals: Array<
    | SubscriptionUpdateTrialResponse.AmountDiscountInterval
    | SubscriptionUpdateTrialResponse.PercentageDiscountInterval
    | SubscriptionUpdateTrialResponse.UsageDiscountInterval
  >;

  /**
   * The date Orb stops billing for this subscription.
   */
  end_date: string | null;

  fixed_fee_quantity_schedule: Array<SubscriptionUpdateTrialResponse.FixedFeeQuantitySchedule>;

  invoicing_threshold: string | null;

  /**
   * The maximum intervals for this subscription.
   */
  maximum_intervals: Array<SubscriptionUpdateTrialResponse.MaximumInterval>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The minimum intervals for this subscription.
   */
  minimum_intervals: Array<SubscriptionUpdateTrialResponse.MinimumInterval>;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms: number;

  /**
   * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be
   * subscribed to by a customer. Plans define the billing behavior of the
   * subscription. You can see more about how to configure prices in the
   * [Price resource](/reference/price).
   */
  plan: PlansAPI.Plan;

  /**
   * The price intervals for this subscription.
   */
  price_intervals: Array<SubscriptionUpdateTrialResponse.PriceInterval>;

  redeemed_coupon: SubscriptionUpdateTrialResponse.RedeemedCoupon | null;

  /**
   * The date Orb starts billing for this subscription.
   */
  start_date: string;

  status: 'active' | 'ended' | 'upcoming';

  trial_info: SubscriptionUpdateTrialResponse.TrialInfo;
}

export namespace SubscriptionUpdateTrialResponse {
  export interface AdjustmentInterval {
    id: string;

    adjustment:
      | AdjustmentInterval.PlanPhaseUsageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseAmountDiscountAdjustment
      | AdjustmentInterval.PlanPhasePercentageDiscountAdjustment
      | AdjustmentInterval.PlanPhaseMinimumAdjustment
      | AdjustmentInterval.PlanPhaseMaximumAdjustment;

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

  export namespace AdjustmentInterval {
    export interface PlanPhaseUsageDiscountAdjustment {
      id: string;

      adjustment_type: 'usage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseAmountDiscountAdjustment {
      id: string;

      adjustment_type: 'amount_discount';

      /**
       * The amount by which to discount the prices this adjustment applies to in a given
       * billing period.
       */
      amount_discount: string;

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhasePercentageDiscountAdjustment {
      id: string;

      adjustment_type: 'percentage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMinimumAdjustment {
      id: string;

      adjustment_type: 'minimum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface PlanPhaseMaximumAdjustment {
      id: string;

      adjustment_type: 'maximum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

  export interface AmountDiscountInterval {
    /**
     * Only available if discount_type is `amount`.
     */
    amount_discount: string;

    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface PercentageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * Only available if discount_type is `percentage`.This is a number between 0
     * and 1.
     */
    percentage_discount: number;

    /**
     * The start date of the discount interval.
     */
    start_date: string;
  }

  export interface UsageDiscountInterval {
    /**
     * The price ids that this discount interval applies to.
     */
    applies_to_price_ids: Array<string>;

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
     * The start date of the discount interval.
     */
    start_date: string;

    /**
     * Only available if discount_type is `usage`. Number of usage units that this
     * discount is for
     */
    usage_discount: number;
  }

  export interface FixedFeeQuantitySchedule {
    end_date: string | null;

    price_id: string;

    quantity: number;

    start_date: string;
  }

  export interface MaximumInterval {
    /**
     * The price ids that this maximum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this maximum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the maximum interval.
     */
    end_date: string | null;

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

  export interface MinimumInterval {
    /**
     * The price ids that this minimum interval applies to.
     */
    applies_to_price_ids: Array<string>;

    /**
     * The price interval ids that this minimum interval applies to.
     */
    applies_to_price_interval_ids: Array<string>;

    /**
     * The end date of the minimum interval.
     */
    end_date: string | null;

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
    fixed_fee_quantity_transitions: Array<PriceInterval.FixedFeeQuantityTransition> | null;

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
    price: PricesAPI.Price;

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

  export namespace PriceInterval {
    export interface FixedFeeQuantityTransition {
      effective_date: string;

      price_id: string;

      quantity: number;
    }
  }

  export interface RedeemedCoupon {
    coupon_id: string;

    end_date: string | null;

    start_date: string;
  }

  export interface TrialInfo {
    end_date: string | null;
  }
}

export interface SubscriptionCreateParams {
  /**
   * Additional adjustments to be added to the subscription. (Only available for
   * accounts that have migrated off of legacy subscription overrides)
   */
  add_adjustments?: Array<SubscriptionCreateParams.AddAdjustment> | null;

  /**
   * Additional prices to be added to the subscription. (Only available for accounts
   * that have migrated off of legacy subscription overrides)
   */
  add_prices?: Array<SubscriptionCreateParams.AddPrice> | null;

  align_billing_with_subscription_start_date?: boolean;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. If not specified, this
   * defaults to the behavior configured for this customer.
   */
  auto_collection?: boolean | null;

  aws_region?: string | null;

  billing_cycle_anchor_configuration?: SubscriptionCreateParams.BillingCycleAnchorConfiguration | null;

  /**
   * Redemption code to be used for this subscription. If the coupon cannot be found
   * by its redemption code, or cannot be redeemed, an error response will be
   * returned and the subscription creation or plan change will not be scheduled.
   */
  coupon_redemption_code?: string | null;

  credits_overage_rate?: number | null;

  customer_id?: string | null;

  /**
   * Determines the default memo on this subscription's invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo?: string | null;

  end_date?: string | null;

  external_customer_id?: string | null;

  external_marketplace?: 'google' | 'aws' | 'azure' | null;

  external_marketplace_reporting_id?: string | null;

  /**
   * The external_plan_id of the plan that the given subscription should be switched
   * to. Note that either this property or `plan_id` must be specified.
   */
  external_plan_id?: string | null;

  /**
   * An additional filter to apply to usage queries. This filter must be expressed as
   * a boolean
   * [computed property](/extensibility/advanced-metrics#computed-properties). If
   * null, usage queries will not include any additional filter.
   */
  filter?: string | null;

  /**
   * The phase of the plan to start with
   */
  initial_phase_order?: number | null;

  /**
   * When this subscription's accrued usage reaches this threshold, an invoice will
   * be issued for the subscription. If not specified, invoices will only be issued
   * at the end of the billing period.
   */
  invoicing_threshold?: string | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;

  /**
   * The net terms determines the difference between the invoice date and the issue
   * date for the invoice. If you intend the invoice to be due on issue, set this
   * to 0. If not provided, this defaults to the value specified in the plan.
   */
  net_terms?: number | null;

  per_credit_overage_amount?: number | null;

  /**
   * The plan that the given subscription should be switched to. Note that either
   * this property or `external_plan_id` must be specified.
   */
  plan_id?: string | null;

  /**
   * Specifies which version of the plan to subscribe to. If null, the default
   * version will be used.
   */
  plan_version_number?: number | null;

  /**
   * Optionally provide a list of overrides for prices on the plan
   */
  price_overrides?: Array<unknown> | null;

  /**
   * Plan adjustments to be removed from the subscription. (Only available for
   * accounts that have migrated off of legacy subscription overrides)
   */
  remove_adjustments?: Array<SubscriptionCreateParams.RemoveAdjustment> | null;

  /**
   * Plan prices to be removed from the subscription. (Only available for accounts
   * that have migrated off of legacy subscription overrides)
   */
  remove_prices?: Array<SubscriptionCreateParams.RemovePrice> | null;

  /**
   * Plan adjustments to be replaced with additional adjustments on the subscription.
   * (Only available for accounts that have migrated off of legacy subscription
   * overrides)
   */
  replace_adjustments?: Array<SubscriptionCreateParams.ReplaceAdjustment> | null;

  /**
   * Plan prices to be replaced with additional prices on the subscription. (Only
   * available for accounts that have migrated off of legacy subscription overrides)
   */
  replace_prices?: Array<SubscriptionCreateParams.ReplacePrice> | null;

  start_date?: string | null;

  /**
   * The duration of the trial period in days. If not provided, this defaults to the
   * value specified in the plan. If `0` is provided, the trial on the plan will be
   * skipped.
   */
  trial_duration_days?: number | null;

  /**
   * A list of customer IDs whose usage events will be aggregated and billed under
   * this subscription. By default, a subscription only considers usage events
   * associated with its attached customer's customer_id. When usage_customer_ids is
   * provided, the subscription includes usage events from the specified customers
   * only. Provided usage_customer_ids must be either the customer for this
   * subscription itself, or any of that customer's children.
   */
  usage_customer_ids?: Array<string> | null;
}

export namespace SubscriptionCreateParams {
  export interface AddAdjustment {
    /**
     * The definition of a new adjustment to create and add to the subscription.
     */
    adjustment:
      | AddAdjustment.NewPercentageDiscount
      | AddAdjustment.NewUsageDiscount
      | AddAdjustment.NewAmountDiscount
      | AddAdjustment.NewMinimum
      | AddAdjustment.NewMaximum;

    /**
     * The end date of the adjustment interval. This is the date that the adjustment
     * will stop affecting prices on the subscription.
     */
    end_date?: string | null;

    /**
     * The phase to add this adjustment to.
     */
    plan_phase_order?: number | null;

    /**
     * The start date of the adjustment interval. This is the date that the adjustment
     * will start affecting prices on the subscription. If null, the adjustment will
     * start when the phase or subscription starts.
     */
    start_date?: string | null;
  }

  export namespace AddAdjustment {
    export interface NewPercentageDiscount {
      adjustment_type: 'percentage_discount';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      percentage_discount: number;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewUsageDiscount {
      adjustment_type: 'usage_discount';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      usage_discount: number;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewAmountDiscount {
      adjustment_type: 'amount_discount';

      amount_discount: string;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMinimum {
      adjustment_type: 'minimum';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The item ID that revenue from this minimum will be attributed to.
       */
      item_id: string;

      minimum_amount: string;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMaximum {
      adjustment_type: 'maximum';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      maximum_amount: string;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }
  }

  export interface AddPrice {
    /**
     * The definition of a new allocation price to create and add to the subscription.
     */
    allocation_price?: AddPrice.AllocationPrice | null;

    /**
     * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's
     * discounts for this price.
     */
    discounts?: Array<AddPrice.Discount> | null;

    /**
     * The end date of the price interval. This is the date that the price will stop
     * billing on the subscription. If null, billing will end when the phase or
     * subscription ends.
     */
    end_date?: string | null;

    /**
     * The external price id of the price to add to the subscription.
     */
    external_price_id?: string | null;

    /**
     * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's maximum
     * amount for this price.
     */
    maximum_amount?: string | null;

    /**
     * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's minimum
     * amount for this price.
     */
    minimum_amount?: string | null;

    /**
     * The phase to add this price to.
     */
    plan_phase_order?: number | null;

    /**
     * The definition of a new price to create and add to the subscription.
     */
    price?:
      | AddPrice.NewSubscriptionUnitPrice
      | AddPrice.NewSubscriptionPackagePrice
      | AddPrice.NewSubscriptionMatrixPrice
      | AddPrice.NewSubscriptionTieredPrice
      | AddPrice.NewSubscriptionTieredBpsPrice
      | AddPrice.NewSubscriptionBpsPrice
      | AddPrice.NewSubscriptionBulkBpsPrice
      | AddPrice.NewSubscriptionBulkPrice
      | AddPrice.NewSubscriptionThresholdTotalAmountPrice
      | AddPrice.NewSubscriptionTieredPackagePrice
      | AddPrice.NewSubscriptionTieredWithMinimumPrice
      | AddPrice.NewSubscriptionUnitWithPercentPrice
      | AddPrice.NewSubscriptionPackageWithAllocationPrice
      | AddPrice.NewSubscriptionTierWithProrationPrice
      | AddPrice.NewSubscriptionUnitWithProrationPrice
      | AddPrice.NewSubscriptionGroupedAllocationPrice
      | AddPrice.NewSubscriptionGroupedWithProratedMinimumPrice
      | AddPrice.NewSubscriptionBulkWithProrationPrice
      | AddPrice.NewSubscriptionScalableMatrixWithUnitPricingPrice
      | AddPrice.NewSubscriptionScalableMatrixWithTieredPricingPrice
      | AddPrice.NewSubscriptionCumulativeGroupedBulkPrice
      | AddPrice.NewSubscriptionMaxGroupTieredPackagePrice
      | AddPrice.NewSubscriptionGroupedWithMeteredMinimumPrice
      | AddPrice.NewSubscriptionMatrixWithDisplayNamePrice
      | AddPrice.NewSubscriptionGroupedTieredPackagePrice
      | null;

    /**
     * The id of the price to add to the subscription.
     */
    price_id?: string | null;

    /**
     * The start date of the price interval. This is the date that the price will start
     * billing on the subscription. If null, billing will start when the phase or
     * subscription starts.
     */
    start_date?: string | null;
  }

  export namespace AddPrice {
    /**
     * The definition of a new allocation price to create and add to the subscription.
     */
    export interface AllocationPrice {
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
       * Whether the allocated amount should expire at the end of the cadence or roll
       * over to the next period.
       */
      expires_at_end_of_cadence: boolean;
    }

    export interface Discount {
      discount_type: 'percentage' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }

    export interface NewSubscriptionUnitPrice {
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

      unit_config: NewSubscriptionUnitPrice.UnitConfig;

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
      billing_cycle_configuration?: NewSubscriptionUnitPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionUnitPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionUnitPrice {
      export interface UnitConfig {
        /**
         * Rate per unit of usage
         */
        unit_amount: string;
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionPackagePrice {
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

      package_config: NewSubscriptionPackagePrice.PackageConfig;

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
      billing_cycle_configuration?: NewSubscriptionPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionPackagePrice {
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

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionMatrixPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      matrix_config: NewSubscriptionMatrixPrice.MatrixConfig;

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
      billing_cycle_configuration?: NewSubscriptionMatrixPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionMatrixPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionMatrixPrice {
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
        matrix_values: Array<MatrixConfig.MatrixValue>;
      }

      export namespace MatrixConfig {
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

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredPrice {
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

      tiered_config: NewSubscriptionTieredPrice.TieredConfig;

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
      billing_cycle_configuration?: NewSubscriptionTieredPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredPrice {
      export interface TieredConfig {
        /**
         * Tiers for rating based on total usage quantities into the specified tier
         */
        tiers: Array<TieredConfig.Tier>;
      }

      export namespace TieredConfig {
        export interface Tier {
          /**
           * Inclusive tier starting value
           */
          first_unit: number;

          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * Exclusive tier ending value. If null, this is treated as the last tier
           */
          last_unit?: number | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredBpsPrice {
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

      tiered_bps_config: NewSubscriptionTieredBpsPrice.TieredBpsConfig;

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
      billing_cycle_configuration?: NewSubscriptionTieredBpsPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredBpsPrice {
      export interface TieredBpsConfig {
        /**
         * Tiers for a Graduated BPS pricing model, where usage is bucketed into specified
         * tiers
         */
        tiers: Array<TieredBpsConfig.Tier>;
      }

      export namespace TieredBpsConfig {
        export interface Tier {
          /**
           * Per-event basis point rate
           */
          bps: number;

          /**
           * Inclusive tier starting value
           */
          minimum_amount: string;

          /**
           * Exclusive tier ending value
           */
          maximum_amount?: string | null;

          /**
           * Per unit maximum to charge
           */
          per_unit_maximum?: string | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBpsPrice {
      bps_config: NewSubscriptionBpsPrice.BpsConfig;

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
      billing_cycle_configuration?: NewSubscriptionBpsPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBpsPrice {
      export interface BpsConfig {
        /**
         * Basis point take rate per event
         */
        bps: number;

        /**
         * Optional currency amount maximum to cap spend per event
         */
        per_unit_maximum?: string | null;
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBulkBpsPrice {
      bulk_bps_config: NewSubscriptionBulkBpsPrice.BulkBpsConfig;

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
      billing_cycle_configuration?: NewSubscriptionBulkBpsPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBulkBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBulkBpsPrice {
      export interface BulkBpsConfig {
        /**
         * Tiers for a bulk BPS pricing model where all usage is aggregated to a single
         * tier based on total volume
         */
        tiers: Array<BulkBpsConfig.Tier>;
      }

      export namespace BulkBpsConfig {
        export interface Tier {
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
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBulkPrice {
      bulk_config: NewSubscriptionBulkPrice.BulkConfig;

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
      billing_cycle_configuration?: NewSubscriptionBulkPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBulkPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBulkPrice {
      export interface BulkConfig {
        /**
         * Bulk tiers for rating based on total usage volume
         */
        tiers: Array<BulkConfig.Tier>;
      }

      export namespace BulkConfig {
        export interface Tier {
          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * Upper bound for this tier
           */
          maximum_units?: number | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionThresholdTotalAmountPrice {
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
      billing_cycle_configuration?: NewSubscriptionThresholdTotalAmountPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionThresholdTotalAmountPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionThresholdTotalAmountPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredPackagePrice {
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
      billing_cycle_configuration?: NewSubscriptionTieredPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredWithMinimumPrice {
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
      billing_cycle_configuration?: NewSubscriptionTieredWithMinimumPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredWithMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredWithMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionUnitWithPercentPrice {
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
      billing_cycle_configuration?: NewSubscriptionUnitWithPercentPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionUnitWithPercentPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionUnitWithPercentPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionPackageWithAllocationPrice {
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
      billing_cycle_configuration?: NewSubscriptionPackageWithAllocationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionPackageWithAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionPackageWithAllocationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTierWithProrationPrice {
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
      billing_cycle_configuration?: NewSubscriptionTierWithProrationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTierWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTierWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionUnitWithProrationPrice {
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
      billing_cycle_configuration?: NewSubscriptionUnitWithProrationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionUnitWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionUnitWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedAllocationPrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedAllocationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedAllocationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedWithProratedMinimumPrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedWithProratedMinimumPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedWithProratedMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedWithProratedMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBulkWithProrationPrice {
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
      billing_cycle_configuration?: NewSubscriptionBulkWithProrationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBulkWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBulkWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionScalableMatrixWithUnitPricingPrice {
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
      billing_cycle_configuration?: NewSubscriptionScalableMatrixWithUnitPricingPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionScalableMatrixWithUnitPricingPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionScalableMatrixWithUnitPricingPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionScalableMatrixWithTieredPricingPrice {
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
      billing_cycle_configuration?: NewSubscriptionScalableMatrixWithTieredPricingPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionScalableMatrixWithTieredPricingPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionScalableMatrixWithTieredPricingPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionCumulativeGroupedBulkPrice {
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
      billing_cycle_configuration?: NewSubscriptionCumulativeGroupedBulkPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionCumulativeGroupedBulkPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionCumulativeGroupedBulkPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionMaxGroupTieredPackagePrice {
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
      billing_cycle_configuration?: NewSubscriptionMaxGroupTieredPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionMaxGroupTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionMaxGroupTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedWithMeteredMinimumPrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedWithMeteredMinimumPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedWithMeteredMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedWithMeteredMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionMatrixWithDisplayNamePrice {
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
      billing_cycle_configuration?: NewSubscriptionMatrixWithDisplayNamePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionMatrixWithDisplayNamePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionMatrixWithDisplayNamePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedTieredPackagePrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedTieredPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }
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

  export interface RemoveAdjustment {
    /**
     * The id of the adjustment to remove on the subscription.
     */
    adjustment_id: string;
  }

  export interface RemovePrice {
    /**
     * The external price id of the price to remove on the subscription.
     */
    external_price_id?: string | null;

    /**
     * The id of the price to remove on the subscription.
     */
    price_id?: string | null;
  }

  export interface ReplaceAdjustment {
    /**
     * The definition of a new adjustment to create and add to the subscription.
     */
    adjustment:
      | ReplaceAdjustment.NewPercentageDiscount
      | ReplaceAdjustment.NewUsageDiscount
      | ReplaceAdjustment.NewAmountDiscount
      | ReplaceAdjustment.NewMinimum
      | ReplaceAdjustment.NewMaximum;

    /**
     * The id of the adjustment on the plan to replace in the subscription.
     */
    replaces_adjustment_id: string;
  }

  export namespace ReplaceAdjustment {
    export interface NewPercentageDiscount {
      adjustment_type: 'percentage_discount';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      percentage_discount: number;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewUsageDiscount {
      adjustment_type: 'usage_discount';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      usage_discount: number;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewAmountDiscount {
      adjustment_type: 'amount_discount';

      amount_discount: string;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMinimum {
      adjustment_type: 'minimum';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The item ID that revenue from this minimum will be attributed to.
       */
      item_id: string;

      minimum_amount: string;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMaximum {
      adjustment_type: 'maximum';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      maximum_amount: string;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }
  }

  export interface ReplacePrice {
    /**
     * The id of the price on the plan to replace in the subscription.
     */
    replaces_price_id: string;

    /**
     * The definition of a new allocation price to create and add to the subscription.
     */
    allocation_price?: ReplacePrice.AllocationPrice | null;

    /**
     * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's
     * discounts for the replacement price.
     */
    discounts?: Array<ReplacePrice.Discount> | null;

    /**
     * The external price id of the price to add to the subscription.
     */
    external_price_id?: string | null;

    /**
     * The new quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's maximum
     * amount for the replacement price.
     */
    maximum_amount?: string | null;

    /**
     * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's minimum
     * amount for the replacement price.
     */
    minimum_amount?: string | null;

    /**
     * The definition of a new price to create and add to the subscription.
     */
    price?:
      | ReplacePrice.NewSubscriptionUnitPrice
      | ReplacePrice.NewSubscriptionPackagePrice
      | ReplacePrice.NewSubscriptionMatrixPrice
      | ReplacePrice.NewSubscriptionTieredPrice
      | ReplacePrice.NewSubscriptionTieredBpsPrice
      | ReplacePrice.NewSubscriptionBpsPrice
      | ReplacePrice.NewSubscriptionBulkBpsPrice
      | ReplacePrice.NewSubscriptionBulkPrice
      | ReplacePrice.NewSubscriptionThresholdTotalAmountPrice
      | ReplacePrice.NewSubscriptionTieredPackagePrice
      | ReplacePrice.NewSubscriptionTieredWithMinimumPrice
      | ReplacePrice.NewSubscriptionUnitWithPercentPrice
      | ReplacePrice.NewSubscriptionPackageWithAllocationPrice
      | ReplacePrice.NewSubscriptionTierWithProrationPrice
      | ReplacePrice.NewSubscriptionUnitWithProrationPrice
      | ReplacePrice.NewSubscriptionGroupedAllocationPrice
      | ReplacePrice.NewSubscriptionGroupedWithProratedMinimumPrice
      | ReplacePrice.NewSubscriptionBulkWithProrationPrice
      | ReplacePrice.NewSubscriptionScalableMatrixWithUnitPricingPrice
      | ReplacePrice.NewSubscriptionScalableMatrixWithTieredPricingPrice
      | ReplacePrice.NewSubscriptionCumulativeGroupedBulkPrice
      | ReplacePrice.NewSubscriptionMaxGroupTieredPackagePrice
      | ReplacePrice.NewSubscriptionGroupedWithMeteredMinimumPrice
      | ReplacePrice.NewSubscriptionMatrixWithDisplayNamePrice
      | ReplacePrice.NewSubscriptionGroupedTieredPackagePrice
      | null;

    /**
     * The id of the price to add to the subscription.
     */
    price_id?: string | null;
  }

  export namespace ReplacePrice {
    /**
     * The definition of a new allocation price to create and add to the subscription.
     */
    export interface AllocationPrice {
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
       * Whether the allocated amount should expire at the end of the cadence or roll
       * over to the next period.
       */
      expires_at_end_of_cadence: boolean;
    }

    export interface Discount {
      discount_type: 'percentage' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }

    export interface NewSubscriptionUnitPrice {
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

      unit_config: NewSubscriptionUnitPrice.UnitConfig;

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
      billing_cycle_configuration?: NewSubscriptionUnitPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionUnitPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionUnitPrice {
      export interface UnitConfig {
        /**
         * Rate per unit of usage
         */
        unit_amount: string;
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionPackagePrice {
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

      package_config: NewSubscriptionPackagePrice.PackageConfig;

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
      billing_cycle_configuration?: NewSubscriptionPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionPackagePrice {
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

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionMatrixPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      matrix_config: NewSubscriptionMatrixPrice.MatrixConfig;

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
      billing_cycle_configuration?: NewSubscriptionMatrixPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionMatrixPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionMatrixPrice {
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
        matrix_values: Array<MatrixConfig.MatrixValue>;
      }

      export namespace MatrixConfig {
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

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredPrice {
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

      tiered_config: NewSubscriptionTieredPrice.TieredConfig;

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
      billing_cycle_configuration?: NewSubscriptionTieredPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredPrice {
      export interface TieredConfig {
        /**
         * Tiers for rating based on total usage quantities into the specified tier
         */
        tiers: Array<TieredConfig.Tier>;
      }

      export namespace TieredConfig {
        export interface Tier {
          /**
           * Inclusive tier starting value
           */
          first_unit: number;

          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * Exclusive tier ending value. If null, this is treated as the last tier
           */
          last_unit?: number | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredBpsPrice {
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

      tiered_bps_config: NewSubscriptionTieredBpsPrice.TieredBpsConfig;

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
      billing_cycle_configuration?: NewSubscriptionTieredBpsPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredBpsPrice {
      export interface TieredBpsConfig {
        /**
         * Tiers for a Graduated BPS pricing model, where usage is bucketed into specified
         * tiers
         */
        tiers: Array<TieredBpsConfig.Tier>;
      }

      export namespace TieredBpsConfig {
        export interface Tier {
          /**
           * Per-event basis point rate
           */
          bps: number;

          /**
           * Inclusive tier starting value
           */
          minimum_amount: string;

          /**
           * Exclusive tier ending value
           */
          maximum_amount?: string | null;

          /**
           * Per unit maximum to charge
           */
          per_unit_maximum?: string | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBpsPrice {
      bps_config: NewSubscriptionBpsPrice.BpsConfig;

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
      billing_cycle_configuration?: NewSubscriptionBpsPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBpsPrice {
      export interface BpsConfig {
        /**
         * Basis point take rate per event
         */
        bps: number;

        /**
         * Optional currency amount maximum to cap spend per event
         */
        per_unit_maximum?: string | null;
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBulkBpsPrice {
      bulk_bps_config: NewSubscriptionBulkBpsPrice.BulkBpsConfig;

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
      billing_cycle_configuration?: NewSubscriptionBulkBpsPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBulkBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBulkBpsPrice {
      export interface BulkBpsConfig {
        /**
         * Tiers for a bulk BPS pricing model where all usage is aggregated to a single
         * tier based on total volume
         */
        tiers: Array<BulkBpsConfig.Tier>;
      }

      export namespace BulkBpsConfig {
        export interface Tier {
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
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBulkPrice {
      bulk_config: NewSubscriptionBulkPrice.BulkConfig;

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
      billing_cycle_configuration?: NewSubscriptionBulkPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBulkPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBulkPrice {
      export interface BulkConfig {
        /**
         * Bulk tiers for rating based on total usage volume
         */
        tiers: Array<BulkConfig.Tier>;
      }

      export namespace BulkConfig {
        export interface Tier {
          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * Upper bound for this tier
           */
          maximum_units?: number | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionThresholdTotalAmountPrice {
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
      billing_cycle_configuration?: NewSubscriptionThresholdTotalAmountPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionThresholdTotalAmountPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionThresholdTotalAmountPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredPackagePrice {
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
      billing_cycle_configuration?: NewSubscriptionTieredPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredWithMinimumPrice {
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
      billing_cycle_configuration?: NewSubscriptionTieredWithMinimumPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredWithMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredWithMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionUnitWithPercentPrice {
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
      billing_cycle_configuration?: NewSubscriptionUnitWithPercentPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionUnitWithPercentPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionUnitWithPercentPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionPackageWithAllocationPrice {
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
      billing_cycle_configuration?: NewSubscriptionPackageWithAllocationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionPackageWithAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionPackageWithAllocationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTierWithProrationPrice {
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
      billing_cycle_configuration?: NewSubscriptionTierWithProrationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTierWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTierWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionUnitWithProrationPrice {
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
      billing_cycle_configuration?: NewSubscriptionUnitWithProrationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionUnitWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionUnitWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedAllocationPrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedAllocationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedAllocationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedWithProratedMinimumPrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedWithProratedMinimumPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedWithProratedMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedWithProratedMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBulkWithProrationPrice {
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
      billing_cycle_configuration?: NewSubscriptionBulkWithProrationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBulkWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBulkWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionScalableMatrixWithUnitPricingPrice {
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
      billing_cycle_configuration?: NewSubscriptionScalableMatrixWithUnitPricingPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionScalableMatrixWithUnitPricingPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionScalableMatrixWithUnitPricingPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionScalableMatrixWithTieredPricingPrice {
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
      billing_cycle_configuration?: NewSubscriptionScalableMatrixWithTieredPricingPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionScalableMatrixWithTieredPricingPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionScalableMatrixWithTieredPricingPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionCumulativeGroupedBulkPrice {
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
      billing_cycle_configuration?: NewSubscriptionCumulativeGroupedBulkPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionCumulativeGroupedBulkPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionCumulativeGroupedBulkPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionMaxGroupTieredPackagePrice {
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
      billing_cycle_configuration?: NewSubscriptionMaxGroupTieredPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionMaxGroupTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionMaxGroupTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedWithMeteredMinimumPrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedWithMeteredMinimumPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedWithMeteredMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedWithMeteredMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionMatrixWithDisplayNamePrice {
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
      billing_cycle_configuration?: NewSubscriptionMatrixWithDisplayNamePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionMatrixWithDisplayNamePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionMatrixWithDisplayNamePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedTieredPackagePrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedTieredPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }
  }
}

export interface SubscriptionUpdateParams {
  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. This property defaults to
   * the plan's behavior.
   */
  auto_collection?: boolean | null;

  /**
   * Determines the default memo on this subscription's invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo?: string | null;

  /**
   * When this subscription's accrued usage reaches this threshold, an invoice will
   * be issued for the subscription. If not specified, invoices will only be issued
   * at the end of the billing period.
   */
  invoicing_threshold?: string | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;

  /**
   * Determines the difference between the invoice issue date for subscription
   * invoices as the date that they are due. A value of `0` here represents that the
   * invoice is due on issue, whereas a value of `30` represents that the customer
   * has a month to pay the invoice.
   */
  net_terms?: number | null;
}

export interface SubscriptionListParams extends PageParams {
  'created_at[gt]'?: string | null;

  'created_at[gte]'?: string | null;

  'created_at[lt]'?: string | null;

  'created_at[lte]'?: string | null;

  customer_id?: Array<string> | null;

  external_customer_id?: string | null;

  status?: 'active' | 'ended' | 'upcoming' | null;
}

export interface SubscriptionCancelParams {
  /**
   * Determines the timing of subscription cancellation
   */
  cancel_option: 'end_of_subscription_term' | 'immediate' | 'requested_date';

  /**
   * If false, this request will fail if it would void an issued invoice or create a
   * credit note. Consider using this as a safety mechanism if you do not expect
   * existing invoices to be changed.
   */
  allow_invoice_credit_or_void?: boolean | null;

  /**
   * The date that the cancellation should take effect. This parameter can only be
   * passed if the `cancel_option` is `requested_date`.
   */
  cancellation_date?: string | null;
}

export interface SubscriptionFetchCostsParams {
  /**
   * The currency or custom pricing unit to use.
   */
  currency?: string | null;

  /**
   * Costs returned are exclusive of `timeframe_end`.
   */
  timeframe_end?: string | null;

  /**
   * Costs returned are inclusive of `timeframe_start`.
   */
  timeframe_start?: string | null;

  /**
   * Controls whether Orb returns cumulative costs since the start of the billing
   * period, or incremental day-by-day costs. If your customer has minimums or
   * discounts, it's strongly recommended that you use the default cumulative
   * behavior.
   */
  view_mode?: 'periodic' | 'cumulative' | null;
}

export interface SubscriptionFetchScheduleParams extends PageParams {
  'start_date[gt]'?: string | null;

  'start_date[gte]'?: string | null;

  'start_date[lt]'?: string | null;

  'start_date[lte]'?: string | null;
}

export interface SubscriptionFetchUsageParams {
  /**
   * When specified in conjunction with `group_by`, this parameter filters usage to a
   * single billable metric. Note that both `group_by` and `billable_metric_id` must
   * be specified together.
   */
  billable_metric_id?: string | null;

  first_dimension_key?: string | null;

  first_dimension_value?: string | null;

  /**
   * This determines the windowing of usage reporting.
   */
  granularity?: 'day' | null;

  /**
   * Groups per-price usage by the key provided.
   */
  group_by?: string | null;

  second_dimension_key?: string | null;

  second_dimension_value?: string | null;

  /**
   * Usage returned is exclusive of `timeframe_end`.
   */
  timeframe_end?: string | null;

  /**
   * Usage returned is inclusive of `timeframe_start`.
   */
  timeframe_start?: string | null;

  /**
   * Controls whether Orb returns cumulative usage since the start of the billing
   * period, or incremental day-by-day usage. If your customer has minimums or
   * discounts, it's strongly recommended that you use the default cumulative
   * behavior.
   */
  view_mode?: 'periodic' | 'cumulative' | null;
}

export interface SubscriptionPriceIntervalsParams {
  /**
   * A list of price intervals to add to the subscription.
   */
  add?: Array<SubscriptionPriceIntervalsParams.Add>;

  /**
   * A list of adjustments to add to the subscription.
   */
  add_adjustments?: Array<SubscriptionPriceIntervalsParams.AddAdjustment>;

  /**
   * If false, this request will fail if it would void an issued invoice or create a
   * credit note. Consider using this as a safety mechanism if you do not expect
   * existing invoices to be changed.
   */
  allow_invoice_credit_or_void?: boolean | null;

  /**
   * A list of price intervals to edit on the subscription.
   */
  edit?: Array<SubscriptionPriceIntervalsParams.Edit>;

  /**
   * A list of adjustments to edit on the subscription.
   */
  edit_adjustments?: Array<SubscriptionPriceIntervalsParams.EditAdjustment>;
}

export namespace SubscriptionPriceIntervalsParams {
  export interface Add {
    /**
     * The start date of the price interval. This is the date that the price will start
     * billing on the subscription.
     */
    start_date: (string & {}) | Shared.BillingCycleRelativeDate;

    /**
     * The definition of a new allocation price to create and add to the subscription.
     */
    allocation_price?: Add.AllocationPrice | null;

    /**
     * A list of discounts to initialize on the price interval.
     */
    discounts?: Array<
      | Add.AmountDiscountCreationParams
      | Add.PercentageDiscountCreationParams
      | Add.UsageDiscountCreationParams
    > | null;

    /**
     * The end date of the price interval. This is the date that the price will stop
     * billing on the subscription.
     */
    end_date?: (string & {}) | Shared.BillingCycleRelativeDate | null;

    /**
     * The external price id of the price to add to the subscription.
     */
    external_price_id?: string | null;

    /**
     * An additional filter to apply to usage queries. This filter must be expressed as
     * a boolean
     * [computed property](/extensibility/advanced-metrics#computed-properties). If
     * null, usage queries will not include any additional filter.
     */
    filter?: string | null;

    /**
     * A list of fixed fee quantity transitions to initialize on the price interval.
     */
    fixed_fee_quantity_transitions?: Array<Add.FixedFeeQuantityTransition> | null;

    /**
     * The maximum amount that will be billed for this price interval for a given
     * billing period.
     */
    maximum_amount?: number | null;

    /**
     * The minimum amount that will be billed for this price interval for a given
     * billing period.
     */
    minimum_amount?: number | null;

    /**
     * The definition of a new price to create and add to the subscription.
     */
    price?:
      | Add.NewFloatingUnitPrice
      | Add.NewFloatingPackagePrice
      | Add.NewFloatingMatrixPrice
      | Add.NewFloatingMatrixWithAllocationPrice
      | Add.NewFloatingTieredPrice
      | Add.NewFloatingTieredBpsPrice
      | Add.NewFloatingBpsPrice
      | Add.NewFloatingBulkBpsPrice
      | Add.NewFloatingBulkPrice
      | Add.NewFloatingThresholdTotalAmountPrice
      | Add.NewFloatingTieredPackagePrice
      | Add.NewFloatingGroupedTieredPrice
      | Add.NewFloatingMaxGroupTieredPackagePrice
      | Add.NewFloatingTieredWithMinimumPrice
      | Add.NewFloatingPackageWithAllocationPrice
      | Add.NewFloatingTieredPackageWithMinimumPrice
      | Add.NewFloatingUnitWithPercentPrice
      | Add.NewFloatingTieredWithProrationPrice
      | Add.NewFloatingUnitWithProrationPrice
      | Add.NewFloatingGroupedAllocationPrice
      | Add.NewFloatingGroupedWithProratedMinimumPrice
      | Add.NewFloatingGroupedWithMeteredMinimumPrice
      | Add.NewFloatingMatrixWithDisplayNamePrice
      | Add.NewFloatingBulkWithProrationPrice
      | Add.NewFloatingGroupedTieredPackagePrice
      | Add.NewFloatingScalableMatrixWithUnitPricingPrice
      | Add.NewFloatingScalableMatrixWithTieredPricingPrice
      | Add.NewFloatingCumulativeGroupedBulkPrice
      | null;

    /**
     * The id of the price to add to the subscription.
     */
    price_id?: string | null;

    /**
     * A list of customer IDs whose usage events will be aggregated and billed under
     * this subscription. By default, a subscription only considers usage events
     * associated with its attached customer's customer_id. When usage_customer_ids is
     * provided, the subscription includes usage events from the specified customers
     * only. Provided usage_customer_ids must be either the customer for this
     * subscription itself, or any of that customer's children.
     */
    usage_customer_ids?: Array<string> | null;
  }

  export namespace Add {
    /**
     * The definition of a new allocation price to create and add to the subscription.
     */
    export interface AllocationPrice {
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
       * Whether the allocated amount should expire at the end of the cadence or roll
       * over to the next period.
       */
      expires_at_end_of_cadence: boolean;
    }

    export interface AmountDiscountCreationParams {
      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount: number;

      discount_type: 'amount';
    }

    export interface PercentageDiscountCreationParams {
      discount_type: 'percentage';

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount: number;
    }

    export interface UsageDiscountCreationParams {
      discount_type: 'usage';

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for.
       */
      usage_discount: number;
    }

    export interface FixedFeeQuantityTransition {
      /**
       * The date that the fixed fee quantity transition should take effect.
       */
      effective_date: string;

      /**
       * The quantity of the fixed fee quantity transition.
       */
      quantity: number;
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

      unit_config: NewFloatingUnitPrice.UnitConfig;

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
      billing_cycle_configuration?: NewFloatingUnitPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingUnitPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingUnitPrice {
      export interface UnitConfig {
        /**
         * Rate per unit of usage
         */
        unit_amount: string;
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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

      model_type: 'package';

      /**
       * The name of the price.
       */
      name: string;

      package_config: NewFloatingPackagePrice.PackageConfig;

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
      billing_cycle_configuration?: NewFloatingPackagePrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingPackagePrice {
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

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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

      matrix_config: NewFloatingMatrixPrice.MatrixConfig;

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
      billing_cycle_configuration?: NewFloatingMatrixPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingMatrixPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingMatrixPrice {
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
        matrix_values: Array<MatrixConfig.MatrixValue>;
      }

      export namespace MatrixConfig {
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

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
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

      matrix_with_allocation_config: NewFloatingMatrixWithAllocationPrice.MatrixWithAllocationConfig;

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
      billing_cycle_configuration?: NewFloatingMatrixWithAllocationPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingMatrixWithAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingMatrixWithAllocationPrice {
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
        matrix_values: Array<MatrixWithAllocationConfig.MatrixValue>;
      }

      export namespace MatrixWithAllocationConfig {
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

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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

      model_type: 'tiered';

      /**
       * The name of the price.
       */
      name: string;

      tiered_config: NewFloatingTieredPrice.TieredConfig;

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
      billing_cycle_configuration?: NewFloatingTieredPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingTieredPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingTieredPrice {
      export interface TieredConfig {
        /**
         * Tiers for rating based on total usage quantities into the specified tier
         */
        tiers: Array<TieredConfig.Tier>;
      }

      export namespace TieredConfig {
        export interface Tier {
          /**
           * Inclusive tier starting value
           */
          first_unit: number;

          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * Exclusive tier ending value. If null, this is treated as the last tier
           */
          last_unit?: number | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewFloatingTieredBpsPrice {
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

      tiered_bps_config: NewFloatingTieredBpsPrice.TieredBpsConfig;

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
      billing_cycle_configuration?: NewFloatingTieredBpsPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingTieredBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingTieredBpsPrice {
      export interface TieredBpsConfig {
        /**
         * Tiers for a Graduated BPS pricing model, where usage is bucketed into specified
         * tiers
         */
        tiers: Array<TieredBpsConfig.Tier>;
      }

      export namespace TieredBpsConfig {
        export interface Tier {
          /**
           * Per-event basis point rate
           */
          bps: number;

          /**
           * Inclusive tier starting value
           */
          minimum_amount: string;

          /**
           * Exclusive tier ending value
           */
          maximum_amount?: string | null;

          /**
           * Per unit maximum to charge
           */
          per_unit_maximum?: string | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewFloatingBpsPrice {
      bps_config: NewFloatingBpsPrice.BpsConfig;

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
      billing_cycle_configuration?: NewFloatingBpsPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingBpsPrice {
      export interface BpsConfig {
        /**
         * Basis point take rate per event
         */
        bps: number;

        /**
         * Optional currency amount maximum to cap spend per event
         */
        per_unit_maximum?: string | null;
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewFloatingBulkBpsPrice {
      bulk_bps_config: NewFloatingBulkBpsPrice.BulkBpsConfig;

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
      billing_cycle_configuration?: NewFloatingBulkBpsPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingBulkBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingBulkBpsPrice {
      export interface BulkBpsConfig {
        /**
         * Tiers for a bulk BPS pricing model where all usage is aggregated to a single
         * tier based on total volume
         */
        tiers: Array<BulkBpsConfig.Tier>;
      }

      export namespace BulkBpsConfig {
        export interface Tier {
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
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewFloatingBulkPrice {
      bulk_config: NewFloatingBulkPrice.BulkConfig;

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
      billing_cycle_configuration?: NewFloatingBulkPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingBulkPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingBulkPrice {
      export interface BulkConfig {
        /**
         * Bulk tiers for rating based on total usage volume
         */
        tiers: Array<BulkConfig.Tier>;
      }

      export namespace BulkConfig {
        export interface Tier {
          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * Upper bound for this tier
           */
          maximum_units?: number | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingThresholdTotalAmountPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingThresholdTotalAmountPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingThresholdTotalAmountPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingTieredPackagePrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingGroupedTieredPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingGroupedTieredPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingGroupedTieredPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingMaxGroupTieredPackagePrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingMaxGroupTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingMaxGroupTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
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
      billing_cycle_configuration?: NewFloatingTieredWithMinimumPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingTieredWithMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingTieredWithMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
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
      billing_cycle_configuration?: NewFloatingPackageWithAllocationPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingPackageWithAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingPackageWithAllocationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingTieredPackageWithMinimumPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingTieredPackageWithMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingTieredPackageWithMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
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
      billing_cycle_configuration?: NewFloatingUnitWithPercentPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingUnitWithPercentPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingUnitWithPercentPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingTieredWithProrationPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingTieredWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingTieredWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingUnitWithProrationPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingUnitWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingUnitWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingGroupedAllocationPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingGroupedAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingGroupedAllocationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingGroupedWithProratedMinimumPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingGroupedWithProratedMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingGroupedWithProratedMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingGroupedWithMeteredMinimumPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingGroupedWithMeteredMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingGroupedWithMeteredMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
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
      billing_cycle_configuration?: NewFloatingMatrixWithDisplayNamePrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingMatrixWithDisplayNamePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingMatrixWithDisplayNamePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
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
      billing_cycle_configuration?: NewFloatingBulkWithProrationPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingBulkWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingBulkWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingGroupedTieredPackagePrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingGroupedTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingGroupedTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingScalableMatrixWithUnitPricingPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingScalableMatrixWithUnitPricingPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingScalableMatrixWithUnitPricingPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
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
      billing_cycle_configuration?: NewFloatingScalableMatrixWithTieredPricingPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingScalableMatrixWithTieredPricingPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingScalableMatrixWithTieredPricingPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
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
      billing_cycle_configuration?: NewFloatingCumulativeGroupedBulkPrice.BillingCycleConfiguration | null;

      /**
       * The per unit conversion rate of the price currency to the invoicing currency.
       */
      conversion_rate?: number | null;

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
      invoicing_cycle_configuration?: NewFloatingCumulativeGroupedBulkPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;
    }

    export namespace NewFloatingCumulativeGroupedBulkPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }
  }

  export interface AddAdjustment {
    /**
     * The definition of a new adjustment to create and add to the subscription.
     */
    adjustment:
      | AddAdjustment.NewPercentageDiscount
      | AddAdjustment.NewUsageDiscount
      | AddAdjustment.NewAmountDiscount
      | AddAdjustment.NewMinimum
      | AddAdjustment.NewMaximum;

    /**
     * The start date of the adjustment interval. This is the date that the adjustment
     * will start affecting prices on the subscription.
     */
    start_date: (string & {}) | Shared.BillingCycleRelativeDate;

    /**
     * The end date of the adjustment interval. This is the date that the adjustment
     * will stop affecting prices on the subscription.
     */
    end_date?: (string & {}) | Shared.BillingCycleRelativeDate | null;
  }

  export namespace AddAdjustment {
    export interface NewPercentageDiscount {
      adjustment_type: 'percentage_discount';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      percentage_discount: number;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewUsageDiscount {
      adjustment_type: 'usage_discount';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      usage_discount: number;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewAmountDiscount {
      adjustment_type: 'amount_discount';

      amount_discount: string;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMinimum {
      adjustment_type: 'minimum';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The item ID that revenue from this minimum will be attributed to.
       */
      item_id: string;

      minimum_amount: string;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMaximum {
      adjustment_type: 'maximum';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      maximum_amount: string;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }
  }

  export interface Edit {
    /**
     * The id of the price interval to edit.
     */
    price_interval_id: string;

    /**
     * The updated billing cycle day for this price interval. If not specified, the
     * billing cycle day will not be updated. Note that overlapping price intervals
     * must have the same billing cycle day.
     */
    billing_cycle_day?: number | null;

    /**
     * The updated end date of this price interval. If not specified, the start date
     * will not be updated.
     */
    end_date?: (string & {}) | Shared.BillingCycleRelativeDate | null;

    /**
     * An additional filter to apply to usage queries. This filter must be expressed as
     * a boolean
     * [computed property](/extensibility/advanced-metrics#computed-properties). If
     * null, usage queries will not include any additional filter.
     */
    filter?: string | null;

    /**
     * A list of fixed fee quantity transitions to use for this price interval. Note
     * that this list will overwrite all existing fixed fee quantity transitions on the
     * price interval.
     */
    fixed_fee_quantity_transitions?: Array<Edit.FixedFeeQuantityTransition> | null;

    /**
     * The updated start date of this price interval. If not specified, the start date
     * will not be updated.
     */
    start_date?: (string & {}) | Shared.BillingCycleRelativeDate;

    /**
     * A list of customer IDs whose usage events will be aggregated and billed under
     * this subscription. By default, a subscription only considers usage events
     * associated with its attached customer's customer_id. When usage_customer_ids is
     * provided, the subscription includes usage events from the specified customers
     * only. Provided usage_customer_ids must be either the customer for this
     * subscription itself, or any of that customer's children.
     */
    usage_customer_ids?: Array<string> | null;
  }

  export namespace Edit {
    export interface FixedFeeQuantityTransition {
      /**
       * The date that the fixed fee quantity transition should take effect.
       */
      effective_date: string;

      /**
       * The quantity of the fixed fee quantity transition.
       */
      quantity: number;
    }
  }

  export interface EditAdjustment {
    /**
     * The id of the adjustment interval to edit.
     */
    adjustment_interval_id: string;

    /**
     * The updated end date of this adjustment interval. If not specified, the start
     * date will not be updated.
     */
    end_date?: (string & {}) | Shared.BillingCycleRelativeDate | null;

    /**
     * The updated start date of this adjustment interval. If not specified, the start
     * date will not be updated.
     */
    start_date?: (string & {}) | Shared.BillingCycleRelativeDate;
  }
}

export interface SubscriptionSchedulePlanChangeParams {
  change_option: 'requested_date' | 'end_of_subscription_term' | 'immediate';

  /**
   * Additional adjustments to be added to the subscription. (Only available for
   * accounts that have migrated off of legacy subscription overrides)
   */
  add_adjustments?: Array<SubscriptionSchedulePlanChangeParams.AddAdjustment> | null;

  /**
   * Additional prices to be added to the subscription. (Only available for accounts
   * that have migrated off of legacy subscription overrides)
   */
  add_prices?: Array<SubscriptionSchedulePlanChangeParams.AddPrice> | null;

  /**
   * [DEPRECATED] Use billing_cycle_alignment instead. Reset billing periods to be
   * aligned with the plan change's effective date.
   */
  align_billing_with_plan_change_date?: boolean | null;

  /**
   * Determines whether issued invoices for this subscription will automatically be
   * charged with the saved payment method on the due date. If not specified, this
   * defaults to the behavior configured for this customer.
   */
  auto_collection?: boolean | null;

  /**
   * Reset billing periods to be aligned with the plan change's effective date or
   * start of the month. Defaults to `unchanged` which keeps subscription's existing
   * billing cycle alignment.
   */
  billing_cycle_alignment?: 'unchanged' | 'plan_change_date' | 'start_of_month' | null;

  billing_cycle_anchor_configuration?: SubscriptionSchedulePlanChangeParams.BillingCycleAnchorConfiguration | null;

  /**
   * The date that the plan change should take effect. This parameter can only be
   * passed if the `change_option` is `requested_date`. If a date with no time is
   * passed, the plan change will happen at midnight in the customer's timezone.
   */
  change_date?: string | null;

  /**
   * Redemption code to be used for this subscription. If the coupon cannot be found
   * by its redemption code, or cannot be redeemed, an error response will be
   * returned and the subscription creation or plan change will not be scheduled.
   */
  coupon_redemption_code?: string | null;

  credits_overage_rate?: number | null;

  /**
   * Determines the default memo on this subscription's invoices. Note that if this
   * is not provided, it is determined by the plan configuration.
   */
  default_invoice_memo?: string | null;

  /**
   * The external_plan_id of the plan that the given subscription should be switched
   * to. Note that either this property or `plan_id` must be specified.
   */
  external_plan_id?: string | null;

  /**
   * An additional filter to apply to usage queries. This filter must be expressed as
   * a boolean
   * [computed property](/extensibility/advanced-metrics#computed-properties). If
   * null, usage queries will not include any additional filter.
   */
  filter?: string | null;

  /**
   * The phase of the plan to start with
   */
  initial_phase_order?: number | null;

  /**
   * When this subscription's accrued usage reaches this threshold, an invoice will
   * be issued for the subscription. If not specified, invoices will only be issued
   * at the end of the billing period.
   */
  invoicing_threshold?: string | null;

  /**
   * The net terms determines the difference between the invoice date and the issue
   * date for the invoice. If you intend the invoice to be due on issue, set this
   * to 0. If not provided, this defaults to the value specified in the plan.
   */
  net_terms?: number | null;

  per_credit_overage_amount?: number | null;

  /**
   * The plan that the given subscription should be switched to. Note that either
   * this property or `external_plan_id` must be specified.
   */
  plan_id?: string | null;

  /**
   * Specifies which version of the plan to change to. If null, the default version
   * will be used.
   */
  plan_version_number?: number | null;

  /**
   * Optionally provide a list of overrides for prices on the plan
   */
  price_overrides?: Array<unknown> | null;

  /**
   * Plan adjustments to be removed from the subscription. (Only available for
   * accounts that have migrated off of legacy subscription overrides)
   */
  remove_adjustments?: Array<SubscriptionSchedulePlanChangeParams.RemoveAdjustment> | null;

  /**
   * Plan prices to be removed from the subscription. (Only available for accounts
   * that have migrated off of legacy subscription overrides)
   */
  remove_prices?: Array<SubscriptionSchedulePlanChangeParams.RemovePrice> | null;

  /**
   * Plan adjustments to be replaced with additional adjustments on the subscription.
   * (Only available for accounts that have migrated off of legacy subscription
   * overrides)
   */
  replace_adjustments?: Array<SubscriptionSchedulePlanChangeParams.ReplaceAdjustment> | null;

  /**
   * Plan prices to be replaced with additional prices on the subscription. (Only
   * available for accounts that have migrated off of legacy subscription overrides)
   */
  replace_prices?: Array<SubscriptionSchedulePlanChangeParams.ReplacePrice> | null;

  /**
   * The duration of the trial period in days. If not provided, this defaults to the
   * value specified in the plan. If `0` is provided, the trial on the plan will be
   * skipped.
   */
  trial_duration_days?: number | null;

  /**
   * A list of customer IDs whose usage events will be aggregated and billed under
   * this subscription. By default, a subscription only considers usage events
   * associated with its attached customer's customer_id. When usage_customer_ids is
   * provided, the subscription includes usage events from the specified customers
   * only. Provided usage_customer_ids must be either the customer for this
   * subscription itself, or any of that customer's children.
   */
  usage_customer_ids?: Array<string> | null;
}

export namespace SubscriptionSchedulePlanChangeParams {
  export interface AddAdjustment {
    /**
     * The definition of a new adjustment to create and add to the subscription.
     */
    adjustment:
      | AddAdjustment.NewPercentageDiscount
      | AddAdjustment.NewUsageDiscount
      | AddAdjustment.NewAmountDiscount
      | AddAdjustment.NewMinimum
      | AddAdjustment.NewMaximum;

    /**
     * The end date of the adjustment interval. This is the date that the adjustment
     * will stop affecting prices on the subscription.
     */
    end_date?: string | null;

    /**
     * The phase to add this adjustment to.
     */
    plan_phase_order?: number | null;

    /**
     * The start date of the adjustment interval. This is the date that the adjustment
     * will start affecting prices on the subscription. If null, the adjustment will
     * start when the phase or subscription starts.
     */
    start_date?: string | null;
  }

  export namespace AddAdjustment {
    export interface NewPercentageDiscount {
      adjustment_type: 'percentage_discount';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      percentage_discount: number;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewUsageDiscount {
      adjustment_type: 'usage_discount';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      usage_discount: number;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewAmountDiscount {
      adjustment_type: 'amount_discount';

      amount_discount: string;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMinimum {
      adjustment_type: 'minimum';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The item ID that revenue from this minimum will be attributed to.
       */
      item_id: string;

      minimum_amount: string;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMaximum {
      adjustment_type: 'maximum';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      maximum_amount: string;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }
  }

  export interface AddPrice {
    /**
     * The definition of a new allocation price to create and add to the subscription.
     */
    allocation_price?: AddPrice.AllocationPrice | null;

    /**
     * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's
     * discounts for this price.
     */
    discounts?: Array<AddPrice.Discount> | null;

    /**
     * The end date of the price interval. This is the date that the price will stop
     * billing on the subscription. If null, billing will end when the phase or
     * subscription ends.
     */
    end_date?: string | null;

    /**
     * The external price id of the price to add to the subscription.
     */
    external_price_id?: string | null;

    /**
     * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's maximum
     * amount for this price.
     */
    maximum_amount?: string | null;

    /**
     * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's minimum
     * amount for this price.
     */
    minimum_amount?: string | null;

    /**
     * The phase to add this price to.
     */
    plan_phase_order?: number | null;

    /**
     * The definition of a new price to create and add to the subscription.
     */
    price?:
      | AddPrice.NewSubscriptionUnitPrice
      | AddPrice.NewSubscriptionPackagePrice
      | AddPrice.NewSubscriptionMatrixPrice
      | AddPrice.NewSubscriptionTieredPrice
      | AddPrice.NewSubscriptionTieredBpsPrice
      | AddPrice.NewSubscriptionBpsPrice
      | AddPrice.NewSubscriptionBulkBpsPrice
      | AddPrice.NewSubscriptionBulkPrice
      | AddPrice.NewSubscriptionThresholdTotalAmountPrice
      | AddPrice.NewSubscriptionTieredPackagePrice
      | AddPrice.NewSubscriptionTieredWithMinimumPrice
      | AddPrice.NewSubscriptionUnitWithPercentPrice
      | AddPrice.NewSubscriptionPackageWithAllocationPrice
      | AddPrice.NewSubscriptionTierWithProrationPrice
      | AddPrice.NewSubscriptionUnitWithProrationPrice
      | AddPrice.NewSubscriptionGroupedAllocationPrice
      | AddPrice.NewSubscriptionGroupedWithProratedMinimumPrice
      | AddPrice.NewSubscriptionBulkWithProrationPrice
      | AddPrice.NewSubscriptionScalableMatrixWithUnitPricingPrice
      | AddPrice.NewSubscriptionScalableMatrixWithTieredPricingPrice
      | AddPrice.NewSubscriptionCumulativeGroupedBulkPrice
      | AddPrice.NewSubscriptionMaxGroupTieredPackagePrice
      | AddPrice.NewSubscriptionGroupedWithMeteredMinimumPrice
      | AddPrice.NewSubscriptionMatrixWithDisplayNamePrice
      | AddPrice.NewSubscriptionGroupedTieredPackagePrice
      | null;

    /**
     * The id of the price to add to the subscription.
     */
    price_id?: string | null;

    /**
     * The start date of the price interval. This is the date that the price will start
     * billing on the subscription. If null, billing will start when the phase or
     * subscription starts.
     */
    start_date?: string | null;
  }

  export namespace AddPrice {
    /**
     * The definition of a new allocation price to create and add to the subscription.
     */
    export interface AllocationPrice {
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
       * Whether the allocated amount should expire at the end of the cadence or roll
       * over to the next period.
       */
      expires_at_end_of_cadence: boolean;
    }

    export interface Discount {
      discount_type: 'percentage' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }

    export interface NewSubscriptionUnitPrice {
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

      unit_config: NewSubscriptionUnitPrice.UnitConfig;

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
      billing_cycle_configuration?: NewSubscriptionUnitPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionUnitPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionUnitPrice {
      export interface UnitConfig {
        /**
         * Rate per unit of usage
         */
        unit_amount: string;
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionPackagePrice {
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

      package_config: NewSubscriptionPackagePrice.PackageConfig;

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
      billing_cycle_configuration?: NewSubscriptionPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionPackagePrice {
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

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionMatrixPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      matrix_config: NewSubscriptionMatrixPrice.MatrixConfig;

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
      billing_cycle_configuration?: NewSubscriptionMatrixPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionMatrixPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionMatrixPrice {
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
        matrix_values: Array<MatrixConfig.MatrixValue>;
      }

      export namespace MatrixConfig {
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

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredPrice {
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

      tiered_config: NewSubscriptionTieredPrice.TieredConfig;

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
      billing_cycle_configuration?: NewSubscriptionTieredPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredPrice {
      export interface TieredConfig {
        /**
         * Tiers for rating based on total usage quantities into the specified tier
         */
        tiers: Array<TieredConfig.Tier>;
      }

      export namespace TieredConfig {
        export interface Tier {
          /**
           * Inclusive tier starting value
           */
          first_unit: number;

          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * Exclusive tier ending value. If null, this is treated as the last tier
           */
          last_unit?: number | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredBpsPrice {
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

      tiered_bps_config: NewSubscriptionTieredBpsPrice.TieredBpsConfig;

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
      billing_cycle_configuration?: NewSubscriptionTieredBpsPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredBpsPrice {
      export interface TieredBpsConfig {
        /**
         * Tiers for a Graduated BPS pricing model, where usage is bucketed into specified
         * tiers
         */
        tiers: Array<TieredBpsConfig.Tier>;
      }

      export namespace TieredBpsConfig {
        export interface Tier {
          /**
           * Per-event basis point rate
           */
          bps: number;

          /**
           * Inclusive tier starting value
           */
          minimum_amount: string;

          /**
           * Exclusive tier ending value
           */
          maximum_amount?: string | null;

          /**
           * Per unit maximum to charge
           */
          per_unit_maximum?: string | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBpsPrice {
      bps_config: NewSubscriptionBpsPrice.BpsConfig;

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
      billing_cycle_configuration?: NewSubscriptionBpsPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBpsPrice {
      export interface BpsConfig {
        /**
         * Basis point take rate per event
         */
        bps: number;

        /**
         * Optional currency amount maximum to cap spend per event
         */
        per_unit_maximum?: string | null;
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBulkBpsPrice {
      bulk_bps_config: NewSubscriptionBulkBpsPrice.BulkBpsConfig;

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
      billing_cycle_configuration?: NewSubscriptionBulkBpsPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBulkBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBulkBpsPrice {
      export interface BulkBpsConfig {
        /**
         * Tiers for a bulk BPS pricing model where all usage is aggregated to a single
         * tier based on total volume
         */
        tiers: Array<BulkBpsConfig.Tier>;
      }

      export namespace BulkBpsConfig {
        export interface Tier {
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
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBulkPrice {
      bulk_config: NewSubscriptionBulkPrice.BulkConfig;

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
      billing_cycle_configuration?: NewSubscriptionBulkPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBulkPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBulkPrice {
      export interface BulkConfig {
        /**
         * Bulk tiers for rating based on total usage volume
         */
        tiers: Array<BulkConfig.Tier>;
      }

      export namespace BulkConfig {
        export interface Tier {
          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * Upper bound for this tier
           */
          maximum_units?: number | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionThresholdTotalAmountPrice {
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
      billing_cycle_configuration?: NewSubscriptionThresholdTotalAmountPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionThresholdTotalAmountPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionThresholdTotalAmountPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredPackagePrice {
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
      billing_cycle_configuration?: NewSubscriptionTieredPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredWithMinimumPrice {
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
      billing_cycle_configuration?: NewSubscriptionTieredWithMinimumPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredWithMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredWithMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionUnitWithPercentPrice {
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
      billing_cycle_configuration?: NewSubscriptionUnitWithPercentPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionUnitWithPercentPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionUnitWithPercentPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionPackageWithAllocationPrice {
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
      billing_cycle_configuration?: NewSubscriptionPackageWithAllocationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionPackageWithAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionPackageWithAllocationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTierWithProrationPrice {
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
      billing_cycle_configuration?: NewSubscriptionTierWithProrationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTierWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTierWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionUnitWithProrationPrice {
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
      billing_cycle_configuration?: NewSubscriptionUnitWithProrationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionUnitWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionUnitWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedAllocationPrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedAllocationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedAllocationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedWithProratedMinimumPrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedWithProratedMinimumPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedWithProratedMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedWithProratedMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBulkWithProrationPrice {
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
      billing_cycle_configuration?: NewSubscriptionBulkWithProrationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBulkWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBulkWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionScalableMatrixWithUnitPricingPrice {
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
      billing_cycle_configuration?: NewSubscriptionScalableMatrixWithUnitPricingPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionScalableMatrixWithUnitPricingPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionScalableMatrixWithUnitPricingPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionScalableMatrixWithTieredPricingPrice {
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
      billing_cycle_configuration?: NewSubscriptionScalableMatrixWithTieredPricingPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionScalableMatrixWithTieredPricingPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionScalableMatrixWithTieredPricingPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionCumulativeGroupedBulkPrice {
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
      billing_cycle_configuration?: NewSubscriptionCumulativeGroupedBulkPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionCumulativeGroupedBulkPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionCumulativeGroupedBulkPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionMaxGroupTieredPackagePrice {
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
      billing_cycle_configuration?: NewSubscriptionMaxGroupTieredPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionMaxGroupTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionMaxGroupTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedWithMeteredMinimumPrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedWithMeteredMinimumPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedWithMeteredMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedWithMeteredMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionMatrixWithDisplayNamePrice {
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
      billing_cycle_configuration?: NewSubscriptionMatrixWithDisplayNamePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionMatrixWithDisplayNamePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionMatrixWithDisplayNamePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedTieredPackagePrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedTieredPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }
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

  export interface RemoveAdjustment {
    /**
     * The id of the adjustment to remove on the subscription.
     */
    adjustment_id: string;
  }

  export interface RemovePrice {
    /**
     * The external price id of the price to remove on the subscription.
     */
    external_price_id?: string | null;

    /**
     * The id of the price to remove on the subscription.
     */
    price_id?: string | null;
  }

  export interface ReplaceAdjustment {
    /**
     * The definition of a new adjustment to create and add to the subscription.
     */
    adjustment:
      | ReplaceAdjustment.NewPercentageDiscount
      | ReplaceAdjustment.NewUsageDiscount
      | ReplaceAdjustment.NewAmountDiscount
      | ReplaceAdjustment.NewMinimum
      | ReplaceAdjustment.NewMaximum;

    /**
     * The id of the adjustment on the plan to replace in the subscription.
     */
    replaces_adjustment_id: string;
  }

  export namespace ReplaceAdjustment {
    export interface NewPercentageDiscount {
      adjustment_type: 'percentage_discount';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      percentage_discount: number;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewUsageDiscount {
      adjustment_type: 'usage_discount';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      usage_discount: number;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewAmountDiscount {
      adjustment_type: 'amount_discount';

      amount_discount: string;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMinimum {
      adjustment_type: 'minimum';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      /**
       * The item ID that revenue from this minimum will be attributed to.
       */
      item_id: string;

      minimum_amount: string;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }

    export interface NewMaximum {
      adjustment_type: 'maximum';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      maximum_amount: string;

      /**
       * When false, this adjustment will be applied to a single price. Otherwise, it
       * will be applied at the invoice level, possibly to multiple prices.
       */
      is_invoice_level?: boolean;
    }
  }

  export interface ReplacePrice {
    /**
     * The id of the price on the plan to replace in the subscription.
     */
    replaces_price_id: string;

    /**
     * The definition of a new allocation price to create and add to the subscription.
     */
    allocation_price?: ReplacePrice.AllocationPrice | null;

    /**
     * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's
     * discounts for the replacement price.
     */
    discounts?: Array<ReplacePrice.Discount> | null;

    /**
     * The external price id of the price to add to the subscription.
     */
    external_price_id?: string | null;

    /**
     * The new quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's maximum
     * amount for the replacement price.
     */
    maximum_amount?: string | null;

    /**
     * @deprecated [DEPRECATED] Use add_adjustments instead. The subscription's minimum
     * amount for the replacement price.
     */
    minimum_amount?: string | null;

    /**
     * The definition of a new price to create and add to the subscription.
     */
    price?:
      | ReplacePrice.NewSubscriptionUnitPrice
      | ReplacePrice.NewSubscriptionPackagePrice
      | ReplacePrice.NewSubscriptionMatrixPrice
      | ReplacePrice.NewSubscriptionTieredPrice
      | ReplacePrice.NewSubscriptionTieredBpsPrice
      | ReplacePrice.NewSubscriptionBpsPrice
      | ReplacePrice.NewSubscriptionBulkBpsPrice
      | ReplacePrice.NewSubscriptionBulkPrice
      | ReplacePrice.NewSubscriptionThresholdTotalAmountPrice
      | ReplacePrice.NewSubscriptionTieredPackagePrice
      | ReplacePrice.NewSubscriptionTieredWithMinimumPrice
      | ReplacePrice.NewSubscriptionUnitWithPercentPrice
      | ReplacePrice.NewSubscriptionPackageWithAllocationPrice
      | ReplacePrice.NewSubscriptionTierWithProrationPrice
      | ReplacePrice.NewSubscriptionUnitWithProrationPrice
      | ReplacePrice.NewSubscriptionGroupedAllocationPrice
      | ReplacePrice.NewSubscriptionGroupedWithProratedMinimumPrice
      | ReplacePrice.NewSubscriptionBulkWithProrationPrice
      | ReplacePrice.NewSubscriptionScalableMatrixWithUnitPricingPrice
      | ReplacePrice.NewSubscriptionScalableMatrixWithTieredPricingPrice
      | ReplacePrice.NewSubscriptionCumulativeGroupedBulkPrice
      | ReplacePrice.NewSubscriptionMaxGroupTieredPackagePrice
      | ReplacePrice.NewSubscriptionGroupedWithMeteredMinimumPrice
      | ReplacePrice.NewSubscriptionMatrixWithDisplayNamePrice
      | ReplacePrice.NewSubscriptionGroupedTieredPackagePrice
      | null;

    /**
     * The id of the price to add to the subscription.
     */
    price_id?: string | null;
  }

  export namespace ReplacePrice {
    /**
     * The definition of a new allocation price to create and add to the subscription.
     */
    export interface AllocationPrice {
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
       * Whether the allocated amount should expire at the end of the cadence or roll
       * over to the next period.
       */
      expires_at_end_of_cadence: boolean;
    }

    export interface Discount {
      discount_type: 'percentage' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }

    export interface NewSubscriptionUnitPrice {
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

      unit_config: NewSubscriptionUnitPrice.UnitConfig;

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
      billing_cycle_configuration?: NewSubscriptionUnitPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionUnitPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionUnitPrice {
      export interface UnitConfig {
        /**
         * Rate per unit of usage
         */
        unit_amount: string;
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionPackagePrice {
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

      package_config: NewSubscriptionPackagePrice.PackageConfig;

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
      billing_cycle_configuration?: NewSubscriptionPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionPackagePrice {
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

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionMatrixPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time' | 'custom';

      /**
       * The id of the item the price will be associated with.
       */
      item_id: string;

      matrix_config: NewSubscriptionMatrixPrice.MatrixConfig;

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
      billing_cycle_configuration?: NewSubscriptionMatrixPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionMatrixPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionMatrixPrice {
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
        matrix_values: Array<MatrixConfig.MatrixValue>;
      }

      export namespace MatrixConfig {
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

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredPrice {
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

      tiered_config: NewSubscriptionTieredPrice.TieredConfig;

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
      billing_cycle_configuration?: NewSubscriptionTieredPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredPrice {
      export interface TieredConfig {
        /**
         * Tiers for rating based on total usage quantities into the specified tier
         */
        tiers: Array<TieredConfig.Tier>;
      }

      export namespace TieredConfig {
        export interface Tier {
          /**
           * Inclusive tier starting value
           */
          first_unit: number;

          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * Exclusive tier ending value. If null, this is treated as the last tier
           */
          last_unit?: number | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredBpsPrice {
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

      tiered_bps_config: NewSubscriptionTieredBpsPrice.TieredBpsConfig;

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
      billing_cycle_configuration?: NewSubscriptionTieredBpsPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredBpsPrice {
      export interface TieredBpsConfig {
        /**
         * Tiers for a Graduated BPS pricing model, where usage is bucketed into specified
         * tiers
         */
        tiers: Array<TieredBpsConfig.Tier>;
      }

      export namespace TieredBpsConfig {
        export interface Tier {
          /**
           * Per-event basis point rate
           */
          bps: number;

          /**
           * Inclusive tier starting value
           */
          minimum_amount: string;

          /**
           * Exclusive tier ending value
           */
          maximum_amount?: string | null;

          /**
           * Per unit maximum to charge
           */
          per_unit_maximum?: string | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBpsPrice {
      bps_config: NewSubscriptionBpsPrice.BpsConfig;

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
      billing_cycle_configuration?: NewSubscriptionBpsPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBpsPrice {
      export interface BpsConfig {
        /**
         * Basis point take rate per event
         */
        bps: number;

        /**
         * Optional currency amount maximum to cap spend per event
         */
        per_unit_maximum?: string | null;
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBulkBpsPrice {
      bulk_bps_config: NewSubscriptionBulkBpsPrice.BulkBpsConfig;

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
      billing_cycle_configuration?: NewSubscriptionBulkBpsPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBulkBpsPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBulkBpsPrice {
      export interface BulkBpsConfig {
        /**
         * Tiers for a bulk BPS pricing model where all usage is aggregated to a single
         * tier based on total volume
         */
        tiers: Array<BulkBpsConfig.Tier>;
      }

      export namespace BulkBpsConfig {
        export interface Tier {
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
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBulkPrice {
      bulk_config: NewSubscriptionBulkPrice.BulkConfig;

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
      billing_cycle_configuration?: NewSubscriptionBulkPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBulkPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBulkPrice {
      export interface BulkConfig {
        /**
         * Bulk tiers for rating based on total usage volume
         */
        tiers: Array<BulkConfig.Tier>;
      }

      export namespace BulkConfig {
        export interface Tier {
          /**
           * Amount per unit
           */
          unit_amount: string;

          /**
           * Upper bound for this tier
           */
          maximum_units?: number | null;
        }
      }

      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionThresholdTotalAmountPrice {
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
      billing_cycle_configuration?: NewSubscriptionThresholdTotalAmountPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionThresholdTotalAmountPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionThresholdTotalAmountPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredPackagePrice {
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
      billing_cycle_configuration?: NewSubscriptionTieredPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTieredWithMinimumPrice {
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
      billing_cycle_configuration?: NewSubscriptionTieredWithMinimumPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTieredWithMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTieredWithMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionUnitWithPercentPrice {
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
      billing_cycle_configuration?: NewSubscriptionUnitWithPercentPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionUnitWithPercentPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionUnitWithPercentPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionPackageWithAllocationPrice {
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
      billing_cycle_configuration?: NewSubscriptionPackageWithAllocationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionPackageWithAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionPackageWithAllocationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionTierWithProrationPrice {
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
      billing_cycle_configuration?: NewSubscriptionTierWithProrationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionTierWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionTierWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionUnitWithProrationPrice {
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
      billing_cycle_configuration?: NewSubscriptionUnitWithProrationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionUnitWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionUnitWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedAllocationPrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedAllocationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedAllocationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedAllocationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedWithProratedMinimumPrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedWithProratedMinimumPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedWithProratedMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedWithProratedMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionBulkWithProrationPrice {
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
      billing_cycle_configuration?: NewSubscriptionBulkWithProrationPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionBulkWithProrationPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionBulkWithProrationPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionScalableMatrixWithUnitPricingPrice {
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
      billing_cycle_configuration?: NewSubscriptionScalableMatrixWithUnitPricingPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionScalableMatrixWithUnitPricingPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionScalableMatrixWithUnitPricingPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionScalableMatrixWithTieredPricingPrice {
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
      billing_cycle_configuration?: NewSubscriptionScalableMatrixWithTieredPricingPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionScalableMatrixWithTieredPricingPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionScalableMatrixWithTieredPricingPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionCumulativeGroupedBulkPrice {
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
      billing_cycle_configuration?: NewSubscriptionCumulativeGroupedBulkPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionCumulativeGroupedBulkPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionCumulativeGroupedBulkPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionMaxGroupTieredPackagePrice {
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
      billing_cycle_configuration?: NewSubscriptionMaxGroupTieredPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionMaxGroupTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionMaxGroupTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedWithMeteredMinimumPrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedWithMeteredMinimumPrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedWithMeteredMinimumPrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedWithMeteredMinimumPrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionMatrixWithDisplayNamePrice {
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
      billing_cycle_configuration?: NewSubscriptionMatrixWithDisplayNamePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionMatrixWithDisplayNamePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionMatrixWithDisplayNamePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }

    export interface NewSubscriptionGroupedTieredPackagePrice {
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
      billing_cycle_configuration?: NewSubscriptionGroupedTieredPackagePrice.BillingCycleConfiguration | null;

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
      invoicing_cycle_configuration?: NewSubscriptionGroupedTieredPackagePrice.InvoicingCycleConfiguration | null;

      /**
       * User-specified key/value pairs for the resource. Individual keys can be removed
       * by setting the value to `null`, and the entire metadata mapping can be cleared
       * by setting `metadata` to `null`.
       */
      metadata?: Record<string, string | null> | null;

      /**
       * A transient ID that can be used to reference this price when adding adjustments
       * in the same API call.
       */
      reference_id?: string | null;
    }

    export namespace NewSubscriptionGroupedTieredPackagePrice {
      /**
       * For custom cadence: specifies the duration of the billing period in days or
       * months.
       */
      export interface BillingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }

      /**
       * Within each billing cycle, specifies the cadence at which invoices are produced.
       * If unspecified, a single invoice is produced per billing cycle.
       */
      export interface InvoicingCycleConfiguration {
        /**
         * The duration of the billing period.
         */
        duration: number;

        /**
         * The unit of billing period duration.
         */
        duration_unit: 'day' | 'month';
      }
    }
  }
}

export interface SubscriptionTriggerPhaseParams {
  /**
   * If false, this request will fail if it would void an issued invoice or create a
   * credit note. Consider using this as a safety mechanism if you do not expect
   * existing invoices to be changed.
   */
  allow_invoice_credit_or_void?: boolean | null;

  /**
   * The date on which the phase change should take effect. If not provided, defaults
   * to today in the customer's timezone.
   */
  effective_date?: string | null;
}

export interface SubscriptionUnscheduleFixedFeeQuantityUpdatesParams {
  /**
   * Price for which the updates should be cleared. Must be a fixed fee.
   */
  price_id: string;
}

export interface SubscriptionUpdateFixedFeeQuantityParams {
  /**
   * Price for which the quantity should be updated. Must be a fixed fee.
   */
  price_id: string;

  quantity: number;

  /**
   * If false, this request will fail if it would void an issued invoice or create a
   * credit note. Consider using this as a safety mechanism if you do not expect
   * existing invoices to be changed.
   */
  allow_invoice_credit_or_void?: boolean | null;

  /**
   * Determines when the change takes effect. Note that if `effective_date` is
   * specified, this defaults to `effective_date`. Otherwise, this defaults to
   * `immediate` unless it's explicitly set to `upcoming_invoice`.
   */
  change_option?: 'immediate' | 'upcoming_invoice' | 'effective_date';

  /**
   * The date that the quantity change should take effect, localized to the
   * customer's timezone. Ifthis parameter is not passed in, the quantity change is
   * effective according to `change_option`.
   */
  effective_date?: string | null;
}

export interface SubscriptionUpdateTrialParams {
  /**
   * The new date that the trial should end, or the literal string `immediate` to end
   * the trial immediately.
   */
  trial_end_date: (string & {}) | 'immediate';

  /**
   * If true, shifts subsequent price and adjustment intervals (preserving their
   * durations, but adjusting their absolute dates).
   */
  shift?: boolean;
}

Subscriptions.SubscriptionsPage = SubscriptionsPage;
Subscriptions.SubscriptionFetchScheduleResponsesPage = SubscriptionFetchScheduleResponsesPage;

export declare namespace Subscriptions {
  export {
    type Subscription as Subscription,
    type SubscriptionUsage as SubscriptionUsage,
    type Subscriptions as Subscriptions,
    type SubscriptionCreateResponse as SubscriptionCreateResponse,
    type SubscriptionCancelResponse as SubscriptionCancelResponse,
    type SubscriptionFetchCostsResponse as SubscriptionFetchCostsResponse,
    type SubscriptionFetchScheduleResponse as SubscriptionFetchScheduleResponse,
    type SubscriptionPriceIntervalsResponse as SubscriptionPriceIntervalsResponse,
    type SubscriptionSchedulePlanChangeResponse as SubscriptionSchedulePlanChangeResponse,
    type SubscriptionTriggerPhaseResponse as SubscriptionTriggerPhaseResponse,
    type SubscriptionUnscheduleCancellationResponse as SubscriptionUnscheduleCancellationResponse,
    type SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse as SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse,
    type SubscriptionUnschedulePendingPlanChangesResponse as SubscriptionUnschedulePendingPlanChangesResponse,
    type SubscriptionUpdateFixedFeeQuantityResponse as SubscriptionUpdateFixedFeeQuantityResponse,
    type SubscriptionUpdateTrialResponse as SubscriptionUpdateTrialResponse,
    SubscriptionsPage as SubscriptionsPage,
    SubscriptionFetchScheduleResponsesPage as SubscriptionFetchScheduleResponsesPage,
    type SubscriptionCreateParams as SubscriptionCreateParams,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
    type SubscriptionCancelParams as SubscriptionCancelParams,
    type SubscriptionFetchCostsParams as SubscriptionFetchCostsParams,
    type SubscriptionFetchScheduleParams as SubscriptionFetchScheduleParams,
    type SubscriptionFetchUsageParams as SubscriptionFetchUsageParams,
    type SubscriptionPriceIntervalsParams as SubscriptionPriceIntervalsParams,
    type SubscriptionSchedulePlanChangeParams as SubscriptionSchedulePlanChangeParams,
    type SubscriptionTriggerPhaseParams as SubscriptionTriggerPhaseParams,
    type SubscriptionUnscheduleFixedFeeQuantityUpdatesParams as SubscriptionUnscheduleFixedFeeQuantityUpdatesParams,
    type SubscriptionUpdateFixedFeeQuantityParams as SubscriptionUpdateFixedFeeQuantityParams,
    type SubscriptionUpdateTrialParams as SubscriptionUpdateTrialParams,
  };
}
