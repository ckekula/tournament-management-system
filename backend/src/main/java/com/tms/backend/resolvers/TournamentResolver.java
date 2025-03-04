package com.tms.backend.resolvers;

import com.tms.backend.entities.Organization;
import com.tms.backend.entities.Tournament;
import com.tms.backend.services.TournamentService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TournamentResolver implements GraphQLQueryResolver, GraphQLMutationResolver {

    private final TournamentService tournamentService;

    public TournamentResolver(TournamentService tournamentService) {
        this.tournamentService = tournamentService;
    }

    public List<Tournament> getAllTournaments() {
        return tournamentService.findAll();
    }

    public Tournament getTournamentById(Long id) {
        return tournamentService.findById(id);
    }

    public List<Tournament> getTournamentsByOrganizer(Organization organization) {
        return tournamentService.findAllByOrganizer(organization);
    }

    public Tournament createTournament(String name, Organization organizer, Integer year, String status) {
        Tournament tournament = new Tournament();
        tournament.setName(name);
        tournament.setOrganizer(organizer);
        tournament.setYear(year);
        return tournamentService.create(tournament);
    }

    public Tournament updateTournament(Long id, String name, Organization organizer, Integer year, String status) {
        Tournament tournamentDetails = new Tournament();
        tournamentDetails.setName(name);
        tournamentDetails.setOrganizer(organizer);
        tournamentDetails.setYear(year);
        return tournamentService.update(id, tournamentDetails);
    }

    public boolean deleteTournament(Long id) {
        tournamentService.delete(id);
        return true;
    }
}
