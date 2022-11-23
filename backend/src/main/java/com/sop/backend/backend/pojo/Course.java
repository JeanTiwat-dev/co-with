package com.sop.backend.backend.pojo;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Data
@Document("Course")
public class Course implements Serializable {
    @Id
    private String _id;
    private String courseId;
    private String courseName;
    private String professor;
    private String studentRegistered;

    public Course() {
    }

    public Course(String _id, String courseId, String courseName, String professor, String studentRegistered) {
        this._id = _id;
        this.courseId = courseId;
        this.courseName = courseName;
        this.professor = professor;
        this.studentRegistered = studentRegistered;
    }
}
