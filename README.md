# Orb TypeScript API Library

[![NPM version](https://img.shields.io/npm/v/orb-billing.svg)](https://npmjs.org/package/orb-billing)

This library provides convenient access to the Orb REST API from server-side TypeScript or JavaScript.

The API documentation can be found [here](https://www.withorb.com/https://docs.withorb.com/reference/api-reference).

## Installation

```sh
npm install --save orb-billing
# or
yarn add orb-billing
```

## Usage

The full API of this library can be found in [api.md](https://www.github.com/orbcorp/orb-node/blob/main/api.md).

```js
import Orb from 'orb-billing';

const orb = new Orb({
  apiKey: 'My API Key', // defaults to process.env["ORB_API_KEY"]
});

async function main() {
  const customer = await orb.customers.create({ email: 'example-customer@withorb.com', name: 'My Customer' });

  console.log(customer.id);
}

main();
```

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

```ts
import Orb from 'orb-billing';

const orb = new Orb({
  apiKey: 'My API Key', // defaults to process.env["ORB_API_KEY"]
});

async function main() {
  const params: Orb.CustomerCreateParams = { email: 'example-customer@withorb.com', name: 'My Customer' };
  const customer: Orb.Customer = await orb.customers.create(params);
}

main();
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

```ts
async function main() {
  const customer = await orb.customers
    .create({ email: 'example-customer@withorb.com', name: 'My Customer' })
    .catch((err) => {
      if (err instanceof Orb.APIError) {
        console.log(err.status); // 400
        console.log(err.name); // BadRequestError
        console.log(err.headers); // {server: 'nginx', ...}
      } else {
        throw err;
      }
    });
}

main();
```

Error codes are as followed:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const orb = new Orb({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await orb.customers.create({ email: 'example-customer@withorb.com', name: 'My Customer' }, {
  maxRetries: 5,
});
```

### Timeouts

Requests time out after 1 minute by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const orb = new Orb({
  timeout: 20 * 1000, // 20 seconds (default is 1 minute)
});

// Override per-request:
await orb.customers.create({ email: 'example-customer@withorb.com', name: 'My Customer' }, {
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Auto-pagination

List methods in the Orb API are paginated.
You can use `for await … of` syntax to iterate through items across all pages:

```ts
async function fetchAllCoupons(params) {
  const allCoupons = [];
  // Automatically fetches more pages as needed.
  for await (const coupon of orb.coupons.list()) {
    allCoupons.push(coupon);
  }
  return allCoupons;
}
```

Alternatively, you can make request a single page at a time:

```ts
let page = await orb.coupons.list();
for (const coupon of page.data) {
  console.log(coupon);
}

// Convenience methods are provided for manually paginating:
while (page.hasNextPage()) {
  page = page.getNextPage();
  // ...
}
```

## Advanced Usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.

```ts
const orb = new Orb();

const response = await orb.customers
  .create({ email: 'example-customer@withorb.com', name: 'My Customer' })
  .asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: customer, response: raw } = await orb.customers
  .create({ email: 'example-customer@withorb.com', name: 'My Customer' })
  .withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(customer.id);
```

## Customizing the fetch client

By default, this library uses `node-fetch` in Node, and expects a global `fetch` function in other environments.

If you would prefer to use a global, web-standards-compliant `fetch` function even in a Node environment,
(for example, if you are running Node with `--experimental-fetch` or using NextJS which polyfills with `undici`),
add the following import before your first import `from "Orb"`:

<!-- prettier-ignore -->
```ts
// Tell TypeScript and the package to use the global web fetch instead of node-fetch.
// Note, despite the name, this does not add any polyfills, but expects them to be provided if needed.
import "orb-billing/shims/web";
import Orb from "orb-billing";
```

To do the inverse, add `import "orb-billing/shims/node"` (which does import polyfills).
This can also be useful if you are getting the wrong TypeScript types for `Response` - more details [here](https://github.com/orbcorp/orb-node/src/_shims#readme).

You may also provide a custom `fetch` function when instantiating the client,
which can be used to inspect or alter the `Request` or `Response` before/after each request:

```ts
import { fetch } from 'undici'; // as one example
import Orb from 'orb-billing';

const client = new Orb({
  fetch: (url: RequestInfo, init?: RequestInfo): Response => {
    console.log('About to make request', url, init);
    const response = await fetch(url, init);
    console.log('Got response', response);
    return response;
  },
});
```

Note that if given a `DEBUG=true` environment variable, this library will log all requests and responses automatically.
This is intended for debugging purposes only and may change in the future without notice.

## Configuring an HTTP(S) Agent (e.g., for proxies)

By default, this library uses a stable agent for all http/https requests to reuse TCP connections, eliminating many TCP & TLS handshakes and shaving around 100ms off most requests.

If you would like to disable or customize this behavior, for example to use the API behind a proxy, you can pass an `httpAgent` which is used for all requests (be they http or https), for example:

<!-- prettier-ignore -->
```ts
import http from 'http';
import HttpsProxyAgent from 'https-proxy-agent';

// Configure the default for all requests:
const orb = new Orb({
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
});

// Override per-request:
await orb.customers.create({ email: 'example-customer@withorb.com', name: 'My Customer' }, {
  baseURL: 'http://localhost:8080/test-api',
  httpAgent: new http.Agent({ keepAlive: false }),
})
```

## Semantic Versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals)_.
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/orbcorp/orb-node/issues) with questions, bugs, or suggestions.

## Requirements

TypeScript >= 4.5 is supported.

The following runtimes are supported:

- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher, using `import Orb from "npm:orb-billing"`.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.
