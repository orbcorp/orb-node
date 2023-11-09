// File generated from our OpenAPI spec by Stainless.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const orb = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource customers', () => {
  test('create: only required params', async () => {
    const responsePromise = orb.customers.create({ email: 'string', name: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await orb.customers.create({
      email: 'string',
      name: 'string',
      accounting_sync_configuration: {
        excluded: true,
        accounting_providers: [
          { provider_type: 'string', external_provider_id: 'string' },
          { provider_type: 'string', external_provider_id: 'string' },
          { provider_type: 'string', external_provider_id: 'string' },
        ],
      },
      additional_emails: ['string', 'string', 'string'],
      auto_collection: true,
      billing_address: {
        line1: 'string',
        line2: 'string',
        city: 'string',
        state: 'string',
        postal_code: 'string',
        country: 'string',
      },
      currency: 'string',
      email_delivery: true,
      external_customer_id: 'string',
      metadata: {},
      payment_provider: 'quickbooks',
      payment_provider_id: 'string',
      reporting_configuration: { exempt: true },
      shipping_address: {
        line1: 'string',
        line2: 'string',
        city: 'string',
        state: 'string',
        postal_code: 'string',
        country: 'string',
      },
      tax_id: { country: 'AE', type: 'ae_trn', value: 'string' },
      timezone: 'string',
    });
  });

  test('update', async () => {
    const responsePromise = orb.customers.update('string');
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
    await expect(orb.customers.update('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.customers.update(
        'string',
        {
          accounting_sync_configuration: {
            excluded: true,
            accounting_providers: [
              { provider_type: 'string', external_provider_id: 'string' },
              { provider_type: 'string', external_provider_id: 'string' },
              { provider_type: 'string', external_provider_id: 'string' },
            ],
          },
          additional_emails: ['string'],
          auto_collection: true,
          billing_address: {
            line1: 'string',
            line2: 'string',
            city: 'string',
            state: 'string',
            postal_code: 'string',
            country: 'string',
          },
          currency: 'string',
          email: 'string',
          email_delivery: true,
          metadata: {},
          name: 'string',
          payment_provider: 'quickbooks',
          payment_provider_id: 'string',
          reporting_configuration: { exempt: true },
          shipping_address: {
            line1: 'string',
            line2: 'string',
            city: 'string',
            state: 'string',
            postal_code: 'string',
            country: 'string',
          },
          tax_id: { country: 'AE', type: 'ae_trn', value: 'string' },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = orb.customers.list();
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
    await expect(orb.customers.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(Orb.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.customers.list(
        {
          'created_at[gt]': '2019-12-27T18:11:19.117Z',
          'created_at[gte]': '2019-12-27T18:11:19.117Z',
          'created_at[lt]': '2019-12-27T18:11:19.117Z',
          'created_at[lte]': '2019-12-27T18:11:19.117Z',
          cursor: 'string',
          limit: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('del', async () => {
    const responsePromise = orb.customers.del('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('del: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(orb.customers.del('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('fetch', async () => {
    const responsePromise = orb.customers.fetch('string');
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
    await expect(orb.customers.fetch('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('fetchByExternalId', async () => {
    const responsePromise = orb.customers.fetchByExternalId('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('fetchByExternalId: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.customers.fetchByExternalId('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('updateByExternalId', async () => {
    const responsePromise = orb.customers.updateByExternalId('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateByExternalId: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.customers.updateByExternalId('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('updateByExternalId: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.customers.updateByExternalId(
        'string',
        {
          accounting_sync_configuration: {
            excluded: true,
            accounting_providers: [
              { provider_type: 'string', external_provider_id: 'string' },
              { provider_type: 'string', external_provider_id: 'string' },
              { provider_type: 'string', external_provider_id: 'string' },
            ],
          },
          additional_emails: ['string'],
          auto_collection: true,
          billing_address: {
            line1: 'string',
            line2: 'string',
            city: 'string',
            state: 'string',
            postal_code: 'string',
            country: 'string',
          },
          currency: 'string',
          email: 'string',
          email_delivery: true,
          metadata: {},
          name: 'string',
          payment_provider: 'quickbooks',
          payment_provider_id: 'string',
          reporting_configuration: { exempt: true },
          shipping_address: {
            line1: 'string',
            line2: 'string',
            city: 'string',
            state: 'string',
            postal_code: 'string',
            country: 'string',
          },
          tax_id: { country: 'AE', type: 'ae_trn', value: 'string' },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });
});
