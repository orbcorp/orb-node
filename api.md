# Shared

Types:

- <code><a href="./src/resources/shared.ts">AmountDiscount</a></code>
- <code><a href="./src/resources/shared.ts">BillingCycleRelativeDate</a></code>
- <code><a href="./src/resources/shared.ts">Discount</a></code>
- <code><a href="./src/resources/shared.ts">InvoiceLevelDiscount</a></code>
- <code><a href="./src/resources/shared.ts">PaginationMetadata</a></code>
- <code><a href="./src/resources/shared.ts">PercentageDiscount</a></code>
- <code><a href="./src/resources/shared.ts">TrialDiscount</a></code>
- <code><a href="./src/resources/shared.ts">UsageDiscount</a></code>

# TopLevel

Types:

- <code><a href="./src/resources/top-level.ts">TopLevelPingResponse</a></code>

Methods:

- <code title="get /ping">client.topLevel.<a href="./src/resources/top-level.ts">ping</a>() -> TopLevelPingResponse</code>

# Coupons

Types:

- <code><a href="./src/resources/coupons/coupons.ts">Coupon</a></code>

Methods:

- <code title="post /coupons">client.coupons.<a href="./src/resources/coupons/coupons.ts">create</a>({ ...params }) -> Coupon</code>
- <code title="get /coupons">client.coupons.<a href="./src/resources/coupons/coupons.ts">list</a>({ ...params }) -> CouponsPage</code>
- <code title="post /coupons/{coupon_id}/archive">client.coupons.<a href="./src/resources/coupons/coupons.ts">archive</a>(couponId) -> Coupon</code>
- <code title="get /coupons/{coupon_id}">client.coupons.<a href="./src/resources/coupons/coupons.ts">fetch</a>(couponId) -> Coupon</code>

## Subscriptions

Methods:

- <code title="get /coupons/{coupon_id}/subscriptions">client.coupons.subscriptions.<a href="./src/resources/coupons/subscriptions.ts">list</a>(couponId, { ...params }) -> SubscriptionsPage</code>

# CreditNotes

Types:

- <code><a href="./src/resources/credit-notes.ts">CreditNote</a></code>

Methods:

- <code title="post /credit_notes">client.creditNotes.<a href="./src/resources/credit-notes.ts">create</a>({ ...params }) -> CreditNote</code>
- <code title="get /credit_notes">client.creditNotes.<a href="./src/resources/credit-notes.ts">list</a>({ ...params }) -> CreditNotesPage</code>
- <code title="get /credit_notes/{credit_note_id}">client.creditNotes.<a href="./src/resources/credit-notes.ts">fetch</a>(creditNoteId) -> CreditNote</code>

# Customers

Types:

- <code><a href="./src/resources/customers/customers.ts">Customer</a></code>

Methods:

- <code title="post /customers">client.customers.<a href="./src/resources/customers/customers.ts">create</a>({ ...params }) -> Customer</code>
- <code title="put /customers/{customer_id}">client.customers.<a href="./src/resources/customers/customers.ts">update</a>(customerId, { ...params }) -> Customer</code>
- <code title="get /customers">client.customers.<a href="./src/resources/customers/customers.ts">list</a>({ ...params }) -> CustomersPage</code>
- <code title="delete /customers/{customer_id}">client.customers.<a href="./src/resources/customers/customers.ts">delete</a>(customerId) -> void</code>
- <code title="get /customers/{customer_id}">client.customers.<a href="./src/resources/customers/customers.ts">fetch</a>(customerId) -> Customer</code>
- <code title="get /customers/external_customer_id/{external_customer_id}">client.customers.<a href="./src/resources/customers/customers.ts">fetchByExternalId</a>(externalCustomerId) -> Customer</code>
- <code title="post /customers/{customer_id}/sync_payment_methods_from_gateway">client.customers.<a href="./src/resources/customers/customers.ts">syncPaymentMethodsFromGateway</a>(customerId) -> void</code>
- <code title="post /customers/external_customer_id/{external_customer_id}/sync_payment_methods_from_gateway">client.customers.<a href="./src/resources/customers/customers.ts">syncPaymentMethodsFromGatewayByExternalCustomerId</a>(externalCustomerId) -> void</code>
- <code title="put /customers/external_customer_id/{external_customer_id}">client.customers.<a href="./src/resources/customers/customers.ts">updateByExternalId</a>(id, { ...params }) -> Customer</code>

## Costs

Types:

- <code><a href="./src/resources/customers/costs.ts">CostListResponse</a></code>
- <code><a href="./src/resources/customers/costs.ts">CostListByExternalIDResponse</a></code>

Methods:

- <code title="get /customers/{customer_id}/costs">client.customers.costs.<a href="./src/resources/customers/costs.ts">list</a>(customerId, { ...params }) -> CostListResponse</code>
- <code title="get /customers/external_customer_id/{external_customer_id}/costs">client.customers.costs.<a href="./src/resources/customers/costs.ts">listByExternalId</a>(externalCustomerId, { ...params }) -> CostListByExternalIDResponse</code>

## Credits

Types:

- <code><a href="./src/resources/customers/credits/credits.ts">CreditListResponse</a></code>
- <code><a href="./src/resources/customers/credits/credits.ts">CreditListByExternalIDResponse</a></code>

Methods:

- <code title="get /customers/{customer_id}/credits">client.customers.credits.<a href="./src/resources/customers/credits/credits.ts">list</a>(customerId, { ...params }) -> CreditListResponsesPage</code>
- <code title="get /customers/external_customer_id/{external_customer_id}/credits">client.customers.credits.<a href="./src/resources/customers/credits/credits.ts">listByExternalId</a>(externalCustomerId, { ...params }) -> CreditListByExternalIDResponsesPage</code>

### Ledger

Types:

- <code><a href="./src/resources/customers/credits/ledger.ts">LedgerListResponse</a></code>
- <code><a href="./src/resources/customers/credits/ledger.ts">LedgerCreateEntryResponse</a></code>
- <code><a href="./src/resources/customers/credits/ledger.ts">LedgerCreateEntryByExternalIDResponse</a></code>
- <code><a href="./src/resources/customers/credits/ledger.ts">LedgerListByExternalIDResponse</a></code>

Methods:

- <code title="get /customers/{customer_id}/credits/ledger">client.customers.credits.ledger.<a href="./src/resources/customers/credits/ledger.ts">list</a>(customerId, { ...params }) -> LedgerListResponsesPage</code>
- <code title="post /customers/{customer_id}/credits/ledger_entry">client.customers.credits.ledger.<a href="./src/resources/customers/credits/ledger.ts">createEntry</a>(customerId, { ...params }) -> LedgerCreateEntryResponse</code>
- <code title="post /customers/external_customer_id/{external_customer_id}/credits/ledger_entry">client.customers.credits.ledger.<a href="./src/resources/customers/credits/ledger.ts">createEntryByExternalId</a>(externalCustomerId, { ...params }) -> LedgerCreateEntryByExternalIDResponse</code>
- <code title="get /customers/external_customer_id/{external_customer_id}/credits/ledger">client.customers.credits.ledger.<a href="./src/resources/customers/credits/ledger.ts">listByExternalId</a>(externalCustomerId, { ...params }) -> LedgerListByExternalIDResponsesPage</code>

### TopUps

Types:

- <code><a href="./src/resources/customers/credits/top-ups.ts">TopUpCreateResponse</a></code>
- <code><a href="./src/resources/customers/credits/top-ups.ts">TopUpListResponse</a></code>
- <code><a href="./src/resources/customers/credits/top-ups.ts">TopUpCreateByExternalIDResponse</a></code>
- <code><a href="./src/resources/customers/credits/top-ups.ts">TopUpListByExternalIDResponse</a></code>

Methods:

- <code title="post /customers/{customer_id}/credits/top_ups">client.customers.credits.topUps.<a href="./src/resources/customers/credits/top-ups.ts">create</a>(customerId, { ...params }) -> TopUpCreateResponse</code>
- <code title="get /customers/{customer_id}/credits/top_ups">client.customers.credits.topUps.<a href="./src/resources/customers/credits/top-ups.ts">list</a>(customerId, { ...params }) -> TopUpListResponsesPage</code>
- <code title="delete /customers/{customer_id}/credits/top_ups/{top_up_id}">client.customers.credits.topUps.<a href="./src/resources/customers/credits/top-ups.ts">delete</a>(customerId, topUpId) -> void</code>
- <code title="post /customers/external_customer_id/{external_customer_id}/credits/top_ups">client.customers.credits.topUps.<a href="./src/resources/customers/credits/top-ups.ts">createByExternalId</a>(externalCustomerId, { ...params }) -> TopUpCreateByExternalIDResponse</code>
- <code title="delete /customers/external_customer_id/{external_customer_id}/credits/top_ups/{top_up_id}">client.customers.credits.topUps.<a href="./src/resources/customers/credits/top-ups.ts">deleteByExternalId</a>(externalCustomerId, topUpId) -> void</code>
- <code title="get /customers/external_customer_id/{external_customer_id}/credits/top_ups">client.customers.credits.topUps.<a href="./src/resources/customers/credits/top-ups.ts">listByExternalId</a>(externalCustomerId, { ...params }) -> TopUpListByExternalIDResponsesPage</code>

## BalanceTransactions

Types:

- <code><a href="./src/resources/customers/balance-transactions.ts">BalanceTransactionCreateResponse</a></code>
- <code><a href="./src/resources/customers/balance-transactions.ts">BalanceTransactionListResponse</a></code>

Methods:

- <code title="post /customers/{customer_id}/balance_transactions">client.customers.balanceTransactions.<a href="./src/resources/customers/balance-transactions.ts">create</a>(customerId, { ...params }) -> BalanceTransactionCreateResponse</code>
- <code title="get /customers/{customer_id}/balance_transactions">client.customers.balanceTransactions.<a href="./src/resources/customers/balance-transactions.ts">list</a>(customerId, { ...params }) -> BalanceTransactionListResponsesPage</code>

# Events

Types:

- <code><a href="./src/resources/events/events.ts">EventUpdateResponse</a></code>
- <code><a href="./src/resources/events/events.ts">EventDeprecateResponse</a></code>
- <code><a href="./src/resources/events/events.ts">EventIngestResponse</a></code>
- <code><a href="./src/resources/events/events.ts">EventSearchResponse</a></code>

Methods:

- <code title="put /events/{event_id}">client.events.<a href="./src/resources/events/events.ts">update</a>(eventId, { ...params }) -> EventUpdateResponse</code>
- <code title="put /events/{event_id}/deprecate">client.events.<a href="./src/resources/events/events.ts">deprecate</a>(eventId) -> EventDeprecateResponse</code>
- <code title="post /ingest">client.events.<a href="./src/resources/events/events.ts">ingest</a>({ ...params }) -> EventIngestResponse</code>
- <code title="post /events/search">client.events.<a href="./src/resources/events/events.ts">search</a>({ ...params }) -> EventSearchResponse</code>

## Backfills

Types:

- <code><a href="./src/resources/events/backfills.ts">BackfillCreateResponse</a></code>
- <code><a href="./src/resources/events/backfills.ts">BackfillListResponse</a></code>
- <code><a href="./src/resources/events/backfills.ts">BackfillCloseResponse</a></code>
- <code><a href="./src/resources/events/backfills.ts">BackfillFetchResponse</a></code>
- <code><a href="./src/resources/events/backfills.ts">BackfillRevertResponse</a></code>

Methods:

- <code title="post /events/backfills">client.events.backfills.<a href="./src/resources/events/backfills.ts">create</a>({ ...params }) -> BackfillCreateResponse</code>
- <code title="get /events/backfills">client.events.backfills.<a href="./src/resources/events/backfills.ts">list</a>({ ...params }) -> BackfillListResponsesPage</code>
- <code title="post /events/backfills/{backfill_id}/close">client.events.backfills.<a href="./src/resources/events/backfills.ts">close</a>(backfillId) -> BackfillCloseResponse</code>
- <code title="get /events/backfills/{backfill_id}">client.events.backfills.<a href="./src/resources/events/backfills.ts">fetch</a>(backfillId) -> BackfillFetchResponse</code>
- <code title="post /events/backfills/{backfill_id}/revert">client.events.backfills.<a href="./src/resources/events/backfills.ts">revert</a>(backfillId) -> BackfillRevertResponse</code>

## Volume

Types:

- <code><a href="./src/resources/events/volume.ts">EventVolumes</a></code>

Methods:

- <code title="get /events/volume">client.events.volume.<a href="./src/resources/events/volume.ts">list</a>({ ...params }) -> EventVolumes</code>

# InvoiceLineItems

Types:

- <code><a href="./src/resources/invoice-line-items.ts">InvoiceLineItemCreateResponse</a></code>

Methods:

- <code title="post /invoice_line_items">client.invoiceLineItems.<a href="./src/resources/invoice-line-items.ts">create</a>({ ...params }) -> InvoiceLineItemCreateResponse</code>

# Invoices

Types:

- <code><a href="./src/resources/invoices.ts">Invoice</a></code>
- <code><a href="./src/resources/invoices.ts">InvoiceFetchUpcomingResponse</a></code>

Methods:

- <code title="post /invoices">client.invoices.<a href="./src/resources/invoices.ts">create</a>({ ...params }) -> Invoice</code>
- <code title="put /invoices/{invoice_id}">client.invoices.<a href="./src/resources/invoices.ts">update</a>(invoiceId, { ...params }) -> Invoice</code>
- <code title="get /invoices">client.invoices.<a href="./src/resources/invoices.ts">list</a>({ ...params }) -> InvoicesPage</code>
- <code title="get /invoices/{invoice_id}">client.invoices.<a href="./src/resources/invoices.ts">fetch</a>(invoiceId) -> Invoice</code>
- <code title="get /invoices/upcoming">client.invoices.<a href="./src/resources/invoices.ts">fetchUpcoming</a>({ ...params }) -> InvoiceFetchUpcomingResponse</code>
- <code title="post /invoices/{invoice_id}/issue">client.invoices.<a href="./src/resources/invoices.ts">issue</a>(invoiceId, { ...params }) -> Invoice</code>
- <code title="post /invoices/{invoice_id}/mark_paid">client.invoices.<a href="./src/resources/invoices.ts">markPaid</a>(invoiceId, { ...params }) -> Invoice</code>
- <code title="post /invoices/{invoice_id}/pay">client.invoices.<a href="./src/resources/invoices.ts">pay</a>(invoiceId) -> Invoice</code>
- <code title="post /invoices/{invoice_id}/void">client.invoices.<a href="./src/resources/invoices.ts">void</a>(invoiceId) -> Invoice</code>

# Items

Types:

- <code><a href="./src/resources/items.ts">Item</a></code>

Methods:

- <code title="post /items">client.items.<a href="./src/resources/items.ts">create</a>({ ...params }) -> Item</code>
- <code title="put /items/{item_id}">client.items.<a href="./src/resources/items.ts">update</a>(itemId, { ...params }) -> Item</code>
- <code title="get /items">client.items.<a href="./src/resources/items.ts">list</a>({ ...params }) -> ItemsPage</code>
- <code title="get /items/{item_id}">client.items.<a href="./src/resources/items.ts">fetch</a>(itemId) -> Item</code>

# Metrics

Types:

- <code><a href="./src/resources/metrics.ts">BillableMetric</a></code>

Methods:

- <code title="post /metrics">client.metrics.<a href="./src/resources/metrics.ts">create</a>({ ...params }) -> BillableMetric</code>
- <code title="put /metrics/{metric_id}">client.metrics.<a href="./src/resources/metrics.ts">update</a>(metricId, { ...params }) -> BillableMetric</code>
- <code title="get /metrics">client.metrics.<a href="./src/resources/metrics.ts">list</a>({ ...params }) -> BillableMetricsPage</code>
- <code title="get /metrics/{metric_id}">client.metrics.<a href="./src/resources/metrics.ts">fetch</a>(metricId) -> BillableMetric</code>

# Plans

Types:

- <code><a href="./src/resources/plans/plans.ts">Plan</a></code>

Methods:

- <code title="post /plans">client.plans.<a href="./src/resources/plans/plans.ts">create</a>({ ...params }) -> Plan</code>
- <code title="put /plans/{plan_id}">client.plans.<a href="./src/resources/plans/plans.ts">update</a>(planId, { ...params }) -> Plan</code>
- <code title="get /plans">client.plans.<a href="./src/resources/plans/plans.ts">list</a>({ ...params }) -> PlansPage</code>
- <code title="get /plans/{plan_id}">client.plans.<a href="./src/resources/plans/plans.ts">fetch</a>(planId) -> Plan</code>

## ExternalPlanID

Methods:

- <code title="put /plans/external_plan_id/{external_plan_id}">client.plans.externalPlanId.<a href="./src/resources/plans/external-plan-id.ts">update</a>(otherExternalPlanId, { ...params }) -> Plan</code>
- <code title="get /plans/external_plan_id/{external_plan_id}">client.plans.externalPlanId.<a href="./src/resources/plans/external-plan-id.ts">fetch</a>(externalPlanId) -> Plan</code>

# Prices

Types:

- <code><a href="./src/resources/prices/prices.ts">EvaluatePriceGroup</a></code>
- <code><a href="./src/resources/prices/prices.ts">Price</a></code>
- <code><a href="./src/resources/prices/prices.ts">PriceEvaluateResponse</a></code>

Methods:

- <code title="post /prices">client.prices.<a href="./src/resources/prices/prices.ts">create</a>({ ...params }) -> Price</code>
- <code title="put /prices/{price_id}">client.prices.<a href="./src/resources/prices/prices.ts">update</a>(priceId, { ...params }) -> Price</code>
- <code title="get /prices">client.prices.<a href="./src/resources/prices/prices.ts">list</a>({ ...params }) -> PricesPage</code>
- <code title="post /prices/{price_id}/evaluate">client.prices.<a href="./src/resources/prices/prices.ts">evaluate</a>(priceId, { ...params }) -> PriceEvaluateResponse</code>
- <code title="get /prices/{price_id}">client.prices.<a href="./src/resources/prices/prices.ts">fetch</a>(priceId) -> Price</code>

## ExternalPriceID

Methods:

- <code title="put /prices/external_price_id/{external_price_id}">client.prices.externalPriceId.<a href="./src/resources/prices/external-price-id.ts">update</a>(externalPriceId, { ...params }) -> Price</code>
- <code title="get /prices/external_price_id/{external_price_id}">client.prices.externalPriceId.<a href="./src/resources/prices/external-price-id.ts">fetch</a>(externalPriceId) -> Price</code>

# Subscriptions

Types:

- <code><a href="./src/resources/subscriptions.ts">Subscription</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionUsage</a></code>
- <code><a href="./src/resources/subscriptions.ts">Subscriptions</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionCreateResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionCancelResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionFetchCostsResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionFetchScheduleResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionPriceIntervalsResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionSchedulePlanChangeResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionTriggerPhaseResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionUnscheduleCancellationResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionUnschedulePendingPlanChangesResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionUpdateFixedFeeQuantityResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionUpdateTrialResponse</a></code>

Methods:

- <code title="post /subscriptions">client.subscriptions.<a href="./src/resources/subscriptions.ts">create</a>({ ...params }) -> SubscriptionCreateResponse</code>
- <code title="put /subscriptions/{subscription_id}">client.subscriptions.<a href="./src/resources/subscriptions.ts">update</a>(subscriptionId, { ...params }) -> Subscription</code>
- <code title="get /subscriptions">client.subscriptions.<a href="./src/resources/subscriptions.ts">list</a>({ ...params }) -> SubscriptionsPage</code>
- <code title="post /subscriptions/{subscription_id}/cancel">client.subscriptions.<a href="./src/resources/subscriptions.ts">cancel</a>(subscriptionId, { ...params }) -> SubscriptionCancelResponse</code>
- <code title="get /subscriptions/{subscription_id}">client.subscriptions.<a href="./src/resources/subscriptions.ts">fetch</a>(subscriptionId) -> Subscription</code>
- <code title="get /subscriptions/{subscription_id}/costs">client.subscriptions.<a href="./src/resources/subscriptions.ts">fetchCosts</a>(subscriptionId, { ...params }) -> SubscriptionFetchCostsResponse</code>
- <code title="get /subscriptions/{subscription_id}/schedule">client.subscriptions.<a href="./src/resources/subscriptions.ts">fetchSchedule</a>(subscriptionId, { ...params }) -> SubscriptionFetchScheduleResponsesPage</code>
- <code title="get /subscriptions/{subscription_id}/usage">client.subscriptions.<a href="./src/resources/subscriptions.ts">fetchUsage</a>(subscriptionId, { ...params }) -> SubscriptionUsage</code>
- <code title="post /subscriptions/{subscription_id}/price_intervals">client.subscriptions.<a href="./src/resources/subscriptions.ts">priceIntervals</a>(subscriptionId, { ...params }) -> SubscriptionPriceIntervalsResponse</code>
- <code title="post /subscriptions/{subscription_id}/schedule_plan_change">client.subscriptions.<a href="./src/resources/subscriptions.ts">schedulePlanChange</a>(subscriptionId, { ...params }) -> SubscriptionSchedulePlanChangeResponse</code>
- <code title="post /subscriptions/{subscription_id}/trigger_phase">client.subscriptions.<a href="./src/resources/subscriptions.ts">triggerPhase</a>(subscriptionId, { ...params }) -> SubscriptionTriggerPhaseResponse</code>
- <code title="post /subscriptions/{subscription_id}/unschedule_cancellation">client.subscriptions.<a href="./src/resources/subscriptions.ts">unscheduleCancellation</a>(subscriptionId) -> SubscriptionUnscheduleCancellationResponse</code>
- <code title="post /subscriptions/{subscription_id}/unschedule_fixed_fee_quantity_updates">client.subscriptions.<a href="./src/resources/subscriptions.ts">unscheduleFixedFeeQuantityUpdates</a>(subscriptionId, { ...params }) -> SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse</code>
- <code title="post /subscriptions/{subscription_id}/unschedule_pending_plan_changes">client.subscriptions.<a href="./src/resources/subscriptions.ts">unschedulePendingPlanChanges</a>(subscriptionId) -> SubscriptionUnschedulePendingPlanChangesResponse</code>
- <code title="post /subscriptions/{subscription_id}/update_fixed_fee_quantity">client.subscriptions.<a href="./src/resources/subscriptions.ts">updateFixedFeeQuantity</a>(subscriptionId, { ...params }) -> SubscriptionUpdateFixedFeeQuantityResponse</code>
- <code title="post /subscriptions/{subscription_id}/update_trial">client.subscriptions.<a href="./src/resources/subscriptions.ts">updateTrial</a>(subscriptionId, { ...params }) -> SubscriptionUpdateTrialResponse</code>

# Alerts

Types:

- <code><a href="./src/resources/alerts.ts">Alert</a></code>

Methods:

- <code title="get /alerts/{alert_id}">client.alerts.<a href="./src/resources/alerts.ts">retrieve</a>(alertId) -> Alert</code>
- <code title="put /alerts/{alert_configuration_id}">client.alerts.<a href="./src/resources/alerts.ts">update</a>(alertConfigurationId, { ...params }) -> Alert</code>
- <code title="get /alerts">client.alerts.<a href="./src/resources/alerts.ts">list</a>({ ...params }) -> AlertsPage</code>
- <code title="post /alerts/customer_id/{customer_id}">client.alerts.<a href="./src/resources/alerts.ts">createForCustomer</a>(customerId, { ...params }) -> Alert</code>
- <code title="post /alerts/external_customer_id/{external_customer_id}">client.alerts.<a href="./src/resources/alerts.ts">createForExternalCustomer</a>(externalCustomerId, { ...params }) -> Alert</code>
- <code title="post /alerts/subscription_id/{subscription_id}">client.alerts.<a href="./src/resources/alerts.ts">createForSubscription</a>(subscriptionId, { ...params }) -> Alert</code>
- <code title="post /alerts/{alert_configuration_id}/disable">client.alerts.<a href="./src/resources/alerts.ts">disable</a>(alertConfigurationId, { ...params }) -> Alert</code>
- <code title="post /alerts/{alert_configuration_id}/enable">client.alerts.<a href="./src/resources/alerts.ts">enable</a>(alertConfigurationId, { ...params }) -> Alert</code>

# DimensionalPriceGroups

Types:

- <code><a href="./src/resources/dimensional-price-groups/dimensional-price-groups.ts">DimensionalPriceGroup</a></code>
- <code><a href="./src/resources/dimensional-price-groups/dimensional-price-groups.ts">DimensionalPriceGroups</a></code>

Methods:

- <code title="post /dimensional_price_groups">client.dimensionalPriceGroups.<a href="./src/resources/dimensional-price-groups/dimensional-price-groups.ts">create</a>({ ...params }) -> DimensionalPriceGroup</code>
- <code title="get /dimensional_price_groups/{dimensional_price_group_id}">client.dimensionalPriceGroups.<a href="./src/resources/dimensional-price-groups/dimensional-price-groups.ts">retrieve</a>(dimensionalPriceGroupId) -> DimensionalPriceGroup</code>
- <code title="get /dimensional_price_groups">client.dimensionalPriceGroups.<a href="./src/resources/dimensional-price-groups/dimensional-price-groups.ts">list</a>({ ...params }) -> DimensionalPriceGroupsPage</code>

## ExternalDimensionalPriceGroupID

Methods:

- <code title="get /dimensional_price_groups/external_dimensional_price_group_id/{external_dimensional_price_group_id}">client.dimensionalPriceGroups.externalDimensionalPriceGroupId.<a href="./src/resources/dimensional-price-groups/external-dimensional-price-group-id.ts">retrieve</a>(externalDimensionalPriceGroupId) -> DimensionalPriceGroup</code>
