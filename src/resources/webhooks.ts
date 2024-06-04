// File generated from our OpenAPI spec by Stainless.

import { APIResource } from 'orb-billing/resource';
import { createHmac } from 'node:crypto';
import { debug, getRequiredHeader, HeadersLike } from 'orb-billing/core';

export class Webhooks extends APIResource {
  /**
   * Validates that the given payload was sent by Orb and parses the payload.
   *
   * An error will be raised if the webhook payload was not sent by Orb.
   */
  unwrap(
    payload: string,
    headers: HeadersLike,
    secret: string | undefined | null = this._client.webhookSecret,
  ): Object {
    this.verifySignature(payload, headers, secret);
    return JSON.parse(payload);
  }

  private parseSecret(secret: string | null | undefined): Uint8Array {
    if (!secret) {
      throw new Error(
        "The webhook secret must either be set using the env var, ORB_WEBHOOK_SECRET, on the client class, Orb({ webhookSecret: '123' }), or passed to this function",
      );
    }

    const buf = Buffer.from(secret, 'utf-8');
    if (buf.toString('utf-8') !== secret) {
      throw new Error(`Given secret is not valid`);
    }

    return new Uint8Array(buf);
  }

  private signPayload(payload: string, { timestamp, secret }: { timestamp: string; secret: Uint8Array }) {
    const encoder = new TextEncoder();
    const toSign = encoder.encode(`v1:${timestamp}:${payload}`);

    const hmac = createHmac('sha256', secret);
    hmac.update(toSign);

    return `v1=${hmac.digest('hex')}`;
  }

  /** Make an assertion, if not `true`, then throw. */
  private assert(expr: unknown, msg = ''): asserts expr {
    if (!expr) {
      throw new Error(msg);
    }
  }

  /** Compare to array buffers or data views in a way that timing based attacks
   * cannot gain information about the platform. */
  private timingSafeEqual(
    a: ArrayBufferView | ArrayBufferLike | DataView,
    b: ArrayBufferView | ArrayBufferLike | DataView,
  ): boolean {
    if (a.byteLength !== b.byteLength) {
      return false;
    }
    if (!(a instanceof DataView)) {
      a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
    }
    if (!(b instanceof DataView)) {
      b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
    }
    this.assert(a instanceof DataView);
    this.assert(b instanceof DataView);
    const length = a.byteLength;
    let out = 0;
    let i = -1;
    while (++i < length) {
      out |= a.getUint8(i) ^ b.getUint8(i);
    }
    return out === 0;
  }

  /**
   * Validates whether or not the webhook payload was sent by Orb.
   *
   * An error will be raised if the webhook payload was not sent by Orb.
   */
  verifySignature(
    body: string,
    headers: HeadersLike,
    secret: string | undefined | null = this._client.webhookSecret,
  ): void {
    const whsecret = this.parseSecret(secret);

    const msgTimestamp = getRequiredHeader(headers, 'X-Orb-Timestamp');
    const msgSignature = getRequiredHeader(headers, 'X-Orb-Signature');

    const nowSeconds = Math.floor(Date.now() / 1000);
    // The timestamp header does not include a timezone (it is UTC by default)
    const timezoneSuffix = msgTimestamp.includes('Z') || msgTimestamp.includes('+') ? '' : 'Z'
    const timestamp = new Date(msgTimestamp + timezoneSuffix);
    const timestampSeconds = Math.floor(timestamp.getTime() / 1000);
    if (isNaN(timestampSeconds)) {
      throw new Error('Invalid timestamp header');
    }

    const webhookToleranceInSeconds = 5 * 60; // 5 minutes
    if (nowSeconds - timestampSeconds > webhookToleranceInSeconds) {
      throw new Error('Webhook timestamp is too old');
    }

    if (timestampSeconds > nowSeconds + webhookToleranceInSeconds) {
      console.warn({ timestampSeconds, nowSeconds, webhookToleranceInSeconds });
      throw new Error('Webhook timestamp is too new');
    }

    if (typeof body !== 'string') {
      throw new Error(
        'Webhook body must be passed as the raw JSON string sent from the server (do not parse it first).',
      );
    }

    const computedSignature = this.signPayload(body, { timestamp: msgTimestamp, secret: whsecret });
    const expectedSignature = computedSignature.split('=')[1];

    const passedSignatures = msgSignature.split(' ');

    const encoder = new globalThis.TextEncoder();
    for (const versionedSignature of passedSignatures) {
      const [version, signature] = versionedSignature.split('=');
      debug('verifySignature', { version, signature, expectedSignature, computedSignature });

      if (version !== 'v1') {
        continue;
      }

      if (this.timingSafeEqual(encoder.encode(signature), encoder.encode(expectedSignature))) {
        // valid!
        return;
      }
    }

    throw new Error('None of the given webhook signatures match the expected signature');
  }
}
