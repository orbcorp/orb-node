// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Volume extends APIResource {
  /**
   * This endpoint returns the event volume for an account in a
   * [paginated list format](/api-reference/pagination).
   *
   * The event volume is aggregated by the hour and the
   * [timestamp](/api-reference/event/ingest-events) field is used to determine which
   * hour an event is associated with. Note, this means that late-arriving events
   * increment the volume count for the hour window the timestamp is in, not the
   * latest hour window.
   *
   * Each item in the response contains the count of events aggregated by the hour
   * where the start and end time are hour-aligned and in UTC. When a specific
   * timestamp is passed in for either start or end time, the response includes the
   * hours the timestamp falls in.
   */
  list(query: VolumeListParams, options?: Core.RequestOptions): Core.APIPromise<EventVolumes> {
    return this._client.get('/events/volume', { query, ...options });
  }
}

export interface EventVolumes {
  data: Array<EventVolumes.Data>;
}

export namespace EventVolumes {
  /**
   * An EventVolume contains the event volume ingested in an hourly window. The
   * timestamp used for the aggregation is the `timestamp` datetime field on events.
   */
  export interface Data {
    /**
     * The number of events ingested with a timestamp between the timeframe
     */
    count: number;

    timeframe_end: string;

    timeframe_start: string;
  }
}

export interface VolumeListParams {
  /**
   * The start of the timeframe, inclusive, in which to return event volume. All
   * datetime values are converted to UTC time. If the specified time isn't
   * hour-aligned, the response includes the event volume count for the hour the time
   * falls in.
   */
  timeframe_start: string;

  /**
   * Cursor for pagination. This can be populated by the `next_cursor` value returned
   * from the initial request.
   */
  cursor?: string | null;

  /**
   * The number of items to fetch. Defaults to 20.
   */
  limit?: number;

  /**
   * The end of the timeframe, exclusive, in which to return event volume. If not
   * specified, the current time is used. All datetime values are converted to UTC
   * time.If the specified time isn't hour-aligned, the response includes the event
   * volumecount for the hour the time falls in.
   */
  timeframe_end?: string;
}

export declare namespace Volume {
  export { type EventVolumes as EventVolumes, type VolumeListParams as VolumeListParams };
}
