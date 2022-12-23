package com.project_sop.userservice.service;

import com.project_sop.userservice.command.rest.LoginModel;
import com.project_sop.userservice.command.rest.UpdateUserRestModel;
import com.project_sop.userservice.core.UserEntity;
import com.project_sop.userservice.core.data.UserRepository;
import com.project_sop.userservice.query.FindLoginQuery;
import com.project_sop.userservice.query.FindUserById;
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
        FindUserById findUserById = new FindUserById(updateUserRestModel.get_id());
        List<UpdateUserRestModel> user = queryGateway
                .query(findUserById, ResponseTypes.multipleInstancesOf(UpdateUserRestModel.class)).join();
        return user.get(0);
    }

    @RabbitListener(queues = "GetUser")
    public List<UserRestModel> retrieveUsers() {
        FindUserQuery findUserQuery = new FindUserQuery();
        List<UserRestModel> users = queryGateway
                .query(findUserQuery, ResponseTypes.multipleInstancesOf(UserRestModel.class)).join();
        return users;
    }
    @RabbitListener(queues = "LoginKey")
    public UserRestModel userLogin(LoginModel loginModel) {
        FindLoginQuery findLoginQuery = new FindLoginQuery(loginModel.getEmail(), loginModel.getPassword());
        List<UserRestModel> users = queryGateway
                .query(findLoginQuery, ResponseTypes.multipleInstancesOf(UserRestModel.class)).join();
        return users.get(0);
    }

    @RabbitListener(queues = "UpdateImageProfile")
    public void retrieveUpdateImageProfile(UpdateUserRestModel User) {
        UserEntity user = new UserEntity();
        BeanUtils.copyProperties(User, user);
        userRepository.save(user) ;
    }
}
