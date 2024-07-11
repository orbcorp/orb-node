// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const orb = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource alerts', () => {
  test('retrieve', async () => {
    const responsePromise = orb.alerts.retrieve('alert_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(orb.alerts.retrieve('alert_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  // plan_version=0 breaks Prism
  test.skip('list', async () => {
    const responsePromise = orb.alerts.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // plan_version=0 breaks Prism
  test.skip('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(orb.alerts.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(Orb.NotFoundError);
  });

  // plan_version=0 breaks Prism
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.alerts.list(
        {
          'created_at[gt]': '2019-12-27T18:11:19.117Z',
          'created_at[gte]': '2019-12-27T18:11:19.117Z',
          'created_at[lt]': '2019-12-27T18:11:19.117Z',
          'created_at[lte]': '2019-12-27T18:11:19.117Z',
          cursor: 'cursor',
          customer_id: 'customer_id',
          external_customer_id: 'external_customer_id',
          limit: 1,
          subscription_id: 'subscription_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('createForCustomer: only required params', async () => {
    const responsePromise = orb.alerts.createForCustomer('customer_id', {
      currency: 'currency',
      type: 'type',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createForCustomer: required and optional params', async () => {
    const response = await orb.alerts.createForCustomer('customer_id', {
      currency: 'currency',
      type: 'type',
      thresholds: [{ value: 0 }, { value: 0 }, { value: 0 }],
    });
  });

  test('createForExternalCustomer: only required params', async () => {
    const responsePromise = orb.alerts.createForExternalCustomer('external_customer_id', {
      currency: 'currency',
      type: 'type',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createForExternalCustomer: required and optional params', async () => {
    const response = await orb.alerts.createForExternalCustomer('external_customer_id', {
      currency: 'currency',
      type: 'type',
      thresholds: [{ value: 0 }, { value: 0 }, { value: 0 }],
    });
  });

  test('createForSubscription: only required params', async () => {
    const responsePromise = orb.alerts.createForSubscription('subscription_id', {
      thresholds: [{ value: 0 }, { value: 0 }, { value: 0 }],
      type: 'type',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createForSubscription: required and optional params', async () => {
    const response = await orb.alerts.createForSubscription('subscription_id', {
      thresholds: [{ value: 0 }, { value: 0 }, { value: 0 }],
      type: 'type',
      metric_id: 'metric_id',
    });
  });

  test('disable', async () => {
    const responsePromise = orb.alerts.disable('alert_configuration_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('disable: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.alerts.disable('alert_configuration_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('enable', async () => {
    const responsePromise = orb.alerts.enable('alert_configuration_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('enable: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.alerts.enable('alert_configuration_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });
});
