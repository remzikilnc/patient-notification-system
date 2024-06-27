package com.msparent.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.msparent.model.Contact;
import com.msparent.model.Gender;
import com.msparent.model.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientResponse {
    private Long id;
    private String name;
    private String surname;
    private Gender gender;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birthdate;

    private int age;

    private List<NotificationType> notificationTypes;
    private List<String> identifiers;
    private List<Contact> contacts;
}