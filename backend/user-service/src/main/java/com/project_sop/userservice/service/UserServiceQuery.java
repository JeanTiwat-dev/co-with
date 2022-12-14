package com.project_sop.userservice.service;

import com.project_sop.userservice.command.rest.UpdateUserRestModel;
import com.project_sop.userservice.core.UserEntity;
import com.project_sop.userservice.core.data.UserRepository;
import com.project_sop.userservice.query.FindUserQuery;
import com.project_sop.userservice.query.rest.UserRestModel;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceQuery {

    @Autowired
    private static UserRepository userRepository;

    @Autowired
    QueryGateway queryGateway;

    public UserServiceQuery(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @RabbitListener(queues = "GetUserById")
    public UpdateUserRestModel getUserById(UpdateUserRestModel updateUserRestModel){
        System.out.println(updateUserRestModel);
        UserEntity userEntity = userRepository.findByUserid(updateUserRestModel.get_id());
        UpdateUserRestModel user = new UpdateUserRestModel();
        BeanUtils.copyProperties(userEntity, user);
        return user;
    }

    @RabbitListener(queues = "GetUser")
    public List<UserRestModel> retrieveUsers() {
        FindUserQuery findUserQuery = new FindUserQuery();
        List<UserRestModel> users = queryGateway
                .query(findUserQuery, ResponseTypes.multipleInstancesOf(UserRestModel.class)).join();
        return users;
    }
//    @RabbitListener(queues = "GetUserById")
//    public UserRestModel retrieveUserById(UserRestModel User) {
//        return userRepository.findByUserid(User.get_id()) ;
//    }

}
