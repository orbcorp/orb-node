// File generated from our OpenAPI spec by Stainless.

import { AbstractPage, Response, APIClient, FinalRequestOptions, PageInfo } from './core';

export interface PageResponse<Item> {
  data: Array<Item>;

  pagination_metadata: PageResponse.PaginationMetadata;
}

export namespace PageResponse {
  export interface PaginationMetadata {
    has_more: boolean;

    next_cursor: string | null;
  }
}

export interface PageParams {
  /**
   * Cursor for pagination. This can be populated by the `next_cursor` value returned
   * from the initial request.
   */
  cursor?: string | null;

  /**
   * The number of items to fetch. Defaults to 20.
   */
  limit?: number;
}

export class Page<Item> extends AbstractPage<Item> implements PageResponse<Item> {
  data: Array<Item>;

  pagination_metadata: PageResponse.PaginationMetadata;

  constructor(client: APIClient, response: Response, body: PageResponse<Item>, options: FinalRequestOptions) {
    super(client, response, body, options);

    this.data = body.data || [];
    this.pagination_metadata = body.pagination_metadata;
  }

  getPaginatedItems(): Item[] {
    return this.data ?? [];
  }

  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams(): Partial<PageParams> | null {
    const info = this.nextPageInfo();
    if (!info) return null;
    if ('params' in info) return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length) return null;
    return params;
  }

  nextPageInfo(): PageInfo | null {
    const cursor = this.pagination_metadata.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      params: {
        cursor: cursor,
      },
    };
  }
}
