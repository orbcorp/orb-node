// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { Page, type PageParams } from '../pagination';

export class Items extends APIResource {
  /**
   * This endpoint is used to create an [Item](/core-concepts#item).
   */
  create(body: ItemCreateParams, options?: Core.RequestOptions): Core.APIPromise<Item> {
    return this._client.post('/items', { body, ...options });
  }

  /**
   * This endpoint can be used to update properties on the Item.
   */
  update(itemId: string, body: ItemUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Item> {
    return this._client.put(`/items/${itemId}`, { body, ...options });
  }

  /**
   * This endpoint returns a list of all Items, ordered in descending order by
   * creation time.
   */
  list(query?: ItemListParams, options?: Core.RequestOptions): Core.PagePromise<ItemsPage, Item>;
  list(options?: Core.RequestOptions): Core.PagePromise<ItemsPage, Item>;
  list(
    query: ItemListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ItemsPage, Item> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/items', ItemsPage, { query, ...options });
  }

  /**
   * Archive item
   */
  archive(itemId: string, options?: Core.RequestOptions): Core.APIPromise<Item> {
    return this._client.post(`/items/${itemId}/archive`, options);
  }

  /**
   * This endpoint returns an item identified by its item_id.
   */
  fetch(itemId: string, options?: Core.RequestOptions): Core.APIPromise<Item> {
    return this._client.get(`/items/${itemId}`, options);
  }
}

export class ItemsPage extends Page<Item> {}

/**
 * The Item resource represents a sellable product or good. Items are associated
 * with all line items, billable metrics, and prices and are used for defining
 * external sync behavior for invoices and tax calculation purposes.
 */
export interface Item {
  id: string;

  created_at: string;

  external_connections: Array<Item.ExternalConnection>;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

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

export interface ItemCreateParams {
  /**
   * The name of the item.
   */
  name: string;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface ItemUpdateParams {
  external_connections?: Array<ItemUpdateParams.ExternalConnection> | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;

  name?: string | null;
}

export namespace ItemUpdateParams {
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

Items.ItemsPage = ItemsPage;

export declare namespace Items {
  export {
    type Item as Item,
    ItemsPage as ItemsPage,
    type ItemCreateParams as ItemCreateParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemListParams as ItemListParams,
  };
}
