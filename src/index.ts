// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Errors from './error';
import * as Uploads from './uploads';
import { type Agent } from './_shims/index';
import * as qs from './internal/qs';
import * as Core from './core';
import * as Pagination from './pagination';
import * as API from './resources/index';

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
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

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
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
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
  alerts: API.Alerts = new API.Alerts(this);

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

export const {
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
} = Errors;

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

export namespace Orb {
  export type RequestOptions = Core.RequestOptions;

  export import Page = Pagination.Page;
  export type PageParams = Pagination.PageParams;
  export type PageResponse<T> = Pagination.PageResponse<T>;

  export import TopLevel = API.TopLevel;
  export type TopLevelPingResponse = API.TopLevelPingResponse;

  export import Coupons = API.Coupons;
  export type Coupon = API.Coupon;
  export import CouponsPage = API.CouponsPage;
  export type CouponCreateParams = API.CouponCreateParams;
  export type CouponListParams = API.CouponListParams;

  export import CreditNotes = API.CreditNotes;
  export type CreditNote = API.CreditNote;
  export import CreditNotesPage = API.CreditNotesPage;
  export type CreditNoteListParams = API.CreditNoteListParams;

  export import Customers = API.Customers;
  export type Customer = API.Customer;
  export import CustomersPage = API.CustomersPage;
  export type CustomerCreateParams = API.CustomerCreateParams;
  export type CustomerUpdateParams = API.CustomerUpdateParams;
  export type CustomerListParams = API.CustomerListParams;
  export type CustomerUpdateByExternalIDParams = API.CustomerUpdateByExternalIDParams;

  export import Events = API.Events;
  export type EventUpdateResponse = API.EventUpdateResponse;
  export type EventDeprecateResponse = API.EventDeprecateResponse;
  export type EventIngestResponse = API.EventIngestResponse;
  export type EventSearchResponse = API.EventSearchResponse;
  export type EventUpdateParams = API.EventUpdateParams;
  export type EventIngestParams = API.EventIngestParams;
  export type EventSearchParams = API.EventSearchParams;

  export import InvoiceLineItems = API.InvoiceLineItems;
  export type InvoiceLineItemCreateResponse = API.InvoiceLineItemCreateResponse;
  export type InvoiceLineItemCreateParams = API.InvoiceLineItemCreateParams;

  export import Invoices = API.Invoices;
  export type Invoice = API.Invoice;
  export type InvoiceFetchUpcomingResponse = API.InvoiceFetchUpcomingResponse;
  export import InvoicesPage = API.InvoicesPage;
  export type InvoiceCreateParams = API.InvoiceCreateParams;
  export type InvoiceUpdateParams = API.InvoiceUpdateParams;
  export type InvoiceListParams = API.InvoiceListParams;
  export type InvoiceFetchUpcomingParams = API.InvoiceFetchUpcomingParams;
  export type InvoiceIssueParams = API.InvoiceIssueParams;
  export type InvoiceMarkPaidParams = API.InvoiceMarkPaidParams;

  export import Items = API.Items;
  export type Item = API.Item;
  export import ItemsPage = API.ItemsPage;
  export type ItemCreateParams = API.ItemCreateParams;
  export type ItemUpdateParams = API.ItemUpdateParams;
  export type ItemListParams = API.ItemListParams;

  export import Metrics = API.Metrics;
  export type BillableMetric = API.BillableMetric;
  export import BillableMetricsPage = API.BillableMetricsPage;
  export type MetricCreateParams = API.MetricCreateParams;
  export type MetricUpdateParams = API.MetricUpdateParams;
  export type MetricListParams = API.MetricListParams;

  export import Plans = API.Plans;
  export type Plan = API.Plan;
  export import PlansPage = API.PlansPage;
  export type PlanCreateParams = API.PlanCreateParams;
  export type PlanUpdateParams = API.PlanUpdateParams;
  export type PlanListParams = API.PlanListParams;

  export import Prices = API.Prices;
  export type EvaluatePriceGroup = API.EvaluatePriceGroup;
  export type Price = API.Price;
  export type PriceEvaluateResponse = API.PriceEvaluateResponse;
  export import PricesPage = API.PricesPage;
  export type PriceCreateParams = API.PriceCreateParams;
  export type PriceUpdateParams = API.PriceUpdateParams;
  export type PriceListParams = API.PriceListParams;
  export type PriceEvaluateParams = API.PriceEvaluateParams;

  export import Subscriptions = API.Subscriptions;
  export type Subscription = API.Subscription;
  export type SubscriptionUsage = API.SubscriptionUsage;
  export type SubscriptionFetchCostsResponse = API.SubscriptionFetchCostsResponse;
  export type SubscriptionFetchScheduleResponse = API.SubscriptionFetchScheduleResponse;
  export import SubscriptionsPage = API.SubscriptionsPage;
  export import SubscriptionFetchScheduleResponsesPage = API.SubscriptionFetchScheduleResponsesPage;
  export type SubscriptionCreateParams = API.SubscriptionCreateParams;
  export type SubscriptionUpdateParams = API.SubscriptionUpdateParams;
  export type SubscriptionListParams = API.SubscriptionListParams;
  export type SubscriptionCancelParams = API.SubscriptionCancelParams;
  export type SubscriptionFetchCostsParams = API.SubscriptionFetchCostsParams;
  export type SubscriptionFetchScheduleParams = API.SubscriptionFetchScheduleParams;
  export type SubscriptionFetchUsageParams = API.SubscriptionFetchUsageParams;
  export type SubscriptionPriceIntervalsParams = API.SubscriptionPriceIntervalsParams;
  export type SubscriptionSchedulePlanChangeParams = API.SubscriptionSchedulePlanChangeParams;
  export type SubscriptionTriggerPhaseParams = API.SubscriptionTriggerPhaseParams;
  export type SubscriptionUnscheduleFixedFeeQuantityUpdatesParams =
    API.SubscriptionUnscheduleFixedFeeQuantityUpdatesParams;
  export type SubscriptionUpdateFixedFeeQuantityParams = API.SubscriptionUpdateFixedFeeQuantityParams;
  export type SubscriptionUpdateTrialParams = API.SubscriptionUpdateTrialParams;

  export import Alerts = API.Alerts;
  export type Alert = API.Alert;
  export import AlertsPage = API.AlertsPage;
  export type AlertUpdateParams = API.AlertUpdateParams;
  export type AlertListParams = API.AlertListParams;
  export type AlertCreateForCustomerParams = API.AlertCreateForCustomerParams;
  export type AlertCreateForExternalCustomerParams = API.AlertCreateForExternalCustomerParams;
  export type AlertCreateForSubscriptionParams = API.AlertCreateForSubscriptionParams;

  export type AmountDiscount = API.AmountDiscount;
  export type BillingCycleRelativeDate = API.BillingCycleRelativeDate;
  export type Discount = API.Discount;
  export type InvoiceLevelDiscount = API.InvoiceLevelDiscount;
  export type PaginationMetadata = API.PaginationMetadata;
  export type PercentageDiscount = API.PercentageDiscount;
  export type TrialDiscount = API.TrialDiscount;
}

export default Orb;
