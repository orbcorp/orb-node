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
} from './resources/alerts';
import {
  CreditNote,
  CreditNoteCreateParams,
  CreditNoteListParams,
  CreditNotes,
  CreditNotesPage,
} from './resources/credit-notes';
import {
  InvoiceLineItemCreateParams,
  InvoiceLineItemCreateResponse,
  InvoiceLineItems,
} from './resources/invoice-line-items';
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
  InvoicesPage,
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
  Subscription,
  SubscriptionCancelParams,
  SubscriptionCancelResponse,
  SubscriptionCreateParams,
  SubscriptionCreateResponse,
  SubscriptionFetchCostsParams,
  SubscriptionFetchCostsResponse,
  SubscriptionFetchScheduleParams,
  SubscriptionFetchScheduleResponse,
  SubscriptionFetchScheduleResponsesPage,
  SubscriptionFetchUsageParams,
  SubscriptionListParams,
  SubscriptionPriceIntervalsParams,
  SubscriptionPriceIntervalsResponse,
  SubscriptionSchedulePlanChangeParams,
  SubscriptionSchedulePlanChangeResponse,
  SubscriptionTriggerPhaseParams,
  SubscriptionTriggerPhaseResponse,
  SubscriptionUnscheduleCancellationResponse,
  SubscriptionUnscheduleFixedFeeQuantityUpdatesParams,
  SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse,
  SubscriptionUnschedulePendingPlanChangesResponse,
  SubscriptionUpdateFixedFeeQuantityParams,
  SubscriptionUpdateFixedFeeQuantityResponse,
  SubscriptionUpdateParams,
  SubscriptionUpdateTrialParams,
  SubscriptionUpdateTrialResponse,
  SubscriptionUsage,
  Subscriptions,
  SubscriptionsPage,
} from './resources/subscriptions';
import { TopLevel, TopLevelPingResponse } from './resources/top-level';
import {
  Coupon,
  CouponCreateParams,
  CouponListParams,
  Coupons,
  CouponsPage,
} from './resources/coupons/coupons';
import {
  Customer,
  CustomerCreateParams,
  CustomerListParams,
  CustomerUpdateByExternalIDParams,
  CustomerUpdateParams,
  Customers,
  CustomersPage,
} from './resources/customers/customers';
import {
  DimensionalPriceGroup,
  DimensionalPriceGroupCreateParams,
  DimensionalPriceGroupListParams,
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
  Price,
  PriceCreateParams,
  PriceEvaluateParams,
  PriceEvaluateResponse,
  PriceListParams,
  PriceUpdateParams,
  Prices,
  PricesPage,
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
Orb.CouponsPage = CouponsPage;
Orb.CreditNotes = CreditNotes;
Orb.CreditNotesPage = CreditNotesPage;
Orb.Customers = Customers;
Orb.CustomersPage = CustomersPage;
Orb.Events = Events;
Orb.InvoiceLineItems = InvoiceLineItems;
Orb.Invoices = Invoices;
Orb.InvoicesPage = InvoicesPage;
Orb.Items = Items;
Orb.ItemsPage = ItemsPage;
Orb.Metrics = Metrics;
Orb.BillableMetricsPage = BillableMetricsPage;
Orb.Plans = Plans;
Orb.PlansPage = PlansPage;
Orb.Prices = Prices;
Orb.PricesPage = PricesPage;
Orb.SubscriptionsPage = SubscriptionsPage;
Orb.SubscriptionFetchScheduleResponsesPage = SubscriptionFetchScheduleResponsesPage;
Orb.Alerts = Alerts;
Orb.AlertsPage = AlertsPage;
Orb.DimensionalPriceGroupsPage = DimensionalPriceGroupsPage;
export declare namespace Orb {
  export type RequestOptions = Core.RequestOptions;

  export import Page = Pagination.Page;
  export { type PageParams as PageParams, type PageResponse as PageResponse };

  export { TopLevel as TopLevel, type TopLevelPingResponse as TopLevelPingResponse };

  export {
    Coupons as Coupons,
    type Coupon as Coupon,
    CouponsPage as CouponsPage,
    type CouponCreateParams as CouponCreateParams,
    type CouponListParams as CouponListParams,
  };

  export {
    CreditNotes as CreditNotes,
    type CreditNote as CreditNote,
    CreditNotesPage as CreditNotesPage,
    type CreditNoteCreateParams as CreditNoteCreateParams,
    type CreditNoteListParams as CreditNoteListParams,
  };

  export {
    Customers as Customers,
    type Customer as Customer,
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
    type Invoice as Invoice,
    type InvoiceFetchUpcomingResponse as InvoiceFetchUpcomingResponse,
    InvoicesPage as InvoicesPage,
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
    type Price as Price,
    type PriceEvaluateResponse as PriceEvaluateResponse,
    PricesPage as PricesPage,
    type PriceCreateParams as PriceCreateParams,
    type PriceUpdateParams as PriceUpdateParams,
    type PriceListParams as PriceListParams,
    type PriceEvaluateParams as PriceEvaluateParams,
  };

  export {
    type Subscriptions as Subscriptions,
    type Subscription as Subscription,
    type SubscriptionUsage as SubscriptionUsage,
    type SubscriptionCreateResponse as SubscriptionCreateResponse,
    type SubscriptionCancelResponse as SubscriptionCancelResponse,
    type SubscriptionFetchCostsResponse as SubscriptionFetchCostsResponse,
    type SubscriptionFetchScheduleResponse as SubscriptionFetchScheduleResponse,
    type SubscriptionPriceIntervalsResponse as SubscriptionPriceIntervalsResponse,
    type SubscriptionSchedulePlanChangeResponse as SubscriptionSchedulePlanChangeResponse,
    type SubscriptionTriggerPhaseResponse as SubscriptionTriggerPhaseResponse,
    type SubscriptionUnscheduleCancellationResponse as SubscriptionUnscheduleCancellationResponse,
    type SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse as SubscriptionUnscheduleFixedFeeQuantityUpdatesResponse,
    type SubscriptionUnschedulePendingPlanChangesResponse as SubscriptionUnschedulePendingPlanChangesResponse,
    type SubscriptionUpdateFixedFeeQuantityResponse as SubscriptionUpdateFixedFeeQuantityResponse,
    type SubscriptionUpdateTrialResponse as SubscriptionUpdateTrialResponse,
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
    type SubscriptionSchedulePlanChangeParams as SubscriptionSchedulePlanChangeParams,
    type SubscriptionTriggerPhaseParams as SubscriptionTriggerPhaseParams,
    type SubscriptionUnscheduleFixedFeeQuantityUpdatesParams as SubscriptionUnscheduleFixedFeeQuantityUpdatesParams,
    type SubscriptionUpdateFixedFeeQuantityParams as SubscriptionUpdateFixedFeeQuantityParams,
    type SubscriptionUpdateTrialParams as SubscriptionUpdateTrialParams,
  };

  export {
    Alerts as Alerts,
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

  export {
    type DimensionalPriceGroups as DimensionalPriceGroups,
    type DimensionalPriceGroup as DimensionalPriceGroup,
    DimensionalPriceGroupsPage as DimensionalPriceGroupsPage,
    type DimensionalPriceGroupCreateParams as DimensionalPriceGroupCreateParams,
    type DimensionalPriceGroupListParams as DimensionalPriceGroupListParams,
  };

  export type AddCreditLedgerEntryRequest = API.AddCreditLedgerEntryRequest;
  export type AddCreditTopUpRequest = API.AddCreditTopUpRequest;
  export type AddSubscriptionAdjustmentParams = API.AddSubscriptionAdjustmentParams;
  export type AddSubscriptionPriceParams = API.AddSubscriptionPriceParams;
  export type AmountDiscount = API.AmountDiscount;
  export type BillingCycleRelativeDate = API.BillingCycleRelativeDate;
  export type CreateCustomerAlertRequest = API.CreateCustomerAlertRequest;
  export type Discount = API.Discount;
  export type InvoiceLevelDiscount = API.InvoiceLevelDiscount;
  export type PaginationMetadata = API.PaginationMetadata;
  export type PercentageDiscount = API.PercentageDiscount;
  export type RemoveSubscriptionAdjustmentParams = API.RemoveSubscriptionAdjustmentParams;
  export type RemoveSubscriptionPriceParams = API.RemoveSubscriptionPriceParams;
  export type ReplaceSubscriptionAdjustmentParams = API.ReplaceSubscriptionAdjustmentParams;
  export type ReplaceSubscriptionPriceParams = API.ReplaceSubscriptionPriceParams;
  export type TrialDiscount = API.TrialDiscount;
  export type UpdatePriceRequestParams = API.UpdatePriceRequestParams;
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
