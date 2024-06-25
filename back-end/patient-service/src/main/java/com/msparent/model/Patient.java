package com.msparent.model;

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
@Table(name = "patient_table")
public class Patient {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;

    @Enumerated(value = EnumType.STRING)
    private Gender gender;

    @Temporal(TemporalType.DATE)
    private LocalDate birthdate;

    @ElementCollection(targetClass = NotificationType.class)
    @CollectionTable(name = "patient_notification_types",
            joinColumns = @JoinColumn(name = "patient_id"))
    @Column(name = "notification_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private List<NotificationType> notificationTypes;

    @ElementCollection
    @CollectionTable(name = "patient_identifiers",
            joinColumns = @JoinColumn(name = "patient_id"))
    @Column(name = "identifier", nullable = true)
    private List<String> identifiers;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Contact> contact;

    public int getAge() {
        return Period.between(this.birthdate, LocalDate.now()).getYears();
    }
}
