package com.sop.backend.backend.repository;

import com.sop.backend.backend.pojo.Course;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface CourseRepository extends MongoRepository<Course, String>{

}
