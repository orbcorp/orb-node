// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as Shared from '../shared';

export class ExternalDimensionalPriceGroupID extends APIResource {
  /**
   * Fetch dimensional price group by external ID
   */
  retrieve(
    externalDimensionalPriceGroupId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.DimensionalPriceGroupModel> {
    return this._client.get(
      `/dimensional_price_groups/external_dimensional_price_group_id/${externalDimensionalPriceGroupId}`,
      options,
    );
  }
}
