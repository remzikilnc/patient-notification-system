package com.msparent.model.patient;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Set;

@Data
public class PatientDTO {
    private Long id;
    private String name;
    private String surname;
    private String middlename;
    private String email;
    private String phoneNumber;
    private String address;
    private Gender gender;
    private LocalDate birthdate;
    private List<NotificationType> notificationTypes;
    private Set<Identifier> identifiers;
    private int age;
}
