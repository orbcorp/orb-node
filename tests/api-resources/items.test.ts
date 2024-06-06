// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const orb = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource items', () => {
  test('create: only required params', async () => {
    const responsePromise = orb.items.create({ name: 'API requests' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await orb.items.create({ name: 'API requests' });
  });

  test('update: only required params', async () => {
    const responsePromise = orb.items.update('string', {
      external_connections: [
        { external_connection_name: 'stripe', external_entity_id: 'string' },
        { external_connection_name: 'stripe', external_entity_id: 'string' },
        { external_connection_name: 'stripe', external_entity_id: 'string' },
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
    const response = await orb.items.update('string', {
      external_connections: [
        { external_connection_name: 'stripe', external_entity_id: 'string' },
        { external_connection_name: 'stripe', external_entity_id: 'string' },
        { external_connection_name: 'stripe', external_entity_id: 'string' },
      ],
    });
  });

  test('list', async () => {
    const responsePromise = orb.items.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(orb.items.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(Orb.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.items.list({ cursor: 'string', limit: 1 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('fetch', async () => {
    const responsePromise = orb.items.fetch('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('fetch: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(orb.items.fetch('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });
});
