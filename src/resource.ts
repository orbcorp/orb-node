// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Orb } from './index';

export abstract class APIResource {
  protected _client: Orb;

  constructor(client: Orb) {
    this._client = client;
  }
}
