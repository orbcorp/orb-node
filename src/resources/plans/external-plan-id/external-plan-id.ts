// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';
import * as PlansAPI from '../plans';
import * as VersionsAPI from './versions';
import { VersionCreateParams, VersionCreateResponse, VersionRetrieveResponse, Versions } from './versions';

export class ExternalPlanID extends APIResource {
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

  /**
   * This endpoint can be used to update the `external_plan_id`, and `metadata` of an
   * existing plan.
   *
   * Other fields on a plan are currently immutable.
   */
  update(
    otherExternalPlanId: string,
    body: ExternalPlanIDUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PlansAPI.Plan> {
    return this._client.put(`/plans/external_plan_id/${otherExternalPlanId}`, { body, ...options });
  }

  /**
   * This endpoint is used to fetch [plan](/core-concepts##plan-and-price) details
   * given an external_plan_id identifier. It returns information about the prices
   * included in the plan and their configuration, as well as the product that the
   * plan is attached to.
   *
   * If multiple plans are found to contain the specified external_plan_id, the
   * active plans will take priority over archived ones, and among those, the
   * endpoint will return the most recently created plan.
   *
   * ## Serialized prices
   *
   * Orb supports a few different pricing models out of the box. Each of these models
   * is serialized differently in a given [Price](/core-concepts#plan-and-price)
   * object. The `model_type` field determines the key for the configuration object
   * that is present. A detailed explanation of price types can be found in the
   * [Price schema](/core-concepts#plan-and-price). "
   */
  fetch(externalPlanId: string, options?: Core.RequestOptions): Core.APIPromise<PlansAPI.Plan> {
    return this._client.get(`/plans/external_plan_id/${externalPlanId}`, options);
  }

  /**
   * This API endpoint is in beta and its interface may change. It is recommended for
   * use only in test mode.
   *
   * This endpoint allows setting the default version of a plan.
   */
  setDefaultVersion(
    externalPlanId: string,
    body: ExternalPlanIDSetDefaultVersionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PlansAPI.Plan> {
    return this._client.post(`/plans/external_plan_id/${externalPlanId}/set_default_version`, {
      body,
      ...options,
    });
  }
}

export interface ExternalPlanIDUpdateParams {
  /**
   * An optional user-defined ID for this plan resource, used throughout the system
   * as an alias for this Plan. Use this field to identify a plan by an existing
   * identifier in your system.
   */
  external_plan_id?: string | null;

  /**
   * User-specified key/value pairs for the resource. Individual keys can be removed
   * by setting the value to `null`, and the entire metadata mapping can be cleared
   * by setting `metadata` to `null`.
   */
  metadata?: Record<string, string | null> | null;
}

export interface ExternalPlanIDSetDefaultVersionParams {
  /**
   * Plan version to set as the default.
   */
  version: number;
}

ExternalPlanID.Versions = Versions;

export declare namespace ExternalPlanID {
  export {
    type ExternalPlanIDUpdateParams as ExternalPlanIDUpdateParams,
    type ExternalPlanIDSetDefaultVersionParams as ExternalPlanIDSetDefaultVersionParams,
  };

  export {
    Versions as Versions,
    type VersionCreateResponse as VersionCreateResponse,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionCreateParams as VersionCreateParams,
  };
}
