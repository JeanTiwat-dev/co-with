package com.project_sop.userservice.service;

import com.project_sop.userservice.command.UpdateUserCommand;
import com.project_sop.userservice.command.rest.UpdateUserRestModel;
import com.project_sop.userservice.core.UserEntity;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceCommand {

    private final CommandGateway commandGateway;

    @Autowired
    public UserServiceCommand(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }



    @RabbitListener(queues = "UpdateProfile")
    public String addUsers(UpdateUserRestModel updateUserRestModel) {
        UpdateUserCommand command = UpdateUserCommand.builder()
                ._id(updateUserRestModel.get_id())
                .firstname(updateUserRestModel.getFirstname())
                .lastname(updateUserRestModel.getLastname())
                .email(updateUserRestModel.getEmail())
                .password(updateUserRestModel.getPassword())
                .img(updateUserRestModel.getImg())
                .tel(updateUserRestModel.getTel())
                .facebook(updateUserRestModel.getFacebook())
                .build();
        String result;

        try{
            result = commandGateway.sendAndWait(command);
        }
        catch (Exception e){
            result = e.getLocalizedMessage();
        }
        return result;
    }
}
