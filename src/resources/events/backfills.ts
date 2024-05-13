// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../../core';
import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as BackfillsAPI from './backfills';
import { Page, type PageParams } from '../../pagination';

export class Backfills extends APIResource {
  /**
   * Creating the backfill enables adding or replacing past events, even those that
   * are older than the ingestion grace period. Performing a backfill in Orb involves
   * 3 steps:
   *
   * 1. Create the backfill, specifying its parameters.
   * 2. [Ingest](ingest) usage events, referencing the backfill (query parameter
   *    `backfill_id`).
   * 3. [Close](close-backfill) the backfill, propagating the update in past usage
   *    throughout Orb.
   *
   * Changes from a backfill are not reflected until the backfill is closed, so you
   * won’t need to worry about your customers seeing partially updated usage data.
   * Backfills are also reversible, so you’ll be able to revert a backfill if you’ve
   * made a mistake.
   *
   * This endpoint will return a backfill object, which contains an `id`. That `id`
   * can then be used as the `backfill_id` query parameter to the event ingestion
   * endpoint to associate ingested events with this backfill. The effects (e.g.
   * updated usage graphs) of this backfill will not take place until the backfill is
   * closed.
   *
   * If the `replace_existing_events` is `true`, existing events in the backfill's
   * timeframe will be replaced with the newly ingested events associated with the
   * backfill. If `false`, newly ingested events will be added to the existing
   * events.
   *
   * If a `customer_id` or `external_customer_id` is specified, the backfill will
   * only affect events for that customer. If neither is specified, the backfill will
   * affect all customers.
   */
  create(body: BackfillCreateParams, options?: Core.RequestOptions): Core.APIPromise<BackfillCreateResponse> {
    return this._client.post('/events/backfills', { body, ...options });
  }

  /**
   * This endpoint returns a list of all backfills in a list format.
   *
   * The list of backfills is ordered starting from the most recently created
   * backfill. The response also includes
   * [`pagination_metadata`](../reference/pagination), which lets the caller retrieve
   * the next page of results if they exist. More information about pagination can be
   * found in the [Pagination-metadata schema](pagination).
   */
  list(
    query?: BackfillListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BackfillListResponsesPage, BackfillListResponse>;
  list(options?: Core.RequestOptions): Core.PagePromise<BackfillListResponsesPage, BackfillListResponse>;
  list(
    query: BackfillListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<BackfillListResponsesPage, BackfillListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/events/backfills', BackfillListResponsesPage, { query, ...options });
  }

  /**
   * Closing a backfill makes the updated usage visible in Orb. Upon closing a
   * backfill, Orb will asynchronously reflect the updated usage in invoice amounts
   * and usage graphs. Once all of the updates are complete, the backfill's status
   * will transition to `reflected`.
   */
  close(backfillId: string, options?: Core.RequestOptions): Core.APIPromise<BackfillCloseResponse> {
    return this._client.post(`/events/backfills/${backfillId}/close`, options);
  }

  /**
   * This endpoint is used to fetch a backfill given an identifier.
   */
  fetch(backfillId: string, options?: Core.RequestOptions): Core.APIPromise<BackfillFetchResponse> {
    return this._client.get(`/events/backfills/${backfillId}`, options);
  }

  /**
   * Reverting a backfill undoes all the effects of closing the backfill. If the
   * backfill is reflected, the status will transition to `pending_revert` while the
   * effects of the backfill are undone. Once all effects are undone, the backfill
   * will transition to `reverted`.
   *
   * If a backfill is reverted before its closed, no usage will be updated as a
   * result of the backfill and it will immediately transition to `reverted`.
   */
  revert(backfillId: string, options?: Core.RequestOptions): Core.APIPromise<BackfillRevertResponse> {
    return this._client.post(`/events/backfills/${backfillId}/revert`, options);
  }
}

export class BackfillListResponsesPage extends Page<BackfillListResponse> {}

/**
 * A backfill represents an update to historical usage data, adding or replacing
 * events in a timeframe.
 */
export interface BackfillCreateResponse {
  id: string;

  /**
   * If in the future, the time at which the backfill will automatically close. If in
   * the past, the time at which the backfill was closed.
   */
  close_time: string | null;

  created_at: string;

  /**
   * The customer ID this backfill is scoped to. If null, this backfill is not scoped
   * to a single customer.
   */
  customer_id: string | null;

  /**
   * The number of events ingested in this backfill.
   */
  events_ingested: number;

  /**
   * The time at which this backfill was reverted.
   */
  reverted_at: string | null;

  /**
   * The status of the backfill.
   */
  status: 'pending' | 'reflected' | 'pending_revert' | 'reverted';

  timeframe_end: string;

  timeframe_start: string;
}

/**
 * A backfill represents an update to historical usage data, adding or replacing
 * events in a timeframe.
 */
export interface BackfillListResponse {
  id: string;

  /**
   * If in the future, the time at which the backfill will automatically close. If in
   * the past, the time at which the backfill was closed.
   */
  close_time: string | null;

  created_at: string;

  /**
   * The customer ID this backfill is scoped to. If null, this backfill is not scoped
   * to a single customer.
   */
  customer_id: string | null;

  /**
   * The number of events ingested in this backfill.
   */
  events_ingested: number;

  /**
   * The time at which this backfill was reverted.
   */
  reverted_at: string | null;

  /**
   * The status of the backfill.
   */
  status: 'pending' | 'reflected' | 'pending_revert' | 'reverted';

  timeframe_end: string;

  timeframe_start: string;
}

/**
 * A backfill represents an update to historical usage data, adding or replacing
 * events in a timeframe.
 */
export interface BackfillCloseResponse {
  id: string;

  /**
   * If in the future, the time at which the backfill will automatically close. If in
   * the past, the time at which the backfill was closed.
   */
  close_time: string | null;

  created_at: string;

  /**
   * The customer ID this backfill is scoped to. If null, this backfill is not scoped
   * to a single customer.
   */
  customer_id: string | null;

  /**
   * The number of events ingested in this backfill.
   */
  events_ingested: number;

  /**
   * The time at which this backfill was reverted.
   */
  reverted_at: string | null;

  /**
   * The status of the backfill.
   */
  status: 'pending' | 'reflected' | 'pending_revert' | 'reverted';

  timeframe_end: string;

  timeframe_start: string;
}

/**
 * A backfill represents an update to historical usage data, adding or replacing
 * events in a timeframe.
 */
export interface BackfillFetchResponse {
  id: string;

  /**
   * If in the future, the time at which the backfill will automatically close. If in
   * the past, the time at which the backfill was closed.
   */
  close_time: string | null;

  created_at: string;

  /**
   * The customer ID this backfill is scoped to. If null, this backfill is not scoped
   * to a single customer.
   */
  customer_id: string | null;

  /**
   * The number of events ingested in this backfill.
   */
  events_ingested: number;

  /**
   * The time at which this backfill was reverted.
   */
  reverted_at: string | null;

  /**
   * The status of the backfill.
   */
  status: 'pending' | 'reflected' | 'pending_revert' | 'reverted';

  timeframe_end: string;

  timeframe_start: string;
}

/**
 * A backfill represents an update to historical usage data, adding or replacing
 * events in a timeframe.
 */
export interface BackfillRevertResponse {
  id: string;

  /**
   * If in the future, the time at which the backfill will automatically close. If in
   * the past, the time at which the backfill was closed.
   */
  close_time: string | null;

  created_at: string;

  /**
   * The customer ID this backfill is scoped to. If null, this backfill is not scoped
   * to a single customer.
   */
  customer_id: string | null;

  /**
   * The number of events ingested in this backfill.
   */
  events_ingested: number;

  /**
   * The time at which this backfill was reverted.
   */
  reverted_at: string | null;

  /**
   * The status of the backfill.
   */
  status: 'pending' | 'reflected' | 'pending_revert' | 'reverted';

  timeframe_end: string;

  timeframe_start: string;
}

export interface BackfillCreateParams {
  /**
   * The (exclusive) end of the usage timeframe affected by this backfill.
   */
  timeframe_end: string;

  /**
   * The (inclusive) start of the usage timeframe affected by this backfill.
   */
  timeframe_start: string;

  /**
   * The time at which no more events will be accepted for this backfill. The
   * backfill will automatically begin reflecting throughout Orb at the close time.
   * If not specified, it will default to 1 day after the creation of the backfill.
   */
  close_time?: string | null;

  /**
   * The ID of the customer to which this backfill is scoped.
   */
  customer_id?: string | null;

  /**
   * The external customer ID of the customer to which this backfill is scoped.
   */
  external_customer_id?: string | null;

  /**
   * If true, replaces all existing events in the timeframe with the newly ingested
   * events. If false, adds the newly ingested events to the existing events.
   */
  replace_existing_events?: boolean;
}

export interface BackfillListParams extends PageParams {}

export namespace Backfills {
  export import BackfillCreateResponse = BackfillsAPI.BackfillCreateResponse;
  export import BackfillListResponse = BackfillsAPI.BackfillListResponse;
  export import BackfillCloseResponse = BackfillsAPI.BackfillCloseResponse;
  export import BackfillFetchResponse = BackfillsAPI.BackfillFetchResponse;
  export import BackfillRevertResponse = BackfillsAPI.BackfillRevertResponse;
  export import BackfillListResponsesPage = BackfillsAPI.BackfillListResponsesPage;
  export import BackfillCreateParams = BackfillsAPI.BackfillCreateParams;
  export import BackfillListParams = BackfillsAPI.BackfillListParams;
}
