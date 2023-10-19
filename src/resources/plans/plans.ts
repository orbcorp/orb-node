// File generated from our OpenAPI spec by Stainless.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import { isRequestOptions } from 'orb-billing/core';
import * as PlansAPI from 'orb-billing/resources/plans/plans';
import * as InvoicesAPI from 'orb-billing/resources/invoices';
import * as ExternalPlanIDAPI from 'orb-billing/resources/plans/external-plan-id';
import * as PricesAPI from 'orb-billing/resources/prices/prices';
import { Page, type PageParams } from 'orb-billing/pagination';

export class Plans extends APIResource {
  externalPlanId: ExternalPlanIDAPI.ExternalPlanID = new ExternalPlanIDAPI.ExternalPlanID(this.client);

  /**
   * This endpoint allows creation of plans including their prices.
   */
  create(body: PlanCreateParams, options?: Core.RequestOptions): Core.APIPromise<Plan> {
    return this.post('/plans', { body, ...options });
  }

  /**
   * This endpoint can be used to update the `external_plan_id`, and `metadata` of an
   * existing plan.
   *
   * Other fields on a customer are currently immutable.
   */
  update(planId: string, body?: PlanUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Plan>;
  update(planId: string, options?: Core.RequestOptions): Core.APIPromise<Plan>;
  update(
    planId: string,
    body: PlanUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Plan> {
    if (isRequestOptions(body)) {
      return this.update(planId, {}, body);
    }
    return this.put(`/plans/${planId}`, { body, ...options });
  }

  /**
   * This endpoint returns a list of all [plans](../guides/concepts##plan-and-price)
   * for an account in a list format. The list of plans is ordered starting from the
   * most recently created plan. The response also includes
   * [`pagination_metadata`](../reference/pagination), which lets the caller retrieve
   * the next page of results if they exist.
   */
  list(query?: PlanListParams, options?: Core.RequestOptions): Core.PagePromise<PlansPage, Plan>;
  list(options?: Core.RequestOptions): Core.PagePromise<PlansPage, Plan>;
  list(
    query: PlanListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<PlansPage, Plan> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/plans', PlansPage, { query, ...options });
  }

  /**
   * This endpoint is used to fetch [plan](../guides/concepts##plan-and-price)
   * details given a plan identifier. It returns information about the prices
   * included in the plan and their configuration, as well as the product that the
   * plan is attached to.
   *
   * ## Serialized prices
   *
   * Orb supports a few different pricing models out of the box. Each of these models
   * is serialized differently in a given [Price](../guides/concepts#plan-and-price)
   * object. The `model_type` field determines the key for the configuration object
   * that is present. A detailed explanation of price types can be found in the
   * [Price schema](../guides/concepts#plan-and-price).
   *
   * ## Phases
   *
   * Orb supports plan phases, also known as contract ramps. For plans with phases,
   * the serialized prices refer to all prices across all phases.
   */
  fetch(planId: string, options?: Core.RequestOptions): Core.APIPromise<Plan> {
    return this.get(`/plans/${planId}`, options);
  }
}

export class PlansPage extends Page<Plan> {}

/**
 * The [Plan](../guides/core-concepts.mdx#plan-and-price) resource represents a
 * plan that can be subscribed to by a customer. Plans define the billing behavior
 * of the subscription. You can see more about how to configure prices in the
 * [Price resource](/reference/price).
 */
export interface Plan {
  id: string;

  base_plan: Plan.BasePlan | null;

  /**
   * The parent plan id if the given plan was created by overriding one or more of
   * the parent's prices
   */
  base_plan_id: string | null;

  created_at: string;

  /**
   * An ISO 4217 currency string or custom pricing unit (`credits`) for this plan's
   * prices.
   */
  currency: string;

  /**
   * The default memo text on the invoices corresponding to subscriptions on this
   * plan. Note that each subscription may configure its own memo.
   */
  default_invoice_memo: string | null;

  description: string;

  discount: InvoicesAPI.InvoiceDiscount | null;

  /**
   * An optional user-defined ID for this plan resource, used throughout the system
   * as an alias for this Plan. Use this field to identify a plan by an existing
   * identifier in your system.
   */
  external_plan_id: string | null;

  /**
   * An ISO 4217 currency string for which this plan is billed in. Matches `currency`
   * unless `currency` is a custom pricing unit.
   */
  invoicing_currency: string;

  maximum: Plan.Maximum | null;

  maximum_amount: string | null;

  metadata: unknown;

  minimum: Plan.Minimum | null;

  minimum_amount: string | null;

  name: string;

  /**
   * Determines the difference between the invoice issue date and the due date. A
   * value of "0" here signifies that invoices are due on issue, whereas a value of
   * "30" means that the customer has a month to pay the invoice before its overdue.
   * Note that individual subscriptions or invoices may set a different net terms
   * configuration.
   */
  net_terms: number | null;

  plan_phases: Array<Plan.PlanPhase> | null;

  /**
   * Prices for this plan. If the plan has phases, this includes prices across all
   * phases of the plan.
   */
  prices: Array<PricesAPI.Price>;

  product: Plan.Product;

  status: 'active' | 'archived' | 'draft';

  trial_config: Plan.TrialConfig;
}

export namespace Plan {
  export interface BasePlan {
    id: string | null;

    /**
     * An optional user-defined ID for this plan resource, used throughout the system
     * as an alias for this Plan. Use this field to identify a plan by an existing
     * identifier in your system.
     */
    external_plan_id: string | null;

    name: string | null;
  }

  export interface Maximum {
    /**
     * List of price_ids that this maximum amount applies to. For plan/plan phase
     * maximums, this can be a subset of prices.
     */
    applies_to_price_ids: Array<string>;

    /**
     * Maximum amount applied
     */
    maximum_amount: string;
  }

  export interface Minimum {
    /**
     * List of price_ids that this minimum amount applies to. For plan/plan phase
     * minimums, this can be a subset of prices.
     */
    applies_to_price_ids: Array<string>;

    /**
     * Minimum amount applied
     */
    minimum_amount: string;
  }

  export interface PlanPhase {
    id: string;

    description: string | null;

    discount: InvoicesAPI.InvoiceDiscount | null;

    /**
     * How many terms of length `duration_unit` this phase is active for. If null, this
     * phase is evergreen and active indefinitely
     */
    duration: number | null;

    duration_unit: 'daily' | 'monthly' | 'quarterly' | 'annual' | null;

    maximum: PlanPhase.Maximum | null;

    maximum_amount: string | null;

    minimum: PlanPhase.Minimum | null;

    minimum_amount: string | null;

    name: string;

    /**
     * Determines the ordering of the phase in a plan's lifecycle. 1 = first phase.
     */
    order: number;
  }

  export namespace PlanPhase {
    export interface Maximum {
      /**
       * List of price_ids that this maximum amount applies to. For plan/plan phase
       * maximums, this can be a subset of prices.
       */
      applies_to_price_ids: Array<string>;

      /**
       * Maximum amount applied
       */
      maximum_amount: string;
    }

    export interface Minimum {
      /**
       * List of price_ids that this minimum amount applies to. For plan/plan phase
       * minimums, this can be a subset of prices.
       */
      applies_to_price_ids: Array<string>;

      /**
       * Minimum amount applied
       */
      minimum_amount: string;
    }
  }

  export interface Product {
    id: string;

    created_at: string;

    name: string;
  }

  export interface TrialConfig {
    trial_period: number | null;

    trial_period_unit: 'days';
  }
}

export interface PlanCreateParams {
  /**
   * An ISO 4217 currency string or custom pricing unit (`credits`) for this plan's
   * prices.
   */
  currency: string;

  name: string;

  /**
   * Prices for this plan. If the plan has phases, this includes prices across all
   * phases of the plan.
   */
  prices: Array<unknown>;

  /**
   * Free-form text which is available on the invoice PDF and the Orb invoice portal.
   */
  default_invoice_memo?: string | null;

  external_plan_id?: string | null;

  metadata?: unknown | null;

  /**
   * The net terms determines the difference between the invoice date and the issue
   * date for the invoice. If you intend the invoice to be due on issue, set this
   * to 0.
   */
  net_terms?: number | null;
}

export interface PlanUpdateParams {
  /**
   * An optional user-defined ID for this plan resource, used throughout the system
   * as an alias for this Plan. Use this field to identify a plan by an existing
   * identifier in your system.
   */
  external_plan_id?: string | null;

  metadata?: unknown | null;
}

export interface PlanListParams extends PageParams {
  'created_at[gt]'?: string | null;

  'created_at[gte]'?: string | null;

  'created_at[lt]'?: string | null;

  'created_at[lte]'?: string | null;

  /**
   * The plan status to filter to ('active', 'archived', or 'draft').
   */
  status?: 'active' | 'archived' | 'draft';
}

export namespace Plans {
  export import Plan = PlansAPI.Plan;
  export import PlansPage = PlansAPI.PlansPage;
  export import PlanCreateParams = PlansAPI.PlanCreateParams;
  export import PlanUpdateParams = PlansAPI.PlanUpdateParams;
  export import PlanListParams = PlansAPI.PlanListParams;
  export import ExternalPlanID = ExternalPlanIDAPI.ExternalPlanID;
  export import ExternalPlanIDUpdateParams = ExternalPlanIDAPI.ExternalPlanIDUpdateParams;
}
