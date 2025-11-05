// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const client = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource prices', () => {
  test('create: only required params', async () => {
    const responsePromise = client.prices.create({
      cadence: 'annual',
      currency: 'currency',
      item_id: 'item_id',
      model_type: 'unit',
      name: 'Annual fee',
      unit_config: { unit_amount: 'unit_amount' },
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
    const response = await client.prices.create({
      cadence: 'annual',
      currency: 'currency',
      item_id: 'item_id',
      model_type: 'unit',
      name: 'Annual fee',
      unit_config: { unit_amount: 'unit_amount', prorated: true },
      billable_metric_id: 'billable_metric_id',
      billed_in_advance: true,
      billing_cycle_configuration: { duration: 0, duration_unit: 'day' },
      conversion_rate: 0,
      conversion_rate_config: { conversion_rate_type: 'unit', unit_config: { unit_amount: 'unit_amount' } },
      dimensional_price_configuration: {
        dimension_values: ['string'],
        dimensional_price_group_id: 'dimensional_price_group_id',
        external_dimensional_price_group_id: 'external_dimensional_price_group_id',
      },
      external_price_id: 'external_price_id',
      fixed_price_quantity: 0,
      invoice_grouping_key: 'x',
      invoicing_cycle_configuration: { duration: 0, duration_unit: 'day' },
      metadata: { foo: 'string' },
    });
  });

  test('update', async () => {
    const responsePromise = client.prices.update('price_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.prices.list();
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
    await expect(client.prices.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(Orb.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.prices.list({ cursor: 'cursor', limit: 1 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('evaluate: only required params', async () => {
    const responsePromise = client.prices.evaluate('price_id', {
      timeframe_end: '2019-12-27T18:11:19.117Z',
      timeframe_start: '2019-12-27T18:11:19.117Z',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('evaluate: required and optional params', async () => {
    const response = await client.prices.evaluate('price_id', {
      timeframe_end: '2019-12-27T18:11:19.117Z',
      timeframe_start: '2019-12-27T18:11:19.117Z',
      customer_id: 'customer_id',
      external_customer_id: 'external_customer_id',
      filter: "my_numeric_property > 100 AND my_other_property = 'bar'",
      grouping_keys: ["case when my_event_type = 'foo' then true else false end"],
    });
  });

  test('evaluateMultiple: only required params', async () => {
    const responsePromise = client.prices.evaluateMultiple({
      timeframe_end: '2019-12-27T18:11:19.117Z',
      timeframe_start: '2019-12-27T18:11:19.117Z',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('evaluateMultiple: required and optional params', async () => {
    const response = await client.prices.evaluateMultiple({
      timeframe_end: '2019-12-27T18:11:19.117Z',
      timeframe_start: '2019-12-27T18:11:19.117Z',
      customer_id: 'customer_id',
      external_customer_id: 'external_customer_id',
      price_evaluations: [
        {
          external_price_id: 'external_price_id',
          filter: "my_numeric_property > 100 AND my_other_property = 'bar'",
          grouping_keys: ["case when my_event_type = 'foo' then true else false end"],
          price: {
            cadence: 'annual',
            currency: 'currency',
            item_id: 'item_id',
            model_type: 'unit',
            name: 'Annual fee',
            unit_config: { unit_amount: 'unit_amount', prorated: true },
            billable_metric_id: 'billable_metric_id',
            billed_in_advance: true,
            billing_cycle_configuration: { duration: 0, duration_unit: 'day' },
            conversion_rate: 0,
            conversion_rate_config: {
              conversion_rate_type: 'unit',
              unit_config: { unit_amount: 'unit_amount' },
            },
            dimensional_price_configuration: {
              dimension_values: ['string'],
              dimensional_price_group_id: 'dimensional_price_group_id',
              external_dimensional_price_group_id: 'external_dimensional_price_group_id',
            },
            external_price_id: 'external_price_id',
            fixed_price_quantity: 0,
            invoice_grouping_key: 'x',
            invoicing_cycle_configuration: { duration: 0, duration_unit: 'day' },
            metadata: { foo: 'string' },
          },
          price_id: 'price_id',
        },
      ],
    });
  });

  test('evaluatePreviewEvents: only required params', async () => {
    const responsePromise = client.prices.evaluatePreviewEvents({
      timeframe_end: '2019-12-27T18:11:19.117Z',
      timeframe_start: '2019-12-27T18:11:19.117Z',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('evaluatePreviewEvents: required and optional params', async () => {
    const response = await client.prices.evaluatePreviewEvents({
      timeframe_end: '2019-12-27T18:11:19.117Z',
      timeframe_start: '2019-12-27T18:11:19.117Z',
      customer_id: 'customer_id',
      events: [
        {
          event_name: 'event_name',
          properties: { foo: 'bar' },
          timestamp: '2020-12-09T16:09:53Z',
          customer_id: 'customer_id',
          external_customer_id: 'external_customer_id',
        },
      ],
      external_customer_id: 'external_customer_id',
      price_evaluations: [
        {
          external_price_id: 'external_price_id',
          filter: "my_numeric_property > 100 AND my_other_property = 'bar'",
          grouping_keys: ["case when my_event_type = 'foo' then true else false end"],
          price: {
            cadence: 'annual',
            currency: 'currency',
            item_id: 'item_id',
            model_type: 'unit',
            name: 'Annual fee',
            unit_config: { unit_amount: 'unit_amount', prorated: true },
            billable_metric_id: 'billable_metric_id',
            billed_in_advance: true,
            billing_cycle_configuration: { duration: 0, duration_unit: 'day' },
            conversion_rate: 0,
            conversion_rate_config: {
              conversion_rate_type: 'unit',
              unit_config: { unit_amount: 'unit_amount' },
            },
            dimensional_price_configuration: {
              dimension_values: ['string'],
              dimensional_price_group_id: 'dimensional_price_group_id',
              external_dimensional_price_group_id: 'external_dimensional_price_group_id',
            },
            external_price_id: 'external_price_id',
            fixed_price_quantity: 0,
            invoice_grouping_key: 'x',
            invoicing_cycle_configuration: { duration: 0, duration_unit: 'day' },
            metadata: { foo: 'string' },
          },
          price_id: 'price_id',
        },
      ],
    });
  });

  test('fetch', async () => {
    const responsePromise = client.prices.fetch('price_id');
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
    await expect(client.prices.fetch('price_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });
});
