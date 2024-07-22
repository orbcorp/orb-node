// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const orb = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource balanceTransactions', () => {
  test('create: only required params', async () => {
    const responsePromise = orb.customers.balanceTransactions.create('customer_id', {
      amount: 'amount',
      type: 'increment',
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
    const response = await orb.customers.balanceTransactions.create('customer_id', {
      amount: 'amount',
      type: 'increment',
      description: 'description',
    });
  });

  test('list', async () => {
    const responsePromise = orb.customers.balanceTransactions.list('customer_id');
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
      orb.customers.balanceTransactions.list('customer_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.customers.balanceTransactions.list(
        'customer_id',
        {
          cursor: 'cursor',
          limit: 1,
          'operation_time[gt]': '2019-12-27T18:11:19.117Z',
          'operation_time[gte]': '2019-12-27T18:11:19.117Z',
          'operation_time[lt]': '2019-12-27T18:11:19.117Z',
          'operation_time[lte]': '2019-12-27T18:11:19.117Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });
});
