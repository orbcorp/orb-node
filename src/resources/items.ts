// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as ItemsAPI from './items';
import { Page, type PageParams } from '../pagination';

export class Items extends APIResource {
  /**
   * This endpoint is used to create an [Item](../guides/concepts#item).
   */
  create(body: ItemCreateParams, options?: Core.RequestOptions): Core.APIPromise<Item> {
    return this._client.post('/items', { body, ...options });
  }

  /**
   * This endpoint can be used to update properties on the Item.
   */
  update(itemId: string, body?: ItemUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Item>;
  update(itemId: string, options?: Core.RequestOptions): Core.APIPromise<Item>;
  update(
    itemId: string,
    body: ItemUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Item> {
    if (isRequestOptions(body)) {
      return this.update(itemId, {}, body);
    }
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
}

export interface ItemUpdateParams {
  external_connections?: Array<ItemUpdateParams.ExternalConnection> | null;

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

export namespace Items {
  export import Item = ItemsAPI.Item;
  export import ItemsPage = ItemsAPI.ItemsPage;
  export import ItemCreateParams = ItemsAPI.ItemCreateParams;
  export import ItemUpdateParams = ItemsAPI.ItemUpdateParams;
  export import ItemListParams = ItemsAPI.ItemListParams;
}
