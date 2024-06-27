package com.msparent.config;

import com.msparent.model.patient.PatientDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = "PATIENT-SERVICE", path = "api/v1/patients")
public interface PatientClient {

    @GetMapping("/{id}")
    PatientDTO getPatientById(@PathVariable("id") Long id);
}
