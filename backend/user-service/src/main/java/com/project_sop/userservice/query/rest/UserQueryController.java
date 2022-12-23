package com.project_sop.userservice.query.rest;

import com.project_sop.userservice.query.FindUserQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserQueryController {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping
    public List<UserRestModel> getUsers(){
        try{
            Object allUser = rabbitTemplate.convertSendAndReceive("User","getuser", "");
            return ((List<UserRestModel>) allUser);
        }
        catch (Exception e){
            return null;
        }
    }
}
