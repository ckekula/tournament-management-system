/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseCompResponse } from '../../models/page-response-comp-response';

export interface FindAllComps$Params {
  page?: number;
  size?: number;
}

export function findAllComps(http: HttpClient, rootUrl: string, params?: FindAllComps$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCompResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllComps.PATH, 'get');
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

findAllComps.PATH = '/comps';
