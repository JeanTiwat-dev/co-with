package com.sop.backend.backend.repository;

import com.sop.backend.backend.pojo.News;
import com.sop.backend.backend.pojo.user;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

@org.springframework.stereotype.Repository
public interface NewsRepository extends MongoRepository<News, String>{
    @Query( "{_id: '?0'}")
    public News findByNewsid(String id);
}
