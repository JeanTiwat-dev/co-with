package com.project_sop.infectedservice.core;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Data
@Document("Infected")
public class InfectedEntity {
    @Id
    private String _id;
    private String studentId;
    private String firstname;
    private String lastname;
    private String imgStudentCard;
    private String imgForVertified;
    private String reasonForAbsent;
    private String reasonForQuarantine;
}
