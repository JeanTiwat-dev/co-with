package com.sop.backend.backend.pojo;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document("User")
public class user implements Serializable {
    @Id
    private String _id;
    private String email;
    private String password;
    private String img;
    private String firstname;
    private String lastname;
    public user() {}
    public user(String _id, String email, String password, String img, String firstname, String lastname) {
        this._id = _id;
        this.email = email;
        this.password = password;
        this.img = img;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
