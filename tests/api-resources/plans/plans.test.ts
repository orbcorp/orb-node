// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const client = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource plans', () => {
  test('create: only required params', async () => {
    const responsePromise = client.plans.create({
      currency: 'currency',
      name: 'name',
      prices: [
        {
          cadence: 'annual',
          item_id: 'item_id',
          model_type: 'unit',
          name: 'Annual fee',
          unit_config: { unit_amount: 'unit_amount' },
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

  test('create: required and optional params', async () => {
    const response = await client.plans.create({
      currency: 'currency',
      name: 'name',
      prices: [
        {
          cadence: 'annual',
          item_id: 'item_id',
          model_type: 'unit',
          name: 'Annual fee',
          unit_config: { unit_amount: 'unit_amount' },
          billable_metric_id: 'billable_metric_id',
          billed_in_advance: true,
          billing_cycle_configuration: { duration: 0, duration_unit: 'day' },
          conversion_rate: 0,
          currency: 'currency',
          external_price_id: 'external_price_id',
          fixed_price_quantity: 0,
          invoice_grouping_key: 'invoice_grouping_key',
          invoicing_cycle_configuration: { duration: 0, duration_unit: 'day' },
          metadata: { foo: 'string' },
        },
      ],
      default_invoice_memo: 'default_invoice_memo',
      external_plan_id: 'external_plan_id',
      metadata: { foo: 'string' },
      net_terms: 0,
      status: 'active',
    });
  });

  test('update', async () => {
    const responsePromise = client.plans.update('plan_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.plans.update('plan_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.plans.update(
        'plan_id',
        { external_plan_id: 'external_plan_id', metadata: { foo: 'string' } },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.plans.list();
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
    await expect(client.plans.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(Orb.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.plans.list(
        {
          'created_at[gt]': '2019-12-27T18:11:19.117Z',
          'created_at[gte]': '2019-12-27T18:11:19.117Z',
          'created_at[lt]': '2019-12-27T18:11:19.117Z',
          'created_at[lte]': '2019-12-27T18:11:19.117Z',
          cursor: 'cursor',
          limit: 1,
          status: 'active',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('fetch', async () => {
    const responsePromise = client.plans.fetch('plan_id');
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
    await expect(client.plans.fetch('plan_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });
});
