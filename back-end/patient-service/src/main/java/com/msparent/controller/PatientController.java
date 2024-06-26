package com.msparent.controller;

import com.msparent.dto.PatientRequest;
import com.msparent.dto.PatientResponse;
import com.msparent.dto.PatientSearchCriteria;
import com.msparent.dto.ResponseWrapper;
import com.msparent.mapper.PatientMapper;
import com.msparent.model.Patient;
import com.msparent.repository.PatientRepository;
import com.msparent.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import jakarta.ws.rs.NotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Page;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/v1/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;
    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

/*    @GetMapping
    public Page<Patient> getPatients(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageLimit", defaultValue = "10") int pageLimit
    ) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageLimit);
        return patientService.searchPatients(search, pageable);
    }*/

    @GetMapping
    public ResponseWrapper<List<Patient>> index(PatientSearchCriteria criteria) {
        Sort.Direction direction = Sort.Direction.fromString(criteria.getSort()[1]);
        Pageable pageable = PageRequest.of(criteria.getPageNumber() - 1, criteria.getPageLimit(), Sort.by(direction, criteria.getSort()[0]));
        Page<Patient> page = patientService.searchPatients(criteria, pageable);

        ResponseWrapper.Meta meta = new ResponseWrapper.Meta(
                page.getTotalPages(),
                page.getNumber() + 1,
                page.getTotalElements(),
                page.isFirst(),
                page.isLast(),
                page.getSize(),
                page.isEmpty()
        );

        return new ResponseWrapper<>(meta, page.getContent());
    }

    @GetMapping("/{id}")
    public PatientResponse show(@PathVariable Long id) {
        Patient patient = patientService.getPatient(id);

        if (patient == null) {
            throw new NotFoundException("Patient not found");
        }

        return patientMapper.mapToResponse(patient);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PatientResponse store(@Valid @RequestBody PatientRequest patientRequest) {
        Patient patient = patientMapper.mapToEntity(new Patient(), patientRequest);
        Patient savedPatient = patientRepository.save(patient);
        return patientMapper.mapToResponse(savedPatient);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!patientRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found");
        }
        patientRepository.deleteById(id);
    }
}
