import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($name: String!, $abbreviation: String!, $image: String) {
    createOrganization(name: $name, abbreviation: $abbreviation, image: $image) {
      id
      name
      abbreviation
      image
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private apollo: Apollo) {}

  createOrganization(name: string, abbreviation: string, image?: string): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_ORGANIZATION,
      variables: { name, abbreviation, image },
    });
  }
}
