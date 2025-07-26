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

  /**
   * This endpoint can be used to update the `external_dimensional_price_group_id`
   * and `metadata` of an existing dimensional price group. Other fields on a
   * dimensional price group are currently immutable.
   */
  update(
    externalDimensionalPriceGroupId: string,
    body: ExternalDimensionalPriceGroupIDUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DimensionalPriceGroupsAPI.DimensionalPriceGroup> {
    return this._client.put(
      `/dimensional_price_groups/external_dimensional_price_group_id/${externalDimensionalPriceGroupId}`,
      { body, ...options },
    );
  }
}

export interface ExternalDimensionalPriceGroupIDUpdateParams {
  /**
   * An optional user-defined ID for this dimensional price group resource, used
   * throughout the system as an alias for this dimensional price group. Use this
   * field to identify a dimensional price group by an existing identifier in your
   * system.
   */
  body_external_dimensional_price_group_id?: string | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: { [key: string]: string | null } | null;
}

export declare namespace ExternalDimensionalPriceGroupID {
  export { type ExternalDimensionalPriceGroupIDUpdateParams as ExternalDimensionalPriceGroupIDUpdateParams };
}
