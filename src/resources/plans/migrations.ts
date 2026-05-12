// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { Page, type PageParams } from '../../pagination';

/**
 * The [Plan](/core-concepts#plan-and-price) resource represents a plan that can be subscribed to by a
 * customer. Plans define the billing behavior of the subscription. You can see more about how to configure prices
 * in the [Price resource](/reference/price).
 */
export class Migrations extends APIResource {
  /**
   * Fetch migration
   */
  retrieve(
    planId: string,
    migrationId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MigrationRetrieveResponse> {
    return this._client.get(`/plans/${planId}/migrations/${migrationId}`, options);
  }

  /**
   * This endpoint returns a list of all migrations for a plan. The list of
   * migrations is ordered starting from the most recently created migration. The
   * response also includes pagination_metadata, which lets the caller retrieve the
   * next page of results if they exist.
   */
  list(
    planId: string,
    query?: MigrationListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MigrationListResponsesPage, MigrationListResponse>;
  list(
    planId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MigrationListResponsesPage, MigrationListResponse>;
  list(
    planId: string,
    query: MigrationListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<MigrationListResponsesPage, MigrationListResponse> {
    if (isRequestOptions(query)) {
      return this.list(planId, {}, query);
    }
    return this._client.getAPIList(`/plans/${planId}/migrations`, MigrationListResponsesPage, {
      query,
      ...options,
    });
  }

  /**
   * This endpoint cancels a migration.
   */
  cancel(
    planId: string,
    migrationId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MigrationCancelResponse> {
    return this._client.post(`/plans/${planId}/migrations/${migrationId}/cancel`, options);
  }
}

export class MigrationListResponsesPage extends Page<MigrationListResponse> {}

export interface MigrationRetrieveResponse {
  /**
   * Unique identifier for this plan version change.
   */
  id: string;

  /**
   * When the migration takes effect. Can be a specific date/time, or 'end_of_term'
   * when scheduled to be at the end of the current billing period.
   */
  effective_time: (string & {}) | (string & {}) | 'end_of_term' | null;

  /**
   * The ID of the plan being migrated.
   */
  plan_id: string;

  /**
   * Current status of the migration: 'not_started', 'in_progress', 'completed',
   * 'action_needed', or 'canceled'.
   */
  status: 'not_started' | 'in_progress' | 'completed' | 'action_needed' | 'canceled';
}

export interface MigrationListResponse {
  /**
   * Unique identifier for this plan version change.
   */
  id: string;

  /**
   * When the migration takes effect. Can be a specific date/time, or 'end_of_term'
   * when scheduled to be at the end of the current billing period.
   */
  effective_time: (string & {}) | (string & {}) | 'end_of_term' | null;

  /**
   * The ID of the plan being migrated.
   */
  plan_id: string;

  /**
   * Current status of the migration: 'not_started', 'in_progress', 'completed',
   * 'action_needed', or 'canceled'.
   */
  status: 'not_started' | 'in_progress' | 'completed' | 'action_needed' | 'canceled';
}

export interface MigrationCancelResponse {
  /**
   * Unique identifier for this plan version change.
   */
  id: string;

  /**
   * When the migration takes effect. Can be a specific date/time, or 'end_of_term'
   * when scheduled to be at the end of the current billing period.
   */
  effective_time: (string & {}) | (string & {}) | 'end_of_term' | null;

  /**
   * The ID of the plan being migrated.
   */
  plan_id: string;

  /**
   * Current status of the migration: 'not_started', 'in_progress', 'completed',
   * 'action_needed', or 'canceled'.
   */
  status: 'not_started' | 'in_progress' | 'completed' | 'action_needed' | 'canceled';
}

export interface MigrationListParams extends PageParams {}

Migrations.MigrationListResponsesPage = MigrationListResponsesPage;

export declare namespace Migrations {
  export {
    type MigrationRetrieveResponse as MigrationRetrieveResponse,
    type MigrationListResponse as MigrationListResponse,
    type MigrationCancelResponse as MigrationCancelResponse,
    MigrationListResponsesPage as MigrationListResponsesPage,
    type MigrationListParams as MigrationListParams,
  };
}
