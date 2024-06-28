package com.msparent.dto.patient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.msparent.model.Contact;
import com.msparent.model.Gender;
import com.msparent.model.Identifier;
import com.msparent.model.NotificationType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientResponse {
    private Long id;
    private String name;
    private String surname;
    private String middlename;
    private Gender gender;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birthdate;

    private int age;
    private Set<NotificationType> notificationTypes;
    private Set<Identifier> identifiers;
    private List<Contact> contacts;
}

