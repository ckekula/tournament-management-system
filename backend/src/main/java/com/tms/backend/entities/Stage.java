package com.tms.backend.entities;

import jakarta.persistence.*;

public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private Format format;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    public enum Format {
        GROUP, SINGLE_ELIMINATION, DOUBLE_ELIMINATION, ROUND_ROBIN
    }
}
