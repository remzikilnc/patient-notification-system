package com.msparent.mapper;

import com.msparent.dto.patient.PatientRequest;
import com.msparent.dto.patient.PatientResponse;
import com.msparent.model.Patient;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PatientMapper implements Mapper<PatientRequest, Patient, PatientResponse> {
    @Override
    public Patient mapToEntity(Patient patient, PatientRequest request) {
        patient.setName(request.getName());
        patient.setSurname(request.getSurname());
        patient.setGender(request.getGender());
        patient.setBirthdate(request.getBirthdate());
        patient.setNotificationTypes(request.getNotificationTypes());
        patient.setIdentifiers(request.getIdentifiers());
        patient.setContacts(request.getContacts());
        return patient;
    }

    @Override
    public PatientResponse mapToResponse(Patient patient) {
        return PatientResponse.builder()
                .id(patient.getId())
                .name(patient.getName())
                .surname(patient.getSurname())
                .birthdate(patient.getBirthdate())
                .age(patient.getAge())
                .gender(patient.getGender())
                .notificationTypes(patient.getNotificationTypes())
                .identifiers(patient.getIdentifiers())
                .build();
    }

    public PatientResponse mapToResponseWithContacts(Patient patient) {
        return PatientResponse.builder()
                .id(patient.getId())
                .name(patient.getName())
                .surname(patient.getSurname())
                .birthdate(patient.getBirthdate())
                .age(patient.getAge())
                .gender(patient.getGender())
                .notificationTypes(patient.getNotificationTypes())
                .identifiers(patient.getIdentifiers())
                .contacts(patient.getContacts())
                .build();
    }

    @Override
    public List<PatientResponse> mapToResponse(List<Patient> patients) {
        return patients.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<PatientResponse> mapToResponseWithContacts(List<Patient> patients) {
        return patients.stream()
                .map(this::mapToResponseWithContacts)
                .collect(Collectors.toList());
    }
}
