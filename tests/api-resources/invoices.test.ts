// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const client = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource invoices', () => {
  test('create: only required params', async () => {
    const responsePromise = client.invoices.create({
      currency: 'USD',
      invoice_date: '2019-12-27T18:11:19.117Z',
      line_items: [
        {
          end_date: '2023-09-22',
          item_id: '4khy3nwzktxv7',
          model_type: 'unit',
          name: 'Line Item Name',
          quantity: 1,
          start_date: '2023-09-22',
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
    const response = await client.invoices.create({
      currency: 'USD',
      invoice_date: '2019-12-27T18:11:19.117Z',
      line_items: [
        {
          end_date: '2023-09-22',
          item_id: '4khy3nwzktxv7',
          model_type: 'unit',
          name: 'Line Item Name',
          quantity: 1,
          start_date: '2023-09-22',
          unit_config: { unit_amount: 'unit_amount' },
        },
      ],
      customer_id: '4khy3nwzktxv7',
      discount: {
        discount_type: 'percentage',
        percentage_discount: 0.15,
        applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
        filters: [{ field: 'price_id', operator: 'includes', values: ['string'] }],
        reason: 'reason',
      },
      external_customer_id: 'external-customer-id',
      memo: 'An optional memo for my invoice.',
      metadata: { foo: 'string' },
      net_terms: 0,
      will_auto_issue: false,
    });
  });

  test('update', async () => {
    const responsePromise = client.invoices.update('invoice_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.invoices.list();
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
    await expect(client.invoices.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.invoices.list(
        {
          amount: 'amount',
          'amount[gt]': 'amount[gt]',
          'amount[lt]': 'amount[lt]',
          cursor: 'cursor',
          customer_id: 'customer_id',
          date_type: 'due_date',
          due_date: '2019-12-27',
          due_date_window: 'due_date_window',
          'due_date[gt]': '2019-12-27',
          'due_date[lt]': '2019-12-27',
          external_customer_id: 'external_customer_id',
          'invoice_date[gt]': '2019-12-27T18:11:19.117Z',
          'invoice_date[gte]': '2019-12-27T18:11:19.117Z',
          'invoice_date[lt]': '2019-12-27T18:11:19.117Z',
          'invoice_date[lte]': '2019-12-27T18:11:19.117Z',
          is_recurring: true,
          limit: 1,
          status: ['draft'],
          subscription_id: 'subscription_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('fetch', async () => {
    const responsePromise = client.invoices.fetch('invoice_id');
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
    await expect(client.invoices.fetch('invoice_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('fetchUpcoming: only required params', async () => {
    const responsePromise = client.invoices.fetchUpcoming({ subscription_id: 'subscription_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('fetchUpcoming: required and optional params', async () => {
    const response = await client.invoices.fetchUpcoming({ subscription_id: 'subscription_id' });
  });

  test('issue', async () => {
    const responsePromise = client.invoices.issue('invoice_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('issue: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.invoices.issue('invoice_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('issue: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.invoices.issue('invoice_id', { synchronous: true }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('markPaid: only required params', async () => {
    const responsePromise = client.invoices.markPaid('invoice_id', { payment_received_date: '2023-09-22' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('markPaid: required and optional params', async () => {
    const response = await client.invoices.markPaid('invoice_id', {
      payment_received_date: '2023-09-22',
      external_id: 'external_payment_id_123',
      notes: 'notes',
    });
  });

  test('pay', async () => {
    const responsePromise = client.invoices.pay('invoice_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('pay: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.invoices.pay('invoice_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('void', async () => {
    const responsePromise = client.invoices.void('invoice_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('void: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.invoices.void('invoice_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });
});
