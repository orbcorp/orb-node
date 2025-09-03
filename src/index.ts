// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as qs from './internal/qs';
import * as Core from './core';
import * as Errors from './error';
import * as Pagination from './pagination';
import { type PageParams, PageResponse } from './pagination';
import * as Uploads from './uploads';
import * as API from './resources/index';
import {
  Alert,
  AlertCreateForCustomerParams,
  AlertCreateForExternalCustomerParams,
  AlertCreateForSubscriptionParams,
  AlertDisableParams,
  AlertEnableParams,
  AlertListParams,
  AlertUpdateParams,
  Alerts,
  AlertsPage,
  Threshold,
} from './resources/alerts';
import { CreditNoteCreateParams, CreditNoteListParams, CreditNotes } from './resources/credit-notes';
import {
  InvoiceLineItemCreateParams,
  InvoiceLineItemCreateResponse,
  InvoiceLineItems,
} from './resources/invoice-line-items';
import {
  InvoiceCreateParams,
  InvoiceFetchUpcomingParams,
  InvoiceFetchUpcomingResponse,
  InvoiceIssueParams,
  InvoiceListParams,
  InvoiceMarkPaidParams,
  InvoiceUpdateParams,
  Invoices,
} from './resources/invoices';
import {
  Item,
  ItemCreateParams,
  ItemListParams,
  ItemUpdateParams,
  Items,
  ItemsPage,
} from './resources/items';
import {
  BillableMetric,
  BillableMetricsPage,
  MetricCreateParams,
  MetricListParams,
  MetricUpdateParams,
  Metrics,
} from './resources/metrics';
import {
  MutatedSubscription,
  SubscriptionChangeApplyParams,
  SubscriptionChangeApplyResponse,
  SubscriptionChangeCancelResponse,
  SubscriptionChangeRetrieveResponse,
  SubscriptionChanges,
} from './resources/subscription-changes';
import {
  DiscountOverride,
  NewSubscriptionBulkPrice,
  NewSubscriptionBulkWithProrationPrice,
  NewSubscriptionCumulativeGroupedBulkPrice,
  NewSubscriptionGroupedAllocationPrice,
  NewSubscriptionGroupedTieredPackagePrice,
  NewSubscriptionGroupedTieredPrice,
  NewSubscriptionGroupedWithMeteredMinimumPrice,
  NewSubscriptionGroupedWithProratedMinimumPrice,
  NewSubscriptionMatrixPrice,
  NewSubscriptionMatrixWithAllocationPrice,
  NewSubscriptionMatrixWithDisplayNamePrice,
  NewSubscriptionMaxGroupTieredPackagePrice,
  NewSubscriptionMinimumCompositePrice,
  NewSubscriptionPackagePrice,
  NewSubscriptionPackageWithAllocationPrice,
  NewSubscriptionScalableMatrixWithTieredPricingPrice,
  NewSubscriptionScalableMatrixWithUnitPricingPrice,
  NewSubscriptionThresholdTotalAmountPrice,
  NewSubscriptionTieredPackagePrice,
  NewSubscriptionTieredPackageWithMinimumPrice,
  NewSubscriptionTieredPrice,
  NewSubscriptionTieredWithMinimumPrice,
  NewSubscriptionUnitPrice,
  NewSubscriptionUnitWithPercentPrice,
  NewSubscriptionUnitWithProrationPrice,
  Subscription,
  SubscriptionCancelParams,
  SubscriptionCreateParams,
  SubscriptionFetchCostsParams,
  SubscriptionFetchCostsResponse,
  SubscriptionFetchScheduleParams,
  SubscriptionFetchScheduleResponse,
  SubscriptionFetchScheduleResponsesPage,
  SubscriptionFetchUsageParams,
  SubscriptionListParams,
  SubscriptionPriceIntervalsParams,
  SubscriptionRedeemCouponParams,
  SubscriptionSchedulePlanChangeParams,
  SubscriptionTriggerPhaseParams,
  SubscriptionUnscheduleFixedFeeQuantityUpdatesParams,
  SubscriptionUpdateFixedFeeQuantityParams,
  SubscriptionUpdateParams,
  SubscriptionUpdateTrialParams,
  SubscriptionUsage,
  Subscriptions,
  SubscriptionsPage,
} from './resources/subscriptions';
import { TopLevel, TopLevelPingResponse } from './resources/top-level';
import {
  Beta,
  BetaCreatePlanVersionParams,
  BetaSetDefaultPlanVersionParams,
  PlanVersion,
  PlanVersionPhase,
} from './resources/beta/beta';
import {
  Coupon,
  CouponCreateParams,
  CouponListParams,
  Coupons,
  CouponsPage,
} from './resources/coupons/coupons';
import {
  AccountingProviderConfig,
  AddressInput,
  Customer,
  CustomerCreateParams,
  CustomerHierarchyConfig,
  CustomerListParams,
  CustomerUpdateByExternalIDParams,
  CustomerUpdateParams,
  Customers,
  CustomersPage,
  NewAccountingSyncConfiguration,
  NewAvalaraTaxConfiguration,
  NewReportingConfiguration,
  NewSphereConfiguration,
  NewTaxJarConfiguration,
} from './resources/customers/customers';
import {
  DimensionalPriceGroup,
  DimensionalPriceGroupCreateParams,
  DimensionalPriceGroupListParams,
  DimensionalPriceGroupUpdateParams,
  DimensionalPriceGroups,
  DimensionalPriceGroupsPage,
} from './resources/dimensional-price-groups/dimensional-price-groups';
import {
  EventDeprecateResponse,
  EventIngestParams,
  EventIngestResponse,
  EventSearchParams,
  EventSearchResponse,
  EventUpdateParams,
  EventUpdateResponse,
  Events,
} from './resources/events/events';
import {
  Plan,
  PlanCreateParams,
  PlanListParams,
  PlanUpdateParams,
  Plans,
  PlansPage,
} from './resources/plans/plans';
import {
  EvaluatePriceGroup,
  PriceCreateParams,
  PriceEvaluateMultipleParams,
  PriceEvaluateMultipleResponse,
  PriceEvaluateParams,
  PriceEvaluatePreviewEventsParams,
  PriceEvaluatePreviewEventsResponse,
  PriceEvaluateResponse,
  PriceListParams,
  PriceUpdateParams,
  Prices,
} from './resources/prices/prices';

export interface ClientOptions {
  /**
   * Defaults to process.env['ORB_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Defaults to process.env['ORB_WEBHOOK_SECRET'].
   */
  webhookSecret?: string | null | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['ORB_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
}

/**
 * API Client for interfacing with the Orb API.
 */
export class Orb extends Core.APIClient {
  apiKey: string;
  webhookSecret: string | null;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Orb API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['ORB_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.webhookSecret=process.env['ORB_WEBHOOK_SECRET'] ?? null]
   * @param {string} [opts.baseURL=process.env['ORB_BASE_URL'] ?? https://api.withorb.com/v1] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('ORB_BASE_URL'),
    apiKey = Core.readEnv('ORB_API_KEY'),
    webhookSecret = Core.readEnv('ORB_WEBHOOK_SECRET') ?? null,
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.OrbError(
        "The ORB_API_KEY environment variable is missing or empty; either provide it, or instantiate the Orb client with an apiKey option, like new Orb({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      webhookSecret,
      ...opts,
      baseURL: baseURL || `https://api.withorb.com/v1`,
    };

    super({
      baseURL: options.baseURL!,
      baseURLOverridden: baseURL ? baseURL !== 'https://api.withorb.com/v1' : false,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;
    this.idempotencyHeader = 'Idempotency-Key';

    this.apiKey = apiKey;
    this.webhookSecret = webhookSecret;
  }

  topLevel: API.TopLevel = new API.TopLevel(this);
  beta: API.Beta = new API.Beta(this);
  coupons: API.Coupons = new API.Coupons(this);
  creditNotes: API.CreditNotes = new API.CreditNotes(this);
  customers: API.Customers = new API.Customers(this);
  events: API.Events = new API.Events(this);
  invoiceLineItems: API.InvoiceLineItems = new API.InvoiceLineItems(this);
  invoices: API.Invoices = new API.Invoices(this);
  items: API.Items = new API.Items(this);
  metrics: API.Metrics = new API.Metrics(this);
  plans: API.Plans = new API.Plans(this);
  prices: API.Prices = new API.Prices(this);
  subscriptions: API.Subscriptions = new API.Subscriptions(this);
  webhooks: API.Webhooks = new API.Webhooks(this);
  alerts: API.Alerts = new API.Alerts(this);
  dimensionalPriceGroups: API.DimensionalPriceGroups = new API.DimensionalPriceGroups(this);
  subscriptionChanges: API.SubscriptionChanges = new API.SubscriptionChanges(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'https://api.withorb.com/v1';
  }

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  protected override stringifyQuery(query: Record<string, unknown>): string {
    return qs.stringify(query, { arrayFormat: 'brackets' });
  }

  static Orb = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static OrbError = Errors.OrbError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static URLNotFound = Errors.URLNotFound;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static RequestTooLarge = Errors.RequestTooLarge;
  static TooManyRequests = Errors.TooManyRequests;
  static ResourceNotFound = Errors.ResourceNotFound;
  static ResourceConflict = Errors.ResourceConflict;
  static ResourceTooLarge = Errors.ResourceTooLarge;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static ConstraintViolation = Errors.ConstraintViolation;
  static FeatureNotAvailable = Errors.FeatureNotAvailable;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static RequestValidationError = Errors.RequestValidationError;
  static OrbAuthenticationError = Errors.OrbAuthenticationError;
  static OrbInternalServerError = Errors.OrbInternalServerError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;
  static DuplicateResourceCreation = Errors.DuplicateResourceCreation;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

Orb.TopLevel = TopLevel;
Orb.Beta = Beta;
Orb.Coupons = Coupons;
Orb.CouponsPage = CouponsPage;
Orb.CreditNotes = CreditNotes;
Orb.Customers = Customers;
Orb.CustomersPage = CustomersPage;
Orb.Events = Events;
Orb.InvoiceLineItems = InvoiceLineItems;
Orb.Invoices = Invoices;
Orb.Items = Items;
Orb.ItemsPage = ItemsPage;
Orb.Metrics = Metrics;
Orb.BillableMetricsPage = BillableMetricsPage;
Orb.Plans = Plans;
Orb.PlansPage = PlansPage;
Orb.Prices = Prices;
Orb.SubscriptionsPage = SubscriptionsPage;
Orb.SubscriptionFetchScheduleResponsesPage = SubscriptionFetchScheduleResponsesPage;
Orb.Alerts = Alerts;
Orb.AlertsPage = AlertsPage;
Orb.DimensionalPriceGroupsPage = DimensionalPriceGroupsPage;
Orb.SubscriptionChanges = SubscriptionChanges;

export declare namespace Orb {
  export type RequestOptions = Core.RequestOptions;

  export import Page = Pagination.Page;
  export { type PageParams as PageParams, type PageResponse as PageResponse };

  export { TopLevel as TopLevel, type TopLevelPingResponse as TopLevelPingResponse };

  export {
    Beta as Beta,
    type PlanVersion as PlanVersion,
    type PlanVersionPhase as PlanVersionPhase,
    type BetaCreatePlanVersionParams as BetaCreatePlanVersionParams,
    type BetaSetDefaultPlanVersionParams as BetaSetDefaultPlanVersionParams,
  };

  export {
    Coupons as Coupons,
    type Coupon as Coupon,
    CouponsPage as CouponsPage,
    type CouponCreateParams as CouponCreateParams,
    type CouponListParams as CouponListParams,
  };

  export {
    CreditNotes as CreditNotes,
    type CreditNoteCreateParams as CreditNoteCreateParams,
    type CreditNoteListParams as CreditNoteListParams,
  };

  export {
    Customers as Customers,
    type AccountingProviderConfig as AccountingProviderConfig,
    type AddressInput as AddressInput,
    type Customer as Customer,
    type CustomerHierarchyConfig as CustomerHierarchyConfig,
    type NewAccountingSyncConfiguration as NewAccountingSyncConfiguration,
    type NewAvalaraTaxConfiguration as NewAvalaraTaxConfiguration,
    type NewReportingConfiguration as NewReportingConfiguration,
    type NewSphereConfiguration as NewSphereConfiguration,
    type NewTaxJarConfiguration as NewTaxJarConfiguration,
    CustomersPage as CustomersPage,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerListParams as CustomerListParams,
    type CustomerUpdateByExternalIDParams as CustomerUpdateByExternalIDParams,
  };

  export {
    Events as Events,
    type EventUpdateResponse as EventUpdateResponse,
    type EventDeprecateResponse as EventDeprecateResponse,
    type EventIngestResponse as EventIngestResponse,
    type EventSearchResponse as EventSearchResponse,
    type EventUpdateParams as EventUpdateParams,
    type EventIngestParams as EventIngestParams,
    type EventSearchParams as EventSearchParams,
  };

  export {
    InvoiceLineItems as InvoiceLineItems,
    type InvoiceLineItemCreateResponse as InvoiceLineItemCreateResponse,
    type InvoiceLineItemCreateParams as InvoiceLineItemCreateParams,
  };

  export {
    Invoices as Invoices,
    type InvoiceFetchUpcomingResponse as InvoiceFetchUpcomingResponse,
    type InvoiceCreateParams as InvoiceCreateParams,
    type InvoiceUpdateParams as InvoiceUpdateParams,
    type InvoiceListParams as InvoiceListParams,
    type InvoiceFetchUpcomingParams as InvoiceFetchUpcomingParams,
    type InvoiceIssueParams as InvoiceIssueParams,
    type InvoiceMarkPaidParams as InvoiceMarkPaidParams,
  };

  export {
    Items as Items,
    type Item as Item,
    ItemsPage as ItemsPage,
    type ItemCreateParams as ItemCreateParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemListParams as ItemListParams,
  };

  export {
    Metrics as Metrics,
    type BillableMetric as BillableMetric,
    BillableMetricsPage as BillableMetricsPage,
    type MetricCreateParams as MetricCreateParams,
    type MetricUpdateParams as MetricUpdateParams,
    type MetricListParams as MetricListParams,
  };

  export {
    Plans as Plans,
    type Plan as Plan,
    PlansPage as PlansPage,
    type PlanCreateParams as PlanCreateParams,
    type PlanUpdateParams as PlanUpdateParams,
    type PlanListParams as PlanListParams,
  };

  export {
    Prices as Prices,
    type EvaluatePriceGroup as EvaluatePriceGroup,
    type PriceEvaluateResponse as PriceEvaluateResponse,
    type PriceEvaluateMultipleResponse as PriceEvaluateMultipleResponse,
    type PriceEvaluatePreviewEventsResponse as PriceEvaluatePreviewEventsResponse,
    type PriceCreateParams as PriceCreateParams,
    type PriceUpdateParams as PriceUpdateParams,
    type PriceListParams as PriceListParams,
    type PriceEvaluateParams as PriceEvaluateParams,
    type PriceEvaluateMultipleParams as PriceEvaluateMultipleParams,
    type PriceEvaluatePreviewEventsParams as PriceEvaluatePreviewEventsParams,
  };

  export {
    type Subscriptions as Subscriptions,
    type DiscountOverride as DiscountOverride,
    type NewSubscriptionBulkPrice as NewSubscriptionBulkPrice,
    type NewSubscriptionBulkWithProrationPrice as NewSubscriptionBulkWithProrationPrice,
    type NewSubscriptionCumulativeGroupedBulkPrice as NewSubscriptionCumulativeGroupedBulkPrice,
    type NewSubscriptionGroupedAllocationPrice as NewSubscriptionGroupedAllocationPrice,
    type NewSubscriptionGroupedTieredPackagePrice as NewSubscriptionGroupedTieredPackagePrice,
    type NewSubscriptionGroupedTieredPrice as NewSubscriptionGroupedTieredPrice,
    type NewSubscriptionGroupedWithMeteredMinimumPrice as NewSubscriptionGroupedWithMeteredMinimumPrice,
    type NewSubscriptionGroupedWithProratedMinimumPrice as NewSubscriptionGroupedWithProratedMinimumPrice,
    type NewSubscriptionMatrixPrice as NewSubscriptionMatrixPrice,
    type NewSubscriptionMatrixWithAllocationPrice as NewSubscriptionMatrixWithAllocationPrice,
    type NewSubscriptionMatrixWithDisplayNamePrice as NewSubscriptionMatrixWithDisplayNamePrice,
    type NewSubscriptionMaxGroupTieredPackagePrice as NewSubscriptionMaxGroupTieredPackagePrice,
    type NewSubscriptionMinimumCompositePrice as NewSubscriptionMinimumCompositePrice,
    type NewSubscriptionPackagePrice as NewSubscriptionPackagePrice,
    type NewSubscriptionPackageWithAllocationPrice as NewSubscriptionPackageWithAllocationPrice,
    type NewSubscriptionScalableMatrixWithTieredPricingPrice as NewSubscriptionScalableMatrixWithTieredPricingPrice,
    type NewSubscriptionScalableMatrixWithUnitPricingPrice as NewSubscriptionScalableMatrixWithUnitPricingPrice,
    type NewSubscriptionThresholdTotalAmountPrice as NewSubscriptionThresholdTotalAmountPrice,
    type NewSubscriptionTieredPackagePrice as NewSubscriptionTieredPackagePrice,
    type NewSubscriptionTieredPackageWithMinimumPrice as NewSubscriptionTieredPackageWithMinimumPrice,
    type NewSubscriptionTieredPrice as NewSubscriptionTieredPrice,
    type NewSubscriptionTieredWithMinimumPrice as NewSubscriptionTieredWithMinimumPrice,
    type NewSubscriptionUnitPrice as NewSubscriptionUnitPrice,
    type NewSubscriptionUnitWithPercentPrice as NewSubscriptionUnitWithPercentPrice,
    type NewSubscriptionUnitWithProrationPrice as NewSubscriptionUnitWithProrationPrice,
    type Subscription as Subscription,
    type SubscriptionUsage as SubscriptionUsage,
    type SubscriptionFetchCostsResponse as SubscriptionFetchCostsResponse,
    type SubscriptionFetchScheduleResponse as SubscriptionFetchScheduleResponse,
    SubscriptionsPage as SubscriptionsPage,
    SubscriptionFetchScheduleResponsesPage as SubscriptionFetchScheduleResponsesPage,
    type SubscriptionCreateParams as SubscriptionCreateParams,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
    type SubscriptionCancelParams as SubscriptionCancelParams,
    type SubscriptionFetchCostsParams as SubscriptionFetchCostsParams,
    type SubscriptionFetchScheduleParams as SubscriptionFetchScheduleParams,
    type SubscriptionFetchUsageParams as SubscriptionFetchUsageParams,
    type SubscriptionPriceIntervalsParams as SubscriptionPriceIntervalsParams,
    type SubscriptionRedeemCouponParams as SubscriptionRedeemCouponParams,
    type SubscriptionSchedulePlanChangeParams as SubscriptionSchedulePlanChangeParams,
    type SubscriptionTriggerPhaseParams as SubscriptionTriggerPhaseParams,
    type SubscriptionUnscheduleFixedFeeQuantityUpdatesParams as SubscriptionUnscheduleFixedFeeQuantityUpdatesParams,
    type SubscriptionUpdateFixedFeeQuantityParams as SubscriptionUpdateFixedFeeQuantityParams,
    type SubscriptionUpdateTrialParams as SubscriptionUpdateTrialParams,
  };

  export {
    Alerts as Alerts,
    type Alert as Alert,
    type Threshold as Threshold,
    AlertsPage as AlertsPage,
    type AlertUpdateParams as AlertUpdateParams,
    type AlertListParams as AlertListParams,
    type AlertCreateForCustomerParams as AlertCreateForCustomerParams,
    type AlertCreateForExternalCustomerParams as AlertCreateForExternalCustomerParams,
    type AlertCreateForSubscriptionParams as AlertCreateForSubscriptionParams,
    type AlertDisableParams as AlertDisableParams,
    type AlertEnableParams as AlertEnableParams,
  };

  export {
    type DimensionalPriceGroups as DimensionalPriceGroups,
    type DimensionalPriceGroup as DimensionalPriceGroup,
    DimensionalPriceGroupsPage as DimensionalPriceGroupsPage,
    type DimensionalPriceGroupCreateParams as DimensionalPriceGroupCreateParams,
    type DimensionalPriceGroupUpdateParams as DimensionalPriceGroupUpdateParams,
    type DimensionalPriceGroupListParams as DimensionalPriceGroupListParams,
  };

  export {
    SubscriptionChanges as SubscriptionChanges,
    type MutatedSubscription as MutatedSubscription,
    type SubscriptionChangeRetrieveResponse as SubscriptionChangeRetrieveResponse,
    type SubscriptionChangeApplyResponse as SubscriptionChangeApplyResponse,
    type SubscriptionChangeCancelResponse as SubscriptionChangeCancelResponse,
    type SubscriptionChangeApplyParams as SubscriptionChangeApplyParams,
  };

  export type Address = API.Address;
  export type AdjustmentInterval = API.AdjustmentInterval;
  export type AggregatedCost = API.AggregatedCost;
  export type Allocation = API.Allocation;
  export type AmountDiscount = API.AmountDiscount;
  export type AmountDiscountInterval = API.AmountDiscountInterval;
  export type BillableMetricTiny = API.BillableMetricTiny;
  export type BillingCycleAnchorConfiguration = API.BillingCycleAnchorConfiguration;
  export type BillingCycleConfiguration = API.BillingCycleConfiguration;
  export type BillingCycleRelativeDate = API.BillingCycleRelativeDate;
  export type BulkConfig = API.BulkConfig;
  export type BulkTier = API.BulkTier;
  export type ChangedSubscriptionResources = API.ChangedSubscriptionResources;
  export type ConversionRateTier = API.ConversionRateTier;
  export type ConversionRateTieredConfig = API.ConversionRateTieredConfig;
  export type ConversionRateUnitConfig = API.ConversionRateUnitConfig;
  export type CouponRedemption = API.CouponRedemption;
  export type CreditNote = API.CreditNote;
  export type CreditNoteTiny = API.CreditNoteTiny;
  export type CustomExpiration = API.CustomExpiration;
  export type CustomerMinified = API.CustomerMinified;
  export type CustomerTaxID = API.CustomerTaxID;
  export type DimensionalPriceConfiguration = API.DimensionalPriceConfiguration;
  export type Discount = API.Discount;
  export type FixedFeeQuantityScheduleEntry = API.FixedFeeQuantityScheduleEntry;
  export type FixedFeeQuantityTransition = API.FixedFeeQuantityTransition;
  export type Invoice = API.Invoice;
  export type InvoiceLevelDiscount = API.InvoiceLevelDiscount;
  export type InvoiceTiny = API.InvoiceTiny;
  export type ItemSlim = API.ItemSlim;
  export type MatrixConfig = API.MatrixConfig;
  export type MatrixSubLineItem = API.MatrixSubLineItem;
  export type MatrixValue = API.MatrixValue;
  export type MatrixWithAllocationConfig = API.MatrixWithAllocationConfig;
  export type Maximum = API.Maximum;
  export type MaximumInterval = API.MaximumInterval;
  export type Minimum = API.Minimum;
  export type MinimumInterval = API.MinimumInterval;
  export type MonetaryAmountDiscountAdjustment = API.MonetaryAmountDiscountAdjustment;
  export type MonetaryMaximumAdjustment = API.MonetaryMaximumAdjustment;
  export type MonetaryMinimumAdjustment = API.MonetaryMinimumAdjustment;
  export type MonetaryPercentageDiscountAdjustment = API.MonetaryPercentageDiscountAdjustment;
  export type MonetaryUsageDiscountAdjustment = API.MonetaryUsageDiscountAdjustment;
  export type NewAllocationPrice = API.NewAllocationPrice;
  export type NewAmountDiscount = API.NewAmountDiscount;
  export type NewBillingCycleConfiguration = API.NewBillingCycleConfiguration;
  export type NewDimensionalPriceConfiguration = API.NewDimensionalPriceConfiguration;
  export type NewFloatingBulkPrice = API.NewFloatingBulkPrice;
  export type NewFloatingBulkWithProrationPrice = API.NewFloatingBulkWithProrationPrice;
  export type NewFloatingCumulativeGroupedBulkPrice = API.NewFloatingCumulativeGroupedBulkPrice;
  export type NewFloatingGroupedAllocationPrice = API.NewFloatingGroupedAllocationPrice;
  export type NewFloatingGroupedTieredPackagePrice = API.NewFloatingGroupedTieredPackagePrice;
  export type NewFloatingGroupedTieredPrice = API.NewFloatingGroupedTieredPrice;
  export type NewFloatingGroupedWithMeteredMinimumPrice = API.NewFloatingGroupedWithMeteredMinimumPrice;
  export type NewFloatingGroupedWithProratedMinimumPrice = API.NewFloatingGroupedWithProratedMinimumPrice;
  export type NewFloatingMatrixPrice = API.NewFloatingMatrixPrice;
  export type NewFloatingMatrixWithAllocationPrice = API.NewFloatingMatrixWithAllocationPrice;
  export type NewFloatingMatrixWithDisplayNamePrice = API.NewFloatingMatrixWithDisplayNamePrice;
  export type NewFloatingMaxGroupTieredPackagePrice = API.NewFloatingMaxGroupTieredPackagePrice;
  export type NewFloatingMinimumCompositePrice = API.NewFloatingMinimumCompositePrice;
  export type NewFloatingPackagePrice = API.NewFloatingPackagePrice;
  export type NewFloatingPackageWithAllocationPrice = API.NewFloatingPackageWithAllocationPrice;
  export type NewFloatingScalableMatrixWithTieredPricingPrice =
    API.NewFloatingScalableMatrixWithTieredPricingPrice;
  export type NewFloatingScalableMatrixWithUnitPricingPrice =
    API.NewFloatingScalableMatrixWithUnitPricingPrice;
  export type NewFloatingThresholdTotalAmountPrice = API.NewFloatingThresholdTotalAmountPrice;
  export type NewFloatingTieredPackagePrice = API.NewFloatingTieredPackagePrice;
  export type NewFloatingTieredPackageWithMinimumPrice = API.NewFloatingTieredPackageWithMinimumPrice;
  export type NewFloatingTieredPrice = API.NewFloatingTieredPrice;
  export type NewFloatingTieredWithMinimumPrice = API.NewFloatingTieredWithMinimumPrice;
  export type NewFloatingTieredWithProrationPrice = API.NewFloatingTieredWithProrationPrice;
  export type NewFloatingUnitPrice = API.NewFloatingUnitPrice;
  export type NewFloatingUnitWithPercentPrice = API.NewFloatingUnitWithPercentPrice;
  export type NewFloatingUnitWithProrationPrice = API.NewFloatingUnitWithProrationPrice;
  export type NewMaximum = API.NewMaximum;
  export type NewMinimum = API.NewMinimum;
  export type NewPercentageDiscount = API.NewPercentageDiscount;
  export type NewPlanBulkPrice = API.NewPlanBulkPrice;
  export type NewPlanBulkWithProrationPrice = API.NewPlanBulkWithProrationPrice;
  export type NewPlanCumulativeGroupedBulkPrice = API.NewPlanCumulativeGroupedBulkPrice;
  export type NewPlanGroupedAllocationPrice = API.NewPlanGroupedAllocationPrice;
  export type NewPlanGroupedTieredPackagePrice = API.NewPlanGroupedTieredPackagePrice;
  export type NewPlanGroupedTieredPrice = API.NewPlanGroupedTieredPrice;
  export type NewPlanGroupedWithMeteredMinimumPrice = API.NewPlanGroupedWithMeteredMinimumPrice;
  export type NewPlanGroupedWithProratedMinimumPrice = API.NewPlanGroupedWithProratedMinimumPrice;
  export type NewPlanMatrixPrice = API.NewPlanMatrixPrice;
  export type NewPlanMatrixWithAllocationPrice = API.NewPlanMatrixWithAllocationPrice;
  export type NewPlanMatrixWithDisplayNamePrice = API.NewPlanMatrixWithDisplayNamePrice;
  export type NewPlanMaxGroupTieredPackagePrice = API.NewPlanMaxGroupTieredPackagePrice;
  export type NewPlanMinimumCompositePrice = API.NewPlanMinimumCompositePrice;
  export type NewPlanPackagePrice = API.NewPlanPackagePrice;
  export type NewPlanPackageWithAllocationPrice = API.NewPlanPackageWithAllocationPrice;
  export type NewPlanScalableMatrixWithTieredPricingPrice = API.NewPlanScalableMatrixWithTieredPricingPrice;
  export type NewPlanScalableMatrixWithUnitPricingPrice = API.NewPlanScalableMatrixWithUnitPricingPrice;
  export type NewPlanThresholdTotalAmountPrice = API.NewPlanThresholdTotalAmountPrice;
  export type NewPlanTieredPackagePrice = API.NewPlanTieredPackagePrice;
  export type NewPlanTieredPackageWithMinimumPrice = API.NewPlanTieredPackageWithMinimumPrice;
  export type NewPlanTieredPrice = API.NewPlanTieredPrice;
  export type NewPlanTieredWithMinimumPrice = API.NewPlanTieredWithMinimumPrice;
  export type NewPlanUnitPrice = API.NewPlanUnitPrice;
  export type NewPlanUnitWithPercentPrice = API.NewPlanUnitWithPercentPrice;
  export type NewPlanUnitWithProrationPrice = API.NewPlanUnitWithProrationPrice;
  export type NewUsageDiscount = API.NewUsageDiscount;
  export type OtherSubLineItem = API.OtherSubLineItem;
  export type PackageConfig = API.PackageConfig;
  export type PaginationMetadata = API.PaginationMetadata;
  export type PerPriceCost = API.PerPriceCost;
  export type PercentageDiscount = API.PercentageDiscount;
  export type PercentageDiscountInterval = API.PercentageDiscountInterval;
  export type PlanPhaseAmountDiscountAdjustment = API.PlanPhaseAmountDiscountAdjustment;
  export type PlanPhaseMaximumAdjustment = API.PlanPhaseMaximumAdjustment;
  export type PlanPhaseMinimumAdjustment = API.PlanPhaseMinimumAdjustment;
  export type PlanPhasePercentageDiscountAdjustment = API.PlanPhasePercentageDiscountAdjustment;
  export type PlanPhaseUsageDiscountAdjustment = API.PlanPhaseUsageDiscountAdjustment;
  export type Price = API.Price;
  export type PriceInterval = API.PriceInterval;
  export type SubLineItemGrouping = API.SubLineItemGrouping;
  export type SubLineItemMatrixConfig = API.SubLineItemMatrixConfig;
  export type SubscriptionChangeMinified = API.SubscriptionChangeMinified;
  export type SubscriptionMinified = API.SubscriptionMinified;
  export type SubscriptionTrialInfo = API.SubscriptionTrialInfo;
  export type TaxAmount = API.TaxAmount;
  export type Tier = API.Tier;
  export type TierSubLineItem = API.TierSubLineItem;
  export type TieredConfig = API.TieredConfig;
  export type TieredConversionRateConfig = API.TieredConversionRateConfig;
  export type TransformPriceFilter = API.TransformPriceFilter;
  export type TrialDiscount = API.TrialDiscount;
  export type UnitConfig = API.UnitConfig;
  export type UnitConversionRateConfig = API.UnitConversionRateConfig;
  export type UsageDiscount = API.UsageDiscount;
  export type UsageDiscountInterval = API.UsageDiscountInterval;
}

export { toFile, fileFromPath } from './uploads';
export {
  OrbError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  URLNotFound,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  RequestTooLarge,
  TooManyRequests,
  ResourceNotFound,
  ResourceConflict,
  ResourceTooLarge,
  AuthenticationError,
  InternalServerError,
  ConstraintViolation,
  FeatureNotAvailable,
  PermissionDeniedError,
  RequestValidationError,
  OrbAuthenticationError,
  OrbInternalServerError,
  UnprocessableEntityError,
  DuplicateResourceCreation,
} from './error';

export default Orb;
