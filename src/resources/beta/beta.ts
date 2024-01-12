// File generated from our OpenAPI spec by Stainless.

import { APIResource } from 'orb-billing/resource';
import * as PriceAPI from 'orb-billing/resources/beta/price';

export class Beta extends APIResource {
  price: PriceAPI.Price = new PriceAPI.Price(this._client);
}

export namespace Beta {
  export import Price = PriceAPI.Price;
  export import EvaluatePriceGroup = PriceAPI.EvaluatePriceGroup;
  export import PriceEvaluateResponse = PriceAPI.PriceEvaluateResponse;
  export import PriceEvaluateParams = PriceAPI.PriceEvaluateParams;
}
