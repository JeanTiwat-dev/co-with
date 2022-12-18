package com.project_sop.courseservice.query;

import com.project_sop.courseservice.core.CourseEntity;
import com.project_sop.courseservice.core.data.CourseRepository;
import com.project_sop.courseservice.query.rest.CourseRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CourseQueryHandler {
    @Autowired
    private CourseRepository courseRepository;

    public CourseQueryHandler(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
    @QueryHandler
    public List<CourseRestModel> getCourse(FindCourse findCourse){
        List<CourseRestModel> courseRestModels = new ArrayList<>();
        List<CourseEntity> courseEntities = courseRepository.findAll();
        for (CourseEntity course: courseEntities
             ) {
            CourseRestModel courseRestModel = new CourseRestModel();
            BeanUtils.copyProperties(course, courseRestModel);
            courseRestModels.add(courseRestModel);
        }
        return courseRestModels;
    }
}
