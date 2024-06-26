package com.msparent.service;

import com.msparent.dto.PatientSearchCriteria;
import com.msparent.model.Patient;
import com.msparent.repository.PatientRepository;
import com.msparent.repository.PatientRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }

/*    public Page<Patient> searchPatients(String searchTerm, Pageable pageable) {
        return patientRepository.search(searchTerm, pageable);
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

    public Patient getPatient(Long id) {
        return patientRepository.findById(id).orElse(null);
    }
}
