package com.msparent.service;

import com.msparent.config.PatientClient;
import com.msparent.model.Criteria;
import com.msparent.model.TargetPatients;
import com.msparent.model.patient.Patient;
import com.msparent.repository.TargetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final PatientClient patientClient;
    private final CriteriaService criteriaService;
    private final TargetRepository targetRepository;

    @RabbitListener(queues = "patientQueue")
    public void handleNewPatient(String patientId) {
        Patient patient = patientClient.getPatientById(Long.parseLong(patientId));

        if (patient != null) {
            this.checkCriteria(patient);
        }
    }


    //todo: implement the logic to send the notification
    public void sendNotification() {

    }

    public void checkCriteria(Patient patient) {
        List<Criteria> matchedCriterias = criteriaService.checkIsCriteriaMet(patient.getGender(), patient.getAge());
        log.info("Checking criteria for patient: " + patient.getId());
        for (Criteria criteria : matchedCriterias) {
            log.info("Criteria matched: " + criteria.getId());
            Optional<TargetPatients> existingTargetPatient = targetRepository.findByPatientIdAndCriteriaId(patient.getId(), criteria.getId());

            if (existingTargetPatient.isPresent()) {
                log.info("Target patient already exists for patientId: " + patient.getId() + " and criteriaId: " + criteria.getId());
            } else {
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
