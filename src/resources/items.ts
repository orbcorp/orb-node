// File generated from our OpenAPI spec by Stainless.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import { isRequestOptions } from 'orb-billing/core';
import * as ItemsAPI from 'orb-billing/resources/items';
import { Page, type PageParams } from 'orb-billing/pagination';

export class Items extends APIResource {
  /**
   * This endpoint returns a list of all Items, ordered in descending order by
   * creation time.
   */
  list(
    query?: ItemListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ItemListResponsesPage, ItemListResponse>;
  list(options?: Core.RequestOptions): Core.PagePromise<ItemListResponsesPage, ItemListResponse>;
  list(
    query: ItemListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ItemListResponsesPage, ItemListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/items', ItemListResponsesPage, { query, ...options });
  }

  /**
   * This endpoint returns an item identified by its item_id.
   */
  fetch(itemId: string, options?: Core.RequestOptions): Core.APIPromise<ItemFetchResponse> {
    return this.get(`/items/${itemId}`, options);
  }
}

export class ItemListResponsesPage extends Page<ItemListResponse> {}

/**
 * The Item resource represents a sellable product or good. Items are associated
 * with all line items, billable metrics, and prices and are used for defining
 * external sync behavior for invoices and tax calculation purposes.
 */
export interface ItemListResponse {
  id: string;

  created_at: string;

  external_connections: Array<ItemListResponse.ExternalConnection>;

  name: string;
}

export namespace ItemListResponse {
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

/**
 * The Item resource represents a sellable product or good. Items are associated
 * with all line items, billable metrics, and prices and are used for defining
 * external sync behavior for invoices and tax calculation purposes.
 */
export interface ItemFetchResponse {
  id: string;

  created_at: string;

  external_connections: Array<ItemFetchResponse.ExternalConnection>;

  name: string;
}

export namespace ItemFetchResponse {
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

export interface ItemListParams extends PageParams {}

export namespace Items {
  export import ItemListResponse = ItemsAPI.ItemListResponse;
  export import ItemFetchResponse = ItemsAPI.ItemFetchResponse;
  export import ItemListResponsesPage = ItemsAPI.ItemListResponsesPage;
  export import ItemListParams = ItemsAPI.ItemListParams;
}
