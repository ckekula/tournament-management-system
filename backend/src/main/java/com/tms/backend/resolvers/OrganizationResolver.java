package com.tms.backend.resolvers;

import com.tms.backend.entities.Organization;
import com.tms.backend.services.OrganizationService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrganizationResolver implements GraphQLQueryResolver, GraphQLMutationResolver {

    private final OrganizationService organizationService;

    public OrganizationResolver(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    // Query: Get all organizations
    public List<Organization> organizations() {
        return organizationService.getAllOrganizations();
    }

    // Query: Get a specific organization by ID
    public Organization organization(Long id) {
        return organizationService.getOrganizationById(id);
    }

    // Mutation: Create a new organization
    public Organization createOrganization(String name, String abbreviation, String image) {
        Organization organization = new Organization();
        organization.setName(name);
        organization.setAbbreviation(abbreviation);
        organization.setImage(image);
        return organizationService.createOrganization(organization);
    }

    // Mutation: Update an existing organization
    public Organization updateOrganization(Long id, String name, String abbreviation, String image) {
        Organization updatedOrganization = new Organization();
        updatedOrganization.setName(name);
        updatedOrganization.setAbbreviation(abbreviation);
        updatedOrganization.setImage(image);
        return organizationService.updateOrganization(id, updatedOrganization);
    }

    // Mutation: Delete an organization
    public Boolean deleteOrganization(Long id) {
        organizationService.deleteOrganization(id);
        return true;
    }
}
