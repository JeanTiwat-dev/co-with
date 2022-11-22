package com.sop.backend.backend.service;

import com.sop.backend.backend.pojo.Course;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) { this.courseRepository = courseRepository; }

    @RabbitListener(queues = "getCourse")
    public List<Course> retrieveCourse() { return courseRepository.findAll(); }
}
