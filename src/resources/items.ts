// File generated from our OpenAPI spec by Stainless.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import { isRequestOptions } from 'orb-billing/core';
import * as ItemsAPI from 'orb-billing/resources/items';
import { Page, type PageParams } from 'orb-billing/pagination';

export class Items extends APIResource {
  /**
   * This endpoint is used to create an [Item](../guides/concepts#item).
   */
  create(body: ItemCreateParams, options?: Core.RequestOptions): Core.APIPromise<Item> {
    return this.post('/items', { body, ...options });
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
    return this.getAPIList('/items', ItemsPage, { query, ...options });
  }

  /**
   * This endpoint returns an item identified by its item_id.
   */
  fetch(itemId: string, options?: Core.RequestOptions): Core.APIPromise<Item> {
    return this.get(`/items/${itemId}`, options);
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

export interface ItemListParams extends PageParams {}

export namespace Items {
  export import Item = ItemsAPI.Item;
  export import ItemsPage = ItemsAPI.ItemsPage;
  export import ItemCreateParams = ItemsAPI.ItemCreateParams;
  export import ItemListParams = ItemsAPI.ItemListParams;
}
