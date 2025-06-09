// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as Shared from '../shared';
import * as ExternalPlanIDAPI from './external-plan-id';
import {
  ExternalPlanID,
  ExternalPlanIDCreatePlanVersionParams,
  ExternalPlanIDSetDefaultPlanVersionParams,
} from './external-plan-id';
import * as PlansAPI from '../plans/plans';

export class Beta extends APIResource {
  externalPlanId: ExternalPlanIDAPI.ExternalPlanID = new ExternalPlanIDAPI.ExternalPlanID(this._client);

  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint allows the creation of a new plan version for an existing plan.
   */
  createPlanVersion(
    planId: string,
    body: BetaCreatePlanVersionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PlanVersion> {
    return this._client.post(`/plans/${planId}/versions`, { body, ...options });
  }

  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint is used to fetch a plan version. It returns the phases, prices,
   * and adjustments present on this version of the plan.
   */
  fetchPlanVersion(
    planId: string,
    version: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PlanVersion> {
    return this._client.get(`/plans/${planId}/versions/${version}`, options);
  }

  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint allows setting the default version of a plan.
   */
  setDefaultPlanVersion(
    planId: string,
    body: BetaSetDefaultPlanVersionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PlansAPI.Plan> {
    return this._client.post(`/plans/${planId}/set_default_version`, { body, ...options });
  }
}

/**
 * The PlanVersion resource represents the prices and adjustments present on a
 * specific version of a plan.
 */
export interface PlanVersion {
  /**
   * Adjustments for this plan. If the plan has phases, this includes adjustments
   * across all phases of the plan.
   */
  adjustments: Array<
    | Shared.PlanPhaseUsageDiscountAdjustment
    | Shared.PlanPhaseAmountDiscountAdjustment
    | Shared.PlanPhasePercentageDiscountAdjustment
    | Shared.PlanPhaseMinimumAdjustment
    | Shared.PlanPhaseMaximumAdjustment
  >;

  created_at: string;

  plan_phases: Array<PlanVersionPhase> | null;

  /**
   * Prices for this plan. If the plan has phases, this includes prices across all
   * phases of the plan.
   */
  prices: Array<Shared.Price>;

  version: number;
}

export interface PlanVersionPhase {
  id: string;

  description: string | null;

  /**
   * How many terms of length `duration_unit` this phase is active for. If null, this
   * phase is evergreen and active indefinitely
   */
  duration: number | null;

  duration_unit: 'daily' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | null;

  name: string;

  /**
   * Determines the ordering of the phase in a plan's lifecycle. 1 = first phase.
   */
  order: number;
}

export interface BetaCreatePlanVersionParams {
  /**
   * New version number.
   */
  version: number;

  /**
   * Additional adjustments to be added to the plan.
   */
  add_adjustments?: Array<BetaCreatePlanVersionParams.AddAdjustment> | null;

  /**
   * Additional prices to be added to the plan.
   */
  add_prices?: Array<BetaCreatePlanVersionParams.AddPrice> | null;

  /**
   * Adjustments to be removed from the plan.
   */
  remove_adjustments?: Array<BetaCreatePlanVersionParams.RemoveAdjustment> | null;

  /**
   * Prices to be removed from the plan.
   */
  remove_prices?: Array<BetaCreatePlanVersionParams.RemovePrice> | null;

  /**
   * Adjustments to be replaced with additional adjustments on the plan.
   */
  replace_adjustments?: Array<BetaCreatePlanVersionParams.ReplaceAdjustment> | null;

  /**
   * Prices to be replaced with additional prices on the plan.
   */
  replace_prices?: Array<BetaCreatePlanVersionParams.ReplacePrice> | null;

  /**
   * Set this new plan version as the default
   */
  set_as_default?: boolean | null;
}

export namespace BetaCreatePlanVersionParams {
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

export interface BetaSetDefaultPlanVersionParams {
  /**
   * Plan version to set as the default.
   */
  version: number;
}

Beta.ExternalPlanID = ExternalPlanID;

export declare namespace Beta {
  export {
    type PlanVersion as PlanVersion,
    type PlanVersionPhase as PlanVersionPhase,
    type BetaCreatePlanVersionParams as BetaCreatePlanVersionParams,
    type BetaSetDefaultPlanVersionParams as BetaSetDefaultPlanVersionParams,
  };

  export {
    ExternalPlanID as ExternalPlanID,
    type ExternalPlanIDCreatePlanVersionParams as ExternalPlanIDCreatePlanVersionParams,
    type ExternalPlanIDSetDefaultPlanVersionParams as ExternalPlanIDSetDefaultPlanVersionParams,
  };
}
