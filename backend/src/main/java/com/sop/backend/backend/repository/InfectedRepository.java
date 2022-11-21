package com.sop.backend.backend.repository;

import com.sop.backend.backend.pojo.Infected;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

@org.springframework.stereotype.Repository
public interface InfectedRepository extends MongoRepository<Infected, String>{

}
