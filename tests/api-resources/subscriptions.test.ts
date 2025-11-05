// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const client = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource subscriptions', () => {
  test('create', async () => {
    const responsePromise = client.subscriptions.create({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update', async () => {
    const responsePromise = client.subscriptions.update('subscription_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
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
          customer_id: ['string'],
          external_customer_id: ['string'],
          external_plan_id: 'external_plan_id',
          limit: 1,
          plan_id: 'plan_id',
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
      allow_invoice_credit_or_void: true,
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
    const responsePromise = client.subscriptions.priceIntervals('subscription_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('redeemCoupon: only required params', async () => {
    const responsePromise = client.subscriptions.redeemCoupon('subscription_id', {
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

  test('redeemCoupon: required and optional params', async () => {
    const response = await client.subscriptions.redeemCoupon('subscription_id', {
      change_option: 'requested_date',
      allow_invoice_credit_or_void: true,
      change_date: '2017-07-21T17:32:28Z',
      coupon_id: 'coupon_id',
      coupon_redemption_code: 'coupon_redemption_code',
    });
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
      add_adjustments: [
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
          end_date: '2019-12-27T18:11:19.117Z',
          plan_phase_order: 0,
          start_date: '2019-12-27T18:11:19.117Z',
        },
      ],
      add_prices: [
        {
          allocation_price: {
            amount: '10.00',
            cadence: 'monthly',
            currency: 'USD',
            custom_expiration: { duration: 0, duration_unit: 'day' },
            expires_at_end_of_cadence: true,
            filters: [{ field: 'item_id', operator: 'includes', values: ['string'] }],
          },
          discounts: [
            {
              discount_type: 'percentage',
              amount_discount: 'amount_discount',
              percentage_discount: 0.15,
              usage_discount: 0,
            },
          ],
          end_date: '2019-12-27T18:11:19.117Z',
          external_price_id: 'external_price_id',
          maximum_amount: '1.23',
          minimum_amount: '1.23',
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
          price_id: 'h74gfhdjvn7ujokd',
          start_date: '2019-12-27T18:11:19.117Z',
        },
      ],
      align_billing_with_plan_change_date: true,
      auto_collection: true,
      billing_cycle_alignment: 'unchanged',
      billing_cycle_anchor_configuration: { day: 1, month: 1, year: 0 },
      change_date: '2017-07-21T17:32:28Z',
      coupon_redemption_code: 'coupon_redemption_code',
      credits_overage_rate: 0,
      default_invoice_memo: 'default_invoice_memo',
      external_plan_id: 'ZMwNQefe7J3ecf7W',
      filter: "my_property > 100 AND my_other_property = 'bar'",
      initial_phase_order: 2,
      invoicing_threshold: '10.00',
      net_terms: 0,
      per_credit_overage_amount: 0,
      plan_id: 'ZMwNQefe7J3ecf7W',
      plan_version_number: 0,
      price_overrides: [{}],
      remove_adjustments: [{ adjustment_id: 'h74gfhdjvn7ujokd' }],
      remove_prices: [{ external_price_id: 'external_price_id', price_id: 'h74gfhdjvn7ujokd' }],
      replace_adjustments: [
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
          replaces_adjustment_id: 'replaces_adjustment_id',
        },
      ],
      replace_prices: [
        {
          replaces_price_id: 'replaces_price_id',
          allocation_price: {
            amount: '10.00',
            cadence: 'monthly',
            currency: 'USD',
            custom_expiration: { duration: 0, duration_unit: 'day' },
            expires_at_end_of_cadence: true,
            filters: [{ field: 'item_id', operator: 'includes', values: ['string'] }],
          },
          discounts: [
            {
              discount_type: 'percentage',
              amount_discount: 'amount_discount',
              percentage_discount: 0.15,
              usage_discount: 0,
            },
          ],
          external_price_id: 'external_price_id',
          fixed_price_quantity: 2,
          maximum_amount: '1.23',
          minimum_amount: '1.23',
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
          price_id: 'h74gfhdjvn7ujokd',
        },
      ],
      trial_duration_days: 0,
      usage_customer_ids: ['string'],
    });
  });

  test('triggerPhase', async () => {
    const responsePromise = client.subscriptions.triggerPhase('subscription_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
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
      allow_invoice_credit_or_void: true,
      change_option: 'immediate',
      effective_date: '2022-12-21',
    });
  });

  test('updateTrial: only required params', async () => {
    const responsePromise = client.subscriptions.updateTrial('subscription_id', {
      trial_end_date: '2017-07-21T17:32:28Z',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateTrial: required and optional params', async () => {
    const response = await client.subscriptions.updateTrial('subscription_id', {
      trial_end_date: '2017-07-21T17:32:28Z',
      shift: true,
    });
  });
});
