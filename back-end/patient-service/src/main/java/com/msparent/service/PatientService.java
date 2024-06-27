package com.msparent.service;

import com.msparent.dto.patient.PatientSearchCriteria;
import com.msparent.model.Contact;
import com.msparent.model.Patient;
import com.msparent.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    /*    public Page<Patient> searchPatients(String searchTerm, Pageable pageable) {
        return patientRepository.search(searchTerm, pageable);
    }*/
    /*public List<Patient> getPatients() {
        return patientRepository.findAll();
    }*/


    public Page<Patient> searchPatients(PatientSearchCriteria criteria, Pageable pageable) {
        return patientRepository.searchCriteria(
                criteria.getSearch(),
                criteria.getName(),
                criteria.getSurname(),
                criteria.getAgeFrom(),
                criteria.getAgeTo(),
                criteria.getGender(),
                pageable
        );
    }
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient getPatient(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    public void deletePatientById(Long id) {
        patientRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return patientRepository.existsById(id);
    }

    public void addContact(Patient patient, Contact savedContact) {
        patient.getContacts().add(savedContact);
        patientRepository.save(patient);
    }
}
