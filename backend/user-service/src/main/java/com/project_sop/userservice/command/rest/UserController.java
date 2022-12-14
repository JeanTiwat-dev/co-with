package com.project_sop.userservice.command.rest;


import com.project_sop.userservice.core.UserEntity;
import com.project_sop.userservice.query.rest.UserRestModel;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    private final CommandGateway commandGateway;

    @Autowired
    public UserController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String addUser(@RequestBody UpdateUserRestModel updateUserRestModel){
        try{
            Object getUser = rabbitTemplate.convertSendAndReceive("User","getuserbyid", updateUserRestModel);
            UpdateUserRestModel OldValue = (UpdateUserRestModel) getUser;
            OldValue.setFirstname(updateUserRestModel.getFirstname());
            OldValue.setLastname(updateUserRestModel.getLastname());
            OldValue.setEmail(updateUserRestModel.getEmail());
            OldValue.setTel(updateUserRestModel.getTel());
            OldValue.setFacebook(updateUserRestModel.getFacebook());
            Object message = rabbitTemplate.convertSendAndReceive("User","updateprofile", OldValue);
            return (String)message;
        }
        catch (Exception e){
            return "Error";
        }
    }
}
