package com.tms.backend.entities;

import jakarta.persistence.*;

import java.util.List;

public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Round round;

    @OneToMany(mappedBy = "team")
    private List<Team> matchTeams;

    @OneToMany(mappedBy = "team")
    private List<Participant> matchParticipants;
}
