package com.chamuditha.tournament.comp;

import com.chamuditha.tournament.common.BaseEntity;
import com.chamuditha.tournament.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Comp extends BaseEntity {

    private String name;
    private String host;
    private String banner;

    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private User organizer;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
