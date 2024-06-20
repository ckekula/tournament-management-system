/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseCompResponse } from '../../models/page-response-comp-response';

export interface FindAllCompsByOwner$Params {
  page?: number;
  size?: number;
}

export function findAllCompsByOwner(http: HttpClient, rootUrl: string, params?: FindAllCompsByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCompResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllCompsByOwner.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseCompResponse>;
    })
  );
}

findAllCompsByOwner.PATH = '/comps/owner';
