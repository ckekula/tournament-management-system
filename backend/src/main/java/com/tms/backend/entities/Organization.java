package com.tms.backend.entities;

import com.tms.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String abbreviation;

    @Column(nullable = true)
    private String image;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false, unique = true)
    private User owner;

    @ManyToMany(mappedBy = "adminOf")
    private Set<User> admins;

    @OneToMany(mappedBy = "organizer")
    private Set<Tournament> tournaments;

    @OneToMany(mappedBy = "organization")
    private Set<Team> teams;

    @OneToMany(mappedBy = "organization")
    private Set<Participant> participants;
}
