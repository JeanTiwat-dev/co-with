package com.project_sop.infectedservice.command.rest;

import lombok.Data;

import java.io.Serializable;

@Data
public class CreateInfectedRestModel implements Serializable {
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
