import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CompetitionQueries } from '../queries/competition.query';
import { CompetitionMutations } from '../mutations/competition.mutation';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  constructor(private apollo: Apollo) {}

  createCompetition(
    name: string,
    year: number,
    startDate: string,
    organizationId: string
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: CompetitionMutations.CREATE_COMPETITION,
      variables: { name, year, startDate, organizationId },
    });
  }

  updateCompetition(
    id: string,
    name: string,
    year: number,
    startDate: string,
    organizationId: string
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: CompetitionMutations.UPDATE_COMPETITION,
      variables: { id, name, year, startDate, organizationId },
    });
  }

  deleteCompetition(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: CompetitionMutations.DELETE_COMPETITION,
      variables: { id },
    });
  }

  getCompetitionById(id: string): Observable<any> {
    return this.apollo.query({
      query: CompetitionQueries.GET_COMPETITION_BY_ID,
      variables: { id },
    });
  }

  getCompetitionsByOrganizer(organizationId: string): Observable<any> {
    return this.apollo.query({
      query: CompetitionQueries.GET_COMPETITIONS_BY_ORGANIZER,
      variables: { organizationId },
    });
  }

  getAllCompetitions(): Observable<any> {
    return this.apollo.query({
      query: CompetitionQueries.GET_ALL_COMPETITIONS,
    });
  }
}