// File generated from our OpenAPI spec by Stainless.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const orb = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource usage', () => {
  test('update: only required params', async () => {
    const responsePromise = orb.customers.usage.update('string', {
      events: [
        { event_name: 'string', timestamp: '2020-12-09T16:09:53Z', properties: {} },
        { event_name: 'string', timestamp: '2020-12-09T16:09:53Z', properties: {} },
        { event_name: 'string', timestamp: '2020-12-09T16:09:53Z', properties: {} },
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

  test('update: required and optional params', async () => {
    const response = await orb.customers.usage.update('string', {
      events: [
        {
          customer_id: 'string',
          external_customer_id: 'string',
          event_name: 'string',
          timestamp: '2020-12-09T16:09:53Z',
          properties: {},
        },
        {
          customer_id: 'string',
          external_customer_id: 'string',
          event_name: 'string',
          timestamp: '2020-12-09T16:09:53Z',
          properties: {},
        },
        {
          customer_id: 'string',
          external_customer_id: 'string',
          event_name: 'string',
          timestamp: '2020-12-09T16:09:53Z',
          properties: {},
        },
      ],
      timeframe_end: '2019-12-27T18:11:19.117Z',
      timeframe_start: '2019-12-27T18:11:19.117Z',
    });
  });

  test('updateByExternalId: only required params', async () => {
    const responsePromise = orb.customers.usage.updateByExternalId('string', {
      events: [
        { event_name: 'string', timestamp: '2020-12-09T16:09:53Z', properties: {} },
        { event_name: 'string', timestamp: '2020-12-09T16:09:53Z', properties: {} },
        { event_name: 'string', timestamp: '2020-12-09T16:09:53Z', properties: {} },
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

  test('updateByExternalId: required and optional params', async () => {
    const response = await orb.customers.usage.updateByExternalId('string', {
      events: [
        {
          customer_id: 'string',
          external_customer_id: 'string',
          event_name: 'string',
          timestamp: '2020-12-09T16:09:53Z',
          properties: {},
        },
        {
          customer_id: 'string',
          external_customer_id: 'string',
          event_name: 'string',
          timestamp: '2020-12-09T16:09:53Z',
          properties: {},
        },
        {
          customer_id: 'string',
          external_customer_id: 'string',
          event_name: 'string',
          timestamp: '2020-12-09T16:09:53Z',
          properties: {},
        },
      ],
      timeframe_end: '2019-12-27T18:11:19.117Z',
      timeframe_start: '2019-12-27T18:11:19.117Z',
    });
  });
});
