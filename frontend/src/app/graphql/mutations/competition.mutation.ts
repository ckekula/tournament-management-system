import { gql } from 'apollo-angular';

export const CompetitionMutations = {
	CREATE_COMPETITION: gql`
		mutation CreateCompetition(
			$name: String!,
			$year: Int!,
			$startDate: String!,
			$organizationId: String!
		) {
			createCompetition(
				name: $name,
				year: $year,
				startDate: $startDate,
				organizationId: $organizationId
			) {
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

	UPDATE_COMPETITION: gql`
		mutation UpdateCompetition(
			$id: String!,
			$name: String!,
			$year: Int!,
			$startDate: String!,
			$organizationId: String!
		) {
			updateCompetition(
				id: $id,
				name: $name,
				year: $year,
				startDate: $startDate,
				organizationId: $organizationId
			) {
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

	DELETE_COMPETITION: gql`
		mutation DeleteCompetition($id: String!) {
			deleteCompetition(id: $id)
		}
	`
};