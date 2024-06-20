package com.chamuditha.tournament.comp;

import com.chamuditha.tournament.common.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("comps")
@RequiredArgsConstructor
@Tag(name = "Comp")
public class CompController {

    private final CompService service;

    @PostMapping
    public ResponseEntity<Integer> saveComp(
            @Valid @RequestBody CompRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping("/{comp-id}")
    public ResponseEntity<CompResponse> findCompById(
            @PathVariable("comp-id") Integer compId
    ) {
        return ResponseEntity.ok(service.findById(compId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<CompResponse>> findAllComps(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllComps(page, size, connectedUser));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<CompResponse>> findAllCompsByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllCompsByOwner(page, size, connectedUser));
    }

    @PostMapping(value = "/cover/{comp-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadCompBannerPicture(
            @PathVariable("comp-id") Integer compId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ) {
        service.uploadCompBannerPicture(file, connectedUser, compId);
        return ResponseEntity.accepted().build();
    }

}
