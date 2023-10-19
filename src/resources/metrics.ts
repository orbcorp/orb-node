// File generated from our OpenAPI spec by Stainless.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import { isRequestOptions } from 'orb-billing/core';
import * as MetricsAPI from 'orb-billing/resources/metrics';
import { Page, type PageParams } from 'orb-billing/pagination';

export class Metrics extends APIResource {
  /**
   * This endpoint is used to create a [metric](../guides/concepts##metric) using a
   * SQL string. See
   * [SQL support](../guides/extensibility/advanced-metrics#sql-support) for a
   * description of constructing SQL queries with examples.
   */
  create(body: MetricCreateParams, options?: Core.RequestOptions): Core.APIPromise<MetricCreateResponse> {
    return this.post('/metrics', { body, ...options });
  }

  /**
   * This endpoint is used to fetch [metric](../guides/concepts#metric) details given
   * a metric identifier. It returns information about the metrics including its
   * name, description, and item.
   */
  list(
    query?: MetricListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MetricListResponsesPage, MetricListResponse>;
  list(options?: Core.RequestOptions): Core.PagePromise<MetricListResponsesPage, MetricListResponse>;
  list(
    query: MetricListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<MetricListResponsesPage, MetricListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/metrics', MetricListResponsesPage, { query, ...options });
  }

  /**
   * This endpoint is used to list [metrics](../guides/concepts##metric). It returns
   * information about the metrics including its name, description, and item.
   */
  fetch(metricId: string, options?: Core.RequestOptions): Core.APIPromise<MetricFetchResponse> {
    return this.get(`/metrics/${metricId}`, options);
  }
}

export class MetricListResponsesPage extends Page<MetricListResponse> {}

/**
 * The Metric resource represents a calculation of a quantity based on events.
 * Metrics are defined by the query that transforms raw usage events into
 * meaningful values for your customers.
 */
export interface MetricCreateResponse {
  id: string;

  description: string | null;

  /**
   * The Item resource represents a sellable product or good. Items are associated
   * with all line items, billable metrics, and prices and are used for defining
   * external sync behavior for invoices and tax calculation purposes.
   */
  item: MetricCreateResponse.Item;

  metadata: Record<string, string>;

  name: string;

  status: 'active' | 'draft' | 'archived';
}

export namespace MetricCreateResponse {
  /**
   * The Item resource represents a sellable product or good. Items are associated
   * with all line items, billable metrics, and prices and are used for defining
   * external sync behavior for invoices and tax calculation purposes.
   */
  export interface Item {
    id: string;

    created_at: string;

    external_connections: Array<Item.ExternalConnection>;

    name: string;
  }

  export namespace Item {
    export interface ExternalConnection {
      external_connection_name:
        | 'stripe'
        | 'quickbooks'
        | 'bill.com'
        | 'netsuite'
        | 'taxjar'
        | 'avalara'
        | 'anrok';

      external_entity_id: string;
    }
  }
}

/**
 * The Metric resource represents a calculation of a quantity based on events.
 * Metrics are defined by the query that transforms raw usage events into
 * meaningful values for your customers.
 */
export interface MetricListResponse {
  id: string;

  description: string | null;

  /**
   * The Item resource represents a sellable product or good. Items are associated
   * with all line items, billable metrics, and prices and are used for defining
   * external sync behavior for invoices and tax calculation purposes.
   */
  item: MetricListResponse.Item;

  metadata: Record<string, string>;

  name: string;

  status: 'active' | 'draft' | 'archived';
}

export namespace MetricListResponse {
  /**
   * The Item resource represents a sellable product or good. Items are associated
   * with all line items, billable metrics, and prices and are used for defining
   * external sync behavior for invoices and tax calculation purposes.
   */
  export interface Item {
    id: string;

    created_at: string;

    external_connections: Array<Item.ExternalConnection>;

    name: string;
  }

  export namespace Item {
    export interface ExternalConnection {
      external_connection_name:
        | 'stripe'
        | 'quickbooks'
        | 'bill.com'
        | 'netsuite'
        | 'taxjar'
        | 'avalara'
        | 'anrok';

      external_entity_id: string;
    }
  }
}

/**
 * The Metric resource represents a calculation of a quantity based on events.
 * Metrics are defined by the query that transforms raw usage events into
 * meaningful values for your customers.
 */
export interface MetricFetchResponse {
  id: string;

  description: string | null;

  /**
   * The Item resource represents a sellable product or good. Items are associated
   * with all line items, billable metrics, and prices and are used for defining
   * external sync behavior for invoices and tax calculation purposes.
   */
  item: MetricFetchResponse.Item;

  metadata: Record<string, string>;

  name: string;

  status: 'active' | 'draft' | 'archived';
}

export namespace MetricFetchResponse {
  /**
   * The Item resource represents a sellable product or good. Items are associated
   * with all line items, billable metrics, and prices and are used for defining
   * external sync behavior for invoices and tax calculation purposes.
   */
  export interface Item {
    id: string;

    created_at: string;

    external_connections: Array<Item.ExternalConnection>;

    name: string;
  }

  export namespace Item {
    export interface ExternalConnection {
      external_connection_name:
        | 'stripe'
        | 'quickbooks'
        | 'bill.com'
        | 'netsuite'
        | 'taxjar'
        | 'avalara'
        | 'anrok';

      external_entity_id: string;
    }
  }
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
   * User-specified key value pairs, often useful for referencing internal resources
   * or IDs. Returned as-is in the metric resource.
   */
  metadata?: unknown | null;
}

export interface MetricListParams extends PageParams {
  'created_at[gt]'?: string | null;

  'created_at[gte]'?: string | null;

  'created_at[lt]'?: string | null;

  'created_at[lte]'?: string | null;
}

export namespace Metrics {
  export import MetricCreateResponse = MetricsAPI.MetricCreateResponse;
  export import MetricListResponse = MetricsAPI.MetricListResponse;
  export import MetricFetchResponse = MetricsAPI.MetricFetchResponse;
  export import MetricListResponsesPage = MetricsAPI.MetricListResponsesPage;
  export import MetricCreateParams = MetricsAPI.MetricCreateParams;
  export import MetricListParams = MetricsAPI.MetricListParams;
}
