// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as ExternalPriceIDAPI from './external-price-id';
import * as PricesAPI from './prices';

export class ExternalPriceID extends APIResource {
  /**
   * This endpoint allows you to update the `metadata` property on a price. If you
   * pass null for the metadata value, it will clear any existing metadata for that
   * price.
   */
  update(
    externalPriceId: string,
    body?: ExternalPriceIDUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PricesAPI.Price>;
  update(externalPriceId: string, options?: Core.RequestOptions): Core.APIPromise<PricesAPI.Price>;
  update(
    externalPriceId: string,
    body: ExternalPriceIDUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<PricesAPI.Price> {
    if (isRequestOptions(body)) {
      return this.update(externalPriceId, {}, body);
    }
    return this._client.put(`/prices/external_price_id/${externalPriceId}`, { body, ...options });
  }

  /**
   * This endpoint returns a price given an external price id. See the
   * [price creation API](../reference/create-price) for more information about
   * external price aliases.
   */
  fetch(externalPriceId: string, options?: Core.RequestOptions): Core.APIPromise<PricesAPI.Price> {
    return this._client.get(`/prices/external_price_id/${externalPriceId}`, options);
  }
}

export interface ExternalPriceIDUpdateParams {
  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export namespace ExternalPriceID {
  export type ExternalPriceIDUpdateParams = ExternalPriceIDAPI.ExternalPriceIDUpdateParams;
}
