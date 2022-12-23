package com.project_sop.infectedservice.core.data;

import com.project_sop.infectedservice.core.InfectedEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface InfectedRepository extends MongoRepository<InfectedEntity, String> {

    @Query(value = "{role: '?0'}")
    public List<InfectedEntity> findInfected(String role);
}
