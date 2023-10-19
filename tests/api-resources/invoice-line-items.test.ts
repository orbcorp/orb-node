// File generated from our OpenAPI spec by Stainless.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const orb = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource invoiceLineItems', () => {
  test('create: only required params', async () => {
    const responsePromise = orb.invoiceLineItems.create({
      amount: '12.00',
      end_date: '2023-09-22',
      invoice_id: '4khy3nwzktxv7',
      name: 'Item Name',
      quantity: 1,
      start_date: '2023-09-22',
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
    const response = await orb.invoiceLineItems.create({
      amount: '12.00',
      end_date: '2023-09-22',
      invoice_id: '4khy3nwzktxv7',
      name: 'Item Name',
      quantity: 1,
      start_date: '2023-09-22',
    });
  });
});
