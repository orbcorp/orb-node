// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { Page, type PageParams } from '../../pagination';

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
  id: string;

  effective_time: (string & {}) | (string & {}) | 'end_of_term' | null;

  plan_id: string;

  status: 'not_started' | 'in_progress' | 'completed' | 'action_needed' | 'canceled';
}

export interface MigrationListResponse {
  id: string;

  effective_time: (string & {}) | (string & {}) | 'end_of_term' | null;

  plan_id: string;

  status: 'not_started' | 'in_progress' | 'completed' | 'action_needed' | 'canceled';
}

export interface MigrationCancelResponse {
  id: string;

  effective_time: (string & {}) | (string & {}) | 'end_of_term' | null;

  plan_id: string;

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
