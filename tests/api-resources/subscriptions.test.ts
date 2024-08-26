// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const client = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource subscriptions', () => {
  test('create', async () => {
    const responsePromise = client.subscriptions.create();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.subscriptions.create({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.create(
        {
          align_billing_with_subscription_start_date: true,
          auto_collection: true,
          aws_region: 'aws_region',
          coupon_redemption_code: 'coupon_redemption_code',
          credits_overage_rate: 0,
          customer_id: 'customer_id',
          default_invoice_memo: 'default_invoice_memo',
          end_date: '2019-12-27T18:11:19.117Z',
          external_customer_id: 'external_customer_id',
          external_marketplace: 'google',
          external_marketplace_reporting_id: 'external_marketplace_reporting_id',
          external_plan_id: 'ZMwNQefe7J3ecf7W',
          initial_phase_order: 0,
          invoicing_threshold: 'invoicing_threshold',
          metadata: { foo: 'string' },
          net_terms: 0,
          per_credit_overage_amount: 0,
          plan_id: 'ZMwNQefe7J3ecf7W',
          price_overrides: [
            {
              id: 'id',
              model_type: 'unit',
              unit_config: { unit_amount: 'unit_amount' },
              conversion_rate: 0,
              currency: 'currency',
              discount: {
                discount_type: 'percentage',
                amount_discount: 'amount_discount',
                applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
                percentage_discount: 0.15,
                trial_amount_discount: 'trial_amount_discount',
                usage_discount: 0,
              },
              fixed_price_quantity: 2,
              maximum_amount: '1.23',
              minimum_amount: '1.23',
            },
            {
              id: 'id',
              model_type: 'unit',
              unit_config: { unit_amount: 'unit_amount' },
              conversion_rate: 0,
              currency: 'currency',
              discount: {
                discount_type: 'percentage',
                amount_discount: 'amount_discount',
                applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
                percentage_discount: 0.15,
                trial_amount_discount: 'trial_amount_discount',
                usage_discount: 0,
              },
              fixed_price_quantity: 2,
              maximum_amount: '1.23',
              minimum_amount: '1.23',
            },
            {
              id: 'id',
              model_type: 'unit',
              unit_config: { unit_amount: 'unit_amount' },
              conversion_rate: 0,
              currency: 'currency',
              discount: {
                discount_type: 'percentage',
                amount_discount: 'amount_discount',
                applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
                percentage_discount: 0.15,
                trial_amount_discount: 'trial_amount_discount',
                usage_discount: 0,
              },
              fixed_price_quantity: 2,
              maximum_amount: '1.23',
              minimum_amount: '1.23',
            },
          ],
          start_date: '2019-12-27T18:11:19.117Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.subscriptions.update('subscription_id');
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
    await expect(
      client.subscriptions.update('subscription_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.update(
        'subscription_id',
        {
          auto_collection: true,
          default_invoice_memo: 'default_invoice_memo',
          invoicing_threshold: '10.00',
          metadata: { foo: 'string' },
          net_terms: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.subscriptions.list();
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
    await expect(client.subscriptions.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.list(
        {
          'created_at[gt]': '2019-12-27T18:11:19.117Z',
          'created_at[gte]': '2019-12-27T18:11:19.117Z',
          'created_at[lt]': '2019-12-27T18:11:19.117Z',
          'created_at[lte]': '2019-12-27T18:11:19.117Z',
          cursor: 'cursor',
          query_customer_id: 'customer_id',
          query_customer_id: ['string', 'string', 'string'],
          query_external_customer_id: 'external_customer_id',
          query_external_customer_id: ['string', 'string', 'string'],
          limit: 1,
          status: 'active',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('cancel: only required params', async () => {
    const responsePromise = client.subscriptions.cancel('subscription_id', {
      cancel_option: 'end_of_subscription_term',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancel: required and optional params', async () => {
    const response = await client.subscriptions.cancel('subscription_id', {
      cancel_option: 'end_of_subscription_term',
      cancellation_date: '2019-12-27T18:11:19.117Z',
    });
  });

  test('fetch', async () => {
    const responsePromise = client.subscriptions.fetch('subscription_id');
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
    await expect(
      client.subscriptions.fetch('subscription_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('fetchCosts', async () => {
    const responsePromise = client.subscriptions.fetchCosts('subscription_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('fetchCosts: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.fetchCosts('subscription_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('fetchCosts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.fetchCosts(
        'subscription_id',
        {
          currency: 'currency',
          timeframe_end: '2022-03-01T05:00:00Z',
          timeframe_start: '2022-02-01T05:00:00Z',
          view_mode: 'periodic',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('fetchSchedule', async () => {
    const responsePromise = client.subscriptions.fetchSchedule('subscription_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('fetchSchedule: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.fetchSchedule('subscription_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('fetchSchedule: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.fetchSchedule(
        'subscription_id',
        {
          cursor: 'cursor',
          limit: 1,
          'start_date[gt]': '2019-12-27T18:11:19.117Z',
          'start_date[gte]': '2019-12-27T18:11:19.117Z',
          'start_date[lt]': '2019-12-27T18:11:19.117Z',
          'start_date[lte]': '2019-12-27T18:11:19.117Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  // Incorrect example breaks Prism
  test.skip('fetchUsage', async () => {
    const responsePromise = client.subscriptions.fetchUsage('subscription_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Incorrect example breaks Prism
  test.skip('fetchUsage: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.fetchUsage('subscription_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  // Incorrect example breaks Prism
  test.skip('fetchUsage: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.fetchUsage(
        'subscription_id',
        {
          billable_metric_id: 'billable_metric_id',
          first_dimension_key: 'first_dimension_key',
          first_dimension_value: 'first_dimension_value',
          granularity: 'day',
          group_by: 'group_by',
          second_dimension_key: 'second_dimension_key',
          second_dimension_value: 'second_dimension_value',
          timeframe_end: '2022-03-01T05:00:00Z',
          timeframe_start: '2022-02-01T05:00:00Z',
          view_mode: 'periodic',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  // Incorrect example breaks Prism
  test.skip('priceIntervals', async () => {
    const responsePromise = client.subscriptions.priceIntervals('subscription_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Incorrect example breaks Prism
  test.skip('priceIntervals: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.priceIntervals('subscription_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  // Incorrect example breaks Prism
  test.skip('priceIntervals: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.priceIntervals(
        'subscription_id',
        {
          add: [
            {
              start_date: '2019-12-27T18:11:19.117Z',
              allocation_price: {
                amount: '10.00',
                cadence: 'one_time',
                currency: 'USD',
                expires_at_end_of_cadence: true,
              },
              discounts: [
                { amount_discount: 0, discount_type: 'amount' },
                { amount_discount: 0, discount_type: 'amount' },
                { amount_discount: 0, discount_type: 'amount' },
              ],
              end_date: '2019-12-27T18:11:19.117Z',
              external_price_id: 'external_price_id',
              fixed_fee_quantity_transitions: [
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
              ],
              maximum_amount: 0,
              minimum_amount: 0,
              price: {
                cadence: 'annual',
                currency: 'currency',
                item_id: 'item_id',
                model_type: 'unit',
                name: 'Annual fee',
                unit_config: { unit_amount: 'unit_amount' },
                billable_metric_id: 'billable_metric_id',
                billed_in_advance: true,
                conversion_rate: 0,
                external_price_id: 'external_price_id',
                fixed_price_quantity: 0,
                invoice_grouping_key: 'invoice_grouping_key',
                metadata: { foo: 'string' },
              },
              price_id: 'h74gfhdjvn7ujokd',
            },
            {
              start_date: '2019-12-27T18:11:19.117Z',
              allocation_price: {
                amount: '10.00',
                cadence: 'one_time',
                currency: 'USD',
                expires_at_end_of_cadence: true,
              },
              discounts: [
                { amount_discount: 0, discount_type: 'amount' },
                { amount_discount: 0, discount_type: 'amount' },
                { amount_discount: 0, discount_type: 'amount' },
              ],
              end_date: '2019-12-27T18:11:19.117Z',
              external_price_id: 'external_price_id',
              fixed_fee_quantity_transitions: [
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
              ],
              maximum_amount: 0,
              minimum_amount: 0,
              price: {
                cadence: 'annual',
                currency: 'currency',
                item_id: 'item_id',
                model_type: 'unit',
                name: 'Annual fee',
                unit_config: { unit_amount: 'unit_amount' },
                billable_metric_id: 'billable_metric_id',
                billed_in_advance: true,
                conversion_rate: 0,
                external_price_id: 'external_price_id',
                fixed_price_quantity: 0,
                invoice_grouping_key: 'invoice_grouping_key',
                metadata: { foo: 'string' },
              },
              price_id: 'h74gfhdjvn7ujokd',
            },
            {
              start_date: '2019-12-27T18:11:19.117Z',
              allocation_price: {
                amount: '10.00',
                cadence: 'one_time',
                currency: 'USD',
                expires_at_end_of_cadence: true,
              },
              discounts: [
                { amount_discount: 0, discount_type: 'amount' },
                { amount_discount: 0, discount_type: 'amount' },
                { amount_discount: 0, discount_type: 'amount' },
              ],
              end_date: '2019-12-27T18:11:19.117Z',
              external_price_id: 'external_price_id',
              fixed_fee_quantity_transitions: [
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
              ],
              maximum_amount: 0,
              minimum_amount: 0,
              price: {
                cadence: 'annual',
                currency: 'currency',
                item_id: 'item_id',
                model_type: 'unit',
                name: 'Annual fee',
                unit_config: { unit_amount: 'unit_amount' },
                billable_metric_id: 'billable_metric_id',
                billed_in_advance: true,
                conversion_rate: 0,
                external_price_id: 'external_price_id',
                fixed_price_quantity: 0,
                invoice_grouping_key: 'invoice_grouping_key',
                metadata: { foo: 'string' },
              },
              price_id: 'h74gfhdjvn7ujokd',
            },
          ],
          add_adjustments: [
            {
              adjustment: {
                adjustment_type: 'percentage_discount',
                applies_to_price_ids: ['price_1', 'price_2'],
                percentage_discount: 0,
              },
              start_date: '2019-12-27T18:11:19.117Z',
              end_date: '2019-12-27T18:11:19.117Z',
            },
            {
              adjustment: {
                adjustment_type: 'percentage_discount',
                applies_to_price_ids: ['price_1', 'price_2'],
                percentage_discount: 0,
              },
              start_date: '2019-12-27T18:11:19.117Z',
              end_date: '2019-12-27T18:11:19.117Z',
            },
            {
              adjustment: {
                adjustment_type: 'percentage_discount',
                applies_to_price_ids: ['price_1', 'price_2'],
                percentage_discount: 0,
              },
              start_date: '2019-12-27T18:11:19.117Z',
              end_date: '2019-12-27T18:11:19.117Z',
            },
          ],
          edit: [
            {
              price_interval_id: 'sdfs6wdjvn7ujokd',
              billing_cycle_day: 0,
              end_date: '2019-12-27T18:11:19.117Z',
              fixed_fee_quantity_transitions: [
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
              ],
              start_date: '2019-12-27T18:11:19.117Z',
            },
            {
              price_interval_id: 'sdfs6wdjvn7ujokd',
              billing_cycle_day: 0,
              end_date: '2019-12-27T18:11:19.117Z',
              fixed_fee_quantity_transitions: [
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
              ],
              start_date: '2019-12-27T18:11:19.117Z',
            },
            {
              price_interval_id: 'sdfs6wdjvn7ujokd',
              billing_cycle_day: 0,
              end_date: '2019-12-27T18:11:19.117Z',
              fixed_fee_quantity_transitions: [
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
                { effective_date: '2019-12-27T18:11:19.117Z', quantity: 5 },
              ],
              start_date: '2019-12-27T18:11:19.117Z',
            },
          ],
          edit_adjustments: [
            {
              adjustment_interval_id: 'sdfs6wdjvn7ujokd',
              end_date: '2019-12-27T18:11:19.117Z',
              start_date: '2019-12-27T18:11:19.117Z',
            },
            {
              adjustment_interval_id: 'sdfs6wdjvn7ujokd',
              end_date: '2019-12-27T18:11:19.117Z',
              start_date: '2019-12-27T18:11:19.117Z',
            },
            {
              adjustment_interval_id: 'sdfs6wdjvn7ujokd',
              end_date: '2019-12-27T18:11:19.117Z',
              start_date: '2019-12-27T18:11:19.117Z',
            },
          ],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('schedulePlanChange: only required params', async () => {
    const responsePromise = client.subscriptions.schedulePlanChange('subscription_id', {
      change_option: 'requested_date',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('schedulePlanChange: required and optional params', async () => {
    const response = await client.subscriptions.schedulePlanChange('subscription_id', {
      change_option: 'requested_date',
      align_billing_with_plan_change_date: true,
      billing_cycle_alignment: 'unchanged',
      change_date: '2017-07-21T17:32:28Z',
      coupon_redemption_code: 'coupon_redemption_code',
      credits_overage_rate: 0,
      external_plan_id: 'ZMwNQefe7J3ecf7W',
      initial_phase_order: 2,
      invoicing_threshold: '10.00',
      per_credit_overage_amount: 0,
      plan_id: 'ZMwNQefe7J3ecf7W',
      price_overrides: [
        {
          id: 'id',
          model_type: 'unit',
          unit_config: { unit_amount: 'unit_amount' },
          conversion_rate: 0,
          currency: 'currency',
          discount: {
            discount_type: 'percentage',
            amount_discount: 'amount_discount',
            applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
            percentage_discount: 0.15,
            trial_amount_discount: 'trial_amount_discount',
            usage_discount: 0,
          },
          fixed_price_quantity: 2,
          maximum_amount: '1.23',
          minimum_amount: '1.23',
        },
        {
          id: 'id',
          model_type: 'unit',
          unit_config: { unit_amount: 'unit_amount' },
          conversion_rate: 0,
          currency: 'currency',
          discount: {
            discount_type: 'percentage',
            amount_discount: 'amount_discount',
            applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
            percentage_discount: 0.15,
            trial_amount_discount: 'trial_amount_discount',
            usage_discount: 0,
          },
          fixed_price_quantity: 2,
          maximum_amount: '1.23',
          minimum_amount: '1.23',
        },
        {
          id: 'id',
          model_type: 'unit',
          unit_config: { unit_amount: 'unit_amount' },
          conversion_rate: 0,
          currency: 'currency',
          discount: {
            discount_type: 'percentage',
            amount_discount: 'amount_discount',
            applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
            percentage_discount: 0.15,
            trial_amount_discount: 'trial_amount_discount',
            usage_discount: 0,
          },
          fixed_price_quantity: 2,
          maximum_amount: '1.23',
          minimum_amount: '1.23',
        },
      ],
    });
  });

  test('triggerPhase', async () => {
    const responsePromise = client.subscriptions.triggerPhase('subscription_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('triggerPhase: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.triggerPhase('subscription_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('triggerPhase: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.triggerPhase(
        'subscription_id',
        { effective_date: '2019-12-27' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('unscheduleCancellation', async () => {
    const responsePromise = client.subscriptions.unscheduleCancellation('subscription_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('unscheduleCancellation: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.unscheduleCancellation('subscription_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('unscheduleFixedFeeQuantityUpdates: only required params', async () => {
    const responsePromise = client.subscriptions.unscheduleFixedFeeQuantityUpdates('subscription_id', {
      price_id: 'price_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('unscheduleFixedFeeQuantityUpdates: required and optional params', async () => {
    const response = await client.subscriptions.unscheduleFixedFeeQuantityUpdates('subscription_id', {
      price_id: 'price_id',
    });
  });

  test('unschedulePendingPlanChanges', async () => {
    const responsePromise = client.subscriptions.unschedulePendingPlanChanges('subscription_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('unschedulePendingPlanChanges: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.subscriptions.unschedulePendingPlanChanges('subscription_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('updateFixedFeeQuantity: only required params', async () => {
    const responsePromise = client.subscriptions.updateFixedFeeQuantity('subscription_id', {
      price_id: 'price_id',
      quantity: 0,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateFixedFeeQuantity: required and optional params', async () => {
    const response = await client.subscriptions.updateFixedFeeQuantity('subscription_id', {
      price_id: 'price_id',
      quantity: 0,
      change_option: 'immediate',
      effective_date: '2022-12-21',
    });
  });
});
