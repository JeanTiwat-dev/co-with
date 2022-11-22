package com.sop.backend.backend.service;

import com.sop.backend.backend.pojo.Infected;
import com.sop.backend.backend.repository.InfectedRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InfectedService {

    @Autowired
    private InfectedRepository infectedRepository;

    public InfectedService(InfectedRepository infectedRepository) {
        this.infectedRepository = infectedRepository;
    }

    @RabbitListener(queues = "GetInfected")
    public List<Infected> retrieveInfected() {
        return infectedRepository.findAll();
    }

    @RabbitListener(queues = "AddInfected")
    public void createInfected(Infected infected){
        infectedRepository.save(infected);
//        return infected;
    }

}
