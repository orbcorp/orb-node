// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as DimensionalPriceGroupsAPI from './dimensional-price-groups';

export class ExternalDimensionalPriceGroupID extends APIResource {
  /**
   * Fetch dimensional price group by external ID
   */
  retrieve(
    externalDimensionalPriceGroupId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DimensionalPriceGroupsAPI.DimensionalPriceGroup> {
    return this._client.get(
      `/dimensional_price_groups/external_dimensional_price_group_id/${externalDimensionalPriceGroupId}`,
      options,
    );
  }
}
