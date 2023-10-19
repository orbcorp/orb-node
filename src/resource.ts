// File generated from our OpenAPI spec by Stainless.

import type { Orb } from './index';

export class APIResource {
  protected client: Orb;
  constructor(client: Orb) {
    this.client = client;

    this.get = client.get.bind(client);
    this.post = client.post.bind(client);
    this.patch = client.patch.bind(client);
    this.put = client.put.bind(client);
    this.delete = client.delete.bind(client);
    this.getAPIList = client.getAPIList.bind(client);
  }

  protected get: Orb['get'];
  protected post: Orb['post'];
  protected patch: Orb['patch'];
  protected put: Orb['put'];
  protected delete: Orb['delete'];
  protected getAPIList: Orb['getAPIList'];
}
