// File generated from our OpenAPI spec by Stainless.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import { isRequestOptions } from 'orb-billing/core';
import * as ExternalPlanIDAPI from 'orb-billing/resources/plans/external-plan-id';
import * as PlansAPI from 'orb-billing/resources/plans/plans';

export class ExternalPlanID extends APIResource {
  /**
   * This endpoint is used to fetch [plan](../guides/concepts##plan-and-price)
   * details given an external_plan_id identifier. It returns information about the
   * prices included in the plan and their configuration, as well as the product that
   * the plan is attached to.
   *
   * ## Serialized prices
   *
   * Orb supports a few different pricing models out of the box. Each of these models
   * is serialized differently in a given [Price](../guides/concepts#plan-and-price)
   * object. The `model_type` field determines the key for the configuration object
   * that is present. A detailed explanation of price types can be found in the
   * [Price schema](../guides/concepts#plan-and-price).
   */
  update(
    otherExternalPlanId: string,
    body?: ExternalPlanIDUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PlansAPI.Plan>;
  update(otherExternalPlanId: string, options?: Core.RequestOptions): Core.APIPromise<PlansAPI.Plan>;
  update(
    otherExternalPlanId: string,
    body: ExternalPlanIDUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<PlansAPI.Plan> {
    if (isRequestOptions(body)) {
      return this.update(otherExternalPlanId, {}, body);
    }
    return this._client.put(`/plans/external_plan_id/${otherExternalPlanId}`, { body, ...options });
  }

  /**
   * This endpoint is used to fetch [plan](../guides/concepts##plan-and-price)
   * details given an external_plan_id identifier. It returns information about the
   * prices included in the plan and their configuration, as well as the product that
   * the plan is attached to.
   *
   * ## Serialized prices
   *
   * Orb supports a few different pricing models out of the box. Each of these models
   * is serialized differently in a given [Price](../guides/concepts#plan-and-price)
   * object. The `model_type` field determines the key for the configuration object
   * that is present. A detailed explanation of price types can be found in the
   * [Price schema](../guides/concepts#plan-and-price). "
   */
  fetch(externalPlanId: string, options?: Core.RequestOptions): Core.APIPromise<PlansAPI.Plan> {
    return this._client.get(`/plans/external_plan_id/${externalPlanId}`, options);
  }
}

export interface ExternalPlanIDUpdateParams {
  /**
   * An optional user-defined ID for this plan resource, used throughout the system
   * as an alias for this Plan. Use this field to identify a plan by an existing
   * identifier in your system.
   */
  external_plan_id?: string | null;

  metadata?: unknown | null;
}

export namespace ExternalPlanID {
  export import ExternalPlanIDUpdateParams = ExternalPlanIDAPI.ExternalPlanIDUpdateParams;
}
