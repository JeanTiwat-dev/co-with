package com.sop.backend.backend.rest;

import com.sop.backend.backend.pojo.Course;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CourseController {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RequestMapping(value = "/getCourse", method = RequestMethod.GET)
    public ResponseEntity<?> getCourse() {
        try {
            Object allCourses = rabbitTemplate.convertSendAndReceive("Course", "getCourse", "");
            return ResponseEntity.ok((List<Course>) allCourses);
        }
        catch (Exception e){
            return null;
        }
    }
}
