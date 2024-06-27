package com.msparent.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.hibernate.envers.RelationTargetAuditMode;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "patients")
@Audited
public class Patient {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
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

    @Audited(targetAuditMode = RelationTargetAuditMode.AUDITED)
    @ElementCollection
    @CollectionTable(name = "patient_identifiers", joinColumns = @JoinColumn(name = "patient_id"))
    private Set<Identifier> identifiers;



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
