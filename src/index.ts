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
  export import RequestOptions = Core.RequestOptions;

  export import Page = Pagination.Page;
  export import PageParams = Pagination.PageParams;
  export import PageResponse = Pagination.PageResponse;

  export import TopLevel = API.TopLevel;
  export import TopLevelPingResponse = API.TopLevelPingResponse;

  export import Coupons = API.Coupons;
  export import Coupon = API.Coupon;
  export import CouponsPage = API.CouponsPage;
  export import CouponCreateParams = API.CouponCreateParams;
  export import CouponListParams = API.CouponListParams;

  export import CreditNotes = API.CreditNotes;
  export import CreditNote = API.CreditNote;
  export import CreditNotesPage = API.CreditNotesPage;
  export import CreditNoteListParams = API.CreditNoteListParams;

  export import Customers = API.Customers;
  export import Customer = API.Customer;
  export import CustomersPage = API.CustomersPage;
  export import CustomerCreateParams = API.CustomerCreateParams;
  export import CustomerUpdateParams = API.CustomerUpdateParams;
  export import CustomerListParams = API.CustomerListParams;
  export import CustomerUpdateByExternalIDParams = API.CustomerUpdateByExternalIDParams;

  export import Events = API.Events;
  export import EventUpdateResponse = API.EventUpdateResponse;
  export import EventDeprecateResponse = API.EventDeprecateResponse;
  export import EventIngestResponse = API.EventIngestResponse;
  export import EventSearchResponse = API.EventSearchResponse;
  export import EventUpdateParams = API.EventUpdateParams;
  export import EventIngestParams = API.EventIngestParams;
  export import EventSearchParams = API.EventSearchParams;

  export import InvoiceLineItems = API.InvoiceLineItems;
  export import InvoiceLineItemCreateResponse = API.InvoiceLineItemCreateResponse;
  export import InvoiceLineItemCreateParams = API.InvoiceLineItemCreateParams;

  export import Invoices = API.Invoices;
  export import Invoice = API.Invoice;
  export import InvoiceFetchUpcomingResponse = API.InvoiceFetchUpcomingResponse;
  export import InvoicesPage = API.InvoicesPage;
  export import InvoiceCreateParams = API.InvoiceCreateParams;
  export import InvoiceUpdateParams = API.InvoiceUpdateParams;
  export import InvoiceListParams = API.InvoiceListParams;
  export import InvoiceFetchUpcomingParams = API.InvoiceFetchUpcomingParams;
  export import InvoiceIssueParams = API.InvoiceIssueParams;
  export import InvoiceMarkPaidParams = API.InvoiceMarkPaidParams;

  export import Items = API.Items;
  export import Item = API.Item;
  export import ItemsPage = API.ItemsPage;
  export import ItemCreateParams = API.ItemCreateParams;
  export import ItemUpdateParams = API.ItemUpdateParams;
  export import ItemListParams = API.ItemListParams;

  export import Metrics = API.Metrics;
  export import BillableMetric = API.BillableMetric;
  export import BillableMetricsPage = API.BillableMetricsPage;
  export import MetricCreateParams = API.MetricCreateParams;
  export import MetricUpdateParams = API.MetricUpdateParams;
  export import MetricListParams = API.MetricListParams;

  export import Plans = API.Plans;
  export import Plan = API.Plan;
  export import PlansPage = API.PlansPage;
  export import PlanCreateParams = API.PlanCreateParams;
  export import PlanUpdateParams = API.PlanUpdateParams;
  export import PlanListParams = API.PlanListParams;

  export import Prices = API.Prices;
  export import EvaluatePriceGroup = API.EvaluatePriceGroup;
  export import Price = API.Price;
  export import PriceEvaluateResponse = API.PriceEvaluateResponse;
  export import PricesPage = API.PricesPage;
  export import PriceCreateParams = API.PriceCreateParams;
  export import PriceUpdateParams = API.PriceUpdateParams;
  export import PriceListParams = API.PriceListParams;
  export import PriceEvaluateParams = API.PriceEvaluateParams;

  export import Subscriptions = API.Subscriptions;
  export import Subscription = API.Subscription;
  export import SubscriptionUsage = API.SubscriptionUsage;
  export import SubscriptionFetchCostsResponse = API.SubscriptionFetchCostsResponse;
  export import SubscriptionFetchScheduleResponse = API.SubscriptionFetchScheduleResponse;
  export import SubscriptionsPage = API.SubscriptionsPage;
  export import SubscriptionFetchScheduleResponsesPage = API.SubscriptionFetchScheduleResponsesPage;
  export import SubscriptionCreateParams = API.SubscriptionCreateParams;
  export import SubscriptionUpdateParams = API.SubscriptionUpdateParams;
  export import SubscriptionListParams = API.SubscriptionListParams;
  export import SubscriptionCancelParams = API.SubscriptionCancelParams;
  export import SubscriptionFetchCostsParams = API.SubscriptionFetchCostsParams;
  export import SubscriptionFetchScheduleParams = API.SubscriptionFetchScheduleParams;
  export import SubscriptionFetchUsageParams = API.SubscriptionFetchUsageParams;
  export import SubscriptionPriceIntervalsParams = API.SubscriptionPriceIntervalsParams;
  export import SubscriptionSchedulePlanChangeParams = API.SubscriptionSchedulePlanChangeParams;
  export import SubscriptionTriggerPhaseParams = API.SubscriptionTriggerPhaseParams;
  export import SubscriptionUnscheduleFixedFeeQuantityUpdatesParams = API.SubscriptionUnscheduleFixedFeeQuantityUpdatesParams;
  export import SubscriptionUpdateFixedFeeQuantityParams = API.SubscriptionUpdateFixedFeeQuantityParams;

  export import Alerts = API.Alerts;
  export import Alert = API.Alert;
  export import AlertsPage = API.AlertsPage;
  export import AlertUpdateParams = API.AlertUpdateParams;
  export import AlertListParams = API.AlertListParams;
  export import AlertCreateForCustomerParams = API.AlertCreateForCustomerParams;
  export import AlertCreateForExternalCustomerParams = API.AlertCreateForExternalCustomerParams;
  export import AlertCreateForSubscriptionParams = API.AlertCreateForSubscriptionParams;

  export import AmountDiscount = API.AmountDiscount;
  export import BillingCycleRelativeDate = API.BillingCycleRelativeDate;
  export import Discount = API.Discount;
  export import InvoiceLevelDiscount = API.InvoiceLevelDiscount;
  export import PaginationMetadata = API.PaginationMetadata;
  export import PercentageDiscount = API.PercentageDiscount;
  export import TrialDiscount = API.TrialDiscount;
}

export default Orb;
