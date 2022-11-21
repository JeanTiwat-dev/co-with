package com.sop.backend.backend.rest;

import com.sop.backend.backend.pojo.Infected;
import com.sop.backend.backend.pojo.News;
import com.sop.backend.backend.service.InfectedService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InfectedController {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private InfectedService infectedService;
    @RequestMapping(value = "/getInfected", method = RequestMethod.GET)
    public ResponseEntity<?> getNews() {
        try{
            Object allInfected = rabbitTemplate.convertSendAndReceive("Infected","getinfected", "");
            return ResponseEntity.ok((List<Infected>) allInfected);
        }
        catch (Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/addInfected", method = RequestMethod.POST)
    public ResponseEntity<?> addInfected(@RequestBody Infected infected){
        rabbitTemplate.convertAndSend("Infected", "addinfected", infected);
        return ResponseEntity.ok(infected);
    }
}
