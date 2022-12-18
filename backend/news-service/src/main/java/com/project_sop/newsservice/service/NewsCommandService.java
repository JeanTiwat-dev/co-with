package com.project_sop.newsservice.service;

import com.project_sop.newsservice.command.NewsCommand;
import com.project_sop.newsservice.command.rest.UpdateAndCreateNewsRestModel;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsCommandService {

    private final CommandGateway commandGateway;

    @Autowired
    public NewsCommandService(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }


    @RabbitListener(queues = "AddNews")
    public String addUsers(UpdateAndCreateNewsRestModel updateAndCreateNewsRestModel) {
        NewsCommand command = NewsCommand.builder()
                ._id(updateAndCreateNewsRestModel.get_id())
                .title(updateAndCreateNewsRestModel.getTitle())
                .release(updateAndCreateNewsRestModel.getRelease())
                .content(updateAndCreateNewsRestModel.getContent())
                .image(updateAndCreateNewsRestModel.getImage())
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
