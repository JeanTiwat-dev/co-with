package com.project_sop.courseservice.core;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Data
@Document("Course")
public class CourseEntity {
    @Id
    private String _id;
    private String courseId;
    private String courseName;
    private String professor;
    private String studentRegistered;
}
