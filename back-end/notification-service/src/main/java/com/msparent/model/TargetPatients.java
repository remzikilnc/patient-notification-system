package com.msparent.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.msparent.model.patient.NotificationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "target_patients")
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
    @CollectionTable(
            name = "patient_notification_types",
            joinColumns = @JoinColumn(name = "target_patient_id"),
            foreignKey = @ForeignKey(
                    name = "target_patient_fk",
                    foreignKeyDefinition = "FOREIGN KEY (target_patient_id) REFERENCES target_patients(id) ON DELETE CASCADE"
            )
    )
    @Column(name = "notification_type")
    @Enumerated(EnumType.STRING)
    private Set<NotificationType> notificationTypes;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private Criteria criteria;
}