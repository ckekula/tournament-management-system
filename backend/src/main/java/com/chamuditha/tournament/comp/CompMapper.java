package com.chamuditha.tournament.comp;

import com.chamuditha.tournament.file.FileUtils;
import org.springframework.stereotype.Service;

@Service
public class CompMapper {
    public Comp toComp(CompRequest request) {
        return Comp.builder()
                .id(request.id())
                .name(request.name())
                .host(request.host())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .build();
    }

    public CompResponse toCompResponse(Comp comp) {
        return CompResponse.builder()
                .id(comp.getId())
                .name(comp.getName())
                .host(comp.getHost())
                .banner(FileUtils.readFileFromLocation(comp.getBanner()))
                .startDate(comp.getStartDate())
                .startDate(comp.getEndDate())
                .organizer(comp.getOrganizer().fullName())
                .build();
    }
}
