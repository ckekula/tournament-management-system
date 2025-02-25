import { gql } from 'apollo-angular';

export const OrganizationMutations = {
  CREATE_ORGANIZATION: gql`
    mutation CreateOrganization($name: String!, $abbreviation: String!, $image: String) {
      createOrganization(name: $name, abbreviation: $abbreviation, image: $image) {
        id
        name
        abbreviation
        image
      }
    }
  `,
  
  UPDATE_ORGANIZATION: gql`
    mutation UpdateOrganization($id: String!, $name: String!, $abbreviation: String!, $image: String) {
      updateOrganization(id: $id, name: $name, abbreviation: $abbreviation, image: $image) {
        id
        name
        abbreviation
        image
      }
    }
  `,
  
  DELETE_ORGANIZATION: gql`
    mutation DeleteOrganization($id: String!) {
      deleteOrganization(id: $id)
    }
  `,
};