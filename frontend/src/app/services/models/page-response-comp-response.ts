/* tslint:disable */
/* eslint-disable */
import { CompResponse } from '../models/comp-response';
export interface PageResponseCompResponse {
  content?: Array<CompResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
