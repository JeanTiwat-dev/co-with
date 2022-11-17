package com.sop.backend.backend.rest;

import com.sop.backend.backend.pojo.ContactsAJ;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ContactsController {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @RequestMapping(value = "/getContacts", method = RequestMethod.GET)
    public ResponseEntity<?> getContacts() {
        try{
            Object allContacts = rabbitTemplate.convertSendAndReceive("Contacts","getContacts", "");
            return ResponseEntity.ok((List<ContactsAJ>) allContacts);
        }
        catch (Exception e){
            return null;
        }
    }
}
