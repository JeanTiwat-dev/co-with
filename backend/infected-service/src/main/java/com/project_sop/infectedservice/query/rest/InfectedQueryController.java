package com.project_sop.infectedservice.query.rest;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/infected")
public class InfectedQueryController {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping
    public List<InfectedRestModel> getInfected(){
        try{
            Object allInfected = rabbitTemplate.convertSendAndReceive("Infected", "getinfected", "");
            return ((List<InfectedRestModel>) allInfected);
        }
        catch (Exception e){
            return null;
        }
    }
}
