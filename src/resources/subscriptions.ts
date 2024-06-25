// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as SubscriptionsAPI from './subscriptions';
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
   * [Subscription](../guides/concepts#subscription) for more details).
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
   * ## Price overrides
   *
   * Price overrides are used to update some or all prices in a plan for the specific
   * subscription being created. This is useful when a new customer has negotiated
   * one or more different prices for a specific plan than the plan's default prices.
   * Any type of price can be overridden, if the correct data is provided. The
   * billable metric, cadence, type, and name of a price can not be overridden.
   *
   * To override prices, provide a list of objects with the key `price_overrides`.
   * The price object in the list of overrides is expected to contain the existing
   * price id, the `model_type` and config value in the format below. The specific
   * numerical values can be updated, but the config value and `model_type` must
   * match the existing price that is being overridden
   *
   * ### Request format for price overrides
   *
   * Orb supports a few different pricing models out of the box. The `model_type`
   * field determines the key for the configuration object that is present.
   *
   * ### Unit pricing
   *
   * With unit pricing, each unit costs a fixed amount.
   *
   * ```json
   * {
   *   ...
   *   "id": "price_id",
   *   "model_type": "unit",
   *   "unit_config": {
   *     "unit_amount": "0.50"
   *   }
   *   ...
   * }
   * ```
   *
   * ### Tiered pricing
   *
   * In tiered pricing, the cost of a given unit depends on the tier range that it
   * falls into, where each tier range is defined by an upper and lower bound. For
   * example, the first ten units may cost $0.50 each and all units thereafter may
   * cost $0.10 each. Tiered prices can be overridden with a new number of tiers or
   * new values for `first_unit`, `last_unit`, or `unit_amount`.
   *
   * ```json
   * {
   *   ...
   *   "id": "price_id",
   *   "model_type": "tiered",
   *   "tiered_config": {
   *     "tiers": [
   *       {
   *         "first_unit":"1",
   *         "last_unit": "10",
   *         "unit_amount": "0.50"
   *       },
   *       {
   *         "first_unit": "10",
   *         "last_unit": null,
   *         "unit_amount": "0.10"
   *       }
   *     ]
   *   }
   *   ...
   * }
   * ```
   *
   * ### Bulk pricing
   *
   * Bulk pricing applies when the number of units determine the cost of _all_ units.
   * For example, if you've bought less than 10 units, they may each be $0.50 for a
   * total of $5.00. Once you've bought more than 10 units, all units may now be
   * priced at $0.40 (i.e. 101 units total would be $40.40). Bulk prices can be
   * overridden with a new number of tiers or new values for `maximum_units`, or
   * `unit_amount`.
   *
   * ```json
   * {
   *   ...
   *   "id": "price_id",
   *   "model_type": "bulk",
   *   "bulk_config": {
   *     "tiers": [
   *       {
   *         "maximum_units": "10",
   *         "unit_amount": "0.50"
   *       },
   *       {
   *         "maximum_units": "1000",
   *         "unit_amount": "0.40"
   *       }
   *     ]
   *   }
   *   ...
   * }
   * ```
   *
   * ### Package pricing
   *
   * Package pricing defines the size or granularity of a unit for billing purposes.
   * For example, if the package size is set to 5, then 4 units will be billed as 5
   * and 6 units will be billed at 10.
   *
   * ```json
   * {
   *   ...
   *   "id": "price_id",
   *   "model_type": "package",
   *   "package_config": {
   *     "package_amount": "0.80",
   *     "package_size": 10
   *   }
   *   ...
   * }
   * ```
   *
   * ### BPS pricing
   *
   * BPS pricing specifies a per-event (e.g. per-payment) rate in one hundredth of a
   * percent (the number of basis points to charge), as well as a cap per event to
   * assess. For example, this would allow you to assess a fee of 0.25% on every
   * payment you process, with a maximum charge of $25 per payment.
   *
   * ```json
   * {
   *   ...
   *   "id": "price_id"
   *   "model_type": "bps",
   *   "bps_config": {
   *     "bps": 125,
   *     "per_event_cap": "11.00"
   *   }
   *   ...
   * }
   * ```
   *
   * ### Bulk BPS pricing
   *
   * Bulk BPS pricing specifies BPS parameters in a tiered manner, dependent on the
   * total quantity across all events. Similar to bulk pricing, the BPS parameters of
   * a given event depends on the tier range that the billing period falls into. Each
   * tier range is defined by an upper and lower bound. For example, after $1.5M of
   * payment volume is reached, each individual payment may have a lower cap or a
   * smaller take-rate.
   *
   * ```json
   * {
   *   ...
   *   "id": "price_id"
   *   "model_type": "bulk_bps",
   *   "bulk_bps_config": {
   *     "tiers": [
   *       {
   *         "minimum_amount": "0.00",
   *         "maximum_amount": "1000000.00",
   *         "bps": 125,
   *         "per_event_cap": "19.00"
   *       },
   *       {
   *         "minimum_amount":"1000000.00",
   *         "maximum_amount": null,
   *         "bps": 115,
   *         "per_event_cap": "4.00"
   *       }
   *     ]
   *   }
   * ...
   * }
   * ```
   *
   * ### Tiered BPS pricing
   *
   * Tiered BPS pricing specifies BPS parameters in a graduated manner, where an
   * event's applicable parameter is a function of its marginal addition to the
   * period total. Similar to tiered pricing, the BPS parameters of a given event
   * depends on the tier range that it falls into, where each tier range is defined
   * by an upper and lower bound. For example, the first few payments may have a 0.8
   * BPS take-rate and all payments after a specific volume may incur a take-rate of
   * 0.5 BPS each.
   *
   * ```json
   * {
   *   ...
   *   "id": "price_id"
   *   "model_type": "tiered_bps",
   *   "tiered_bps_config": {
   *     "tiers": [
   *       {
   *         "minimum_amount": "0.00",
   *         "maximum_amount": "1000000.00",
   *         "bps": 125,
   *         "per_event_cap": "19.00"
   *       },
   *       {
   *         "minimum_amount":"1000000",
   *         "maximum_amount": null,
   *         "bps": 115,
   *         "per_event_cap": "4.00"
   *       }
   *     ]
   *   }
   *   ...
   * }
   * ```
   *
   * ### Matrix pricing
   *
   * Matrix pricing defines a set of unit prices in a one or two-dimensional matrix.
   * `dimensions` defines the two event property values evaluated in this pricing
   * model. In a one-dimensional matrix, the second value is `null`. Every
   * configuration has a list of `matrix_values` which give the unit prices for
   * specified property values. In a one-dimensional matrix, the matrix values will
   * have `dimension_values` where the second value of the pair is null. If an event
   * does not match any of the dimension values in the matrix, it will resort to the
   * `default_unit_amount`.
   *
   * ```json
   * {
   *   ...
   *   "model_type": "matrix",
   *   "matrix_config": {
   *     "default_unit_amount": "3.00",
   *     "dimensions": [
   *       "cluster_name",
   *       "region"
   *     ],
   *     "matrix_values": [
   *       {
   *         "dimension_values": [
   *           "alpha",
   *           "west"
   *         ],
   *         "unit_amount": "2.00"
   *       },
   *       ...
   *     ]
   *   }
   * }
   * ```
   *
   * ### Fixed fees
   *
   * Fixed fees follow unit pricing, and also have an additional parameter
   * `fixed_price_quantity` that indicates how many of a fixed fee that should be
   * applied for a subscription. This parameter defaults to 1.
   *
   * ```json
   * {
   *   ...
   *   "id": "price_id",
   *   "model_type": "unit",
   *   "unit_config": {
   *     "unit_amount": "2.00"
   *   },
   *   "fixed_price_quantity": 3.0
   *   ...
   * }
   * ```
   *
   * ## Maximums and Minimums
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
   * ## Discounts
   *
   * Discounts, like price overrides, can be useful when a new customer has
   * negotiated a new or different discount than the default for a price. A single
   * price price can have at most one discount. If a discount exists for a price and
   * a null discount is provided on creation, then there will be no discount on the
   * new subscription.
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
  create(body?: SubscriptionCreateParams, options?: Core.RequestOptions): Core.APIPromise<Subscription>;
  create(options?: Core.RequestOptions): Core.APIPromise<Subscription>;
  create(
    body: SubscriptionCreateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Subscription> {
    if (isRequestOptions(body)) {
      return this.create({}, body);
    }
    return this._client.post('/subscriptions', { body, ...options });
  }

  /**
   * This endpoint can be used to update the `metadata`, `net terms`,
   * `auto_collection`, `invoicing_threshold`, and `default_invoice_memo` properties
   * on a subscription.
   */
  update(
    subscriptionId: string,
    body?: SubscriptionUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Subscription>;
  update(subscriptionId: string, options?: Core.RequestOptions): Core.APIPromise<Subscription>;
  update(
    subscriptionId: string,
    body: SubscriptionUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Subscription> {
    if (isRequestOptions(body)) {
      return this.update(subscriptionId, {}, body);
    }
    return this._client.put(`/subscriptions/${subscriptionId}`, { body, ...options });
  }

  /**
   * This endpoint returns a list of all subscriptions for an account as a
   * [paginated](../reference/pagination) list, ordered starting from the most
   * recently created subscription. For a full discussion of the subscription
   * resource, see [Subscription](../guides/concepts#subscription).
   *
   * Subscriptions can be filtered to a single customer by passing in the
   * `customer_id` query parameter or the `external_customer_id` query parameter.
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
   * [cancellation behaviors](../guides/product-catalog/creating-subscriptions.md#cancellation-behaviors).
   */
  cancel(
    subscriptionId: string,
    body: SubscriptionCancelParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Subscription> {
    return this._client.post(`/subscriptions/${subscriptionId}/cancel`, { body, ...options });
  }

  /**
   * This endpoint is used to fetch a [Subscription](../guides/concepts#subscription)
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
   * This endpoint returns a [paginated](../reference/pagination) list of all plans
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
   * [price intervals](../reference/price-interval). By making modifications to a
   * subscription’s price intervals, you can
   * [flexibly and atomically control the billing behavior of a subscription](../guides/product-catalog/modifying-subscriptions).
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
    body?: SubscriptionPriceIntervalsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Subscription>;
  priceIntervals(subscriptionId: string, options?: Core.RequestOptions): Core.APIPromise<Subscription>;
  priceIntervals(
    subscriptionId: string,
    body: SubscriptionPriceIntervalsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Subscription> {
    if (isRequestOptions(body)) {
      return this.priceIntervals(subscriptionId, {}, body);
    }
    return this._client.post(`/subscriptions/${subscriptionId}/price_intervals`, { body, ...options });
  }

  /**
   * This endpoint can be used to change the plan on an existing subscription. It
   * returns the serialized updated subscription object.
   *
   * The body parameter `change_option` determines the timing of the plan change. Orb
   * supports three options:
   *
   * - `end_of_subscription_term`: changes the plan at the end of the existing plan's
   *   term.
   *   - Issuing this plan change request for a monthly subscription will keep the
   *     existing plan active until the start of the subsequent month, and
   *     potentially issue an invoice for any usage charges incurred in the
   *     intervening period.
   *   - Issuing this plan change request for a yearly subscription will keep the
   *     existing plan active for the full year.
   * - `immediate`: changes the plan immediately. Subscriptions that have their plan
   *   changed with this option will be invoiced immediately. This invoice will
   *   include any usage fees incurred in the billing period up to the change, along
   *   with any prorated recurring fees for the billing period, if applicable.
   * - `requested_date`: changes the plan on the requested date (`change_date`). If
   *   no timezone is provided, the customer's timezone is used. The `change_date`
   *   body parameter is required if this option is chosen.
   *
   * Note that one of `plan_id` or `external_plan_id` is required in the request body
   * for this operation.
   *
   * ## Price overrides, maximums, and minimums
   *
   * Price overrides are used to update some or all prices in the target plan.
   * Minimums and maximums, much like price overrides, can be useful when a new
   * customer has negotiated a new or different minimum or maximum spend cap than the
   * default for the plan. The request format for price overrides, maximums, and
   * minimums are the same as those in [subscription creation](create-subscription).
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
   * [Modifying subscriptions](../guides/product-catalog/modifying-subscriptions.md#prorations-for-in-advance-fees).
   */
  schedulePlanChange(
    subscriptionId: string,
    body: SubscriptionSchedulePlanChangeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Subscription> {
    return this._client.post(`/subscriptions/${subscriptionId}/schedule_plan_change`, { body, ...options });
  }

  /**
   * Manually trigger a phase, effective the given date (or the current time, if not
   * specified).
   */
  triggerPhase(
    subscriptionId: string,
    body?: SubscriptionTriggerPhaseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Subscription>;
  triggerPhase(subscriptionId: string, options?: Core.RequestOptions): Core.APIPromise<Subscription>;
  triggerPhase(
    subscriptionId: string,
    body: SubscriptionTriggerPhaseParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Subscription> {
    if (isRequestOptions(body)) {
      return this.triggerPhase(subscriptionId, {}, body);
    }
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
  ): Core.APIPromise<Subscription> {
    return this._client.post(`/subscriptions/${subscriptionId}/unschedule_cancellation`, options);
  }

  /**
   * This endpoint can be used to clear scheduled updates to the quantity for a fixed
   * fee.
   *
   * If there are no updates scheduled, this endpoint is a no-op.
   */
  unscheduleFixedFeeQuantityUpdates(
    subscriptionId: string,
    body: SubscriptionUnscheduleFixedFeeQuantityUpdatesParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Subscription> {
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
  ): Core.APIPromise<Subscription> {
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
  ): Core.APIPromise<Subscription> {
    return this._client.post(`/subscriptions/${subscriptionId}/update_fixed_fee_quantity`, {
      body,
      ...options,
    });
  }
}

export class SubscriptionsPage extends Page<Subscription> {}

export class SubscriptionFetchScheduleResponsesPage extends Page<SubscriptionFetchScheduleResponse> {}

/**
 * A [subscription](../guides/core-concepts.mdx#subscription) represents the
 * purchase of a plan by a customer.
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
   * [Customer ID Aliases](../guides/events-and-metrics/customer-aliases) for further
   * information about how these aliases work in Orb.
   *
   * In addition to having an identifier in your system, a customer may exist in a
   * payment provider solution like Stripe. Use the `payment_provider_id` and the
   * `payment_provider` enum field to express this mapping.
   *
   * A customer also has a timezone (from the standard
   * [IANA timezone database](https://www.iana.org/time-zones)), which defaults to
   * your account's timezone. See
   * [Timezone localization](../guides/product-catalog/timezones.md) for information
   * on what this timezone parameter influences within Orb.
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
   * The [Plan](../guides/core-concepts.mdx#plan-and-price) resource represents a
   * plan that can be subscribed to by a customer. Plans define the billing behavior
   * of the subscription. You can see more about how to configure prices in the
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
      | AdjustmentInterval.AmountDiscountAdjustment
      | AdjustmentInterval.PercentageDiscountAdjustment
      | AdjustmentInterval.UsageDiscountAdjustment
      | AdjustmentInterval.MinimumAdjustment
      | AdjustmentInterval.MaximumAdjustment;

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
    export interface AmountDiscountAdjustment {
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
       * The reason for the adjustment.
       */
      reason: string | null;
    }

    export interface PercentageDiscountAdjustment {
      adjustment_type: 'percentage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface UsageDiscountAdjustment {
      adjustment_type: 'usage_discount';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface MinimumAdjustment {
      adjustment_type: 'minimum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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

    export interface MaximumAdjustment {
      adjustment_type: 'maximum';

      /**
       * The price IDs that this adjustment applies to.
       */
      applies_to_price_ids: Array<string>;

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
     * ## Unit pricing
     *
     * With unit pricing, each unit costs a fixed amount.
     *
     * ```json
     * {
     *     ...
     *     "model_type": "unit",
     *     "unit_config": {
     *         "unit_amount": "0.50"
     *     }
     *     ...
     * }
     * ```
     *
     * ## Tiered pricing
     *
     * In tiered pricing, the cost of a given unit depends on the tier range that it
     * falls into, where each tier range is defined by an upper and lower bound. For
     * example, the first ten units may cost $0.50 each and all units thereafter may
     * cost $0.10 each.
     *
     * ```json
     * {
     *     ...
     *     "model_type": "tiered",
     *     "tiered_config": {
     *         "tiers": [
     *             {
     *                 "first_unit": 1,
     *                 "last_unit": 10,
     *                 "unit_amount": "0.50"
     *             },
     *             {
     *                 "first_unit": 11,
     *                 "last_unit": null,
     *                 "unit_amount": "0.10"
     *             }
     *         ]
     *     }
     *     ...
     * ```
     *
     * ## Bulk pricing
     *
     * Bulk pricing applies when the number of units determine the cost of all units.
     * For example, if you've bought less than 10 units, they may each be $0.50 for a
     * total of $5.00. Once you've bought more than 10 units, all units may now be
     * priced at $0.40 (i.e. 101 units total would be $40.40).
     *
     * ```json
     * {
     *     ...
     *     "model_type": "bulk",
     *     "bulk_config": {
     *         "tiers": [
     *             {
     *                 "maximum_units": 10,
     *                 "unit_amount": "0.50"
     *             },
     *             {
     *                 "maximum_units": 1000,
     *                 "unit_amount": "0.40"
     *             }
     *         ]
     *     }
     *     ...
     * }
     * ```
     *
     * ## Package pricing
     *
     * Package pricing defines the size or granularity of a unit for billing purposes.
     * For example, if the package size is set to 5, then 4 units will be billed as 5
     * and 6 units will be billed at 10.
     *
     * ```json
     * {
     *     ...
     *     "model_type": "package",
     *     "package_config": {
     *         "package_amount": "0.80",
     *         "package_size": 10
     *     }
     *     ...
     * }
     * ```
     *
     * ## BPS pricing
     *
     * BPS pricing specifies a per-event (e.g. per-payment) rate in one hundredth of a
     * percent (the number of basis points to charge), as well as a cap per event to
     * assess. For example, this would allow you to assess a fee of 0.25% on every
     * payment you process, with a maximum charge of $25 per payment.
     *
     * ```json
     * {
     *     ...
     *     "model_type": "bps",
     *     "bps_config": {
     *        "bps": 125,
     *        "per_unit_maximum": "11.00"
     *     }
     *     ...
     *  }
     * ```
     *
     * ## Bulk BPS pricing
     *
     * Bulk BPS pricing specifies BPS parameters in a tiered manner, dependent on the
     * total quantity across all events. Similar to bulk pricing, the BPS parameters of
     * a given event depends on the tier range that the billing period falls into. Each
     * tier range is defined by an upper bound. For example, after $1.5M of payment
     * volume is reached, each individual payment may have a lower cap or a smaller
     * take-rate.
     *
     * ```json
     *     ...
     *     "model_type": "bulk_bps",
     *     "bulk_bps_config": {
     *         "tiers": [
     *            {
     *                 "maximum_amount": "1000000.00",
     *                 "bps": 125,
     *                 "per_unit_maximum": "19.00"
     *            },
     *           {
     *                 "maximum_amount": null,
     *                 "bps": 115,
     *                 "per_unit_maximum": "4.00"
     *             }
     *         ]
     *     }
     *     ...
     * }
     * ```
     *
     * ## Tiered BPS pricing
     *
     * Tiered BPS pricing specifies BPS parameters in a graduated manner, where an
     * event's applicable parameter is a function of its marginal addition to the
     * period total. Similar to tiered pricing, the BPS parameters of a given event
     * depends on the tier range that it falls into, where each tier range is defined
     * by an upper and lower bound. For example, the first few payments may have a 0.8
     * BPS take-rate and all payments after a specific volume may incur a take-rate of
     * 0.5 BPS each.
     *
     * ```json
     *     ...
     *     "model_type": "tiered_bps",
     *     "tiered_bps_config": {
     *         "tiers": [
     *            {
     *                 "minimum_amount": "0",
     *                 "maximum_amount": "1000000.00",
     *                 "bps": 125,
     *                 "per_unit_maximum": "19.00"
     *            },
     *           {
     *                 "minimum_amount": "1000000.00",
     *                 "maximum_amount": null,
     *                 "bps": 115,
     *                 "per_unit_maximum": "4.00"
     *             }
     *         ]
     *     }
     *     ...
     * }
     * ```
     *
     * ## Matrix pricing
     *
     * Matrix pricing defines a set of unit prices in a one or two-dimensional matrix.
     * `dimensions` defines the two event property values evaluated in this pricing
     * model. In a one-dimensional matrix, the second value is `null`. Every
     * configuration has a list of `matrix_values` which give the unit prices for
     * specified property values. In a one-dimensional matrix, the matrix values will
     * have `dimension_values` where the second value of the pair is null. If an event
     * does not match any of the dimension values in the matrix, it will resort to the
     * `default_unit_amount`.
     *
     * ```json
     * {
     *     "model_type": "matrix"
     *     "matrix_config": {
     *         "default_unit_amount": "3.00",
     *         "dimensions": [
     *             "cluster_name",
     *             "region"
     *         ],
     *         "matrix_values": [
     *             {
     *                 "dimension_values": [
     *                     "alpha",
     *                     "west"
     *                 ],
     *                 "unit_amount": "2.00"
     *             },
     *             ...
     *         ]
     *     }
     * }
     * ```
     *
     * ## Fixed fees
     *
     * Fixed fees are prices that are applied independent of usage quantities, and
     * follow unit pricing. They also have an additional parameter
     * `fixed_price_quantity`. If the Price represents a fixed cost, this represents
     * the quantity of units applied.
     *
     * ```json
     * {
     *     ...
     *     "id": "price_id",
     *     "model_type": "unit",
     *     "unit_config": {
     *        "unit_amount": "2.00"
     *     },
     *     "fixed_price_quantity": 3.0
     *     ...
     * }
     * ```
     */
    price: PricesAPI.Price;

    /**
     * The start date of the price interval. This is the date that Orb starts billing
     * for this price.
     */
    start_date: string;
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
       * The Price resource represents a price that can be billed on a subscription,
       * resulting in a charge on an invoice in the form of an invoice line item. Prices
       * take a quantity and determine an amount to bill.
       *
       * Orb supports a few different pricing models out of the box. Each of these models
       * is serialized differently in a given Price object. The model_type field
       * determines the key for the configuration object that is present.
       *
       * ## Unit pricing
       *
       * With unit pricing, each unit costs a fixed amount.
       *
       * ```json
       * {
       *     ...
       *     "model_type": "unit",
       *     "unit_config": {
       *         "unit_amount": "0.50"
       *     }
       *     ...
       * }
       * ```
       *
       * ## Tiered pricing
       *
       * In tiered pricing, the cost of a given unit depends on the tier range that it
       * falls into, where each tier range is defined by an upper and lower bound. For
       * example, the first ten units may cost $0.50 each and all units thereafter may
       * cost $0.10 each.
       *
       * ```json
       * {
       *     ...
       *     "model_type": "tiered",
       *     "tiered_config": {
       *         "tiers": [
       *             {
       *                 "first_unit": 1,
       *                 "last_unit": 10,
       *                 "unit_amount": "0.50"
       *             },
       *             {
       *                 "first_unit": 11,
       *                 "last_unit": null,
       *                 "unit_amount": "0.10"
       *             }
       *         ]
       *     }
       *     ...
       * ```
       *
       * ## Bulk pricing
       *
       * Bulk pricing applies when the number of units determine the cost of all units.
       * For example, if you've bought less than 10 units, they may each be $0.50 for a
       * total of $5.00. Once you've bought more than 10 units, all units may now be
       * priced at $0.40 (i.e. 101 units total would be $40.40).
       *
       * ```json
       * {
       *     ...
       *     "model_type": "bulk",
       *     "bulk_config": {
       *         "tiers": [
       *             {
       *                 "maximum_units": 10,
       *                 "unit_amount": "0.50"
       *             },
       *             {
       *                 "maximum_units": 1000,
       *                 "unit_amount": "0.40"
       *             }
       *         ]
       *     }
       *     ...
       * }
       * ```
       *
       * ## Package pricing
       *
       * Package pricing defines the size or granularity of a unit for billing purposes.
       * For example, if the package size is set to 5, then 4 units will be billed as 5
       * and 6 units will be billed at 10.
       *
       * ```json
       * {
       *     ...
       *     "model_type": "package",
       *     "package_config": {
       *         "package_amount": "0.80",
       *         "package_size": 10
       *     }
       *     ...
       * }
       * ```
       *
       * ## BPS pricing
       *
       * BPS pricing specifies a per-event (e.g. per-payment) rate in one hundredth of a
       * percent (the number of basis points to charge), as well as a cap per event to
       * assess. For example, this would allow you to assess a fee of 0.25% on every
       * payment you process, with a maximum charge of $25 per payment.
       *
       * ```json
       * {
       *     ...
       *     "model_type": "bps",
       *     "bps_config": {
       *        "bps": 125,
       *        "per_unit_maximum": "11.00"
       *     }
       *     ...
       *  }
       * ```
       *
       * ## Bulk BPS pricing
       *
       * Bulk BPS pricing specifies BPS parameters in a tiered manner, dependent on the
       * total quantity across all events. Similar to bulk pricing, the BPS parameters of
       * a given event depends on the tier range that the billing period falls into. Each
       * tier range is defined by an upper bound. For example, after $1.5M of payment
       * volume is reached, each individual payment may have a lower cap or a smaller
       * take-rate.
       *
       * ```json
       *     ...
       *     "model_type": "bulk_bps",
       *     "bulk_bps_config": {
       *         "tiers": [
       *            {
       *                 "maximum_amount": "1000000.00",
       *                 "bps": 125,
       *                 "per_unit_maximum": "19.00"
       *            },
       *           {
       *                 "maximum_amount": null,
       *                 "bps": 115,
       *                 "per_unit_maximum": "4.00"
       *             }
       *         ]
       *     }
       *     ...
       * }
       * ```
       *
       * ## Tiered BPS pricing
       *
       * Tiered BPS pricing specifies BPS parameters in a graduated manner, where an
       * event's applicable parameter is a function of its marginal addition to the
       * period total. Similar to tiered pricing, the BPS parameters of a given event
       * depends on the tier range that it falls into, where each tier range is defined
       * by an upper and lower bound. For example, the first few payments may have a 0.8
       * BPS take-rate and all payments after a specific volume may incur a take-rate of
       * 0.5 BPS each.
       *
       * ```json
       *     ...
       *     "model_type": "tiered_bps",
       *     "tiered_bps_config": {
       *         "tiers": [
       *            {
       *                 "minimum_amount": "0",
       *                 "maximum_amount": "1000000.00",
       *                 "bps": 125,
       *                 "per_unit_maximum": "19.00"
       *            },
       *           {
       *                 "minimum_amount": "1000000.00",
       *                 "maximum_amount": null,
       *                 "bps": 115,
       *                 "per_unit_maximum": "4.00"
       *             }
       *         ]
       *     }
       *     ...
       * }
       * ```
       *
       * ## Matrix pricing
       *
       * Matrix pricing defines a set of unit prices in a one or two-dimensional matrix.
       * `dimensions` defines the two event property values evaluated in this pricing
       * model. In a one-dimensional matrix, the second value is `null`. Every
       * configuration has a list of `matrix_values` which give the unit prices for
       * specified property values. In a one-dimensional matrix, the matrix values will
       * have `dimension_values` where the second value of the pair is null. If an event
       * does not match any of the dimension values in the matrix, it will resort to the
       * `default_unit_amount`.
       *
       * ```json
       * {
       *     "model_type": "matrix"
       *     "matrix_config": {
       *         "default_unit_amount": "3.00",
       *         "dimensions": [
       *             "cluster_name",
       *             "region"
       *         ],
       *         "matrix_values": [
       *             {
       *                 "dimension_values": [
       *                     "alpha",
       *                     "west"
       *                 ],
       *                 "unit_amount": "2.00"
       *             },
       *             ...
       *         ]
       *     }
       * }
       * ```
       *
       * ## Fixed fees
       *
       * Fixed fees are prices that are applied independent of usage quantities, and
       * follow unit pricing. They also have an additional parameter
       * `fixed_price_quantity`. If the Price represents a fixed cost, this represents
       * the quantity of units applied.
       *
       * ```json
       * {
       *     ...
       *     "id": "price_id",
       *     "model_type": "unit",
       *     "unit_config": {
       *        "unit_amount": "2.00"
       *     },
       *     "fixed_price_quantity": 3.0
       *     ...
       * }
       * ```
       */
      price: PricesAPI.Price;

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

export interface SubscriptionCreateParams {
  align_billing_with_subscription_start_date?: boolean;

  auto_collection?: boolean | null;

  aws_region?: string | null;

  coupon_redemption_code?: string | null;

  credits_overage_rate?: number | null;

  customer_id?: string | null;

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

  initial_phase_order?: number | null;

  invoicing_threshold?: string | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;

  net_terms?: number | null;

  per_credit_overage_amount?: number | null;

  /**
   * The plan that the given subscription should be switched to. Note that either
   * this property or `external_plan_id` must be specified.
   */
  plan_id?: string | null;

  /**
   * Optionally provide a list of overrides for prices on the plan
   */
  price_overrides?: Array<
    | SubscriptionCreateParams.OverrideUnitPrice
    | SubscriptionCreateParams.OverridePackagePrice
    | SubscriptionCreateParams.OverrideMatrixPrice
    | SubscriptionCreateParams.OverrideTieredPrice
    | SubscriptionCreateParams.OverrideTieredBpsPrice
    | SubscriptionCreateParams.OverrideBpsPrice
    | SubscriptionCreateParams.OverrideBulkBpsPrice
    | SubscriptionCreateParams.OverrideBulkPrice
    | SubscriptionCreateParams.OverrideThresholdTotalAmountPrice
    | SubscriptionCreateParams.OverrideTieredPackagePrice
    | SubscriptionCreateParams.OverrideTieredWithMinimumPrice
    | SubscriptionCreateParams.OverridePackageWithAllocationPrice
    | SubscriptionCreateParams.OverrideUnitWithPercentPrice
  > | null;

  start_date?: string | null;
}

export namespace SubscriptionCreateParams {
  export interface OverrideUnitPrice {
    id: string;

    model_type: 'unit';

    unit_config: OverrideUnitPrice.UnitConfig;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideUnitPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideUnitPrice {
    export interface UnitConfig {
      /**
       * Rate per unit of usage
       */
      unit_amount: string;
    }

    /**
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverridePackagePrice {
    id: string;

    model_type: 'package';

    package_config: OverridePackagePrice.PackageConfig;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverridePackagePrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverridePackagePrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideMatrixPrice {
    id: string;

    matrix_config: OverrideMatrixPrice.MatrixConfig;

    model_type: 'matrix';

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideMatrixPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideMatrixPrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideTieredPrice {
    id: string;

    model_type: 'tiered';

    tiered_config: OverrideTieredPrice.TieredConfig;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideTieredPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideTieredPrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideTieredBpsPrice {
    id: string;

    model_type: 'tiered_bps';

    tiered_bps_config: OverrideTieredBpsPrice.TieredBpsConfig;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideTieredBpsPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideTieredBpsPrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideBpsPrice {
    id: string;

    bps_config: OverrideBpsPrice.BpsConfig;

    model_type: 'bps';

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideBpsPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideBpsPrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideBulkBpsPrice {
    id: string;

    bulk_bps_config: OverrideBulkBpsPrice.BulkBpsConfig;

    model_type: 'bulk_bps';

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideBulkBpsPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideBulkBpsPrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideBulkPrice {
    id: string;

    bulk_config: OverrideBulkPrice.BulkConfig;

    model_type: 'bulk';

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideBulkPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideBulkPrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideThresholdTotalAmountPrice {
    id: string;

    model_type: 'threshold_total_amount';

    threshold_total_amount_config: Record<string, unknown>;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideThresholdTotalAmountPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideThresholdTotalAmountPrice {
    /**
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideTieredPackagePrice {
    id: string;

    model_type: 'tiered_package';

    tiered_package_config: Record<string, unknown>;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideTieredPackagePrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideTieredPackagePrice {
    /**
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideTieredWithMinimumPrice {
    id: string;

    model_type: 'tiered_with_minimum';

    tiered_with_minimum_config: Record<string, unknown>;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideTieredWithMinimumPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideTieredWithMinimumPrice {
    /**
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverridePackageWithAllocationPrice {
    id: string;

    model_type: 'package_with_allocation';

    package_with_allocation_config: Record<string, unknown>;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverridePackageWithAllocationPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverridePackageWithAllocationPrice {
    /**
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideUnitWithPercentPrice {
    id: string;

    model_type: 'unit_with_percent';

    unit_with_percent_config: Record<string, unknown>;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideUnitWithPercentPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideUnitWithPercentPrice {
    /**
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
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

  customer_id?: string | null;

  external_customer_id?: string | null;

  status?: 'active' | 'ended' | 'upcoming' | null;
}

export interface SubscriptionCancelParams {
  /**
   * Determines the timing of subscription cancellation
   */
  cancel_option: 'end_of_subscription_term' | 'immediate' | 'requested_date';

  /**
   * The date that the cancellation should take effect. This parameter can only be
   * passed if the `cancel_option` is `requested_date`.
   */
  cancellation_date?: string | null;
}

export interface SubscriptionFetchCostsParams {
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

  /**
   * Cursor for pagination. This can be populated by the `next_cursor` value returned
   * from the initial request.
   */
  cursor?: string | null;

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

  /**
   * If including a `group_by`, the number of groups to fetch data for. Defaults
   * to 1000.
   */
  limit?: number | null;

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
      | Add.NewFloatingTieredWithMinimumPrice
      | Add.NewFloatingPackageWithAllocationPrice
      | Add.NewFloatingTieredPackageWithMinimumPrice
      | Add.NewFloatingUnitWithPercentPrice
      | Add.NewFloatingTieredWithProrationPrice
      | Add.NewFloatingUnitWithProrationPrice
      | null;

    /**
     * The id of the price to add to the subscription.
     */
    price_id?: string | null;
  }

  export namespace Add {
    /**
     * The definition of a new allocation price to create and add to the subscription.
     */
    export interface AllocationPrice {
      /**
       * An amount of the currency to allocate to the customer at the specified cadence.
       */
      amount: number;

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
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export namespace NewFloatingUnitPrice {
      export interface UnitConfig {
        /**
         * Rate per unit of usage
         */
        unit_amount: string;
      }
    }

    export interface NewFloatingPackagePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingMatrixPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingMatrixWithAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingTieredPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingTieredBpsPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingBpsPrice {
      bps_config: NewFloatingBpsPrice.BpsConfig;

      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingBulkBpsPrice {
      bulk_bps_config: NewFloatingBulkBpsPrice.BulkBpsConfig;

      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingBulkPrice {
      bulk_config: NewFloatingBulkPrice.BulkConfig;

      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingThresholdTotalAmountPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingTieredPackagePrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingGroupedTieredPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      grouped_tiered_config: Record<string, unknown>;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingTieredWithMinimumPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingPackageWithAllocationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingTieredPackageWithMinimumPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingUnitWithPercentPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingTieredWithProrationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }

    export interface NewFloatingUnitWithProrationPrice {
      /**
       * The cadence to bill for this price on.
       */
      cadence: 'annual' | 'semi_annual' | 'monthly' | 'quarterly' | 'one_time';

      /**
       * An ISO 4217 currency string for which this price is billed in.
       */
      currency: string;

      /**
       * The id of the item the plan will be associated with.
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
    }
  }

  export interface AddAdjustment {
    /**
     * The definition of a new adjustment to create and add to the subscription.
     */
    adjustment:
      | AddAdjustment.NewPercentageDiscount
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
    }

    export interface NewAmountDiscount {
      adjustment_type: 'amount_discount';

      amount_discount: string;

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;
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
    }

    export interface NewMaximum {
      adjustment_type: 'maximum';

      /**
       * The set of price IDs to which this adjustment applies.
       */
      applies_to_price_ids: Array<string>;

      maximum_amount: string;
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
   * [DEPRECATED] Use billing_cycle_alignment instead. Reset billing periods to be
   * aligned with the plan change’s effective date.
   */
  align_billing_with_plan_change_date?: boolean | null;

  /**
   * Reset billing periods to be aligned with the plan change’s effective date or
   * start of the month. Defaults to `unchanged` which keeps subscription's existing
   * billing cycle alignment.
   */
  billing_cycle_alignment?: 'unchanged' | 'plan_change_date' | 'start_of_month' | null;

  /**
   * The date that the plan change should take effect. This parameter can only be
   * passed if the `change_option` is `requested_date`.
   */
  change_date?: string | null;

  /**
   * Redemption code to be used for this subscription. If the coupon cannot be found
   * by its redemption code, or cannot be redeemed, an error response will be
   * returned and the plan change will not be scheduled.
   */
  coupon_redemption_code?: string | null;

  credits_overage_rate?: number | null;

  /**
   * The external_plan_id of the plan that the given subscription should be switched
   * to. Note that either this property or `plan_id` must be specified.
   */
  external_plan_id?: string | null;

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

  per_credit_overage_amount?: number | null;

  /**
   * The plan that the given subscription should be switched to. Note that either
   * this property or `external_plan_id` must be specified.
   */
  plan_id?: string | null;

  /**
   * Optionally provide a list of overrides for prices on the plan
   */
  price_overrides?: Array<
    | SubscriptionSchedulePlanChangeParams.OverrideUnitPrice
    | SubscriptionSchedulePlanChangeParams.OverridePackagePrice
    | SubscriptionSchedulePlanChangeParams.OverrideMatrixPrice
    | SubscriptionSchedulePlanChangeParams.OverrideTieredPrice
    | SubscriptionSchedulePlanChangeParams.OverrideTieredBpsPrice
    | SubscriptionSchedulePlanChangeParams.OverrideBpsPrice
    | SubscriptionSchedulePlanChangeParams.OverrideBulkBpsPrice
    | SubscriptionSchedulePlanChangeParams.OverrideBulkPrice
    | SubscriptionSchedulePlanChangeParams.OverrideThresholdTotalAmountPrice
    | SubscriptionSchedulePlanChangeParams.OverrideTieredPackagePrice
    | SubscriptionSchedulePlanChangeParams.OverrideTieredWithMinimumPrice
    | SubscriptionSchedulePlanChangeParams.OverridePackageWithAllocationPrice
    | SubscriptionSchedulePlanChangeParams.OverrideUnitWithPercentPrice
  > | null;
}

export namespace SubscriptionSchedulePlanChangeParams {
  export interface OverrideUnitPrice {
    id: string;

    model_type: 'unit';

    unit_config: OverrideUnitPrice.UnitConfig;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideUnitPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideUnitPrice {
    export interface UnitConfig {
      /**
       * Rate per unit of usage
       */
      unit_amount: string;
    }

    /**
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverridePackagePrice {
    id: string;

    model_type: 'package';

    package_config: OverridePackagePrice.PackageConfig;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverridePackagePrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverridePackagePrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideMatrixPrice {
    id: string;

    matrix_config: OverrideMatrixPrice.MatrixConfig;

    model_type: 'matrix';

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideMatrixPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideMatrixPrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideTieredPrice {
    id: string;

    model_type: 'tiered';

    tiered_config: OverrideTieredPrice.TieredConfig;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideTieredPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideTieredPrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideTieredBpsPrice {
    id: string;

    model_type: 'tiered_bps';

    tiered_bps_config: OverrideTieredBpsPrice.TieredBpsConfig;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideTieredBpsPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideTieredBpsPrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideBpsPrice {
    id: string;

    bps_config: OverrideBpsPrice.BpsConfig;

    model_type: 'bps';

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideBpsPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideBpsPrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideBulkBpsPrice {
    id: string;

    bulk_bps_config: OverrideBulkBpsPrice.BulkBpsConfig;

    model_type: 'bulk_bps';

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideBulkBpsPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideBulkBpsPrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideBulkPrice {
    id: string;

    bulk_config: OverrideBulkPrice.BulkConfig;

    model_type: 'bulk';

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideBulkPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideBulkPrice {
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
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideThresholdTotalAmountPrice {
    id: string;

    model_type: 'threshold_total_amount';

    threshold_total_amount_config: Record<string, unknown>;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideThresholdTotalAmountPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideThresholdTotalAmountPrice {
    /**
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideTieredPackagePrice {
    id: string;

    model_type: 'tiered_package';

    tiered_package_config: Record<string, unknown>;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideTieredPackagePrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideTieredPackagePrice {
    /**
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideTieredWithMinimumPrice {
    id: string;

    model_type: 'tiered_with_minimum';

    tiered_with_minimum_config: Record<string, unknown>;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideTieredWithMinimumPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideTieredWithMinimumPrice {
    /**
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverridePackageWithAllocationPrice {
    id: string;

    model_type: 'package_with_allocation';

    package_with_allocation_config: Record<string, unknown>;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverridePackageWithAllocationPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverridePackageWithAllocationPrice {
    /**
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }

  export interface OverrideUnitWithPercentPrice {
    id: string;

    model_type: 'unit_with_percent';

    unit_with_percent_config: Record<string, unknown>;

    /**
     * The per unit conversion rate of the price currency to the invoicing currency.
     */
    conversion_rate?: number | null;

    /**
     * The currency of the price. If not provided, the currency of the plan will be
     * used.
     */
    currency?: string | null;

    /**
     * The subscription's override discount for the plan.
     */
    discount?: OverrideUnitWithPercentPrice.Discount | null;

    /**
     * The starting quantity of the price, if the price is a fixed price.
     */
    fixed_price_quantity?: number | null;

    /**
     * The subscription's override maximum amount for the plan.
     */
    maximum_amount?: string | null;

    /**
     * The subscription's override minimum amount for the plan.
     */
    minimum_amount?: string | null;
  }

  export namespace OverrideUnitWithPercentPrice {
    /**
     * The subscription's override discount for the plan.
     */
    export interface Discount {
      discount_type: 'percentage' | 'trial' | 'usage' | 'amount';

      /**
       * Only available if discount_type is `amount`.
       */
      amount_discount?: string | null;

      /**
       * List of price_ids that this discount applies to. For plan/plan phase discounts,
       * this can be a subset of prices.
       */
      applies_to_price_ids?: Array<string> | null;

      /**
       * Only available if discount_type is `percentage`. This is a number between 0
       * and 1.
       */
      percentage_discount?: number | null;

      /**
       * Only available if discount_type is `trial`
       */
      trial_amount_discount?: string | null;

      /**
       * Only available if discount_type is `usage`. Number of usage units that this
       * discount is for
       */
      usage_discount?: number | null;
    }
  }
}

export interface SubscriptionTriggerPhaseParams {
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
   * Determines when the change takes effect. Note that if `effective_date` is
   * specified, this defaults to `effective_date`. Otherwise, this defaults to
   * `immediate` unless it's explicitly set to `upcoming_invoice.
   */
  change_option?: 'immediate' | 'upcoming_invoice' | 'effective_date';

  /**
   * The date that the quantity change should take effect, localized to the
   * customer's timezone. Ifthis parameter is not passed in, the quantity change is
   * effective according to `change_option`.
   */
  effective_date?: string | null;
}

export namespace Subscriptions {
  export import Subscription = SubscriptionsAPI.Subscription;
  export import SubscriptionUsage = SubscriptionsAPI.SubscriptionUsage;
  export import Subscriptions = SubscriptionsAPI.Subscriptions;
  export import SubscriptionFetchCostsResponse = SubscriptionsAPI.SubscriptionFetchCostsResponse;
  export import SubscriptionFetchScheduleResponse = SubscriptionsAPI.SubscriptionFetchScheduleResponse;
  export import SubscriptionsPage = SubscriptionsAPI.SubscriptionsPage;
  export import SubscriptionFetchScheduleResponsesPage = SubscriptionsAPI.SubscriptionFetchScheduleResponsesPage;
  export import SubscriptionCreateParams = SubscriptionsAPI.SubscriptionCreateParams;
  export import SubscriptionUpdateParams = SubscriptionsAPI.SubscriptionUpdateParams;
  export import SubscriptionListParams = SubscriptionsAPI.SubscriptionListParams;
  export import SubscriptionCancelParams = SubscriptionsAPI.SubscriptionCancelParams;
  export import SubscriptionFetchCostsParams = SubscriptionsAPI.SubscriptionFetchCostsParams;
  export import SubscriptionFetchScheduleParams = SubscriptionsAPI.SubscriptionFetchScheduleParams;
  export import SubscriptionFetchUsageParams = SubscriptionsAPI.SubscriptionFetchUsageParams;
  export import SubscriptionPriceIntervalsParams = SubscriptionsAPI.SubscriptionPriceIntervalsParams;
  export import SubscriptionSchedulePlanChangeParams = SubscriptionsAPI.SubscriptionSchedulePlanChangeParams;
  export import SubscriptionTriggerPhaseParams = SubscriptionsAPI.SubscriptionTriggerPhaseParams;
  export import SubscriptionUnscheduleFixedFeeQuantityUpdatesParams = SubscriptionsAPI.SubscriptionUnscheduleFixedFeeQuantityUpdatesParams;
  export import SubscriptionUpdateFixedFeeQuantityParams = SubscriptionsAPI.SubscriptionUpdateFixedFeeQuantityParams;
}
