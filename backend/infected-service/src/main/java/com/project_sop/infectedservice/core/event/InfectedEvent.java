package com.project_sop.infectedservice.core.event;

import lombok.Data;

@Data
public class InfectedEvent {
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
