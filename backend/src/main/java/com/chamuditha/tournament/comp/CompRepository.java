package com.chamuditha.tournament.comp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface CompRepository extends JpaRepository<Comp, Integer>, JpaSpecificationExecutor<Comp> {
    @Query("""
            SELECT comp
            FROM Comp comp
            WHERE comp.organizer.id != :userId
            """)
    Page<Comp> findAllDisplayableComps(Pageable pageable, Integer userId);
}