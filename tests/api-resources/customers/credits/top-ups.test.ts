// File generated from our OpenAPI spec by Stainless.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const orb = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource topUps', () => {
  test('create: only required params', async () => {
    const responsePromise = orb.customers.credits.topUps.create('string', {
      amount: 'string',
      currency: 'string',
      invoice_settings: { auto_collection: true, net_terms: 0 },
      per_unit_cost_basis: 'string',
      threshold: 'string',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await orb.customers.credits.topUps.create('string', {
      amount: 'string',
      currency: 'string',
      invoice_settings: { auto_collection: true, net_terms: 0, memo: 'string' },
      per_unit_cost_basis: 'string',
      threshold: 'string',
      expires_after: 0,
      expires_after_unit: 'day',
    });
  });

  test('list', async () => {
    const responsePromise = orb.customers.credits.topUps.list('string');
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
    await expect(
      orb.customers.credits.topUps.list('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.customers.credits.topUps.list(
        'string',
        { cursor: 'string', limit: 0 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = orb.customers.credits.topUps.delete('string', 'string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.customers.credits.topUps.delete('string', 'string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('createByExternalId: only required params', async () => {
    const responsePromise = orb.customers.credits.topUps.createByExternalId('string', {
      amount: 'string',
      currency: 'string',
      invoice_settings: { auto_collection: true, net_terms: 0 },
      per_unit_cost_basis: 'string',
      threshold: 'string',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createByExternalId: required and optional params', async () => {
    const response = await orb.customers.credits.topUps.createByExternalId('string', {
      amount: 'string',
      currency: 'string',
      invoice_settings: { auto_collection: true, net_terms: 0, memo: 'string' },
      per_unit_cost_basis: 'string',
      threshold: 'string',
      expires_after: 0,
      expires_after_unit: 'day',
    });
  });

  test('deleteByExternalId', async () => {
    const responsePromise = orb.customers.credits.topUps.deleteByExternalId('string', 'string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('deleteByExternalId: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.customers.credits.topUps.deleteByExternalId('string', 'string', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('listByExternalId', async () => {
    const responsePromise = orb.customers.credits.topUps.listByExternalId('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listByExternalId: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.customers.credits.topUps.listByExternalId('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('listByExternalId: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.customers.credits.topUps.listByExternalId(
        'string',
        { cursor: 'string', limit: 0 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });
});
