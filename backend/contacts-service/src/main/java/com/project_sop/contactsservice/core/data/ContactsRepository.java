package com.project_sop.contactsservice.core.data;

import com.project_sop.contactsservice.core.ContactsEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ContactsRepository extends MongoRepository<ContactsEntity, String> {

    @Query(value = "{role: '?0'}")
    public List<ContactsEntity> findProfessor(String role);
}
