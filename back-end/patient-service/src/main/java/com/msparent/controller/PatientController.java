package com.msparent.controller;

import com.msparent.dto.StatusResponse;
import com.msparent.dto.contact.ContactRequest;
import com.msparent.dto.contact.ContactResponse;
import com.msparent.dto.patient.PatientRequest;
import com.msparent.dto.patient.PatientResponse;
import com.msparent.dto.patient.PatientSearchCriteria;
import com.msparent.dto.ResponseWrapper;
import com.msparent.mapper.ContactMapper;
import com.msparent.mapper.PatientMapper;
import com.msparent.model.Contact;
import com.msparent.model.Patient;
import com.msparent.service.ContactService;
import com.msparent.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private final PatientMapper patientMapper;
    private final ContactMapper contactMapper;
    private final ContactService contactService;

/*    @GetMapping
    public Page<Patient> getPatients(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageLimit", defaultValue = "10") int pageLimit
    ) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageLimit);
        return patientService.searchPatients(search, pageable);
    }*/
    @GetMapping("/ok")
    public ResponseEntity<StatusResponse> ok() {
        return ResponseEntity.ok(StatusResponse.builder().status("OK").message("Patient service is up and running").build());
    }

    @GetMapping
    @Cacheable(value = "patients", key = "#criteria")
    public ResponseWrapper<List<PatientResponse>> index(PatientSearchCriteria criteria) {
        Sort.Direction direction = Sort.Direction.fromString(criteria.getSort()[1]);
        Pageable pageable = PageRequest.of(criteria.getPageNumber() - 1, criteria.getPageLimit(), Sort.by(direction, criteria.getSort()[0]));
        Page<Patient> page = patientService.searchPatients(criteria, pageable);

        ResponseWrapper.Meta meta = ResponseWrapper.Meta.builder()
                .last_page(page.getTotalPages())
                .current_page(page.getNumber() + 1)
                .totalElements(page.getTotalElements())
                .first(page.isFirst())
                .last(page.isLast())
                .size(page.getSize())
                .empty(page.isEmpty())
                .build();

        List<PatientResponse> patientResponses;
        if (criteria.isContacts())  patientResponses = patientMapper.mapToResponseWithContacts(page.getContent());
        else patientResponses = patientMapper.mapToResponse(page.getContent());
        return new ResponseWrapper<>(meta, patientResponses);
    }

    @GetMapping("/{id}")
    public PatientResponse show(@PathVariable Long id, @RequestParam(value = "contacts", required = false, defaultValue = "false") boolean contacts) {
        Patient patient = patientService.getPatient(id);

        if (patient == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found");
        }

        if (contacts) {
            return patientMapper.mapToResponseWithContacts(patient);
        }

        return patientMapper.mapToResponse(patient);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PatientResponse store(@Valid @RequestBody PatientRequest patientRequest) {
        Patient patient = patientMapper.mapToEntity(new Patient(), patientRequest);
        Patient savedPatient = patientService.createPatient(patient);
        return patientMapper.mapToResponse(savedPatient);
    }

    @PutMapping("/{id}")
    public PatientResponse update(@PathVariable Long id, @Valid @RequestBody PatientRequest patientRequest) {
        Patient patient = patientService.getPatient(id);

        if (patient == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found");
        }

        patient = patientMapper.mapToEntity(patient, patientRequest);
        Patient updatedPatient = patientService.updatePatient(patient);

        return patientMapper.mapToResponse(updatedPatient);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void destroy(@PathVariable Long id) {
        if (!patientService.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found");
        }
        patientService.deletePatientById(id);
    }

    @PostMapping("/{id}/contacts")
    @ResponseStatus(HttpStatus.CREATED)
    public ContactResponse storeContact(@PathVariable Long id, @Valid @RequestBody ContactRequest contactRequest) {
        Patient patient = patientService.getPatient(id);

        if (patient == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found");
        }

        Contact contact = contactMapper.mapToEntity(new Contact(), contactRequest);
        contact.setPatient(patient);
        Contact savedContact = contactService.createContact(contact);
        patientService.addContact(patient, savedContact);

        return contactMapper.mapToResponse(contact);
    }

    @PutMapping("/{id}/contacts/{contactId}")
    public ContactResponse updateContact(@PathVariable Long id, @PathVariable Long contactId, @Valid @RequestBody ContactRequest contactRequest) {
        Patient patient = patientService.getPatient(id);

        if (patient == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found");
        }

        Contact contact = contactService.getContact(contactId);

        if (contact == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Contact not found");
        }

        contact = contactMapper.mapToEntity(contact, contactRequest);
        Contact updatedContact = contactService.updateContact(contact);

        return contactMapper.mapToResponse(updatedContact);
    }

    @DeleteMapping("/{id}/contacts/{contactId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void destroyContact(@PathVariable Long id, @PathVariable Long contactId) {
        Patient patient = patientService.getPatient(id);

        if (patient == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found");
        }

        Contact contact = contactService.getContact(contactId);

        if (contact == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Contact not found");
        }

        contactService.deleteContact(contact);
    }
}
