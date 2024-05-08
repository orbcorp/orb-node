// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'orb-billing/core';
import { APIResource } from 'orb-billing/resource';
import * as AlertsAPI from 'orb-billing/resources/alerts';

export class Alerts extends APIResource {
  /**
   * This endpoint can be used to enable an alert.
   */
  enable(alertConfigurationId: string, options?: Core.RequestOptions): Core.APIPromise<Alert> {
    return this._client.post(`/alerts/${alertConfigurationId}/enable`, options);
  }
}

/**
 * An
 * [Alert within Orb](https://docs.withorb.com/guides/product-catalog/configuring-alerts)
 * monitors a customer's spending, usage, or credit balance and triggers a webhook
 * when a threshold is exceeded.
 *
 * Alerts can be configured to monitor usage, cost, or credit balance. Alerts can
 * be scoped to either a customer, a plan, or a subscription.
 *
 * Customer scoped alerts track a customer's credit balance. Valid customer alert
 * types are "credit_balance_depleted", "credit_balance_recovered", and
 * "credit_balance_dropped".
 *
 * Subscription scoped alerts track a subscriptions's usage or cost. Valid plan
 * alert types are "usage_exceeded" or "cost_exceeded".
 *
 * Plan scoped alerts are similar to subscriptions alerts but when a plan alert is
 * created, it is propagated to all subscriptions associated with the plan.
 * Disabling a plan alert will disable the alert for all subscriptions. Valid plan
 * alert types are "usage_exceeded" or "cost_exceeded".
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
   * The name of the currency the credit balance for this alert is denominated in.
   */
  currency: string | null;

  /**
   * The customer that the alert is scoped to.
   */
  customer: Record<string, string | null> | null;

  /**
   * Whether the alert is enabled or disabled.
   */
  enabled: boolean;

  metric: Record<string, string | null> | null;

  /**
   * The plan that the alert is scoped to.
   */
  plan: Record<string, string | null> | null;

  subscription: Record<string, string | null> | null;

  /**
   * The thresholds that define the conditions under which the alert will be
   * triggered.
   */
  thresholds: Array<Alert.Threshold> | null;

  /**
   * The type of alert. This must be a valid alert type.
   */
  type: 'credit_balance_depleted' | 'credit_balance_dropped' | 'credit_balance_recovered';
}

export namespace Alert {
  /**
   * Thresholds are used to define the conditions under which an alert will be
   * triggered.
   */
  export interface Threshold {
    /**
     * The value at which an alert will fire. For credit balance alerts, the alert will fire at or below this value. For usage and
     *         cost alerts, the alert will fire at or above this value.
     */
    value: number;
  }
}

export namespace Alerts {
  export import Alert = AlertsAPI.Alert;
}
