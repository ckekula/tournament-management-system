package com.tms.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Tournament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private Organization organizer;

    @Column(nullable = false)
    private Integer year;

    @OneToMany(mappedBy = "tournament")
    private Set<Activity> activities;
}
