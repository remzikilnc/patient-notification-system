package com.msparent.model;

import com.msparent.model.patient.NotificationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TargetPatients {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long patient_id;
    private String patient_name;
    private String patient_surname;
    private String patient_email;
    private String patient_phoneNumber;
    private NotificationType patient_notificationType;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "criteria_id")
    private Criteria criteria;
}


