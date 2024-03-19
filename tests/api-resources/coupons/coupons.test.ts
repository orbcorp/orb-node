// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const orb = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource coupons', () => {
  test('create: only required params', async () => {
    const responsePromise = orb.coupons.create({
      discount: {
        discount_type: 'percentage',
        applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
        percentage_discount: 0.15,
      },
      redemption_code: 'HALFOFF',
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
    const response = await orb.coupons.create({
      discount: {
        discount_type: 'percentage',
        applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
        reason: 'string',
        percentage_discount: 0.15,
      },
      redemption_code: 'HALFOFF',
      duration_in_months: 12,
      max_redemptions: 0,
    });
  });

  test('list', async () => {
    const responsePromise = orb.coupons.list();
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
    await expect(orb.coupons.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(Orb.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.coupons.list(
        { cursor: 'string', limit: 0, redemption_code: 'string', show_archived: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('archive', async () => {
    const responsePromise = orb.coupons.archive('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('archive: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(orb.coupons.archive('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('fetch', async () => {
    const responsePromise = orb.coupons.fetch('string');
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
    await expect(orb.coupons.fetch('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });
});
