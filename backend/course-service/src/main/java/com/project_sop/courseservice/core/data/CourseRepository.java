package com.project_sop.courseservice.core.data;

import com.project_sop.courseservice.core.CourseEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface CourseRepository extends MongoRepository<CourseEntity, String> {

    @Query(value = "{role: '?0'}")
    public List<CourseEntity> findProfessor(String role);
}
