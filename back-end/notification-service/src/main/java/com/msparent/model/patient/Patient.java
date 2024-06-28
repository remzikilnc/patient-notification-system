package com.msparent.model.patient;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
public class Patient {
    private Long id;
    private String name;
    private String surname;
    private String middlename;
    private String email;
    private String phoneNumber;
    private String address;
    private Gender gender;
    private LocalDate birthdate;
    private Set<NotificationType> notificationTypes;
    private int age;
}
