package com.project_sop.infectedservice.command;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data
public class InfectedCommand {
    @TargetAggregateIdentifier
    private String _id;
    private String studentId;
    private String firstname;
    private String lastname;
    private String imgStudentCard;
    private String imgForVertified;
    private String reasonForAbsent;
    private String reasonForQuarantine;
    private String dataInfected;
}
