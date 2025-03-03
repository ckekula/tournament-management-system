package com.tms.backend.repositories;

import com.tms.backend.entities.Tournament;
import com.tms.backend.entities.Organization;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {
    List<Tournament> findAllByOrganizer(Organization organization);
}