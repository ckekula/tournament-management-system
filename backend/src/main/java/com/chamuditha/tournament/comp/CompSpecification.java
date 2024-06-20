package com.chamuditha.tournament.comp;

import org.springframework.data.jpa.domain.Specification;

public class CompSpecification {
    public static Specification<Comp> withOrganizerId(Integer organizerId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("organizer").get("id"), organizerId);
    }
}
