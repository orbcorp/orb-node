// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as TopLevelAPI from './top-level';

export class TopLevel extends APIResource {
  /**
   * This endpoint allows you to test your connection to the Orb API and check the
   * validity of your API key, passed in the Authorization header. This is
   * particularly useful for checking that your environment is set up properly, and
   * is a great choice for connectors and integrations.
   *
   * This API does not have any side-effects or return any Orb resources.
   */
  ping(options?: Core.RequestOptions): Core.APIPromise<TopLevelPingResponse> {
    return this._client.get('/ping', options);
  }
}

export interface TopLevelPingResponse {
  response: string;
}

export namespace TopLevel {
  export type TopLevelPingResponse = TopLevelAPI.TopLevelPingResponse;
}
