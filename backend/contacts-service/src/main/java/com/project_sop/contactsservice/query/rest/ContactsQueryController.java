package com.project_sop.contactsservice.query.rest;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/contacts")
public class ContactsQueryController {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping
    public List<ContactsRestModel> getContacts(){
        try{
            Object allContacts = rabbitTemplate.convertSendAndReceive("Contacts", "getContacts", "");
            return ((List<ContactsRestModel>) allContacts);
        }
        catch (Exception e){
            return null;
        }
    }
}
