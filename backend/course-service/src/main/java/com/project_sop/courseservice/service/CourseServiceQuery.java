package com.project_sop.courseservice.service;

import com.project_sop.courseservice.core.data.CourseRepository;
import com.project_sop.courseservice.query.FindCourse;
import com.project_sop.courseservice.query.rest.CourseRestModel;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceQuery {

    @Autowired
    private static CourseRepository courseRepository;

    @Autowired
    QueryGateway queryGateway;

    public CourseServiceQuery(CourseRepository courseRepository) { this.courseRepository = courseRepository; }

    @RabbitListener(queues = "getCourse")
    public List<CourseRestModel> getContacts(){
        FindCourse findProfessor = new FindCourse();
        List<CourseRestModel> contacts = queryGateway
                .query(findProfessor, ResponseTypes.multipleInstancesOf(CourseRestModel.class)).join();
        return contacts;
    }
}
