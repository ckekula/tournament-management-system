import { gql } from 'apollo-angular';

export const OrganizationQueries = {
  GET_ORGANIZATION_BY_ID: gql`
    query GetOrganization($id: String!) {
      organization(id: $id) {
        id
        name
        abbreviation
        image
      }
    }
  `
};