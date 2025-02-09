package com.tms.backend.resolvers;

import com.tms.backend.entities.Organization;
import com.tms.backend.services.OrganizationService;
import com.tms.backend.user.User;

import graphql.kickstart.tools.GraphQLMutationResolver;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.lang.Nullable;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrganizationResolver implements GraphQLQueryResolver, GraphQLMutationResolver {

    private final OrganizationService organizationService;

    public OrganizationResolver(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    // Query: Get all organizations
    public List<Organization> getAllOrganizations() {
        return organizationService.getAllOrganizations();
    }

    // Query: Get a specific organization by ID
    public Organization getOrganizationById(Long id) {
        return organizationService.getOrganizationById(id);
    }

    // Mutation: Create a new organization
    public Organization createOrganization(String name, String abbreviation, @Nullable String image) {
        try {
            // Get the current authenticated user
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            // Add debug logging
            System.out.println("Creating organization with name: " + name +
                    ", abbreviation: " + abbreviation +
                    ", image: " + (image != null ? "present" : "null"));

            Organization organization = Organization.builder()
                    .name(name)
                    .abbreviation(abbreviation)
                    .image(image)
                    .manager(currentUser)
                    .build();

            return organizationService.createOrganization(organization);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error creating organization: " + e.getMessage());
        }
    }

    public Organization updateOrganization(Long id, String name, String abbreviation, String image) {
        Organization updatedOrganization = new Organization();
        updatedOrganization.setName(name);
        updatedOrganization.setAbbreviation(abbreviation);
        updatedOrganization.setImage(image);
        return organizationService.updateOrganization(id, updatedOrganization);
    }

    public Boolean deleteOrganization(Long id) {
        organizationService.deleteOrganization(id);
        return true;
    }
}
