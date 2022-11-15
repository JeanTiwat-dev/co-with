package com.sop.backend.backend.repository;

import com.sop.backend.backend.pojo.user;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

@org.springframework.stereotype.Repository
public interface UserRepository extends MongoRepository<user, String>{
    @Query(value = "{email: '?0', password :  '?1'}")
    public List<user> findByEmail(String email, String password);
}
