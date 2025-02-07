package com.tms.backend.repositories;

import com.tms.backend.entities.Competition;
import com.tms.backend.entities.Organization;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompetitionRepository extends JpaRepository<Competition, Long> {
    List<Competition> findAllByOrganizer(Organization organization);
}