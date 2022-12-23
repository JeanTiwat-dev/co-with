package com.project_sop.courseservice.query.rest;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseQueryController {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping
    public List<CourseRestModel> getCourse(){
        try{
            Object allCourse = rabbitTemplate.convertSendAndReceive("Course", "getCourse", "");
            return ((List<CourseRestModel>) allCourse);
        }
        catch (Exception e){
            return null;
        }
    }
}
