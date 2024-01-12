// File generated from our OpenAPI spec by Stainless.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import * as PriceAPI from 'orb-billing/resources/beta/price';

export class Price extends APIResource {
  /**
   * This endpoint is used to evaluate the output of a price for a given customer and
   * time range. It enables filtering and grouping the output using
   * [computed properties](../guides/extensibility/advanced-metrics#computed-properties),
   * supporting the following workflows:
   *
   * 1. Showing detailed usage and costs to the end customer.
   * 2. Auditing subtotals on invoice line items.
   *
   * For these workflows, the expressiveness of computed properties in both the
   * filters and grouping is critical. For example, if you'd like to show your
   * customer their usage grouped by hour and another property, you can do so with
   * the following `grouping_keys`:
   * `["hour_floor_timestamp_millis(timestamp_millis)", "my_property"]`. If you'd
   * like to examine a customer's usage for a specific property value, you can do so
   * with the following `filter`:
   * `my_property = 'foo' AND my_other_property = 'bar'`.
   *
   * By default, the start of the time range must be no more than 100 days ago and
   * the length of the results must be no greater than 1000. Note that this is a POST
   * endpoint rather than a GET endpoint because it employs a JSON body rather than
   * query parameters.
   */
  evaluate(
    priceId: string,
    body: PriceEvaluateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PriceEvaluateResponse> {
    return this._client.post(`/prices/${priceId}/evaluate`, { body, ...options });
  }
}

export interface EvaluatePriceGroup {
  /**
   * The price's output for the group
   */
  amount: string;

  /**
   * The values for the group in the order specified by `grouping_keys`
   */
  grouping_values: Array<string | number | boolean>;

  /**
   * The price's usage quantity for the group
   */
  quantity: number;
}

export interface PriceEvaluateResponse {
  data: Array<EvaluatePriceGroup>;
}

export interface PriceEvaluateParams {
  /**
   * The exclusive upper bound for event timestamps
   */
  timeframe_end: string;

  /**
   * The inclusive lower bound for event timestamps
   */
  timeframe_start: string;

  /**
   * The ID of the customer to which this evaluation is scoped.
   */
  customer_id?: string | null;

  /**
   * The external customer ID of the customer to which this evaluation is scoped.
   */
  external_customer_id?: string | null;

  /**
   * A boolean
   * [computed property](../guides/extensibility/advanced-metrics#computed-properties)
   * used to filter the underlying billable metric
   */
  filter?: string | null;

  /**
   * Properties (or
   * [computed properties](../guides/extensibility/advanced-metrics#computed-properties))
   * used to group the underlying billable metric
   */
  grouping_keys?: Array<string>;
}

export namespace Price {
  export import EvaluatePriceGroup = PriceAPI.EvaluatePriceGroup;
  export import PriceEvaluateResponse = PriceAPI.PriceEvaluateResponse;
  export import PriceEvaluateParams = PriceAPI.PriceEvaluateParams;
}
