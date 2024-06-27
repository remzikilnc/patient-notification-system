package com.msparent.model.patient;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
public class PatientDTO {
    private Long id;
    private String name;
    private String surname;
    private String middlename;
    private Gender gender;
    private LocalDate birthdate;
    private List<NotificationType> notificationTypes;
    private Set<Identifier> identifiers;
    private List<ContactDTO> contacts;
    private int age;
}