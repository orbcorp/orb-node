// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as Shared from '../shared';
import { DimensionalPriceGroupModelsPage } from '../shared';
import * as ExternalDimensionalPriceGroupIDAPI from './external-dimensional-price-group-id';
import { ExternalDimensionalPriceGroupID } from './external-dimensional-price-group-id';
import { type PageParams } from '../../pagination';

export class DimensionalPriceGroups extends APIResource {
  externalDimensionalPriceGroupId: ExternalDimensionalPriceGroupIDAPI.ExternalDimensionalPriceGroupID =
    new ExternalDimensionalPriceGroupIDAPI.ExternalDimensionalPriceGroupID(this._client);

  /**
   * A dimensional price group is used to partition the result of a billable metric
   * by a set of dimensions. Prices in a price group must specify the parition used
   * to derive their usage.
   *
   * For example, suppose we have a billable metric that measures the number of
   * widgets used and we want to charge differently depending on the color of the
   * widget. We can create a price group with a dimension "color" and two prices: one
   * that charges $10 per red widget and one that charges $20 per blue widget.
   */
  create(
    body: DimensionalPriceGroupCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.DimensionalPriceGroupModel> {
    return this._client.post('/dimensional_price_groups', { body, ...options });
  }

  /**
   * Fetch dimensional price group
   */
  retrieve(
    dimensionalPriceGroupId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.DimensionalPriceGroupModel> {
    return this._client.get(`/dimensional_price_groups/${dimensionalPriceGroupId}`, options);
  }

  /**
   * List dimensional price groups
   */
  list(
    query?: DimensionalPriceGroupListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DimensionalPriceGroupModelsPage, Shared.DimensionalPriceGroupModel>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<DimensionalPriceGroupModelsPage, Shared.DimensionalPriceGroupModel>;
  list(
    query: DimensionalPriceGroupListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<DimensionalPriceGroupModelsPage, Shared.DimensionalPriceGroupModel> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/dimensional_price_groups', DimensionalPriceGroupModelsPage, {
      query,
      ...options,
    });
  }
}

/**
 * A dimensional price group is used to partition the result of a billable metric
 * by a set of dimensions. Prices in a price group must specify the parition used
 * to derive their usage.
 */
export interface DimensionalPriceGroup {
  id: string;

  /**
   * The billable metric associated with this dimensional price group. All prices
   * associated with this dimensional price group will be computed using this
   * billable metric.
   */
  billable_metric_id: string;

  /**
   * The dimensions that this dimensional price group is defined over
   */
  dimensions: Array<string>;

  /**
   * An alias for the dimensional price group
   */
  external_dimensional_price_group_id: string | null;

  /**
   * User specified key-value pairs for the resource. If not present, this defaults
   * to an empty dictionary. Individual keys can be removed by setting the value to
   * `null`, and the entire metadata mapping can be cleared by setting `metadata` to
   * `null`.
   */
  metadata: Record<string, string>;

  /**
   * The name of the dimensional price group
   */
  name: string;
}

export interface DimensionalPriceGroups {
  data: Array<Shared.DimensionalPriceGroupModel>;

  pagination_metadata: Shared.PaginationMetadata;
}

export interface DimensionalPriceGroupCreateParams {
  billable_metric_id: string;

  /**
   * The set of keys (in order) used to disambiguate prices in the group.
   */
  dimensions: Array<string>;

  name: string;

  external_dimensional_price_group_id?: string | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface DimensionalPriceGroupListParams extends PageParams {}

DimensionalPriceGroups.ExternalDimensionalPriceGroupID = ExternalDimensionalPriceGroupID;

export declare namespace DimensionalPriceGroups {
  export {
    type DimensionalPriceGroup as DimensionalPriceGroup,
    type DimensionalPriceGroups as DimensionalPriceGroups,
    type DimensionalPriceGroupCreateParams as DimensionalPriceGroupCreateParams,
    type DimensionalPriceGroupListParams as DimensionalPriceGroupListParams,
  };

  export { ExternalDimensionalPriceGroupID as ExternalDimensionalPriceGroupID };
}

export { DimensionalPriceGroupModelsPage };
