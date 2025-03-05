// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as Shared from './shared';
import { ItemModelsPage } from './shared';
import { type PageParams } from '../pagination';

export class Items extends APIResource {
  /**
   * This endpoint is used to create an [Item](/core-concepts#item).
   */
  create(body: ItemCreateParams, options?: Core.RequestOptions): Core.APIPromise<Shared.ItemModel> {
    return this._client.post('/items', { body, ...options });
  }

  /**
   * This endpoint can be used to update properties on the Item.
   */
  update(
    itemId: string,
    body: ItemUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.ItemModel> {
    return this._client.put(`/items/${itemId}`, { body, ...options });
  }

  /**
   * This endpoint returns a list of all Items, ordered in descending order by
   * creation time.
   */
  list(
    query?: ItemListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ItemModelsPage, Shared.ItemModel>;
  list(options?: Core.RequestOptions): Core.PagePromise<ItemModelsPage, Shared.ItemModel>;
  list(
    query: ItemListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ItemModelsPage, Shared.ItemModel> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/items', ItemModelsPage, { query, ...options });
  }

  /**
   * This endpoint returns an item identified by its item_id.
   */
  fetch(itemId: string, options?: Core.RequestOptions): Core.APIPromise<Shared.ItemModel> {
    return this._client.get(`/items/${itemId}`, options);
  }
}

/**
 * The Item resource represents a sellable product or good. Items are associated
 * with all line items, billable metrics, and prices and are used for defining
 * external sync behavior for invoices and tax calculation purposes.
 */
export interface Item {
  id: string;

  created_at: string;

  external_connections: Array<Shared.ItemExternalConnectionModel>;

  name: string;
}

export interface ItemCreateParams {
  /**
   * The name of the item.
   */
  name: string;
}

export interface ItemUpdateParams {
  external_connections?: Array<Shared.ItemExternalConnectionModel> | null;

  name?: string | null;
}

export interface ItemListParams extends PageParams {}

export declare namespace Items {
  export {
    type Item as Item,
    type ItemCreateParams as ItemCreateParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemListParams as ItemListParams,
  };
}

export { ItemModelsPage };
