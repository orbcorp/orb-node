// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { castToError, Headers } from './core';

export class OrbError extends Error {}

export class APIError<
  TStatus extends number | undefined = number | undefined,
  THeaders extends Headers | undefined = Headers | undefined,
  TError extends Object | undefined = Object | undefined,
> extends OrbError {
  /** HTTP status for the response that caused the error */
  readonly status: TStatus;
  /** HTTP headers for the response that caused the error */
  readonly headers: THeaders;
  /** JSON body of the response that caused the error */
  readonly error: TError;

  constructor(status: TStatus, error: TError, message: string | undefined, headers: THeaders) {
    super(`${APIError.makeMessage(status, error, message)}`);
    this.status = status;
    this.headers = headers;
    this.error = error;
  }

  private static makeMessage(status: number | undefined, error: any, message: string | undefined) {
    const msg =
      error?.message ?
        typeof error.message === 'string' ?
          error.message
        : JSON.stringify(error.message)
      : error ? JSON.stringify(error)
      : message;

    if (status && msg) {
      return `${status} ${msg}`;
    }
    if (status) {
      return `${status} status code (no body)`;
    }
    if (msg) {
      return msg;
    }
    return '(no status code or body)';
  }

  static generate(
    status: number | undefined,
    errorResponse: Object | undefined,
    message: string | undefined,
    headers: Headers | undefined,
  ): APIError {
    if (!status || !headers) {
      return new APIConnectionError({ message, cause: castToError(errorResponse) });
    }

    const error = errorResponse as Record<string, any>;

    const type = error?.['type'];

    if (
      type === 'https://docs.withorb.com/reference/error-responses#400-constraint-violation' &&
      status === 400
    ) {
      return new ConstraintViolation(status, error, message, headers);
    }

    if (
      type === 'https://docs.withorb.com/reference/error-responses#400-duplicate-resource-creation' &&
      status === 400
    ) {
      return new DuplicateResourceCreation(status, error, message, headers);
    }

    if (
      type === 'https://docs.withorb.com/reference/error-responses#404-feature-not-available' &&
      status === 400
    ) {
      return new FeatureNotAvailable(status, error, message, headers);
    }

    if (
      type === 'https://docs.withorb.com/reference/error-responses#400-request-validation-errors' &&
      status === 400
    ) {
      return new RequestValidationError(status, error, message, headers);
    }

    if (
      type === 'https://docs.withorb.com/reference/error-responses#401-authentication-error' &&
      status === 401
    ) {
      return new OrbAuthenticationError(status, error, message, headers);
    }

    if (
      type === 'https://docs.withorb.com/reference/error-responses#404-resource-not-found' &&
      status === 404
    ) {
      return new ResourceNotFound(status, error, message, headers);
    }

    if (type === 'https://docs.withorb.com/reference/error-responses#404-url-not-found' && status === 404) {
      return new URLNotFound(status, error, message, headers);
    }

    if (
      type === 'https://docs.withorb.com/reference/error-responses#409-resource-conflict' &&
      status === 409
    ) {
      return new ResourceConflict(status, error, message, headers);
    }

    if (
      type === 'https://docs.withorb.com/reference/error-responses#413-request-too-large' &&
      status === 413
    ) {
      return new RequestTooLarge(status, error, message, headers);
    }

    if (
      type === 'https://docs.withorb.com/reference/error-responses#413-resource-too-large' &&
      status === 413
    ) {
      return new ResourceTooLarge(status, error, message, headers);
    }

    if (
      type === 'https://docs.withorb.com/reference/error-responses#429-too-many-requests' &&
      status === 429
    ) {
      return new TooManyRequests(status, error, message, headers);
    }

    if (
      type === 'https://docs.withorb.com/reference/error-responses#500-internal-server-error' &&
      status === 500
    ) {
      return new OrbInternalServerError(status, error, message, headers);
    }

    if (status === 400) {
      return new BadRequestError(status, error, message, headers);
    }

    if (status === 401) {
      return new AuthenticationError(status, error, message, headers);
    }

    if (status === 403) {
      return new PermissionDeniedError(status, error, message, headers);
    }

    if (status === 404) {
      return new NotFoundError(status, error, message, headers);
    }

    if (status === 409) {
      return new ConflictError(status, error, message, headers);
    }

    if (status === 422) {
      return new UnprocessableEntityError(status, error, message, headers);
    }

    if (status === 429) {
      return new RateLimitError(status, error, message, headers);
    }

    if (status >= 500) {
      return new InternalServerError(status, error, message, headers);
    }

    return new APIError(status, error, message, headers);
  }
}

export class APIUserAbortError extends APIError<undefined, undefined, undefined> {
  constructor({ message }: { message?: string } = {}) {
    super(undefined, undefined, message || 'Request was aborted.', undefined);
  }
}

export class APIConnectionError extends APIError<undefined, undefined, undefined> {
  constructor({ message, cause }: { message?: string | undefined; cause?: Error | undefined }) {
    super(undefined, undefined, message || 'Connection error.', undefined);
    // in some environments the 'cause' property is already declared
    // @ts-ignore
    if (cause) this.cause = cause;
  }
}

export class APIConnectionTimeoutError extends APIConnectionError {
  constructor({ message }: { message?: string } = {}) {
    super({ message: message ?? 'Request timed out.' });
  }
}

export class BadRequestError extends APIError<400, Headers> {}

export class AuthenticationError extends APIError<401, Headers> {}

export class PermissionDeniedError extends APIError<403, Headers> {}

export class NotFoundError extends APIError<404, Headers> {}

export class ConflictError extends APIError<409, Headers> {}

export class UnprocessableEntityError extends APIError<422, Headers> {}

export class RateLimitError extends APIError<429, Headers> {}

export class InternalServerError extends APIError<number, Headers> {}

export class ConstraintViolation extends BadRequestError {
  override status: 400;

  type: 'https://docs.withorb.com/reference/error-responses#400-constraint-violation';

  detail?: string | null;

  title?: string | null;

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.status = data?.['status'];
    this.type = data?.['type'];
    this.detail = data?.['detail'];
    this.title = data?.['title'];
  }
}

export class DuplicateResourceCreation extends BadRequestError {
  override status: 400;

  type: 'https://docs.withorb.com/reference/error-responses#400-duplicate-resource-creation';

  detail?: string | null;

  title?: string | null;

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.status = data?.['status'];
    this.type = data?.['type'];
    this.detail = data?.['detail'];
    this.title = data?.['title'];
  }
}

export class FeatureNotAvailable extends BadRequestError {
  override status: 400;

  type: 'https://docs.withorb.com/reference/error-responses#404-feature-not-available';

  detail?: string | null;

  title?: string | null;

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.status = data?.['status'];
    this.type = data?.['type'];
    this.detail = data?.['detail'];
    this.title = data?.['title'];
  }
}

export class RequestValidationError extends BadRequestError {
  override status: 400;

  type: 'https://docs.withorb.com/reference/error-responses#400-request-validation-errors';

  validation_errors: Array<unknown>;

  detail?: string | null;

  title?: string | null;

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.status = data?.['status'];
    this.type = data?.['type'];
    this.validation_errors = data?.['validation_errors'] ?? [];
    this.detail = data?.['detail'];
    this.title = data?.['title'];
  }
}

export class OrbAuthenticationError extends AuthenticationError {
  override status: 401;

  type: 'https://docs.withorb.com/reference/error-responses#401-authentication-error';

  detail?: string | null;

  title?: string | null;

  constructor(status: 401, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.status = data?.['status'];
    this.type = data?.['type'];
    this.detail = data?.['detail'];
    this.title = data?.['title'];
  }
}

export class ResourceNotFound extends NotFoundError {
  override status: 404;

  title: string;

  type: 'https://docs.withorb.com/reference/error-responses#404-resource-not-found';

  detail?: string | null;

  constructor(status: 404, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.status = data?.['status'];
    this.title = data?.['title'];
    this.type = data?.['type'];
    this.detail = data?.['detail'];
  }
}

export class URLNotFound extends NotFoundError {
  override status: 404;

  type: 'https://docs.withorb.com/reference/error-responses#404-url-not-found';

  detail?: string | null;

  title?: string | null;

  constructor(status: 404, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.status = data?.['status'];
    this.type = data?.['type'];
    this.detail = data?.['detail'];
    this.title = data?.['title'];
  }
}

export class ResourceConflict extends ConflictError {
  override status: 409;

  type: 'https://docs.withorb.com/reference/error-responses#409-resource-conflict';

  detail?: string | null;

  title?: string | null;

  constructor(status: 409, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.status = data?.['status'];
    this.type = data?.['type'];
    this.detail = data?.['detail'];
    this.title = data?.['title'];
  }
}

export class RequestTooLarge extends APIError {
  override status: 413;

  type: 'https://docs.withorb.com/reference/error-responses#413-request-too-large';

  detail?: string | null;

  title?: string | null;

  constructor(status: 413, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.status = data?.['status'];
    this.type = data?.['type'];
    this.detail = data?.['detail'];
    this.title = data?.['title'];
  }
}

export class ResourceTooLarge extends APIError {
  override status: 413;

  type: 'https://docs.withorb.com/reference/error-responses#413-resource-too-large';

  detail?: string | null;

  title?: string | null;

  constructor(status: 413, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.status = data?.['status'];
    this.type = data?.['type'];
    this.detail = data?.['detail'];
    this.title = data?.['title'];
  }
}

export class TooManyRequests extends RateLimitError {
  override status: 429;

  type: 'https://docs.withorb.com/reference/error-responses#429-too-many-requests';

  detail?: string | null;

  title?: string | null;

  constructor(status: 429, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.status = data?.['status'];
    this.type = data?.['type'];
    this.detail = data?.['detail'];
    this.title = data?.['title'];
  }
}

export class OrbInternalServerError extends InternalServerError {
  override status: 500;

  type: 'https://docs.withorb.com/reference/error-responses#500-internal-server-error';

  detail?: string | null;

  title?: string | null;

  constructor(status: 500, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.status = data?.['status'];
    this.type = data?.['type'];
    this.detail = data?.['detail'];
    this.title = data?.['title'];
  }
}
