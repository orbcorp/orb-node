// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const client = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource plans', () => {
  test('create: only required params', async () => {
    const responsePromise = client.plans.create({ currency: 'currency', name: 'name', prices: [{}] });
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
          allocation_price: {
            amount: '10.00',
            cadence: 'monthly',
            currency: 'USD',
            custom_expiration: { duration: 0, duration_unit: 'day' },
            expires_at_end_of_cadence: true,
            filters: [{ field: 'item_id', operator: 'includes', values: ['string'] }],
          },
          plan_phase_order: 0,
          price: {
            cadence: 'annual',
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
            currency: 'currency',
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
            reference_id: 'reference_id',
          },
        },
      ],
      adjustments: [
        {
          adjustment: {
            adjustment_type: 'percentage_discount',
            percentage_discount: 0,
            applies_to_all: true,
            applies_to_item_ids: ['item_1', 'item_2'],
            applies_to_price_ids: ['price_1', 'price_2'],
            currency: 'currency',
            filters: [{ field: 'price_id', operator: 'includes', values: ['string'] }],
            is_invoice_level: true,
            price_type: 'usage',
          },
          plan_phase_order: 0,
        },
      ],
      default_invoice_memo: 'default_invoice_memo',
      external_plan_id: 'external_plan_id',
      metadata: { foo: 'string' },
      net_terms: 0,
      plan_phases: [
        { order: 0, align_billing_with_phase_start_date: true, duration: 1, duration_unit: 'daily' },
      ],
      status: 'active',
    });
  });

  test('update', async () => {
    const responsePromise = client.plans.update('plan_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
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
