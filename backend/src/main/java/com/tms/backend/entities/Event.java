package com.tms.backend.entities;

import jakarta.persistence.*;

import java.util.List;

public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;

    @OneToMany(mappedBy = "stage")
    private List<Stage> stages;

    @OneToMany(mappedBy = "group")
    private List<Group> groups;
}
