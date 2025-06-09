// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as Shared from '../shared';
import * as BetaAPI from './beta';
import * as PlansAPI from '../plans/plans';

export class ExternalPlanID extends APIResource {
  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint allows the creation of a new plan version for an existing plan.
   */
  createPlanVersion(
    externalPlanId: string,
    body: ExternalPlanIDCreatePlanVersionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BetaAPI.PlanVersion> {
    return this._client.post(`/plans/external_plan_id/${externalPlanId}/versions`, { body, ...options });
  }

  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint is used to fetch a plan version. It returns the phases, prices,
   * and adjustments present on this version of the plan.
   */
  fetchPlanVersion(
    externalPlanId: string,
    version: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BetaAPI.PlanVersion> {
    return this._client.get(`/plans/external_plan_id/${externalPlanId}/versions/${version}`, options);
  }

  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint allows setting the default version of a plan.
   */
  setDefaultPlanVersion(
    externalPlanId: string,
    body: ExternalPlanIDSetDefaultPlanVersionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PlansAPI.Plan> {
    return this._client.post(`/plans/external_plan_id/${externalPlanId}/set_default_version`, {
      body,
      ...options,
    });
  }
}

export interface ExternalPlanIDCreatePlanVersionParams {
  /**
   * New version number.
   */
  version: number;

  /**
   * Additional adjustments to be added to the plan.
   */
  add_adjustments?: Array<ExternalPlanIDCreatePlanVersionParams.AddAdjustment> | null;

  /**
   * Additional prices to be added to the plan.
   */
  add_prices?: Array<ExternalPlanIDCreatePlanVersionParams.AddPrice> | null;

  /**
   * Adjustments to be removed from the plan.
   */
  remove_adjustments?: Array<ExternalPlanIDCreatePlanVersionParams.RemoveAdjustment> | null;

  /**
   * Prices to be removed from the plan.
   */
  remove_prices?: Array<ExternalPlanIDCreatePlanVersionParams.RemovePrice> | null;

  /**
   * Adjustments to be replaced with additional adjustments on the plan.
   */
  replace_adjustments?: Array<ExternalPlanIDCreatePlanVersionParams.ReplaceAdjustment> | null;

  /**
   * Prices to be replaced with additional prices on the plan.
   */
  replace_prices?: Array<ExternalPlanIDCreatePlanVersionParams.ReplacePrice> | null;

  /**
   * Set this new plan version as the default
   */
  set_as_default?: boolean | null;
}

export namespace ExternalPlanIDCreatePlanVersionParams {
  export interface AddAdjustment {
    /**
     * The definition of a new adjustment to create and add to the plan.
     */
    adjustment:
      | Shared.NewPercentageDiscount
      | Shared.NewUsageDiscount
      | Shared.NewAmountDiscount
      | Shared.NewMinimum
      | Shared.NewMaximum;

    /**
     * The phase to add this adjustment to.
     */
    plan_phase_order?: number | null;
  }

  export interface AddPrice {
    /**
     * The allocation price to add to the plan.
     */
    allocation_price?: Shared.NewAllocationPrice | null;

    /**
     * The phase to add this price to.
     */
    plan_phase_order?: number | null;

    /**
     * The price to add to the plan
     */
    price?:
      | Shared.NewPlanUnitPrice
      | Shared.NewPlanPackagePrice
      | Shared.NewPlanMatrixPrice
      | Shared.NewPlanTieredPrice
      | Shared.NewPlanTieredBPSPrice
      | Shared.NewPlanBPSPrice
      | Shared.NewPlanBulkBPSPrice
      | Shared.NewPlanBulkPrice
      | Shared.NewPlanThresholdTotalAmountPrice
      | Shared.NewPlanTieredPackagePrice
      | Shared.NewPlanTieredWithMinimumPrice
      | Shared.NewPlanUnitWithPercentPrice
      | Shared.NewPlanPackageWithAllocationPrice
      | Shared.NewPlanTierWithProrationPrice
      | Shared.NewPlanUnitWithProrationPrice
      | Shared.NewPlanGroupedAllocationPrice
      | Shared.NewPlanGroupedWithProratedMinimumPrice
      | Shared.NewPlanGroupedWithMeteredMinimumPrice
      | Shared.NewPlanMatrixWithDisplayNamePrice
      | Shared.NewPlanBulkWithProrationPrice
      | Shared.NewPlanGroupedTieredPackagePrice
      | Shared.NewPlanMaxGroupTieredPackagePrice
      | Shared.NewPlanScalableMatrixWithUnitPricingPrice
      | Shared.NewPlanScalableMatrixWithTieredPricingPrice
      | Shared.NewPlanCumulativeGroupedBulkPrice
      | Shared.NewPlanTieredPackageWithMinimumPrice
      | Shared.NewPlanMatrixWithAllocationPrice
      | Shared.NewPlanGroupedTieredPrice
      | null;
  }

  export interface RemoveAdjustment {
    /**
     * The id of the adjustment to remove from on the plan.
     */
    adjustment_id: string;

    /**
     * The phase to remove this adjustment from.
     */
    plan_phase_order?: number | null;
  }

  export interface RemovePrice {
    /**
     * The id of the price to remove from the plan.
     */
    price_id: string;

    /**
     * The phase to remove this price from.
     */
    plan_phase_order?: number | null;
  }

  export interface ReplaceAdjustment {
    /**
     * The definition of a new adjustment to create and add to the plan.
     */
    adjustment:
      | Shared.NewPercentageDiscount
      | Shared.NewUsageDiscount
      | Shared.NewAmountDiscount
      | Shared.NewMinimum
      | Shared.NewMaximum;

    /**
     * The id of the adjustment on the plan to replace in the plan.
     */
    replaces_adjustment_id: string;

    /**
     * The phase to replace this adjustment from.
     */
    plan_phase_order?: number | null;
  }

  export interface ReplacePrice {
    /**
     * The id of the price on the plan to replace in the plan.
     */
    replaces_price_id: string;

    /**
     * The allocation price to add to the plan.
     */
    allocation_price?: Shared.NewAllocationPrice | null;

    /**
     * The phase to replace this price from.
     */
    plan_phase_order?: number | null;

    /**
     * The price to add to the plan
     */
    price?:
      | Shared.NewPlanUnitPrice
      | Shared.NewPlanPackagePrice
      | Shared.NewPlanMatrixPrice
      | Shared.NewPlanTieredPrice
      | Shared.NewPlanTieredBPSPrice
      | Shared.NewPlanBPSPrice
      | Shared.NewPlanBulkBPSPrice
      | Shared.NewPlanBulkPrice
      | Shared.NewPlanThresholdTotalAmountPrice
      | Shared.NewPlanTieredPackagePrice
      | Shared.NewPlanTieredWithMinimumPrice
      | Shared.NewPlanUnitWithPercentPrice
      | Shared.NewPlanPackageWithAllocationPrice
      | Shared.NewPlanTierWithProrationPrice
      | Shared.NewPlanUnitWithProrationPrice
      | Shared.NewPlanGroupedAllocationPrice
      | Shared.NewPlanGroupedWithProratedMinimumPrice
      | Shared.NewPlanGroupedWithMeteredMinimumPrice
      | Shared.NewPlanMatrixWithDisplayNamePrice
      | Shared.NewPlanBulkWithProrationPrice
      | Shared.NewPlanGroupedTieredPackagePrice
      | Shared.NewPlanMaxGroupTieredPackagePrice
      | Shared.NewPlanScalableMatrixWithUnitPricingPrice
      | Shared.NewPlanScalableMatrixWithTieredPricingPrice
      | Shared.NewPlanCumulativeGroupedBulkPrice
      | Shared.NewPlanTieredPackageWithMinimumPrice
      | Shared.NewPlanMatrixWithAllocationPrice
      | Shared.NewPlanGroupedTieredPrice
      | null;
  }
}

export interface ExternalPlanIDSetDefaultPlanVersionParams {
  /**
   * Plan version to set as the default.
   */
  version: number;
}

export declare namespace ExternalPlanID {
  export {
    type ExternalPlanIDCreatePlanVersionParams as ExternalPlanIDCreatePlanVersionParams,
    type ExternalPlanIDSetDefaultPlanVersionParams as ExternalPlanIDSetDefaultPlanVersionParams,
  };
}
