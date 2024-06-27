package com.msparent.service;

import com.msparent.config.PatientClient;
import com.msparent.model.patient.NotificationType;
import com.msparent.model.patient.PatientDTO;
import com.msparent.repository.TargetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final PatientClient patientClient;
    private final CriteriaService criteriaService;
    private final TargetRepository targetRepository;

    @RabbitListener(queues = "patientQueue")
    public void handleNewPatient(String patientId) {
         log.info("New patient received: {}", patientId);
        PatientDTO patient = patientClient.getPatientById(Long.parseLong(patientId));
        log.info("Patient: {}", patient);

     if (patient != null){
          criteriaService.checkIsCriteriaMet(patient);
       }
    }


    //todo: implement the logic to send the notification
    public void sendNotification() {
        targetRepository.findAll().forEach(target -> {

        });
    }
}

