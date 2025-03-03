package com.tms.backend.entities;

import com.tms.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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

    @OneToOne
    @JoinColumn(name = "owner_id", nullable = false, unique = true)
    private User owner;

    @ManyToMany(mappedBy = "adminOf")
    private List<User> admins;

    @OneToMany(mappedBy = "organizer")
    private List<Tournament> tournaments;
}
