package com.msparent.controller;

import com.msparent.dto.PatientRequest;
import com.msparent.dto.PatientResponse;
import com.msparent.mapper.PatientMapper;
import com.msparent.model.Patient;
import com.msparent.repository.PatientRepository;
import com.msparent.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import jakarta.ws.rs.NotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Page;

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
    public Page<Patient> getPatients(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "surname", required = false) String surname,
            @RequestParam(value = "age", required = false) Integer age,
            @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(value = "pageLimit", defaultValue = "10") int pageLimit) {
        Pageable pageable = PageRequest.of(pageNumber, pageLimit);
        return patientService.searchPatients(name, surname, age, pageable);
    }

    @GetMapping("/{id}")
    public PatientResponse getPatient(@PathVariable Long id) {
        Patient patient = patientService.getPatient(id);

        if (patient == null) {
            throw new NotFoundException("Patient not found");
        }

        return patientMapper.mapToResponse(patient);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PatientResponse createOwner(@Valid @RequestBody PatientRequest patientRequest) {
        Patient patient = patientMapper.mapToEntity(new Patient(), patientRequest);
        Patient savedPatient = patientRepository.save(patient);
        return patientMapper.mapToResponse(savedPatient);
    }
}
