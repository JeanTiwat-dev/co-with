package com.project_sop.courseservice.query.rest;

import lombok.Data;

import java.io.Serializable;

@Data
public class CourseRestModel implements Serializable {
    private String _id;
    private String courseId;
    private String courseName;
    private String professor;
    private String studentRegistered;
}