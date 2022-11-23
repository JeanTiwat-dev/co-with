package com.sop.backend.backend.pojo;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document("Infected")
public class

Infected implements Serializable {
    @Id
    private String _id;
    private String studentId;
    private String firstname;
    private String lastname;
    private String imgStudentCard;
    private String imgForVertified;
    private String reasonForAbsent;
    private String reasonForQuarantine;
    private String dateInfected;

    public Infected() {
    }

    public Infected(String _id, String firstname, String lastname, String imgStudentCard, String imgForVertified, String reasonForAbsent, String reasonForQuarantine, String dateInfected) {
        this._id = _id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.imgStudentCard = imgStudentCard;
        this.imgForVertified = imgForVertified;
        this.reasonForAbsent = reasonForAbsent;
        this.reasonForQuarantine = reasonForQuarantine;
        this.dateInfected = dateInfected;
    }
}
