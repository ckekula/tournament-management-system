import { gql } from 'apollo-angular';

export const CompetitionQueries = {
  GET_COMPETITION_BY_ID: gql`
    query GetCompetition($id: String!) {
      competition(id: $id) {
        id
        name
        year
        startDate
        organization {
          id
          name
          abbreviation
        }
      }
    }
  `,

  GET_COMPETITIONS_BY_ORGANIZER: gql`
    query GetCompetitionsByOrganizer($organizationId: String!) {
      competitionsByOrganizer(organizationId: $organizationId) {
        id
        name
        year
        startDate
        organization {
          id
          name
          abbreviation
        }
      }
    }
  `,

  GET_ALL_COMPETITIONS: gql`
    query GetAllCompetitions {
      competitions {
        id
        name
        year
        startDate
        organization {
          id
          name
          abbreviation
        }
      }
    }
  `
};