package com.chamuditha.tournament.comp;

import com.chamuditha.tournament.common.PageResponse;
import com.chamuditha.tournament.file.FileStorageService;
import com.chamuditha.tournament.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompService {

    private final CompRepository compRepository;
    private final CompMapper compMapper;
    private final FileStorageService fileStorageService;

    public Integer save(CompRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Comp comp = compMapper.toComp(request);
        comp.setOrganizer(user);
        return compRepository.save(comp).getId();
    }

    public CompResponse findById(Integer compId) {
        return compRepository.findById(compId)
                .map(compMapper::toCompResponse)
                .orElseThrow(() -> new EntityNotFoundException("No competition found with ID:: " + compId));
    }

    public PageResponse<CompResponse> findAllComps(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Comp> comps = compRepository.findAllDisplayableComps(pageable, user.getId());
        List<CompResponse> compsResponse = comps.stream()
                .map(compMapper::toCompResponse)
                .toList();
        return new PageResponse<>(
                compsResponse,
                comps.getNumber(),
                comps.getSize(),
                comps.getTotalElements(),
                comps.getTotalPages(),
                comps.isFirst(),
                comps.isLast()
        );
    }

    public PageResponse<CompResponse> findAllCompsByOwner(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Comp> comps = compRepository.findAll(CompSpecification.withOrganizerId(user.getId()), pageable);
        List<CompResponse> compsResponse = comps.stream()
                .map(compMapper::toCompResponse)
                .toList();
        return new PageResponse<>(
                compsResponse,
                comps.getNumber(),
                comps.getSize(),
                comps.getTotalElements(),
                comps.getTotalPages(),
                comps.isFirst(),
                comps.isLast()
        );
    }

    public void uploadCompBannerPicture(MultipartFile file, Authentication connectedUser, Integer compId) {
        Comp comp = compRepository.findById(compId)
                .orElseThrow(() -> new EntityNotFoundException("No competition found with ID:: " + compId));
        User user = ((User) connectedUser.getPrincipal());
        var banner = fileStorageService.saveFile(file, user.getId());
        comp.setBanner(banner);
        compRepository.save(comp);
    }
}
