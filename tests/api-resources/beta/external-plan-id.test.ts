// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Orb from 'orb-billing';
import { Response } from 'node-fetch';

const client = new Orb({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource externalPlanId', () => {
  test('createPlanVersion: only required params', async () => {
    const responsePromise = client.beta.externalPlanId.createPlanVersion('external_plan_id', { version: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createPlanVersion: required and optional params', async () => {
    const response = await client.beta.externalPlanId.createPlanVersion('external_plan_id', {
      version: 0,
      add_adjustments: [
        {
          adjustment: {
            adjustment_type: 'percentage_discount',
            percentage_discount: 0,
            applies_to_all: true,
            applies_to_item_ids: ['item_1', 'item_2'],
            applies_to_price_ids: ['price_1', 'price_2'],
            currency: 'currency',
            filters: [
              {
                field: 'price_id',
                operator: 'includes',
                values: ['string'],
              },
            ],
            is_invoice_level: true,
            price_type: 'usage',
          },
          plan_phase_order: 0,
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
            filters: [
              {
                field: 'item_id',
                operator: 'includes',
                values: ['string'],
              },
            ],
            item_id: 'item_id',
            license_type_id: 'license_type_id',
            per_unit_cost_basis: 'per_unit_cost_basis',
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
            license_type_id: 'license_type_id',
            metadata: { foo: 'string' },
            reference_id: 'reference_id',
          },
        },
      ],
      remove_adjustments: [{ adjustment_id: 'adjustment_id', plan_phase_order: 0 }],
      remove_prices: [{ price_id: 'price_id', plan_phase_order: 0 }],
      replace_adjustments: [
        {
          adjustment: {
            adjustment_type: 'percentage_discount',
            percentage_discount: 0,
            applies_to_all: true,
            applies_to_item_ids: ['item_1', 'item_2'],
            applies_to_price_ids: ['price_1', 'price_2'],
            currency: 'currency',
            filters: [
              {
                field: 'price_id',
                operator: 'includes',
                values: ['string'],
              },
            ],
            is_invoice_level: true,
            price_type: 'usage',
          },
          replaces_adjustment_id: 'replaces_adjustment_id',
          plan_phase_order: 0,
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
            filters: [
              {
                field: 'item_id',
                operator: 'includes',
                values: ['string'],
              },
            ],
            item_id: 'item_id',
            license_type_id: 'license_type_id',
            per_unit_cost_basis: 'per_unit_cost_basis',
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
            license_type_id: 'license_type_id',
            metadata: { foo: 'string' },
            reference_id: 'reference_id',
          },
        },
      ],
      set_as_default: true,
    });
  });

  test('fetchPlanVersion', async () => {
    const responsePromise = client.beta.externalPlanId.fetchPlanVersion('external_plan_id', 'version');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('fetchPlanVersion: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.beta.externalPlanId.fetchPlanVersion('external_plan_id', 'version', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Orb.NotFoundError);
  });

  test('setDefaultPlanVersion: only required params', async () => {
    const responsePromise = client.beta.externalPlanId.setDefaultPlanVersion('external_plan_id', {
      version: 0,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('setDefaultPlanVersion: required and optional params', async () => {
    const response = await client.beta.externalPlanId.setDefaultPlanVersion('external_plan_id', {
      version: 0,
    });
  });
});
