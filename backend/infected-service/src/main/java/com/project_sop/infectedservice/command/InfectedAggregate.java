package com.project_sop.infectedservice.command;


import com.project_sop.infectedservice.core.event.InfectedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import java.util.UUID;

@Aggregate
public class InfectedAggregate {
    private String _id;
    @AggregateIdentifier
    private String key = UUID.randomUUID().toString();
    private String studentId;
    private String firstname;
    private String lastname;
    private String imgStudentCard;
    private String imgForVertified;
    private String reasonForAbsent;
    private String reasonForQuarantine;
    private String dataInfected;

    public InfectedAggregate(){

    }

    @CommandHandler
    public InfectedAggregate(InfectedCommand command){
        if(command.getFirstname().isBlank() || command.getFirstname() == null){
            throw new IllegalArgumentException("Firstname is not null");
        }
        if(command.getLastname().isBlank() || command.getLastname() == null){
            throw new IllegalArgumentException("Lastname is not null");
        }
        if(command.getStudentId().length() != 8){
            throw new IllegalArgumentException("Please input StudentID");
        }

        InfectedEvent infectedEvent = new InfectedEvent();
        BeanUtils.copyProperties(command, infectedEvent);
        AggregateLifecycle.apply(infectedEvent);
    }

    @EventSourcingHandler
    public void on(InfectedEvent infectedEvent){
        this._id = infectedEvent.get_id();
        this.studentId = infectedEvent.getStudentId();
        this.firstname = infectedEvent.getFirstname();
        this.lastname = infectedEvent.getLastname();
        this.imgStudentCard = infectedEvent.getImgStudentCard();
        this.imgForVertified = infectedEvent.getImgForVertified();
        this.reasonForAbsent = infectedEvent.getReasonForAbsent();
        this.reasonForQuarantine = infectedEvent.getReasonForQuarantine();
        this.dataInfected = infectedEvent.getDataInfected();
    }
}
