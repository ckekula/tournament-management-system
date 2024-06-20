/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CompResponse } from '../../models/comp-response';

export interface FindCompById$Params {
  'comp-id': number;
}

export function findCompById(http: HttpClient, rootUrl: string, params: FindCompById$Params, context?: HttpContext): Observable<StrictHttpResponse<CompResponse>> {
  const rb = new RequestBuilder(rootUrl, findCompById.PATH, 'get');
  if (params) {
    rb.path('comp-id', params['comp-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CompResponse>;
    })
  );
}

findCompById.PATH = '/comps/{comp-id}';
