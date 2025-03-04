package com.tms.backend.entities;

import jakarta.persistence.*;

import java.util.Set;

public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    @ManyToMany
    @JoinTable(
            name = "team_participants",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "participant_id")
    )
    private Set<Participant> participants;
}
