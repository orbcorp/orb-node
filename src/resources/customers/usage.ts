// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as UsageAPI from './usage';

export class Usage extends APIResource {
  /**
   * This endpoint is used to amend usage within a timeframe for a customer that has
   * an active subscription.
   *
   * This endpoint will mark _all_ existing events within
   * `[timeframe_start, timeframe_end)` as _ignored_ for billing purposes, and Orb
   * will only use the _new_ events passed in the body of this request as the source
   * of truth for that timeframe moving forwards. Note that a given time period can
   * be amended any number of times, so events can be overwritten in subsequent calls
   * to th is endpoint.
   *
   * This is a powerful and audit-safe mechanism to retroactively change usage data
   * in cases where you need to:
   *
   * - decrease historical usage consumption because of degraded service availability
   *   in your systems
   * - account for gaps from your usage reporting mechanism
   * - make point-in-time fixes for specific event records, while retaining the
   *   original time of usage and associated metadata. This amendment API is designed
   *   with two explicit goals:
   *
   * 1. Amendments are **always audit-safe**. The amendment process will still retain
   *    original events in the timeframe, though they will be ignored for billing
   *    calculations. For auditing a nd data fidelity purposes, Orb never overwrites
   *    or permanently deletes ingested usage data.
   * 2. Amendments always preserve data **consistency**. In other words, either an
   *    amendment is fully processed by the system (and the new events for the
   *    timeframe are honored rather than the existing ones) or the amendment request
   *    fails. To maintain this important property, Orb prevents _partial event
   *    ingestion_ on this endpoint.
   *
   * ## Response semantics
   *
   * - Either all events are ingested successfully, or all fail to ingest (returning
   *   a `4xx` or `5xx` response code).
   * - Any event that fails schema validation will lead to a `4xx` response. In this
   *   case, to maintain data consistency, Orb will not ingest any events and will
   *   also not deprecate existing events in the time period.
   * - You can assume that the amendment is successful on receipt of a `2xx`
   *   response.While a successful response from this endpoint indicates that the new
   *   events have been ingested, updating usage totals happens asynchronously and
   *   may be delayed by a few minutes.
   *
   * As emphasized above, Orb will never show an inconsistent state (e.g. in invoice
   * previews or dashboards); either it will show the existing state (before the
   * amendment) or the new state (with new events in the requested timeframe).
   *
   * ## Sample request body
   *
   * ```json
   * {
   *   "events": [
   *     {
   *       "event_name": "payment_processed",
   *       "timestamp": "2022-03-24T07:15:00Z",
   *       "properties": {
   *         "amount": 100
   *       }
   *     },
   *     {
   *       "event_name": "payment_failed",
   *       "timestamp": "2022-03-24T07:15:00Z",
   *       "properties": {
   *         "amount": 100
   *       }
   *     }
   *   ]
   * }
   * ```
   *
   * ## Request Validation
   *
   * - The `timestamp` of each event reported must fall within the bounds of
   *   `timeframe_start` and `timeframe_end`. As with ingestion, all timesta mps must
   *   be sent in ISO8601 format with UTC timezone offset.
   * - Orb **does not accept an `idempotency_key`** with each event in this endpoint,
   *   since the entirety of the event list must be ingested to ensure consistency.
   *   On retryable errors , you should retry the request in its entirety, and assume
   *   that the amendment operation has not succeeded until receipt of a `2xx`.
   *
   * - Both `timeframe_start` and `timeframe_end` must be timestamps in the past.
   *   Furthermore, Orb will genera lly validate that the `timeframe_start` and
   *   `timeframe_end` fall within the customer's _current_ subscription billing pe
   *   riod. However, Orb does allow amendments while in the grace period of the
   *   previous billing period; in this instance, the timeframe can start before the
   *   current period.
   *
   * ## API Limits
   *
   * Note that Orb does not currently enforce a hard rate- limit for API usage or a
   * maximum request payload size. Similar to the event ingestion API, this API is
   * architected for h igh-throughput ingestion. It is also safe to
   * _programmatically_ call this endpoint if your system can automatically dete ct a
   * need for historical amendment.
   *
   * In order to overwrite timeframes with a very large number of events, we suggest
   * using multiple calls with small adjacent (e.g. every hour) timeframes.
   *
   * @deprecated This method will be removed in a future release. Please use the 'events.backfills.create' instead.
   */
  update(
    id: string,
    params: UsageUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<UsageUpdateResponse> {
    const { timeframe_end, timeframe_start, ...body } = params;
    return this._client.patch(`/customers/${id}/usage`, {
      query: { timeframe_end, timeframe_start },
      body,
      ...options,
    });
  }

  /**
   * This endpoint is used to amend usage within a timeframe for a customer that has
   * an active subscription.
   *
   * This endpoint will mark _all_ existing events within
   * `[timeframe_start, timeframe_end)` as _ignored_ for billing purposes, and Orb
   * will only use the _new_ events passed in the body of this request as the source
   * of truth for that timeframe moving forwards. Note that a given time period can
   * be amended any number of times, so events can be overwritten in subsequent calls
   * to th is endpoint.
   *
   * This is a powerful and audit-safe mechanism to retroactively change usage data
   * in cases where you need to:
   *
   * - decrease historical usage consumption because of degraded service availability
   *   in your systems
   * - account for gaps from your usage reporting mechanism
   * - make point-in-time fixes for specific event records, while retaining the
   *   original time of usage and associated metadata. This amendment API is designed
   *   with two explicit goals:
   *
   * 1. Amendments are **always audit-safe**. The amendment process will still retain
   *    original events in the timeframe, though they will be ignored for billing
   *    calculations. For auditing a nd data fidelity purposes, Orb never overwrites
   *    or permanently deletes ingested usage data.
   * 2. Amendments always preserve data **consistency**. In other words, either an
   *    amendment is fully processed by the system (and the new events for the
   *    timeframe are honored rather than the existing ones) or the amendment request
   *    fails. To maintain this important property, Orb prevents _partial event
   *    ingestion_ on this endpoint.
   *
   * ## Response semantics
   *
   * - Either all events are ingested successfully, or all fail to ingest (returning
   *   a `4xx` or `5xx` response code).
   * - Any event that fails schema validation will lead to a `4xx` response. In this
   *   case, to maintain data consistency, Orb will not ingest any events and will
   *   also not deprecate existing events in the time period.
   * - You can assume that the amendment is successful on receipt of a `2xx`
   *   response.While a successful response from this endpoint indicates that the new
   *   events have been ingested, updating usage totals happens asynchronously and
   *   may be delayed by a few minutes.
   *
   * As emphasized above, Orb will never show an inconsistent state (e.g. in invoice
   * previews or dashboards); either it will show the existing state (before the
   * amendment) or the new state (with new events in the requested timeframe).
   *
   * ## Sample request body
   *
   * ```json
   * {
   *   "events": [
   *     {
   *       "event_name": "payment_processed",
   *       "timestamp": "2022-03-24T07:15:00Z",
   *       "properties": {
   *         "amount": 100
   *       }
   *     },
   *     {
   *       "event_name": "payment_failed",
   *       "timestamp": "2022-03-24T07:15:00Z",
   *       "properties": {
   *         "amount": 100
   *       }
   *     }
   *   ]
   * }
   * ```
   *
   * ## Request Validation
   *
   * - The `timestamp` of each event reported must fall within the bounds of
   *   `timeframe_start` and `timeframe_end`. As with ingestion, all timesta mps must
   *   be sent in ISO8601 format with UTC timezone offset.
   * - Orb **does not accept an `idempotency_key`** with each event in this endpoint,
   *   since the entirety of the event list must be ingested to ensure consistency.
   *   On retryable errors , you should retry the request in its entirety, and assume
   *   that the amendment operation has not succeeded until receipt of a `2xx`.
   *
   * - Both `timeframe_start` and `timeframe_end` must be timestamps in the past.
   *   Furthermore, Orb will genera lly validate that the `timeframe_start` and
   *   `timeframe_end` fall within the customer's _current_ subscription billing pe
   *   riod. However, Orb does allow amendments while in the grace period of the
   *   previous billing period; in this instance, the timeframe can start before the
   *   current period.
   *
   * ## API Limits
   *
   * Note that Orb does not currently enforce a hard rate- limit for API usage or a
   * maximum request payload size. Similar to the event ingestion API, this API is
   * architected for h igh-throughput ingestion. It is also safe to
   * _programmatically_ call this endpoint if your system can automatically dete ct a
   * need for historical amendment.
   *
   * In order to overwrite timeframes with a very large number of events, we suggest
   * using multiple calls with small adjacent (e.g. every hour) timeframes.
   *
   * @deprecated This method will be removed in a future release. Please use the 'events.backfills.create' instead.
   */
  updateByExternalId(
    id: string,
    params: UsageUpdateByExternalIDParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<UsageUpdateByExternalIDResponse> {
    const { timeframe_end, timeframe_start, ...body } = params;
    return this._client.patch(`/customers/external_customer_id/${id}/usage`, {
      query: { timeframe_end, timeframe_start },
      body,
      ...options,
    });
  }
}

export interface UsageUpdateResponse {
  /**
   * An array of strings, corresponding to idempotency_key's marked as duplicates
   * (previously ingested)
   */
  duplicate: Array<string>;

  /**
   * An array of strings, corresponding to idempotency_key's which were successfully
   * ingested.
   */
  ingested: Array<string>;
}

export interface UsageUpdateByExternalIDResponse {
  /**
   * An array of strings, corresponding to idempotency_key's marked as duplicates
   * (previously ingested)
   */
  duplicate: Array<string>;

  /**
   * An array of strings, corresponding to idempotency_key's which were successfully
   * ingested.
   */
  ingested: Array<string>;
}

export interface UsageUpdateParams {
  /**
   * Body param: Events to update
   */
  events: Array<UsageUpdateParams.Event>;

  /**
   * Query param: This bound is exclusive (i.e. events before this timestamp will be
   * updated)
   */
  timeframe_end?: string;

  /**
   * Query param: This bound is inclusive (i.e. events with this timestamp onward,
   * inclusive will be updated)
   */
  timeframe_start?: string;
}

export namespace UsageUpdateParams {
  export interface Event {
    /**
     * A name to meaningfully identify the action or event type.
     */
    event_name: string;

    /**
     * A dictionary of custom properties. Values in this dictionary must be numeric,
     * boolean, or strings. Nested dictionaries are disallowed.
     */
    properties: unknown;

    /**
     * An ISO 8601 format date with no timezone offset (i.e. UTC). This should
     * represent the time that usage was recorded, and is particularly important to
     * attribute usage to a given billing period.
     */
    timestamp: string;

    /**
     * The Orb Customer identifier
     */
    customer_id?: string | null;

    /**
     * An alias for the Orb customer, whose mapping is specified when creating the
     * customer
     */
    external_customer_id?: string | null;
  }
}

export interface UsageUpdateByExternalIDParams {
  /**
   * Body param: Events to update
   */
  events: Array<UsageUpdateByExternalIDParams.Event>;

  /**
   * Query param: This bound is exclusive (i.e. events before this timestamp will be
   * updated)
   */
  timeframe_end?: string;

  /**
   * Query param: This bound is inclusive (i.e. events with this timestamp onward,
   * inclusive will be updated)
   */
  timeframe_start?: string;
}

export namespace UsageUpdateByExternalIDParams {
  export interface Event {
    /**
     * A name to meaningfully identify the action or event type.
     */
    event_name: string;

    /**
     * A dictionary of custom properties. Values in this dictionary must be numeric,
     * boolean, or strings. Nested dictionaries are disallowed.
     */
    properties: unknown;

    /**
     * An ISO 8601 format date with no timezone offset (i.e. UTC). This should
     * represent the time that usage was recorded, and is particularly important to
     * attribute usage to a given billing period.
     */
    timestamp: string;

    /**
     * The Orb Customer identifier
     */
    customer_id?: string | null;

    /**
     * An alias for the Orb customer, whose mapping is specified when creating the
     * customer
     */
    external_customer_id?: string | null;
  }
}

export namespace Usage {
  export import UsageUpdateResponse = UsageAPI.UsageUpdateResponse;
  export import UsageUpdateByExternalIDResponse = UsageAPI.UsageUpdateByExternalIDResponse;
  export import UsageUpdateParams = UsageAPI.UsageUpdateParams;
  export import UsageUpdateByExternalIDParams = UsageAPI.UsageUpdateByExternalIDParams;
}
