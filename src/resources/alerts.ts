// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import { isRequestOptions } from 'orb-billing/core';
import * as AlertsAPI from 'orb-billing/resources/alerts';
import { Page, type PageParams } from 'orb-billing/pagination';

export class Alerts extends APIResource {
  /**
   * This endpoint retrieves an alert by its ID.
   */
  retrieve(alertId: string, options?: Core.RequestOptions): Core.APIPromise<Alert> {
    return this._client.get(`/alerts/${alertId}`, options);
  }

  /**
   * This endpoint returns a list of alerts within Orb.
   *
   * The request must specify one of `customer_id`, `external_customer_id`, or
   * `subscription_id`.
   *
   * If querying by subscripion_id, the endpoint will return the subscription level
   * alerts as well as the plan level alerts associated with the subscription.
   *
   * The list of alerts is ordered starting from the most recently created alert.
   * This endpoint follows Orb's
   * [standardized pagination format](../reference/pagination).
   */
  list(query?: AlertListParams, options?: Core.RequestOptions): Core.PagePromise<AlertsPage, Alert>;
  list(options?: Core.RequestOptions): Core.PagePromise<AlertsPage, Alert>;
  list(
    query: AlertListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<AlertsPage, Alert> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/alerts', AlertsPage, { query, ...options });
  }

  /**
   * This endpoint creates a new alert to monitor a customer's credit balance. There
   * are three types of alerts that can be scoped to customers:
   * `credit_balance_depleted`, `credit_balance_dropped`, and
   * `credit_balance_recovered`. Customers can have a maximum of one of each type of
   * alert per
   * [credit balance currency](https://docs.withorb.com/guides/product-catalog/prepurchase).
   * `credit_balance_dropped` alerts require a list of thresholds to be provided
   * while `credit_balance_depleted` and `credit_balance_recovered` alerts do not
   * require thresholds.
   */
  createForCustomer(
    customerId: string,
    body: AlertCreateForCustomerParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Alert> {
    return this._client.post(`/alerts/customer_id/${customerId}`, { body, ...options });
  }

  /**
   * This endpoint creates a new alert to monitor a customer's credit balance. There
   * are three types of alerts that can be scoped to customers:
   * `credit_balance_depleted`, `credit_balance_dropped`, and
   * `credit_balance_recovered`. Customers can have a maximum of one of each type of
   * alert per
   * [credit balance currency](https://docs.withorb.com/guides/product-catalog/prepurchase).
   * `credit_balance_dropped` alerts require a list of thresholds to be provided
   * while `credit_balance_depleted` and `credit_balance_recovered` alerts do not
   * require thresholds.
   */
  createForExternalCustomer(
    externalCustomerId: string,
    body: AlertCreateForExternalCustomerParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Alert> {
    return this._client.post(`/alerts/external_customer_id/${externalCustomerId}`, { body, ...options });
  }

  /**
   * This endpoint is used to create alerts at the plan level. Plan level alerts are
   * automatically propagated to all subscriptions associated with the plan. These
   * alerts are scoped to a specific plan version; if no version is specified, the
   * active plan version is used.
   *
   * Plan level alerts can be of two types: `usage_exceeded` or `cost_exceeded`. A
   * `usage_exceeded` alert is scoped to a particular metric and is triggered when
   * the usage of that metric exceeds predefined thresholds during the current
   * billing cycle. A `cost_exceeded` alert is triggered when the total amount due
   * during the current billing cycle surpasses predefined thresholds.
   * `cost_exceeded` alerts do not include burndown of pre-purchase credits. Each
   * plan can have one `cost_exceeded` alert and one `usage_exceeded` alert per
   * metric that is a part of the plan.
   */
  createForPlan(
    planId: string,
    body: AlertCreateForPlanParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Alert> {
    return this._client.post(`/alerts/plan_id/${planId}`, { body, ...options });
  }

  /**
   * This endpoint is used to create alerts at the subscription level.
   *
   * Subscription level alerts can be one of two types: `usage_exceeded` or
   * `cost_exceeded`. A `usage_exceeded` alert is scoped to a particular metric and
   * is triggered when the usage of that metric exceeds predefined thresholds during
   * the current billing cycle. A `cost_exceeded` alert is triggered when the total
   * amount due during the current billing cycle surpasses predefined thresholds.
   * `cost_exceeded` alerts do not include burndown of pre-purchase credits. Each
   * subscription can have one `cost_exceeded` alert and one `usage_exceeded` alert
   * per metric that is a part of the subscription. Alerts are triggered based on
   * usage or cost conditions met during the current billing cycle.
   */
  createForSubscription(
    subscriptionId: string,
    body: AlertCreateForSubscriptionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Alert> {
    return this._client.post(`/alerts/subscription_id/${subscriptionId}`, { body, ...options });
  }

  /**
   * This endpoint can be used to disable an alert.
   */
  disable(
    alertConfigurationId: string,
    params?: AlertDisableParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Alert>;
  disable(alertConfigurationId: string, options?: Core.RequestOptions): Core.APIPromise<Alert>;
  disable(
    alertConfigurationId: string,
    params: AlertDisableParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Alert> {
    if (isRequestOptions(params)) {
      return this.disable(alertConfigurationId, {}, params);
    }
    const { subscription_id } = params;
    return this._client.post(`/alerts/${alertConfigurationId}/disable`, {
      query: { subscription_id },
      ...options,
    });
  }

  /**
   * This endpoint can be used to enable an alert.
   */
  enable(
    alertConfigurationId: string,
    params?: AlertEnableParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Alert>;
  enable(alertConfigurationId: string, options?: Core.RequestOptions): Core.APIPromise<Alert>;
  enable(
    alertConfigurationId: string,
    params: AlertEnableParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Alert> {
    if (isRequestOptions(params)) {
      return this.enable(alertConfigurationId, {}, params);
    }
    const { subscription_id } = params;
    return this._client.post(`/alerts/${alertConfigurationId}/enable`, {
      query: { subscription_id },
      ...options,
    });
  }
}

export class AlertsPage extends Page<Alert> {}

/**
 * [Alerts within Orb](https://docs.withorb.com/guides/product-catalog/configuring-alerts)
 * monitor spending, usage, or credit balance and trigger webhooks when a threshold
 * is exceeded.
 *
 * Alerts created through the API can be scoped to either customers or
 * subscriptions.
 *
 * | Scope        | Monitors                       | Vaild Alert Types                                                                   |
 * | ------------ | ------------------------------ | ----------------------------------------------------------------------------------- |
 * | Customer     | A customer's credit balance    | `credit_balance_depleted`, `credit_balance_recovered`, and `credit_balance_dropped` |
 * | Subscription | A subscription's usage or cost | `usage_exceeded` and `cost_exceeded`                                                |
 */
export interface Alert {
  /**
   * Also referred to as alert_id in this documentation.
   */
  id: string;

  /**
   * The creation time of the resource in Orb.
   */
  created_at: string;

  /**
   * The name of the currency the credit balance or invoice cost is denominated in.
   */
  currency: string | null;

  /**
   * The customer the alert applies to.
   */
  customer: Record<string, string | null> | null;

  /**
   * Whether the alert is enabled or disabled.
   */
  enabled: boolean;

  /**
   * The metric the alert applies to.
   */
  metric: Record<string, string | null> | null;

  /**
   * The plan the alert applies to.
   */
  plan: Record<string, string | null> | null;

  /**
   * The subscription the alert applies to.
   */
  subscription: Record<string, string | null> | null;

  /**
   * The thresholds that define the conditions under which the alert will be
   * triggered.
   */
  thresholds: Array<Alert.Threshold> | null;

  /**
   * The type of alert. This must be a valid alert type.
   */
  type:
    | 'usage_exceeded'
    | 'cost_exceeded'
    | 'credit_balance_depleted'
    | 'credit_balance_dropped'
    | 'credit_balance_recovered';
}

export namespace Alert {
  /**
   * Thresholds are used to define the conditions under which an alert will be
   * triggered.
   */
  export interface Threshold {
    /**
     * The value at which an alert will fire. For credit balance alerts, the alert will
     * fire at or below this value. For usage and cost alerts, the alert will fire at
     * or above this value.
     */
    value: number;
  }
}

export interface AlertListParams extends PageParams {
  'created_at[gt]'?: string | null;

  'created_at[gte]'?: string | null;

  'created_at[lt]'?: string | null;

  'created_at[lte]'?: string | null;

  /**
   * Fetch alerts scoped to this customer_id
   */
  customer_id?: string | null;

  /**
   * Fetch alerts scoped to this external_customer_id
   */
  external_customer_id?: string | null;

  /**
   * Fetch alerts scoped to this plan_id
   */
  plan_id?: string | null;

  /**
   * If provided alongside plan_id, only the alerts that are scoped to the specified plan_version will be returned.
   */
  plan_version?: number | null;

  /**
   * Fetch alerts scoped to this subscription_id
   */
  subscription_id?: string | null;
}

export interface AlertCreateForCustomerParams {
  /**
   * The case sensitive currency or custom pricing unit to use for this alert.
   */
  currency: string;

  /**
   * The thresholds that define the values at which the alert will be triggered.
   */
  type: string;

  /**
   * The thresholds for the alert.
   */
  thresholds?: Array<AlertCreateForCustomerParams.Threshold> | null;
}

export namespace AlertCreateForCustomerParams {
  /**
   * Thresholds are used to define the conditions under which an alert will be
   * triggered.
   */
  export interface Threshold {
    /**
     * The value at which an alert will fire. For credit balance alerts, the alert will
     * fire at or below this value. For usage and cost alerts, the alert will fire at
     * or above this value.
     */
    value: number;
  }
}

export interface AlertCreateForExternalCustomerParams {
  /**
   * The case sensitive currency or custom pricing unit to use for this alert.
   */
  currency: string;

  /**
   * The thresholds that define the values at which the alert will be triggered.
   */
  type: string;

  /**
   * The thresholds for the alert.
   */
  thresholds?: Array<AlertCreateForExternalCustomerParams.Threshold> | null;
}

export namespace AlertCreateForExternalCustomerParams {
  /**
   * Thresholds are used to define the conditions under which an alert will be
   * triggered.
   */
  export interface Threshold {
    /**
     * The value at which an alert will fire. For credit balance alerts, the alert will
     * fire at or below this value. For usage and cost alerts, the alert will fire at
     * or above this value.
     */
    value: number;
  }
}

export interface AlertCreateForPlanParams {
  /**
   * The thresholds for the alert.
   */
  thresholds: Array<AlertCreateForPlanParams.Threshold>;

  /**
   * The thresholds that define the values at which the alert will be triggered.
   */
  type: string;

  /**
   * The metric to track usage for.
   */
  metric_id?: string | null;

  /**
   * The plan version to create alerts for. If not specified, the default will be the
   * plan's active plan version.
   */
  plan_version?: number | null;
}

export namespace AlertCreateForPlanParams {
  /**
   * Thresholds are used to define the conditions under which an alert will be
   * triggered.
   */
  export interface Threshold {
    /**
     * The value at which an alert will fire. For credit balance alerts, the alert will
     * fire at or below this value. For usage and cost alerts, the alert will fire at
     * or above this value.
     */
    value: number;
  }
}

export interface AlertCreateForSubscriptionParams {
  /**
   * The thresholds for the alert.
   */
  thresholds: Array<AlertCreateForSubscriptionParams.Threshold>;

  /**
   * The thresholds that define the values at which the alert will be triggered.
   */
  type: string;

  /**
   * The metric to track usage for.
   */
  metric_id?: string | null;
}

export namespace AlertCreateForSubscriptionParams {
  /**
   * Thresholds are used to define the conditions under which an alert will be
   * triggered.
   */
  export interface Threshold {
    /**
     * The value at which an alert will fire. For credit balance alerts, the alert will
     * fire at or below this value. For usage and cost alerts, the alert will fire at
     * or above this value.
     */
    value: number;
  }
}

export interface AlertDisableParams {
  /**
   * Used to update the status of a plan alert scoped to this subscription_id
   */
  subscription_id?: string | null;
}

export interface AlertEnableParams {
  /**
   * Used to update the status of a plan alert scoped to this subscription_id
   */
  subscription_id?: string | null;
}

export namespace Alerts {
  export import Alert = AlertsAPI.Alert;
  export import AlertsPage = AlertsAPI.AlertsPage;
  export import AlertListParams = AlertsAPI.AlertListParams;
  export import AlertCreateForCustomerParams = AlertsAPI.AlertCreateForCustomerParams;
  export import AlertCreateForExternalCustomerParams = AlertsAPI.AlertCreateForExternalCustomerParams;
  export import AlertCreateForPlanParams = AlertsAPI.AlertCreateForPlanParams;
  export import AlertCreateForSubscriptionParams = AlertsAPI.AlertCreateForSubscriptionParams;
  export import AlertDisableParams = AlertsAPI.AlertDisableParams;
  export import AlertEnableParams = AlertsAPI.AlertEnableParams;
}
