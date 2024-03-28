// File generated from our OpenAPI spec by Stainless.

import Orb from 'orb-billing';

const orb = new Orb({
  apiKey: 'My Orb API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource webhooks', () => {
  const payload = `{"id": "o4mmewpfNNTnjfZc", "created_at": "2024-03-27T15:42:29+00:00", "type": "resource_event.test", "properties": {"message": "A test webhook from Orb. Happy testing!"}}`;
  const signature = '9d25de966891ab0bc18754faf8d83d0980b44ae330fcc130b41a6cf3daf1f391';
  const timestamp = '2024-03-27T15:42:29.551';
  const headers = {
    'X-Orb-Timestamp': timestamp,
    'X-Orb-Signature': `v1=${signature}`,
  };
  const secret = 'c-UGKYdnhHh436B_sMouYAPUvXyWpzOdunZBV5dFSD8';
  const fakeNow = new Date(timestamp).getTime();

  beforeEach(() => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => fakeNow);
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  describe('unwrap', () => {
    it('deserializes the payload object', () => {
      orb.webhooks.unwrap(payload, headers, secret);
    });
  });

  describe('verifySignature', () => {
    it('should pass for valid signature', () => {
      orb.webhooks.verifySignature(payload, headers, secret);
    });

    it('should throw for timestamp outside threshold', () => {
      jest.spyOn(global.Date, 'now').mockImplementation(() => fakeNow + 360000); // 6 minutes
      expect(() => orb.webhooks.verifySignature(payload, headers, secret)).toThrowErrorMatchingInlineSnapshot(
        `"Webhook timestamp is too old"`,
      );

      jest.spyOn(global.Date, 'now').mockImplementation(() => fakeNow - 360000); // 6 minutes
      expect(() => orb.webhooks.verifySignature(payload, headers, secret)).toThrowErrorMatchingInlineSnapshot(
        `"Webhook timestamp is too new"`,
      );
    });

    it('should throw for invalid signature', () => {
      expect(() => orb.webhooks.verifySignature(payload, headers, `foo`)).toThrowErrorMatchingInlineSnapshot(
        `"None of the given webhook signatures match the expected signature"`,
      );
    });

    it('should pass for multiple signatures', () => {
      const invalidSignature = 'my-invalid-signature';
      orb.webhooks.verifySignature(
        payload,
        {
          ...headers,
          'X-Orb-Signature': `v1=${invalidSignature} v1=${signature}`,
        },
        secret,
      );
    });

    it('should throw for different signature version', () => {
      expect(() =>
        orb.webhooks.verifySignature(
          payload,
          {
            ...headers,
            'X-Orb-Signature': `v2=${signature}`,
          },

          secret,
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        `"None of the given webhook signatures match the expected signature"`,
      );
    });

    it('should pass for multiple signatures with different version', () => {
      orb.webhooks.verifySignature(
        payload,
        {
          ...headers,
          'X-Orb-Signature': `v2=${signature} v1=${signature}`,
        },
        secret,
      );
    });

    it('should throw if signature version is missing', () => {
      expect(() =>
        orb.webhooks.verifySignature(
          payload,
          {
            ...headers,
            'X-Orb-Signature': signature,
          },

          secret,
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        `"None of the given webhook signatures match the expected signature"`,
      );
    });

    it('should throw if payload is not a string', () => {
      expect(() =>
        orb.webhooks.verifySignature({ payload: 'not a string' } as any, headers, secret),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Webhook body must be passed as the raw JSON string sent from the server (do not parse it first)."`,
      );
    });
  });
});
