package com.msparent.service;

import com.msparent.model.Contact;
import com.msparent.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;
    public Iterable<Contact> getContacts() {
        return contactRepository.findAll();
    }
    public Contact updateContact(Contact contact) {
        return contactRepository.save(contact);
    }
    public Contact getContact(Long id) {
        return contactRepository.findById(id).orElse(null);
    }

    public Contact createContact(Contact contact) {
        return contactRepository.save(contact);
    }

    public void deleteContactById(Long id) {
        contactRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return contactRepository.existsById(id);
    }

    public Iterable<Contact> getContactsByPatientId(Long patientId) {
        return contactRepository.findByPatientId(patientId);
    }

    public void deleteContactsByPatientId(Long patientId) {
        contactRepository.deleteByPatientId(patientId);
    }
}
