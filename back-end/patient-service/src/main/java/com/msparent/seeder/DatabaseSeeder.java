package com.msparent.seeder;

import com.msparent.model.*;
import com.msparent.repository.ContactRepository;
import com.msparent.repository.PatientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Set;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final PatientRepository patientRepository;

    private final ContactRepository contactRepository;

    public DatabaseSeeder(PatientRepository patientRepository, ContactRepository contactRepository) {
        this.patientRepository = patientRepository;
        this.contactRepository = contactRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Contact 1 for Patient 1
        Contact contact1_1 = Contact.builder()
                .name("Emergency")
                .surname("Contact")
                .email("emergency@example.com")
                .phoneNumber("123-456-7890")
                .build();

        Contact contact1_2 = Contact.builder()
                .name("Family")
                .surname("Member")
                .email("family@example.com")
                .phoneNumber("098-765-4321")
                .build();

        // Patient 1
        Patient patient1 = Patient.builder()
                .name("John")
                .surname("Doe")
                .gender(Gender.MALE)
                .birthdate(LocalDate.of(1990, 1, 1))
                .notificationTypes(Set.of(NotificationType.EMAIL, NotificationType.SMS))
                .identifiers(Set.of(new Identifier("12345", "Passport"), new Identifier("67890", "Driver's License")))
                .contacts(Arrays.asList(contact1_1, contact1_2))
                .build();

        // Set patients for contacts
        contact1_1.setPatient(patient1);
        contact1_2.setPatient(patient1);

        // Save patient and contacts
        patientRepository.save(patient1);
        contactRepository.save(contact1_1);
        contactRepository.save(contact1_2);

        // Contact 2 for Patient 2
        Contact contact2_1 = Contact.builder()
                .name("Work")
                .surname("Contact")
                .email("work@example.com")
                .phoneNumber("555-123-4567")
                .build();

        Contact contact2_2 = Contact.builder()
                .name("Friend")
                .surname("Contact")
                .email("friend@example.com")
                .phoneNumber("444-555-6666")
                .build();

        // Patient 2
        Patient patient2 = Patient.builder()
                .name("Jane")
                .surname("Smith")
                .gender(Gender.FEMALE)
                .birthdate(LocalDate.of(1985, 5, 20))
                .notificationTypes(Set.of(NotificationType.EMAIL, NotificationType.SMS))
                .identifiers(Set.of(new Identifier("12345", "Passport"), new Identifier("67890", "Driver's License")))
                .contacts(Arrays.asList(contact2_1, contact2_2))
                .build();

        // Set patients for contacts
        contact2_1.setPatient(patient2);
        contact2_2.setPatient(patient2);

        // Save patient and contacts
        patientRepository.save(patient2);
        contactRepository.save(contact2_1);
        contactRepository.save(contact2_2);

        // Contact 3 for Patient 3
        Contact contact3_1 = Contact.builder()
                .name("Brother")
                .surname("Contact")
                .email("brother@example.com")
                .phoneNumber("777-888-9999")
                .build();

        // Patient 3
        Patient patient3 = Patient.builder()
                .name("Alice")
                .surname("Johnson")
                .gender(Gender.FEMALE)
                .birthdate(LocalDate.of(2000, 3, 15))
                .notificationTypes(Set.of(NotificationType.EMAIL, NotificationType.SMS))
                .identifiers(Set.of(new Identifier("12345", "Passport"), new Identifier("67890", "Driver's License")))
                .contacts(Arrays.asList(contact3_1))
                .build();

        // Set patients for contact
        contact3_1.setPatient(patient3);

        // Save patient and contact
        patientRepository.save(patient3);
        contactRepository.save(contact3_1);

        // Contact 4 for Patient 4
        Contact contact4_1 = Contact.builder()
                .name("Sister")
                .surname("Contact")
                .email("sister@example.com")
                .phoneNumber("111-222-3333")
                .build();

        // Patient 4
        Patient patient4 = Patient.builder()
                .name("Bob")
                .surname("Brown")
                .gender(Gender.MALE)
                .birthdate(LocalDate.of(1978, 7, 30))
                .notificationTypes(Set.of(NotificationType.EMAIL, NotificationType.SMS))
                .identifiers(Set.of(new Identifier("12345", "Passport"), new Identifier("67890", "Driver's License")))
                .contacts(Arrays.asList(contact4_1))
                .build();

        // Set patients for contact
        contact4_1.setPatient(patient4);

        // Save patient and contact
        patientRepository.save(patient4);
        contactRepository.save(contact4_1);
    }
}
