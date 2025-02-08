import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { OrganizationQueries } from '../queries/organization.query';
import { OrganizationMutations } from '../mutations/organization.mutation';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private apollo: Apollo) {}

  createOrganization(variables: { name: string; abbreviation: string; image?: string }): Observable<any> {
    return this.apollo.mutate({
      mutation: OrganizationMutations.CREATE_ORGANIZATION,
      variables,
    });
  }  

  updateOrganization(id: string, name: string, abbreviation: string, image?: string): Observable<any> {
    return this.apollo.mutate({
      mutation: OrganizationMutations.UPDATE_ORGANIZATION,
      variables: { id, name, abbreviation, image },
    });
  }

  deleteOrganization(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: OrganizationMutations.DELETE_ORGANIZATION,
      variables: { id },
    });
  }

  getOrganizationById(id: string): Observable<any> {
    return this.apollo.query({
      query: OrganizationQueries.GET_ORGANIZATION_BY_ID,
      variables: { id },
    });
  }
}