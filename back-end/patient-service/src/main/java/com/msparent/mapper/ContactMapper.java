package com.msparent.mapper;

import com.msparent.dto.contact.ContactRequest;
import com.msparent.dto.contact.ContactResponse;
import com.msparent.dto.patient.PatientRequest;
import com.msparent.dto.patient.PatientResponse;
import com.msparent.model.Contact;
import com.msparent.model.Patient;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ContactMapper implements Mapper<ContactRequest, Contact, ContactResponse> {
    @Override
    public Contact mapToEntity(Contact contact, ContactRequest request) {
        contact.setName(request.getName());
        contact.setSurname(request.getSurname());
        contact.setEmail(request.getEmail());
        contact.setPhoneNumber(request.getPhoneNumber());
        contact.setAddress(request.getAddress());
        contact.setCity(request.getCity());
        contact.setState(request.getState());
        contact.setZip(request.getZip());
        contact.setCountry(request.getCountry());
        contact.setRelationship(request.getRelationship());
        contact.setNotes(request.getNotes());
        contact.setContactType(request.getContactType());
        contact.setContactMethod(request.getContactMethod());
        return contact;
    }

    @Override
    public ContactResponse mapToResponse(Contact contact) {
        return ContactResponse.builder()
                .id(contact.getId())
                .name(contact.getName())
                .surname(contact.getSurname())
                .email(contact.getEmail())
                .phoneNumber(contact.getPhoneNumber())
                .address(contact.getAddress())
                .city(contact.getCity())
                .state(contact.getState())
                .zip(contact.getZip())
                .country(contact.getCountry())
                .relationship(contact.getRelationship())
                .notes(contact.getNotes())
                .contactType(contact.getContactType())
                .contactMethod(contact.getContactMethod())
                .build();
    }

    @Override
    public List<ContactResponse> mapToResponse(List<Contact> contacts) {
        return contacts.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

}