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
} from './resources/alerts';
import {
  CreditNote,
  CreditNoteCreateParams,
  CreditNoteListParams,
  CreditNotes,
} from './resources/credit-notes';
import { InvoiceLineItemCreateParams, InvoiceLineItems } from './resources/invoice-line-items';
import {
  Invoice,
  InvoiceCreateParams,
  InvoiceFetchUpcomingParams,
  InvoiceFetchUpcomingResponse,
  InvoiceIssueParams,
  InvoiceListParams,
  InvoiceMarkPaidParams,
  InvoiceUpdateParams,
  Invoices,
} from './resources/invoices';
import { Item, ItemCreateParams, ItemListParams, ItemUpdateParams, Items } from './resources/items';
import {
  BillableMetric,
  MetricCreateParams,
  MetricListParams,
  MetricUpdateParams,
  Metrics,
} from './resources/metrics';
import {
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
  SubscriptionSchedulePlanChangeParams,
  SubscriptionTriggerPhaseParams,
  SubscriptionUnscheduleFixedFeeQuantityUpdatesParams,
  SubscriptionUpdateFixedFeeQuantityParams,
  SubscriptionUpdateParams,
  SubscriptionUpdateTrialParams,
  SubscriptionUsage,
  Subscriptions,
} from './resources/subscriptions';
import { TopLevel, TopLevelPingResponse } from './resources/top-level';
import { Coupon, CouponCreateParams, CouponListParams, Coupons } from './resources/coupons/coupons';
import {
  Customer,
  CustomerCreateParams,
  CustomerListParams,
  CustomerUpdateByExternalIDParams,
  CustomerUpdateParams,
  Customers,
} from './resources/customers/customers';
import {
  DimensionalPriceGroup,
  DimensionalPriceGroupCreateParams,
  DimensionalPriceGroupListParams,
  DimensionalPriceGroups,
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
import { Plan, PlanCreateParams, PlanListParams, PlanUpdateParams, Plans } from './resources/plans/plans';
import {
  EvaluatePriceGroup,
  Price,
  PriceCreateParams,
  PriceEvaluateParams,
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
Orb.Coupons = Coupons;
Orb.CreditNotes = CreditNotes;
Orb.Customers = Customers;
Orb.Events = Events;
Orb.InvoiceLineItems = InvoiceLineItems;
Orb.Invoices = Invoices;
Orb.Items = Items;
Orb.Metrics = Metrics;
Orb.Plans = Plans;
Orb.Prices = Prices;
Orb.SubscriptionFetchScheduleResponsesPage = SubscriptionFetchScheduleResponsesPage;
Orb.Alerts = Alerts;
export declare namespace Orb {
  export type RequestOptions = Core.RequestOptions;

  export import Page = Pagination.Page;
  export { type PageParams as PageParams, type PageResponse as PageResponse };

  export { TopLevel as TopLevel, type TopLevelPingResponse as TopLevelPingResponse };

  export {
    Coupons as Coupons,
    type Coupon as Coupon,
    type CouponCreateParams as CouponCreateParams,
    type CouponListParams as CouponListParams,
  };

  export {
    CreditNotes as CreditNotes,
    type CreditNote as CreditNote,
    type CreditNoteCreateParams as CreditNoteCreateParams,
    type CreditNoteListParams as CreditNoteListParams,
  };

  export {
    Customers as Customers,
    type Customer as Customer,
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
    type InvoiceLineItemCreateParams as InvoiceLineItemCreateParams,
  };

  export {
    Invoices as Invoices,
    type Invoice as Invoice,
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
    type ItemCreateParams as ItemCreateParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemListParams as ItemListParams,
  };

  export {
    Metrics as Metrics,
    type BillableMetric as BillableMetric,
    type MetricCreateParams as MetricCreateParams,
    type MetricUpdateParams as MetricUpdateParams,
    type MetricListParams as MetricListParams,
  };

  export {
    Plans as Plans,
    type Plan as Plan,
    type PlanCreateParams as PlanCreateParams,
    type PlanUpdateParams as PlanUpdateParams,
    type PlanListParams as PlanListParams,
  };

  export {
    Prices as Prices,
    type EvaluatePriceGroup as EvaluatePriceGroup,
    type Price as Price,
    type PriceEvaluateResponse as PriceEvaluateResponse,
    type PriceCreateParams as PriceCreateParams,
    type PriceUpdateParams as PriceUpdateParams,
    type PriceListParams as PriceListParams,
    type PriceEvaluateParams as PriceEvaluateParams,
  };

  export {
    type Subscriptions as Subscriptions,
    type Subscription as Subscription,
    type SubscriptionUsage as SubscriptionUsage,
    type SubscriptionFetchCostsResponse as SubscriptionFetchCostsResponse,
    type SubscriptionFetchScheduleResponse as SubscriptionFetchScheduleResponse,
    SubscriptionFetchScheduleResponsesPage as SubscriptionFetchScheduleResponsesPage,
    type SubscriptionCreateParams as SubscriptionCreateParams,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
    type SubscriptionCancelParams as SubscriptionCancelParams,
    type SubscriptionFetchCostsParams as SubscriptionFetchCostsParams,
    type SubscriptionFetchScheduleParams as SubscriptionFetchScheduleParams,
    type SubscriptionFetchUsageParams as SubscriptionFetchUsageParams,
    type SubscriptionPriceIntervalsParams as SubscriptionPriceIntervalsParams,
    type SubscriptionSchedulePlanChangeParams as SubscriptionSchedulePlanChangeParams,
    type SubscriptionTriggerPhaseParams as SubscriptionTriggerPhaseParams,
    type SubscriptionUnscheduleFixedFeeQuantityUpdatesParams as SubscriptionUnscheduleFixedFeeQuantityUpdatesParams,
    type SubscriptionUpdateFixedFeeQuantityParams as SubscriptionUpdateFixedFeeQuantityParams,
    type SubscriptionUpdateTrialParams as SubscriptionUpdateTrialParams,
  };

  export {
    Alerts as Alerts,
    type Alert as Alert,
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
    type DimensionalPriceGroupCreateParams as DimensionalPriceGroupCreateParams,
    type DimensionalPriceGroupListParams as DimensionalPriceGroupListParams,
  };

  export type AddCreditLedgerEntryRequest = API.AddCreditLedgerEntryRequest;
  export type AddCreditTopUpRequest = API.AddCreditTopUpRequest;
  export type AddSubscriptionAdjustmentParams = API.AddSubscriptionAdjustmentParams;
  export type AddSubscriptionPriceParams = API.AddSubscriptionPriceParams;
  export type AddressInputModel = API.AddressInputModel;
  export type AddressModel = API.AddressModel;
  export type AdjustmentIntervalModel = API.AdjustmentIntervalModel;
  export type AdjustmentModel = API.AdjustmentModel;
  export type AffectedBlockModel = API.AffectedBlockModel;
  export type AggregatedCostModel = API.AggregatedCostModel;
  export type AlertModel = API.AlertModel;
  export type AllocationModel = API.AllocationModel;
  export type AmountDiscount = API.AmountDiscount;
  export type AmountDiscountIntervalModel = API.AmountDiscountIntervalModel;
  export type AmountDiscountModel = API.AmountDiscountModel;
  export type AutoCollectionModel = API.AutoCollectionModel;
  export type BackfillModel = API.BackfillModel;
  export type BillableMetricModel = API.BillableMetricModel;
  export type BillableMetricSimpleModel = API.BillableMetricSimpleModel;
  export type BillableMetricTinyModel = API.BillableMetricTinyModel;
  export type BillingCycleAnchorConfigurationModel = API.BillingCycleAnchorConfigurationModel;
  export type BillingCycleConfigurationModel = API.BillingCycleConfigurationModel;
  export type BillingCycleRelativeDate = API.BillingCycleRelativeDate;
  export type BpsConfigModel = API.BpsConfigModel;
  export type BulkBpsConfigModel = API.BulkBpsConfigModel;
  export type BulkConfigModel = API.BulkConfigModel;
  export type CouponModel = API.CouponModel;
  export type CouponRedemptionModel = API.CouponRedemptionModel;
  export type CreateCustomerAlertRequest = API.CreateCustomerAlertRequest;
  export type CreditLedgerEntriesModel = API.CreditLedgerEntriesModel;
  export type CreditLedgerEntryModel = API.CreditLedgerEntryModel;
  export type CreditNoteDiscountModel = API.CreditNoteDiscountModel;
  export type CreditNoteModel = API.CreditNoteModel;
  export type CreditNoteSummaryModel = API.CreditNoteSummaryModel;
  export type CustomRatingFunctionConfigModel = API.CustomRatingFunctionConfigModel;
  export type CustomerBalanceTransactionModel = API.CustomerBalanceTransactionModel;
  export type CustomerCostsModel = API.CustomerCostsModel;
  export type CustomerCreditBalancesModel = API.CustomerCreditBalancesModel;
  export type CustomerHierarchyConfigModel = API.CustomerHierarchyConfigModel;
  export type CustomerMinifiedModel = API.CustomerMinifiedModel;
  export type CustomerModel = API.CustomerModel;
  export type CustomerTaxIDModel = API.CustomerTaxIDModel;
  export type DimensionalPriceConfigurationModel = API.DimensionalPriceConfigurationModel;
  export type DimensionalPriceGroupModel = API.DimensionalPriceGroupModel;
  export type Discount = API.Discount;
  export type DiscountModel = API.DiscountModel;
  export type DiscountOverrideModel = API.DiscountOverrideModel;
  export type EditCustomerModel = API.EditCustomerModel;
  export type EditPlanModel = API.EditPlanModel;
  export type FixedFeeQuantityScheduleEntryModel = API.FixedFeeQuantityScheduleEntryModel;
  export type InvoiceLevelDiscount = API.InvoiceLevelDiscount;
  export type InvoiceLevelDiscountModel = API.InvoiceLevelDiscountModel;
  export type InvoiceLineItemModel = API.InvoiceLineItemModel;
  export type InvoiceModel = API.InvoiceModel;
  export type ItemExternalConnectionModel = API.ItemExternalConnectionModel;
  export type ItemModel = API.ItemModel;
  export type ItemSlimModel = API.ItemSlimModel;
  export type MatrixConfigModel = API.MatrixConfigModel;
  export type MatrixValueModel = API.MatrixValueModel;
  export type MatrixWithAllocationConfigModel = API.MatrixWithAllocationConfigModel;
  export type MaximumIntervalModel = API.MaximumIntervalModel;
  export type MaximumModel = API.MaximumModel;
  export type MinimumIntervalModel = API.MinimumIntervalModel;
  export type MinimumModel = API.MinimumModel;
  export type MutatedSubscriptionModel = API.MutatedSubscriptionModel;
  export type NewAccountingSyncConfigurationModel = API.NewAccountingSyncConfigurationModel;
  export type NewAdjustmentModel = API.NewAdjustmentModel;
  export type NewAllocationPriceModel = API.NewAllocationPriceModel;
  export type NewBillingCycleConfigurationModel = API.NewBillingCycleConfigurationModel;
  export type NewFloatingPriceModel = API.NewFloatingPriceModel;
  export type NewReportingConfigurationModel = API.NewReportingConfigurationModel;
  export type NewSubscriptionPriceModel = API.NewSubscriptionPriceModel;
  export type NewTaxConfigurationModel = API.NewTaxConfigurationModel;
  export type PackageConfigModel = API.PackageConfigModel;
  export type PaginationMetadata = API.PaginationMetadata;
  export type PaginationMetadataModel = API.PaginationMetadataModel;
  export type PaymentAttemptModel = API.PaymentAttemptModel;
  export type PercentageDiscount = API.PercentageDiscount;
  export type PercentageDiscountIntervalModel = API.PercentageDiscountIntervalModel;
  export type PercentageDiscountModel = API.PercentageDiscountModel;
  export type PlanMinifiedModel = API.PlanMinifiedModel;
  export type PlanModel = API.PlanModel;
  export type PriceIntervalFixedFeeQuantityTransitionModel = API.PriceIntervalFixedFeeQuantityTransitionModel;
  export type PriceIntervalModel = API.PriceIntervalModel;
  export type PriceModel = API.PriceModel;
  export type RemoveSubscriptionAdjustmentParams = API.RemoveSubscriptionAdjustmentParams;
  export type RemoveSubscriptionPriceParams = API.RemoveSubscriptionPriceParams;
  export type ReplaceSubscriptionAdjustmentParams = API.ReplaceSubscriptionAdjustmentParams;
  export type ReplaceSubscriptionPriceParams = API.ReplaceSubscriptionPriceParams;
  export type SubLineItemGroupingModel = API.SubLineItemGroupingModel;
  export type SubscriptionMinifiedModel = API.SubscriptionMinifiedModel;
  export type SubscriptionModel = API.SubscriptionModel;
  export type SubscriptionTrialInfoModel = API.SubscriptionTrialInfoModel;
  export type SubscriptionsModel = API.SubscriptionsModel;
  export type TaxAmountModel = API.TaxAmountModel;
  export type ThresholdModel = API.ThresholdModel;
  export type TieredBpsConfigModel = API.TieredBpsConfigModel;
  export type TieredConfigModel = API.TieredConfigModel;
  export type TopUpModel = API.TopUpModel;
  export type TopUpsModel = API.TopUpsModel;
  export type TrialDiscount = API.TrialDiscount;
  export type TrialDiscountModel = API.TrialDiscountModel;
  export type UnitConfigModel = API.UnitConfigModel;
  export type UpdatePriceRequestParams = API.UpdatePriceRequestParams;
  export type UsageDiscountIntervalModel = API.UsageDiscountIntervalModel;
  export type UsageModel = API.UsageModel;
  export type UsageDiscount = API.UsageDiscount;
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
