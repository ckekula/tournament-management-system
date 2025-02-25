package com.tms.backend.services;

import com.tms.backend.entities.Organization;
import com.tms.backend.repositories.OrganizationRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    @Transactional
    public Organization createOrganization(Organization organization) {
        try {
            if (organization.getOwner() == null) {
                throw new IllegalArgumentException("Organization owner cannot be null");
            }

            return organizationRepository.save(organization);
        } catch (Exception e) {
            throw e;
        }
    }

    public Organization updateOrganization(Long id, Organization updatedOrganization) {
        Organization organization = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found with id: " + id));
        organization.setName(updatedOrganization.getName());
        organization.setAbbreviation(updatedOrganization.getAbbreviation());
        organization.setImage(updatedOrganization.getImage());
        return organizationRepository.save(organization);
    }

    public void deleteOrganization(Long id) {
        if (!organizationRepository.existsById(id)) {
            throw new RuntimeException("Organization not found with id: " + id);
        }
        organizationRepository.deleteById(id);
    }

    public Organization getOrganizationById(Long id) {
        return organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found with id: " + id));
    }

    public List<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }
}
