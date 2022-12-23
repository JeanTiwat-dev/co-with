package com.project_sop.infectedservice.service;

import com.project_sop.infectedservice.core.data.InfectedRepository;
import com.project_sop.infectedservice.query.FindInfected;
import com.project_sop.infectedservice.query.rest.InfectedRestModel;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InfectedServiceQuery {

    @Autowired
    private static InfectedRepository infectedRepository;

    @Autowired
    QueryGateway queryGateway;

    public InfectedServiceQuery(InfectedRepository infectedRepository) { this.infectedRepository = infectedRepository; }

    @RabbitListener(queues = "GetInfected")
    public List<InfectedRestModel> getInfected(){
        FindInfected findInfected = new FindInfected();
        List<InfectedRestModel> infected = queryGateway
                .query(findInfected, ResponseTypes.multipleInstancesOf(InfectedRestModel.class)).join();
        return infected;
    }
}
