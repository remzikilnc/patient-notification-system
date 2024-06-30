package com.msparent.service;

import com.msparent.config.PatientClient;
import com.msparent.model.Criteria;
import com.msparent.model.TargetPatients;
import com.msparent.model.patient.Patient;
import com.msparent.repository.TargetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientListenerService {


    private final PatientClient patientClient;
    private final TargetRepository targetRepository;
    private final CriteriaService criteriaService;

    @RabbitListener(queues = "patientQueue")
    public void handleNewPatient(String patientId) {
        Patient patient = patientClient.getPatientById(Long.parseLong(patientId));

        if (patient != null) {
            checkCriteria(patient);
        }
    }

    public void checkCriteria(Patient patient) {
        List<Criteria> matchedCriterias = criteriaService.checkIsCriteriaMet(patient.getGender(), patient.getAge());
        for (Criteria criteria : matchedCriterias) {
            Optional<TargetPatients> existingTargetPatient = targetRepository.findByPatientIdAndCriteriaId(patient.getId(), criteria.getId());

            if (!existingTargetPatient.isPresent()) {
                targetRepository.save(TargetPatients.builder()
                        .criteria(criteria)
                        .patientId(patient.getId())
                        .patientName(patient.getName())
                        .patientSurname(patient.getSurname())
                        .patientEmail(patient.getEmail())
                        .patientPhoneNumber(patient.getPhoneNumber())
                        .notificationTypes(patient.getNotificationTypes())
                        .build());
            }
        }
    }
}
