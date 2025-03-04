package com.tms.backend.services;

import com.tms.backend.entities.Organization;
import com.tms.backend.entities.Tournament;
import com.tms.backend.repositories.TournamentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TournamentService {

    private final TournamentRepository tournamentRepository;

    public TournamentService(TournamentRepository tournamentRepository) {
        this.tournamentRepository = tournamentRepository;
    }

    public List<Tournament> findAll() {
        return tournamentRepository.findAll();
    }

    public Tournament findById(Long id) {
        return tournamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tournament not found with id: " + id));
    }

    public List<Tournament> findAllByOrganizer(Organization organization) {
        return tournamentRepository.findAllByOrganizer(organization);
    }

    public Tournament create(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    public Tournament update(Long id, Tournament tournamentDetails) {
        Tournament tournament = findById(id);
        tournament.setName(tournamentDetails.getName());
        tournament.setOrganizer(tournamentDetails.getOrganizer());
        return tournamentRepository.save(tournament);
    }

    public void delete(Long id) {
        Tournament tournament = findById(id);
        tournamentRepository.delete(tournament);
    }
}