package com.msparent.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "patients")
public class Patient {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;
    private String middlename;

    @Enumerated(value = EnumType.STRING)
    private Gender gender;

    private LocalDate birthdate;

    @ElementCollection(targetClass = NotificationType.class)
    @CollectionTable(name = "patient_notification_types", joinColumns = @JoinColumn(name = "patient_id"))
    @Column(name = "notification_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private List<NotificationType> notificationTypes;

    @ElementCollection
    @CollectionTable(name = "patient_identifiers", joinColumns = @JoinColumn(name = "patient_id"))
    private List<Identifier> identifiers;



    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Contact> contacts;

    public int getAge() {
        if (this.birthdate == null) {
            return 0;
        }
        return Period.between(this.birthdate, LocalDate.now()).getYears();
    }
}
