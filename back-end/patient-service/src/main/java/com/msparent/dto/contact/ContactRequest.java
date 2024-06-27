package com.msparent.dto.contact;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactRequest {
        @NotNull(message = "Name cannot be null")
        @NotBlank(message = "Name cannot be blank")
        private String name;

        @NotNull(message = "Surname cannot be null")
        @NotBlank(message = "Name cannot be blank")
        private String surname;

        private String email;
        private String phoneNumber;
        private String address;
        private String city;
        private String state;
        private String zip;
        private String country;
        private String relationship;
        private String notes;
        private String contactType;
        private String contactMethod;
}
