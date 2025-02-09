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
    @JoinColumn(name = "manager_id", nullable = false)
    private User manager;

    // @ManyToMany(mappedBy = "memberOrganizations")
    // private List<User> members;

    @OneToMany(mappedBy = "organizer")
    private List<Competition> competitions;
}
