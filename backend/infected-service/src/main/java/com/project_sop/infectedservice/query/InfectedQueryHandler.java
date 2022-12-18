package com.project_sop.infectedservice.query;

import com.project_sop.infectedservice.core.InfectedEntity;
import com.project_sop.infectedservice.core.data.InfectedRepository;
import com.project_sop.infectedservice.query.rest.InfectedRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class InfectedQueryHandler {
    @Autowired
    private InfectedRepository infectedRepository;

    public InfectedQueryHandler(InfectedRepository infectedRepository) {
        this.infectedRepository = infectedRepository;
    }
    @QueryHandler
    public List<InfectedRestModel> getInfected(FindInfected findInfected){
        List<InfectedRestModel> infectedRestModels = new ArrayList<>();
        List<InfectedEntity> infectedEntities = infectedRepository.findAll();
        for (InfectedEntity infected: infectedEntities
             ) {
            InfectedRestModel infectedRestModel = new InfectedRestModel();
            BeanUtils.copyProperties(infected, infectedRestModel);
            infectedRestModels.add(infectedRestModel);
        }
        return infectedRestModels;
    }
}
