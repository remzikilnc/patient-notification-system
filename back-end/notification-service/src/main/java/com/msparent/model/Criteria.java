package com.msparent.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.msparent.model.patient.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Criteria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "notification_template_id")
    @JsonBackReference
    private Template notificationTemplate;

    private int minAge;
    private int maxAge;

    @Enumerated(value = EnumType.STRING)
    private Gender gender;

    @OneToMany(mappedBy = "criteria", fetch = FetchType.LAZY)
    private Set<TargetPatients> targetPatients;
}
