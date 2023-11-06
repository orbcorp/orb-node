// File generated from our OpenAPI spec by Stainless.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const orb = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource events', () => {
  test('update: only required params', async () => {
    const responsePromise = orb.events.update('string', {
      event_name: 'string',
      properties: {},
      timestamp: '2020-12-09T16:09:53Z',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await orb.events.update('string', {
      event_name: 'string',
      properties: {},
      timestamp: '2020-12-09T16:09:53Z',
      customer_id: 'string',
      external_customer_id: 'string',
    });
  });

  test('deprecate', async () => {
    const responsePromise = orb.events.deprecate('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('deprecate: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(orb.events.deprecate('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('ingest: only required params', async () => {
    const responsePromise = orb.events.ingest({
      events: [
        {
          event_name: 'string',
          timestamp: '2020-12-09T16:09:53Z',
          properties: {},
          idempotency_key: 'string',
        },
        {
          event_name: 'string',
          timestamp: '2020-12-09T16:09:53Z',
          properties: {},
          idempotency_key: 'string',
        },
        {
          event_name: 'string',
          timestamp: '2020-12-09T16:09:53Z',
          properties: {},
          idempotency_key: 'string',
        },
      ],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('ingest: required and optional params', async () => {
    const response = await orb.events.ingest({
      events: [
        {
          customer_id: 'string',
          external_customer_id: 'string',
          event_name: 'string',
          timestamp: '2020-12-09T16:09:53Z',
          properties: {},
          idempotency_key: 'string',
        },
        {
          customer_id: 'string',
          external_customer_id: 'string',
          event_name: 'string',
          timestamp: '2020-12-09T16:09:53Z',
          properties: {},
          idempotency_key: 'string',
        },
        {
          customer_id: 'string',
          external_customer_id: 'string',
          event_name: 'string',
          timestamp: '2020-12-09T16:09:53Z',
          properties: {},
          idempotency_key: 'string',
        },
      ],
      backfill_id: 'string',
      debug: true,
    });
  });

  test('search: only required params', async () => {
    const responsePromise = orb.events.search({ event_ids: ['string', 'string', 'string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('search: required and optional params', async () => {
    const response = await orb.events.search({ event_ids: ['string', 'string', 'string'] });
  });
});
