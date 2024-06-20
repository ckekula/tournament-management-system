/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CompResponse } from '../models/comp-response';
import { findAllComps } from '../fn/comp/find-all-comps';
import { FindAllComps$Params } from '../fn/comp/find-all-comps';
import { findAllCompsByOwner } from '../fn/comp/find-all-comps-by-owner';
import { FindAllCompsByOwner$Params } from '../fn/comp/find-all-comps-by-owner';
import { findCompById } from '../fn/comp/find-comp-by-id';
import { FindCompById$Params } from '../fn/comp/find-comp-by-id';
import { PageResponseCompResponse } from '../models/page-response-comp-response';
import { saveComp } from '../fn/comp/save-comp';
import { SaveComp$Params } from '../fn/comp/save-comp';
import { uploadCompBannerPicture } from '../fn/comp/upload-comp-banner-picture';
import { UploadCompBannerPicture$Params } from '../fn/comp/upload-comp-banner-picture';

@Injectable({ providedIn: 'root' })
export class CompService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllComps()` */
  static readonly FindAllCompsPath = '/comps';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllComps()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllComps$Response(params?: FindAllComps$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCompResponse>> {
    return findAllComps(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllComps$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllComps(params?: FindAllComps$Params, context?: HttpContext): Observable<PageResponseCompResponse> {
    return this.findAllComps$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCompResponse>): PageResponseCompResponse => r.body)
    );
  }

  /** Path part for operation `saveComp()` */
  static readonly SaveCompPath = '/comps';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveComp()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveComp$Response(params: SaveComp$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveComp(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveComp$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveComp(params: SaveComp$Params, context?: HttpContext): Observable<number> {
    return this.saveComp$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadCompBannerPicture()` */
  static readonly UploadCompBannerPicturePath = '/comps/cover/{comp-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadCompBannerPicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadCompBannerPicture$Response(params: UploadCompBannerPicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadCompBannerPicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadCompBannerPicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadCompBannerPicture(params: UploadCompBannerPicture$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadCompBannerPicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `findCompById()` */
  static readonly FindCompByIdPath = '/comps/{comp-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCompById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCompById$Response(params: FindCompById$Params, context?: HttpContext): Observable<StrictHttpResponse<CompResponse>> {
    return findCompById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCompById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCompById(params: FindCompById$Params, context?: HttpContext): Observable<CompResponse> {
    return this.findCompById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CompResponse>): CompResponse => r.body)
    );
  }

  /** Path part for operation `findAllCompsByOwner()` */
  static readonly FindAllCompsByOwnerPath = '/comps/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCompsByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCompsByOwner$Response(params?: FindAllCompsByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCompResponse>> {
    return findAllCompsByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllCompsByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCompsByOwner(params?: FindAllCompsByOwner$Params, context?: HttpContext): Observable<PageResponseCompResponse> {
    return this.findAllCompsByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCompResponse>): PageResponseCompResponse => r.body)
    );
  }

}
