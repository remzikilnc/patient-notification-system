package com.msparent.model;

import com.msparent.model.patient.NotificationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TargetPatients {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long patientId;
    private String patientName;
    private String patientSurname;
    private String patientEmail;
    private String patientPhoneNumber;


    @ElementCollection(targetClass = NotificationType.class)
    @CollectionTable(name = "patient_notification_types", joinColumns = @JoinColumn(name = "target_patient_id"))
    @Column(name = "notification_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private Set<NotificationType> notificationTypes;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "criteria_id")
    private Criteria criteria;
}