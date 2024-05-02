// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Errors from './error';
import * as Uploads from './uploads';
import { Orb } from './client';

export { Orb };
export default Orb;

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

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

export * from './client';
