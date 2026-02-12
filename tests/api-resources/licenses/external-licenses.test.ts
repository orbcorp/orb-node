// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const client = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource externalLicenses', () => {
  test('getUsage: only required params', async () => {
    const responsePromise = client.licenses.externalLicenses.getUsage('external_license_id', {
      license_type_id: 'license_type_id',
      subscription_id: 'subscription_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getUsage: required and optional params', async () => {
    const response = await client.licenses.externalLicenses.getUsage('external_license_id', {
      license_type_id: 'license_type_id',
      subscription_id: 'subscription_id',
      cursor: 'cursor',
      end_date: '2019-12-27',
      group_by: ['string'],
      limit: 1,
      start_date: '2019-12-27',
    });
  });
});
