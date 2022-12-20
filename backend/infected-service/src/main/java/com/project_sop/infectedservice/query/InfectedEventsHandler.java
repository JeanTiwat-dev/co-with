package com.project_sop.infectedservice.query;


import com.project_sop.infectedservice.core.InfectedEntity;
import com.project_sop.infectedservice.core.data.InfectedRepository;
import com.project_sop.infectedservice.core.event.InfectedEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class InfectedEventsHandler {

    @Autowired
    InfectedRepository infectedRepository;

    public InfectedEventsHandler(InfectedRepository infectedRepository){
        this.infectedRepository = infectedRepository;
    }

    @EventHandler
    public void on(InfectedEvent event){
        InfectedEntity infected = new InfectedEntity();
        BeanUtils.copyProperties(event, infected);
        infectedRepository.save(infected);
    }

}
