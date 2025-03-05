// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { Page, type PageParams } from '../pagination';

export class Alerts extends APIResource {
  /**
   * This endpoint retrieves an alert by its ID.
   */
  retrieve(alertId: string, options?: Core.RequestOptions): Core.APIPromise<Alert> {
    return this._client.get(`/alerts/${alertId}`, options);
  }

  /**
   * This endpoint updates the thresholds of an alert.
   */
  update(
    alertConfigurationId: string,
    body: AlertUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Alert> {
    return this._client.put(`/alerts/${alertConfigurationId}`, { body, ...options });
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
   * [standardized pagination format](/api-reference/pagination).
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
   * alert per [credit balance currency](/product-catalog/prepurchase).
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
   * alert per [credit balance currency](/product-catalog/prepurchase).
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
   * This endpoint allows you to disable an alert. To disable a plan-level alert for
   * a specific subscription, you must include the `subscription_id`. The
   * `subscription_id` is not required for customer or subscription level alerts.
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
   * This endpoint allows you to enable an alert. To enable a plan-level alert for a
   * specific subscription, you must include the `subscription_id`. The
   * `subscription_id` is not required for customer or subscription level alerts.
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
 * [Alerts within Orb](/product-catalog/configuring-alerts) monitor spending,
 * usage, or credit balance and trigger webhooks when a threshold is exceeded.
 *
 * Alerts created through the API can be scoped to either customers or
 * subscriptions.
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
  customer: Alert.Customer | null;

  /**
   * Whether the alert is enabled or disabled.
   */
  enabled: boolean;

  /**
   * The metric the alert applies to.
   */
  metric: Alert.Metric | null;

  /**
   * The plan the alert applies to.
   */
  plan: Alert.Plan | null;

  /**
   * The subscription the alert applies to.
   */
  subscription: Alert.Subscription | null;

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
   * The customer the alert applies to.
   */
  export interface Customer {
    id: string;

    external_customer_id: string | null;
  }

  /**
   * The metric the alert applies to.
   */
  export interface Metric {
    id: string;
  }

  /**
   * The plan the alert applies to.
   */
  export interface Plan {
    id: string | null;

    /**
     * An optional user-defined ID for this plan resource, used throughout the system
     * as an alias for this Plan. Use this field to identify a plan by an existing
     * identifier in your system.
     */
    external_plan_id: string | null;

    name: string | null;

    plan_version: string;
  }

  /**
   * The subscription the alert applies to.
   */
  export interface Subscription {
    id: string;
  }

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

export interface AlertUpdateParams {
  /**
   * The thresholds that define the values at which the alert will be triggered.
   */
  thresholds: Array<AlertUpdateParams.Threshold>;
}

export namespace AlertUpdateParams {
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
   * The type of alert to create. This must be a valid alert type.
   */
  type:
    | 'usage_exceeded'
    | 'cost_exceeded'
    | 'credit_balance_depleted'
    | 'credit_balance_dropped'
    | 'credit_balance_recovered';

  /**
   * The thresholds that define the values at which the alert will be triggered.
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
   * The type of alert to create. This must be a valid alert type.
   */
  type:
    | 'usage_exceeded'
    | 'cost_exceeded'
    | 'credit_balance_depleted'
    | 'credit_balance_dropped'
    | 'credit_balance_recovered';

  /**
   * The thresholds that define the values at which the alert will be triggered.
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

export interface AlertCreateForSubscriptionParams {
  /**
   * The thresholds that define the values at which the alert will be triggered.
   */
  thresholds: Array<AlertCreateForSubscriptionParams.Threshold>;

  /**
   * The type of alert to create. This must be a valid alert type.
   */
  type:
    | 'usage_exceeded'
    | 'cost_exceeded'
    | 'credit_balance_depleted'
    | 'credit_balance_dropped'
    | 'credit_balance_recovered';

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

Alerts.AlertsPage = AlertsPage;

export declare namespace Alerts {
  export {
    type Alert as Alert,
    AlertsPage as AlertsPage,
    type AlertUpdateParams as AlertUpdateParams,
    type AlertListParams as AlertListParams,
    type AlertCreateForCustomerParams as AlertCreateForCustomerParams,
    type AlertCreateForExternalCustomerParams as AlertCreateForExternalCustomerParams,
    type AlertCreateForSubscriptionParams as AlertCreateForSubscriptionParams,
    type AlertDisableParams as AlertDisableParams,
    type AlertEnableParams as AlertEnableParams,
  };
}
