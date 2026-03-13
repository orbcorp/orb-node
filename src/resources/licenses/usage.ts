// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as Shared from '../shared';

export class Usage extends APIResource {
  /**
   * Returns usage and remaining credits for all licenses of a given type on a
   * subscription.
   *
   * Date range defaults to the current billing period if not specified.
   */
  getAllUsage(
    query: UsageGetAllUsageParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<UsageGetAllUsageResponse> {
    return this._client.get('/licenses/usage', { query, ...options });
  }

  /**
   * Returns usage and remaining credits for a specific license over a date range.
   *
   * Date range defaults to the current billing period if not specified.
   */
  getUsage(
    licenseId: string,
    query?: UsageGetUsageParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<UsageGetUsageResponse>;
  getUsage(licenseId: string, options?: Core.RequestOptions): Core.APIPromise<UsageGetUsageResponse>;
  getUsage(
    licenseId: string,
    query: UsageGetUsageParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<UsageGetUsageResponse> {
    if (isRequestOptions(query)) {
      return this.getUsage(licenseId, {}, query);
    }
    return this._client.get(`/licenses/${licenseId}/usage`, { query, ...options });
  }
}

export interface UsageGetAllUsageResponse {
  data: Array<UsageGetAllUsageResponse.Data>;

  pagination_metadata: Shared.PaginationMetadata;
}

export namespace UsageGetAllUsageResponse {
  /**
   * The LicenseUsage resource represents usage and remaining credits for a license
   * over a date range.
   *
   * When grouped by 'day' only, license_id and external_license_id will be null as
   * the data is aggregated across all licenses.
   */
  export interface Data {
    /**
     * The total credits allocated to this license for the period.
     */
    allocated_credits: number;

    /**
     * The credits consumed by this license for the period.
     */
    consumed_credits: number;

    /**
     * The end date of the usage period.
     */
    end_date: string;

    /**
     * The unique identifier for the license type.
     */
    license_type_id: string;

    /**
     * The pricing unit for the credits (e.g., 'credits').
     */
    pricing_unit: string;

    /**
     * The remaining credits available for this license (allocated - consumed).
     */
    remaining_credits: number;

    /**
     * The start date of the usage period.
     */
    start_date: string;

    /**
     * The unique identifier for the subscription.
     */
    subscription_id: string;

    /**
     * Credits consumed while the license was active (eligible for individual
     * allocation deduction).
     */
    allocation_eligible_credits?: number | null;

    /**
     * The external identifier for the license. Null when grouped by day only.
     */
    external_license_id?: string | null;

    /**
     * The unique identifier for the license. Null when grouped by day only.
     */
    license_id?: string | null;

    /**
     * Credits consumed while the license was inactive (draws from shared pool, not
     * individual allocation).
     */
    shared_pool_credits?: number | null;
  }
}

export interface UsageGetUsageResponse {
  data: Array<UsageGetUsageResponse.Data>;

  pagination_metadata: Shared.PaginationMetadata;
}

export namespace UsageGetUsageResponse {
  /**
   * The LicenseUsage resource represents usage and remaining credits for a license
   * over a date range.
   *
   * When grouped by 'day' only, license_id and external_license_id will be null as
   * the data is aggregated across all licenses.
   */
  export interface Data {
    /**
     * The total credits allocated to this license for the period.
     */
    allocated_credits: number;

    /**
     * The credits consumed by this license for the period.
     */
    consumed_credits: number;

    /**
     * The end date of the usage period.
     */
    end_date: string;

    /**
     * The unique identifier for the license type.
     */
    license_type_id: string;

    /**
     * The pricing unit for the credits (e.g., 'credits').
     */
    pricing_unit: string;

    /**
     * The remaining credits available for this license (allocated - consumed).
     */
    remaining_credits: number;

    /**
     * The start date of the usage period.
     */
    start_date: string;

    /**
     * The unique identifier for the subscription.
     */
    subscription_id: string;

    /**
     * Credits consumed while the license was active (eligible for individual
     * allocation deduction).
     */
    allocation_eligible_credits?: number | null;

    /**
     * The external identifier for the license. Null when grouped by day only.
     */
    external_license_id?: string | null;

    /**
     * The unique identifier for the license. Null when grouped by day only.
     */
    license_id?: string | null;

    /**
     * Credits consumed while the license was inactive (draws from shared pool, not
     * individual allocation).
     */
    shared_pool_credits?: number | null;
  }
}

export interface UsageGetAllUsageParams {
  /**
   * The license type ID to filter licenses by.
   */
  license_type_id: string;

  /**
   * The subscription ID to get license usage for.
   */
  subscription_id: string;

  /**
   * Pagination cursor from a previous request.
   */
  cursor?: string | null;

  /**
   * End date for the usage period (YYYY-MM-DD). Defaults to end of current billing
   * period.
   */
  end_date?: string | null;

  /**
   * How to group the results. Valid values: 'license', 'day'. Can be combined (e.g.,
   * 'license,day').
   */
  group_by?: Array<string> | null;

  /**
   * Maximum number of rows in the response data (default 20, max 100).
   */
  limit?: number;

  /**
   * Start date for the usage period (YYYY-MM-DD). Defaults to start of current
   * billing period.
   */
  start_date?: string | null;
}

export interface UsageGetUsageParams {
  /**
   * Pagination cursor from a previous request.
   */
  cursor?: string | null;

  /**
   * End date for the usage period (YYYY-MM-DD). Defaults to end of current billing
   * period.
   */
  end_date?: string | null;

  /**
   * How to group the results. Valid values: 'license', 'day'. Can be combined (e.g.,
   * 'license,day').
   */
  group_by?: Array<string> | null;

  /**
   * Maximum number of rows in the response data (default 20, max 100).
   */
  limit?: number;

  /**
   * Start date for the usage period (YYYY-MM-DD). Defaults to start of current
   * billing period.
   */
  start_date?: string | null;
}

export declare namespace Usage {
  export {
    type UsageGetAllUsageResponse as UsageGetAllUsageResponse,
    type UsageGetUsageResponse as UsageGetUsageResponse,
    type UsageGetAllUsageParams as UsageGetAllUsageParams,
    type UsageGetUsageParams as UsageGetUsageParams,
  };
}
