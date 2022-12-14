package com.project_sop.userservice.query;

import com.project_sop.userservice.core.UserEntity;
import com.project_sop.userservice.core.data.UserRepository;
import com.project_sop.userservice.query.rest.UserRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserQueryHandler {
    @Autowired
    private UserRepository userRepository;
    public UserQueryHandler(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @QueryHandler
    List<UserRestModel> findUser(FindUserQuery findUserQuery){
        List<UserRestModel> users = new ArrayList<>();
        List<UserEntity> entity = userRepository.findAll();
        for (UserEntity e: entity
             ) {
            UserRestModel userRestModel = new UserRestModel();
            BeanUtils.copyProperties(e, userRestModel);
            users.add(userRestModel);
        }
        return users;
    }
}
