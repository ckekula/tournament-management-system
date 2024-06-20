package com.chamuditha.tournament.comp;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompResponse {
    private Integer id;
    private String name;
    private String host;
    private String prevHost;
    private String prevWinner;
    private byte[] banner;
    private String organizer;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
