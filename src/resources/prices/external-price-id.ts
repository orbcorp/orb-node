// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import * as PricesAPI from 'orb-billing/resources/prices/prices';

export class ExternalPriceID extends APIResource {
  /**
   * This endpoint returns a price given an external price id. See the
   * [price creation API](../reference/create-price) for more information about
   * external price aliases.
   */
  fetch(externalPriceId: string, options?: Core.RequestOptions): Core.APIPromise<PricesAPI.Price> {
    return this._client.get(`/prices/external_price_id/${externalPriceId}`, options);
  }
}
