package com.nocountry.ecommerce.infrastructure.adapter.input.rest;

import com.nocountry.ecommerce.domain.model.FormRequest;
import com.nocountry.ecommerce.domain.ports.in.FormRequestServicePort;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.FormRequestRequest;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.FormRequestResponse;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.mapper.FormRequestRestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/form-requests")
@RequiredArgsConstructor
public class FormRequestController {

    private final FormRequestServicePort formRequestServicePort;
    private final FormRequestRestMapper formRequestRestMapper;

    @PostMapping
    public ResponseEntity<FormRequestResponse> createFormRequest(
            @RequestBody @Validated FormRequestRequest request) {
        FormRequest domain = formRequestRestMapper.toDomain(request);
        FormRequest created = formRequestServicePort.createFormRequest(domain);
        return new ResponseEntity<>(formRequestRestMapper.toResponse(created), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FormRequestResponse>> getAllFormRequests() {
        List<FormRequestResponse> responses = formRequestServicePort.getAllFormRequests().stream()
                .map(formRequestRestMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormRequestResponse> getFormRequestById(@PathVariable Long id) {
        return formRequestServicePort.getFormRequestById(id)
                .map(formRequestRestMapper::toResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormRequest(@PathVariable Long id) {
        formRequestServicePort.deleteFormRequest(id);
        return ResponseEntity.noContent().build();
    }
}
