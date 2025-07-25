// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const client = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource ledger', () => {
  test('list', async () => {
    const responsePromise = client.customers.credits.ledger.list('customer_id');
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
      client.customers.credits.ledger.list('customer_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.customers.credits.ledger.list(
        'customer_id',
        {
          'created_at[gt]': '2019-12-27T18:11:19.117Z',
          'created_at[gte]': '2019-12-27T18:11:19.117Z',
          'created_at[lt]': '2019-12-27T18:11:19.117Z',
          'created_at[lte]': '2019-12-27T18:11:19.117Z',
          currency: 'currency',
          cursor: 'cursor',
          entry_status: 'committed',
          entry_type: 'increment',
          limit: 1,
          minimum_amount: 'minimum_amount',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('createEntry: only required params', async () => {
    const responsePromise = client.customers.credits.ledger.createEntry('customer_id', {
      amount: 0,
      entry_type: 'increment',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createEntry: required and optional params', async () => {
    const response = await client.customers.credits.ledger.createEntry('customer_id', {
      amount: 0,
      entry_type: 'increment',
      currency: 'currency',
      description: 'description',
      effective_date: '2019-12-27T18:11:19.117Z',
      expiry_date: '2019-12-27T18:11:19.117Z',
      invoice_settings: {
        auto_collection: true,
        net_terms: 0,
        invoice_date: '2019-12-27',
        memo: 'memo',
        require_successful_payment: true,
      },
      metadata: { foo: 'string' },
      per_unit_cost_basis: 'per_unit_cost_basis',
    });
  });

  test('createEntryByExternalId: only required params', async () => {
    const responsePromise = client.customers.credits.ledger.createEntryByExternalId('external_customer_id', {
      amount: 0,
      entry_type: 'increment',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createEntryByExternalId: required and optional params', async () => {
    const response = await client.customers.credits.ledger.createEntryByExternalId('external_customer_id', {
      amount: 0,
      entry_type: 'increment',
      currency: 'currency',
      description: 'description',
      effective_date: '2019-12-27T18:11:19.117Z',
      expiry_date: '2019-12-27T18:11:19.117Z',
      invoice_settings: {
        auto_collection: true,
        net_terms: 0,
        invoice_date: '2019-12-27',
        memo: 'memo',
        require_successful_payment: true,
      },
      metadata: { foo: 'string' },
      per_unit_cost_basis: 'per_unit_cost_basis',
    });
  });

  test('listByExternalId', async () => {
    const responsePromise = client.customers.credits.ledger.listByExternalId('external_customer_id');
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
      client.customers.credits.ledger.listByExternalId('external_customer_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('listByExternalId: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.customers.credits.ledger.listByExternalId(
        'external_customer_id',
        {
          'created_at[gt]': '2019-12-27T18:11:19.117Z',
          'created_at[gte]': '2019-12-27T18:11:19.117Z',
          'created_at[lt]': '2019-12-27T18:11:19.117Z',
          'created_at[lte]': '2019-12-27T18:11:19.117Z',
          currency: 'currency',
          cursor: 'cursor',
          entry_status: 'committed',
          entry_type: 'increment',
          limit: 1,
          minimum_amount: 'minimum_amount',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });
});
