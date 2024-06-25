package com.msparent.repository;

import com.msparent.model.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PatientRepositoryCustom {
    Page<Patient> findPatientsByCriteria(String name, String surname, Integer age, Pageable pageable);
}
