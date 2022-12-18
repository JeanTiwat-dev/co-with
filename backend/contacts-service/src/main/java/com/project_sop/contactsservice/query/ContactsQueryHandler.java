package com.project_sop.contactsservice.query;

import com.project_sop.contactsservice.core.ContactsEntity;
import com.project_sop.contactsservice.core.data.ContactsRepository;
import com.project_sop.contactsservice.query.rest.ContactsRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.bouncycastle.crypto.signers.ISOTrailers;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ContactsQueryHandler {
    @Autowired
    private ContactsRepository contactsRepository;

    public ContactsQueryHandler(ContactsRepository contactsRepository) {
        this.contactsRepository = contactsRepository;
    }
    @QueryHandler
    public List<ContactsRestModel> getProfessor(FindProfessor getProfessor){
        List<ContactsRestModel> contactsRestModels = new ArrayList<>();
        List<ContactsEntity> contactsEntities = contactsRepository.findAll();
        System.out.println(contactsEntities);
        for (ContactsEntity contacts: contactsEntities
             ) {
            ContactsRestModel contactsRestModel = new ContactsRestModel();
            BeanUtils.copyProperties(contacts, contactsRestModel);
            contactsRestModels.add(contactsRestModel);
        }
        return contactsRestModels;
    }
}
