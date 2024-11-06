// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as MetricsAPI from './metrics';
import * as ItemsAPI from './items';
import { Page, type PageParams } from '../pagination';

export class Metrics extends APIResource {
  /**
   * This endpoint is used to create a [metric](../guides/concepts##metric) using a
   * SQL string. See
   * [SQL support](../guides/extensibility/advanced-metrics#sql-support) for a
   * description of constructing SQL queries with examples.
   */
  create(body: MetricCreateParams, options?: Core.RequestOptions): Core.APIPromise<BillableMetric> {
    return this._client.post('/metrics', { body, ...options });
  }

  /**
   * This endpoint allows you to update the `metadata` property on a metric. If you
   * pass `null` for the metadata value, it will clear any existing metadata for that
   * invoice.
   */
  update(
    metricId: string,
    body: MetricUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BillableMetric> {
    return this._client.put(`/metrics/${metricId}`, { body, ...options });
  }

  /**
   * This endpoint is used to fetch [metric](../guides/concepts#metric) details given
   * a metric identifier. It returns information about the metrics including its
   * name, description, and item.
   */
  list(
    query?: MetricListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BillableMetricsPage, BillableMetric>;
  list(options?: Core.RequestOptions): Core.PagePromise<BillableMetricsPage, BillableMetric>;
  list(
    query: MetricListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<BillableMetricsPage, BillableMetric> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/metrics', BillableMetricsPage, { query, ...options });
  }

  /**
   * This endpoint is used to list [metrics](../guides/concepts##metric). It returns
   * information about the metrics including its name, description, and item.
   */
  fetch(metricId: string, options?: Core.RequestOptions): Core.APIPromise<BillableMetric> {
    return this._client.get(`/metrics/${metricId}`, options);
  }
}

export class BillableMetricsPage extends Page<BillableMetric> {}

/**
 * The Metric resource represents a calculation of a quantity based on events.
 * Metrics are defined by the query that transforms raw usage events into
 * meaningful values for your customers.
 */
export interface BillableMetric {
  id: string;

  description: string | null;

  /**
   * The Item resource represents a sellable product or good. Items are associated
   * with all line items, billable metrics, and prices and are used for defining
   * external sync behavior for invoices and tax calculation purposes.
   */
  item: ItemsAPI.Item;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  name: string;

  status: 'active' | 'draft' | 'archived';
}

export interface MetricCreateParams {
  /**
   * A description of the metric.
   */
  description: string | null;

  /**
   * The id of the item
   */
  item_id: string;

  /**
   * The name of the metric.
   */
  name: string;

  /**
   * A sql string defining the metric.
   */
  sql: string;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface MetricUpdateParams {
  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface MetricListParams extends PageParams {
  'created_at[gt]'?: string | null;

  'created_at[gte]'?: string | null;

  'created_at[lt]'?: string | null;

  'created_at[lte]'?: string | null;
}

export namespace Metrics {
  export import BillableMetric = MetricsAPI.BillableMetric;
  export import BillableMetricsPage = MetricsAPI.BillableMetricsPage;
  export import MetricCreateParams = MetricsAPI.MetricCreateParams;
  export import MetricUpdateParams = MetricsAPI.MetricUpdateParams;
  export import MetricListParams = MetricsAPI.MetricListParams;
}
