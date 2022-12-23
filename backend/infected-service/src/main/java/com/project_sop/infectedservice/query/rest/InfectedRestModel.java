package com.project_sop.infectedservice.query.rest;

import lombok.Data;

import java.io.Serializable;

@Data
public class InfectedRestModel implements Serializable {
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