package com.msparent.dto.patient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.msparent.model.Contact;
import com.msparent.model.Gender;
import com.msparent.model.Identifier;
import com.msparent.model.NotificationType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientRequest {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    private String name;

    @NotNull(message = "Surname cannot be null")
    @NotBlank(message = "Name cannot be blank")
    private String surname;


    private String middlename;

    private Gender gender;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birthdate;

    private List<NotificationType> notificationTypes;

    private List<Identifier> identifiers;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Contact> contacts;
}
