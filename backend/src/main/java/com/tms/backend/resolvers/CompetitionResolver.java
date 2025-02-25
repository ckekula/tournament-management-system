package com.tms.backend.resolvers;

import com.tms.backend.entities.Competition;
import com.tms.backend.entities.Organization;
import com.tms.backend.services.CompetitionService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CompetitionResolver implements GraphQLQueryResolver, GraphQLMutationResolver {

    private final CompetitionService competitionService;

    public CompetitionResolver(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    public List<Competition> getAllCompetitions() {
        return competitionService.findAll();
    }

    public Competition getCompetitionById(Long id) {
        return competitionService.findById(id);
    }

    public List<Competition> getCompetitionsByOrganizer(Organization organization) {
        return competitionService.findAllByOrganizer(organization);
    }

    public Competition createCompetition(String name, Organization organizer, Integer year, String status) {
        Competition competition = new Competition();
        competition.setName(name);
        competition.setOrganizer(organizer);
        competition.setYear(year);
        return competitionService.create(competition);
    }

    public Competition updateCompetition(Long id, String name, Organization organizer, Integer year, String status) {
        Competition competitionDetails = new Competition();
        competitionDetails.setName(name);
        competitionDetails.setOrganizer(organizer);
        competitionDetails.setYear(year);
        return competitionService.update(id, competitionDetails);
    }

    public boolean deleteCompetition(Long id) {
        competitionService.delete(id);
        return true;
    }
}
