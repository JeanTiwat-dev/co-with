package com.sop.backend.backend.service;

import com.sop.backend.backend.pojo.ContactsAJ;
import com.sop.backend.backend.repository.ContactsRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactsService {

    @Autowired
    private ContactsRepository contactsRepository;

    public ContactsService(ContactsRepository contactsRepository) {
        this.contactsRepository = contactsRepository;
    }

    @RabbitListener(queues = "getContacts")
    public List<ContactsAJ> retrieveContacts() {
        return contactsRepository.findAll();
    }
}
