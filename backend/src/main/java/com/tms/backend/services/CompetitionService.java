package com.tms.backend.services;

import com.tms.backend.entities.Competition;
import com.tms.backend.entities.Organization;
import com.tms.backend.repositories.CompetitionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitionService {

    private final CompetitionRepository competitionRepository;

    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }

    public List<Competition> findAll() {
        return competitionRepository.findAll();
    }

    public Competition findById(Long id) {
        return competitionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Competition not found with id: " + id));
    }

    public List<Competition> findAllByOrganizer(Organization organization) {
        return competitionRepository.findAllByOrganizer(organization);
    }

    public Competition create(Competition competition) {
        return competitionRepository.save(competition);
    }

    public Competition update(Long id, Competition competitionDetails) {
        Competition competition = findById(id);
        competition.setName(competitionDetails.getName());
        competition.setOrganizer(competitionDetails.getOrganizer());
        return competitionRepository.save(competition);
    }

    public void delete(Long id) {
        Competition competition = findById(id);
        competitionRepository.delete(competition);
    }
}
