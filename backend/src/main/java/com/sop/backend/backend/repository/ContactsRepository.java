package com.sop.backend.backend.repository;

import com.sop.backend.backend.pojo.ContactsAJ;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactsRepository extends MongoRepository<ContactsAJ, String > {

}
