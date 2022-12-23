package com.project_sop.newsservice.core.data;

import com.project_sop.newsservice.core.NewsEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface NewsRepository extends MongoRepository<NewsEntity, String> {
    @Query( "{_id: '?0'}")
    public NewsEntity findByNewid(String id);
}
