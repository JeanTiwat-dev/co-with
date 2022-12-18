package com.project_sop.contactsservice.service;

import com.project_sop.contactsservice.core.data.ContactsRepository;
import com.project_sop.contactsservice.query.FindProfessor;
import com.project_sop.contactsservice.query.rest.ContactsRestModel;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactsServiceQuery {

    @Autowired
    private static ContactsRepository contactsRepository;

    @Autowired
    QueryGateway queryGateway;

    public ContactsServiceQuery(ContactsRepository contactsRepository) { this.contactsRepository = contactsRepository; }

    @RabbitListener(queues = "getContacts")
    public List<ContactsRestModel> getContacts(){
        FindProfessor findProfessor = new FindProfessor();
        List<ContactsRestModel> contacts = queryGateway
                .query(findProfessor, ResponseTypes.multipleInstancesOf(ContactsRestModel.class)).join();
        return contacts;
    }
}
