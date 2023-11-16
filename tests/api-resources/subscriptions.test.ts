// File generated from our OpenAPI spec by Stainless.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const orb = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource subscriptions', () => {
  test('create', async () => {
    const responsePromise = orb.subscriptions.create();
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
    await expect(orb.subscriptions.create({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.subscriptions.create(
        {
          align_billing_with_subscription_start_date: true,
          auto_collection: true,
          aws_region: 'string',
          coupon_redemption_code: 'string',
          credits_overage_rate: 0,
          customer_id: 'string',
          default_invoice_memo: 'string',
          end_date: '2019-12-27T18:11:19.117Z',
          external_customer_id: 'string',
          external_marketplace: 'google',
          external_marketplace_reporting_id: 'string',
          external_plan_id: 'ZMwNQefe7J3ecf7W',
          initial_phase_order: 0,
          invoicing_threshold: 'string',
          metadata: { foo: 'string' },
          net_terms: 0,
          per_credit_overage_amount: 'string',
          plan_id: 'ZMwNQefe7J3ecf7W',
          price_overrides: [
            {
              id: 'string',
              model_type: 'unit',
              minimum_amount: '1.23',
              maximum_amount: '1.23',
              discount: {
                discount_type: 'percentage',
                percentage_discount: 0.15,
                trial_amount_discount: 'string',
                usage_discount: 0,
                amount_discount: 'string',
                applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
              },
              fixed_price_quantity: 2,
              unit_config: { unit_amount: 'string', scaling_factor: 0 },
            },
            {
              id: 'string',
              model_type: 'unit',
              minimum_amount: '1.23',
              maximum_amount: '1.23',
              discount: {
                discount_type: 'percentage',
                percentage_discount: 0.15,
                trial_amount_discount: 'string',
                usage_discount: 0,
                amount_discount: 'string',
                applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
              },
              fixed_price_quantity: 2,
              unit_config: { unit_amount: 'string', scaling_factor: 0 },
            },
            {
              id: 'string',
              model_type: 'unit',
              minimum_amount: '1.23',
              maximum_amount: '1.23',
              discount: {
                discount_type: 'percentage',
                percentage_discount: 0.15,
                trial_amount_discount: 'string',
                usage_discount: 0,
                amount_discount: 'string',
                applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
              },
              fixed_price_quantity: 2,
              unit_config: { unit_amount: 'string', scaling_factor: 0 },
            },
          ],
          start_date: '2019-12-27T18:11:19.117Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = orb.subscriptions.list();
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
    await expect(orb.subscriptions.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.subscriptions.list(
        {
          'created_at[gt]': '2019-12-27T18:11:19.117Z',
          'created_at[gte]': '2019-12-27T18:11:19.117Z',
          'created_at[lt]': '2019-12-27T18:11:19.117Z',
          'created_at[lte]': '2019-12-27T18:11:19.117Z',
          cursor: 'string',
          customer_id: 'string',
          external_customer_id: 'string',
          limit: 0,
          status: 'active',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('cancel: only required params', async () => {
    const responsePromise = orb.subscriptions.cancel('string', { cancel_option: 'end_of_subscription_term' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancel: required and optional params', async () => {
    const response = await orb.subscriptions.cancel('string', {
      cancel_option: 'end_of_subscription_term',
      cancellation_date: '2019-12-27T18:11:19.117Z',
    });
  });

  test('fetch', async () => {
    const responsePromise = orb.subscriptions.fetch('string');
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
    await expect(orb.subscriptions.fetch('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Orb.NotFoundError,
    );
  });

  test('fetchCosts', async () => {
    const responsePromise = orb.subscriptions.fetchCosts('string');
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
      orb.subscriptions.fetchCosts('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('fetchCosts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.subscriptions.fetchCosts(
        'string',
        {
          group_by: 'string',
          timeframe_end: '2019-12-27T18:11:19.117Z',
          timeframe_start: '2019-12-27T18:11:19.117Z',
          view_mode: 'periodic',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('fetchSchedule', async () => {
    const responsePromise = orb.subscriptions.fetchSchedule('string');
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
      orb.subscriptions.fetchSchedule('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('fetchSchedule: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.subscriptions.fetchSchedule(
        'string',
        {
          cursor: 'string',
          limit: 0,
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
    const responsePromise = orb.subscriptions.fetchUsage('string');
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
      orb.subscriptions.fetchUsage('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  // Incorrect example breaks Prism
  test.skip('fetchUsage: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.subscriptions.fetchUsage(
        'string',
        {
          billable_metric_id: 'string',
          cursor: 'string',
          first_dimension_key: 'string',
          first_dimension_value: 'string',
          granularity: 'day',
          group_by: 'string',
          limit: 0,
          second_dimension_key: 'string',
          second_dimension_value: 'string',
          timeframe_end: '2019-12-27T18:11:19.117Z',
          timeframe_start: '2019-12-27T18:11:19.117Z',
          view_mode: 'periodic',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  // Incorrect example breaks Prism
  test.skip('priceIntervals', async () => {
    const responsePromise = orb.subscriptions.priceIntervals('string');
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
      orb.subscriptions.priceIntervals('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  // Incorrect example breaks Prism
  test.skip('priceIntervals: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.subscriptions.priceIntervals(
        'string',
        {
          add: [
            {
              price_id: 'h74gfhdjvn7ujokd',
              external_price_id: 'external_price_id',
              price: {
                external_price_id: 'string',
                name: 'Annual fee',
                billable_metric_id: 'string',
                item_id: 'string',
                billed_in_advance: true,
                fixed_price_quantity: 0,
                invoice_grouping_key: 'string',
                cadence: 'annual',
                model_type: 'unit',
                unit_config: { unit_amount: 'string', scaling_factor: 0 },
                currency: 'string',
              },
              start_date: '2023-05-01',
              end_date: '2023-07-10',
              fixed_fee_quantity_transitions: [
                { quantity: 5, effective_date: '2023-05-01' },
                { quantity: 5, effective_date: '2023-05-01' },
                { quantity: 5, effective_date: '2023-05-01' },
              ],
              discounts: [
                { discount_type: 'amount', amount_discount: 0 },
                { discount_type: 'amount', amount_discount: 0 },
                { discount_type: 'amount', amount_discount: 0 },
              ],
              minimum_amount: 0,
              maximum_amount: 0,
            },
            {
              price_id: 'h74gfhdjvn7ujokd',
              external_price_id: 'external_price_id',
              price: {
                external_price_id: 'string',
                name: 'Annual fee',
                billable_metric_id: 'string',
                item_id: 'string',
                billed_in_advance: true,
                fixed_price_quantity: 0,
                invoice_grouping_key: 'string',
                cadence: 'annual',
                model_type: 'unit',
                unit_config: { unit_amount: 'string', scaling_factor: 0 },
                currency: 'string',
              },
              start_date: '2023-05-01',
              end_date: '2023-07-10',
              fixed_fee_quantity_transitions: [
                { quantity: 5, effective_date: '2023-05-01' },
                { quantity: 5, effective_date: '2023-05-01' },
                { quantity: 5, effective_date: '2023-05-01' },
              ],
              discounts: [
                { discount_type: 'amount', amount_discount: 0 },
                { discount_type: 'amount', amount_discount: 0 },
                { discount_type: 'amount', amount_discount: 0 },
              ],
              minimum_amount: 0,
              maximum_amount: 0,
            },
            {
              price_id: 'h74gfhdjvn7ujokd',
              external_price_id: 'external_price_id',
              price: {
                external_price_id: 'string',
                name: 'Annual fee',
                billable_metric_id: 'string',
                item_id: 'string',
                billed_in_advance: true,
                fixed_price_quantity: 0,
                invoice_grouping_key: 'string',
                cadence: 'annual',
                model_type: 'unit',
                unit_config: { unit_amount: 'string', scaling_factor: 0 },
                currency: 'string',
              },
              start_date: '2023-05-01',
              end_date: '2023-07-10',
              fixed_fee_quantity_transitions: [
                { quantity: 5, effective_date: '2023-05-01' },
                { quantity: 5, effective_date: '2023-05-01' },
                { quantity: 5, effective_date: '2023-05-01' },
              ],
              discounts: [
                { discount_type: 'amount', amount_discount: 0 },
                { discount_type: 'amount', amount_discount: 0 },
                { discount_type: 'amount', amount_discount: 0 },
              ],
              minimum_amount: 0,
              maximum_amount: 0,
            },
          ],
          edit: [
            {
              price_interval_id: 'sdfs6wdjvn7ujokd',
              start_date: '2023-05-01',
              end_date: '2023-07-10',
              fixed_fee_quantity_transitions: [
                { quantity: 5, effective_date: '2023-05-01' },
                { quantity: 5, effective_date: '2023-05-01' },
                { quantity: 5, effective_date: '2023-05-01' },
              ],
              billing_cycle_day: 0,
            },
            {
              price_interval_id: 'sdfs6wdjvn7ujokd',
              start_date: '2023-05-01',
              end_date: '2023-07-10',
              fixed_fee_quantity_transitions: [
                { quantity: 5, effective_date: '2023-05-01' },
                { quantity: 5, effective_date: '2023-05-01' },
                { quantity: 5, effective_date: '2023-05-01' },
              ],
              billing_cycle_day: 0,
            },
            {
              price_interval_id: 'sdfs6wdjvn7ujokd',
              start_date: '2023-05-01',
              end_date: '2023-07-10',
              fixed_fee_quantity_transitions: [
                { quantity: 5, effective_date: '2023-05-01' },
                { quantity: 5, effective_date: '2023-05-01' },
                { quantity: 5, effective_date: '2023-05-01' },
              ],
              billing_cycle_day: 0,
            },
          ],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('schedulePlanChange: only required params', async () => {
    const responsePromise = orb.subscriptions.schedulePlanChange('string', {
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
    const response = await orb.subscriptions.schedulePlanChange('string', {
      change_option: 'requested_date',
      align_billing_with_plan_change_date: true,
      billing_cycle_alignment: 'unchanged',
      change_date: '2017-07-21T17:32:28Z',
      coupon_redemption_code: 'string',
      credits_overage_rate: 0,
      external_plan_id: 'ZMwNQefe7J3ecf7W',
      initial_phase_order: 2,
      invoicing_threshold: '10.00',
      per_credit_overage_amount: 'string',
      plan_id: 'ZMwNQefe7J3ecf7W',
      price_overrides: [
        {
          id: 'string',
          model_type: 'unit',
          minimum_amount: '1.23',
          maximum_amount: '1.23',
          discount: {
            discount_type: 'percentage',
            percentage_discount: 0.15,
            trial_amount_discount: 'string',
            usage_discount: 0,
            amount_discount: 'string',
            applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
          },
          fixed_price_quantity: 2,
          unit_config: { unit_amount: 'string', scaling_factor: 0 },
        },
        {
          id: 'string',
          model_type: 'unit',
          minimum_amount: '1.23',
          maximum_amount: '1.23',
          discount: {
            discount_type: 'percentage',
            percentage_discount: 0.15,
            trial_amount_discount: 'string',
            usage_discount: 0,
            amount_discount: 'string',
            applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
          },
          fixed_price_quantity: 2,
          unit_config: { unit_amount: 'string', scaling_factor: 0 },
        },
        {
          id: 'string',
          model_type: 'unit',
          minimum_amount: '1.23',
          maximum_amount: '1.23',
          discount: {
            discount_type: 'percentage',
            percentage_discount: 0.15,
            trial_amount_discount: 'string',
            usage_discount: 0,
            amount_discount: 'string',
            applies_to_price_ids: ['h74gfhdjvn7ujokd', '7hfgtgjnbvc3ujkl'],
          },
          fixed_price_quantity: 2,
          unit_config: { unit_amount: 'string', scaling_factor: 0 },
        },
      ],
    });
  });

  test('triggerPhase', async () => {
    const responsePromise = orb.subscriptions.triggerPhase('string');
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
      orb.subscriptions.triggerPhase('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('triggerPhase: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      orb.subscriptions.triggerPhase(
        'string',
        { effective_date: '2019-12-27' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('unscheduleCancellation', async () => {
    const responsePromise = orb.subscriptions.unscheduleCancellation('string');
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
      orb.subscriptions.unscheduleCancellation('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('unscheduleFixedFeeQuantityUpdates: only required params', async () => {
    const responsePromise = orb.subscriptions.unscheduleFixedFeeQuantityUpdates('string', {
      price_id: 'string',
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
    const response = await orb.subscriptions.unscheduleFixedFeeQuantityUpdates('string', {
      price_id: 'string',
    });
  });

  test('unschedulePendingPlanChanges', async () => {
    const responsePromise = orb.subscriptions.unschedulePendingPlanChanges('string');
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
      orb.subscriptions.unschedulePendingPlanChanges('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('updateFixedFeeQuantity: only required params', async () => {
    const responsePromise = orb.subscriptions.updateFixedFeeQuantity('string', {
      price_id: 'string',
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
    const response = await orb.subscriptions.updateFixedFeeQuantity('string', {
      price_id: 'string',
      quantity: 0,
      change_option: 'immediate',
      effective_date: '2022-12-21',
    });
  });
});
