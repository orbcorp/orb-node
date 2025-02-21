// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const client = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource topUps', () => {
  test('create: only required params', async () => {
    const responsePromise = client.customers.credits.topUps.create('customer_id', {
      amount: 'amount',
      currency: 'currency',
      invoice_settings: { auto_collection: true, net_terms: 0 },
      per_unit_cost_basis: 'per_unit_cost_basis',
      threshold: 'threshold',
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
    const response = await client.customers.credits.topUps.create('customer_id', {
      amount: 'amount',
      currency: 'currency',
      invoice_settings: {
        auto_collection: true,
        net_terms: 0,
        memo: 'memo',
        require_successful_payment: true,
      },
      per_unit_cost_basis: 'per_unit_cost_basis',
      threshold: 'threshold',
      active_from: '2019-12-27T18:11:19.117Z',
      expires_after: 0,
      expires_after_unit: 'day',
    });
  });

  test('list', async () => {
    const responsePromise = client.customers.credits.topUps.list('customer_id');
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
      client.customers.credits.topUps.list('customer_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.customers.credits.topUps.list(
        'customer_id',
        { cursor: 'cursor', limit: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.customers.credits.topUps.delete('customer_id', 'top_up_id');
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
      client.customers.credits.topUps.delete('customer_id', 'top_up_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('createByExternalId: only required params', async () => {
    const responsePromise = client.customers.credits.topUps.createByExternalId('external_customer_id', {
      amount: 'amount',
      currency: 'currency',
      invoice_settings: { auto_collection: true, net_terms: 0 },
      per_unit_cost_basis: 'per_unit_cost_basis',
      threshold: 'threshold',
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
    const response = await client.customers.credits.topUps.createByExternalId('external_customer_id', {
      amount: 'amount',
      currency: 'currency',
      invoice_settings: {
        auto_collection: true,
        net_terms: 0,
        memo: 'memo',
        require_successful_payment: true,
      },
      per_unit_cost_basis: 'per_unit_cost_basis',
      threshold: 'threshold',
      active_from: '2019-12-27T18:11:19.117Z',
      expires_after: 0,
      expires_after_unit: 'day',
    });
  });

  test('deleteByExternalId', async () => {
    const responsePromise = client.customers.credits.topUps.deleteByExternalId(
      'external_customer_id',
      'top_up_id',
    );
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
      client.customers.credits.topUps.deleteByExternalId('external_customer_id', 'top_up_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('listByExternalId', async () => {
    const responsePromise = client.customers.credits.topUps.listByExternalId('external_customer_id');
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
      client.customers.credits.topUps.listByExternalId('external_customer_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('listByExternalId: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.customers.credits.topUps.listByExternalId(
        'external_customer_id',
        { cursor: 'cursor', limit: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });
});
