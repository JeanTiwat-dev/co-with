package com.project_sop.infectedservice.service;

import com.project_sop.infectedservice.command.InfectedCommand;
import com.project_sop.infectedservice.command.rest.CreateInfectedRestModel;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InfectedServiceCommand {

    private final CommandGateway commandGateway;

    @Autowired
    public InfectedServiceCommand(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }


    @RabbitListener(queues = "AddInfected")
    public String addInfected(CreateInfectedRestModel createInfectedRestModel) {
        InfectedCommand command = InfectedCommand.builder()
                .studentId(createInfectedRestModel.getStudentId())
                .firstname(createInfectedRestModel.getFirstname())
                .lastname(createInfectedRestModel.getLastname())
                .imgStudentCard(createInfectedRestModel.getImgStudentCard())
                .imgForVertified(createInfectedRestModel.getImgForVertified())
                .reasonForAbsent(createInfectedRestModel.getReasonForAbsent())
                .reasonForQuarantine(createInfectedRestModel.getReasonForQuarantine())
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
