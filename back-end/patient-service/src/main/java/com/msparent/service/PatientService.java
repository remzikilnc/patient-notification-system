package com.msparent.service;

import com.msparent.dto.patient.PatientSearchCriteria;
import com.msparent.model.Contact;
import com.msparent.model.Patient;
import com.msparent.repository.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final RabbitTemplate rabbitTemplate;

    /*    public Page<Patient> searchPatients(String searchTerm, Pageable pageable) {
        return patientRepository.search(searchTerm, pageable);
    }*/
    /*public List<Patient> getPatients() {
        return patientRepository.findAll();
    }*/


    public Page<Patient> searchPatients(PatientSearchCriteria criteria, Pageable pageable) {
        return patientRepository.searchCriteria(criteria.getSearch(), criteria.getName(), criteria.getSurname(), criteria.getAgeFrom(), criteria.getAgeTo(), criteria.getGender(), pageable);
    }

    public Patient createPatient(Patient patient) {
        Patient savedPatient = patientRepository.save(patient);

        if (savedPatient.getNotificationTypes() != null) {
            sendPatientCreatedMessage(savedPatient.getId().toString());
        }

        //we can handle with PostPersist & PostUpdate

        return savedPatient;
    }

    public Patient getPatient(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    public Patient updatePatient(Patient patient) {
        return patientRepository.save(patient);
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

    public void removeContact(Patient patient, Contact contact) {
        patient.getContacts().remove(contact);
        patientRepository.save(patient);
    }

    private void sendPatientCreatedMessage(String patientId) {
        rabbitTemplate.convertAndSend("patientQueue", patientId);
        System.out.println("Patient created message sent to RabbitMQ: " + patientId);
    }
}
